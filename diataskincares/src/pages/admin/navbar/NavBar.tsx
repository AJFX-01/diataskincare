import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../contexts/auth";
import styles from "./navbar.module.scss";

interface ActiveLinkProps {
    isActive: boolean;
  }
  
const activeLink = ({ isActive }:  ActiveLinkProps) => (isActive ? `${styles.active}` : "");

const Navbar = () => {
    const { user } = useAuth();

    return (
        <div className={styles.navbar}>
            <div className={styles.user}>
                <FaUserCircle size={40} color="#fff" />
                <h4 style={{ marginTop: '1rem'}}></h4>
                <b>(ADMIN)</b>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/admin/home" className={activeLink}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/all-products" className={activeLink}>
                            View Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/add-product/ADD" className={activeLink}>
                            Add Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/orders" className={activeLink}>
                            Orders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/users" className={activeLink}>
                            Users
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;

