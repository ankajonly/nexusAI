import { useEffect, useState } from 'react';
import './ReviewsPage.css';

const ReviewsPage = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(5);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        review: '',
        company: ''
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/reviews');
                const data = await response.json();
                if (response.ok) {
                    setReviews(data.reviews);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('http://localhost:5000/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    rating
                })
            });

            const data = await response.json();
            if (response.ok) {
                // Update reviews with all reviews from backend (handles removing old review)
                setReviews(data.allReviews || [...reviews, data.review]);
                setFormData({ name: '', role: '', review: '', company: '' });
                setRating(5);
                alert('Review submitted successfully!');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="container" style={{ padding: '100px 0', textAlign: 'center', color: '#f1f5f9' }}>Loading...</div>;

    return (
        <div className="reviews-page">
            <section className="reviews-hero">
                <div className="container">
                    <h1 className="reviews-hero__title">What Our Clients Say</h1>
                    <p className="reviews-hero__subtitle">Join thousands of satisfied customers worldwide</p>
                </div>
            </section>

            <section className="reviews-list">
                <div className="container">
                    {reviews.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#cbd5e1' }}>
                            <p style={{ fontSize: '1.1rem' }}>No reviews yet. Be the first to share your experience!</p>
                        </div>
                    ) : (
                        <div className="reviews-grid">
                            {reviews.map((review) => (
                                <div key={review.id} className="review-card">
                                    <div className="review-rating">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <span key={i} className="star">★</span>
                                        ))}
                                    </div>
                                    <p className="review-text">"{review.review}"</p>
                                    <div className="review-author">
                                        <img src={review.image} alt={review.name} className="review-avatar" />
                                        <div className="review-info">
                                            <h4 className="review-name">{review.name}</h4>
                                            <p className="review-role">{review.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="reviews-form-section">
                <div className="container">
                    <h2>Share Your Experience</h2>
                    <form className="review-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="role"
                                placeholder="Your Role"
                                value={formData.role}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="company"
                                placeholder="Your Company"
                                value={formData.company}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Rating:</label>
                            <div className="rating-selector">
                                {[1, 2, 3, 4, 5].map(num => (
                                    <button
                                        key={num}
                                        type="button"
                                        className={`star-btn ${rating >= num ? 'active' : ''}`}
                                        onClick={() => setRating(num)}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="form-group">
                            <textarea
                                name="review"
                                placeholder="Write your review..."
                                rows="5"
                                value={formData.review}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="submit-btn" disabled={submitting}>
                            {submitting ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default ReviewsPage;
