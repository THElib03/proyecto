import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Buses = () => {
    const navigate = useNavigate();

    const [buses, setBuses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [showRetired, setShowRetired] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        plateNum: "",
        model: "",
        numSeat: "",
        status: "active",
        kmCount: "",
    });

    useEffect(() => {
        // fetchBuses();
        setLoading(true);
        fetch('/api/bus', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => {
            setBuses(Array.isArray(data) ? data : data.data || data.buses || []);
        })
        .catch(err => console.error("Error fetching buses:", err))
        .finally(() => setLoading(false));
    }, []);

    const fetchBuses = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/bus", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) throw new Error("Failed to fetch buses");
            const data = await response.json();

            setBuses(Array.isArray(data) ? data : data.data || data.buses || []);
        } catch (err) {
            console.error("Error fetching buses:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value.trim() }));
    };

    const handleSave = async () => {
        try {
            const method = editingId ? "PUT" : "POST";
            const url = editingId ? `/api/bus/${editingId}` : "/api/bus/new";

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to save bus");

            await fetchBuses();
            setShowForm(false);
            setFormData({
                plateNum: "",
                model: "",
                numSeat: "",
                status: "active",
                joinDate: "",
                kmCount: "",
                lastServ: "",
            });
            setEditingId(null);
        } catch (err) {
            console.error("Error saving bus:", err);
        }
    };

    const handleRetire = async (id) => {
        if (confirm("Are you sure?")) {
            try {
                const response = await fetch(`/api/bus/${id}`, {
                    method: "DELETE",
                });
                if (!response.ok) throw new Error("Failed to delete bus");
                await fetchBuses();
            } catch (err) {
                console.error("Error deleting bus:", err);
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        // Extract yyyy-mm-dd from ISO format strings
        return dateString.split("T")[0];
    };

    const filteredBuses = buses.filter((bus) => {
        const matchesSearch =
            bus.plateNum.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bus.model.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDelisted = showRetired ? true : !bus.delist;
        return matchesSearch && matchesDelisted;
    });

    return (
        <div className="app-container">
            <div className="page-container">
                <div className="page-header">
                    <div>
                        <h1>Buses Management</h1>
                        <p>Manage your bus fleet</p>
                    </div>

                    <button
                        className="btn btn-secondary mx-auto sm:mx-0"
                        onClick={() => navigate("/admin")}
                    >
                        ← Back to Routes
                    </button>
                </div>

                <div className="btn-group">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setShowForm(true);
                            setEditingId(null);
                            setFormData({
                                plateNum: "",
                                model: "",
                                numSeat: "",
                                status: "active",
                                kmCount: "",
                                lastServ: "",
                            });
                        }}
                    >
                        + Add Bus
                    </button>
                    <button
                        className={`btn ${showRetired ? "btn-danger" : "btn-secondary"}`}
                        onClick={() => setShowRetired(!showRetired)}
                    >
                        {showRetired ? "Hide retired buses" : "Show retired buses"}                    
                    </button>
                </div>

                {showForm && (
                    <div className="card mb-8">
                        <div className="card-header">
                            <h3>{editingId ? "Edit Bus" : "Add New Bus"}</h3>
                        </div>
                        <div className="card-body">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-group">
                                    <label>License Plate (no spaces)</label>
                                    <input
                                        type="text"
                                        name="plateNum"
                                        value={formData.plateNum}
                                        onChange={handleInputChange}
                                        placeholder="1234 ABC"
                                        disabled={!!editingId}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Model</label>
                                    <input
                                        type="text"
                                        name="model"
                                        value={formData.model}
                                        onChange={handleInputChange}
                                        placeholder="Mercedes Sprinter"
                                        disabled={!!editingId}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Capacity</label>
                                    <input
                                        type="number"
                                        name="numSeat"
                                        value={formData.numSeat}
                                        onChange={handleInputChange}
                                        placeholder="50"
                                        disabled={!!editingId}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Status</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                    >
                                        <option value="active">Active</option>
                                        <option value="maintenance">
                                            Maintenance
                                        </option>
                                        <option value="inactive">
                                            Inactive
                                        </option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Tachometer (km)</label>
                                    <input
                                        type="number"
                                        name="kmCount"
                                        value={formData.kmCount}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        disabled={!editingId}
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

                <div className="mb-6 p-4 rounded">
                    <input
                        type="text"
                        className="search-input w-full min-w-0 box-border"
                        placeholder="Search by license plate or model..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {loading ? (
                    <div className="loading">Loading buses...</div>
                ) : filteredBuses.length === 0 ? (
                    <div className="empty-state">
                        <h3>No buses found</h3>
                        <p>Start by adding your first bus to the system</p>
                    </div>
                ) : (
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>License Plate</th>
                                    <th>Model</th>
                                    <th>Tachometer</th>
                                    <th>Last Service Date</th>
                                    <th>Capacity</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBuses.map((bus) => (
                                    <tr key={bus.id}>
                                        <td>{bus.plateNum}</td>
                                        <td>{bus.model}</td>
                                        <td>{bus.kmCount}</td>
                                        <td>{formatDate(bus.lastServ)}</td>
                                        <td>{bus.numSeat}</td>
                                        <td>{bus.status || 'Active'}</td>
                                        <td>
                                            <div className="table-actions">
                                                <button
                                                    className="btn btn-sm btn-primary"
                                                    onClick={() => {
                                                        setFormData(bus);
                                                        setEditingId(bus.id);
                                                        setShowForm(true);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() =>
                                                        handleRetire(bus.id)
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

export default Buses;
