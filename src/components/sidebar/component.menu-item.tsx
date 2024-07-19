import { MenuItem } from "react-pro-sidebar";
import Icon from "../common/icon";

import { IMenuItem } from "../../utils/util.interface";

const MenuItemComponent = ({ item, pathname }: { item: IMenuItem; pathname: string }) => {
  return (
    <MenuItem
      href={item.path}
      icon={
        <Icon
          name={item.icon}
          color={`${pathname === item.path ? "#FB963D" : "#391446"}`}
        />
      }
      className={`${location.pathname === item.path && " bg-white/35 shadow-md "}`}
    >
      {item.title}
    </MenuItem>
  );
};

export { MenuItemComponent };
