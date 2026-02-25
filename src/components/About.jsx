import './About.css';

const About = () => {
    const capabilities = [
        { number: '01', title: 'Discovery & Strategy', desc: 'Deep-dive into your goals, audience, and market to craft a winning strategy.' },
        { number: '02', title: 'Design & Prototype', desc: 'Transform ideas into stunning, interactive prototypes validated by users.' },
        { number: '03', title: 'Develop & Launch', desc: 'Build robust, scalable applications and deploy with zero-downtime confidence.' },
        { number: '04', title: 'Optimize & Grow', desc: 'Continuous performance tuning and data-driven growth strategies.' },
    ];

    return (
        <section className="about section-padding" id="about">
            <div className="container">
                <div className="about__layout">
                    <div className="about__left">
                        <div className="about__image-wrap">
                            <div className="about__image-card">
                                <div className="about__experience-badge">
                                    <span className="about__experience-number">8+</span>
                                    <span className="about__experience-text">Years of<br />Excellence</span>
                                </div>
                            </div>
                            <div className="about__image-grid">
                                <div className="about__grid-item about__grid-item--1">
                                    <div className="about__metric">
                                        <span className="about__metric-icon">📈</span>
                                        <div>
                                            <strong>3.2x</strong>
                                            <span>Avg. ROI</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="about__grid-item about__grid-item--2">
                                    <div className="about__metric">
                                        <span className="about__metric-icon">🎯</span>
                                        <div>
                                            <strong>98%</strong>
                                            <span>On-Time</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="about__grid-item about__grid-item--3">
                                    <div className="about__metric">
                                        <span className="about__metric-icon">🌍</span>
                                        <div>
                                            <strong>40+</strong>
                                            <span>Countries</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="about__right">
                        <div className="section-badge">✦ About Us</div>
                        <h2 className="section-title">
                            We Turn Bold Ideas Into
                            <br />
                            <span className="gradient-text">Digital Reality</span>
                        </h2>
                        <p className="section-subtitle">
                            We're a team of passionate designers, developers, and strategists
                            who believe great products are born from obsessive attention to
                            detail and relentless innovation.
                        </p>

                        <div className="about__process">
                            {capabilities.map((item, idx) => (
                                <div className="about__step" key={idx}>
                                    <div className="about__step-number">{item.number}</div>
                                    <div className="about__step-content">
                                        <h4 className="about__step-title">{item.title}</h4>
                                        <p className="about__step-desc">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
