import express from 'express';

const router = express.Router();

// About data
const aboutData = {
    company: {
        name: 'NexusUI',
        founded: '2024',
        headquarters: 'Silicon Valley, CA',
        employees: '50+',
        description: 'NexusUI is a leading provider of modern UI solutions and enterprise software.'
    },
    mission: 'To democratize access to cutting-edge technology and empower businesses to achieve their full potential.',
    vision: 'A world where innovative technology is accessible to everyone, enabling individuals and organizations to create extraordinary experiences.',
    values: [
        {
            id: 1,
            title: 'Innovation',
            description: 'We constantly push boundaries to deliver breakthrough solutions.'
        },
        {
            id: 2,
            title: 'Excellence',
            description: 'We maintain the highest standards of quality in everything we do.'
        },
        {
            id: 3,
            title: 'Customer Focus',
            description: 'Our customers are at the heart of every decision we make.'
        },
        {
            id: 4,
            title: 'Integrity',
            description: 'We operate with transparency and honesty in all our dealings.'
        }
    ],
    team: [
        {
            id: 1,
            name: 'John Smith',
            role: 'Founder & CEO',
            bio: 'Visionary leader with 15+ years in tech industry'
        },
        {
            id: 2,
            name: 'Sarah Johnson',
            role: 'CTO',
            bio: 'Expert in cloud infrastructure and scalable systems'
        },
        {
            id: 3,
            name: 'Michael Chen',
            role: 'Head of Design',
            bio: 'Award-winning designer focused on user experience'
        },
        {
            id: 4,
            name: 'Emily Davis',
            role: 'VP Operations',
            bio: 'Strategic thinker with experience in scaling startups'
        }
    ],
    stats: [
        {
            label: 'Happy Customers',
            value: '10,000+',
            icon: 'users'
        },
        {
            label: 'Projects Completed',
            value: '5,000+',
            icon: 'check'
        },
        {
            label: 'Countries Served',
            value: '150+',
            icon: 'globe'
        },
        {
            label: 'Years Experience',
            value: '15+',
            icon: 'calendar'
        }
    ]
};

// Get about information
router.get('/', (req, res) => {
    try {
        res.status(200).json({
            message: 'About information retrieved successfully',
            about: aboutData
        });
    } catch (error) {
        console.error('Get about error:', error);
        res.status(500).json({ message: 'Failed to fetch about information' });
    }
});

// Get team members
router.get('/team', (req, res) => {
    try {
        res.status(200).json({
            message: 'Team members retrieved successfully',
            count: aboutData.team.length,
            team: aboutData.team
        });
    } catch (error) {
        console.error('Get team error:', error);
        res.status(500).json({ message: 'Failed to fetch team members' });
    }
});

// Get company values
router.get('/values', (req, res) => {
    try {
        res.status(200).json({
            message: 'Company values retrieved successfully',
            count: aboutData.values.length,
            values: aboutData.values
        });
    } catch (error) {
        console.error('Get values error:', error);
        res.status(500).json({ message: 'Failed to fetch company values' });
    }
});

export default router;
