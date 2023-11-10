import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Card from "../../components/card/Card";
import { useAuth } from "../../contexts/authContext";
import { IoIosEye, IoMdEyeOff } from "react-icons/io";
import DeleteUser from "../../assets/deleteuser.png";
import Notiflix from "notiflix";
import spinnerImg from "../../assets/spinner.jpg";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { database } from "../../firebase/firebase";
import styles from "./auth.module.scss";

interface DeleteAccountProps {}

interface DeleteAccountState {
  email: string;
  password: string;
  error: string | null;
  loading: boolean;
  view: boolean;
  disable: boolean;
}

const DeleteAccount: React.FC<DeleteAccountProps> = () => {
  const { user } = useAuth();
  const [state, setState] = useState<DeleteAccountState>({
    email: "",
    password: "",
    error: null,
    loading: false,
    view: false,
    disable: false,
  });

  const passwordRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (!state.email || !state.password) {
      setState({ ...state, disable: true });
    } else {
      setState({ ...state, disable: false });
    }
  }, [state.email, state.password]);

  const reAuthenticate = async () => {
    setState({ ...state, loading: true });

    try {
      const credential = EmailAuthProvider.credential(state.email, state.password);
      await reauthenticateWithCredential(user, credential);

      deleteAccount();
      setState({ ...state, loading: false, email: "", password: "" });
    } catch (error) {
      if (error.message === "Firebase: Error (auth/user-token-expired).") {
        setState({ ...state, error: "it has been long since your last login, please logout and login again to proceed" });
        window.setTimeout(() => {
          setState({ ...state, error: null });
        }, 3000);
      } else if (error.message === "Firebase: Error (auth/wrong-password).") {
        setState({ ...state, error: "Wrong password" });
        window.setTimeout(() => {
          setState({ ...state, error: null });
        }, 3000);
      } else if (error.message === "Firebase: Error (auth/user-mismatch).") {
        setState({ ...state, error: "Invalid Email" });
        window.setTimeout(() => {
          setState({ ...state, error: null });
        }, 3000);
      }
      setState({ ...state, loading: false });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      Notiflix.Confirm.show(
        "Delete Account",
        "Are you sure you want to delete your account?",
        "PROCEED",
        "CANCEL",
        async () => {
          await reAuthenticate();
        },
        () => {},
        {
          width: "320px",
          borderRadius: "5px",
          titleColor: "#c07d53",
          okButtonBackground: "#c07d53",
          cssAnimationStyle: "zoom",
        }
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteAccount = async () => {
    try {
      await deleteUser(user);
      toast.success("Your account has been deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleShowPassword = () => {
    setState({ ...state, view: !state.view });
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
    }
  };

  return (
