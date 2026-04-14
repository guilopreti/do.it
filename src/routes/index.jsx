import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const Routes = () => {
  const [authenticated, setAuthenticated] = useState(() => {
    const readStorage = (key) => {
      const value = localStorage.getItem(key);

      if (!value) {
        return null;
      }

      try {
        return JSON.parse(value);
      } catch (_) {
        return null;
      }
    };

    const token = readStorage("@Doit:token");
    const user = readStorage("@Doit:user");

    return Boolean(token && user);
  });

  return (
    <Switch>
      <Route exact path={"/"}>
        <Home authenticated={authenticated} />
      </Route>
      <Route path={"/signup"}>
        <Signup authenticated={authenticated} />
      </Route>
      <Route path={"/login"}>
        <Login
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      <Route path={"/dashboard"}>
        <Dashboard
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
    </Switch>
  );
};

export default Routes;
