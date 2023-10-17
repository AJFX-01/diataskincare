import React, { useContext, useEffect, useState } from "react";
import { 
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateEmail,
    updatePassword,
    updateProfile,
    UserCredential,
    Auth,
    User,
} from "firebase/auth";


type AuthProviderPRops = {
    user: User  | null;
    loading: boolean;
    userName: string;
    signup: (email: string, password: string) => Promise<UserCredential>;
    login: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
    resetPassword: (email:string) => Promise<void>;
    goggleSignIn: () => Promise<UserCredential>;
    facebookSiginIn: () => Promise<UserCredential>;
    updateName: (displayName: string) => Promise<void>;
    updateMail: (newmail: string) => Promise<void>;
    updatePass: (password: string) => Promise<void>;
    setUserName: (name: string) => void;
}