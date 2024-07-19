import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logoheader.png";
import { callApis } from "../utils/util.callfetch";
import { toast } from "react-toastify";

export default function VerifyAccount() {
  const location = useLocation();
  const [loading] = useState(false);
  const navigateTo = useNavigate();
  const id = location.pathname.split("/").pop();
  useEffect(() => {
    callApis({
      base: "SECURITY",
      api: "verify_account",
      method: "POST",
      body: {
        id: id,
      },
    }).then((res) => {
      if (res.status > 299) {
        toast.error("No se pudo verificar la cuenta");
        throw new Error("No se pudo verificar la cuenta");
      }
      toast.success(res.message);
      return;
    });
  }, []);

  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {
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
                    Su cuenta ha sido verificada
                  </h1>
                </div>
              </div>

              <button
                type="submit"
                className="w-64 p-3 m-2 text-md font-medium tracking-wide rounded-lg bg-[#391446] text-white hover:bg-[#521D65] transition ease-in-out duration-300 transform hover:scale-110 hover:shadow-lg"
              >
                Iniciar sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
