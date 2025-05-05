import React from 'react';
import { SearchIcon, FileTextIcon, Brain } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-3xl mx-auto animate-fadeIn">
      <div className="flex justify-center mb-6">
        <div className="bg-[#F0F7FF] p-4 rounded-full">
          <Brain size={48} className="text-[#0F4C81]" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-[#0F4C81] mb-4">Welcome to SHL Assessment Finder</h2>
      
      <p className="text-gray-600 mb-8">
        Find the perfect assessments for your hiring needs in seconds using our intelligent recommendation system.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
          <div className="flex justify-center mb-3">
            <SearchIcon size={24} className="text-[#00A3A1]" />
          </div>
          <h3 className="font-medium mb-2 text-gray-800">Natural Language Search</h3>
          <p className="text-sm text-gray-600">
            Describe the role you're hiring for in natural language, and we'll recommend the best assessments.
          </p>
        </div>
        
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
          <div className="flex justify-center mb-3">
            <FileTextIcon size={24} className="text-[#00A3A1]" />
          </div>
          <h3 className="font-medium mb-2 text-gray-800">Job Description Analysis</h3>
          <p className="text-sm text-gray-600">
            Paste a URL to your job description, and our system will analyze it to find matching assessments.
          </p>
        </div>
      </div>
      
      <div className="mt-8 text-sm text-gray-500">
        <p>Try searching for roles like "Java developers", "Python analysts", or "Technical leads"</p>
      </div>
    </div>
  );
};

export default EmptyState;