import React from 'react';
import { HelpCircleIcon, InfoIcon, MailIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-[#0F4C81] mb-3">SHL Assessment Finder</h3>
            <p className="text-gray-600 text-sm">
              Simplifying the process of finding the right assessments for your hiring needs.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-[#0F4C81] mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.shl.com/solutions/products/product-catalog/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#00A3A1] text-sm flex items-center"
                >
                  <InfoIcon size={16} className="mr-2" />
                  SHL Product Catalog
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-[#00A3A1] text-sm flex items-center"
                >
                  <HelpCircleIcon size={16} className="mr-2" />
                  Help & Documentation
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-[#0F4C81] mb-3">Contact</h3>
            <a 
              href="mailto:support@example.com" 
              className="text-gray-600 hover:text-[#00A3A1] text-sm flex items-center"
            >
              <MailIcon size={16} className="mr-2" />
              support@example.com
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} SHL Assessment Finder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;