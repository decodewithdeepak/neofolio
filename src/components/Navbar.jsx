import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiSparkles } from 'react-icons/hi2';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-[100]"
    >
      {/* Glass Effect Background - Matched with site theme */}
      <div className="absolute inset-0 backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 
                    border-b border-white/20 dark:border-gray-700/20" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link to="/">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-2"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
                             bg-clip-text text-transparent">
                Neofolio
              </span>
            </motion.div>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-2 sm:gap-4">
            <Link 
              to="/login" 
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 
                       dark:hover:text-blue-400 transition-colors px-2 sm:px-3 py-2 text-sm"
            >
              Login
            </Link>
            
            <Link 
              to="/signup"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 
                       text-white font-medium hover:shadow-lg hover:shadow-blue-500/25 
                       transition-all duration-300 text-sm"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 
                           transition-colors">
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" 
                   fill="none" 
                   viewBox="0 0 24 24" 
                   stroke="currentColor">
                <path strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
