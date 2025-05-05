import React, { useState } from 'react';
import { CheckIcon, XIcon, ExternalLinkIcon, ClipboardIcon, Download, Filter, Share2 } from 'lucide-react';
import { Assessment } from '../types';

interface ResultsTableProps {
  recommendations: Assessment[];
  query: string;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ recommendations, query }) => {
  const [filters, setFilters] = useState({
    remoteTestingOnly: false,
    adaptiveOnly: false,
    maxDuration: '',
    testType: ''
  });
  const [copiedMessage, setCopiedMessage] = useState<string | null>(null);

  const handleFilterChange = (filterName: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const filteredRecommendations = recommendations.filter(assessment => {
    // Apply remote testing filter
    if (filters.remoteTestingOnly && !assessment.remoteTestingSupport) {
      return false;
    }
    
    // Apply adaptive testing filter
    if (filters.adaptiveOnly && !assessment.adaptiveSupport) {
      return false;
    }
    
    // Apply duration filter
    if (filters.maxDuration) {
      const durationNumber = parseInt(assessment.duration);
      const maxDurationNumber = parseInt(filters.maxDuration);
      if (durationNumber > maxDurationNumber) {
        return false;
      }
    }
    
    // Apply test type filter
    if (filters.testType && assessment.testType !== filters.testType) {
      return false;
    }
    
    return true;
  });

  const testTypes = [...new Set(recommendations.map(r => r.testType))];

  const copyToClipboard = () => {
    const text = `SHL Assessment Recommendations for: "${query}"\n\n` + 
      filteredRecommendations.map((r, i) => 
        `${i+1}. ${r.name} (${r.testType})\n` +
        `   Duration: ${r.duration}\n` +
        `   Remote Testing: ${r.remoteTestingSupport ? 'Yes' : 'No'}\n` +
        `   Adaptive/IRT: ${r.adaptiveSupport ? 'Yes' : 'No'}\n` +
        `   URL: ${r.url}\n`
      ).join('\n');
    
    navigator.clipboard.writeText(text).then(() => {
      setCopiedMessage('Results copied to clipboard!');
      setTimeout(() => setCopiedMessage(null), 3000);
    });
  };

  if (recommendations.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-xl font-bold text-gray-700 mb-2">No Recommendations Found</h2>
        <p className="text-gray-600">
          We couldn't find any assessments matching your criteria. 
          Please try a different search query.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#0F4C81]">Recommended Assessments</h2>
          <p className="text-gray-600 text-sm">
            Based on: "{query.length > 50 ? query.substring(0, 50) + '...' : query}"
          </p>
        </div>
        
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button 
            onClick={copyToClipboard}
            className="flex items-center text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded transition-colors duration-150"
          >
            <ClipboardIcon size={16} className="mr-1" />
            <span>Copy</span>
          </button>
          
          <button className="flex items-center text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded transition-colors duration-150">
            <Download size={16} className="mr-1" />
            <span>Export</span>
          </button>
          
          <button className="flex items-center text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded transition-colors duration-150">
            <Share2 size={16} className="mr-1" />
            <span>Share</span>
          </button>
        </div>
      </div>
      
      {copiedMessage && (
        <div className="mb-4 bg-green-50 text-green-700 px-4 py-2 rounded-md animate-fadeIn">
          {copiedMessage}
        </div>
      )}
      
      <div className="mb-4 p-3 bg-gray-50 rounded-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="flex items-center mb-3 sm:mb-0">
            <Filter size={16} className="text-gray-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-[#00A3A1]"
                checked={filters.remoteTestingOnly}
                onChange={(e) => handleFilterChange('remoteTestingOnly', e.target.checked)}
              />
              <span className="ml-2 text-sm text-gray-700">Remote Testing Only</span>
            </label>
            
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-[#00A3A1]"
                checked={filters.adaptiveOnly}
                onChange={(e) => handleFilterChange('adaptiveOnly', e.target.checked)}
              />
              <span className="ml-2 text-sm text-gray-700">Adaptive/IRT Only</span>
            </label>
            
            <select
              value={filters.maxDuration}
              onChange={(e) => handleFilterChange('maxDuration', e.target.value)}
              className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#00A3A1]"
            >
              <option value="">Max Duration</option>
              <option value="20">≤ 20 minutes</option>
              <option value="30">≤ 30 minutes</option>
              <option value="45">≤ 45 minutes</option>
              <option value="60">≤ 60 minutes</option>
            </select>
            
            <select
              value={filters.testType}
              onChange={(e) => handleFilterChange('testType', e.target.value)}
              className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#00A3A1]"
            >
              <option value="">All Test Types</option>
              {testTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assessment
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Remote Testing
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Adaptive/IRT
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Test Type
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRecommendations.map((assessment, index) => (
              <tr 
                key={assessment.id}
                className={`hover:bg-gray-50 transition-colors duration-150 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <td className="px-4 py-4 text-sm font-medium">
                  <a 
                    href={assessment.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#0F4C81] hover:text-[#00A3A1] hover:underline flex items-center"
                  >
                    {assessment.name}
                    <ExternalLinkIcon size={14} className="ml-1 inline-block" />
                  </a>
                  {assessment.description && (
                    <p className="text-xs text-gray-500 mt-1">{assessment.description}</p>
                  )}
                </td>
                <td className="px-4 py-4">
                  {assessment.remoteTestingSupport ? (
                    <span className="flex items-center text-green-600">
                      <CheckIcon size={18} className="mr-1" />
                      <span className="text-sm">Yes</span>
                    </span>
                  ) : (
                    <span className="flex items-center text-red-500">
                      <XIcon size={18} className="mr-1" />
                      <span className="text-sm">No</span>
                    </span>
                  )}
                </td>
                <td className="px-4 py-4">
                  {assessment.adaptiveSupport ? (
                    <span className="flex items-center text-green-600">
                      <CheckIcon size={18} className="mr-1" />
                      <span className="text-sm">Yes</span>
                    </span>
                  ) : (
                    <span className="flex items-center text-red-500">
                      <XIcon size={18} className="mr-1" />
                      <span className="text-sm">No</span>
                    </span>
                  )}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {assessment.duration}
                </td>
                <td className="px-4 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    assessment.testType === 'Cognitive' 
                      ? 'bg-blue-100 text-blue-800' 
                      : assessment.testType === 'Technical' 
                        ? 'bg-purple-100 text-purple-800'
                        : assessment.testType === 'Personality'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                  }`}>
                    {assessment.testType}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredRecommendations.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No assessments match the current filters.</p>
          <button 
            onClick={() => setFilters({
              remoteTestingOnly: false,
              adaptiveOnly: false,
              maxDuration: '',
              testType: ''
            })}
            className="mt-2 text-[#00A3A1] hover:text-[#0F4C81] text-sm"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultsTable;