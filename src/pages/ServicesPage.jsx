import React, { useState, useEffect } from 'react';
import './ServicesPage.css';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/services');
        const data = await response.json();
        
        // Backend returns { message, count, services }
        if (data.services && Array.isArray(data.services)) {
          setServices(data.services);
        } else {
          setServices([]);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div className="services-page"><div style={{ padding: '100px 20px', textAlign: 'center', color: '#cbd5e1' }}>Loading services...</div></div>;
  }

  if (services.length === 0) {
    return <div className="services-page"><div style={{ padding: '100px 20px', textAlign: 'center', color: '#cbd5e1' }}>No services available</div></div>;
  }

  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="container">
          <h1 className="services-hero__title">Our Services</h1>
          <p className="services-hero__subtitle">
            Comprehensive solutions tailored to transform your business
          </p>
        </div>
      </section>

      <section className="services-list">
        <div className="container">
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                
                {service.features && service.features.length > 0 && (
                  <div className="service-features">
                    {service.features.map((feature, index) => (
                      <div key={index} className="feature-item">
                        <span className="feature-dot">•</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="service-footer">
                  <span className="service-price">{service.price}</span>
                  <button className="service-btn">Learn More</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
