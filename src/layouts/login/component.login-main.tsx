import { LoginForm } from "./component.login-form";
//import imageIA from "../../assets/image/bg-purple-maleta.jpg";
import { motion } from "framer-motion";

export const LoginMain = () => {
  return (
    <div className="w-full flex ">
      <div className="w-full p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 justify-center flex-col-reverse">
        <div className="xl:col-span-2 hidden md:flex justify-center items-center bg-gradient-to-br from-[#391446]  to-[#FB963D]/90 from-5% rounded-lg">
          {/*<img
            src={imageIA}
            alt="login-image"
            className="h-auto max-h-[30vh] md:min-h-[85vh] object-cover drop-shadow-xl rounded-lg bg-black/10 "
          />*/}
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
        initial={{ x: "100%" }} // Empieza fuera de la pantalla a la derecha
        animate={{ x: "0%" }} // Se mueve al centro
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
          duration: 3,
        }}
      >
        <div className="w-50 h-56 backdrop-blur-lg ">
          <p className="h-full text-7xl font-bold drop-shadow-lg relative bg-gradient-to-r from-[#ae5a97] to-[#FB963D] text-transparent bg-clip-text">
            Programa de Fidelización
          </p>
        </div>
      </motion.div>
    </div>
  );
};
