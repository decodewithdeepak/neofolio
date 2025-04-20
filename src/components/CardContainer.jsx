import React, { memo } from 'react';
import { motion } from 'framer-motion';

// Memoize the component to prevent unnecessary re-renders
const CardContainer = memo(({ children, className, title, icon, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px 0px" }}
      transition={{ duration: 0.5 }}
      className={`transform-gpu relative overflow-hidden backdrop-blur-2xl 
                 bg-gradient-to-br from-gray-800/40 via-gray-800/25 to-gray-900/10
                 rounded-3xl shadow-2xl border border-gray-700/20
                 scroll-optimize ${className}`}
    >
      {/* Background Effects - Optimized with reduced complexity */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content Container */}
      <div className="relative sm:p-8 p-4">
        {title && (
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-2"
            >
              {icon && <div className="text-blue-400">{icon}</div>}
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                         bg-clip-text text-transparent">
                {title}
              </h2>
            </motion.div>
            
            {subtitle && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 text-sm ml-9"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}
        {children}
      </div>
    </motion.div>
  );
});

CardContainer.displayName = 'CardContainer';

export default CardContainer;
