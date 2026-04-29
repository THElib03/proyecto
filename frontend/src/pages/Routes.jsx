import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Routes = () => {
    const navigate = useNavigate();
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
    });

    useEffect(() => {
        fetchRoutes();
    }, []);

    const fetchRoutes = async () => {
        setLoading(true);
        try {
            const routeResponse = await fetch('/api/route', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!routeResponse.ok) throw new Error("Failed to fetch routes");
            const routeData = await routeResponse.json();

            setRoutes(Array.isArray(routeData) ? routeData : routeData.data || routeData.routes || []);
        } catch (err) {
            console.error("Error fetching routes:", err);
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
            const url = editingId ? `/api/route/${editingId}/edit` : "/api/route/new";

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to save route");
            await fetchRoutes();

            setShowForm(false);
            setFormData({
                name: "",
            });
            setEditingId(null);
        } catch (err) {
            console.error("Error saving route:", err);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure?")) {
            try {
                const response = await fetch(`/api/route/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                
                if (!response.ok) throw new Error("Failed to delete route");
                setRoutes((prev) => prev.filter((route) => route.id !== id));
            } catch (err) {
                console.error("Error deleting route:", err);
            }
        }
    };

    const filteredRoutes = routes.filter(
        (route) =>
            route.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className="app-container">
            <div className="page-container">
                <div className="page-header">
                    <h1>Routes Management</h1>
                    <p>Manage travel routes and schedules</p>
                </div>

                <div className="btn-group">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setShowForm(true);
                            setEditingId(null);
                            setFormData({
                                name: "",
                            });
                        }}
                    >
                        + Add Route
                    </button>
                </div>

                {showForm && (
                    <div className="card mb-8">
                        <div className="card-header">
                            <h3>
                                {editingId ? "Edit Route" : "Add New Route"}
                            </h3>
                        </div>
                        <div className="card-body">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-group">
                                    <label>Route Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Route Name"
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
                        placeholder="Search by origin or destination..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {loading ? (
                    <div className="loading">Loading routes...</div>
                ) : filteredRoutes.length === 0 ? (
                    <div className="empty-state">
                        <h3>No routes found</h3>
                        <p>Start by adding your first route to the system</p>
                    </div>
                ) : (
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRoutes.map((route) => (
                                    <tr key={route.id}>
                                        <td>{route.id}</td>
                                        <td>{route.name}</td>
                                        <td>
                                            <div className="table-actions">
                                                <button
                                                    className="btn btn-sm btn-primary"
                                                    onClick={() => {
                                                        navigate(`/admin/routes/${route.id}/stations`);
                                                    }}
                                                >
                                                    Edit Stations
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-primary"
                                                    onClick={() => {
                                                        navigate(`/admin/routes/${route.id}/travels`);
                                                    }}
                                                >
                                                    See Travels
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-primary"
                                                    onClick={() => {
                                                        setFormData(route);
                                                        setEditingId(route.id);
                                                        setShowForm(true);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() =>
                                                        handleDelete(route.id)
                                                    }
                                                >
                                                    Delete
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

export default Routes;
