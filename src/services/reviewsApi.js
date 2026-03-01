import API_URL from '../utils/apiConfig';

export const getReviews = async () => {
    try {
        const response = await fetch(`${API_URL}/reviews`);
        if (!response.ok) throw new Error('Failed to fetch reviews');
        return await response.json();
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
};

export const getReviewById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/reviews/${id}`);
        if (!response.ok) throw new Error('Failed to fetch review');
        return await response.json();
    } catch (error) {
        console.error('Error fetching review:', error);
        throw error;
    }
};

export const addReview = async (reviewData) => {
    try {
        const response = await fetch(`${API_URL}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        });
        if (!response.ok) throw new Error('Failed to submit review');
        return await response.json();
    } catch (error) {
        console.error('Error submitting review:', error);
        throw error;
    }
};
