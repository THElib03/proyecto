import React from 'react'

const calculatePrice = (durationStr) => {
    if (!durationStr) return 0;

    const matches = durationStr.match(/(\d+)h\s+(\d+)m/);
    const [hours, minutes] = matches ? [parseInt(matches[1]), parseInt(matches[2])] : [0, 0];
    const totalMinutes = (hours * 60) + minutes;

    return parseFloat((totalMinutes / 12.3).toFixed(2));
};

const TripColumn = ({ trip, title, type }) => (
        <div className="card">
            <div className="card-header bg-slate-50">
                <h3 className="text-blue-600">{title}</h3>
                <p className="text-slate-500 text-sm">{trip.date}</p>
            </div>
            <div className="card-body">
                <div className="space-y-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase">From</p>
                            <p className="text-lg font-semibold">{trip.origin?.city}</p>
                            <p className="text-sm text-slate-600">{trip.origin?.name}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-bold text-slate-400 uppercase">Departure</p>
                            <p className="text-lg font-semibold text-blue-600">{trip.departureTime}</p>
                        </div>
                    </div>

                    <div className="border-l-2 border-dashed border-slate-200 ml-2 py-4 pl-6 relative">
                        <div className="absolute -left-1.25 top-0 w-2 h-2 rounded-full bg-slate-300"></div>
                        <div className="absolute -left-1.25 bottom-0 w-2 h-2 rounded-full bg-slate-300"></div>
                        <p className="text-sm text-slate-500 italic">Travel duration: {trip.duration}</p>
                    </div>

                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase">To</p>
                            <p className="text-lg font-semibold">{trip.destination?.city}</p>
                            <p className="text-sm text-slate-600">{trip.destination?.name}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-slate-700">Bus: {trip.bus?.plateNum}</p>
                            <p className="text-xs text-slate-500">{trip.bus?.model}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-footer bg-slate-50 text-right">
                <p className="text-slate-600">Price per passenger: <span className="font-bold text-green-600">{calculatePrice(trip.duration)}€</span></p>
            </div>
        </div>
    );

export default TripColumn