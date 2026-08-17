import { Outlet } from "react-router-dom";
import Footer from "../pages/Footer";
import NavBar from "../pages/NavBar";
import { AuthProvider } from "../context/AuthContext";

const RootLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <AuthProvider>
                <NavBar />

                <main className="flex-grow">
                    <Outlet />
                </main>
                
                <Footer />
            </AuthProvider>
        </div>
    );
}

export default RootLayout;