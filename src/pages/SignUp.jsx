import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { HiSparkles, HiUser, HiEnvelope, HiLockClosed } from 'react-icons/hi2';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import toast from 'react-hot-toast';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [checkingUsername, setCheckingUsername] = useState(false);
  const navigate = useNavigate();
  const { signup, signInWithGoogle, signInWithGithub } = useAuth();

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

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    if (!username || usernameError) {
      return setError('Please choose a valid username');
    }

    try {
      setError('');
      setLoading(true);
      const userCredential = await signup(email, password);
      
      // Store user data in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        username,
        createdAt: new Date().toISOString(),
        displayName: '',
        photoURL: '',
        bio: ''
      });

      // Reserve username
      await setDoc(doc(db, 'usernames', username), {
        uid: userCredential.user.uid,
        createdAt: new Date().toISOString()
      });

      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      setError('Failed to create an account. ' + error.message);
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    try {
      const result = await signInWithGoogle();
      
      if (result && result.isNewUser) {
        // If it's a new user, they need to set username
        navigate('/username-setup');
      } else {
        // If it's an existing user, take them to the dashboard
        toast.success('Welcome back!');
        navigate('/');
      }
    } catch (error) {
      console.error('Google signup error:', error);
      toast.error('Failed to sign up with Google');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGithubSignUp = async () => {
    setGithubLoading(true);
    try {
      const result = await signInWithGithub();
      
      if (result && result.isNewUser) {
        // If it's a new user, they need to set username
        navigate('/username-setup');
      } else {
        // If it's an existing user, take them to the dashboard
        toast.success('Welcome back!');
        navigate('/');
      }
    } catch (error) {
      console.error('GitHub signup error:', error);
      // Error is already handled by the auth context
      // We don't need to show a duplicate toast here
    } finally {
      setGithubLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-[50rem] h-[50rem] bg-blue-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-blob"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-[50rem] h-[50rem] bg-purple-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-[1px]"></div>
      </div>

      {/* Sign Up Container */}
      <div className="max-w-md w-full mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-2">
            Create Account
          </h2>
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
            Join the Neofolio community 
            <HiSparkles className="text-yellow-500 animate-pulse" />
          </p>
        </div>

        {/* Sign Up Form Card */}
        <div className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl border border-white/20 shadow-2xl shadow-black/40">
          {/* Social Sign Up Buttons */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={googleLoading}
              className="flex items-center justify-center gap-2 py-3 px-4
                       border border-gray-700 rounded-xl bg-white/5 text-white font-medium
                       hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500
                       transition-all duration-200 disabled:opacity-50"
            >
              {googleLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <FcGoogle size={20} />
                  Google
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleGithubSignUp}
              disabled={githubLoading}
              className="flex items-center justify-center gap-2 py-3 px-4
                       border border-gray-700 rounded-xl bg-white/5 text-white font-medium
                       hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500
                       transition-all duration-200 disabled:opacity-50"
            >
              {githubLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <FaGithub size={20} className="text-white" />
                  GitHub
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900/30 backdrop-blur-xl text-gray-400">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-200 mb-1 block">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl
                           text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-200 mb-1 block">Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl
                           text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Username Field with Warning */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-200">Username</label>
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

            {/* Email Field */}
            <div>
              <label className="text-sm font-medium text-gray-200 mb-1 block">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-700 rounded-xl
                           text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Fields */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-200 mb-1 block">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiLockClosed className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-700 rounded-xl
                             text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 
                             focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-200 mb-1 block">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiLockClosed className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full pl-10 pr-3 py-3 bg-gray-800/50 border border-gray-700 rounded-xl
                             text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 
                             focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
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
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </motion.button>
          </form>

          {/* Login Link */}
          <p className="mt-8 text-center text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
              Sign in
            </Link>
          </p>
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

export default SignUp;
