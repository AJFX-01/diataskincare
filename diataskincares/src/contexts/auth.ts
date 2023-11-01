import React, { ReactNode, useContext, useEffect, useState } from "react";
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


interface AuthContextProps {
    user: User  | null | undefined;
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


const AuthContext = React.createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider'); 
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

 export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [ user, setUser ] = useState<User | null | undefined>(null);
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
        return updateProfile(auth.currentUser as User, { displayName });
    };

    const updateMail = (newmail: string) => {
        return updateEmail(auth.currentUser as User, newmail);
    };

    const updatePass = (password: string) => {
        return updatePassword(auth.currentUser as User, password);
    };

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false) 
        });


        return () => {
            unsubcribe();
        };
    }, []);

    const values: AuthContextProps = {
        user,
        signup,
        login,
        logout,
        resetPassword,
        goggleSignIn,
        facebookSiginIn,
        updateName,
        updateMail,
        updatePass,
        userName,
        setUserName,
        loading,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    ); 
    
 }

   export default AuthProvider; 