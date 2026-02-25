import express from 'express';
import { auth, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Services data
const servicesData = [
    {
        id: 1,
        icon: 'shield',
        title: 'Advanced Security',
        description: 'Enterprise-grade security with end-to-end encryption, multi-factor authentication, and advanced threat detection to protect your sensitive data.',
        price: 'Custom',
        features: ['End-to-end encryption', '24/7 monitoring', 'Advanced threat detection']
    },
    {
        id: 2,
        icon: 'message',
        title: '24/7 Support',
        description: 'Dedicated support team available around the clock to assist you with any questions, issues, or technical challenges you may face.',
        price: '$99/mo',
        features: ['Live chat support', 'Email support', 'Phone support', 'Response time: 1 hour']
    },
    {
        id: 3,
        icon: 'analytics',
        title: 'Data Analytics',
        description: 'Real-time analytics and reporting with customizable dashboards, data visualization, and actionable insights for informed decision-making.',
        price: '$149/mo',
        features: ['Real-time data', 'Custom reports', 'Advanced analytics', 'Data export']
    },
    {
        id: 4,
        icon: 'api',
        title: 'API Integration',
        description: 'Seamless integration with third-party services and APIs. Connect your favorite tools and automate your workflow with ease.',
        price: '$199/mo',
        features: ['REST API', 'Webhooks', 'OAuth 2.0', 'SDKs']
    },
    {
        id: 5,
        icon: 'collaboration',
        title: 'Team Collaboration',
        description: 'Built-in collaboration tools including real-time editing, comments, version control, and team management for seamless teamwork.',
        price: '$249/mo',
        features: ['Real-time editing', 'Comments & mentions', 'Version control', 'Team management']
    },
    {
        id: 6,
        icon: 'development',
        title: 'Custom Development',
        description: 'Dedicated development team to build custom solutions tailored to your unique business requirements and workflows.',
        price: 'Contact',
        features: ['Custom features', 'White-label options', 'Private deployment', 'Dedicated team']
    }
];

// Get all services
router.get('/', async (req, res) => {
    try {
        res.status(200).json({
            message: 'Services retrieved successfully',
            count: servicesData.length,
            services: servicesData
        });
    } catch (error) {
        console.error('Get services error:', error);
        res.status(500).json({ message: 'Failed to fetch services' });
    }
});

// Get single service by ID
router.get('/:id', async (req, res) => {
    try {
        const service = servicesData.find(s => s.id === parseInt(req.params.id));
        
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.status(200).json({
            message: 'Service retrieved successfully',
            service
        });
    } catch (error) {
        console.error('Get service error:', error);
        res.status(500).json({ message: 'Failed to fetch service' });
    }
});

// Contact service (optional auth - track if user is logged in)
router.post('/contact', optionalAuth, async (req, res) => {
    try {
        const { name, email, message, serviceId } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                message: 'Validation error',
                errors: {
                    name: !name ? 'Name is required' : '',
                    email: !email ? 'Email is required' : '',
                    message: !message ? 'Message is required' : ''
                }
            });
        }

        // Here you would typically save to database or send email
        const contactData = {
            id: Date.now(),
            name,
            email,
            message,
            serviceId: serviceId || null,
            userId: req.user ? req.user._id : null,
            createdAt: new Date().toISOString()
        };

        res.status(201).json({
            message: 'Contact request submitted successfully. We will get back to you soon!',
            contact: contactData
        });
    } catch (error) {
        console.error('Contact service error:', error);
        res.status(500).json({ message: 'Failed to submit contact request' });
    }
});

// Subscribe to service (requires auth)
router.post('/subscribe/:id', auth, async (req, res) => {
    try {
        const serviceId = parseInt(req.params.id);
        const service = servicesData.find(s => s.id === serviceId);

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Here you would typically process payment and save subscription
        const subscription = {
            id: Date.now(),
            userId: req.user._id,
            serviceId,
            serviceName: service.title,
            price: service.price,
            status: 'active',
            createdAt: new Date().toISOString()
        };

        res.status(201).json({
            message: 'Successfully subscribed to ' + service.title,
            subscription
        });
    } catch (error) {
        console.error('Subscribe service error:', error);
        res.status(500).json({ message: 'Failed to subscribe to service' });
    }
});

export default router;
