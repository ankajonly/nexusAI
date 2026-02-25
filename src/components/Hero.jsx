import './Hero.css';

const Hero = () => {
    return (
        <section className="hero" id="hero">
            {/* Animated background elements */}
            <div className="hero__bg">
                <div className="hero__orb hero__orb--1"></div>
                <div className="hero__orb hero__orb--2"></div>
                <div className="hero__orb hero__orb--3"></div>
                <div className="hero__grid-overlay"></div>
            </div>

            <div className="container hero__content">
                <div className="hero__text">
                    <div className="section-badge">
                        <span className="hero__badge-dot"></span>
                        Launching Something Amazing
                    </div>

                    <h1 className="hero__title">
                        Build Digital
                        <br />
                        Experiences That
                        <br />
                        <span className="gradient-text">Inspire & Convert</span>
                    </h1>

                    <p className="hero__description">
                        We craft pixel-perfect, high-performance digital products that elevate
                        your brand and deliver measurable results. From concept to launch,
                        we bring your vision to life.
                    </p>

                    <div className="hero__buttons">
                        <a href="#features" className="btn btn-primary">
                            Explore Features
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                        <a href="#about" className="btn btn-secondary">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <polygon points="10 8 16 12 10 16 10 8" />
                            </svg>
                            Watch Demo
                        </a>
                    </div>

                    <div className="hero__stats">
                        <div className="hero__stat">
                            <span className="hero__stat-value">250+</span>
                            <span className="hero__stat-label">Projects Delivered</span>
                        </div>
                        <div className="hero__stat-divider"></div>
                        <div className="hero__stat">
                            <span className="hero__stat-value">99%</span>
                            <span className="hero__stat-label">Client Satisfaction</span>
                        </div>
                        <div className="hero__stat-divider"></div>
                        <div className="hero__stat">
                            <span className="hero__stat-value">15+</span>
                            <span className="hero__stat-label">Awards Won</span>
                        </div>
                    </div>
                </div>

                <div className="hero__visual">
                    <div className="hero__card-stack">
                        <div className="hero__floating-card hero__floating-card--1">
                            <div className="hero__card-icon">🚀</div>
                            <span>Fast Deploy</span>
                        </div>
                        <div className="hero__floating-card hero__floating-card--2">
                            <div className="hero__card-icon">⚡</div>
                            <span>Lightning Speed</span>
                        </div>
                        <div className="hero__floating-card hero__floating-card--3">
                            <div className="hero__card-icon">🎨</div>
                            <span>Pixel Perfect</span>
                        </div>

                        <div className="hero__main-visual">
                            <div className="hero__code-window">
                                <div className="hero__window-bar">
                                    <span className="hero__window-dot hero__window-dot--red"></span>
                                    <span className="hero__window-dot hero__window-dot--yellow"></span>
                                    <span className="hero__window-dot hero__window-dot--green"></span>
                                </div>
                                <div className="hero__code-body">
                                    <div className="hero__code-line">
                                        <span className="code-keyword">const</span>{' '}
                                        <span className="code-variable">project</span>{' '}
                                        <span className="code-operator">=</span>{' '}
                                        <span className="code-function">create</span>
                                        <span className="code-bracket">(</span>
                                        <span className="code-string">'amazing'</span>
                                        <span className="code-bracket">)</span>;
                                    </div>
                                    <div className="hero__code-line">
                                        <span className="code-keyword">await</span>{' '}
                                        <span className="code-variable">project</span>.
                                        <span className="code-function">deploy</span>
                                        <span className="code-bracket">()</span>;
                                    </div>
                                    <div className="hero__code-line hero__code-line--comment">
                                        <span className="code-comment">// ✨ Your site is live!</span>
                                    </div>
                                    <div className="hero__code-cursor"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hero__scroll-indicator">
                <div className="hero__scroll-mouse">
                    <div className="hero__scroll-wheel"></div>
                </div>
                <span>Scroll to explore</span>
            </div>
        </section>
    );
};

export default Hero;
