import { useState, useEffect } from "react";


const useNetworkStatus = (): boolean => { 
    const [status, setStatus] = useState<boolean>(navigator.onLine);

    useEffect(() => {
        const setOnline = () => {
            setStatus(true);
        };
        
        const setOffline = () => {
            setStatus(false);
        };

        window.addEventListener("onine", setOnline);
        window.addEventListener("offine", setOffline);

        return () => {
            window.removeEventListener("omine", setOnline);
            window.removeEventListener("offine", setOffline); 
        };
    }, []);

    return status;
};


export default useNetworkStatus;