import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import TripColumn from "../components/TripColumn";
import BookingSuccess from "../components/BookingSuccess";
import PaymentForm from "../components/PaymentForm";

const Book = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [showPayment, setShowPayment] = useState(false);
    const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
    const [outboundTrip, setOutboundTrip] = useState(null);
    const [returnTrip, setReturnTrip] = useState(null);
    const [stations, setStations] = useState([]);

    const passengers = parseInt(searchParams.get("passengers") || "1");
    const outboundId = searchParams.get("outboundTravelId");
    const returnId = searchParams.get("returnTravelId");

    useEffect(() => {
        const token = localStorage.getItem('sessionToken');
        if (!token) {
            console.warn("No session token found. Redirecting to login.");
            navigate("/login?message=Please log in to book your trip");
            return; 
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch all stations to resolve names
                const statRes = await fetch("/api/station");
                const statData = await statRes.json();
                const allStations = Array.isArray(statData) ? statData : statData.data || [];
                setStations(allStations);

                // Fetch outbound trip details
                const outRes = await fetch(`/api/travel/${outboundId}`);
                if (!outRes.ok) throw new Error("Failed to fetch outbound trip");
                const outData = await outRes.json();
                setOutboundTrip({
                    ...outData,
                    date: searchParams.get("outboundDate"),
                    duration: searchParams.get("outboundDuration"), // Add duration from URL params
                    departureTime: searchParams.get("outboundDeparture"),
                    arrivalTime: searchParams.get("outboundArrival"),
                    origin: allStations.find(s => s.id === parseInt(searchParams.get("outboundStat1"))),
                    destination: allStations.find(s => s.id === parseInt(searchParams.get("outboundStat2")))
                });

                // Fetch return trip if applicable
                if (returnId) {
                    const retRes = await fetch(`/api/travel/${returnId}`);
                    if (!retRes.ok) throw new Error("Failed to fetch return trip");
                    const retData = await retRes.json();
                    setReturnTrip({
                        ...retData,
                        duration: searchParams.get("returnDuration"), // Add duration from URL params
                        date: searchParams.get("returnDate"),
                        departureTime: searchParams.get("returnDeparture"),
                        arrivalTime: searchParams.get("returnArrival"),
                        origin: allStations.find(s => s.id === parseInt(searchParams.get("returnStat1"))),
                        destination: allStations.find(s => s.id === parseInt(searchParams.get("returnStat2")))
                    });
                }
            } catch (err) {
                console.error("Error loading booking details:", err);
            } finally {
                setLoading(false);
            }
        };

        if (outboundId) fetchData();
    }, [outboundId, returnId, searchParams]);

    const calculatePrice = (durationStr) => {
        if (!durationStr) return 0;

        const matches = durationStr.match(/(\d+)h\s+(\d+)m/);
        const [hours, minutes] = matches ? [parseInt(matches[1]), parseInt(matches[2])] : [0, 0];
        const totalMinutes = (hours * 60) + minutes;

        return parseFloat((totalMinutes / 12.3).toFixed(2));
    };

    const handlePaymentSuccess = async () => {
        setLoading(true);
        try {
            const tickets = [];
            
            // Create ticket data for outbound journey
            for (let i = 0; i < passengers; i++) {
                tickets.push({
                    travelId: outboundTrip.id,
                    date: outboundTrip.date,
                    from: outboundTrip.origin.id || "1",
                    to: outboundTrip.destination.id || "1",
                    departure_time: outboundTrip.departureTime,
                    arrival_time: outboundTrip.arrivalTime,
                    price: outPrice
                });
            }

            // Create ticket data for return journey if selected
            if (returnTrip) {
                for (let i = 0; i < passengers; i++) {
                    tickets.push({
                        travelId: returnTrip.id,
                        date: returnTrip.date,
                        from: returnTrip.origin.id || "1",
                        to: returnTrip.destination.id || "1",
                        departure_time: returnTrip.departureTime,
                        arrival_time: returnTrip.arrivalTime,
                        price: retPrice
                    });
                }
            }

            const response = await fetch("/api/ticket/bulk", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('sessionToken')}`
                },
                body: JSON.stringify({ tickets }),
            });

            if (!response.ok) throw new Error("Failed to save tickets");

            setShowPaymentSuccess(true);
        } catch (err) {
            console.error("Booking Error:", err);
            alert("The payment was processed, but we couldn't issue your tickets. Please contact support.");
        } finally {
            setLoading(false);
        }
    };

    const outPrice = outboundTrip ? calculatePrice(outboundTrip.duration) : 10;
    const retPrice = returnTrip ? calculatePrice(returnTrip.duration) : 10;
    const totalPrice = ((outPrice + retPrice) * passengers).toFixed(2);

    if (loading) return <div className="loading p-8 text-center">Loading your journey details...</div>;

    return (
        <div className="app-container">
            <div className="page-container max-w-8xl">
                {showPaymentSuccess ? (
                    <BookingSuccess totalPrice={totalPrice} />
                ) : (
                    <>
                <div className="page-header mb-8">
                    <h1>{showPayment ? "Payment Information" : "Confirm Your Booking"}</h1>
                    <p>{showPayment ? "Enter your card details to complete the purchase" : "Review your travel details before proceeding to payment"}</p>
                </div>

                {showPayment ? (
                    <PaymentForm 
                        totalPrice={totalPrice} 
                        onBack={() => setShowPayment(false)} 
                        onPaymentSuccess={handlePaymentSuccess}
                    />
                ) : (
                    <>
                {/* Summary Bar */}
                <div className="bg-blue-600 rounded-xl p-6 text-white shadow-lg mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex gap-8">
                        <div>
                            <p className="text-blue-100 text-xs uppercase font-bold">Passengers</p>
                            <p className="text-2xl font-bold">{passengers}</p>
                        </div>
                        <div>
                            <p className="text-blue-100 text-xs uppercase font-bold">Trip Type</p>
                            <p className="text-2xl font-bold">{returnTrip ? "Round Trip" : "One Way"}</p>
                        </div>
                    </div>
                    <div className="text-center md:text-right">
                        <p className="text-blue-100 text-xs uppercase font-bold">Total Price</p>
                        <p className="text-4xl font-black">{totalPrice}€</p>
                    </div>
                </div>

                <div className={`grid gap-8 ${returnTrip ? "md:grid-cols-2" : "max-w-2xl mx-auto"}`}>
                    {outboundTrip && (
                        <TripColumn 
                            trip={outboundTrip} 
                            title="Outbound Journey" 
                            type="outbound" 
                        />
                    )}
                    
                    {returnTrip && (
                        <TripColumn 
                            trip={returnTrip} 
                            title="Return Journey" 
                            type="return" 
                        />
                    )}
                </div>

                <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-4">
                    <button 
                        className="btn btn-secondary w-full md:w-auto"
                        onClick={() => navigate(-1)}
                    >
                        ← Back to Search
                    </button>
                    <button 
                        className="btn btn-primary btn-lg px-12 py-4 text-xl w-full md:w-auto shadow-xl hover:scale-105"
                        onClick={() => setShowPayment(true)}
                    >
                        Confirm and Pay
                    </button>
                </div>
                    </>
                )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Book;
