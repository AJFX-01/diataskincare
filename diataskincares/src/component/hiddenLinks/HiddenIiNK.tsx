
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from '../../redux/slice/authSlice';
import { ReactNode } from 'react'; // Import ReactNode type

interface ShowOnLoginProps {
  children: ReactNode; // Define children prop as ReactNode
}

export const ShowOnLogin: React.FC<ShowOnLoginProps> = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <>{children}</>; // Use fragment to return children
  }
  return null;
};

interface ShowOnLogoutProps {
  children: ReactNode; // Define children prop as ReactNode
}

export const ShowOnLogout: React.FC<ShowOnLogoutProps> = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <>{children}</>; // Use fragment to return children
  }
  return null;