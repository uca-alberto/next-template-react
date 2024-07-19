import { ReactNode } from "react";

interface IPropsChildrenLayouts {
  children?: ReactNode;
  title?: string;
}

export const LayautBgChart = ({ children, title }: IPropsChildrenLayouts) => (
  <div className=" w-full flex flex-col items-center p-3 m-3 border border-white-30 rounded-md shadow-lg">
    {title && (
      <div className="h-8 ">
        <span>{title}</span>
      </div>
    )}
    {children}
  </div>
);
