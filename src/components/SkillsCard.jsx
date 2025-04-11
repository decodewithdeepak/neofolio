import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiCode, HiDatabase, HiChip, HiColorSwatch, HiTerminal, 
  HiTemplate, HiCloud, HiPuzzle, HiSparkles, HiChevronDown,
  HiStar, HiLightningBolt, HiAcademicCap
} from 'react-icons/hi';

const SkillsCard = ({ skills = [] }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const getLogoUrl = (skillName) => {
    const cleanName = skillName.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/\./g, '-dot-')
      .replace(/^-+|-+$/g, '');

    // Prioritize colored icons
    const cdnUrls = [
      // SVG Porn (High quality colored icons)
      `https://raw.githubusercontent.com/gilbarbara/logos/main/logos/${cleanName}.svg`,
      
      // Devicon (colored versions)
      `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${cleanName}/${cleanName}-original.svg`,
      
      // Simple Icons with colors
      `https://api.iconify.design/logos:${cleanName}.svg`,
      
      // Fallbacks
      `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${cleanName}/${cleanName}-plain.svg`,
      `https://cdn.simpleicons.org/${cleanName}`
    ];

    // Function to check if image exists
    const checkImage = (url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });
    };

    // Return the first working URL or null
    return Promise.any(cdnUrls.map(url => 
      checkImage(url).then(exists => exists ? url : Promise.reject())
    )).catch(() => null);
  };

  const SkillLogo = ({ skillName }) => {
    const [logoUrl, setLogoUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    React.useEffect(() => {
      const loadLogo = async () => {
        try {
          const url = await getLogoUrl(skillName);
          setLogoUrl(url);
          setError(!url);
        } catch (err) {
          setError(true);
        } finally {
          setLoading(false);
        }
      };

      loadLogo();
    }, [skillName]);

    if (loading) {
      return (
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }

    if (error || !logoUrl) {
      return (
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
          <HiCode className="w-4 h-4 text-gray-400" />
        </div>
      );
    }

    return (
      <img
        src={logoUrl}
        alt={skillName}
        className="w-8 h-8 rounded-lg p-1.5 bg-white/10 object-contain"
        onError={() => setError(true)}
      />
    );
  };

  const getCategoryIcon = (category) => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('front')) return HiTemplate;
    if (categoryLower.includes('back')) return HiDatabase;
    if (categoryLower.includes('mobile')) return HiChip;
    if (categoryLower.includes('design')) return HiColorSwatch;
    if (categoryLower.includes('devops')) return HiCloud;
    if (categoryLower.includes('tool')) return HiTerminal;
    if (categoryLower.includes('frame')) return HiPuzzle;
    if (categoryLower.includes('language')) return HiCode;
    return HiSparkles;
  };

  const getSkillLevel = (level) => {
    if (level >= 90) return {
      icon: HiStar,
      text: 'Expert',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      borderColor: 'border-yellow-400/30'
    };
    if (level >= 75) return {
      icon: HiLightningBolt,
      text: 'Advanced',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      borderColor: 'border-blue-400/30'
    };
    if (level >= 60) return {
      icon: HiAcademicCap,
      text: 'Intermediate',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      borderColor: 'border-purple-400/30'
    };
    return {
      icon: HiSparkles,
      text: 'Learning',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      borderColor: 'border-green-400/30'
    };
  };

  // Compact card for mobile
  const CompactSkillCard = ({ category }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10"
    >
      <div className="p-3">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 
                       to-purple-500 p-0.5">
            <div className="w-full h-full rounded-lg bg-gray-900 flex 
                        items-center justify-center">
              {getCategoryIcon(category.category)({ className: "w-4 h-4 text-blue-400" })}
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">
              {category.category}
            </h3>
            <p className="text-xs text-gray-400">
              {category.items.length} skills
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {category.items.map((skill, index) => {
            const levelInfo = getSkillLevel(skill.level);
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`flex items-center gap-2 p-1.5 rounded-lg ${levelInfo.bgColor} 
                          border ${levelInfo.borderColor}`}
              >
                <SkillLogo skillName={skill.name} />
                <span className="text-sm font-medium text-white">
                  {skill.name}
                </span>
                <levelInfo.icon className={`w-4 h-4 ${levelInfo.color}`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );

  // Desktop card remains the same
  const DesktopSkillCard = ({ category }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10"
    >
      {/* Category Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 
                       to-purple-500 p-0.5">
            <div className="w-full h-full rounded-lg bg-gray-900 flex 
                        items-center justify-center">
              {getCategoryIcon(category.category)({ className: "w-5 h-5 text-blue-400" })}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              {category.category}
            </h3>
            <p className="text-sm text-gray-400">
              {category.items.length} skills
            </p>
          </div>
        </div>
      </div>

      {/* Skills List */}
      <div className="p-4 space-y-3">
        {category.items.map((skill, index) => {
          const levelInfo = getSkillLevel(skill.level);
          
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className={`flex items-center gap-3 p-3 rounded-lg ${levelInfo.bgColor} 
                        border ${levelInfo.borderColor}`}
            >
              <SkillLogo skillName={skill.name} />
              
              <div className="flex-1 flex items-center justify-between">
                <span className="font-medium text-white">
                  {skill.name}
                </span>
                <div className={`flex items-center gap-1.5 ${levelInfo.color}`}>
                  <levelInfo.icon className="w-5 h-5" />
                  <span className="text-xs font-medium">
                    {levelInfo.text}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );

  // Helper function to determine grid columns based on number of categories
  const getGridColumns = (categoryCount) => {
    if (categoryCount === 1) return 'md:grid-cols-1';
    if (categoryCount === 2) return 'md:grid-cols-2';
    if (categoryCount === 4) return 'md:grid-cols-2 lg:grid-cols-4';
    return 'md:grid-cols-2 lg:grid-cols-3'; // Default for 3 or more (except 4)
  };

  // Helper function to determine card width based on number of categories
  const getCardWidth = (categoryCount) => {
    if (categoryCount === 1) return 'md:max-w-2xl md:mx-auto';
    if (categoryCount === 2) return 'md:max-w-4xl md:mx-auto';
    return 'w-full'; // Full width for 3 or more
  };

  return (
    <div className="relative backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 
                    rounded-2xl shadow-2xl p-4 sm:p-8 border border-white/20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 -translate-x-1/2 translate-y-1/2 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 
                      to-purple-600 bg-clip-text text-transparent mb-6 sm:mb-8">
          Skills
        </h2>

        <div className={`grid grid-cols-1 gap-4 sm:gap-6 ${getGridColumns(skills.length)} ${getCardWidth(skills.length)}`}>
          {skills.map((category, idx) => (
            <>
              {/* Show compact version on mobile, full version on desktop */}
              <div className="block md:hidden">
                <CompactSkillCard key={`mobile-${idx}`} category={category} />
              </div>
              <div className="hidden md:block">
                <DesktopSkillCard key={`desktop-${idx}`} category={category} />
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsCard;
