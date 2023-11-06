import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUsers, STORE_USERS } from "../../../redux/slice/authSlice";
import useFetchCollection from "../../../hooks/useFetchCollection";
import { doc, deleteDoc } from "firebase/firestore";
import { database } from "../../../firebase/firebase";
import { FaTrashAlt } from "react-icons/fa";
import styles from "./users.module.scss";
import Loader from "../../../component/loader/loader";
import Notiflix from "notiflix";
import { toast } from "react-toastify";


const User: React.FC = () => {

    const {data, loading} = useFetchCollection("Users");
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);

    useEffect(() => {
        if(data) {
            dispatch(STORE_USERS(data));
        }
    }, [dispatch, data]);


    const deleteUserFromDatabase = async (id: string) => {
        try {
            await deleteDoc(doc(database, "Users", id));
            toast.success("User deleted successfully");
        } catch (error : any) {
            toast.error(error.message)
        }
    }

    const confirmDelete = (id: string, username: string) => {
        Notiflix.Confirm.show(
            "Delete User",
            `Are you sure you want to delete ${username} from the users list?`,
            "DELETE",
            "CANCEL",
            function okCb() {
                deleteUserFromDatabase(id);
            },
            function cancelCb() {},
             {
                width: "320px",
                borderRadius: "5px",
                titleColor: "#c07d53",
                okButtonBackground: "#c07d53",
                cssAnimationStyle: "zoom"
            }
        );
    };

    if (loading) {
        return <Loader />;
    }

    if (users.length === 0) {
        return <p>You have no users at the moment</p>
    }

    return (
        <section>77</section>
    );
} 


export default User;