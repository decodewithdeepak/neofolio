import React from 'react';
import { motion } from 'framer-motion';
import { HiAcademicCap, HiCalendar, HiLocationMarker, HiStar } from 'react-icons/hi';
import { FaGraduationCap, FaUniversity, FaSchool, FaBookReader } from 'react-icons/fa';

const EducationCard = ({ education = [] }) => {
  const getEducationIcon = (edu) => {
    const degree = edu.degree.toLowerCase();
    if (degree.includes('master') || degree.includes('phd')) return FaGraduationCap;
    if (degree.includes('bachelor') || degree.includes('engineering')) return FaUniversity;
    if (degree.includes('diploma') || degree.includes('certificate')) return FaBookReader;
    return FaSchool;
  };

  return (
    <div className="relative backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 
                    rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20">
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-blue-500/10 translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-64 sm:h-64 bg-purple-500/10 -translate-x-1/2 translate-y-1/2 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
                      bg-clip-text text-transparent mb-8 sm:mb-12 flex items-center gap-3">
          <HiAcademicCap className="w-6 h-6 sm:w-8 sm:h-8" />
          Education
        </h2>

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
                      <div className="w-full h-full rounded-2xl bg-gray-900 
                                   flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]
                                     animate-pulse" />
                        <EducationIcon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 transform 
                                              group-hover:scale-110 transition-transform duration-300
                                              drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    whileHover={{ y: -5 }}
                    className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-4 sm:p-6 
                             hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="mb-3 sm:mb-4">
                      <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center justify-between
                                 hover:text-transparent hover:bg-clip-text
                                 hover:bg-gradient-to-r hover:from-blue-500 
                                 hover:to-purple-500 transition-colors duration-300">
                        {edu.degree}
                      </h3>
                      <p className="text-blue-400 font-medium mt-1 text-sm sm:text-base">
                        {edu.school}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
                      <div className="flex items-center gap-1">
                        <HiCalendar className="w-4 h-4" />
                        <span>
                          {edu.startYear} - {edu.endYear || 'Present'}
                        </span>
                      </div>
                      {edu.location && (
                        <div className="flex items-center gap-1">
                          <HiLocationMarker className="w-4 h-4" />
                          <span>{edu.location}</span>
                        </div>
                      )}
                      {edu.grade && (
                        <span className="text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full 
                                       bg-blue-500/10 border border-blue-500/20">
                          <span className="flex items-center gap-1 text-blue-400">
                            <HiStar className="w-3 h-3 sm:w-4 sm:h-4" />
                            {edu.grade}
                          </span>
                        </span>
                      )}
                    </div>

                    {edu.description && (
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                        {edu.description}
                      </p>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r 
                                 from-transparent via-blue-500/20 to-transparent 
                                 group-hover:via-blue-500/40 transition-colors duration-300" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
