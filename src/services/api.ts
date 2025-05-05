import { Assessment, RecommendationResponse } from '../types';

const API_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/api`;

export const getRecommendations = async (query: string, type: 'text' | 'url'): Promise<RecommendationResponse> => {
  try {
    const response = await fetch(`${API_URL}/recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({ query, type })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recommendations');
    }

    const data = await response.json();
    return {
      recommendations: data.recommendations,
      query: data.query
    };
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};