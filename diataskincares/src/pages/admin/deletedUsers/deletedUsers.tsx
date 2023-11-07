import  React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_USERS, selectDeletedUsers } from "../../../redux/slice/authSlice";
import useFetchCollection from "../../../hooks/useFetchCollection";
import styles from "./deletedUsers.module.scss";
import Loader from "../../../component/loader/loader";

const Users = () => {
    const {data, loading} = useFetchCollection("Deleted-Users");
    const dispatch = useDispatch();
    const deletedUsers = useSelector(selectDeletedUsers);


    useEffect(() => {
        dispatch(DELETE_USERS(data));
    }, [dispatch, data]);

    return (
        <section className={styles.sec}>
            <div className={`container ${styles.order}`}>
                {loading && <h2>Deleted Users</h2>}
                <br/>
                <>
                    {loading && <Loader />}
                    <div className={styles.table}>
                       { deletedUsers.length === 0 ? (
                        <p>You have no deleted users at the moments</p>
                       ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Assignede iD</th>
                                    <th>Date Deleted</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deletedUsers.map((user, index) => {
                                    const {id, email, deletedAt } = user;

                                    return(
                                        <tr key={id}>
                                            <td>{ index + 1}</td>
                                            <td>{id}</td>
                                            <td>{deletedAt}</td>
                                            <td>{email}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                       )}
                    </div>
                </>
            </div>
        </section>
    );
}

export default Users;