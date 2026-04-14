"use client";

import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, 
    GithubAuthProvider, GoogleAuthProvider, FacebookAuthProvider, 
    signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "../utils/firebase";

const AuthContext = createContext(); 

export const AuthContextProvider = ({children}) => {
    
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);

    const gitHubSignIn = () => {
        const provider = new GithubAuthProvider(); 
        return signInWithPopup(auth, provider);
    };
    const facebookSignIn = () => {
        const provider = new FacebookAuthProvider(); 
        return signInWithPopup(auth, provider);
    };
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider(); 
        return signInWithPopup(auth, provider);
    };

    const emailSignIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const emailSignUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const firebaseSignOut = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); 
            setLoading(false);
            
        }, (error) => {
            console.error("Authorization error", error);
            setUser(null);
            setLoading(false);
        });
        return() => unsubscribe();  
    }, [] );

    return (
        <AuthContext.Provider value = {{ user, loading, gitHubSignIn, facebookSignIn, googleSignIn, emailSignIn, emailSignUp, firebaseSignOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useUserAuth = () => {
    const context = useContext(AuthContext);
    if(context === undefined) {
        throw new Error("Context Error: useUserAuth must be within the Auth provider")
    }
    return context;
};

