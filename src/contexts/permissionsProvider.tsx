import { createContext, useContext, useEffect, useState } from "react";
import {
  IModulePermission,
  typeAction,
  Props,
  permissionsContextType,
  IMenuItem,
} from "../utils/util.interface";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./authProvider";
import { hasWriteOrCreatePermission } from "../utils/util.permission";
import { useToast } from "./toastProvider";
import { menuConfig } from "../config/config.menu";
import { orderMenu } from "../utils/util.main";

const PermissionsContext = createContext<permissionsContextType | null>(null);

export const usePermission = () => {
  try {
    const context = useContext(PermissionsContext);
    return context;
  } catch (error) {
    console.error("Error en usePermission", error);
  }
};

export const PermissionsProvider = ({ children }: Props) => {
  const { user, permissions } = useAuth();
  const { pushNotify } = useToast();
  const navigation = useNavigate();
  const { pathname } = useLocation();
  const [access, setAccess] = useState<IMenuItem[]>(
    JSON.parse(localStorage.getItem("access") ?? "[]")
  );

  useEffect(() => {
    if (permissions.length > 0 && access.length === 0) {
      getOrderMenu();
      return;
    }
  }, [permissions]);

  useEffect(() => {
    if (user && permissions.length > 0) {
      hasAccess();
    }
  }, [pathname]);

  const hasPermission = (action: typeAction): boolean => {
    try {
      const splitPath = pathname?.split("/") ?? [];
      const mainSegment = splitPath[1];

      function checkPermission(module: IModulePermission): boolean {
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
        return false;
      }

      for (const module of permissions) {
        const subModuleArray = module?.subModule ?? [];
        for (const subModule of subModuleArray) {
          const hasPermission = checkPermission(subModule);
          if (hasPermission) {
            return true;
          }
        }
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const hasAccess = () => {
    if (permissions) {
      const hasPermission = hasWriteOrCreatePermission(permissions, pathname);
      if (!hasPermission) {
        pushNotify("No tienes permisos para acceder a esta ruta", "error");
        return navigation("/");
      }
    }
  };

  const getOrderMenu = (): IMenuItem[] => {
    try {
      const newMenu: any = [];
      orderMenu(menuConfig).then((res: any) => {
        const childrenPermissions: any = [];

        permissions.forEach((item: any) => {
          item.subModule.forEach((sub: any) => {
            sub.title = item?.name ?? sub.title;
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
            newMenu.push({ ...item, children: hasModule });
          }
        });

        setAccess(newMenu);
        localStorage.setItem("access", JSON.stringify(newMenu));
      });
      return newMenu;
    } catch (error) {
      return [];
    }
  };

  return (
    <PermissionsContext.Provider value={{ hasPermission, access }}>
      {children}
    </PermissionsContext.Provider>
  );
};
