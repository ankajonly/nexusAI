import API_URL from '../utils/apiConfig';

export const getAbout = async () => {
    try {
        const response = await fetch(`${API_URL}/about`);
        if (!response.ok) throw new Error('Failed to fetch about');
        return await response.json();
    } catch (error) {
        console.error('Error fetching about:', error);
        throw error;
    }
};

export const getTeam = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/about/team`);
        if (!response.ok) throw new Error('Failed to fetch team');
        return await response.json();
    } catch (error) {
        console.error('Error fetching team:', error);
        throw error;
    }
};

export const getValues = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/about/values`);
        if (!response.ok) throw new Error('Failed to fetch values');
        return await response.json();
    } catch (error) {
        console.error('Error fetching values:', error);
        throw error;
    }
};
