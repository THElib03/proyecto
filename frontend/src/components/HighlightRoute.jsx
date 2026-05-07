import React from "react";
import { useNavigate } from "react-router-dom";

const HighlightRoute = ({ popularRoutes }) => {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {popularRoutes.map((route) => (
                <div
                    key={route.id}
                    className="bg-white rounded-lg p-6 shadow transition-transform hover:-translate-y-1 hover:shadow-lg"
                >
                    <div className="border-b border-slate-200 pb-4 mb-4">
                        <h3 className="text-blue-500 text-xl">
                            {route.name}
                        </h3>
                    </div>
                    <div className="leading-relaxed">
                        <p className="text-2xl text-blue-600 font-bold">
                            Visit cities like {route.names.map((n) => n).join(", ")} and more!
                        </p>
                    </div>
                    <div className="border-t border-slate-200 pt-4 mt-4">
                        <button
                            className="px-6 py-3 rounded-md text-base font-medium cursor-pointer transition-all inline-block text-center bg-gray-500! text-white hover:bg-blue-700 w-full"
                            onClick={() => {
                                navigate(
                                    `/admin/routes/${route.id}/stations`,
                                );
                            }}
                            disabled
                        >
                            View Route
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HighlightRoute;
