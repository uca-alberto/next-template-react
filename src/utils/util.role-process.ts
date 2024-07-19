import { Action, Module } from "../layouts/role/interface.role";

export const roleProcess = (items: Module[]) => {
  try {
    const selectedArray = items.filter(
      (module) =>
        module.childrenModules?.length > 0 &&
        module.childrenModules.some(
          (child) =>
            child.action?.length > 0 && child.action.some((action) => action.status)
        )
    );

    if (selectedArray.length === 0) return [];

    const arrayActions: Action[] = [];
    selectedArray.forEach((module) => {
      module.action.forEach((action) => {
        if (action?.action === "READ") {
          arrayActions.push({ id: action.id, moduleId: module.id });
        }
      });
    });
    selectedArray.forEach((module) => {
      module.childrenModules.forEach((child) => {
        child.action.forEach((action) => {
          if (action.status) {
            arrayActions.push({ id: action.id, moduleId: child.id });
          }
        });
      });
    });

    return arrayActions;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const mergeActionsRol = (modules: Module[], permissions: any[]) => {
  try {
    modules.forEach((module) => {
      const modulePermission = permissions?.find((item) => item.id === module.id);
      if (modulePermission) {
        module.childrenModules?.forEach((children) => {
          const mdCildrenPermission = modulePermission.subModule?.find(
            (mdpermision: any) => mdpermision.id === children.id
          );
          children.action?.forEach((action) => {
            const actionPermission = mdCildrenPermission?.action?.find(
              (actionPermission: any) => actionPermission.id === action.id
            );

            if (actionPermission) {
              module.action[0].status = true;
              module.open = true;
              action.status = true;
            }
          });
        });
      }
    });

    return modules;
  } catch (error) {
    console.error(error);
    return [];
  }
};
