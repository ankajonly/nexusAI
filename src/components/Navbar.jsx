import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setMenuOpen(false);
    };

    const navLinks = [
        { name: 'Home', href: '/', isRoute: true },
        { name: 'About', href: '/about', isRoute: true },
        { name: 'Services', href: '/services', isRoute: true },
        { name: 'Reviews', href: '/reviews', isRoute: true },
        { name: 'Contact', href: '#cta' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="container navbar__inner">
                <a href="#hero" className="navbar__logo">
                    <div className="navbar__logo-icon">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <path d="M14 2L26 8V20L14 26L2 20V8L14 2Z" fill="url(#logoGrad)" />
                            <path d="M14 8L20 11V17L14 20L8 17V11L14 8Z" fill="rgba(255,255,255,0.9)" />
                            <defs>
                                <linearGradient id="logoGrad" x1="2" y1="2" x2="26" y2="26">
                                    <stop stopColor="#6366f1" />
                                    <stop offset="1" stopColor="#ec4899" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <span className="navbar__brand">Nexus<span className="gradient-text">UI</span></span>
                </a>

                <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            {link.isRoute ? (
                                <Link
                                    to={link.href}
                                    className="navbar__link"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ) : (
                                <a
                                    href={link.href}
                                    className="navbar__link"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            )}
                        </li>
                    ))}
                    <li className="navbar__mobile-auth">
                        <Link to="/login" className="navbar__link" onClick={() => setMenuOpen(false)}>Login</Link>
                    </li>
                    <li className="navbar__mobile-auth">
                        <Link to="/signup" className="navbar__link navbar__link--signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                    </li>
                </ul>

                <div className="navbar__actions">
                    {isAuthenticated ? (
                        <>
                            <div className="navbar__user">
                                <span className="navbar__username">Hi, {user?.firstName}</span>
                                <button onClick={handleLogout} className="navbar__auth-link">Logout</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="navbar__auth-link">Login</Link>
                            <Link to="/signup" className="btn btn-primary navbar__cta">Get Started</Link>
                        </>
                    )}
                    <button
                        className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--active' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
