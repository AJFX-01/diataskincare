import React, { useState, useEffect } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import "./loader.scss";



interface LoaderProps {} 

const Loader: React.FC<LoaderProps> = () => {
    const [ loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
    }, []);

    return(
        <div className="loader">
            {loading && (
                <BounceLoader color={"#c07d53"} loading={loading} size={50} />
            )}
        </div>
    );
}

export default Loader;