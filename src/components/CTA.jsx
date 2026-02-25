import './CTA.css';

const CTA = () => {
    return (
        <section className="cta section-padding" id="cta">
            <div className="container">
                <div className="cta__card">
                    <div className="cta__bg">
                        <div className="cta__orb cta__orb--1"></div>
                        <div className="cta__orb cta__orb--2"></div>
                    </div>

                    <div className="cta__content">
                        <div className="section-badge" style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.15)', color: 'white' }}>
                            🚀 Ready to Launch?
                        </div>
                        <h2 className="cta__title">
                            Let's Build Something
                            <br />
                            <span className="gradient-text">Extraordinary Together</span>
                        </h2>
                        <p className="cta__desc">
                            Join 250+ companies that have transformed their digital presence with us.
                            Schedule a free strategy call and let's explore what's possible.
                        </p>
                        <div className="cta__buttons">
                            <a href="#" className="btn cta__btn-primary">
                                Start Your Project
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>
                            <a href="#" className="btn btn-secondary">
                                Book a Free Call
                            </a>
                        </div>
                        <p className="cta__note">No contracts · Free consultation · Results guaranteed</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
