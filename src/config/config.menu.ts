import HomePage from "../layouts/home/layout.home";
import LayoutMenu from "../layouts/menu/layout.menu";
import LayoutRole from "../layouts/role/layout.role";
import LayouotRoleForm from "../layouts/role/layout.role-form";
import LayoutSection from "../layouts/section/layout.section";
import LayoutSectionForm from "../layouts/section/layout.section-form";
import LayoutUser from "../layouts/user/layout.user";
import LayouotUserForm from "../layouts/user/layout.user-form";

export const menuConfig = [
  {
    id: 1,
    name: "home",
    title: "Inicio",
    path: "/",
    icon: "RiDashboardLine",
    component: HomePage,
  },
  {
    id: 2,
    name: "module_programs",
    path: "/programs",
    title: "Módulo Programas",
    icon: "RiDashboardLine",
  },
  {
    id: 3,
    name: "referred",
    title: "Referidos",
    path: "/#",
    icon: "RiDashboardLine",
    parentId: 2,
  },
  {
    id: 4,
    name: "upgrade",
    title: "Upgrade",
    path: "/#",
    icon: "RiDashboardLine",
    parentId: 2,
  },
  {
    id: 5,
    name: "birthday",
    title: "Cumpleaños",
    path: "/#",
    icon: "RiDashboardLine",
    parentId: 2,
  },
  {
    id: 6,
    name: "module_categories",
    path: "/#",
    title: "Módulo Categorias",
    icon: "RiDashboardLine",
  },
  {
    id: 7,
    name: "categories",
    path: "/#",
    title: "Categorias",
    icon: "RiDashboardLine",
    parentId: 6,
  },
  {
    id: 8,
    name: "module_benefits",
    path: "/#",
    title: "Módulo Beneficios",
    icon: "RiDashboardLine",
  },
  {
    id: 9,
    name: "benefits",
    path: "/#",
    title: "Beneficios",
    icon: "RiDashboardLine",
    parentId: 8,
  },
  {
    id: 10,
    name: "redeem",
    path: "/#",
    title: "Canjes",
    icon: "RiDashboardLine",
    parentId: 8,
  },
  {
    id: 11,
    name: "module_reports",
    path: "/#",
    title: "Módulo Reportes",
    icon: "RiDashboardLine",
  },
  {
    id: 12,
    name: "reports",
    path: "/#",
    title: "Reportes",
    icon: "RiDashboardLine",
    parentId: 11,
  },
  {
    id: 13,
    name: "module_user",
    path: "/users",
    title: "Módulo Usuarios",
    icon: "RiDashboardLine",
  },
  {
    id: 14,
    name: "users",
    title: "Usuarios",
    path: "/user",
    icon: "RiDashboardLine",
    component: LayoutUser,
    parentId: 13,
  },
  {
    id: 15,
    name: "create_edit_user",
    title: "Usuarios",
    path: "/user/",
    icon: "RiDashboardLine",
    component: LayouotUserForm,
    parentId: 14,
    form: true,
  },
  {
    id: 16,
    name: "roles",
    title: "Roles",
    path: "/role",
    icon: "RiDashboardLine",
    component: LayoutRole,
    parentId: 13,
  },
  {
    id: 17,
    name: "create_edit_role",
    title: "Roles",
    path: "/role/",
    icon: "RiDashboardLine",
    component: LayouotRoleForm,
    parentId: 16,
    form: true,
  },
  {
    id: 18,
    name: "module_config",
    path: "/config",
    title: "Modulo Configuración",
    icon: "RiDashboardLine",
  },
  {
    id: 19,
    name: "section",
    title: "Secciones",
    path: "/section",
    icon: "RiDashboardLine",
    component: LayoutSection,
    parentId: 19,
  },
  {
    id: 20,
    name: "create_edit_section",
    title: "Sección",
    path: "/section/",
    icon: "RiDashboardLine",
    component: LayoutSectionForm,
    parentId: 20,
    form: true,
  },
  {
    id: 21,
    name: "menu",
    title: "Menú",
    path: "/menu",
    icon: "RiDashboardLine",
    component: LayoutMenu,
    parentId: 19,
  }
  
];
