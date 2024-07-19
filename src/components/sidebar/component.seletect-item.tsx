import { IMenuItem } from "../../utils/util.interface";
import { SubMenuComponent } from "./component.sub-menu-item";
import { MenuItemComponent } from "./component.menu-item";
import { memo } from "react";

const MemoMenuItemComponent = memo(MenuItemComponent);
const MemoSubMenuItemComponent = memo(SubMenuComponent);

const SeletectItem = ({ item, pathname }: { item: IMenuItem; pathname: string }) => {
  if (item?.children && item?.children?.length > 0) {
    return <MemoSubMenuItemComponent key={"with-sub-"} item={item} pathname={pathname} />;
  }
  return <MemoMenuItemComponent key={"menu-"} item={item} pathname={pathname} />;
};

export { SeletectItem };
