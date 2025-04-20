import React from 'react';
import { motion } from 'framer-motion';
import { HiCalendar, HiOfficeBuilding, HiChip } from 'react-icons/hi';
import { FaBriefcase } from 'react-icons/fa';
import CardContainer from './CardContainer';

const ExperienceCard = ({ experiences = [] }) => {
  return (
    <CardContainer 
      title="Experience" 
      icon={<FaBriefcase className="w-6 h-6" />}
      subtitle="My professional journey"
    >
      <div className="relative pl-8 space-y-12">
        {/* Vertical Timeline Line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-transparent" />

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Timeline Node */}
            <div className="absolute -left-6">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 p-0.5 shadow-lg"
              >
                <div className="w-full h-full rounded-xl bg-white/80 dark:bg-gray-900/80
                             flex items-center justify-center relative overflow-hidden 
                             backdrop-blur-sm hover:bg-white/60 dark:hover:bg-gray-800/60 
                             transition-colors duration-300">
                  <FaBriefcase className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                </div>
              </motion.div>
            </div>

            {/* Experience Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br 
                       from-white/80 to-white/40 dark:from-gray-800/50 dark:to-gray-800/30
                       border border-white/20 dark:border-gray-700/20 p-6
                       hover:border-blue-500/20 dark:hover:border-blue-500/20
                       transition-all duration-300 shadow-lg backdrop-blur-sm"
            >
              {/* Card Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative space-y-4">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white 
                                group-hover:text-transparent group-hover:bg-clip-text
                                group-hover:bg-gradient-to-r group-hover:from-blue-500 
                                group-hover:to-purple-500 transition-colors duration-300">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <HiOfficeBuilding className="w-4 h-4" />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full
                               bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                               border border-blue-500/20 shadow-sm">
                    <HiCalendar className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {exp.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-1.5 px-3 py-1 text-sm rounded-full
                               bg-white/50 dark:bg-gray-800/50
                               border border-gray-200/50 dark:border-gray-700/50
                               hover:border-blue-500/50 dark:hover:border-blue-500/50
                               hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-purple-500/5
                               text-gray-700 dark:text-gray-300
                               transition-all duration-200"
                    >
                      <HiChip className="w-3.5 h-3.5 text-blue-500" />
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Decorative Corner Lines */}
              <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-px h-24 
                             bg-gradient-to-t from-blue-500/50 to-transparent" />
                <div className="absolute bottom-0 right-0 h-px w-24 
                             bg-gradient-to-r from-transparent to-blue-500/50" />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </CardContainer>
  );
};

export default ExperienceCard;
