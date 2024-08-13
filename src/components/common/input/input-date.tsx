interface InputStandardProps {
  title?: string;
  placeholder: string;
  name: string;
  value?: string;
  disabled?: boolean;
  errorView?: boolean;
  error?: any;
  isViewError?: boolean;
  touched?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  color?: string;
}

export const InputDateStandard = ({
  title = "",
  placeholder,
  name,
  value = "",
  disabled = true,
  errorView = true,
  error = "",
  isViewError = true,
  touched = false,
  onChange,
  color = "#4f4f4f",
}: InputStandardProps) => {
  const inputColor = `text-[#391446] font-medium text-md `;
  const style = {
    color: color,
  };
  return (
    <>
      <div className="w-full mt-2 mb-2">
        {title && (
          <label style={style} className={inputColor}>
            {title}
          </label>
        )}
        <input
          type="date"
          id={name}
          name={name}
          className="w-full px-4 py-2 mt-1 text-sm text-[#393e3f] bg-white/60 placeholder-gray-400 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#FB963D] focus:border-[#FB963D] disabled:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoComplete="off"
        />
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
