import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logoheader.png";
import { InputUi } from "../components/common/component.common";
import { callApis } from "../utils/util.callfetch";
import { toast } from "react-toastify";

export default function RecoverPass() {
  const location = useLocation();
  const [loading] = useState(false);
  const navigateTo = useNavigate();

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .matches(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
        .matches(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
        .matches(/[0-9]/, "La contraseña debe contener al menos un número")
        .matches(/[^a-zA-Z0-9]/, "La contraseña debe contener al menos un símbolo")
        .required("Campo requerido"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Las contraseñas deben coincidir")
        .required("Campo requerido"),
    }),

    onSubmit: async (values) => {
      const id = location.pathname.split("/").pop();
      await callApis({
        base: "SECURITY",
        api: "recover_pass",
        method: "POST",
        body: {
          password: values.newPassword,
          uuid: id,
        },
      }).then((res) => {
        if (!res.status) {
          toast.error("No se pudo restablecer la contraseña");
          throw new Error("No se pudo restablecer la contraseña");
        }
        toast.success(res.message);
        return;
      });
      navigateTo("/login");
    },
  });

  return (
    <>
      <div className="w-full flex p-2 md:p-6 ">
        <div className="w-full flex justify-center items-center rounded-lg backdrop-blur-xl bg-white/40 ">
          <div className="flex w-4/3 min-w-[460px] bg-white/40 shadow-lg rounded-lg py-10">
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
                  <h1 className="text-2xl font-bold text-[#391446]">
                    Recuperar contraseña
                  </h1>
                </div>
              </div>
              <InputUi
                type="password"
                title="Nueva contraseña"
                placeholder="Ingrese su contraseña"
                name="newPassword"
                onChange={formik.handleChange}
                value={formik.values.newPassword}
                error={formik.errors.newPassword}
                touched={formik?.touched?.newPassword}
                disabled={loading}
              />
              <InputUi
                type="password"
                title="Confirmar contraseña"
                placeholder="Ingrese su contraseña"
                name="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                error={formik.errors.confirmPassword}
                touched={formik?.touched?.confirmPassword}
                disabled={loading}
              />
              <button
                type="submit"
                className="w-64 p-3 m-2 text-md font-medium tracking-wide rounded-lg bg-[#391446] text-white hover:bg-[#521D65] transition ease-in-out duration-300 transform hover:scale-110 hover:shadow-lg"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
