import React from "react";

const Footer = () => {
    return (
        <footer className="bg-blue-500 border-t border-slate-300 py-2 mt-12">
            <div className="w-full! mx-auto px-8 text-center">
                <p className="text-slate-300">&copy; 2026 Saal Booking System. Copyleft under <a href="https://www.gnu.org/licenses/gpl-3.0.html" className="text-slate-300 no-underline">GPL 3.0 License</a>.</p>
                <div className="flex justify-center gap-8 mt-4">
                    <a href="https://github.com/THElib03/proyecto" className="footer-link">
                        Saal's GitHub
                    </a>
                    <a href="/policy" className="footer-link">
                        Privacy Policy
                    </a>
                    <a href="#" className="footer-link">
                        Terms of Service
                    </a>
                    <a href="mailto:marinvilchesmartin@gmail.com" className="footer-link">
                        Contact Us
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
