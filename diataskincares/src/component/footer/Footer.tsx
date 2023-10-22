import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosHome, RiContactsBookUploadFill, RiLuggageCartFill, TiShoppingCart, HiSaveAs, IoNotifications, BiLogOut, FaUserMinus, BiLogIn, HiUserAdd } from 'react-icons/all';
import { useAuth } from '../../contexts/auth';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/slice/authSlice';
import { useNavigate } from 'react-router-dom';
import styles from './footer.module.scss';

const Footer: React.FC = () => {
    const date = new Date();
    const year = date.getFullYear();

    const { user, logout } = useAuth();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const navigate = useNavigate();

    const logoutUser =async () => {
        await logout();
        navigate("/");
    };

    return (
        <div className={styles.footer}>
            <ul className='container'>
                <span></span>
            </ul>
        </div>
    )
}