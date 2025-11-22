import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Home = () => {
    return (
        <Layout>
            <div className="hero">
                <div className="container hero-content">
                    <h1 className="hero-title">
                        Experience Fashion <br />
                        <span className="highlight">Reimagined</span>
                    </h1>
                    <p className="hero-subtitle">
                        Upload your photo. Choose a dress. See the magic happen instantly with our AI-powered virtual try-on technology.
                    </p>
                    <Link to="/try-on" className="btn btn-primary">
                        Start Virtual Try-On
                    </Link>
                </div>
            </div>

            <style>{`
        .hero {
          height: 80vh;
          display: flex;
          align-items: center;
          background: linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.8)), url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
        }

        .hero-content {
          max-width: 800px;
        }

        .hero-title {
          margin-bottom: var(--spacing-md);
        }

        .highlight {
          color: var(--color-accent);
          font-style: italic;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--color-text-light);
          margin-bottom: var(--spacing-lg);
          max-width: 600px;
        }
      `}</style>
        </Layout>
    );
};

export default Home;
