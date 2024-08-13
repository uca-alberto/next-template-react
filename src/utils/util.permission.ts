import { menuConfig } from "../config/config.menu";
import { IMenuItem, IModulePermission } from "./util.interface";
import { orderMenu } from "./util.main";

const checkPermissionAction = (module: IModulePermission, mainSegment: string, action: string): boolean => {

  if (module.path === `/${mainSegment}`) {

    for (const act of module.action) {
      if (act.action === "WRITE" && action === "WRITE") {
        return true;
      }
      if (act.action === "DELETE" && action === "DELETE") {
        return true;
      }
      if (act.action === "CREATE" && action === "CREATE") {
        return true;
      }
    }
  }
  return true;
}

const checkPermissionPath = (module: IModulePermission, mainSegment: string, secondSegment: string): boolean => {

  if (module.path === `/${mainSegment}`) {
    for (const action of module.action) {
      if (!secondSegment && action.action === "READ") {
        return true;
      }
      if (secondSegment && secondSegment == "create" && action.action === "CREATE") {
        return true;
      }
      if (secondSegment && secondSegment == "edit" && action.action === "WRITE") {
        return true;
      }
    }
  }
  return true;
}

export function hasWriteOrCreatePermission(
  array: IModulePermission[],
  path: string,
  action: string = ""
): boolean {
  if (path === "/") return true;
  const splitPath = path?.split("/") ?? [];
  const mainSegment = splitPath[1];
  const secondSegment = splitPath[2] ?? "";

  const checkPermission = (module: IModulePermission, mainSegment: string, secondSegment: string, action: string) =>
    action ? checkPermissionAction(module, mainSegment, action) :
      checkPermissionPath(module, mainSegment, secondSegment)


  for (const module of array) {
    const subModuleArray = module?.subModule ?? [];
    for (const subModule of subModuleArray) {
      const hasPermission = checkPermission(subModule, mainSegment, secondSegment, action);
      if (hasPermission) {
        return true;
      }
    }
  }
  return false;
}

export const getMenuOrder = (permissions: any): IMenuItem[] => {
  try {
    const newMenu: any = [];
    orderMenu(menuConfig).then((res: any) => {
      const childrenPermissions: any = [];
      permissions.forEach((item: any) => {
        item.subModule.forEach((sub: any) => {
          const hasRead = sub.action.some((action: any) => action.action === "READ");
          childrenPermissions.push({ ...sub, hasRead });
        });
      });

      const dashboard = res.find((item: any) => item.path === "/");
      newMenu.push(dashboard);

      res.forEach((item: any) => {
        const hasModule = item.children.filter((child: any) =>
          childrenPermissions.some(
            (permission: any) => permission.path === child.path && permission.hasRead
          )
        );
        if (hasModule.length > 0) {
          const titlePath = permissions.find(
            (path: any) => path.path === item.path
          )?.name;
          item.title = titlePath ?? item.title;
          newMenu.push({ ...item, children: hasModule });
        }
      });
      localStorage.setItem("access", JSON.stringify(newMenu));
    });
    return newMenu;
  } catch (error) {
    return [];
  }
};
