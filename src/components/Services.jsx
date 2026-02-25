import './Services.css';

const servicesData = [
    {
        icon: (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                <polyline points="10 17 14 13 10 9" />
            </svg>
        ),
        title: 'Advanced Security',
        description: 'Enterprise-grade security with end-to-end encryption, multi-factor authentication, and advanced threat detection to protect your sensitive data.',
        price: 'Custom',
        features: ['End-to-end encryption', '24/7 monitoring', 'Advanced threat detection']
    },
    {
        icon: (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <circle cx="9" cy="10" r="1" /><circle cx="12" cy="10" r="1" /><circle cx="15" cy="10" r="1" />
            </svg>
        ),
        title: '24/7 Support',
        description: 'Dedicated support team available around the clock to assist you with any questions, issues, or technical challenges you may face.',
        price: '$99/mo',
        features: ['Live chat support', 'Email support', 'Phone support', 'Response time: 1 hour']
    },
    {
        icon: (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" />
                <polyline points="12 12 20 7.5" /><polyline points="12 12 12 21" /><polyline points="12 12 4 7.5" />
            </svg>
        ),
        title: 'Data Analytics',
        description: 'Real-time analytics and reporting with customizable dashboards, data visualization, and actionable insights for informed decision-making.',
        price: '$149/mo',
        features: ['Real-time data', 'Custom reports', 'Advanced analytics', 'Data export']
    },
    {
        icon: (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 11l3 3L15 9" />
            </svg>
        ),
        title: 'API Integration',
        description: 'Seamless integration with third-party services and APIs. Connect your favorite tools and automate your workflow with ease.',
        price: '$199/mo',
        features: ['REST API', 'Webhooks', 'OAuth 2.0', 'SDKs']
    },
    {
        icon: (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><path d="M20 8v6m3-3h-6" />
            </svg>
        ),
        title: 'Team Collaboration',
        description: 'Built-in collaboration tools including real-time editing, comments, version control, and team management for seamless teamwork.',
        price: '$249/mo',
        features: ['Real-time editing', 'Comments & mentions', 'Version control', 'Team management']
    },
    {
        icon: (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="13 2 13 9 20 9" />
            </svg>
        ),
        title: 'Custom Development',
        description: 'Dedicated development team to build custom solutions tailored to your unique business requirements and workflows.',
        price: 'Contact',
        features: ['Custom features', 'White-label options', 'Private deployment', 'Dedicated team']
    },
];

const Services = () => {
    return (
        <section id="services" className="services">
            <div className="container services__container">
                <div className="services__header">
                    <h2 className="services__title">Our Services</h2>
                    <p className="services__subtitle">
                        Comprehensive solutions designed to meet your business needs and drive growth
                    </p>
                </div>

                <div className="services__grid">
                    {servicesData.map((service, index) => (
                        <div key={index} className="services__card">
                            <div className="services__card-icon">
                                {service.icon}
                            </div>
                            <h3 className="services__card-title">{service.title}</h3>
                            <p className="services__card-description">{service.description}</p>
                            
                            <div className="services__card-features">
                                {service.features.map((feature, idx) => (
                                    <div key={idx} className="services__feature">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="services__card-footer">
                                <p className="services__price">{service.price}</p>
                                <button className="services__btn">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="services__cta">
                    <h3>Ready to transform your business?</h3>
                    <p>Start with a free trial or contact our sales team for a custom quote</p>
                    <button className="services__cta-btn">Start Free Trial</button>
                </div>
            </div>
        </section>
    );
};

export default Services;
