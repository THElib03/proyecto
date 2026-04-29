import React from "react";

const Footer = () => {
    return (
        <footer className="bg-slate-300 border-t border-slate-300 py-8 mt-12">
            <div className="w-full! mx-auto px-8 text-center">
                <p>&copy; 2024 Bus Booking System. All rights reserved.</p>
                <div className="flex justify-center gap-8 mt-4">
                    <a href="#" className="text-blue-500 no-underline">
                        Privacy Policy
                    </a>
                    <a href="#" className="text-blue-500 no-underline">
                        Terms of Service
                    </a>
                    <a href="#" className="text-blue-500 no-underline">
                        Contact Us
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
