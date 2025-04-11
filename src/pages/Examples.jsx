import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { motion } from 'framer-motion';
import { HiArrowRight, HiSparkles, HiCodeBracket, HiBriefcase, HiWrenchScrewdriver, HiPencil } from 'react-icons/hi2';
import { useAuth } from '../contexts/AuthContext';

const Examples = () => {
  const { currentUser } = useAuth();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const PINNED_USERNAMES = ['deepakmodi', 'deepakmodi1']; // Usernames to pin

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get all usernames first
        const usernamesSnapshot = await getDocs(collection(db, 'usernames'));
        const usernames = usernamesSnapshot.docs.map(doc => ({
          username: doc.id,
          uid: doc.data().uid
        }));

        // Fetch portfolio data for each user
        const portfolioData = await Promise.all(
          usernames.map(async ({ username, uid }) => {
            const portfolioDoc = await getDocs(collection(db, 'portfolios'));
            const portfolio = portfolioDoc.docs.find(doc => doc.id === uid);
            
            if (portfolio) {
              return {
                username,
                isPinned: PINNED_USERNAMES.includes(username.toLowerCase()),
                ...portfolio.data()
              };
            }
            return null;
          })
        );

        // Sort portfolios: pinned first, then by update date
        const validPortfolios = portfolioData
          .filter(portfolio => portfolio !== null)
          .sort((a, b) => {
            // First sort by pinned status
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            // Then sort by update date
            return b.updatedAt?.localeCompare(a.updatedAt);
          });

        setPortfolios(validPortfolios);
      } catch (err) {
        console.error('Error fetching portfolios:', err);
        setError('Failed to load portfolios');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-900">
        <div className="space-y-4 text-center backdrop-blur-xl bg-white/5 p-8 rounded-2xl border border-white/10">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400">Discovering amazing portfolios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-gray-900">
        <div className="text-center space-y-4 p-8 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20">
          <h2 className="text-2xl font-bold text-white">Something went wrong</h2>
          <p className="text-gray-400">{error}</p>
          <button onClick={() => window.location.reload()} 
                  className="px-4 py-2 bg-white/5 rounded-xl text-blue-400 hover:bg-white/10 transition-all">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const renderCTAButton = () => (
    <Link
      to={currentUser ? "/edit-profile" : "/signup"}
      className="inline-flex items-center px-8 py-4 rounded-xl
                bg-gradient-to-r from-blue-600 to-purple-600 
                text-white font-medium group
                hover:shadow-lg hover:shadow-blue-500/25 
                transition-all duration-300"
    >
      {currentUser ? (
        <>
          Create Your's From Here
          <HiPencil className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </>
      ) : (
        <>
          Create Your Portfolio
          <HiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </>
      )}
    </Link>
  );

  const PortfolioCard = ({ portfolio }) => (
    <motion.div
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link to={`/${portfolio.username}`}>
        <div className={`relative overflow-hidden rounded-2xl backdrop-blur-xl 
                      bg-white/5 border border-white/10 p-6 
                      hover:bg-white/10 transition-all duration-300
                      hover:shadow-xl hover:shadow-blue-500/5
                      ${portfolio.isPinned ? 'ring-2 ring-purple-500/50' : ''}`}
        >
          {/* Pinned Badge */}
          {portfolio.isPinned && (
            <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-purple-500/20 border border-purple-500/30">
              <span className="text-xs font-medium text-purple-300">Featured</span>
            </div>
          )}

          {/* Profile Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <img
                src={portfolio.profile?.avatar || '/default-avatar.png'}
                alt={portfolio.profile?.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white/10"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900"></div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white group-hover:text-transparent 
                         group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 
                         group-hover:bg-clip-text transition-all duration-300">
                {portfolio.profile?.name || 'Anonymous'}
              </h3>
              <p className="text-blue-400">
                {portfolio.profile?.title || 'Developer'}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: HiCodeBracket, label: 'Projects', value: portfolio.projects?.length || 0 },
              { icon: HiBriefcase, label: 'Experience', value: portfolio.experiences?.length || 0 },
              { icon: HiWrenchScrewdriver, label: 'Skills', value: portfolio.skills?.reduce((acc, curr) => acc + curr.items.length, 0) || 0 }
            ].map((stat, index) => (
              <div key={index} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <stat.icon className="w-5 h-5 text-gray-400 mb-2" />
                <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* View Button */}
          <div className="mt-6 flex justify-end">
            <span className="inline-flex items-center gap-2 text-blue-400 font-medium 
                         group-hover:translate-x-1 transition-transform">
              View Portfolio
              <HiArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-900">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute -top-1/4 -right-1/4 w-[50rem] h-[50rem] bg-blue-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-blob"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-[50rem] h-[50rem] bg-purple-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-blob animation-delay-2000"></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10"
            >
              <span className="text-sm text-gray-300 flex items-center gap-2">
                Discover Amazing Portfolios <HiSparkles className="text-yellow-500 animate-pulse" />
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Featured Portfolios
              </span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto px-4">
              Explore beautiful portfolios created by talented developers. Get inspired and create your own today.
            </p>
          </motion.div>
        </div>

        {portfolios.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-6 backdrop-blur-xl bg-white/5 max-w-md mx-auto p-8 rounded-2xl border border-white/10"
          >
            <div className="text-gray-400 space-y-4">
              <HiSparkles className="w-8 h-8 mx-auto text-yellow-500" />
              <p>No portfolios available yet. Be the first to create one!</p>
              {renderCTAButton()}
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {portfolios.map((portfolio) => (
              <PortfolioCard key={portfolio.username} portfolio={portfolio} />
            ))}
          </motion.div>
        )}

        {/* Updated CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          {renderCTAButton()}
        </motion.div>
      </div>
    </div>
  );
};

export default Examples;