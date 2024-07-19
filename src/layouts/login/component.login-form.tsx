import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputStandard } from "../../components/common/input/input-standard";
import { useAuth } from "../../contexts/authProvider";

import logo from "../../assets/logoheader.png";

export const LoginForm = () => {
  const { loginAction } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Correo invalido")
        .required("Campo requerido")
        .max(30, "El correo no puede tener mas de 30 caracteres"),
      password: Yup.string()
        .required("Campo requerido")
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .matches(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
        .matches(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
        .matches(/[0-9]/, "La contraseña debe contener al menos un número")
        .matches(/[^a-zA-Z0-9]/, "La contraseña debe contener al menos un símbolo"),
    }),

    onSubmit: async (values) => {
      setLoading(true);
      await loginAction(values);
      setLoading(false);
    },
  });

  return (
    <>
      <div className="w-full flex items-center bg-white/85 shadow-xl rounded-lg px-10">
        <form
          onSubmit={formik.handleSubmit}
          className={`w-full flex flex-col justify-center items-center px-4 md:px-8  ${
            !loading ? "" : " animate-pulse "
          }`}
        >
          <div className="flex flex-col justify-center items-center my-4">
            <div className="pb-8">
              <img src={logo} alt="loyalty-logo" />
            </div>
            <div className="py-2 mb-3">
              <h1 className="text-2xl font-bold text-[#391446]">Inicio de sesión</h1>
            </div>
          </div>
          <InputStandard
            title="Correo"
            placeholder="Ingrese su correo"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
            touched={formik.touched.email}
            disabled={loading}
          />
          <InputStandard
            type="password"
            title="Contraseña"
            placeholder="Ingrese su contraseña"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
            touched={formik.touched.password}
            disabled={loading}
          />
          <button
            type="submit"
            className="w-64 p-3 m-2 text-md font-medium tracking-wide rounded-lg bg-[#391446] text-white hover:bg-[#521D65] transition ease-in-out duration-300 transform hover:scale-110 hover:shadow-lg"
          >
            Iniciar sesión
          </button>

          <div className="flex justify-center items-center mt-6">
            <button
              type="button"
              className="w-64 p-3 m-2 text-md rounded-lg text-[#391446] font-medium hover:text-[#521D65] transition ease-in-out duration-300 transform hover:scale-110 hover:shadow-lg"
              onClick={() => navigateTo("/recover")}
            >
              Recuperar contraseña
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
