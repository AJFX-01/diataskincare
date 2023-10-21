import React, { useEffect, useState } from "react"
import { NavLink, useNavigate,  Link } from "react-router-dom"
import { VscEyeClosed } from "react-icons/vsc";
import { FaUserCircle, FaRegEnvelope, FaUserTimes } from "react-icons/fa";
import { RiMenuAddLine, RiShoppingCartLine, } from "react-icons/ri";
import styles from "./header.module.scss";
import { useAuth } from "../../contexts/auth";
import { auth } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { ShowOnLogin, ShowOnLogout } from "../hiddenLinks/HiddenIiNK";
import { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyLink";
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity,
  selectSavedItems,
} from "../../redux/slice/cartSlice";


const logo = (
  <div className={styles.logo}>
    <Link to='/'>
      <h3>
        Shop<span>Land</span>
      </h3>
    </Link>
  </div>
);

const activeLink = (isActive: boolean ) => isActive ? `${styles.active}` : "";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPage, setScrollPage] = useState(false);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {logout, user } = useAuth();
  const cartTotalQty = useSelector(selectCartTotalQuantity);
  const saved = useSelector(selectSavedItems);

  const cart = (
    <span className={styles.cart}>
      <Link to="/cart">
        <RiShoppingCartLine size={20} className={styles["cart-icon"]}/>
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
    const unsubscribe = onAuthStateChanged(auth, (user => {
      if (user) {
        if (user) {
          if (user.displayName === null ) {
            const u1 = user.email?.substring(0, user.email?.indexOf("@"));
            const uName = u1?.charAt(0).toUpperCase() + u1?.slice(1);
            setDisplayName(uName);
          } else {
            setDisplayName(user.displayName);
          };
          dispatch(SET_ACTIVE_USER({
            email: user.email,
            userID: user.uid,
            userName: user.displayName || displayName,

          }))
        }
      }
    }))
  })

} 
 