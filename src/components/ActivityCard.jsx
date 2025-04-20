import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CardContainer from './CardContainer';
import { SiLeetcode, SiGithub } from 'react-icons/si';
import { HiTrendingUp, HiCode, HiStar, HiPuzzle, HiCheck, HiChartBar, HiClock, HiServer, HiTerminal } from 'react-icons/hi';

const ActivityCard = ({ githubUsername, leetcodeUsername }) => {
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch LeetCode data
  useEffect(() => {
    const fetchLeetCodeData = async () => {
      if (!leetcodeUsername) return;

      try {
        setLoading(true);
        const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${leetcodeUsername}`);
        const data = await response.json();

        if (data.status === 'error') {
          throw new Error(data.message || 'Failed to fetch LeetCode data');
        }

        setLeetcodeData(data);
      } catch (err) {
        console.error('LeetCode API Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeetCodeData();
  }, [leetcodeUsername]);

  // Only render the card if at least one username is provided
  if (!githubUsername && !leetcodeUsername) return null;

  const renderGithubActivity = () => {
    if (!githubUsername) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-xl bg-gradient-to-br from-white/60 to-white/20 
                 dark:from-gray-800/60 dark:to-gray-900/20
                 border border-white/20 dark:border-gray-700/20
                 shadow-lg backdrop-blur-lg hover:border-blue-500/20 
                 dark:hover:border-blue-500/30 transition-all duration-300"
      >
        {/* Header with Link */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 p-0.5 shadow-md">
                <div className="w-full h-full rounded-xl bg-white/80 dark:bg-gray-900/80 
                 backdrop-blur-sm flex items-center justify-center">
            <SiGithub className="w-6 h-6 text-gray-800 dark:text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">GitHub Activity</h3>
                <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
            @{githubUsername}
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main Stats Card */}
          <div className="relative overflow-hidden bg-white/10 dark:bg-gray-900/20 rounded-lg p-1 border border-white/10 dark:border-gray-700/30">
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&hide_border=true&theme=midnight-purple&bg_color=0D1117&title_color=A78BFA&icon_color=9F7AEA&text_color=FFFFFF&include_all_commits=true`}
              alt="GitHub Stats"
              className="w-full rounded-lg backdrop-blur-sm"
              loading="lazy"
            />
          </div>

          {/* Streak Stats */}
          <div className="relative overflow-hidden bg-white/10 dark:bg-gray-900/20 rounded-lg p-1 border border-white/10 dark:border-gray-700/30">
            <img
              src={`https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=transparent&hide_border=true&ring=58a6ff&fire=58a6ff&currStreakLabel=ffffff&sideLabels=ffffff&card_width=450`}
              alt="GitHub Streak"
              className="w-full rounded-lg backdrop-blur-sm"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    );
  };

  const renderLeetcodeActivity = () => {
    if (!leetcodeUsername) return null;
    if (loading) {
      return (
        <motion.div
          className="flex items-center justify-center p-8 rounded-xl border border-blue-500/20
                   backdrop-blur-md bg-white/10 dark:bg-gray-800/20"
        >
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
        </motion.div>
      );
    }
    if (error) {
      return (
        <motion.div className="text-red-400 text-center p-6 bg-red-500/10 rounded-lg border border-red-500/20">
          {error}
        </motion.div>
      );
    }
    if (!leetcodeData) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-xl bg-gradient-to-br from-white/60 to-white/20 
           dark:from-gray-800/60 dark:to-gray-900/20 
           border border-white/20 dark:border-gray-700/20
           shadow-lg backdrop-blur-lg hover:border-yellow-500/20 
           dark:hover:border-yellow-500/30 transition-all duration-300"
      >
        {/* Background Effect */}
        <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-500/5 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-yellow-500/5 rounded-full blur-2xl"></div>
        </div>

        {/* Header with Stats */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 relative">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 p-0.5 shadow-md">
              <div className="w-full h-full rounded-xl bg-white/80 dark:bg-gray-900/80 
                 backdrop-blur-sm flex items-center justify-center">
                <SiLeetcode className="w-6 h-6 text-[#FFA116]" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">LeetCode Stats</h3>
              <a
                href={`https://leetcode.com/${leetcodeUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
              >
                @{leetcodeUsername}
              </a>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm">
            <div className="px-3 py-1 rounded-full bg-white/10 dark:bg-gray-800/30 border border-white/10 dark:border-gray-700/30">
              <span className="text-gray-700 dark:text-gray-400">Rank: </span>
              <span className="text-yellow-500 dark:text-yellow-400 font-medium">{leetcodeData.ranking?.toLocaleString() || 'N/A'}</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-white/10 dark:bg-gray-800/30 border border-white/10 dark:border-gray-700/30">
              <span className="text-gray-700 dark:text-gray-400">Acceptance: </span>
              <span className="text-green-500 dark:text-green-400 font-medium">{leetcodeData.acceptanceRate}%</span>
            </div>
          </div>
        </div>

        {/* LC STATS */}
        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {[
            {
              label: 'Questions Solved',
              value: leetcodeData.totalSolved,
              icon: HiCheck,
              color: 'text-emerald-500 dark:text-emerald-400',
              bgColor: 'bg-emerald-500/5 dark:bg-emerald-400/10',
              borderColor: 'border-emerald-500/20 dark:border-emerald-400/20',
              hoverBorderColor: 'hover:border-emerald-500/50 dark:hover:border-emerald-400/50'
            },
            {
              label: 'Acceptance Rate',
              value: `${leetcodeData.acceptanceRate}%`,
              icon: HiChartBar,
              color: 'text-blue-500 dark:text-blue-400',
              bgColor: 'bg-blue-500/5 dark:bg-blue-400/10',
              borderColor: 'border-blue-500/20 dark:border-blue-400/20',
              hoverBorderColor: 'hover:border-blue-500/50 dark:hover:border-blue-400/50'
            },
            {
              label: 'Submission Count',
              value: leetcodeData.totalSubmissions || '0',
              icon: HiServer,
              color: 'text-purple-500 dark:text-purple-400',
              bgColor: 'bg-purple-500/5 dark:bg-purple-400/10',
              borderColor: 'border-purple-500/20 dark:border-purple-400/20',
              hoverBorderColor: 'hover:border-purple-500/50 dark:hover:border-purple-400/50'
            },
            {
              label: 'Global Ranking',
              value: leetcodeData.ranking?.toLocaleString() || 'N/A',
              icon: HiTrendingUp,
              color: 'text-yellow-500 dark:text-yellow-400',
              bgColor: 'bg-yellow-500/5 dark:bg-yellow-400/10',
              borderColor: 'border-yellow-500/20 dark:border-yellow-400/20',
              hoverBorderColor: 'hover:border-yellow-500/50 dark:hover:border-yellow-400/50'
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -2 }}
              className={`p-3 sm:p-4 rounded-xl border ${stat.borderColor} ${stat.bgColor}
              backdrop-blur-sm shadow-sm ${stat.hoverBorderColor} transition-all duration-300`}
            >
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <stat.icon className={`w-4 sm:w-5 h-4 sm:h-5 ${stat.color}`} />
                <span className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</span>
              </div>
              <p className={`text-lg sm:text-xl font-bold ${stat.color}`}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Question Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {[
            {
              label: 'Easy Questions',
              solved: leetcodeData.easySolved,
              total: leetcodeData.totalEasy,
              icon: HiStar,
              color: 'text-green-500 dark:text-green-400',
              bgColor: 'bg-green-500/5 dark:bg-green-500/10',
              borderColor: 'border-green-500/20 dark:border-green-500/20',
              hoverBorderColor: 'hover:border-green-500/50 dark:hover:border-green-500/50'
            },
            {
              label: 'Medium Questions',
              solved: leetcodeData.mediumSolved,
              total: leetcodeData.totalMedium,
              icon: HiPuzzle,
              color: 'text-yellow-500 dark:text-yellow-400',
              bgColor: 'bg-yellow-500/5 dark:bg-yellow-500/10',
              borderColor: 'border-yellow-500/20 dark:border-yellow-500/20',
              hoverBorderColor: 'hover:border-yellow-500/50 dark:hover:border-yellow-500/50'
            },
            {
              label: 'Hard Questions',
              solved: leetcodeData.hardSolved,
              total: leetcodeData.totalHard,
              icon: HiCode,
              color: 'text-red-500 dark:text-red-400',
              bgColor: 'bg-red-500/5 dark:bg-red-500/10',
              borderColor: 'border-red-500/20 dark:border-red-500/20',
              hoverBorderColor: 'hover:border-red-500/50 dark:hover:border-red-500/50'
            }
          ].map((category, index) => (
            <motion.div
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg ${category.bgColor} 
              border ${category.borderColor} backdrop-blur-sm shadow-sm ${category.hoverBorderColor} transition-all duration-300`}
            >
              <category.icon className={`w-5 h-5 ${category.color}`} />
              <div>
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">{category.label}</p>
                <p className={`text-xs sm:text-sm font-medium ${category.color}`}>
                  {category.solved} / {category.total}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <CardContainer
      title="Coding Activity"
      icon={<HiCode className="w-6 h-6" />}
      subtitle="GitHub contributions and LeetCode progress"
    >
      <div className="space-y-6">
        {githubUsername && renderGithubActivity()}
        {leetcodeUsername && renderLeetcodeActivity()}
      </div>
    </CardContainer>
  );
};

export default ActivityCard;
