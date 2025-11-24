import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/index.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const isHome = location.pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="app-layout">
      <header className={`header ${isHome ? 'header-transparent' : 'header-glass'}`}>
        <div className="container header-content">
          <Link to="/" className="logo">
            VIRTUAL<span className="logo-accent">TRY</span>ON
          </Link>

          <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>

            {user ? (
              <>
                <span className="user-email">{user.email}</span>
                <button onClick={handleSignOut} className="btn btn-secondary nav-btn">Sign Out</button>
                <Link to="/try-on" className="btn btn-primary nav-cta">Try On Now</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Log In</Link>
                <Link to="/signup" className="btn btn-primary nav-cta">Sign Up</Link>
              </>
            )}
          </nav>

          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>
      </header>

      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <h3>VirtualTryOn</h3>
            <p>Experience the future of fashion with our AI-powered fitting room.</p>
          </div>
          <div className="footer-links">
            <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        .app-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: var(--color-background);
        }

        .header {
          padding: 1.5rem 0;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          transition: all 0.3s ease;
        }

        .header-glass {
          background: rgba(15, 15, 18, 0.8);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        
        .header-transparent {
          background: transparent;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-family: var(--font-family-sans);
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.05em;
          color: var(--color-text-main);
          z-index: 101;
        }

        .logo-accent {
          color: var(--color-primary);
        }

        .nav {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-link {
          font-weight: 500;
          color: var(--color-text-muted);
          position: relative;
          cursor: pointer;
        }

        .nav-link:hover, .nav-link.active {
          color: var(--color-text-main);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--color-primary);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }

        .nav-cta {
          padding: 0.6rem 1.2rem;
          font-size: 0.9rem;
        }

        .nav-btn {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
        }

        .user-email {
            font-size: 0.9rem;
            color: var(--color-text-muted);
        }

        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 101;
        }

        .main-content {
          flex: 1;
          padding-top: 80px; /* Space for fixed header */
        }

        .footer {
          padding: 4rem 0 2rem;
          background-color: var(--color-surface);
          border-top: 1px solid var(--color-border);
          margin-top: auto;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .footer-brand h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          background: linear-gradient(to right, #fff, #a1a1aa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .footer-brand p {
          max-width: 300px;
          font-size: 0.9rem;
        }

        .footer-links {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }

        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block;
            }

            .nav {
                position: fixed;
                top: 0;
                right: -100%;
                width: 70%;
                height: 100vh;
                background: var(--color-surface);
                flex-direction: column;
                padding: 6rem 2rem;
                transition: right 0.3s ease;
                box-shadow: var(--shadow-lg);
            }

            .nav-open {
                right: 0;
            }
        }
      `}</style>
    </div>
  );
};

export default Layout;
