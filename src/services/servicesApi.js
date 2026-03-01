import API_URL from '../utils/apiConfig';

export const getServices = async () => {
    try {
        const response = await fetch(`${API_URL}/services`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch services');
        }

        return data;
    } catch (error) {
        console.error('Get services error:', error);
        throw error;
    }
};

export const getServiceById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/services/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch service');
        }

        return data;
    } catch (error) {
        console.error('Get service error:', error);
        throw error;
    }
};

export const contactService = async (contactData) => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/services/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` })
            },
            body: JSON.stringify(contactData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to submit contact request');
        }

        return data;
    } catch (error) {
        console.error('Contact service error:', error);
        throw error;
    }
};

export const subscribeService = async (serviceId) => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Authentication required to subscribe');
        }

        const response = await fetch(`${API_URL}/services/subscribe/${serviceId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to subscribe to service');
        }

        return data;
    } catch (error) {
        console.error('Subscribe service error:', error);
        throw error;
    }
};
