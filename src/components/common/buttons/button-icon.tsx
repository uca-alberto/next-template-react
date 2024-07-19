import React, { useState, useEffect } from "react";
import { ButtonIconProps } from "../../../utils/util.interface";

type IconProps = "apple" | "google" | "github";
interface ButtonIconSingInProps {
  icon?: IconProps;
  onClick: () => void;
  disabled?: boolean;
}

const ButtonIcon = (props: ButtonIconProps) => {
  const { children, onClick, disabled, type = "button" } = props;
  return (
    <button
      type={type}
      className="py-1 px-3 mx-2 bg-[#391446] hover:bg-[#DC8436]/90 transition duration-300 focus:ring-4 focus:outline-none focus:ring-[#DC8436]/50 font-medium rounded-lg text-md text-white text-center disabled:bg-[#391446]/60 disabled:text-white"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const ButtonOutlineIcon = (props: ButtonIconProps) => {
  const { children, onClick, disabled, type = "button" } = props;

  return (
    <button
      type={type}
      className="py-1 px-3 mx-2 border-4 border-[#DC8436] rounded-lg text-md text-[#DC8436] font-medium transition duration-300 hover:bg-[#391446] hover:border-[#391446] hover:text-white focus:ring-4 focus:outline-none focus:ring-[#391446]/50 disabled:bg-[#391446] disabled:border-[#391446] disabled:text-white"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const ButtonIconSingIn = ({
  icon = "google",
  onClick,
  disabled,
}: ButtonIconSingInProps) => {
  const [svgIcon, setSvgIcon] = useState<React.ReactNode | null>(null);
  const [svgTitle, setSvgTitle] = useState<string>("");

  useEffect(() => {
    switch (icon) {
      case "apple":
        setSvgTitle("Apple");
        setSvgIcon(<IconAppe />);
        break;
      case "google":
        setSvgTitle("Google");
        setSvgIcon(<IconGoogle />);
        break;
      case "github":
        setSvgTitle("Github");
        setSvgIcon(<IconGithub />);
        break;
      default:
        setSvgTitle("Google");
        setSvgIcon(<IconGoogle />);
    }
  }, []);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55"
    >
      {svgIcon}
      Sign in with {svgTitle}
    </button>
  );
};

const ButtonToggle = ({
  setOpen,
  open,
}: {
  setOpen: (value: boolean) => void;
  open: boolean;
}) => {
  return (
    <>
      <button
        className="pt-1 px-3 m-3 rounded-md text-[#391446] transition ease-in-out duration-300 hover:bg-white/40 hover:text-[#FB963D] hover:backdrop-blur"
        onClick={() => setOpen(!open)}
      >
        <p className="font-bold  text-2xl">{open ? ">" : "<"}</p>
      </button>
    </>
  );
};

const IconAppe = () => (
  <svg
    className="w-5 h-5 me-2 -ms-1"
    aria-hidden="true"
    focusable="false"
    data-prefix="fab"
    data-icon="apple"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
  >
    <path
      fill="currentColor"
      d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
    ></path>
  </svg>
);

const IconGoogle = () => (
  <svg
    className="w-4 h-4 me-2"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 18 19"
  >
    <path
      fillRule="evenodd"
      d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
      clipRule="evenodd"
    />
  </svg>
);

const IconGithub = () => (
  <svg
    className="w-4 h-4 me-2"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
      clipRule="evenodd"
    />
  </svg>
);

export { ButtonIcon, ButtonIconSingIn, ButtonToggle };
