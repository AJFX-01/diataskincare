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
        <section className={styles.sec}>
            <div className={`container ${styles.order}`}>
                <h2>Users</h2>
                <br/>
                <>
                    <div className={styles.table}>
                        <table>
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Assigned ID</th>
                                    <th>Date Joined</th>
                                    <th>Email</th>
                                    <th>Username</th>
                                    <th>Delete User</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => {
                                    const { id, email, username, joinedAt } = user;
                                    return (
                                        <tr key={id}>
                                            <td>{index + 1}</td>
                                            <td>{id}</td>
                                            <td>{joinedAt.toDateString()}</td>
                                            
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
            </div>
        </section>
    );
} 


export default User;