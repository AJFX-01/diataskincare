import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  RiMenuAddLine,
  RiShoppingCartLine,
  VscEyeClosed,
} from "react-icons/all";
import styles from "./header.module.scss";
import { useAuth } from "../../contexts/authContext";
import { auth } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import ShowOnLogin from "../hiddenLinks/ShowOnLogin";
import ShowOnLogout from "../hiddenLinks/ShowOnLogout";
import AdminOnlyLink from "../adminOnlyRoute/AdminOnlyLink";
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity,
  selectSavedItems,
} from "../../redux/slice/cartSlice";

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h3>
        Shop<span>Land</span>
      </h3>
    </Link>
  </div>
);

const activeLink = (isActive: boolean) =>
  isActive ? `${styles.active}` : "";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPage, setScrollPage] = useState(false);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout, user } = useAuth();
  const cartTotalQty = useSelector(selectCartTotalQuantity);
  const saved = useSelector(selectSavedItems);

  const cart = (
    <span className={styles.cart}>
      <Link to="/cart">
        <RiShoppingCartLine size={20} className={styles["cart-icon"]} />
        <p>{cartTotalQty}</p>
      </Link>
    </span>
  );

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch]);

  const fixNavbar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };
  window.addEventListener("scroll", fixNavbar);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName === null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userID: user.uid,
            userName: user.displayName || displayName,
          })
        );
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });

    return () => unsubscribe();
  }, [dispatch, displayName]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className={scrollPage ? `${styles.fixed}` : ""}>
      <div className={styles.header}>
        {logo}
        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-menu"]}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>
          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <VscEyeClosed size={22} color="#fff" />
            </li>
            <li>
              <AdminOnlyLink>
                <Link to="/admin/home">
                  <button className="--btn --btn-primary">Admin</button>
                </Link>
              </AdminOnlyLink>
            </li>
            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <ShowOnLogout>
                <NavLink to="/login" className={activeLink}>
                  Login
                </NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
                <a className={styles.welcome}>
                  <FaUserCircle size={16} />
                  &nbsp; Hi, {user?.displayName || displayName}
                </a>
              </ShowOnLogin>
              <ShowOnLogout className={styles.flex}>
                <NavLink to="/signup" className={activeLink}>
                  Sign Up
                </NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
                <NavLink to="/order-history" className={activeLink}>
                  My orders
                </NavLink>
              </ShowOnLogin>
              <NavLink to="/saved-products" className={activeLink}>
                Saved<span style={{ color: "#c07d53" }}>({saved.length})</span>
              </NavLink>
              <ShowOnLogin>
                <NavLink to="/" onClick={logoutUser}>
                  Log out
                </NavLink>
              </ShowOnLogin>
              <ShowOnLogin>
                <NavLink to="/notifications" className={activeLink}>
                  <FaRegEnvelope size={15} />
                </NavLink>
              </ShowOnLogin>
            </span>
            {cart}
            <ShowOnLogin>
              <Link to="/delete-account">
                <button className={styles.delete}>
                  <FaUserTimes size={20} />
                </button>
              </Link>
            </ShowOnLogin>
          </div>
        </nav>

        <div className={styles["menu-icon"]}>
          {cart}
          <RiMenuAddLine size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
}
///////



/////
import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
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
} from 'firebase/auth';

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContextProps = {
  user: User | null;
  loading: boolean;
  userName: string;
  signup: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  googleSignIn: () => Promise<UserCredential>;
  facebookSignIn: () => Promise<UserCredential>;
  updateName: (displayName: string) => Promise<void>;
  updateMail: (newmail: string) => Promise<void>;
  updatePass: (password: string) => Promise<void>;
  setUserName: (name: string) => void;
};

const AuthContext = React.createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
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
  };

  const facebookSignIn = () => {
    const facebookAuthProvider = new FacebookAuthProvider();
    return signInWithPopup(auth, facebookAuthProvider);
  };

  const updateName = (displayName: string) => {
    return updateProfile(auth.currentUser, { displayName });
  };

  const updateMail = (newmail: string) => {
    return updateEmail(auth.currentUser, newmail);
  };

  const updatePass = (password: string) => {
    return updatePassword(auth.currentUser, password);
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
    signup,
    login,
    logout,
    resetPassword,
    googleSignIn,
    facebookSignIn,
    updateName,
    updateMail,
    updatePass,
    userName,
    setUserName,
    loading,
  };

  return (
    <AuthContext.Provider value={values}>
      {!loading && children}
    </AuthContext.Provider>
  );
};


/////