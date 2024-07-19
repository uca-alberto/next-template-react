import { IMenuItem } from "./util.interface";

const getMenuItem = (menu: IMenuItem[]): Promise<IMenuItem[]> => {
  return new Promise((resolve) => {
    try {
      const res = menu
        .filter((item) => !item.parentId && !item?.form)
        .map((item) => {
          const children = menu.filter((child) => child.parentId === item.id);
          return { ...item, children };
        });
      resolve(res);
    } catch (error: any) {
      throw new Error(error);
    }
  });
};

export { getMenuItem };
