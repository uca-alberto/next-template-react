import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputStandard } from "../components/common/input/input-standard";
import logo from "../assets/logoheader.png";
import { callApis } from "../utils/util.callfetch";
import { toast } from "react-toastify";

export default function Recover() {
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Correo invalido").required("Campo requerido"),
    }),

    onSubmit: async (values) => {
      setLoading(true);

      await callApis({
        base: "SECURITY",
        api: "rescue_password",
        method: "POST",
        body: {
          email: values.email,
        },
      }).then((res) => {
        if (res.status == 201) {
          toast.success(res.message);
          navigateTo("/login");
          return;
        }

        setLoading(false);
        toast.error("No se pudo enviar el correo");

        return;
      });
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
              <InputStandard
                title="Correo"
                placeholder="Ingrese su correo"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.errors.email}
                touched={formik?.touched?.email}
                disabled={loading}
              />
              <button
                type="submit"
                className="w-64 p-3 m-2 text-md font-medium tracking-wide rounded-lg bg-[#391446] text-white hover:bg-[#521D65] transition ease-in-out duration-300 transform hover:scale-110 hover:shadow-lg"
              >
                Enviar correo
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
