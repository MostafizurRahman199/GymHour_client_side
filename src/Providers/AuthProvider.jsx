import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebase/firebase.init';

export const AuthContext = createContext(null);

export const useFirebaseAuth = () => {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Manage the user state
  const [loading, setLoading] = useState(true);  // Manage the loading state

  // Create user
  const createUser = (email, password) => {
    setLoading(true); // Ensure loading is true while user is being created
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const result = userCredential.user;
        console.log(result);
        setLoading(false);
        return result;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false)

        // Handle specific error cases
        switch (errorCode) {
          case 'auth/email-already-in-use':
            return 'This email is already in use.';
          case 'auth/invalid-email':
            return 'The email address is not valid.';
          case 'auth/weak-password':
            return 'The password is too weak.';
          default:
            return errorMessage; // Return the default error message
        }
      });
  }

  // Sign in user
  const signInUser = (email, password) => {
    setLoading(true); // Ensure loading is true while signing in
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        setLoading(false);
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false)
        return errorMessage;
      });
  }

const signOutUser = ()=>{
  setLoading(true);
  signOut(auth).then(() => {
    setLoading(false);
    return true;
  }).catch((error) => {
    setLoading(false);
    return error;
  });
}

  // Monitor authentication state with onAuthStateChanged
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        setUser(user);
        // console.log(user);
      } else {
        setUser(null); 
      }
      setLoading(false);
    });

    return () => unsubscribe();
    
  }, []);

  const firebaseInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signOutUser
  }

  return (
    <AuthContext.Provider value={firebaseInfo}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
