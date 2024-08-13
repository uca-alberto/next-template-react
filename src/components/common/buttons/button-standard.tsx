import { ButtonStandardProps } from "../../../utils/util.interface";
import { DivJustifyItemsCenter } from "../../layouts/component.divs";
import { IconLoading } from "../icon-loading/icon-loading";

const ButtonStandard = ({
  children,
  disabled = true,
  type = "button",
  loading = false,
  onClick,
  description,
  color = "#DC8436",
}: ButtonStandardProps) => {
  const buttonStyle = {
    backgroundColor: color,
  };
  var colorButton = `min-w-36 py-2.5 bg-[${color}] hover:bg-[#391446] transition duration-300 focus:ring-4 focus:outline-none focus:ring-[${color}]/50 font-medium rounded-lg text-md text-white text-center disabled:bg-[#391446] disabled:text-white`;

  return (
    <div className="text-center">
      <button
        type={type}
        style={buttonStyle}
        className={colorButton}
        onClick={onClick}
        disabled={!disabled}
      >
        <DivJustifyItemsCenter>
          {loading ? <IconLoading /> : children}
        </DivJustifyItemsCenter>
      </button>
      {description && (
        <p className="pt-0.5 text-xs text-slate-500">{description}</p>
      )}
    </div>
  );
};

const ButtonOutLineStandard = ({
  children,
  disabled = true,
  type = "button",
  loading = false,
  onClick,
}: ButtonStandardProps) => {
  return (
    <button
      type={type}
      className="min-w-36 px-5 py-2 border-4 border-[#DC8436] text-[#DC8436] rounded-lg text-md font-medium transition duration-300 hover:bg-[#391446] hover:border-[#391446] hover:text-white focus:ring-4 focus:outline-none focus:ring-[#391446]/50 disabled:bg-[#391446] disabled:border-[#391446] disabled:text-white"
      onClick={onClick}
      disabled={!disabled}
    >
      <DivJustifyItemsCenter>
        {loading ? <IconLoading /> : children}
      </DivJustifyItemsCenter>
    </button>
  );
};

const ButtonWide = ({
  children,
  disabled = true,
  type = "button",
  loading = false,
  onClick,
  description,
  color = "#DC8436",
}: ButtonStandardProps) => {
  const buttonStyle = {
    backgroundColor: color,
  };
  var colorButton = `min-w-36 px-5 py-2.5 bg-[${color}] hover:bg-[#391446] transition duration-300 focus:ring-4 focus:outline-none focus:ring-[${color}]/50 font-medium rounded-lg text-md text-white text-center disabled:bg-[#391446] disabled:text-white`;

  return (
    <div className="text-center">
      <button
        type={type}
        style={buttonStyle}
        className={colorButton}
        onClick={onClick}
        disabled={!disabled}
      >
        <DivJustifyItemsCenter>
          {loading ? <IconLoading /> : children}
        </DivJustifyItemsCenter>
      </button>
      {description && (
        <p className="pt-0.5 text-xs text-slate-500">{description}</p>
      )}
    </div>
  );
};
//bg-[#DA291C] text-white font-medium rounded-md text-sm px-5 py-1 text-center

export { ButtonStandard, ButtonOutLineStandard, ButtonWide };
