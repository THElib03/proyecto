import { useState, useEffect } from "react";

const MyTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        setLoading(true);
        try {
            // TODO: Implement API call to fetch user tickets
            // const response = await fetch('/api/my-tickets')
            // const data = await response.json()
            // setTickets(data)
            setTickets([
                {
                    id: 1,
                    route: "New York → Boston",
                    departure: "2024-03-15 08:00",
                    seat: "12A",
                    status: "active",
                    price: "$45",
                },
                {
                    id: 2,
                    route: "Boston → Philadelphia",
                    departure: "2024-03-20 14:30",
                    seat: "5B",
                    status: "active",
                    price: "$65",
                },
                {
                    id: 3,
                    route: "New York → Boston",
                    departure: "2024-02-28 08:00",
                    seat: "8C",
                    status: "completed",
                    price: "$45",
                },
            ]);
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

    const filteredTickets =
        filter === "all" ? tickets : tickets.filter((t) => t.status === filter);

    return (
        <div className="app-container">
            <div className="page-container">
                <div className="page-header">
                    <h1>My Tickets</h1>
                    <p>View and manage your bookings</p>
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
                        {filteredTickets.map((ticket) => (
                            <div key={ticket.id} className="card">
                                <div className="card-header">
                                    <h3>{ticket.route}</h3>
                                </div>
                                <div className="card-body">
                                    <div className="mb-3">
                                        <p>
                                            <strong>Departure:</strong>{" "}
                                            {ticket.departure}
                                        </p>
                                        <p>
                                            <strong>Seat:</strong> {ticket.seat}
                                        </p>
                                        <p>
                                            <strong>Price:</strong>{" "}
                                            {ticket.price}
                                        </p>
                                        <p>
                                            <strong>Status:</strong>{" "}
                                            <span
                                                style={{
                                                    color: getStatusColor(
                                                        ticket.status,
                                                    ),
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {ticket.status
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    ticket.status.slice(1)}
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
                                        {ticket.status === "active" && (
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
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyTickets;
