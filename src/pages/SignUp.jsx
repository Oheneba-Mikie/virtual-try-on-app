import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();
    const useNavigate_ = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }
        setError('');
        setLoading(true);
        try {
            const { error } = await signUp(email, password);
            if (error) throw error;
            alert("Account created! You can now log in.");
            useNavigate_('/login');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container mt-lg mb-lg">
                <div className="auth-card glass-panel animate-slide-up">
                    <h2 className="text-center mb-md">Create Account</h2>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="form-input"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="form-input"
                                placeholder="Create a password"
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="form-input"
                                placeholder="Confirm your password"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>
                    <div className="auth-footer text-center mt-sm">
                        <p>Already have an account? <Link to="/login" className="text-accent">Log In</Link></p>
                    </div>
                </div>
            </div>
            <style>{`
                .auth-card {
                    max-width: 400px;
                    margin: 0 auto;
                    padding: 2rem;
                    border-radius: var(--radius-lg);
                }
                .error-message {
                    background: rgba(239, 68, 68, 0.1);
                    color: var(--color-error);
                    padding: 0.75rem;
                    border-radius: var(--radius-sm);
                    margin-bottom: 1rem;
                    font-size: 0.9rem;
                    text-align: center;
                }
                .auth-form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .form-input {
                    padding: 0.75rem;
                    border-radius: var(--radius-sm);
                    border: 1px solid var(--color-border);
                    background: rgba(255, 255, 255, 0.05);
                    color: var(--color-text-main);
                    font-size: 1rem;
                }
                .form-input:focus {
                    outline: none;
                    border-color: var(--color-primary);
                    background: rgba(255, 255, 255, 0.1);
                }
                .w-100 {
                    width: 100%;
                }
                .text-accent {
                    color: var(--color-primary);
                    font-weight: 600;
                }
                .text-accent:hover {
                    text-decoration: underline;
                }
            `}</style>
        </Layout>
    );
};

export default SignUp;
