import api from './axios';

/**
 * Fetch analytics data for the last 7 days
 * Returns spending trends, productivity metrics, and insights
 */
export const fetchAnalytics = async () => {
  try {
    const response = await api.get('/analytics/analytics');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch analytics data' };
  }
};
