import { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Props, ToastContextType } from "../utils/util.interface";

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within an ToastProvider");
  return context;
};

type typeNotify = "error" | "success" | "warning" | "info";

export const ToastProvider = ({ children }: Props) => {
  const pushNotify = (message: string, type: typeNotify) => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "warning":
        toast.warn(message);
        break;
      case "info":
        toast.info(message);
        break;
    }
  };

  return (
    <ToastContext.Provider value={{ pushNotify }}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        stacked
      />
    </ToastContext.Provider>
  );
};
