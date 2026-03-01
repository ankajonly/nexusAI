import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API_URL from '../utils/apiConfig';
import './Login.css';

const Signup = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Signup failed');
            }

            // Update auth context
            login(data.user, data.token);
            alert('Signup successful!');
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getPasswordStrength = (pw) => {
        if (!pw) return { level: 0, text: '' };
        if (pw.length < 6) return { level: 1, text: 'Weak' };
        if (pw.length < 10) return { level: 2, text: 'Medium' };
        return { level: 3, text: 'Strong' };
    };

    const strength = getPasswordStrength(formData.password);

    return (
        <div className="auth-page">
            <div className="auth-bg">
                <div className="auth-orb auth-orb--1"></div>
                <div className="auth-orb auth-orb--2"></div>
                <div className="auth-orb auth-orb--3"></div>
                <div className="auth-grid-overlay"></div>
            </div>

            <div className="auth-container">
                <div className="auth-left">
                    <div className="auth-left-content">
                        <Link to="/" className="auth-back-link">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            Back to Home
                        </Link>

                        <div className="auth-brand">
                            <div className="auth-brand-icon">
                                <svg width="36" height="36" viewBox="0 0 28 28" fill="none">
                                    <path d="M14 2L26 8V20L14 26L2 20V8L14 2Z" fill="url(#authLogoGrad2)" />
                                    <path d="M14 8L20 11V17L14 20L8 17V11L14 8Z" fill="rgba(255,255,255,0.9)" />
                                    <defs>
                                        <linearGradient id="authLogoGrad2" x1="2" y1="2" x2="26" y2="26">
                                            <stop stopColor="#6366f1" />
                                            <stop offset="1" stopColor="#ec4899" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <span className="auth-brand-name">Nexus<span className="gradient-text">UI</span></span>
                        </div>

                        <h1 className="auth-title">Start Your Journey</h1>
                        <p className="auth-subtitle">Join thousands of teams building the next generation of digital experiences.</p>

                        <div className="auth-testimonial">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-400)', fontSize: '1.1rem' }}>🚀</div>
                                    <div>
                                        <strong style={{ color: 'var(--gray-200)', fontSize: '0.9rem' }}>Free to start</strong>
                                        <span style={{ display: 'block', color: 'var(--gray-500)', fontSize: '0.78rem' }}>No credit card required</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)', fontSize: '1.1rem' }}>⚡</div>
                                    <div>
                                        <strong style={{ color: 'var(--gray-200)', fontSize: '0.9rem' }}>Setup in minutes</strong>
                                        <span style={{ display: 'block', color: 'var(--gray-500)', fontSize: '0.78rem' }}>Get running in under 5 min</span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(236,72,153,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-400)', fontSize: '1.1rem' }}>🎯</div>
                                    <div>
                                        <strong style={{ color: 'var(--gray-200)', fontSize: '0.9rem' }}>Cancel anytime</strong>
                                        <span style={{ display: 'block', color: 'var(--gray-500)', fontSize: '0.78rem' }}>No lock-in, no hassle</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="auth-right">
                    <div className="auth-card">
                        <div className="auth-card-header">
                            <h2>Create Account</h2>
                            <p>Fill in your details to get started for free</p>
                        </div>

                        {error && <div className="auth-error-msg">{error}</div>}

                        <div className="auth-social-buttons">
                            <button className="auth-social-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                Google
                            </button>
                            <button className="auth-social-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                GitHub
                            </button>
                        </div>

                        <div className="auth-divider">
                            <span>or continue with email</span>
                        </div>

                        <form className="auth-form" onSubmit={handleSubmit}>
                            <div className="auth-name-row">
                                <div className="auth-field">
                                    <label htmlFor="firstName">First Name</label>
                                    <div className="auth-input-wrap">
                                        <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            placeholder="John"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="auth-field">
                                    <label htmlFor="lastName">Last Name</label>
                                    <div className="auth-input-wrap">
                                        <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            placeholder="Doe"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="auth-field">
                                <label htmlFor="signupEmail">Email Address</label>
                                <div className="auth-input-wrap">
                                    <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                    <input
                                        type="email"
                                        id="signupEmail"
                                        name="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="auth-field">
                                <label htmlFor="signupPassword">Password</label>
                                <div className="auth-input-wrap">
                                    <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0110 0v4" />
                                    </svg>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="signupPassword"
                                        name="password"
                                        placeholder="Create a strong password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="auth-toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                                                <line x1="1" y1="1" x2="23" y2="23" />
                                            </svg>
                                        ) : (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {formData.password && (
                                    <>
                                        <div className="auth-strength-bar">
                                            {[1, 2, 3].map((seg) => (
                                                <div
                                                    key={seg}
                                                    className={`auth-strength-segment ${seg <= strength.level ? 'active' : ''} ${strength.level === 2 ? 'medium' : ''} ${strength.level === 3 ? 'strong' : ''}`}
                                                />
                                            ))}
                                        </div>
                                        <p className="auth-strength-text">Password strength: {strength.text}</p>
                                    </>
                                )}
                            </div>

                            <p className="auth-terms">
                                By creating an account, you agree to our{' '}
                                <a href="#">Terms of Service</a> and{' '}
                                <a href="#">Privacy Policy</a>.
                            </p>

                            <button type="submit" className="auth-submit-btn" disabled={loading}>
                                {loading ? 'Creating Account...' : 'Create Account'}
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        </form>

                        <p className="auth-footer-text">
                            Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
