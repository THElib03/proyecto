import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyTickets = () => {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("all");
    const token = localStorage.getItem('sessionToken');

    useEffect(() => {
        if (!token) {
            navigate("/login?message=Please log in to view your tickets");
        } else {
            fetchStations();
            fetchTickets();
        }
    }, [token, navigate]);

    const fetchStations = async () => {
        try {
            const response = await fetch("/api/station");
            const data = await response.json();
            setStations(Array.isArray(data) ? data : data.data || []);
        } catch (err) {
            console.error("Error fetching stations:", err);
        }
    };

    const fetchTickets = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/ticket/my', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error("Failed to fetch tickets");
            const data = await response.json();
            setTickets(Array.isArray(data) ? data : data.tickets || []);
        } catch (err) {
            console.error("Error fetching tickets:", err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "active":
                return "#28a745";
            case "completed":
                return "#6c757d";
            case "cancelled":
                return "#dc3545";
            default:
                return "#007bff";
        }
    };

    const handleDownloadTicket = (ticketId) => {
        // TODO: Implement ticket download
        console.log("Download ticket:", ticketId);
    };

    const handleCancelTicket = (ticketId) => {
        if (confirm("Are you sure you want to cancel this ticket?")) {
            // TODO: Implement ticket cancellation
            console.log("Cancel ticket:", ticketId);
        }
    };

    const getStationName = (station) => {
        if (!station) return "Unknown Station";
        return station.name ? `${station.city} (${station.name})` : station.city;
    };

    const getTicketStatus = (ticket) => {
        if (!ticket.date || !ticket.departure) return "active";
        const departureDateTime = new Date(`${ticket.date}T${ticket.departure}:00`);
        const cutoffTime = new Date(departureDateTime.getTime() + 2 * 60 * 60 * 1000);
        return new Date() > cutoffTime ? "completed" : "active";
    };

    const filteredTickets =
        filter === "all" ? tickets : tickets.filter((t) => getTicketStatus(t) === filter);

    return (
        <div className="app-container">
            <div className="page-container">
                <div className="page-header">
                    <div>
                        <h1>My Tickets</h1>
                        <p>View and manage your bookings</p>
                    </div>
                </div>

                <div className="mb-8 flex gap-2 flex-wrap">
                    {["all", "active", "completed", "cancelled"].map(
                        (status) => (
                            <button
                                key={status}
                                className={`btn btn-sm ${filter === status ? "btn-primary" : "btn-secondary"}`}
                                onClick={() => setFilter(status)}
                            >
                                {status.charAt(0).toUpperCase() +
                                    status.slice(1)}
                            </button>
                        ),
                    )}
                </div>

                {loading ? (
                    <div className="loading">Loading your tickets...</div>
                ) : filteredTickets.length === 0 ? (
                    <div className="empty-state">
                        <h3>No tickets found</h3>
                        <p>
                            You haven't booked any tickets yet. Start your
                            journey today!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-2">
                        {filteredTickets.map((ticket) => {
                            const status = getTicketStatus(ticket);
                            return (
                                <div key={ticket.id} className="card">
                                    <div className="card-header">
                                        <h3>{getStationName(ticket.from)} → {getStationName(ticket.to)}</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <p>
                                                <strong>Departure:</strong>{" "}
                                                {ticket.date} {ticket.departure}
                                            </p>
                                            <p>
                                                <strong>Seat:</strong> {ticket.seat || "Unassigned"}
                                            </p>
                                            <p>
                                                <strong>Price:</strong>{" "}
                                                {ticket.price}€
                                            </p>
                                            <p>
                                                <strong>Status:</strong>{" "}
                                                <span
                                                    style={{
                                                        color: getStatusColor(
                                                            status,
                                                        ),
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="btn-group flex-col">
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() =>
                                                    handleDownloadTicket(ticket.id)
                                                }
                                            >
                                                Download
                                            </button>
                                            {status === "active" && (
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() =>
                                                        handleCancelTicket(
                                                            ticket.id,
                                                        )
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyTickets;
