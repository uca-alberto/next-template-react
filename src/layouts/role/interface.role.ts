export interface Module {
  id: number;
  name: string;
  description: string;
  path: string;
  parentId: number | null;
  action: { id: number; moduleId: number; status?: boolean; action: string }[];
  childrenModules: Module[];
  open?: boolean;
}

export interface Action {
  id: number;
  moduleId: number;
  name?: string;
}
export const labels = {
  titleEdit: "Editar Rol",
  titleCreate: "Crear Rol",
  base: "ROLES",
};

export const labels_list = {
  title: "Roles",
  min: "rol",
  base: "ROLES",
  search: "Buscar",
  tableTitle: "Lista de Roles",
  createButton: "Crear",
  includeFields: {
    id: "Id",
    name: "Nombre",
    status: "Estado",
    createdAt: "Creado el",
    updatedAt: "Actualizado el",
  },
  path: "/role",
  messageDelete: "Rol eliminado correctamente",
  messageErrorDelete: "Error al eliminar el rol",
  messageUpdate: "Rol actualizado correctamente",
  messageErrorUpdate: "Error al actualizar el rol",
};

export const translate = {
  WRITE: "Actualizar",
  READ: "Leer",
  DELETE: "Eliminar",
  CREATE: "Crear",
};
