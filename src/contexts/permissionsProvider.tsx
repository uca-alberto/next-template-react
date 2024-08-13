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
  const auth = useAuth();
  const { pushNotify } = useToast();
  const navigation = useNavigate();
  const { pathname } = useLocation();
  const [access, setAccess] = useState<IMenuItem[]>(
    JSON.parse(localStorage.getItem("access") ?? "[]")
  );

  useEffect(() => {
    if (auth?.permissions.length > 0 && access.length === 0) {
      getOrderMenu();
      return;
    }
  }, [auth?.permissions]);

  useEffect(() => {
    if (auth?.user && auth?.permissions.length > 0) {
      hasAccess();
    }
  }, [pathname]);

  const hasPermission = (action: typeAction): boolean => {
    try {
      return hasWriteOrCreatePermission(
        auth?.permissions,
        pathname,
        action
      )
    } catch (error) {
      return false;
    }
  };

  const hasAccess = () => {

    if (auth?.permissions) {
      const hasPermission = hasWriteOrCreatePermission(
        auth?.permissions,
        pathname
      );

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

        auth?.permissions.forEach((item: any) => {
          item.subModule.forEach((sub: any) => {
            sub.title = item?.name ?? sub.title;
            const hasRead = sub.action.some(
              (action: any) => action.action === "READ"
            );
            if (!sub.hiddenDashboard) {
              childrenPermissions.push({ ...sub, hasRead });
            }
          });
        });

        const dashboard = res.find((item: any) => item.path === "/");
        newMenu.push(dashboard);

        res.forEach((item: any) => {
          const hasModule = item.children.filter((child: any) =>
            childrenPermissions.some(
              (permission: any) =>
                permission.path === child.path && permission.hasRead
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
