import { IHighTable } from "../../../utils/util.interface";

export const TableHighComponent = ({ heightTable, children }: IHighTable) => {
  switch (heightTable) {
    case "sm":
      return (
        <div className="w-full min-h-[200] overflow-x-auto scroll-smooth ">
          {children}
        </div>
      );
    case "md":
      return (
        <div className="w-full min-h-[300px] overflow-x-auto scroll-smooth ">
          {children}
        </div>
      );
    case "lg":
      return (
        <div className="w-full min-h-[500px] overflow-x-auto scroll-smooth ">
          {children}
        </div>
      );
    case "auto":
      return (
        <div className="w-full max-h-[500px] overflow-x-auto scroll-smooth ">
          {children}
        </div>
      );
    case "auto-max":
      return <div className="w-full overflow-x-auto scroll-smooth ">{children}</div>;
    default:
      return (
        <div className="w-full min-h-[500px] overflow-x-auto scroll-smooth ">
          {children}
        </div>
      );
  }
};
