import React, { useState } from 'react';
import { SearchIcon, ExternalLinkIcon, RotateCcwIcon } from 'lucide-react';

interface SearchFormProps {
  onSearch: (query: string, type: 'text' | 'url') => void;
  isLoading: boolean;
  recentSearches: string[];
  onSelectRecentSearch: (query: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ 
  onSearch, 
  isLoading, 
  recentSearches,
  onSelectRecentSearch
}) => {
  const [query, setQuery] = useState('');
  const [queryType, setQueryType] = useState<'text' | 'url'>('text');
  const [showRecentSearches, setShowRecentSearches] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, queryType);
    }
  };

  const handleQueryFocus = () => {
    if (recentSearches.length > 0) {
      setShowRecentSearches(true);
    }
  };

  const handleRecentSearchClick = (recentQuery: string) => {
    setQuery(recentQuery);
    setShowRecentSearches(false);
    onSelectRecentSearch(recentQuery);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-xl font-bold text-[#0F4C81] mb-4">Find the Perfect Assessment</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <div className="flex space-x-4 mb-3">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-[#00A3A1]"
                  checked={queryType === 'text'}
                  onChange={() => setQueryType('text')}
                />
                <span className="ml-2 text-gray-700">Natural Language Query</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-[#00A3A1]"
                  checked={queryType === 'url'}
                  onChange={() => setQueryType('url')}
                />
                <span className="ml-2 text-gray-700">Job Description URL</span>
              </label>
            </div>
            
            <div className="relative">
              <div className="flex">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={handleQueryFocus}
                    onBlur={() => setTimeout(() => setShowRecentSearches(false), 200)}
                    placeholder={queryType === 'text' 
                      ? "E.g., Java developers who can collaborate effectively with business teams..." 
                      : "Enter job description URL..."
                    }
                    className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A3A1] focus:border-transparent transition duration-150"
                  />
                  {queryType === 'url' && (
                    <ExternalLinkIcon size={20} className="absolute right-3 top-3 text-gray-400" />
                  )}
                  {queryType === 'text' && (
                    <SearchIcon size={20} className="absolute right-3 top-3 text-gray-400" />
                  )}
                  
                  {/* Recent searches dropdown */}
                  {showRecentSearches && recentSearches.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1 max-h-60 overflow-y-auto">
                      <div className="p-2 border-b border-gray-100 flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500">Recent Searches</span>
                        <button 
                          type="button"
                          className="text-xs text-[#00A3A1] hover:text-[#0F4C81] flex items-center"
                          onClick={() => setShowRecentSearches(false)}
                        >
                          <span>Close</span>
                        </button>
                      </div>
                      <ul className="divide-y divide-gray-100">
                        {recentSearches.map((recentQuery, index) => (
                          <li 
                            key={index}
                            className="p-2 hover:bg-gray-50 cursor-pointer flex items-center space-x-2"
                            onClick={() => handleRecentSearchClick(recentQuery)}
                          >
                            <RotateCcwIcon size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-700 truncate">{recentQuery}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading || !query.trim()}
                  className={`ml-2 bg-[#0F4C81] text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isLoading || !query.trim() 
                      ? 'opacity-70 cursor-not-allowed' 
                      : 'hover:bg-[#00A3A1] hover:shadow-md'
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Searching...
                    </span>
                  ) : (
                    'Get Recommendations'
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            {queryType === 'text' ? (
              <p>Enter a natural language description of the role or skills you're hiring for.</p>
            ) : (
              <p>Enter a URL to a job description page to analyze.</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;