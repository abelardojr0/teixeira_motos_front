import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { AuthRoutes } from "./auth.routes";
import { AppRoutesAdmin } from "./app_admin.routes";
import { useNavigate } from "react-router-dom";

function RoutesApp() {
  const user = localStorage.getItem("userId");
  const auth = useContext(AuthContext);
  const [route, setRoute] = useState<any>();
  const navigate = useNavigate();
  useEffect(() => {
    if (user && auth) {
      setRoute(<AppRoutesAdmin />);
    } else {
      localStorage.clear();
      navigate("/");
      setRoute(<AuthRoutes />);
    }
  }, [auth]);

  if (route) {
    return route;
  }
}

export default RoutesApp;
