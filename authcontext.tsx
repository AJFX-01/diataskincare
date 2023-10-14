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

    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);

  return status;
};

export default useNetworkStatus;
