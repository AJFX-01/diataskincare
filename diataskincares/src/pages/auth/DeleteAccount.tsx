// import {
//     deleteUser,
//     EmailAuthProvider,
//     reauthenticateWithCredential,
//   } from "firebase/auth";
// import React, { useRef, useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import Card from "../../component/card/Card";
// import { useAuth } from "../../contexts/auth";
// import { IoIosEye, IoMdEyeOff } from "react-icons/io";
// //   import DeleteUser from "../../assets/deleteuser.png";
// import Notiflix from "notiflix";
// import spinnerImg from "../../assets/spinner.jpg";
// import { v4 as uuidv4 } from "uuid";
// import { addDoc, collection, Firestore, Timestamp } from "firebase/firestore";
// import { database } from "../../firebase/firebase";
// import styles from "./auth.module.scss";
// import { error } from "console";

// interface DeleteAccountProps {} 

// interface UsersConfig {
//     assignedID: string;
//     email: string | null;
//     deletedAt: string;
//     createdAt: Date;
//   }

// interface DeleteAccountState {
//     email: string;
//     password: string;
//     error: string | null;
//     loading: boolean;
//     view: boolean;
//     disable: boolean;
//  }

// const DeleteUser: React.FC<DeleteAccountProps> = () => {

//     const authResult = useAuth()
//     const user = authResult ? authResult.user : undefined;
//     const [state, setState] = useState<DeleteAccountState>({
//         email: "",
//         password: "",
//         error: null,
//         loading: false,
//         view: false,
//         disable: false

//     });

//     const userEmail: string | null = user?.email || null;
//     // const credential = EmailAuthProvider.credential(
//     //     state.email,
//     //     state.password
//     // );
//     const passwordRef = useRef<HTMLInputElement>();

//     useEffect(() => {
//         if (!state.email || !state.password) {
//             setState({ ...state, disable: true});
//         } else {
//             setState({ ...state, disable: false});
//         }
//     }, [state.email, state.password]);
    
//     const reAuthenticate = async () => {
//         setState({ ...state, loading: true });


//         try {
//             const credential = EmailAuthProvider.credential(state.email, state.password);
//             if (user !== undefined && user !== null ) {
//                 await reauthenticateWithCredential(user, credential);
//             }
            
//             deleteAccount();
//             setState({ ...state, error: null});
//         } catch (error: any) {
//             if (error.message === "Firebase: Error (auth/user-token-expired).") {
//                 setState({ ...state, error: "it has been long since your last login, please logout and login again to proceed" });
//                 window.setTimeout(() => {
//                   setState({ ...state, error: null });
//                 }, 3000);
//               } else if (error.message === "Firebase: Error (auth/wrong-password).") {
//                 setState({ ...state, error: "Wrong password" });
//                 window.setTimeout(() => {
//                   setState({ ...state, error: null });
//                 }, 3000);
//               } else if (error.message === "Firebase: Error (auth/user-mismatch).") {
//                 setState({ ...state, error: "Invalid Email" });
//                 window.setTimeout(() => {
//                   setState({ ...state, error: null });
//                 }, 3000);
//               }
//               setState({ ...state, loading: false });
//         }
//     };

//     try {
//         Notiflix.Confirm.show(
//             "DELETE Account",
//             "Are you sure you wamt to delete your account?",
//             "PROCEDD",
//            " CANCEL", 
//            async () => {
//             await reAuthenticate();
//            },
//            () => {},
//            {
//             width: "320px",
//             borderRadius: "5px",
//             titleColor: "#c07d53",
//             okButtonBackground: "#c07d53",
//             cssAnimationStyle: "zoom"
//            }
//         );
//     } catch (error: any) {
//         toast.error(error.message);
//     };

//     const today = new Date();
//     const date = today.toDateString();
//     const usersConfig: UsersConfig = {
//         assignedID: uuidv4(),
//         email: userEmail,
//         deletedAt: date,
//         createdAt: Timestamp.now().toDate(),
//     };


//     const deleteAccount = async () => {
//         try {
//             if (user !== undefined && user !== null) {
//                 await deleteUser(user);
//             }
//             toast.success("Your account has beem deleted")
//         } catch (error : any) {
//             toast.error(error.message)
//         }
//     }

//     const handleShowPassword = () => {
//         setState({ ...state, view: !state.view });
//         if (passwordRef.current) {
//             passwordRef.current.type = state.view ? "text" : "password"
//         } 
//     }

//     return (
//         <section className={styles.auth}>
//             <div className={styles.img}>
//                 <img src={} alt="login" width="400"/>
//             </div>
//             <Card cardClass={styles.card}>
//                 <div className={styles.form}>
//                     <h2>Confirm your details</h2>
//                     {state.error && <p className="alert-err0r">{state.error}</p>}
//                     <form>
//                         <input type="email" value={state.email} required placeholder="Email"/>
//                         <label className={styles.label}>
//                             <input type="password" required value={state.password} placeholder="Password"/>
//                         </label>
//                         {state.disable ? (
//                             <button disabled className={`${styles.button} ${styles.disabled}`}>
//                                 Delete Account
//                             </button>
//                         ) : (
//                             <button type="submit" className="--btn --btn-primary --btn-block">
//                                 {state.loading ? (
//                                     <img src={} alt="loading" style={{ width : "25px", height: "25px"}} />
//                                 ) : ( 
//                                     "Delete Account"
//                                 )}
//                             </button>
//                         )}
//                     </form>
//                 </div>
//             </Card>
//        </section>
//     )
// };

// export default DeleteUser;
import {
    deleteUser,
    EmailAuthProvider,
    reauthenticateWithCredential,
  } from "firebase/auth";
  import React, { useRef, useState, useEffect } from "react";
  import { toast } from "react-toastify";
  import Card from "../../component/card/Card";
  import { useAuth } from "../../contexts/auth";
  import { IoIosEye, IoMdEyeOff } from "react-icons/io";
  import DeleteUser from "../../assets/deleteuser.png";
  import Notiflix from "notiflix";
  import spinnerImg from "../../assets/spinner.jpg";
  import { v4 as uuidv4 } from "uuid";
  import { addDoc, collection, Timestamp } from "firebase/firestore";
  import { database } from "../../firebase/firebase";
  import styles from "./auth.module.scss";
  
  export default function DeleteAccount() {
    const { user } = useAuth();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const passwordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [view, setView] = useState<boolean>(false);
    const [disable, setDisable] = useState<boolean>(false);
    const userEmail: string | null = user?.email || null;
    const credential = EmailAuthProvider.credential(email, password);
  
    useEffect(() => {
      if (!email || !password) {
        setDisable(true);
      } else {
        setDisable(false);
      }
    }, [email, password]);
  
    const reAuthenticate = () => {
      setLoading(true);
      reauthenticateWithCredential(user, credential)
        .then(() => {
          deleteAccount();
          setLoading(false);
          setEmail("");
          setPassword("");
        })
        .catch((err) => {
          if (err.message === "Firebase: Error (auth/user-token-expired).") {
            setError(
              "it has been long since your last login, please logout and login again to proceed"
            );
            window.setTimeout(() => {
              setError("");
            }, 3000);
          }
          if (err.message === "Firebase: Error (auth/wrong-password).") {
            setError("Wrong password");
            window.setTimeout(() => {
              setError("");
            }, 3000);
          }
          if (err.message === "Firebase: Error (auth/user-mismatch).") {
            setError("Invalid Email");
            window.setTimeout(() => {
              setError("");
            }, 3000);
          }
          setLoading(false);
        });
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        Notiflix.Confirm.show(
          "Delete Account",
          "Are you sure you want to delete your account?",
          "PROCEED",
          "CANCEL",
          function okCb() {
            reAuthenticate();
          },
          function cancelCb() {},
          {
            width: "320px",
            borderRadius: "5px",
            titleColor: "#c07d53",
            okButtonBackground: "#c07d53",
            cssAnimationStyle: "zoom",
          }
        );
      } catch (error : any) {
        toast.error(error.message);
      }
      const today = new Date();
      const date = today.toDateString();
      const usersConfig = {
        assignedID: uuidv4(),
        email: userEmail,
        deletedAt: date,
        createdAt: Timestamp.now().toDate(),
      };
      try {
        const usersRef = collection(database, "Deleted-Users");
        await addDoc(usersRef, usersConfig);
      } catch (error : any) {
        console.log(error.message);
      }
    };
  
    const deleteAccount = () => {
      deleteUser(user)
        .then(() => {
          toast.success("Your account has been deleted");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    };
  
    const handleShowPassword = () => {
      setView(!view);
      if (passwordRef.current?.type === "password") {
        passwordRef.current.setAttribute("type", "text");
      } else {
        passwordRef.current?.setAttribute("type", "password");
      }
    };
  
    return (
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={DeleteUser} alt="login" width="400" />
        </div>
        <Card cardClass={styles.card}>
          <div className={styles.form}>
            <h2>Confirm your details</h2>
            {error && <p className="alert error">{error}</p>}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                required
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className={styles.label}>
                <input
                  type="password"
                  required
                  value={password}
                  ref={passwordRef}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span onClick={handleShowPassword}>
                  {view ? <IoIosEye /> : <IoMdEyeOff />}
                </span>
              </label>
              {disable ? (
                <button
                  disabled
                  className={`${styles.button} ${styles.disabled}`}
                >
                  Delete Account
                </button>
              ) : (
                <button type="submit" className="--btn --btn-primary --btn-block">
                  {loading ? (
                    <img
                      src={spinnerImg}
                      alt="loading..."
                      style={{ width: "25px", height: "25px" }}
                    />
                  ) : (
                    "Delete Account"
                  )}
                </button>
              )}
            </form>
          </div>
        </Card>
      </section>
    );
  }
  
  
  