import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authProvider";
import SideBar from "../components/sidebar/component.sidebar";
import Header from "../components/component.header";
import { memo, useState } from "react";
import { useToast } from "../contexts/toastProvider";

const MemoSideBar = memo(SideBar);
const MemoHeader = memo(Header);

const PrivateRoute = () => {
  const { user, loading } = useAuth();
  const { pushNotify } = useToast();
  const [open, setOpen] = useState(false);

  if (!loading) {
    if (!user) {
      pushNotify("Sesión expirada", "error");
      return <Navigate to="/login" />;
    }
  }

  return (
    <>
      <div className="sticky top-0 z-20 h-screen">
        <MemoSideBar open={open} />
      </div>
      <div className="w-full h-full flex flex-col">
        <MemoHeader setOpen={setOpen} collapsed={open} />
        <div className="w-full p-3 ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default PrivateRoute;
