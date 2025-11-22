import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Result = () => {
    const location = useLocation();
    const { resultImage } = location.state || {};

    if (!resultImage) {
        return (
            <Layout>
                <div className="container text-center mt-md">
                    <h2>No Result Found</h2>
                    <p>Please try generating a new image.</p>
                    <Link to="/try-on" className="btn btn-primary mt-md">Go to Try-On</Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container mt-md mb-md text-center">
                <h2 className="mb-md">Your New Look</h2>

                <div className="result-container">
                    <img src={resultImage} alt="Virtual Try-On Result" className="result-img" />
                </div>

                <div className="actions mt-md">
                    <Link to="/try-on" className="btn btn-secondary">Try Another Outfit</Link>
                    <a href={resultImage} download="my-new-look.jpg" className="btn btn-primary" style={{ marginLeft: '1rem' }}>
                        Download Image
                    </a>
                </div>
            </div>

            <style>{`
        .result-container {
          max-width: 600px;
          margin: 0 auto;
          padding: var(--spacing-sm);
          background: var(--color-surface);
          border-radius: var(--radius-md);
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }

        .result-img {
          width: 100%;
          border-radius: var(--radius-sm);
          display: block;
        }

        .actions {
          display: flex;
          justify-content: center;
          gap: var(--spacing-sm);
          flex-wrap: wrap;
        }
      `}</style>
        </Layout>
    );
};

export default Result;
