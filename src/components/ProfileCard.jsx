import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe, FaCode, FaHackerrank } from 'react-icons/fa';
import { SiLeetcode, SiGeeksforgeeks } from 'react-icons/si';
import { HiMail, HiSparkles, HiLocationMarker, HiLink } from 'react-icons/hi';
import CardContainer from './CardContainer';

const getSocialIcon = (name) => {
  if (!name) return null;
  switch (name.toLowerCase()) {
    case 'github':
      return <FaGithub className="w-5 h-5" />;
    case 'linkedin':
      return <FaLinkedin className="w-5 h-5" />;
    case 'twitter':
      return <FaTwitter className="w-5 h-5" />;
    case 'website':
      return <FaGlobe className="w-5 h-5" />;
    case 'mail':
      return <HiMail className="w-5 h-5" />;
    case 'leetcode':
      return <SiLeetcode className="w-5 h-5 text-[#FFA116]" />;
    case 'geeksforgeeks':
    case 'gfg':
      return <SiGeeksforgeeks className="w-5 h-5 text-[#2F8D46]" />;
    case 'hackerrank':
      return <FaHackerrank className="w-5 h-5 text-[#00EA64]" />;
    case 'coding':
      return <FaCode className="w-5 h-5" />;
    default:
      return null;
  }
};

const getFormattedUrl = (link) => {
  if (!link?.url) return '';
  if (link.name.toLowerCase() === 'mail') {
    // Check if the URL already has mailto: prefix
    return link.url.startsWith('mailto:') ? link.url : `mailto:${link.url}`;
  }
  return link.url;
};

const ProfileCard = ({ profile = {} }) => {
  const {
    name = 'User',
    title = '',
    bio = '',
    avatar = '',
    links = [],
    location = ''
  } = profile;

  return (
    <CardContainer className="transform-gpu">
      {/* Hero Banner Section */}
      <div className="relative h-52 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 rounded-t-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-30" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80"
        />
      </div>

      {/* Profile Content */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative -mt-28 rounded-3xl backdrop-blur-xl 
                 bg-white/60 dark:bg-gray-800/60 
                 border border-white/20 dark:border-gray-700/20 
                 shadow-2xl"
      >
        <div className="p-8">
          {/* Avatar & Basic Info */}
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Avatar Container */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="relative"
            >
              {/* Avatar Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 
                           rounded-full blur-xl opacity-75 animate-pulse" />
              {/* Avatar Image */}
              <div className="relative w-32 h-32">
                <img 
                  src={avatar || `https://ui-avatars.com/api/?name=${name}`}
                  alt={name}
                  className="w-full h-full rounded-full object-cover border-4 border-white 
                           dark:border-gray-800 shadow-xl"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -right-2 -top-2 w-8 h-8 bg-gradient-to-r 
                           from-yellow-400 to-orange-500 rounded-full 
                           flex items-center justify-center shadow-lg"
                >
                  <HiSparkles className="w-5 h-5 text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* Name & Title */}
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-gray-900 dark:text-white"
              >
                {name}
              </motion.h1>
              {title && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl bg-gradient-to-r from-blue-500 to-purple-500 
                           bg-clip-text text-transparent font-semibold"
                >
                  {title}
                </motion.p>
              )}
              {location && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-center gap-1 text-gray-500"
                >
                  <HiLocationMarker className="w-4 h-4" />
                  <span>{location}</span>
                </motion.div>
              )}
            </div>

            {/* Bio */}
            {bio && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="max-w-2xl text-gray-600 dark:text-gray-300 leading-relaxed"
              >
                {bio}
              </motion.p>
            )}

            {/* Social Links */}
            {links.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-3 pt-4"
              >
                {links.map((link, index) => (
                  link?.url && link?.name && (
                    <motion.a
                      key={index}
                      whileHover={{ y: -2, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={getFormattedUrl(link)}
                      target={link.name.toLowerCase() === 'mail' ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl
                               bg-white/20 backdrop-blur-sm border border-white/20
                               hover:bg-white/30 hover:border-blue-300/30
                               dark:bg-gray-800/30 dark:border-gray-700/30
                               dark:hover:border-blue-500/30
                               text-gray-700 dark:text-gray-300
                               transform transition-all duration-200 shadow-sm"
                    >
                      {getSocialIcon(link.name)}
                      <span className="text-sm font-medium">{link.name}</span>
                    </motion.a>
                  )
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Bottom Gradient Line */}
        <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-3xl" />
      </motion.div>
    </CardContainer>
  );
};

export default ProfileCard;
