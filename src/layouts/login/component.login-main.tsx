import { LoginForm } from "./component.login-form";
//import imageIA from "../../assets/image/bg-purple-maleta.jpg";
import { motion } from "framer-motion";
import login_access from "../../assets/logo_access.png"

export const LoginMain = () => {
  return (
    <div className="w-full flex ">
      <div className="w-full p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 justify-center flex-col-reverse">
        <div className="xl:col-span-2 hidden md:flex justify-center items-center bg-[#222222] rounded-lg">

          <BouncingText />
        </div>
        <div className="w-full flex justify-center ">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

const BouncingText = () => {
  return (
    <div className="w-full rounded-lg flex justify-center items-center h-full bg-black/40">
      <motion.div
        initial={{ x: "100%" }} // Start out of screen to right
        animate={{ x: "0%" }} // Moving to center
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
          duration: 3,
        }}
      >
        <div className="w-50 h-56 backdrop-blur-lg ">
          <p className="h-full text-7xl font-bold drop-shadow-lg relative text-[#ED7004]  bg-clip-text">
            Programa de Fidelización
          </p>
          <div className="flex justify-center items-center">
            <img
              src={login_access}
              alt="login-image"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
