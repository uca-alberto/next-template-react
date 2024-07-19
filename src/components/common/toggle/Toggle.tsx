import { ChangeEvent, useState } from "react";

type Props = {
  name: string;
  label?: string;
  value: boolean;
  disabled?: boolean;
  row?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const ToggleButton = ({
  name,
  label,
  value = false,
  disabled = false,
  row = true,
  onChange,
}: Props) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center`}>
      {!row && label && (
        <div className="text-center">
          <span className="text-md font-medium text-[#391446] ">{label}</span>
        </div>
      )}
      <div className="px-2 flex">
        <label className="inline-flex items-center cursor-pointer">
          <input
            id={name}
            name={name}
            type="checkbox"
            className="sr-only peer"
            checked={value}
            onChange={onChange}
            disabled={disabled}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#DC8436]/60  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-[#DC8436] disabled:opacity-10 "></div>
          {row && label && (
            <span className="ml-2 text-md font-medium text-[#391446] ">{label}</span>
          )}
        </label>
      </div>
    </div>
  );
};
const Toggle = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="flex">
        <label className="inline-flex relative items-center mr-5 cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={enabled} readOnly />
          <div
            onClick={() => {
              setEnabled(!enabled);
            }}
            className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
          ></div>
          <span className="ml-2 text-sm font-medium text-gray-900">ON</span>
        </label>
      </div>
    </div>
  );
};

export { ToggleButton, Toggle };
