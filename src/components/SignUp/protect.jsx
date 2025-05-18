import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contextAuth/AuthContext";

function Protect({ children }) {
  const navigate = useNavigate();
  const { isAuth } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuth) {
      navigate('/'); 
    }
  }, [isAuth, navigate]); 


  if (isAuth) {
    return children;
  }

  return null;
}

export default Protect;
