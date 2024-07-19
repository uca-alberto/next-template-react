import { MouseEvent, ReactNode } from "react";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "FORMDATA";

export type Props = {
  children?: React.ReactNode;
};
export interface AuthContextType {
  user: any;
  token: string;
  loading: boolean;
  permissions: any[];
  loginAction: (data: any) => void;
  logOut: () => void;
}
type typeNotify = "error" | "success" | "warning" | "info";

export interface ToastContextType {
  pushNotify: (message: string, type: typeNotify) => void;
}

export interface ISendRequest {
  initialDate?: string;
  finalDate?: string;
  search?: string;
  pageNumber: number;
}

export interface ISendCallFetch {
  api: string;
  initialDate: string;
  finalDate: string;
  search?: string;
  pageNumber?: number;
}

export interface IDownloadCallFetch {
  type: string;
  initialDate: string;
  finalDate: string;
  search?: string;
}

export interface ICallApis {
  useToken?: boolean;
  base: string;
  api: string;
  method: HttpMethod;
  body?: any;
  params?: any;
}

export interface ICallFetch {
  url: string;
  method: HttpMethod;
  options?: any;
}

export interface IPropsChildrenLayouts {
  children?: ReactNode;
}

export interface IPropsChildrenHandleLayouts {
  loanding?: boolean;
  label?: string;
  children: ReactNode;
  icon?: any;
  hide?: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export interface IPropsLayouts {
  isViewButton?: boolean;
  isViewForm?: boolean;
  isUseSearch?: boolean;
  isUseDate?: boolean;
  labelButton?: string;
  children?: ReactNode;
  title: string;
  componentAdd?: ReactNode;
  handleSearch?: (sql: any) => void;
  search?: (value: string) => void;
  onClick?: () => void;
  data?: any;
}

export interface IPropsTitleSection {
  isViewButton?: boolean;
  labelButton?: string;
  title: string;
  icon?: any;
  onClick?: () => void;
}

export interface ButtonIconProps {
  type?: typeButton;
  children?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export interface InputStandardProps {
  error?: any;
  title: string;
  touched?: any;
  type?: string;
  value?: string;
  placeholder: string;
  name: string;
  disabled?: boolean;
  errorView?: boolean;
  isViewError?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setFetchInput?: (data: any) => void;
  listAuto?: (data: any) => void;
  data?: any[];
}

export interface InputSelectStandardProps {
  title: string;
  placeholder?: string;
  name: string;
  touched?: any;
  value?: string;
  options: { value: number; label: string }[];
  disabled?: boolean;
  errorView?: boolean;
  error?: any;
  type?: string;
  isViewError?: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  setInfo?: (data: any) => void;
}

export interface InputFileProps {
  title?: string;
  buttonTitle?: string;
  value?: any;
  disabled?: boolean;
  selectItem?: (data: any) => void;
  border?: boolean;
  description?: string[];
  fileWeight?: number;
  formats?: string[];
  error?: any;
  touched?: any;
  errorView?: boolean;
  name?: string;
  width?: number;
  height?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface Icolumns {
  tittle: string;
  field: string;
}

export interface IPropsTableComponent {
  columns: Icolumns[] | string[];
  data: any[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  title: string;
  icon?: any;
  heightTable?: string;
  hideFooter?: boolean;
  handleUpdateItem?: (id: string, status: boolean) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
  handleDownload?: () => void;
  selectItem?: (id: number) => void;
  voidDelete?: (id: string, name?: string) => void;
  voidEdit?: (id: number) => void;
  voidView?: (id: number) => void;
}

export interface IPropsTableFooter {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  handleDownload?: () => void;
}

interface AnyObject {
  [key: string]: string;
}

export interface IPropsTableManagement {
  data: any[];
  title: string;
  icon?: any;
  nowPage?: number;
  countItems?: number;
  includeFields?: AnyObject;
  changePage?: any;
  isPending?: boolean;
  heightTable?: string;
  hideFooter?: boolean;
  handleUpdateItem?: (id: string, status: boolean) => void;
  onDownload?: () => void;
  voidDelete?: (id: string, name?: string) => void;
  voidEdit?: (id: number) => void;
  selectItem?: (id: number) => void;
  voidView?: (id: number) => void;
}

export interface IPropsTableContent {
  columnsState: any[];
  obj: any;
  index: number;
  handleSelectItem: (id: number) => void;
  handleUpdateItem: (id: string, status: boolean) => void;
  voidEdit?: (id: number) => void;
  voidDelete?: (id: string, name?: string) => void;
  voidView?: (id: number) => void;
}

export interface IPropsTableHeader {
  columnsState: any[];
  voidDelete?: (id: string, name?: string) => void;
  voidEdit?: (id: number) => void;
  voidView?: (id: number) => void;
}

export interface IPropsModalUi {
  title?: string;
  open: boolean;
  onCloseModal: any;
  children?: React.ReactNode;
}

export interface IPropsModalUiAlert {
  title: string;
  open: boolean;
  onCloseModal: any;
  handleProcess: any;
}

export interface IMenuItem {
  id: number;
  name: string;
  title?: string;
  path?: string;
  icon: string;
  component?: React.ComponentType;
  form?: boolean;
  parentId?: number;
  children?: IMenuItem[];
}

export interface ISideBarStatic {
  title: string;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

type typeButton = "button" | "submit" | "reset";

export interface ButtonStandardProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: typeButton;
  outline?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  description?: string;
}

export interface IActionPermission {
  id: number;
  action: string;
  moduleId: number;
}

export interface IModulePermission {
  id: number;
  name: string;
  path: string;
  parentId: number | null;
  action: IActionPermission[];
  subModule?: IModulePermission[];
}

export type typeAction = "WRITE" | "DELETE" | "CREATE";

export interface permissionsContextType {
  hasPermission: (action: typeAction) => boolean;
  access: IMenuItem[];
}
export interface IHighTable {
  heightTable?: string;
  children: React.ReactNode;
}
