import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [usernameValid, setUsernameValid] = useState(true);
  const navigate = useNavigate();

  const [usernameStatus, setUsernameStatus] = useState({
    checking: false,
    available: false,
    message: ''
  });

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9_]{3,20}$/;
    return regex.test(username);
  };

  const handleUsernameChange = (e) => {
    const username = e.target.value.toLowerCase().trim();
    setFormData(prev => ({ ...prev, username }));
    
    if (username.length < 3) {
      setUsernameStatus({
        checking: false,
        available: false,
        message: 'Username must be at least 3 characters'
      });
    }
  };

  useEffect(() => {
    const checkUsername = async () => {
      if (formData.username.length < 3) return;
      
      setUsernameStatus(prev => ({ ...prev, checking: true }));
      try {
        const isAvailable = await checkUsernameAvailability(formData.username);
        setUsernameStatus({
          checking: false,
          available: isAvailable,
          message: isAvailable ? '✓ Username is available' : '✗ Username is taken'
        });
      } catch (err) {
        setUsernameStatus({
          checking: false,
          available: false,
          message: err.message
        });
      }
    };

    const timeoutId = setTimeout(checkUsername, 500);
    return () => clearTimeout(timeoutId);
  }, [formData.username]);

  const checkUsernameAvailability = async (username) => {
    if (!validateUsername(username)) {
      throw new Error('Username must be 3-20 characters long and can only contain letters, numbers, and underscores');
    }
    const userDoc = doc(db, 'usernames', username.toLowerCase());
    const docSnap = await getDoc(userDoc);
    return !docSnap.exists();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usernameValid) {
      setError('Please fix the username validation errors first');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const username = formData.username.toLowerCase();
      console.log('Checking username availability:', username); // Debug log

      const isUsernameAvailable = await checkUsernameAvailability(username);
      console.log('Username available:', isUsernameAvailable); // Debug log
      
      if (!isUsernameAvailable) {
        throw new Error('Username is already taken');
      }

      console.log('Creating user account...'); // Debug log
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log('User created:', userCredential.user.uid); // Debug log

      // Save user data
      const userDocRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userDocRef, {
        email: formData.email,
        username: username,
        createdAt: new Date().toISOString(),
        displayName: '',
        photoURL: '',
        bio: ''
      });
      console.log('User document created'); // Debug log

      // Save username
      const usernameDocRef = doc(db, 'usernames', username);
      await setDoc(usernameDocRef, {
        uid: userCredential.user.uid,
        createdAt: new Date().toISOString()
      });
      console.log('Username document created'); // Debug log

      navigate(`/${username}`); // Navigate to user's profile
    } catch (err) {
      console.error('Signup error:', err); // Debug log
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Username field - placed first */}
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Choose Username *
          </label>
          <div className="relative">
            <input
              type="text"
              id="username"
              required
              className={`block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-offset-2
                ${usernameStatus.checking ? 'border-yellow-500 focus:ring-yellow-500' : 
                  usernameStatus.available && formData.username ? 'border-green-500 focus:ring-green-500' : 
                  'border-gray-300 focus:ring-blue-500'}`}
              value={formData.username}
              onChange={handleUsernameChange}
              placeholder="e.g., johndoe123"
            />
            {formData.username && (
              <p className={`mt-1 text-sm ${
                usernameStatus.checking ? 'text-yellow-600' :
                usernameStatus.available ? 'text-green-600' : 'text-red-600'
              }`}>
                {usernameStatus.checking ? 'Checking availability...' : usernameStatus.message}
              </p>
            )}
          </div>
        </div>

        {/* Email field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email *
          </label>
          <input
            type="email"
            id="email"
            required
            className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="your@email.com"
          />
        </div>

        {/* Password field */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password *
          </label>
          <input
            type="password"
            id="password"
            required
            className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Create a secure password"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !usernameStatus.available || !formData.username}
          className={`w-full py-3 px-4 rounded-md text-white font-medium
            ${loading || !usernameStatus.available || !formData.username
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
