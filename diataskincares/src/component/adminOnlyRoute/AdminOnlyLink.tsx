import { useSelector } from "react-redux";
import  { Link } from "react-router-dom";
import { selectEmail } from "../../redux/slice/authSlice";
import React, { ReactNode } from "react";


interface AdminOnlyRouteProps {
    children: ReactNode; // Define children prop as ReactNode
}

function AdminOnlyRoute({ children }: AdminOnlyRouteProps) {
    const userEmail = useSelector(selectEmail);

    if (
        userEmail === process.env.REACT_APP_ADMIN_EMAIL || 
        userEmail === process.env.REACT_APP_ADMIN_EMAIL_TWO ||
        userEmail === process.env.REACT_APP_ADMIN_EMAI_THREE  
    ) {
        return <>{children}</>;
    } else {
        return(
            <section style={{ minHeight: "80vh"}}>
                <div className="container">
                    <h2>PERMISSION DENIED</h2>
                    <p>This page can only be viewed by an admin</p>
                    <br />
                    <Link to="/">
                        <button className="--btn --btn-primary">&larr; Back to Home</button>
                    </Link>
                </div>
            </section>
        );
    }
}

interface AdminOnlyLinkProps {
    children: ReactNode;
}

function AdminOnlyLink({ children } : AdminOnlyLinkProps) {
    const userEmail = useSelector(selectEmail);

    if (
        userEmail === process.env.REACT_APP_ADMIN_EMAIL ||
        userEmail === process.env.REACT_APP_ADMIN_EMAIL_TWO ||
        userEmail === process.env.REACT_APP_ADMIN_EMAIL_THREE
    ) {
        return <>{children}</>;
    } else {
        return null;
    }
}

export { AdminOnlyRoute, AdminOnlyLink };