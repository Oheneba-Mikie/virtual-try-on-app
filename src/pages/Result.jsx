import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Result = () => {
    const location = useLocation();
    const { resultImage } = location.state || {};

    if (!resultImage) {
        return (
            <Layout>
                <div className="container mt-lg text-center">
                    <div className="error-state glass-panel">
                        <h2>No Result Found</h2>
                        <p>Please go back and try generating an image first.</p>
                        <Link to="/try-on" className="btn btn-primary mt-md">
                            Go to Try-On
                        </Link>
                    </div>
                </div>
                <style>{`
                    .error-state {
                        padding: 4rem 2rem;
                        border-radius: var(--radius-lg);
                        max-width: 600px;
                        margin: 0 auto;
                    }
                `}</style>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container mt-lg mb-lg">
                <div className="result-header text-center animate-slide-up">
                    <h1 className="section-title">Your New Look</h1>
                    <p className="section-subtitle">Here is your AI-generated virtual try-on result.</p>
                </div>

                <div className="result-content animate-fade-in">
                    <div className="result-frame glass-panel">
                        <img src={resultImage} alt="Virtual Try-On Result" className="result-img" />
                        <div className="frame-shine"></div>
                    </div>

                    <div className="result-actions animate-slide-up">
                        <a
                            href={resultImage}
                            download="virtual-try-on-result.png"
                            className="btn btn-primary btn-lg action-btn"
                        >
                            Download Image
                        </a>
                        <Link to="/try-on" className="btn btn-secondary btn-lg action-btn">
                            Try Another Outfit
                        </Link>
                    </div>
                </div>
            </div>

            <style>{`
        .result-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 3rem;
        }

        .result-frame {
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          position: relative;
          overflow: hidden;
          max-width: 600px;
          width: 100%;
          box-shadow: var(--shadow-2xl);
          margin-bottom: 3rem;
        }

        .result-img {
          width: 100%;
          height: auto;
          border-radius: var(--radius-md);
          display: block;
        }

        .frame-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-25deg);
          animation: shine 6s infinite;
        }

        @keyframes shine {
          0% { left: -100%; }
          20% { left: 200%; }
          100% { left: 200%; }
        }

        .result-actions {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .action-btn {
          min-width: 200px;
        }

        @media (max-width: 600px) {
          .result-actions {
            flex-direction: column;
            width: 100%;
          }
          
          .action-btn {
            width: 100%;
          }
        }
      `}</style>
        </Layout>
    );
};

export default Result;
