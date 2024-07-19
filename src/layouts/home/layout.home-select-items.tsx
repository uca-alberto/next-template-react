import { IMenuItem } from "../../utils/util.interface";
import { MenuItemComponent } from "./layout.home-menu-item";
import { SubMenuComponent } from "./layout.home-submenu-item";

export const SelectItemMenu = ({ item }: { item: IMenuItem }) => {
  if (item?.children && item?.children?.length > 0) {
    return <SubMenuComponent item={item} />;
  }
  return <MenuItemComponent item={item} />;
};
