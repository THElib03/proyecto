import { useState, useEffect } from "react";

const Bonds = () => {
    const [bonds, setBonds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sourceFilter, setSourceFilter] = useState("");
    const [destFilter, setDestFilter] = useState("");
    const [stations, setStations] = useState([]);

    useEffect(() => {
        fetchBonds();
        fetchStations();
    }, []);

    const fetchBonds = async () => {
        setLoading(true);
        try {
            // TODO: Implement API call to fetch bonds
            // const response = await fetch('/api/bonds')
            // const data = await response.json()
            // setBonds(data)
            setBonds([
                {
                    id: 1,
                    route: "New York → Boston",
                    source: "New York",
                    destination: "Boston",
                    discount: "15%",
                    description: "Monthly travel pass with special discounts",
                    price: "$99/month",
                },
                {
                    id: 2,
                    route: "Boston → Philadelphia",
                    source: "Boston",
                    destination: "Philadelphia",
                    discount: "20%",
                    description: "Frequently traveled route with extra savings",
                    price: "/month $149",
                },
                {
                    id: 3,
                    route: "New York → Philadelphia",
                    source: "New York",
                    destination: "Philadelphia",
                    discount: "25%",
                    description: "Premium bond with unlimited trips",
                    price: "$199/month",
                },
            ]);
            setStations(["New York", "Boston", "Philadelphia"]);
        } catch (err) {
            console.error("Error fetching bonds:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchStations = async () => {
        try {
            // TODO: Implement API call to fetch stations for filters
        } catch (err) {
            console.error("Error fetching stations:", err);
        }
    };

    const handlePurchaseBond = (bondId) => {
        // TODO: Implement bond purchase
        console.log("Purchase bond:", bondId);
    };

    const filteredBonds = bonds.filter(
        (bond) =>
            (sourceFilter === "" || bond.source === sourceFilter) &&
            (destFilter === "" || bond.destination === destFilter),
    );

    return (
        <div className="app-container">
            <div className="page-container">
                <div className="page-header">
                    <h1>Travel Bonds</h1>
                    <p>Exclusive discounts and offers on frequent routes</p>
                </div>

                <div className="card mb-8">
                    <div className="card-header">
                        <h3>Search Bonds</h3>
                    </div>
                    <div className="card-body">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="form-group">
                                <label>From</label>
                                <select
                                    value={sourceFilter}
                                    onChange={(e) =>
                                        setSourceFilter(e.target.value)
                                    }
                                >
                                    <option value="">All Stations</option>
                                    {stations.map((station) => (
                                        <option key={station} value={station}>
                                            {station}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>To</label>
                                <select
                                    value={destFilter}
                                    onChange={(e) =>
                                        setDestFilter(e.target.value)
                                    }
                                >
                                    <option value="">All Stations</option>
                                    {stations.map((station) => (
                                        <option key={station} value={station}>
                                            {station}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-end">
                                <button
                                    className="btn btn-secondary w-full"
                                    onClick={() => {
                                        setSourceFilter("");
                                        setDestFilter("");
                                    }}
                                >
                                    Reset Filters
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="loading">Loading bonds...</div>
                ) : filteredBonds.length === 0 ? (
                    <div className="empty-state">
                        <h3>No bonds available</h3>
                        <p>Try adjusting your search filters</p>
                    </div>
                ) : (
                    <div className="grid grid-2">
                        {filteredBonds.map((bond) => (
                            <div key={bond.id} className="card">
                                <div className="card-header">
                                    <h3>{bond.route}</h3>
                                </div>
                                <div className="card-body">
                                    <p className="mb-4">{bond.description}</p>
                                    <div className="mb-4 p-4 bg-blue-100 rounded border-l-4 border-blue-500">
                                        <p className="text-blue-500 text-lg font-bold mb-1">
                                            Save {bond.discount}
                                        </p>
                                        <p className="text-slate-600 text-sm">
                                            Monthly price:{" "}
                                            <strong>{bond.price}</strong>
                                        </p>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button
                                        className="btn btn-primary w-full"
                                        onClick={() =>
                                            handlePurchaseBond(bond.id)
                                        }
                                    >
                                        Purchase Bond
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bonds;
