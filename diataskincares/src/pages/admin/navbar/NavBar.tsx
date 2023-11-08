import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../contexts/auth";
import styles from "./navbar.module.scss";

const Navbar = () => {
    const { user } = useAuth();

    return (
        <div className={styles.navbar}>
            <div className={styles.user}>
                <FaUserCircle size={40} color="#fff" />
                <h4 style={{ marginTop: '1rem'}}></h4>
            </div>
        </div>
    )
}

