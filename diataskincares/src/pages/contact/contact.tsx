import React, { useRef } from "react";
import Card from "../../component/card/Card";
import styles from "./contact.module.scss";
import { FaPhoneAlt, FaEnvelope, FaTwitter, FaLinkedin } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Contact: React.FC = () => {
    const form = useRef<HTMLFormElement>();
    const navigate = useNavigate();


    const sendEmail = (e : React.FormEvent) => {
        e.preventDefault();
        console.log(form.current);

        emailjs
            .sendForm(
                process.env.REACT_APP_EMAILJS_SERVICE_ID,
                "template_fxbkfjk",
                form.current,
                "LI-G3ioYQBUa9IpIn"
            )
            .then(
                (result: any) => {
                    toast.success("Message sent sucesssfully");
                },
                (error: any) => {
                    toast.error(error.text)
                }
            );
        (e.target as HTMLFormElement).reset();
    }

    return ()
}


export default Contact;