import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { HiUser, HiSparkles } from 'react-icons/hi2';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const UsernameSetup = () => {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [loading, setLoading] = useState(false);
  const { completeSocialSignUp, tempUserData, needsUsername, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If no user or user doesn't need a username setup, redirect to home
    if (!currentUser) {
      navigate('/login');
    } else if (currentUser && !needsUsername) {
      navigate('/');
    }
  }, [currentUser, needsUsername, navigate]);

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9_]{3,20}$/;
    return regex.test(username);
  };

  const checkUsernameAvailability = async (username) => {
    if (!validateUsername(username)) {
      return false;
    }
    const userDoc = doc(db, 'usernames', username.toLowerCase());
    const docSnap = await getDoc(userDoc);
    return !docSnap.exists();
  };

  const handleUsernameChange = async (e) => {
    const newUsername = e.target.value.toLowerCase();
    setUsername(newUsername);
    
    if (newUsername.length < 3) {
      setUsernameError('Username must be at least 3 characters');
      return;
    }

    if (!validateUsername(newUsername)) {
      setUsernameError('Username can only contain letters, numbers, and underscores');
      return;
    }

    setCheckingUsername(true);
    try {
      const isAvailable = await checkUsernameAvailability(newUsername);
      setUsernameError(isAvailable ? '' : 'Username is already taken');
    } catch (err) {
      setUsernameError('Error checking username');
    }
    setCheckingUsername(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || usernameError) {
      toast.error('Please choose a valid username');
      return;
    }

    try {
      setLoading(true);
      await completeSocialSignUp(username);
      toast.success('Account setup complete!');
      navigate('/');
    } catch (error) {
      console.error('Username setup error:', error);
      toast.error('Failed to complete account setup');
    } finally {
      setLoading(false);
    }
  };

  // If no user or temp data, show loading or empty state
  if (!tempUserData && needsUsername) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading user data...</p>
        </div>
      </div>
    );
  }

  // Determine where the user signed up from
  const authProvider = tempUserData?.provider || 'Social account';

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-[50rem] h-[50rem] bg-blue-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-blob"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-[50rem] h-[50rem] bg-purple-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-[1px]"></div>
      </div>

      <div className="max-w-md w-full mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-2">
            One Last Step!
          </h2>
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
            Choose your unique username
            <HiSparkles className="text-yellow-500 animate-pulse" />
          </p>
        </div>

        {/* Username Setup Card */}
        <div className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl border border-white/20 shadow-2xl shadow-black/40">
          {tempUserData && (
            <div className="flex items-center mb-6 bg-white/5 p-4 rounded-xl">
              {tempUserData.photoURL && (
                <img 
                  src={tempUserData.photoURL} 
                  alt="Profile" 
                  className="w-12 h-12 rounded-full mr-4"
                />
              )}
              <div>
                <p className="text-white font-medium">{tempUserData.displayName || 'Welcome!'}</p>
                <p className="text-sm text-gray-400">{tempUserData.email}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field with Warning */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-200">Choose a Username</label>
                <span className="text-xs text-amber-400 flex items-center gap-1">
                  <HiSparkles className="w-3 h-3" />
                  Cannot be changed later
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={handleUsernameChange}
                  className={`w-full pl-10 pr-3 py-3 bg-gray-800/50 border ${
                    usernameError ? 'border-red-500' : 'border-gray-700'
                  } rounded-xl text-white placeholder-gray-400 focus:ring-2 
                  focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                  autoFocus
                />
              </div>
              {usernameError && (
                <p className="mt-1 text-sm text-red-400">{usernameError}</p>
              )}
              {checkingUsername && (
                <p className="mt-1 text-sm text-yellow-400">Checking availability...</p>
              )}
              <p className="mt-1.5 text-xs text-gray-400">
                This will be your unique identifier: neofolio.com/{username || 'username'}
              </p>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || !username || usernameError}
              className="w-full py-3 px-4 rounded-xl text-white font-medium
                       bg-gradient-to-r from-blue-600 to-purple-600
                       hover:from-blue-500 hover:to-purple-500
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                       transform transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-lg shadow-blue-500/25"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Finalizing Setup...
                </div>
              ) : (
                'Complete Setup'
              )}
            </motion.button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Built with{' '}
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            ♥️
          </span>
          {' '}by Deepak Modi
        </p>
      </div>
    </div>
  );
};

export default UsernameSetup;
