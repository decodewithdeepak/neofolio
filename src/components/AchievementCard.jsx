import React from 'react';
import { motion } from 'framer-motion';
import { HiExternalLink, HiCalendar, HiOfficeBuilding } from 'react-icons/hi';
import { FaTrophy, FaMedal, FaAward, FaCertificate } from 'react-icons/fa';
import CardContainer from './CardContainer';

const AchievementCard = ({ achievements = [] }) => {
  const getAchievementIcon = (achievement) => {
    const title = achievement.title.toLowerCase();
    if (title.includes('winner') || title.includes('first')) return FaTrophy;
    if (title.includes('certificate')) return FaCertificate;
    if (title.includes('award')) return FaAward;
    return FaMedal;
  };

  return (
    <CardContainer 
      title="Achievements" 
      icon={<FaTrophy className="w-6 h-6" />}
      subtitle="Recognition and accomplishments"
    >
      <div className="flex flex-col gap-6">
        {achievements.map((achievement, index) => {
          const AchievementIcon = getAchievementIcon(achievement);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden rounded-xl bg-gradient-to-br 
                       from-white/80 to-white/40 dark:from-gray-800/50 dark:to-gray-800/30
                       border border-white/20 dark:border-gray-700/20 p-5
                       hover:border-yellow-500/40 dark:hover:border-yellow-500/40
                       transition-all duration-300 shadow-lg backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-pink-500/5" />

              <div className="relative flex items-start gap-5">
                <div className="flex-shrink-0">
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 
                             p-0.5 shadow-lg shadow-yellow-500/25"
                  >
                    <div className="w-full h-full rounded-xl bg-white/80 dark:bg-gray-900/80 
                                 backdrop-blur-sm flex items-center justify-center relative overflow-hidden
                                 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-colors duration-300">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,182,0,0.1),transparent_70%)]" />
                      <AchievementIcon className="w-7 h-7 text-yellow-500
                                              drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                    </div>
                  </motion.div>
                </div>

                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {achievement.title}
                  </h3>

                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <HiOfficeBuilding className="w-4 h-4 flex-shrink-0 text-yellow-500" />
                      <span className="text-sm font-medium">{achievement.issuer}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <HiCalendar className="w-4 h-4 flex-shrink-0 text-yellow-500" />
                      <span className="text-sm">{achievement.date}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {achievement.description}
                  </p>

                  {achievement.url && (
                    <motion.a
                      href={achievement.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      className="inline-flex items-center gap-2 px-4 py-2 mt-2 rounded-lg
                             bg-gradient-to-r from-yellow-500 to-orange-500 
                             hover:from-yellow-600 hover:to-orange-600
                             text-white text-sm font-medium shadow-lg shadow-yellow-500/25 
                             transition-all duration-300"
                    >
                      <span>View Certificate</span>
                      <HiExternalLink className="w-4 h-4" />
                    </motion.a>
                  )}
                </div>
              </div>

              <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-px h-24 
                             bg-gradient-to-t from-yellow-500/50 to-transparent" />
                <div className="absolute bottom-0 right-0 h-px w-24 
                             bg-gradient-to-r from-transparent to-yellow-500/50" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </CardContainer>
  );
};

export default AchievementCard;
