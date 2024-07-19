import { IPropsChildrenLayouts } from "../../utils/util.interface";

const DivJustifyItemsCenter = ({ children }: IPropsChildrenLayouts) => (
  <div className="w-full h-full flex justify-center items-center">{children}</div>
);

const DivJustifyEndItemsCenter = ({ children }: IPropsChildrenLayouts) => (
  <div className="w-full h-full flex justify-end items-center">{children}</div>
);

const DivJustifyStartItemsCenter = ({ children }: IPropsChildrenLayouts) => (
  <div className="w-full h-full flex justify-start items-center">{children}</div>
);

const DivJustifyBetweenItemsCenter = ({ children }: IPropsChildrenLayouts) => (
  <div className="w-full h-full flex justify-between items-center">{children}</div>
);

const DivBgWhiteRounded = ({ children }: IPropsChildrenLayouts) => (
  <div className="bg-white/80 rounded-lg px-3 py-4 my-4">{children}</div>
);

export {
  DivBgWhiteRounded,
  DivJustifyItemsCenter,
  DivJustifyEndItemsCenter,
  DivJustifyStartItemsCenter,
  DivJustifyBetweenItemsCenter,
};
