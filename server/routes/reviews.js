import express from 'express';

const router = express.Router();

// Reviews data - initialize with 6 sample reviews
let reviewsData = [
    {
        id: 1,
        name: 'Alex Johnson',
        role: 'CEO, TechStartup',
        rating: 5,
        review: 'NexusUI completely transformed our product. The quality and support are exceptional.',
        image: 'https://i.pravatar.cc/150?img=1',
        company: 'TechStartup',
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 2,
        name: 'Maria Garcia',
        role: 'Product Manager, InnovateCo',
        rating: 5,
        review: 'Best decision we made. Implementation was smooth and ROI was immediate.',
        image: 'https://i.pravatar.cc/150?img=2',
        company: 'InnovateCo',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 3,
        name: 'David Kim',
        role: 'Founder, DigitalHub',
        rating: 5,
        review: 'Outstanding platform. The team went above and beyond to ensure our success.',
        image: 'https://i.pravatar.cc/150?img=3',
        company: 'DigitalHub',
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 4,
        name: 'Emma Wilson',
        role: 'CTO, CloudSystems',
        rating: 5,
        review: 'Incredible technical support and documentation. Highly recommend to any company.',
        image: 'https://i.pravatar.cc/150?img=4',
        company: 'CloudSystems',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 5,
        name: 'James Brown',
        role: 'Director, FutureTech',
        rating: 5,
        review: 'The best investment for our company. Results exceeded our expectations.',
        image: 'https://i.pravatar.cc/150?img=5',
        company: 'FutureTech',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 6,
        name: 'Lisa Anderson',
        role: 'Founder, NextGen',
        rating: 5,
        review: 'Professional, reliable, and constantly improving. Love working with this team!',
        image: 'https://i.pravatar.cc/150?img=6',
        company: 'NextGen',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    }
];

// Get all reviews
router.get('/', (req, res) => {
    try {
        res.status(200).json({
            message: 'Reviews retrieved successfully',
            count: reviewsData.length,
            reviews: reviewsData
        });
    } catch (error) {
        console.error('Get reviews error:', error);
        res.status(500).json({ message: 'Failed to fetch reviews' });
    }
});

// Get single review
router.get('/:id', (req, res) => {
    try {
        const review = reviewsData.find(r => r.id === parseInt(req.params.id));
        
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json({
            message: 'Review retrieved successfully',
            review
        });
    } catch (error) {
        console.error('Get review error:', error);
        res.status(500).json({ message: 'Failed to fetch review' });
    }
});

// Add a new review (for testimonials)
router.post('/', (req, res) => {
    try {
        const { name, role, rating, review, company } = req.body;

        // Validation
        if (!name || !role || !rating || !review) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                message: 'Rating must be between 1 and 5'
            });
        }

        // If there are already 6 reviews, remove the oldest one (first in array)
        if (reviewsData.length >= 6) {
            reviewsData.shift();
        }

        const newReview = {
            id: Math.max(...reviewsData.map(r => r.id || 0), 0) + 1,
            name,
            role,
            rating: parseInt(rating),
            review,
            company: company || '',
            image: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
            createdAt: new Date().toISOString()
        };

        reviewsData.push(newReview);

        res.status(201).json({
            message: 'Review added successfully',
            review: newReview,
            allReviews: reviewsData
        });
    } catch (error) {
        console.error('Add review error:', error);
        res.status(500).json({ message: 'Failed to add review' });
    }
});

export default router;
