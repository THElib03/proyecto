import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const RouteStations = () => {
    const { routeId } = useParams();
    const navigate = useNavigate();
    const [routeStations, setRouteStations] = useState([]);
    const [availableStations, setAvailableStations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [routeName, setRouteName] = useState("");
    const [selectedStationId, setSelectedStationId] = useState("");

    useEffect(() => {
        fetchRouteData();
        fetchAvailableStations();
    }, [routeId]);

    const fetchRouteData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/route/${routeId}`);
            if (!response.ok) throw new Error("Failed to fetch route");
            const data = await response.json();
            setRouteName(data.name);

            // Fetch stations for this route
            const stationsResponse = await fetch(`/api/route/${routeId}/stations`);
            if (!stationsResponse.ok) throw new Error("Failed to fetch route stations");
            const stationsData = await stationsResponse.json();
            setRouteStations(Array.isArray(stationsData) ? stationsData : stationsData.data || []);
        } catch (err) {
            console.error("Error fetching route data:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchAvailableStations = async () => {
        try {
            const response = await fetch("/api/station");
            if (!response.ok) throw new Error("Failed to fetch stations");
            const data = await response.json();
            setAvailableStations(Array.isArray(data) ? data : data.data || []);
        } catch (err) {
            console.error("Error fetching stations:", err);
        }
    };

    const handleAddStation = async () => {
        if (!selectedStationId) {
            alert("Please select a station");
            return;
        }

        try {
            const response = await fetch(`/api/route/${routeId}/stations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    stationId: parseInt(selectedStationId),
                }),
            });

            if (!response.ok) throw new Error("Failed to add station");
            setSelectedStationId("");
            await fetchRouteData();
        } catch (err) {
            console.error("Error adding station:", err);
        }
    };

    const handleRemoveStation = async (stationId) => {
        if (confirm("Are you sure you want to remove this station?")) {
            try {
                const response = await fetch(
                    `/api/route/${routeId}/stations/${stationId}`,
                    {
                        method: "DELETE",
                    }
                );

                if (!response.ok) throw new Error("Failed to remove station");
                await fetchRouteData();
            } catch (err) {
                console.error("Error removing station:", err);
            }
        }
    };

    const handlePositionChange = async (stationId, newPosition) => {
        try {
            const response = await fetch(
                `/api/route/${routeId}/stations/${stationId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        position: parseInt(newPosition),
                    }),
                }
            );

            if (!response.ok) throw new Error("Failed to update station position");
            await fetchRouteData();
        } catch (err) {
            console.error("Error updating station position:", err);
        }
    };

    // Filter out stations already in the route
    const stationIdsInRoute = routeStations.map((rs) => rs.station.id);
    const filteredStations = availableStations.filter(
        (station) => !stationIdsInRoute.includes(station.id)
    );

    return (
        <div className="app-container">
            <div className="page-container">
                <div className="page-header">
                    <h1>Manage Stations for Route: {routeName}</h1>
                    <p>Organize and manage stations in this route</p>
                </div>

                <div className="btn-group">
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate("/admin/routes")}
                    >
                        ← Back to Routes
                    </button>
                </div>

                <div className="card mb-8">
                    <div className="card-header">
                        <h3>Add Station to Route</h3>
                    </div>
                    <div className="card-body">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="form-group">
                                <label>Select Station</label>
                                <select
                                    value={selectedStationId}
                                    onChange={(e) =>
                                        setSelectedStationId(e.target.value)
                                    }
                                >
                                    <option value="">-- Choose a station --</option>
                                    {filteredStations.map((station) => (
                                        <option key={station.id} value={station.id}>
                                            {station.name} ({station.city})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ display: "flex", alignItems: "flex-end" }}>
                                <button
                                    className="btn btn-success"
                                    onClick={handleAddStation}
                                >
                                    + Add Station
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="loading">Loading stations...</div>
                ) : routeStations.length === 0 ? (
                    <div className="empty-state">
                        <h3>No stations in this route</h3>
                        <p>Add your first station using the form above</p>
                    </div>
                ) : (
                    <div className="card">
                        <div className="card-header">
                            <h3>Stations in Route ({routeStations.length})</h3>
                        </div>
                        <div className="card-body">
                            <div className="space-y-2">
                                {routeStations.map((routeStation) => (
                                    <div
                                        key={routeStation.id}
                                        className="flex items-center gap-4 p-4 border rounded bg-gray-50"
                                    >
                                        <div className="form-group" style={{ width: "80px" }}>
                                            <label>Position</label>
                                            <input
                                                type="number"
                                                min="1"
                                                value={routeStation.position}
                                                onChange={(e) =>
                                                    handlePositionChange(
                                                        routeStation.station.id,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: "bold" }}>
                                                {routeStation.station.name}
                                            </div>
                                            <div style={{ fontSize: "0.9em", color: "#666" }}>
                                                {routeStation.station.city} •{" "}
                                                {routeStation.station.address}
                                            </div>
                                        </div>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() =>
                                                handleRemoveStation(routeStation.station.id)
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RouteStations;
