import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { generateTryOn } from '../services/nanoBananaService';

const TryOn = () => {
    const navigate = useNavigate();
    const [userImage, setUserImage] = useState(null);
    const [dressImage, setDressImage] = useState(null);
    const [userPreview, setUserPreview] = useState(null);
    const [dressPreview, setDressPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'user') {
                    setUserImage(file);
                    setUserPreview(reader.result);
                } else {
                    setDressImage(file);
                    setDressPreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenerate = async () => {
        if (!userImage || !dressImage) return;

        setLoading(true);
        try {
            const result = await generateTryOn(userImage, dressImage);
            if (result.success) {
                navigate('/result', { state: { resultImage: result.imageUrl } });
            }
        } catch (error) {
            console.error("Generation failed", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container mt-lg mb-md">
                <div className="text-center mb-md animate-slide-up">
                    <h1 className="section-title">Virtual Fitting Room</h1>
                    <p className="section-subtitle">Upload your photo and the dress you want to try on.</p>
                </div>

                <div className="try-on-grid animate-fade-in">
                    {/* User Image Section */}
                    <div className="upload-card glass-panel">
                        <div className="card-header">
                            <span className="step-number">1</span>
                            <h2>Your Photo</h2>
                        </div>
                        <div className="upload-area">
                            {userPreview ? (
                                <div className="preview-container">
                                    <img src={userPreview} alt="User" className="preview-img" />
                                    <button
                                        className="remove-btn"
                                        onClick={() => { setUserImage(null); setUserPreview(null); }}
                                    >
                                        ×
                                    </button>
                                </div>
                            ) : (
                                <label htmlFor="user-upload" className="upload-placeholder">
                                    <div className="upload-icon">👤</div>
                                    <p>Click to upload your photo</p>
                                    <span className="upload-hint">Full body shot recommended</span>
                                </label>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, 'user')}
                                id="user-upload"
                                className="file-input"
                            />
                        </div>
                    </div>

                    {/* Dress Image Section */}
                    <div className="upload-card glass-panel">
                        <div className="card-header">
                            <span className="step-number">2</span>
                            <h2>The Dress</h2>
                        </div>
                        <div className="upload-area">
                            {dressPreview ? (
                                <div className="preview-container">
                                    <img src={dressPreview} alt="Dress" className="preview-img" />
                                    <button
                                        className="remove-btn"
                                        onClick={() => { setDressImage(null); setDressPreview(null); }}
                                    >
                                        ×
                                    </button>
                                </div>
                            ) : (
                                <label htmlFor="dress-upload" className="upload-placeholder">
                                    <div className="upload-icon">👗</div>
                                    <p>Click to upload dress image</p>
                                    <span className="upload-hint">Clear front view recommended</span>
                                </label>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, 'dress')}
                                id="dress-upload"
                                className="file-input"
                            />
                        </div>
                    </div>
                </div>

                <div className="action-section text-center mt-lg animate-slide-up">
                    <button
                        className={`btn btn-primary generate-btn ${loading ? 'loading' : ''}`}
                        onClick={handleGenerate}
                        disabled={!userImage || !dressImage || loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Generating Magic...
                            </>
                        ) : (
                            'Generate Try-On'
                        )}
                    </button>
                </div>
            </div>

            <style>{`
        .section-title {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: var(--color-text-muted);
        }

        .try-on-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          margin-top: 3rem;
        }

        .upload-card {
          padding: 2rem;
          border-radius: var(--radius-lg);
          transition: transform 0.3s ease;
        }

        .upload-card:hover {
          transform: translateY(-5px);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .step-number {
          width: 32px;
          height: 32px;
          background: var(--color-primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }

        .upload-area {
          height: 400px;
          position: relative;
        }

        .upload-placeholder {
          width: 100%;
          height: 100%;
          border: 2px dashed var(--color-border);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: rgba(255,255,255,0.02);
        }

        .upload-placeholder:hover {
          border-color: var(--color-primary);
          background: rgba(124, 58, 237, 0.05);
        }

        .upload-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .upload-hint {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          margin-top: 0.5rem;
        }

        .preview-container {
          width: 100%;
          height: 100%;
          position: relative;
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .remove-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(0,0,0,0.6);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          transition: background 0.2s;
        }

        .remove-btn:hover {
          background: var(--color-error);
        }

        .file-input {
          display: none;
        }

        .generate-btn {
          font-size: 1.25rem;
          padding: 1.25rem 4rem;
          min-width: 300px;
          position: relative;
          overflow: hidden;
        }

        .generate-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
          margin-right: 10px;
          display: inline-block;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .try-on-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .upload-area {
            height: 300px;
          }
        }
      `}</style>
        </Layout>
    );
};

export default TryOn;
