import { Outlet } from "react-router-dom";
import Footer from "../pages/Footer";
import NavBar from "../pages/NavBar";
import { AuthProvider } from "../context/AuthContext";

const RootLayout = () => {

    return (
        <div className="flex flex-col min-h-screen">
            <AuthProvider>
                <NavBar />

                {/* Main Content */}
                <main className="flex flex-col w-full!">
                    <Outlet />
                </main>

                <Footer />
            </AuthProvider>
        </div>
    );
};
export default RootLayout;
