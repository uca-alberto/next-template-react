import { Sidebar, Menu, MenuItemStyles } from "react-pro-sidebar";
import { useLocation } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import { SeletectItem } from "./component.seletect-item";
import { SideBarStatic } from "./component.sidebar-static";
import { usePermission } from "../../contexts/permissionsProvider";
import { IMenuItem } from "../../utils/util.interface";

const MemoSideBarStatic = memo(SideBarStatic);
const MemoSeletectItem = memo(SeletectItem);

const menuItemStyles: MenuItemStyles = {
  root: {
    fontSize: "14px",
    fontWeight: 400,
  },
  icon: {
    color: "#391446",
  },
  SubMenuExpandIcon: {
    color: "#391446",
    backgroundColor: "transparent",
  },
  label: ({ open }) => ({
    fontWeight: open ? 600 : undefined,
  }),
  subMenuContent: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  button: {
    color: "#391446",
    backgroundColor: "transparent",
    fontSize: "16px",
    fontWeight: 500,
    fontStretch: "normal",
    [`&.active`]: {
      backgroundColor: "#FB963D",
      color: "#391446",
    },
    [`&:hover`]: {
      backgroundColor: "rgba(255,255,255,0.2)",
    },
  },
};

export default function SideBar({ open }: { open: boolean }) {
  const permission = usePermission();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [menu, setMenu] = useState<IMenuItem[]>(
    JSON.parse(localStorage.getItem("access") ?? "[]")
  );

  useEffect(() => {
    const access = localStorage.getItem("access");
    if (access && menu.length === 0) {
      setMenu(JSON.parse(access));
      return;
    }
  }, []);

  useEffect(() => {
    setToggled(open);
  }, [open]);

  useEffect(() => {
    if (permission?.access && menu.length === 0) {
      setMenu(permission.access);
      return;
    }
  }, [permission?.access]);

  return (
    <>
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        breakPoint="sm"
        width="300px"
        className="h-full bg-gradient-to-br from-[#391446]/50 from-40% to-[#FB963D]/50 border-none"
      >
        <MemoSideBarStatic
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          title="Menu"
        />
        <Menu menuItemStyles={menuItemStyles}>
          {menu.map((item, index) => (
            <MemoSeletectItem key={index} item={item} pathname={location.pathname} />
          ))}
        </Menu>
      </Sidebar>
    </>
  );
}
