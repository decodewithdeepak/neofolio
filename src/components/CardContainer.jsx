import React from 'react';
import { motion } from 'framer-motion';

const CardContainer = ({ children, className, title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`group relative overflow-hidden backdrop-blur-2xl 
                 bg-gradient-to-br from-white/40 via-white/25 to-white/10 
                 dark:from-gray-800/40 dark:via-gray-800/25 dark:to-gray-900/10
                 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20
                 hover:shadow-3xl hover:border-white/30 dark:hover:border-gray-600/30
                 transition-all duration-500 ${className}`}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl group-hover:translate-x-8 group-hover:translate-y-8 transition-transform duration-700"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl group-hover:-translate-x-8 group-hover:-translate-y-8 transition-transform duration-700"></div>
      </div>

      {/* Content Container */}
      <div className="relative p-8">
        {title && (
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                     bg-clip-text text-transparent mb-8 group-hover:from-blue-500 
                     group-hover:to-purple-500 transition-all duration-300"
          >
            {title}
          </motion.h2>
        )}
        {children}
      </div>
    </motion.div>
  );
};

export default CardContainer;
