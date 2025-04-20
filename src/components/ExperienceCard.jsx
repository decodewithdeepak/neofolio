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
        <div className="absolute left-2 sm:left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-transparent" />

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {/* Timeline Node */}
            <div className="absolute -left-10 sm:-left-14">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 p-0.5 shadow-lg">
                <div className="w-full h-full rounded-xl bg-white/80 dark:bg-gray-900/80 flex items-center justify-center">
                  <FaBriefcase className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 dark:text-blue-400" />
                </div>
              </div>
            </div>

            {/* Experience Card */}
            <motion.div
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br 
                       from-white/80 to-white/40 dark:from-gray-800/50 dark:to-gray-800/30
                       border border-transparent p-6
                       hover:border-blue-500 transition-all duration-300 shadow-lg backdrop-blur-sm"
            >
              <div className="relative space-y-4">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <HiOfficeBuilding className="w-4 h-4" />
                      <span className="font-medium text-blue-400">{exp.company}</span>
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
                      className="flex items-center gap-1.5 px-3 py-1 text-sm rounded-full
                               bg-white/50 dark:bg-gray-800/50
                               border border-gray-200/50 dark:border-gray-700/50
                               hover:border-blue-500/50
                               text-gray-700 dark:text-gray-300
                               transition-all duration-200"
                    >
                      <HiChip className="w-3.5 h-3.5 text-blue-500" />
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </CardContainer>
  );
};

export default ExperienceCard;
