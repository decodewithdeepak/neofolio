import React from 'react';
import { Link } from 'react-router-dom';
import { HiPlus } from 'react-icons/hi';

const CreatePortfolioButton = () => {
  return (
    <Link
      to="/signup"
      className="inline-flex items-center justify-center px-3 sm:px-4 py-2 
                 text-sm font-medium rounded-xl transition-all duration-200
                 bg-gradient-to-r from-blue-500 to-purple-500 
                 text-white hover:shadow-lg hover:shadow-blue-500/25
                 whitespace-nowrap overflow-hidden"
    >
      <HiPlus className="w-4 h-4 mr-1 sm:mr-2" />
      <span className="hidden sm:inline">Create Portfolio</span>
      <span className="sm:hidden">Create</span>
    </Link>
  );
};

export default CreatePortfolioButton;
