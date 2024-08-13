import { SubMenu } from "react-pro-sidebar";
import Icon from "../common/icon";
import { IMenuItem } from "../../utils/util.interface";
import { MenuItemComponent } from "./component.menu-item";
import { memo } from "react";

const MemoMenuItemComponent = memo(MenuItemComponent);

const SubMenuComponent = ({ item, pathname }: { item: IMenuItem; pathname: string }) => {
  const locationPath = "/" + pathname.split("/")[1];
  const isOpen = item.children?.some((child) => child.path === locationPath);
  return (
    <SubMenu
      label={item.title}
      defaultOpen={isOpen}
      icon={<Icon name={item.icon} color={`#ffffff`} />}
    >
      {item.children?.map((child, i) => (
        <MemoMenuItemComponent
          item={child}
          key={`${item.title}-${i}`}
          pathname={pathname}
        />
      ))}
    </SubMenu>
  );
};

export { SubMenuComponent };
