import { useState } from "react";
import { RiContrast2Line, RiContrast2Fill } from "@remixicon/react";
import { InputStandardProps } from "../../../utils/util.interface";

const InputStandard = ({
  title,
  placeholder,
  name,
  value = "",
  touched = false,
  disabled = false,
  errorView = true,
  error = "",
  type = "text",
  isViewError = true,
  onChange,
  color = "#4f4f4f",
}: InputStandardProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const style = {
    color: color,
  };
  var inputColor = `text-[#391446] font-medium text-md `;
  return (
    <>
      <div className="w-full mt-1 mb-2">
        <div className="pr-1">
          {title && (
            <label style={style} className={inputColor}>
              {title}
            </label>
          )}
        </div>
        <div className="relative ">
          <input
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            id={name}
            name={name}
            className="w-full px-4 py-2 mt-1 text-sm text-[#393e3f] bg-white/60 placeholder-gray-400 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#FB963D] focus:border-[#FB963D] disabled:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            disabled={disabled}
            autoComplete="off"
          />
          {type === "password" && (
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <RiContrast2Fill color={color} />
              ) : (
                <RiContrast2Line color={color} />
              )}
            </button>
          )}
        </div>
        {isViewError && (
          <div className="min-h-7 max-h-9 flex justify-end items-center mt-1">
            {errorView && touched && (
              <p className="text-red-400 text-sm font-mediun leading-5">
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export { InputStandard };
