import React, { useRef } from "react";
import Card from "../../component/card/Card";
import styles from "./contact.module.scss";
import { FaPhoneAlt, FaEnvelope, FaTwitter, FaLinkedin } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Contact: React.FC = () => {
    const form = useRef<HTMLFormElement>(null);
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

    return (
        <section>
            <div className={`container ${styles.contact}`}>
                <p onClick={() => navigate(-1)} style={{ cursor: "pointer", marginBottom: '2rem' }}>
                    &larr; Go back
                </p>
                <h2>Reach out to us</h2>
                <br />
                <div className={styles.section}>
                    <form ref={form} onSubmit={sendEmail}>
                        <Card cardClass={styles.card}>
                            <label>Name</label>
                            <input
                                type="text"
                                name="user_name"
                                placeholder="Full Name"
                                required
                            />
                            <label>Name</label>
                            <input
                                type="email"
                                name="user_email"
                                placeholder="Your active mail"
                                required
                            />
                            <label>Name</label>
                            <input
                                type="text"
                                name="subject"
                                placeholder="subject"
                                required
                            />
                            <label>Message</label>
                            <textarea name="message" id="" rows={10} cols={30}></textarea>
                            <button className="--btn --btn-primary --btn-block">
                                Send Message
                            </button>
                        </Card>
                    </form>

                    <div className={styles.details}>
                        <Card cardClass={styles.card2}>
                            <h3>Our Contact Information</h3>
                            <p>Fill the form or contact us via other channels listed below</p>
                            <div className={styles.icons}>
                                <span>
                                    <FaPhoneAlt />
                                    <p>+234 706 188 1844 </p>
                                </span>
                                <span>
                                    <FaEnvelope />
                                    <p>support@diataskincares.com</p>
                                </span>
                                <span>
                                    <GoLocation />
                                    <p>Lagos, Nigeria</p>
                                </span>
                                <span>
                                    <FaTwitter />
                                    <a 
                                        href="https://www.twitter.com/"
                                        style={{ color: '#fff', fontSize: '1.5rem' }}
                                    >
                                        AJFX_1
                                    </a>
                                </span>
                                <span>
                                    <FaTwitter />
                                    <a 
                                        href="https://www.linkedin.com"
                                        style={{ color: '#fff', fontSize: '1.5rem' }}
                                    >
                                        Ajegbomogun Opeyemi
                                    </a>
                                </span>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default Contact;