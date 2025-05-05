export interface Assessment {
  id: string;
  name: string;
  url: string;
  remoteTestingSupport: boolean;
  adaptiveSupport: boolean;
  duration: string;
  testType: string;
  description?: string;
  suitability?: number; // A score from 0-100 indicating how well this matches the query
}

export interface SearchQuery {
  query: string;
  type: 'text' | 'url';
}

export interface RecommendationResponse {
  recommendations: Assessment[];
  query: string;
}