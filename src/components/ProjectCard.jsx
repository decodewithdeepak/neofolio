import React from 'react';
import { motion } from 'framer-motion';
import CardContainer from './CardContainer';
import { HiExternalLink, HiCode, HiChevronRight } from 'react-icons/hi';

const ProjectCard = ({ projects = [] }) => {
  return (
    <CardContainer title="Projects">
      {/* Changed grid to single column on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br 
                     from-white/40 to-white/10 dark:from-gray-800/40 dark:to-gray-800/10 
                     border border-white/20 dark:border-gray-700/20
                     hover:border-blue-500/20 dark:hover:border-blue-500/20
                     transition-all duration-300"
          >
            {/* Image Container - Adjusted for mobile */}
            <div className="relative aspect-[16/9] sm:aspect-video overflow-hidden rounded-t-xl sm:rounded-t-2xl">
              <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-[2px] hover:backdrop-blur-0 transition-all duration-300" />
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transform hover:scale-110 transition-all duration-500"
                loading="lazy" // Added lazy loading
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60 hover:opacity-80 transition-opacity duration-300" />
              
              {/* Project Links - Always visible on mobile */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 
                           flex gap-2 sm:gap-3 transition-all duration-300 ease-in-out">
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 
                             rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-md border border-white/20
                             text-white hover:bg-white/20 transition-all duration-300 text-sm"
                  >
                    <HiCode className="w-4 h-4" />
                    <span className="font-medium">Code</span>
                  </motion.a>
                )}
                {project.demo && (
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 
                             rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500/80 to-purple-500/80 
                             hover:from-blue-600/80 hover:to-purple-600/80 text-white 
                             shadow-lg shadow-blue-500/25 transition-all duration-300 text-sm"
                  >
                    <HiExternalLink className="w-4 h-4" />
                    <span className="font-medium">Live Demo</span>
                  </motion.a>
                )}
              </div>
            </div>

            {/* Content Section - Improved mobile padding */}
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white
                             hover:text-transparent hover:bg-clip-text
                             hover:bg-gradient-to-r hover:from-blue-500 
                             hover:to-purple-500 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 line-clamp-2">
                  {project.description}
                </p>
              </div>

              {/* Technologies - Improved mobile layout */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full
                             bg-gradient-to-r from-gray-50/50 to-gray-100/50
                             dark:from-gray-800/50 dark:to-gray-700/50
                             border border-gray-200/50 dark:border-gray-600/50
                             text-gray-700 dark:text-gray-300
                             hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400
                             transition-all duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </CardContainer>
  );
};

export default ProjectCard;
