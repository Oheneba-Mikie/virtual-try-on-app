import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css';

const Layout = ({ children }) => {
    return (
        <div className="app-layout">
            <header className="header">
                <div className="container header-content">
                    <Link to="/" className="logo">
                        VIRTUAL<span style={{ color: 'var(--color-accent)' }}>TRY</span>ON
                    </Link>
                    <nav className="nav">
                        <Link to="/">Home</Link>
                        <Link to="/try-on" className="nav-cta">Try On Now</Link>
                    </nav>
                </div>
            </header>

            <main className="main-content">
                {children}
            </main>

            <footer className="footer">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Virtual Try-On App. Powered by Nano Banana API.</p>
                </div>
            </footer>

            <style>{`
        .app-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .header {
          padding: var(--spacing-sm) 0;
          background-color: var(--color-background);
          border-bottom: 1px solid var(--color-border);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-family: var(--font-family-serif);
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .nav {
          display: flex;
          gap: var(--spacing-md);
          align-items: center;
        }

        .nav-cta {
          padding: 0.5rem 1rem;
          background-color: var(--color-primary);
          color: var(--color-secondary);
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
        }
        
        .nav-cta:hover {
          color: var(--color-primary);
          background-color: var(--color-accent);
        }

        .main-content {
          flex: 1;
        }

        .footer {
          padding: var(--spacing-md) 0;
          background-color: var(--color-primary);
          color: var(--color-secondary);
          text-align: center;
          font-size: 0.9rem;
          margin-top: auto;
        }
      `}</style>
        </div>
    );
};

export default Layout;
