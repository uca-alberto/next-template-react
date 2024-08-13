import logo from "../../assets/logo_access.png";
import iconoLogo from "../../assets/logo.png";
import { ISideBarStatic } from "../../utils/util.interface";
import { ButtonToggleUi } from "../common/component.common";

const SideBarStatic = (props: ISideBarStatic) => {
  const { title, collapsed, setCollapsed } = props;
  return (
    <>
      <div className="h-64">
        <div className="flex flex-col ">
          <div className={`flex ${collapsed ? "justify-center " : "justify-end"}`}>
            <ButtonToggleUi setOpen={setCollapsed} open={collapsed} />
          </div>
          <div className=" w-full flex justify-center my-4 py-2 bg-[#080808]">
            <img
              src={!collapsed ? logo : iconoLogo}
              alt="claro"
              className={`${collapsed ? "h-8" : "h-12"}`}
            />
          </div>
          <div className="w-full text-center my-6">
            <p
              className={`text-[#ED7004] font-bold ${collapsed ? "text-sm" : "text-lg"}`}
            >
              {title}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export { SideBarStatic };
