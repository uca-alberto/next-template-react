import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authProvider";
import { useNavigate } from "react-router-dom";
import { DivJustifyItemsCenter } from "./layouts/component.divs";
import { ButtonToggleUi } from "./common/component.common";

export default function Header({
  collapsed,
  setOpen,
}: {
  collapsed: boolean;
  setOpen: any;
}) {
  const navigateTo = useNavigate();
  const { user, logOut } = useAuth();
  const [name, setUserName] = useState("");

  useEffect(() => {
    if (user) {
      const nameAll = user.name + " " + user.lastName;
      setUserName(nameAll);
    }
  }, [user]);

  const handleLogout = () => {
    logOut();
    navigateTo("/login");
  };

  return (
    <>
      <div className="w-full py-3 min-h-16 flex justify-center backdrop-blur sticky top-0 z-10">
        <div className="w-full h-full container flex lg:justify-between items-center">
          <div>
            <DivJustifyItemsCenter>
              <div className="flex sm:invisible ">
                <ButtonToggleUi setOpen={setOpen} open={collapsed} />
              </div>
            </DivJustifyItemsCenter>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 justify-center">
            <div className="my-2 py-2">
              <div className="h-full lg:max-w-56 flex justify-center items-center bg-white/35 rounded-lg shadow-md hover:shadow-lg hover:shadow-[#391446]/20 px-4 text-center">
                <p className="text-[#222222] text-md font-semibold ">{name}</p>
              </div>
            </div>
            <div className="my-2 py-2">
              <button
                onClick={handleLogout}
                className="lg:min-w-56 mx-4 py-2 px-4 rounded-md text-[#222222] hover:bg-[#222222]/80 hover:text-white hover:shadow-lg hover:shadow-[#391446]/20 transition duration-300 ease-in-out"
              >
                <span className=" text-md font-semibold text-center">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
//bg-[#f5f5f5]/40
