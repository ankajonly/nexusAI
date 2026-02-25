import { useEffect, useState } from 'react';
import './AboutPage.css';

const AboutPage = () => {
    const [about, setAbout] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/about');
                const data = await response.json();
                if (response.ok) {
                    setAbout(data.about);
                }
            } catch (error) {
                console.error('Error fetching about:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAbout();
    }, []);

    if (loading) return <div className="container" style={{ padding: '100px 0', textAlign: 'center', color: '#f1f5f9' }}>Loading...</div>;
    if (!about) return <div className="container" style={{ padding: '100px 0', textAlign: 'center', color: '#f1f5f9' }}>Failed to load data</div>;

    return (
        <div className="about-page">
            <section className="about-hero">
                <div className="container">
                    <h1 className="about-hero__title">About {about.company.name}</h1>
                    <p className="about-hero__subtitle">{about.company.description}</p>
                </div>
            </section>

            <section className="about-stats">
                <div className="container">
                    <div className="stats-grid">
                        {about.stats.map((stat, idx) => (
                            <div key={idx} className="stat-card">
                                <div className="stat-value">{stat.value}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="about-mission">
                <div className="container">
                    <div className="mission-grid">
                        <div className="mission-card">
                            <h3>Our Mission</h3>
                            <p>{about.mission}</p>
                        </div>
                        <div className="mission-card">
                            <h3>Our Vision</h3>
                            <p>{about.vision}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-values">
                <div className="container">
                    <h2 className="values-title">Our Values</h2>
                    <div className="values-grid">
                        {about.values.map((value) => (
                            <div key={value.id} className="value-card">
                                <h4>{value.title}</h4>
                                <p>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="about-team">
                <div className="container">
                    <h2 className="team-title">Our Team</h2>
                    <div className="team-grid">
                        {about.team.map((member) => (
                            <div key={member.id} className="team-card">
                                <div className="team-avatar">{member.name.charAt(0)}</div>
                                <h4 className="team-name">{member.name}</h4>
                                <p className="team-role">{member.role}</p>
                                <p className="team-bio">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="about-contact">
                <div className="container">
                    <h2>Get In Touch</h2>
                    <p>We'd love to hear from you. Contact us today to learn more about our solutions.</p>
                    <button className="about-cta-btn">Contact Us</button>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
