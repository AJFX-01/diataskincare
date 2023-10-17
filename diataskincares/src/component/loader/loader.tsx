import { useState, useEffect } from "react";
import BounceLoader from "react-spinners/BounceLoader";



interface LoaderProps {} 

const Loader: React.FC<LoaderProps> = () => {
    const [ loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
    }, []);

    return(
        <div></div>
    )
}