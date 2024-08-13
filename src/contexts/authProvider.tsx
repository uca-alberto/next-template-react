import { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { callApis } from "../utils/util.callfetch";
import { AuthContextType, Props } from "../utils/util.interface";
import { useToast } from "./toastProvider";
import { useLocation } from "react-router-dom";
import { getMenuOrder } from "../utils/util.permission";

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

const pathNoVerify = ["/login", "/recover", "/recover-pass", "/verify-account",];

export const AuthProvider = ({ children }: Props) => {
  const { pushNotify } = useToast();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [permissions, setPermissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setLoading(true);
      handleLogout();
      return;
    }

    callApis({
      base: "SECURITY",
      api: "validate",
      method: "GET",
      useToken: true,
    })
      .then((res) => {
        if (res.status === 200) {
          const user = JSON.parse(localStorage.getItem("user") || "{}");
          const access = JSON.parse(localStorage.getItem("permissions") || "{}");
          setPermissions(access);
          setUser(user);
          setLoading(false);
          return;
        }
        setLoading(true);
        handleLogout();
      })
      .catch((error) => {
        console.error("Validation error:", error);
        handleLogout();
      });
  }, []);

  const loginAction = async (data: { email: string; password: string }) => {
    try {
      callApis({
        base: "SECURITY",
        api: "login",
        method: "POST",
        body: data,
      })
        .then((response: any) => {
          if (response.response && response.status === 201) {
            const { user, token, access } = response.response;
            setUser(user);
            setToken(token);
            setPermissions(access);
            getMenuOrder(access);
            localStorage.setItem("permissions", JSON.stringify(access));
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            pushNotify("Bienvenido al web admin", "success");
            navigate("/");
            return;
          }
          const message = response.response.error || "Error al iniciar sesión";
          pushNotify(message, "error");
          handleLogout();
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    setPermissions([]);
    setToken("");
    setUser(null);
    localStorage.removeItem("permissions");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("access");
    setLoading(false);
    redirectCheck();
  };

  const logOut = () => {
    handleLogout();
  };

  const redirectCheck = () => {
    const getPath = "/" + location.pathname.split("/")[1];
    if (pathNoVerify.includes(getPath)) {
      return;
    }
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        token,
        user,
        permissions,
        loginAction,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
