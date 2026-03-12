import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const RootLayout = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path ? 'active' : ''

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-100 w-full! bg-blue-500 py-4 shadow-md">
        <div className="mx-auto w-full! px-8 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-white! no-underline cursor-pointer">
            🚌 BusBooking
          </Link>
          <div className="flex w-full justify-end items-center gap-8 md:gap-0">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="md:hidden bg-transparent! border-none text-black text-xl! cursor-pointer menu-toggle"
            >
              ☰
            </button>

            {/* Navigation Links */}
            <div className={`${isNavOpen ? 'flex' : 'hidden'} md:flex gap-8 items-center flex-col md:flex-row md:flex-wrap absolute md:relative top-16 md:top-0 left-0 right-0 bg-blue-500 md:bg-transparent p-4 md:p-0 w-full md:w-auto`}>
              <Link to="/" className={`text-white! no-underline font-medium px-3 py-2 rounded transition-colors ${isActive('/')}`}>
                Home
              </Link>
              <Link to="/search" className={`text-white! no-underline font-medium px-3 py-2 rounded transition-colors ${isActive('/search')}`}>
                Search
              </Link>
              <Link to="/bonds" className={`text-white! no-underline font-medium px-3 py-2 rounded transition-colors ${isActive('/bonds')}`}>
                Bonds
              </Link>
              <Link to="/promos" className={`text-white! no-underline font-medium px-3 py-2 rounded transition-colors ${isActive('/promos')}`}>
                Promos
              </Link>

              {/* User Menu */}
              <div className="flex gap-4 items-center ml-auto pl-8 border-l border-white border-opacity-20">
                <Link to="/my-tickets" className={`text-white! no-underline font-medium px-3 py-2 rounded transition-colors ${isActive('/my-tickets')}`}>
                  My Tickets
                </Link>
                <Link to="/profile" className={`text-white! no-underline font-medium px-3 py-2 rounded transition-colors ${isActive('/profile')}`}>
                  Profile
                </Link>
                <Link to="/settings" className={`text-white! no-underline font-medium px-3 py-2 rounded transition-colors ${isActive('/settings')}`}>
                  Settings
                </Link>
                <Link to="/admin" className={`text-white! no-underline font-medium px-3 py-2 rounded transition-colors ${isActive('/admin')}`}>
                  Admin
                </Link>
                <Link to="/login" className={`text-blue-500 no-underline font-semibold px-4 py-2 rounded bg-white ${isActive('/login')}`}>
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col w-full!">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 border-t border-slate-300 py-8 mt-12">
        <div className="w-full! mx-auto px-8 text-center">
          <p>&copy; 2024 Bus Booking System. All rights reserved.</p>
          <div className="flex justify-center gap-8 mt-4">
            <a href="#" className="text-blue-500 no-underline">Privacy Policy</a>
            <a href="#" className="text-blue-500 no-underline">Terms of Service</a>
            <a href="#" className="text-blue-500 no-underline">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  )
  }
export default RootLayout