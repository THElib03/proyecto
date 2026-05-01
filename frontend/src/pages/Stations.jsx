import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Stations = () => {
    const navigate = useNavigate();
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        city: "",
        location: "",
        address: "",
        phone: "",
        timeToNext: "",
    });

    useEffect(() => {
        fetchStations();
    }, []);

    const fetchStations = async () => {
        setLoading(true);
        try {
            const stationResponse = await fetch("/api/station", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!stationResponse.ok) throw new Error("Failed to fetch stations");
            const stationData = await stationResponse.json();

            setStations(Array.isArray(stationData) ? stationData : stationData.data || []);
        } catch (err) {
            console.error("Error fetching stations:", err);
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
            const url = editingId ? `/api/station/${editingId}/edit` : "/api/station/new";

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to save station");
            
            await fetchStations();
            setShowForm(false);
            setFormData({
                name: "",
                city: "",
                location: "",
                address: "",
                phone: "",
                timeToNext: "",
            });
            setEditingId(null);
        } catch (err) {
            console.error("Error saving station:", err);
        }
    };

    const handleRetire = async (id) => {
        if (confirm("Are you sure?")) {
            try {
                // TODO: Implement API call to delete station
                setStations((prev) =>
                    prev.filter((station) => station.id !== id),
                );
            } catch (err) {
                console.error("Error deleting station:", err);
            }
        }
    };

    const filteredStations = stations.filter(
        (station) =>
            station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            station.city.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className="app-container">
            <div className="page-container">
                <div className="page-header">
                    <div className="flex items-center justify-between">
                        <h1>Stations Management</h1>
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate("/admin")}
                        >
                            ← Back to Admin
                        </button>
                    </div>
                    <p>Manage bus stations and terminals</p>
                </div>

                <div className="btn-group">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setShowForm(true);
                            setEditingId(null);
                            setFormData({
                                name: "",
                                city: "",
                                location: "",
                                address: "",
                                phone: "",
                                timeToNext: "",
                            });
                        }}
                    >
                        + Add Station
                    </button>
                </div>

                {showForm && (
                    <div className="card mb-8">
                        <div className="card-header">
                            <h3>
                                {editingId ? "Edit Station" : "Add New Station"}
                            </h3>
                        </div>
                        <div className="card-body">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-group">
                                    <label>Station Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Central Station"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="New York"
                                        disabled={!!editingId}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        placeholder="Downtown"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="123 Main St"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="555-0001"
                                    />
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
                        placeholder="Search by station name or city..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {loading ? (
                    <div className="loading">Loading stations...</div>
                ) : filteredStations.length === 0 ? (
                    <div className="empty-state">
                        <h3>No stations found</h3>
                        <p>Start by adding your first station to the system</p>
                    </div>
                ) : (
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Station Name</th>
                                    <th>City</th>
                                    <th>Address</th>
                                    <th>Phone</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStations.map((station) => (
                                    <tr key={station.id}>
                                        <td>{station.name}</td>
                                        <td>{station.city}</td>
                                        <td>{station.address}</td>
                                        <td>{station.phone}</td>
                                        <td>
                                            <div className="table-actions">
                                                <button
                                                    className="btn btn-sm btn-primary"
                                                    onClick={() => {
                                                        setFormData(station);
                                                        setEditingId(
                                                            station.id,
                                                        );
                                                        setShowForm(true);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() =>
                                                        handleRetire(station.id)
                                                    }
                                                >
                                                    Retire
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

export default Stations;
