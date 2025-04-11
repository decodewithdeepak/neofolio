import React, { useEffect } from 'react';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import UserMenu from './components/UserMenu';
import Footer from './components/Footer';
import Logo from './components/Logo';
import { motion } from 'framer-motion';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, needsUsername } = useAuth();

  // Handle redirection for username setup screen
  useEffect(() => {
    if (currentUser && needsUsername && location.pathname !== '/username-setup') {
      navigate('/username-setup');
    }
  }, [currentUser, needsUsername, navigate, location.pathname]);

  // Determine if current page is an auth page
  const isAuthPage = ['/login', '/signup', '/username-setup'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      {/* Navbar - Now always visible but with conditional styling */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className={`backdrop-blur-xl ${isAuthPage ? 'bg-gray-900/40' : 'bg-gray-900/60'} border-b border-white/10`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link to="/" className="flex-shrink-0">
                <Logo />
              </Link>

              {/* Auth Buttons - Only show on non-auth pages or conditionally style on auth pages */}
              <div className="flex items-center gap-2 sm:gap-4">
                {currentUser ? (
                  <UserMenu />
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className={`text-gray-300 hover:text-white transition-colors px-3 py-2 text-sm
                                ${location.pathname === '/login' ? 'text-blue-400' : ''}`}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup"
                      className={`px-4 py-2 rounded-xl ${location.pathname === '/signup' 
                        ? 'bg-white/10 text-white' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600'} 
                        text-white text-sm font-medium 
                        hover:shadow-lg hover:shadow-blue-500/25 
                        transition-all duration-300`}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Active Page Indicator */}
          <motion.div 
            className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </nav>

      {/* Main content - Always padded for the navbar */}
      <main className="pt-16" style={{ flexGrow: 1 }}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default App;
