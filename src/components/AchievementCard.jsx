import React from 'react';
import { motion } from 'framer-motion';
import { HiExternalLink, HiCalendar, HiOfficeBuilding } from 'react-icons/hi';
import { FaTrophy, FaMedal, FaAward, FaCertificate } from 'react-icons/fa'; // Import achievement icons
import CardContainer from './CardContainer';

const AchievementCard = ({ achievements = [] }) => {
  // Function to get appropriate icon based on title or type
  const getAchievementIcon = (achievement) => {
    const title = achievement.title.toLowerCase();
    if (title.includes('winner') || title.includes('first')) return FaTrophy;
    if (title.includes('certificate')) return FaCertificate;
    if (title.includes('award')) return FaAward;
    return FaMedal;
  };

  return (
    <CardContainer title="Achievements">
      <div className="flex flex-col gap-6">
        {achievements.map((achievement, index) => {
          const AchievementIcon = getAchievementIcon(achievement);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: -5 }}
              className="group relative flex items-center overflow-visible rounded-xl bg-gradient-to-br 
                     from-white/40 to-white/10 dark:from-gray-800/40 dark:to-gray-800/10 
                     border border-white/20 dark:border-gray-700/20 
                     hover:border-blue-500/20 dark:hover:border-blue-500/20
                     transition-all duration-300 mt-6"
            >
              {/* Enhanced Achievement Icon */}
              <div className="flex-shrink-0 mr-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 
                           p-0.5 shadow-lg shadow-yellow-500/25"
                >
                  <div className="w-full h-full rounded-2xl bg-white dark:bg-gray-900 
                               flex items-center justify-center relative overflow-hidden group">
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,182,0,0.1),transparent_70%)]
                                 animate-pulse" />
                    
                    {/* Icon */}
                    <AchievementIcon className="w-8 h-8 text-yellow-500 transform 
                                            group-hover:scale-110 transition-transform duration-300
                                            drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                  </div>
                </motion.div>
              </div>

              <div className="flex-1 p-4 space-y-4">
                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white 
                           group-hover:text-transparent group-hover:bg-clip-text
                           group-hover:bg-gradient-to-r group-hover:from-blue-500 
                           group-hover:to-purple-500 transition-colors duration-300">
                  {achievement.title}
                </h3>

                {/* Issuer and Date */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <HiOfficeBuilding className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">{achievement.issuer}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <HiCalendar className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">{achievement.date}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                  {achievement.description}
                </p>

                {/* Certificate Link */}
                {achievement.url && (
                  <motion.a
                    href={achievement.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                           bg-gradient-to-r from-blue-500 to-purple-500 
                           hover:from-blue-600 hover:to-purple-600
                           text-white text-sm font-medium shadow-lg shadow-blue-500/25 
                           transition-all duration-300"
                  >
                    <span>View Certificate</span>
                    <HiExternalLink className="w-4 h-4" />
                  </motion.a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </CardContainer>
  );
};

export default AchievementCard;
