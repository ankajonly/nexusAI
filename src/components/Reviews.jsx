import { useState } from 'react';
import './Reviews.css';

const reviewsData = [
    {
        name: 'Sarah Chen',
        role: 'CEO, TechVentures',
        avatar: 'SC',
        color: '#6366f1',
        rating: 5,
        text: 'NexusUI transformed our entire digital presence. The attention to detail and performance optimization exceeded all expectations. Our conversion rates jumped 40% within the first month.',
    },
    {
        name: 'Marcus Rodriguez',
        role: 'CTO, InnovateCo',
        avatar: 'MR',
        color: '#ec4899',
        rating: 5,
        text: 'Working with this team was an absolute game-changer. They delivered a stunning platform in half the time we expected, with code quality that our dev team genuinely admires.',
    },
    {
        name: 'Emily Watson',
        role: 'Product Lead, ScaleUp',
        avatar: 'EW',
        color: '#10b981',
        rating: 5,
        text: 'The design system they built for us has become the backbone of all our products. Incredibly well-documented, modular, and a joy to work with. Simply world-class.',
    },
    {
        name: 'David Kim',
        role: 'Founder, NextWave',
        avatar: 'DK',
        color: '#f59e0b',
        rating: 5,
        text: 'From concept to launch in 6 weeks — and the result looks like it took a year. The level of polish, micro-interactions, and performance blew our investors away.',
    },
    {
        name: 'Lisa Park',
        role: 'VP Design, CoreStack',
        avatar: 'LP',
        color: '#8b5cf6',
        rating: 5,
        text: 'As a designer, I have impossibly high standards. They not only met them but surpassed them. Every pixel was intentional, every interaction felt magical.',
    },
    {
        name: 'James Miller',
        role: 'Director, CloudFirst',
        avatar: 'JM',
        color: '#06b6d4',
        rating: 5,
        text: 'Our legacy platform was transformed into a modern, blazing-fast application. The migration was seamless, and our users love the new experience. Truly exceptional work.',
    },
];

const StarRating = ({ rating }) => (
    <div className="reviews__stars">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className={`reviews__star ${i < rating ? 'reviews__star--filled' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
        ))}
    </div>
);

const Reviews = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="reviews section-padding" id="reviews">
            <div className="container">
                <div className="section-header">
                    <div className="section-badge">✦ Testimonials</div>
                    <h2 className="section-title">
                        Loved by Teams
                        <br />
                        <span className="gradient-text">Around the World</span>
                    </h2>
                    <p className="section-subtitle">
                        Don't just take our word for it — hear from the leaders and innovators
                        who've partnered with us.
                    </p>
                </div>

                <div className="reviews__grid">
                    {reviewsData.map((review, index) => (
                        <div
                            className={`reviews__card ${index === activeIndex ? 'reviews__card--active' : ''}`}
                            key={index}
                            onMouseEnter={() => setActiveIndex(index)}
                        >
                            <div className="reviews__card-top">
                                <div className="reviews__avatar" style={{ background: review.color }}>
                                    {review.avatar}
                                </div>
                                <div className="reviews__info">
                                    <h4 className="reviews__name">{review.name}</h4>
                                    <p className="reviews__role">{review.role}</p>
                                </div>
                                <StarRating rating={review.rating} />
                            </div>
                            <p className="reviews__text">{review.text}</p>
                            <div className="reviews__quote-mark">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" opacity="0.1">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
