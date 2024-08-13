const TextareaUi = ({
  placeholder,
  name,
  value = "",
  touched = false,
  disabled = false,
  errorView = true,
  error = "",
  isViewError = true,
  onChangeArea,
}: any) => {
  return (
    <div>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={onChangeArea}
        value={value}
        disabled={disabled}
        autoComplete="off"
        rows={5}
        className={`w-full px-4 py-2 mt-1 text-sm text-[#393e3f] bg-white/60 placeholder-gray-400 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#FB963D] focus:border-[#FB963D] disabled:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60`}
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
  );
};

export default TextareaUi;
