import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import toast from 'react-hot-toast';
import { HiUser, HiLockClosed, HiArrowLeft } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const navigate = useNavigate();
  const { login, resetPassword, signInWithGoogle, signInWithGithub } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // Check if input is an email
      const isEmail = identifier.includes('@');
      let loginEmail = '';

      if (isEmail) {
        // If it's an email, use it directly
        loginEmail = identifier;
      } else {
        // If it's a username, get the associated email
        const usernameDoc = await getDoc(doc(db, 'usernames', identifier.toLowerCase()));
        
        if (!usernameDoc.exists()) {
          throw new Error('Username not found');
        }

        const userDoc = await getDoc(doc(db, 'users', usernameDoc.data().uid));
        
        if (!userDoc.exists()) {
          throw new Error('User not found');
        }

        loginEmail = userDoc.data().email;
      }
      
      // Login with email and password
      await login(loginEmail, password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Invalid username/email or password');
    } finally {
      setLoading(false);
    }
  }

  const handleResetPassword = async () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    try {
      setResetLoading(true);
      await resetPassword(email);
      toast.success('Password reset email sent! Check your inbox.');
      setIsResetting(false);
    } catch (error) {
      console.error('Reset error:', error);
      toast.error(error.message || 'Failed to reset password');
    } finally {
      setResetLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const result = await signInWithGoogle();
      
      if (result && result.isNewUser) {
        navigate('/username-setup');
      } else {
        toast.success('Login successful!');
        navigate('/');
      }
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Failed to sign in with Google');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    setGithubLoading(true);
    try {
      const result = await signInWithGithub();
      
      if (result && result.isNewUser) {
        navigate('/username-setup');
      } else {
        toast.success('Login successful!');
        navigate('/');
      }
    } catch (error) {
      console.error('GitHub login error:', error);
      // Error is already handled by the auth context
      // We don't need to show a duplicate toast here
    } finally {
      setGithubLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-[50rem] h-[50rem] bg-blue-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-blob"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-[50rem] h-[50rem] bg-purple-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-[1px]"></div>
      </div>

      {/* Login Container */}
      <div className="max-w-md w-full mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-2">
            {isResetting ? 'Reset Password' : 'Welcome back'}
          </h2>
          <p className="text-gray-400 text-sm">
            {isResetting 
              ? 'Enter your email address and we\'ll send you instructions' 
              : 'Enter your credentials to access your portfolio'}
          </p>
        </div>

        {/* Login Form Card */}
        <div className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl border border-white/20 shadow-2xl shadow-black/40">
          {!isResetting ? (
            // Login Form
            <>
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Identifier Input */}
                <div>
                  <label className="text-sm font-medium text-gray-200 mb-1 block">
                    Email or Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-xl
                               bg-gray-800/50 text-white placeholder-gray-400
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               transition-all duration-200"
                      placeholder="Enter email or username"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="text-sm font-medium text-gray-200 mb-1 block">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiLockClosed className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-xl
                               bg-gray-800/50 text-white placeholder-gray-400
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               transition-all duration-200"
                      placeholder="Your password"
                    />
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsResetting(true)}
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl text-white font-medium
                         bg-gradient-to-r from-blue-600 to-purple-600
                         hover:from-blue-500 hover:to-purple-500
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         transform transition-all duration-200
                         hover:scale-[1.02] active:scale-[0.98]
                         disabled:opacity-50 disabled:cursor-not-allowed
                         shadow-lg shadow-blue-500/25"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900/30 backdrop-blur-xl text-gray-400">or continue with</span>
                </div>
              </div>

              {/* Social Auth Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
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
                  onClick={handleGithubSignIn}
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
            </>
          ) : (
            // Reset Password Form
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-200 mb-1 block">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-xl
                             bg-gray-800/50 text-white placeholder-gray-400
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition-all duration-200"
                    placeholder="Your email address"
                  />
                </div>
              </div>

              {/* Reset Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsResetting(false)}
                  className="flex-1 py-3 px-4 rounded-xl border border-gray-700 text-gray-300
                           hover:bg-white/5 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <HiArrowLeft className="w-4 h-4" />
                  Back to Login
                </button>
                <button
                  onClick={handleResetPassword}
                  disabled={resetLoading}
                  className="flex-1 py-3 px-4 rounded-xl text-white font-medium
                           bg-gradient-to-r from-blue-600 to-purple-600
                           hover:from-blue-500 hover:to-purple-500
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           transition-all duration-200 disabled:opacity-50"
                >
                  {resetLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Signup Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              Create one now
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

export default Login;
