import React from 'react';
import { motion } from 'framer-motion';
import { HiCode } from 'react-icons/hi';

const Logo = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.div
        initial={{ rotate: -90 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-sm opacity-75" />
        <div className="relative bg-gray-900 rounded-lg p-1.5">
          <HiCode className="w-6 h-6 text-white" />
        </div>
      </motion.div>
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
      >
        Neofolio
      </motion.span>
    </div>
  );
};

export default Logo;
