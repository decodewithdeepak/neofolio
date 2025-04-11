import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail, 
  onAuthStateChanged,
  signInWithPopup,
  GithubAuthProvider  // Add this import
} from 'firebase/auth';
import { auth, googleProvider, githubProvider, db } from '../config/firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast'; // Import toast for error handling

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [needsUsername, setNeedsUsername] = useState(false);
  const [tempUserData, setTempUserData] = useState(null);
  
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    setNeedsUsername(false);
    setTempUserData(null);
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  async function signInWithGoogle() {
    return handleSocialSignIn(googleProvider);
  }

  async function signInWithGithub() {
    try {
      // GitHub specific implementation for better error handling
      const result = await signInWithPopup(auth, githubProvider);
      
      // This gives you a GitHub Access Token
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      
      // Check if user exists in firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      // If new user, we need to collect a username
      if (!userDoc.exists()) {
        setNeedsUsername(true);
        setTempUserData({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          provider: 'github'  // Add provider info
        });
        return { isNewUser: true, user: result.user };
      }
      
      return { isNewUser: false, user: result.user };
    } catch (error) {
      console.error("GitHub auth error:", error);
      
      // Handle specific GitHub errors
      if (error.code === 'auth/account-exists-with-different-credential') {
        const email = error.customData?.email;
        toast.error(`An account already exists with the email ${email}. Try another sign-in method.`);
      } else if (error.code === 'auth/popup-closed-by-user') {
        toast.error('Sign-in was cancelled by closing the popup.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        // This is often a benign error that doesn't need user notification
        console.log('Popup request was cancelled.');
      } else if (error.code === 'auth/popup-blocked') {
        toast.error('Sign-in popup was blocked by your browser. Please allow popups for this site.');
      } else {
        toast.error('Failed to sign in with GitHub. Please try again later.');
      }
      
      throw error;
    }
  }

  // Generic social sign-in handler
  async function handleSocialSignIn(provider) {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Check if user exists in firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      // If new user, we need to collect a username
      if (!userDoc.exists()) {
        setNeedsUsername(true);
        setTempUserData({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          provider: 'google'  // Add provider info
        });
        return { isNewUser: true, user: result.user };
      }
      
      return { isNewUser: false, user: result.user };
    } catch (error) {
      // Handle specific errors like account exists with different credential
      if (error.code === 'auth/account-exists-with-different-credential') {
        toast.error('An account with this email already exists using a different sign-in method.');
      }
      throw error;
    }
  }

  async function completeGoogleSignUp(username) {
    return completeSocialSignUp(username);
  }

  async function completeGithubSignUp(username) {
    return completeSocialSignUp(username);
  }

  // Generic function to complete social sign-up
  async function completeSocialSignUp(username) {
    if (!tempUserData) return;
    
    try {
      // Store user data in Firestore
      await setDoc(doc(db, 'users', tempUserData.uid), {
        email: tempUserData.email,
        username: username,
        displayName: tempUserData.displayName || '',
        photoURL: tempUserData.photoURL || '',
        createdAt: serverTimestamp(),
        bio: ''
      });
      
      // Reserve username
      await setDoc(doc(db, 'usernames', username), {
        uid: tempUserData.uid,
        createdAt: serverTimestamp()
      });
      
      // Reset states
      setNeedsUsername(false);
      setTempUserData(null);
      
      return true;
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      // If user is logged in, check if they need username setup
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (!userDoc.exists()) {
          setNeedsUsername(true);
          setTempUserData({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || '',
            photoURL: user.photoURL || ''
          });
        } else {
          setNeedsUsername(false);
          setTempUserData(null);
        }
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    needsUsername,
    setNeedsUsername,
    tempUserData,
    signup,
    login,
    logout,
    resetPassword,
    signInWithGoogle,
    signInWithGithub,
    completeGoogleSignUp,
    completeGithubSignUp,
    completeSocialSignUp
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
