import { motion } from 'framer-motion';
import { RiHeart2Fill } from 'react-icons/ri';
import { HiSparkles } from 'react-icons/hi2';
import { MdBugReport } from 'react-icons/md';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const handleReportBug = () => {
    window.location.href = 'mailto:deepakmodidev@gmail.com?subject=Bug/Suggestion for neofolio.vercel.app';
  };

  return (
    <footer className="relative mt-auto">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="backdrop-blur-xl bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="flex flex-col items-center md:items-start">
                <span className="text-2xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Neo
                  </span>
                  <span className="text-white">Folio</span>
                </span>
                <span className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                  Crafted with magic 
                  <HiSparkles className="text-yellow-500 animate-pulse" />
                </span>
              </div>
            </motion.div>

            <div className="flex flex-col items-center md:items-end gap-6">
              <motion.button
                onClick={handleReportBug}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 bg-gray-800/50 
                         hover:bg-gray-700/50 rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MdBugReport size={20} />
                Report Bug
              </motion.button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-2 text-sm text-gray-500"
              >
                <RiHeart2Fill className="text-red-500 animate-pulse" />
                <span>
                  © {currentYear} Neofolio. All rights reserved.
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
