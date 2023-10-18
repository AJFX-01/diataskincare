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
import { auth } from "../firebase/firebase";

type AuthContextProps = {
    children: React.ReactNode;
}

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


const AuthContext = React.createContext<AuthContextProps  |  undefined>(undefined);

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider'); 
    }
    return context;
};

const AuthProvider: React.FC<AuthProviderPRops> = ({ children }) => {
    const [ user, setUser ] = useState<User | null>(null);
    const [ loading, setLoading ] = useState(true);
    const [ userName, setUserName ] = useState<string>('');

    const signup = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const login =  (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };
    const  logout = () => {
        return signOut(auth); 
    };

    const resetPassword = (email: string) =>  {
        return sendPasswordResetEmail(auth, email);
    };

    const goggleSignIn = () => {
        const goggleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, goggleAuthProvider);
    }

    const facebookSiginIn = () => {
        const facebookAuthProvider = new FacebookAuthProvider();
        return signInWithPopup(auth, facebookAuthProvider)
    }

    const updateName = (displayName: string) => {
        return updateProfile(auth.currentUser, { displayName });
    };
}