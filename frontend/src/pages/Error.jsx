import { useNavigate } from "react-router-dom";

const Error = () => {
    const navigate = useNavigate();
    const errorCode = 404;
    const errorTitle = "Page Not Found";
    const errorDescription =
        "The page you are looking for does not exist or has been moved.";

    return (
        <div className="app-container">
            <div className="page-container">
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h1 className="text-5xl mb-2 text-red-600">{errorCode}</h1>
                    <h2 className="text-3xl mb-4 text-slate-800">
                        {errorTitle}
                    </h2>
                    <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
                        {errorDescription}
                    </p>
                    <div className="btn-group justify-center">
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate("/")}
                        >
                            Go to Home
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate(-1)}
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;
