import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const RootLayout = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path ? 'active' : ''

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <div style={styles.navContainer}>
          <Link to="/" style={styles.logo}>
            🚌 BusBooking
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            style={styles.menuToggle}
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="menu-toggle"
          >
            ☰
          </button>

          {/* Navigation Links */}
          <div style={{ ...styles.navLinks, display: isNavOpen ? 'flex' : 'none' }}>
            <Link to="/" style={styles.navLink} className={isActive('/')}>
              Home
            </Link>
            <Link to="/search" style={styles.navLink} className={isActive('/search')}>
              Search
            </Link>
            <Link to="/bonds" style={styles.navLink} className={isActive('/bonds')}>
              Bonds
            </Link>
            <Link to="/promos" style={styles.navLink} className={isActive('/promos')}>
              Promos
            </Link>

            {/* User Menu */}
            <div style={styles.userMenu}>
              <Link to="/my-tickets" style={styles.navLink} className={isActive('/my-tickets')}>
                My Tickets
              </Link>
              <Link to="/profile" style={styles.navLink} className={isActive('/profile')}>
                Profile
              </Link>
              <Link to="/settings" style={styles.navLink} className={isActive('/settings')}>
                Settings
              </Link>
              <Link to="/admin" style={styles.navLink} className={isActive('/admin')}>
                Admin
              </Link>
              <Link to="/login" style={{ ...styles.navLink, ...styles.btnLogin }} className={isActive('/login')}>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={styles.main}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <p>&copy; 2024 Bus Booking System. All rights reserved.</p>
          <div style={styles.footerLinks}>
            <a href="#" style={styles.footerLink}>Privacy Policy</a>
            <a href="#" style={styles.footerLink}>Terms of Service</a>
            <a href="#" style={styles.footerLink}>Contact Us</a>
          </div>
        </div>
      </footer>
      
      </div>
    )
  }
const styles = {
  navbar: {
    backgroundColor: '#007bff',
    padding: '1rem 0',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  menuToggle: {
    display: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
  navLinks: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
    padding: '0.5rem 0.75rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  },
  navLinkActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  userMenu: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    marginLeft: 'auto',
    paddingLeft: '2rem',
    borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
  },
  btnLogin: {
    backgroundColor: 'white',
    color: '#007bff',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    fontWeight: '600',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  footer: {
    backgroundColor: '#f8f9fa',
    borderTop: '1px solid #dee2e6',
    padding: '2rem 0',
    marginTop: '3rem',
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    textAlign: 'center',
  },
  footerLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginTop: '1rem',
  },
  footerLink: {
    color: '#007bff',
    textDecoration: 'none',
  },
}
export default RootLayout