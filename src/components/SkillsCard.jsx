import React, { useState, useEffect } from 'react';
import { HiCode, HiDatabase, HiChip, HiColorSwatch, HiTerminal, HiTemplate, HiCloud, HiPuzzle, HiSparkles } from 'react-icons/hi';
import CardContainer from './CardContainer';

const getCategoryIcon = (category) => {
  const c = category.toLowerCase();
  if (c.includes('front')) return HiTemplate;
  if (c.includes('back')) return HiDatabase;
  if (c.includes('mobile')) return HiChip;
  if (c.includes('design')) return HiColorSwatch;
  if (c.includes('devops')) return HiCloud;
  if (c.includes('tool')) return HiTerminal;
  if (c.includes('frame')) return HiPuzzle;
  if (c.includes('language')) return HiCode;
  return HiSparkles;
};

const getSkillLevel = (level) => {
  if (level >= 90) return { text: 'Expert', color: 'text-yellow-400', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-800/60', fillPercent: level };
  if (level >= 75) return { text: 'Advanced', color: 'text-blue-400', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-800/60', fillPercent: level };
  if (level >= 60) return { text: 'Intermediate', color: 'text-purple-400', bgColor: 'bg-purple-500/10', borderColor: 'border-purple-800/60', fillPercent: level };
  return { text: 'Learning', color: 'text-green-400', bgColor: 'bg-green-500/10', borderColor: 'border-green-800/60', fillPercent: level };
};

const getGridColumns = (count) => {
  if (count === 1) return 'md:grid-cols-1';
  if (count === 2) return 'md:grid-cols-2';
  if (count === 4) return 'md:grid-cols-2 lg:grid-cols-4';
  return 'md:grid-cols-2 lg:grid-cols-3';
};

const getCardWidth = (count) => {
  if (count === 1) return 'md:max-w-2xl md:mx-auto';
  if (count === 2) return 'md:max-w-4xl md:mx-auto';
  return 'w-full';
};

const getLogoUrl = async (skillName) => {
  const cleanName = skillName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/\./g, '-dot-').replace(/^-+|-+$/g, '');
  const cdnUrls = [
    `https://raw.githubusercontent.com/gilbarbara/logos/main/logos/${cleanName}.svg`,
    `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${cleanName}/${cleanName}-original.svg`,
    `https://api.iconify.design/logos:${cleanName}.svg`,
    `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${cleanName}/${cleanName}-plain.svg`,
    `https://cdn.simpleicons.org/${cleanName}`
  ];
  for (let url of cdnUrls) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (res.ok) return url;
    } catch {}
  }
  return null;
};

const SkillLogo = ({ skillName }) => {
  const [logoUrl, setLogoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(false);
    getLogoUrl(skillName).then(url => {
      if (mounted) {
        setLogoUrl(url);
        setError(!url);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, [skillName]);

  if (loading) return (
    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
  if (error || !logoUrl) return (
    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
      <HiCode className="w-4 h-4 text-gray-400" />
    </div>
  );
  return (
    <img
      src={logoUrl}
      alt={skillName}
      className="w-8 h-8 rounded-lg p-1.5 bg-white/10 object-contain"
      onError={() => setError(true)}
    />
  );
};

const ResponsiveSkillCard = ({ category }) => (
  <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10">
    {/* Header */}
    <div className="p-3 md:p-4 border-b border-white/10 md:border-b">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 p-0.5">
          <div className="w-full h-full rounded-lg bg-gray-900 flex items-center justify-center">
            {React.createElement(getCategoryIcon(category.category), { className: "w-4 h-4 md:w-5 md:h-5 text-blue-400" })}
          </div>
        </div>
        <div>
          <h3 className="text-base md:text-lg font-semibold text-white">{category.category}</h3>
          <p className="text-xs md:text-sm text-gray-400">{category.items.length} skills</p>
        </div>
      </div>
    </div>
    {/* Skills */}
    <div className="p-3 md:p-4 flex flex-wrap md:flex-col gap-2 md:space-y-3">
      {category.items.map((skill, index) => {
        const levelInfo = getSkillLevel(skill.level);
        const circumference = 2 * Math.PI * 8; // 8 is radius for a 16px circle
        const offset = circumference - (levelInfo.fillPercent / 100) * circumference;
        
        return (
          <div
            key={index}
            className={`flex items-center gap-2 md:gap-3 p-1.5 md:p-3 rounded-lg ${levelInfo.bgColor} border ${levelInfo.borderColor} transition-all duration-300 w-full md:w-auto`}
          >
            <SkillLogo skillName={skill.name} />
            <div className="flex-1 flex items-center justify-between">
              <span className="text-sm md:text-base font-medium text-white">{skill.name}</span>
              <div className={`flex items-center gap-1.5 ${levelInfo.color}`}>
                <svg className="w-4 h-4 md:w-5 md:h-5 -rotate-90" viewBox="0 0 20 20">
                  <circle 
                    className="opacity-25" 
                    cx="10" 
                    cy="10" 
                    r="8" 
                    fill="none" 
                    strokeWidth="2" 
                    stroke="currentColor" 
                  />
                  <circle 
                    className="opacity-75" 
                    cx="10" 
                    cy="10" 
                    r="8" 
                    fill="none" 
                    strokeWidth="2" 
                    stroke="currentColor" 
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="hidden md:inline text-xs font-medium">{levelInfo.text}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

const SkillsCard = ({ skills = [] }) => (
  <CardContainer
    title="Skills"
    icon={<HiCode className="w-6 h-6" />}
    subtitle="Technologies and tools I work with"
  >
    <div className={`grid grid-cols-1 gap-4 sm:gap-6 ${getGridColumns(skills.length)} ${getCardWidth(skills.length)}`}>
      {skills.map((category, idx) => (
        <ResponsiveSkillCard key={idx} category={category} />
      ))}
    </div>
  </CardContainer>
);

export default SkillsCard;
