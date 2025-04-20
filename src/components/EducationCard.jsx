import React from 'react';
import { motion } from 'framer-motion';
import { HiAcademicCap, HiCalendar, HiLocationMarker, HiStar } from 'react-icons/hi';
import { FaGraduationCap, FaUniversity, FaSchool, FaBookReader } from 'react-icons/fa';
import CardContainer from './CardContainer';

const EducationCard = ({ education = [] }) => {
  const getEducationIcon = (edu) => {
    const degree = edu.degree.toLowerCase();
    if (degree.includes('master') || degree.includes('phd')) return FaGraduationCap;
    if (degree.includes('bachelor') || degree.includes('engineering')) return FaUniversity;
    if (degree.includes('diploma') || degree.includes('certificate')) return FaBookReader;
    return FaSchool;
  };

  return (
    <CardContainer 
      title="Education" 
      icon={<HiAcademicCap className="w-6 h-6" />}
      subtitle="Academic qualifications and learning journey"
    >
      <div className="relative">
        <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent" />

        <div className="space-y-8 sm:space-y-12">
          {education.map((edu, index) => {
            const EducationIcon = getEducationIcon(edu);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-12 sm:pl-16"
              >
                <div className="absolute left-0 top-0 z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 
                             p-0.5 shadow-lg shadow-blue-500/25"
                  >
                    <div className="w-full h-full rounded-2xl bg-white/80 dark:bg-gray-900/80 
                                 backdrop-blur-sm flex items-center justify-center relative 
                                 overflow-hidden group transition-colors duration-300
                                 hover:bg-white/60 dark:hover:bg-gray-800/60">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]
                                   animate-pulse" />
                      <EducationIcon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-500 transform 
                                            group-hover:scale-110 transition-transform duration-300
                                            drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="group relative bg-gradient-to-br from-white/80 to-white/40 
                           dark:from-gray-800/50 dark:to-gray-800/30
                           backdrop-blur-lg rounded-xl border border-white/20 dark:border-gray-700/20 
                           p-4 sm:p-6 shadow-lg
                           hover:border-blue-500/20 dark:hover:border-blue-500/20 
                           transition-all duration-300"
                >
                  {/* Card Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 
                               rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative">
                    <div className="mb-3 sm:mb-4">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white
                                   group-hover:text-transparent group-hover:bg-clip-text
                                   group-hover:bg-gradient-to-r group-hover:from-blue-500 
                                   group-hover:to-purple-500 transition-colors duration-300">
                        {edu.degree}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium mt-1 text-sm sm:text-base">
                        {edu.school}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-700 dark:text-gray-400 mb-3 sm:mb-4">
                      <div className="flex items-center gap-1">
                        <HiCalendar className="w-4 h-4 text-blue-500" />
                        <span>
                          {edu.startYear} - {edu.endYear || 'Present'}
                        </span>
                      </div>
                      {edu.location && (
                        <div className="flex items-center gap-1">
                          <HiLocationMarker className="w-4 h-4 text-blue-500" />
                          <span>{edu.location}</span>
                        </div>
                      )}
                      {edu.grade && (
                        <span className="text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full 
                                       bg-blue-500/10 border border-blue-500/20">
                          <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                            <HiStar className="w-3 h-3 sm:w-4 sm:h-4" />
                            {edu.grade}
                          </span>
                        </span>
                      )}
                    </div>

                    {edu.description && (
                      <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
                        {edu.description}
                      </p>
                    )}

                    {/* Decorative Corner Lines */}
                    <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none opacity-0 
                                 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-0 right-0 w-px h-24 
                                   bg-gradient-to-t from-blue-500/50 to-transparent" />
                      <div className="absolute bottom-0 right-0 h-px w-24 
                                   bg-gradient-to-r from-transparent to-blue-500/50" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </CardContainer>
  );
};

export default EducationCard;
