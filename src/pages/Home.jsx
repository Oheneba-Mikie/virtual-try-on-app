import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout>
      <div className="hero-section">
        <div className="hero-background">
          <div className="glow-orb orb-1"></div>
          <div className="glow-orb orb-2"></div>
        </div>

        <div className="container hero-container">
          <div className="hero-content animate-slide-up">
            <div className="badge">New AI Technology</div>
            <h1 className="hero-title">
              Fashion <br />
              <span className="text-gradient">Reimagined</span>
            </h1>
            <p className="hero-subtitle">
              Experience the future of fitting rooms. Upload your photo, choose a dress, and let our AI handle the rest instantly.
            </p>
            <div className="hero-actions">
              <Link to="/try-on" className="btn btn-primary btn-lg">
                Start Virtual Try-On
              </Link>
              <button className="btn btn-secondary btn-lg">
                View Gallery
              </button>
            </div>
          </div>

          <div className="hero-visual animate-fade-in">
            <div className="visual-card glass-panel">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
                alt="Fashion Model"
                className="hero-image"
              />
              <div className="visual-floating-card card-1 glass-panel">
                <span>✨ AI Powered</span>
              </div>
              <div className="visual-floating-card card-2 glass-panel">
                <span>👗 Instant Fit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding-top: 60px;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
        }

        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
        }

        .orb-1 {
          width: 400px;
          height: 400px;
          background: var(--color-primary);
          top: -100px;
          left: -100px;
          animation: float 10s infinite ease-in-out;
        }

        .orb-2 {
          width: 500px;
          height: 500px;
          background: var(--color-accent);
          bottom: -100px;
          right: -100px;
          animation: float 12s infinite ease-in-out reverse;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, 50px); }
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: rgba(124, 58, 237, 0.1);
          border: 1px solid rgba(124, 58, 237, 0.2);
          color: var(--color-primary);
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }

        .hero-title {
          font-size: 4.5rem;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }

        .text-gradient {
          background: linear-gradient(135deg, #fff 0%, var(--color-primary) 50%, var(--color-accent) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          max-width: 500px;
          margin-bottom: 2.5rem;
          line-height: 1.7;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
        }

        .btn-lg {
          padding: 1rem 2rem;
          font-size: 1.125rem;
        }

        .hero-visual {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .visual-card {
          position: relative;
          padding: 1rem;
          border-radius: 2rem;
          transform: rotate(-3deg);
          transition: transform 0.5s ease;
        }

        .visual-card:hover {
          transform: rotate(0deg) scale(1.02);
        }

        .hero-image {
          border-radius: 1.5rem;
          max-width: 100%;
          height: auto;
          box-shadow: var(--shadow-2xl);
        }

        .visual-floating-card {
          position: absolute;
          padding: 0.75rem 1.5rem;
          border-radius: 1rem;
          font-weight: 600;
          font-size: 0.9rem;
          box-shadow: var(--shadow-lg);
          animation: float 6s infinite ease-in-out;
        }

        .card-1 {
          top: 10%;
          left: -20px;
          animation-delay: 0s;
        }

        .card-2 {
          bottom: 10%;
          right: -20px;
          animation-delay: 1.5s;
        }

        @media (max-width: 968px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
            padding-top: 2rem;
          }

          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .hero-title {
            font-size: 3rem;
          }

          .hero-visual {
            margin-top: 3rem;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Home;
