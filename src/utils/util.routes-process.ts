import { IMenuItem } from "./util.interface";

const routesProcess = (menu: any[]) => {
  const routesProcessor: IMenuItem[] = [];
  menu
    .filter((item) => item?.component)
    .map((item: any) => {
      if (item?.form) {
        routesProcessor.push(
          {
            ...item,
            title: `Crear ${item.title}`,
            path: `${item.path}create`,
          },
          {
            ...item,
            title: `Editar ${item.title}`,
            path: `${item.path}edit/:id`,
          },

        );
        return;
      }
      routesProcessor.push(item);

      return;
    });

  return routesProcessor;
};

const getIdRoutes = (path: string) =>
  path.includes("edit") ? path.split("/").pop() : "";

export { routesProcess, getIdRoutes };
