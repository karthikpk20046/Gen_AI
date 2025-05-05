import React, { useState, useCallback, useEffect } from 'react';
import Layout from './components/Layout';
import SearchForm from './components/SearchForm';
import ResultsTable from './components/ResultsTable';
import EmptyState from './components/EmptyState';
import { getRecommendations } from './services/api';
import { Assessment, RecommendationResponse } from './types';

function App() {
  const [recommendations, setRecommendations] = useState<Assessment[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load recent searches from localStorage on initial render
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (e) {
        console.error('Error parsing recent searches from localStorage', e);
      }
    }
  }, []);

  // Save recent searches to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const handleSearch = useCallback(async (query: string, type: 'text' | 'url') => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response: RecommendationResponse = await getRecommendations(query, type);
      
      setRecommendations(response.recommendations);
      setSearchQuery(response.query);
      setHasSearched(true);
      
      // Add to recent searches if it doesn't already exist
      if (!recentSearches.includes(query)) {
        // Keep only the 5 most recent searches
        const updatedSearches = [query, ...recentSearches.slice(0, 4)];
        setRecentSearches(updatedSearches);
      }
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setError('Error fetching recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [recentSearches]);

  const handleSelectRecentSearch = useCallback((query: string) => {
    handleSearch(query, 'text');
  }, [handleSearch]);

  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto space-y-8">
        <SearchForm 
          onSearch={handleSearch} 
          isLoading={isLoading} 
          recentSearches={recentSearches}
          onSelectRecentSearch={handleSelectRecentSearch}
        />
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {!hasSearched && !isLoading && (
          <div className="mt-10 animate-fadeIn">
            <EmptyState />
          </div>
        )}
        
        {hasSearched && !isLoading && (
          <div className="animate-fadeIn">
            <ResultsTable 
              recommendations={recommendations} 
              query={searchQuery} 
            />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default App;