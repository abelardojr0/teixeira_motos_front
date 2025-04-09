import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { AuthRoutes } from "./auth.routes";
import { AppRoutesAdmin } from "./app_admin.routes";

function RoutesApp() {
  const user = localStorage.getItem("userId");
  const auth = useContext(AuthContext);
  const [route, setRoute] = useState<any>();

  useEffect(() => {
    if (user && auth) {
      setRoute(<AppRoutesAdmin />);
    } else {
      localStorage.clear();
      setRoute(<AuthRoutes />);
    }
  }, [auth]);

  if (route) {
    return route;
  }
}

export default RoutesApp;
