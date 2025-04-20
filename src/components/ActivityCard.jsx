import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CardContainer from './CardContainer';
import { SiLeetcode, SiGithub } from 'react-icons/si';
import { HiTrendingUp, HiCode, HiStar, HiPuzzle, HiCheck, HiChartBar, HiClock, HiServer } from 'react-icons/hi';

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
      className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-4"
      >
      {/* Header with Link */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
        <SiGithub className="w-6 h-6 text-gray-400" />
        <h3 className="text-lg font-semibold text-white">GitHub Stats</h3>
        </div>
        <a
        href={`https://github.com/${githubUsername}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-gray-400 hover:text-white transition-colors"
        >
        @{githubUsername}
        </a>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Stats Card */}
        <div className="relative overflow-hidden">
        <img
          src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&hide_border=true&theme=midnight-purple&bg_color=0D1117&title_color=A78BFA&icon_color=9F7AEA&text_color=FFFFFF&include_all_commits=true`}
          alt="GitHub Stats"
          className="w-full max-w-md mx-auto rounded-lg backdrop-blur-sm"
        />
        </div>
        
        {/* Streak Stats */}
        <div className="relative overflow-hidden">
        <img
          src={`https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=transparent&hide_border=true&ring=58a6ff&fire=58a6ff&currStreakLabel=ffffff&sideLabels=ffffff&card_width=450`}
          alt="GitHub Streak"
          className="w-full max-w-md mx-auto rounded-lg backdrop-blur-sm"
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
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="text-red-400 text-center p-6 bg-red-500/10 rounded-lg border border-red-500/20">
                {error}
            </div>
        );
    }
    if (!leetcodeData) return null;

    const statCards = [
        { 
            label: 'Problems Solved',
            value: leetcodeData.totalSolved,
            total: leetcodeData.totalQuestions,
            icon: HiCode,
            color: 'from-blue-500 to-purple-500',
            subtext: `${((leetcodeData.totalSolved / leetcodeData.totalQuestions) * 100).toFixed(1)}% Complete`
        },
        { 
            label: 'Easy Problems',
            value: leetcodeData.easySolved,
            total: leetcodeData.totalEasy,
            icon: HiStar,
            color: 'from-green-500 to-emerald-500',
            subtext: `${((leetcodeData.easySolved / leetcodeData.totalEasy) * 100).toFixed(1)}% Solved`
        },
        { 
            label: 'Medium Problems',
            value: leetcodeData.mediumSolved,
            total: leetcodeData.totalMedium,
            icon: HiPuzzle,
            color: 'from-yellow-500 to-orange-500',
            subtext: `${((leetcodeData.mediumSolved / leetcodeData.totalMedium) * 100).toFixed(1)}% Solved`
        },
        { 
            label: 'Hard Problems',
            value: leetcodeData.hardSolved,
            total: leetcodeData.totalHard,
            icon: HiTrendingUp,
            color: 'from-red-500 to-pink-500',
            subtext: `${((leetcodeData.hardSolved / leetcodeData.totalHard) * 100).toFixed(1)}% Solved`
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10 space-y-4 sm:space-y-6"
        >
            {/* Header with Stats */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-center gap-3">
                    <SiLeetcode className="w-6 h-6 text-[#FFA116]" />
                    <div>
                        <h3 className="text-lg font-semibold text-white">LeetCode Stats</h3>
                        <a
                            href={`https://leetcode.com/${leetcodeUsername}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            @{leetcodeUsername}
                        </a>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm">
                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                        <span className="text-gray-400">Rank: </span>
                        <span className="text-yellow-400 font-medium">{leetcodeData.ranking?.toLocaleString() || 'N/A'}</span>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                        <span className="text-gray-400">Acceptance: </span>
                        <span className="text-green-400 font-medium">{leetcodeData.acceptanceRate}%</span>
                    </div>
                </div>
            </div>

            {/* LC STATS */}
            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {[
                    {
                        label: 'Questions Solved',
                        value: leetcodeData.totalSolved,
                        icon: HiCheck,
                        color: 'text-emerald-400',
                        bgColor: 'bg-emerald-400/10',
                        borderColor: 'border-emerald-400/20'
                    },
                    {
                        label: 'Acceptance Rate',
                        value: `${leetcodeData.acceptanceRate}%`,
                        icon: HiChartBar,
                        color: 'text-blue-400',
                        bgColor: 'bg-blue-400/10',
                        borderColor: 'border-blue-400/20'
                    },
                    {
                        label: 'Submission Count',
                        value: leetcodeData.totalSubmissions || '0',
                        icon: HiServer,
                        color: 'text-purple-400',
                        bgColor: 'bg-purple-400/10',
                        borderColor: 'border-purple-400/20'
                    },
                    {
                        label: 'Global Ranking',
                        value: leetcodeData.ranking?.toLocaleString() || 'N/A',
                        icon: HiTrendingUp,
                        color: 'text-yellow-400',
                        bgColor: 'bg-yellow-400/10',
                        borderColor: 'border-yellow-400/20'
                    }
                ].map((stat, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ y: -2 }}
                        className={`p-3 sm:p-4 rounded-xl border ${stat.borderColor} ${stat.bgColor}`}
                    >
                        <div className="flex items-center gap-2 mb-1 sm:mb-2">
                            <stat.icon className={`w-4 sm:w-5 h-4 sm:h-5 ${stat.color}`} />
                            <span className="text-xs text-gray-400">{stat.label}</span>
                        </div>
                        <p className={`text-lg sm:text-xl font-bold ${stat.color}`}>
                            {stat.value}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Question Distribution */}
            <div className="grid grid-cols-2 xs:grid-cols-3 gap-3 sm:gap-4">
                {[
                    {
                        label: 'Easy Questions',
                        solved: leetcodeData.easySolved,
                        total: leetcodeData.totalEasy,
                        icon: HiStar,
                        color: 'text-green-400'
                    },
                    {
                        label: 'Medium Questions',
                        solved: leetcodeData.mediumSolved,
                        total: leetcodeData.totalMedium,
                        icon: HiPuzzle,
                        color: 'text-yellow-400'
                    },
                    {
                        label: 'Hard Questions',
                        solved: leetcodeData.hardSolved,
                        total: leetcodeData.totalHard,
                        icon: HiCode,
                        color: 'text-red-400'
                    }
                ].map((category, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
                    >
                        <category.icon className={`w-5 h-5 ${category.color}`} />
                        <div>
                            <p className="text-xs sm:text-sm text-gray-400">{category.label}</p>
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
    <CardContainer title="Coding Activity">
      <div className="space-y-6">
        {githubUsername && renderGithubActivity()}
        {leetcodeUsername && renderLeetcodeActivity()}
      </div>
    </CardContainer>
  );
};

export default ActivityCard;
