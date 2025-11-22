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
            <div className="container mt-md mb-md">
                <div className="try-on-grid">
                    {/* User Image Section */}
                    <div className="upload-section">
                        <h2>1. Your Photo</h2>
                        <div className="upload-box">
                            {userPreview ? (
                                <img src={userPreview} alt="User" className="preview-img" />
                            ) : (
                                <div className="placeholder">
                                    <p>Upload a full-body photo</p>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, 'user')}
                                id="user-upload"
                                className="file-input"
                            />
                            <label htmlFor="user-upload" className="btn btn-secondary mt-md">
                                {userPreview ? 'Change Photo' : 'Select Photo'}
                            </label>
                        </div>
                    </div>

                    {/* Dress Image Section */}
                    <div className="upload-section">
                        <h2>2. The Dress</h2>
                        <div className="upload-box">
                            {dressPreview ? (
                                <img src={dressPreview} alt="Dress" className="preview-img" />
                            ) : (
                                <div className="placeholder">
                                    <p>Upload the dress image</p>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, 'dress')}
                                id="dress-upload"
                                className="file-input"
                            />
                            <label htmlFor="dress-upload" className="btn btn-secondary mt-md">
                                {dressPreview ? 'Change Dress' : 'Select Dress'}
                            </label>
                        </div>
                    </div>
                </div>

                <div className="action-section text-center mt-md">
                    <button
                        className="btn btn-primary generate-btn"
                        onClick={handleGenerate}
                        disabled={!userImage || !dressImage || loading}
                    >
                        {loading ? 'Generating Magic...' : 'Generate Try-On'}
                    </button>
                </div>
            </div>

            <style>{`
        .try-on-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-md);
        }

        .upload-section {
          background: var(--color-surface);
          padding: var(--spacing-md);
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          text-align: center;
        }

        .upload-box {
          margin-top: var(--spacing-sm);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .preview-img {
          width: 100%;
          max-height: 400px;
          object-fit: contain;
          border-radius: var(--radius-sm);
        }

        .placeholder {
          width: 100%;
          height: 300px;
          background-color: #eee;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
          color: var(--color-text-light);
          border: 2px dashed var(--color-border);
        }

        .file-input {
          display: none;
        }

        .generate-btn {
          font-size: 1.2rem;
          padding: 1.2rem 3rem;
          min-width: 250px;
        }

        .generate-btn:disabled {
          background-color: #ccc;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 768px) {
          .try-on-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </Layout>
    );
};

export default TryOn;
