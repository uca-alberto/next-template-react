import { IPropsChildrenLayouts, IpropsBgLayouts } from "../../utils/util.interface";

const SectionBgWhite80 = ({ children }: IPropsChildrenLayouts) => {
  return (
    <div className="grid grid-cols-1 bg-white/80 py-3 px-6 my-4 rounded-lg">
      {children}
    </div>
  );
};

const SectionBgPurple80 = ({ children }: IPropsChildrenLayouts) => {
  return (
    <div className="grid grid-cols-1 bg-[#391446]/80 py-3 px-6 my-4 rounded-lg">
      {children}
    </div>
  );
};

const SectionBgOrage80 = ({ children }: IPropsChildrenLayouts) => {
  return (
    <div className="grid grid-cols-1 bg-[#FF7A00]/80 py-3 px-6 my-4 rounded-lg">
      {children}
    </div>
  );
};

const SectionBgBlack80 = ({ children }: IPropsChildrenLayouts) => {
  return (
    <div className="grid grid-cols-1 bg-[#000000]/80 py-3 px-6 my-4 rounded-lg">
      {children}
    </div>
  );
};

const SectionBg = ({ children, color }: IpropsBgLayouts) => {
  return (
    <div className={`grid grid-cols-1 bg-[#${color}]/80 py-3 px-6 my-4 rounded-lg`}>
      {children}
    </div>
  )
}

export { SectionBgWhite80, SectionBgPurple80, SectionBgOrage80, SectionBgBlack80, SectionBg };
