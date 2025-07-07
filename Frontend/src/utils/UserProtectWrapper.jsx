import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userToken"));

    if (!token) {
      setIsAuth(false);
      return navigate("/user/login");
    }

    if (token.expiry < new Date().getTime()) {
      localStorage.removeItem("userToken");
      setIsAuth(false);
      return navigate("/user/login");
    }

    setIsAuth(true);
  }, []);

  if (isAuth === null) return <div>Loading...</div>;
  if (isAuth === false) return null;

  return children;
};

export default UserProtectWrapper;
