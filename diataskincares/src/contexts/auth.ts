// import React, { ReactNode, useContext, useEffect, useState } from "react";
// import { 
//     createUserWithEmailAndPassword,
//     GoogleAuthProvider,
//     FacebookAuthProvider,
//     onAuthStateChanged,
//     sendPasswordResetEmail,
//     signInWithEmailAndPassword,
//     signInWithPopup,
//     signOut,
//     updateEmail,
//     updatePassword,
//     updateProfile,
//     UserCredential,
//     Auth,
//     User,
   
// } from "firebase/auth";

// import { auth } from "../firebase/firebase"; 


// interface AuthContextProps {
//     user: User  | null | undefined;
//     loading: boolean;
//     userName: string;
//     signup: (email: string, password: string) => Promise<UserCredential>;
//     login: (email: string, password: string) => Promise<UserCredential>;
//     logout: () => Promise<void>;
//     resetPassword: (email:string) => Promise<void>;
//     goggleSignIn: () => Promise<UserCredential>;
//     facebookSiginIn: () => Promise<UserCredential>;
//     updateName: (displayName: string) => Promise<void>;
//     updateMail: (newmail: string) => Promise<void>;
//     updatePass: (password: string) => Promise<void>;
//     setUserName: (name: string) => void;
// }


// const AuthContext = React.createContext<AuthContextProps | undefined>(undefined);

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (context === undefined) {
//         throw new Error('useAuth must be used within an AuthProvider'); 
//     }
//     return context;
// };

// interface AuthProviderProps {
//     children: ReactNode;
// }

//  export const AuthProvider = ({ children }: AuthProviderProps) => {
//     const [ user, setUser ] = useState<User | null | undefined>(null);
//     const [ loading, setLoading ] = useState(true);
//     const [ userName, setUserName ] = useState<string>('');

//     const signup = (email: string, password: string) => {
//         return createUserWithEmailAndPassword(auth, email, password);
//     };
//     const login =  (email: string, password: string) => {
//         return signInWithEmailAndPassword(auth, email, password);
//     };
//     const  logout = () => {
//         return signOut(auth); 
//     };

//     const resetPassword = (email: string) =>  {
//         return sendPasswordResetEmail(auth, email);
//     };

//     const goggleSignIn = () => {
//         const goggleAuthProvider = new GoogleAuthProvider();
//         return signInWithPopup(auth, goggleAuthProvider);
//     }

//     const facebookSiginIn = () => {
//         const facebookAuthProvider = new FacebookAuthProvider();
//         return signInWithPopup(auth, facebookAuthProvider)
//     }

//     const updateName = (displayName: string) => {
//         return updateProfile(auth.currentUser as User, { displayName });
//     };

//     const updateMail = (newmail: string) => {
//         return updateEmail(auth.currentUser as User, newmail);
//     };

//     const updatePass = (password: string) => {
//         return updatePassword(auth.currentUser as User, password);
//     };

//     useEffect(() => {
//         const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
//             setUser(currentUser);
//             setLoading(false) 
//         });


//         return () => {
//             unsubcribe();
//         };
//     }, []);

//     const values: AuthContextProps = {
//         user,
//         signup,
//         login,
//         logout,
//         resetPassword,
//         goggleSignIn,
//         facebookSiginIn,
//         updateName,
//         updateMail,
//         updatePass,
//         userName,
//         setUserName,
//         loading,
//     };

//     return (
//         <AuthContext.Provider value={values}>
//             {children}
//         </AuthContext.Provider>
//     ); 
    
//  }

//    export default AuthProvider;

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
    user: User | null | undefined;
    loading: boolean;
    userName: string;
    signup: (email: string, password: string) => Promise<UserCredential>;
    login: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    googleSignIn: () => Promise<UserCredential>;
    facebookSignIn: () => Promise<UserCredential>;
    updateName: (displayName: string) => Promise<void>;
    updateMail: (newMail: string) => Promise<void>;
    updatePass: (password: string) => Promise<void>;
    setUserName: (name: string) => void;
}

// Define AuthContext using createContext
export const AuthContext = React.createContext<AuthContextProps | undefined>(undefined);

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

const AuthProvider : React.FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>();
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState<string>('');

    const signup = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    const resetPassword = (email: string) => {
        return sendPasswordResetEmail(auth, email);
    };

    const googleSignIn = () => {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
    }

    const facebookSignIn = () => {
        const facebookAuthProvider = new FacebookAuthProvider();
        return signInWithPopup(auth, facebookAuthProvider)
    }

    const updateName = (displayName: string) => {
        return updateProfile(auth.currentUser as User, { displayName });
    };

    const updateMail = (newMail: string) => {
        return updateEmail(auth.currentUser as User, newMail);
    };

    const updatePass = (password: string) => {
        return updatePassword(auth.currentUser as User, password);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const values: AuthContextProps = {
        user,
        loading,
        userName,
        signup,
        login,
        logout,
        resetPassword,
        googleSignIn,
        facebookSignIn,
        updateName,
        updateMail,
        updatePass,
        setUserName,
    };

    // return (
    //     <auth.Provider value={values}>
    //         {children}
    //     </auth.Provider>
    // );
    return (
        
    )
};

export default AuthProvider;
