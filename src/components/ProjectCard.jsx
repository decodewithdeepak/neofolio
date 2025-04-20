import React, { memo } from 'react';
import { motion } from 'framer-motion';
import CardContainer from './CardContainer';
import { HiExternalLink, HiCode, HiLightBulb } from 'react-icons/hi';

// Memoize individual project to prevent unnecessary re-renders
const Project = memo(({ project, index }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: Math.min(index * 0.1, 0.3) }} // Cap animation delay
    className={`transform-gpu flex flex-col md:flex-row ${index % 2 === 1 ? "md:flex-row-reverse" : ""}
        items-center gap-6 md:gap-8 bg-gradient-to-br 
        from-gray-900/80 to-gray-800/60                     
        border border-gray-700/20
        hover:border-blue-500 hover:shadow-lg
        rounded-xl sm:rounded-2xl overflow-hidden shadow-lg optimize-transitions`}
  >
    {/* Image Section with Gradient Overlay - Optimized */}
    <div className="flex-shrink-0 w-full md:w-1/2 relative aspect-video md:aspect-auto overflow-hidden">
      {/* Optimize image loading with width/height attributes */}
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover"
        loading="lazy"
        width="400"
        height="225"
      />
      {/* Removed hover effect that caused repaint */}
    </div>

    {/* Content Section */}
    <div className="flex-1 p-4 sm:p-6 space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600
                     bg-clip-text text-transparent">
          {project.title}
        </h3>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Technologies - Optimized with reduced animations */}
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech, idx) => (
          <span
            key={idx}
            className="px-3 py-1 text-xs sm:text-sm rounded-full
                     bg-gradient-to-r from-gray-800/50 to-gray-700/30
                     border border-gray-600/50
                     text-gray-300
                     hover:text-blue-400
                     optimize-transitions"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links - Optimized with reduced animations */}
      <div className="flex gap-3 pt-2">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 
                     rounded-lg bg-gray-800/40 backdrop-blur-md 
                     border border-gray-700/40
                     text-white hover:bg-gray-800/60 
                     optimize-transitions text-sm shadow-sm"
          >
            <HiCode className="w-4 h-4" />
            <span className="font-medium">Code</span>
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 
                     rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 
                     hover:from-blue-600 hover:to-purple-600 text-white 
                     shadow-lg shadow-blue-500/25 optimize-transitions text-sm"
          >
            <HiExternalLink className="w-4 h-4" />
            <span className="font-medium">Live Demo</span>
          </a>
        )}
      </div>
    </div>
  </motion.div>
));

Project.displayName = 'Project';

// Memoize the main component
const ProjectCard = memo(({ projects = [] }) => {
  return (
    <CardContainer
      title="Projects"
      icon={<HiLightBulb className="w-6 h-6" />}
      subtitle="Showcasing my work and creations"
      className="projects-section"
    >
      <div className="space-y-8">
        {projects.map((project, index) => (
          <Project key={index} project={project} index={index} />
        ))}
      </div>
    </CardContainer>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
