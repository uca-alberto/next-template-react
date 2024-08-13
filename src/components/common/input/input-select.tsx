import { InputSelectStandardProps } from "../../../utils/util.interface";

export const InputSelectStandard = (props: InputSelectStandardProps) => {
  const {
    name,
    title,
    placeholder,
    value = "",
    error = "",
    touched = false,
    errorView = true,
    disabled = false,
    isViewError = true,
    options,
    onChange,
    setInfo,
    color = "#4f4f4f",
  } = props;
  if (name == "segmentId" && value == "2") {
    setInfo?.(name);
  }

  if (name == "bannerSectionId" && value == "1") {
    setInfo?.(name);
  }
  const style = {
    color: color,
  };
  var inputColor = `text-[#391446] font-medium text-md`;

  return (
    <div className="w-full mt-1 mb-2">
      {title && (
        <label style={style} className={inputColor} htmlFor="name">
          {title}
        </label>
      )}
      <select
        id={name}
        itemType="text"
        name={name}
        className="w-full px-4 py-2 mt-1 text-sm text-[#393e3f] bg-white/60 placeholder-gray-400 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#FB963D] focus:border-[#FB963D] disabled:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
        onChange={onChange}
        value={value}
        disabled={disabled}
      >
        <option value="0" className="text-gray-300 ">
          {placeholder ?? "Seleccione una opcion"}
        </option>
        {options?.length &&
          options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      {isViewError && (
        <div className="h-6 flex justify-end items-center mt-1">
          {errorView && touched && (
            <p className="text-red-400 text-sm font-mediun leading-5">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
