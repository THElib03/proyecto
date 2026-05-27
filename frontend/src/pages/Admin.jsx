import { Link } from "react-router-dom";

const Admin = () => {
    const adminMetadata = [
        {key: "buses", title: "Buses", description: "Manage bus fleet and details", icon: "🚌",},
        {key: "routes", title: "Routes", description: "Manage travel routes and schedules", icon: "🗺️",},
        {key: "stations", title: "Stations", description: "Manage stations and locations", icon: "🏢",},
        {key: "support", title: "Support", description: "View and respond to user inquiries", icon: "📞",},
    ];

    return (
        <div className="app-container">
            <div className="page-container">
                <div className="page-header">
                    <div>
                        <h1>Admin Dashboard</h1>
                        <p>Manage buses, routes, and stations</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {adminMetadata.map((section) => (
                        <Link
                            key={section.key}
                            to={section.key}
                            className="no-underline text-inherit flex"
                        >
                            <div className="bg-white rounded-lg p-6 shadow transition-transform hover:-translate-y-1 hover:shadow-lg w-full">
                                <div className="text-6xl mb-4">
                                    {section.icon}
                                </div>
                                <div className="border-b border-slate-200 pb-4 mb-4">
                                    <h3 className="text-blue-500 text-xl">
                                        {section.title}
                                    </h3>
                                </div>
                                <div className="leading-relaxed">
                                    <p>{section.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Admin;