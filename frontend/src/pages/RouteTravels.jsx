import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const RouteTravels = () => {
    const { routeId } = useParams();
    const navigate = useNavigate();
    const [travels, setTravels] = useState([]);
    const [routeName, setRouteName] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        departure_time: "",
        valid_until: "",
        bus_id: "",
        work_days: "",
    });

    const [buses, setBuses] = useState([]);

    useEffect(() => {
        if (routeId) {
            fetchRouteAndTravels();
            fetchBuses();
        }
    }, [routeId]);

    const fetchBuses = async () => {
        try {
            const response = await fetch("/api/bus");
            if (!response.ok) throw new Error("Failed to fetch buses");
            const data = await response.json();

            const busArray = Array.isArray(data) ? data : data.buses || [];
            setBuses(busArray.filter(bus => !bus.delist));
        } catch (err) {
            console.error("Error fetching buses:", err);
        }
    };

    const fetchRouteAndTravels = async () => {
        setLoading(true);
        try {
            // Fetch route details
            const routeResponse = await fetch(`/api/route/${routeId}`);
            if (!routeResponse.ok) throw new Error("Failed to fetch route");

            const routeData = await routeResponse.json();
            setRouteName(routeData.name);

            // Fetch travels for this route
            const travelsResponse = await fetch(`/api/route/${routeId}/travels`);
            if (!travelsResponse.ok) throw new Error("Failed to fetch travels");
            const travelsData = await travelsResponse.json();
            const processedTravels = Array.isArray(travelsData) ? travelsData : travelsData.data || [];
            setTravels(processedTravels);
        } catch (err) {
            console.error("Error fetching route travels:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const method = editingId ? "PUT" : "POST";
            const url = editingId ? `/api/travel/${editingId}` : "/api/travel";

            const payload = {
                ...formData,
                route_id: parseInt(routeId),
                bus_id: parseInt(formData.bus_id),
            };

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error("Failed to save travel");

            await fetchRouteAndTravels();
            setShowForm(false);
            setFormData({
                departure_time: "",
                valid_until: "",
                bus_id: "",
                work_days: "",
            });
            setEditingId(null);
        } catch (err) {
            console.error("Error saving travel:", err);
        }
    };

    const handleEdit = (travel) => {
        setFormData({
            departure_time: travel.departureTime || "",
            valid_until: travel.validUntil || "",
            bus_id: travel.bus?.id || "",
            work_days: travel.workDays || "",
        });
        setEditingId(travel.id);
        setShowForm(true);
    };

    const handleDelist = async (id) => {
        if (confirm("Are you sure you want to delist this travel?")) {
            try {
                const response = await fetch(`/api/travel/${id}/delist`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) throw new Error("Failed to delist travel");
                await fetchRouteAndTravels();
            } catch (err) {
                console.error("Error delisting travel:", err);
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    };

    const filteredTravels = travels.filter((travel) => {
        if (!searchTerm) return true; // Show all if search is empty
        const depDate = travel.departureTime?.toString() || "";
        const retDate = travel.validUntil?.toString() || "";
        return depDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
               retDate.toLowerCase().includes(searchTerm.toLowerCase());
    });

    console.log("Travels state:", travels);
    console.log("Filtered travels:", filteredTravels);

    return (
        <div className="app-container">
            <div className="page-container">
                <div className="page-header">
                    <h1>Travels for Route: {routeName}</h1>
                    <p>View and manage travels on this route</p>
                </div>

                <div className="btn-group">
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate("/admin/routes")}
                    >
                        ← Back to Routes
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setShowForm(true);
                            setEditingId(null);
                            setFormData({
                                departure_time: "",
                                valid_until: "",
                                end_hour: "",
                                bus_id: "",
                                work_days: "",
                            });
                        }}
                    >
                        + Add Travel
                    </button>
                </div>

                {showForm && (
                    <div className="card mb-8">
                        <div className="card-header">
                            <h3>{editingId ? "Edit Travel" : "Add New Travel"}</h3>
                        </div>
                        <div className="card-body">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-group">
                                    <label>Departure Time</label>
                                    <input
                                        type="time"
                                        name="departure_time"
                                        value={formData.departure_time}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Valid Until</label>
                                    <input
                                        type="date"
                                        name="valid_until"
                                        value={formData.valid_until}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Bus</label>
                                    <select
                                        name="bus_id"
                                        value={formData.bus_id}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">-- Select a bus --</option>
                                        {buses.map((bus) => (
                                            <option key={bus.id} value={bus.id}>
                                                {bus.plateNum} - {bus.model}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Work Days</label>
                                    <input
                                        type="text"
                                        name="work_days"
                                        value={formData.work_days}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Mon,Tue,Wed,Thu,Fri,Sat,Sun"
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <input
                                            type="checkbox"
                                            name="reverse"
                                            checked={formData.reverse || false}
                                            onChange={handleInputChange}
                                        />
                                        Is the travel in reverse?
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="btn-group">
                                <button
                                    className="btn btn-success"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingId(null);
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mb-6">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search by departure or return date..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {loading ? (
                    <div className="loading">Loading travels...</div>
                ) : filteredTravels.length === 0 ? (
                    <div className="empty-state">
                        <h3>No travels found</h3>
                        <p>There are currently no scheduled travels for this route</p>
                    </div>
                ) : (
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Departure Time</th>
                                    <th>Valid Until</th>
                                    <th>Bus</th>
                                    <th>Work Days</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTravels.map((travel) => (
                                    <tr key={travel.id}>
                                        <td>{travel.id}</td>
                                        <td>{travel.departureTime || "--"}</td>
                                        <td>{formatDate(travel.validUntil) || "--"}</td>
                                        <td>{travel.bus?.plateNum || "N/A"}</td>
                                        <td>{travel.workDays || "-"}</td>
                                        <td>
                                            <div className="table-actions">
                                                <button
                                                    className="btn btn-sm btn-primary"
                                                    onClick={() => handleEdit(travel)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDelist(travel.id)}
                                                >
                                                    Delist
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RouteTravels;
