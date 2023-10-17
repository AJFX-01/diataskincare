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


import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from "./chart.module.scss";
import Card from "../card/Card";
import { selectOrderHistory } from "../../redux/slice/orderSlice";
import { useSelector } from "react-redux";
import {MdOutlineAddShoppingCart} from 'react-icons/md'
import {FcProcess, FcShipped} from 'react-icons/fc'
import {BsCartCheckFill} from 'react-icons/bs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};

export default function Chart() {
  const orders = useSelector(selectOrderHistory);

  //create a new array of the order status
  const ordersArray: string[] = [];
  orders.map((item) => {
    const { orderStatus } = item;
    ordersArray.push(orderStatus);
  });

  //get the count from the new array created because, as you know, the number varies, e.g., processing is 2, delivered is 2, etc...
  const getOrderStatusCount = (array: string[], value: string) => {
    return array.filter((n) => n === value).length;
  };

  const [q1, q2, q3, q4] = [
    "Order Placed...",
    "Processing...",
    "Shipped...",
    "Delivered",
  ];

  const placed = getOrderStatusCount(ordersArray, q1);
  const processing = getOrderStatusCount(ordersArray, q2);
  const shipped = getOrderStatusCount(ordersArray, q3);
  const delivered = getOrderStatusCount(ordersArray, q4);

  const data = {
    labels: ["Placed Orders", "Processing", "Shipped...", "Delivered"],
    datasets: [
      {
        label: "Order Count",
        data: [placed, processing, shipped, delivered],
        backgroundColor: "#c07d53",
      },
    ],
  };

  return (
    <div className={styles.chart}>
      <Card cardClass={styles.card}>
        <div className={styles.grid}>
          <p>
            <MdOutlineAddShoppingCart size={25} color={'goldenrod'} />
            <b> Placed: {placed}</b>
          </p>
          <p>
            <FcProcess size={25} />
            <b> Processing: {processing}</b>
          </p>

          <p>
            <FcShipped size={25} />
            <b> Shipped: {shipped}</b>
          </p>
          <p>
            <BsCartCheckFill size={25} color={'green'} />
            <b> Delivered: {delivered}</b>
          </p>
        </div>
        <h3>
          <b>Order status chart</b>
        </h3>
        <Bar options={options} data={data} />
      </Card>
    </div>
  );
}
