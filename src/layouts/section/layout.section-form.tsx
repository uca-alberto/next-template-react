import { memo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RiArrowLeftLine } from "@remixicon/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SectionBgWhite80 } from "../../components/layouts/component.section-bg-80";
import { TitleSection } from "../../components/layouts/component.title-section";
import { getIdRoutes } from "../../utils/util.routes-process";
import { InputUi, ToggleUi } from "../../components/common/component.common";
import { DivJustifyItemsCenter } from "../../components/layouts/component.divs";
import { callApis } from "../../utils/util.callfetch";
import { FormikContainer } from "../../components/layouts/component.form";
import { useToast } from "../../contexts/toastProvider";
const MemoTitleSection = memo(TitleSection);

export default function LayoutSectionForm() {
  const { pushNotify } = useToast();

  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [uuidUser, setUuidUser] = useState("");
  const [loanding, setLoanding] = useState(false);

  useEffect(() => {
    const userUUID = getIdRoutes(location.pathname);
    setTitle(userUUID ? "Editar Sección" : "Crear Sección");
    setUuidUser(userUUID ?? "");

    if (userUUID) {
      callApis({
        base: "SECTION",
        api: "getById",
        method: "GET",
        useToken: true,
        params: { id: userUUID },
      }).then((res) => {
        formik.setValues({
          name: res.response.title,
          quantity: res.response.quantity,

          status: res.response.status,
        });
      });
    }
  }, []);

  const handleBack = () => {
    navigate("/section");
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      quantity: "",

      status: false,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Nombre del usuario requerido")
        .max(30, "El nombre no puede tener más de 30 caracteres"),
      quantity: Yup.number()
        .typeError("El valor debe ser un número")
        .min(1, "El valor minimo de tarjetas es uno")
        .required("Numero de tarjetas requerido"),
    }),

    onSubmit: async (values: any) => {
      setLoanding(true);

      values.rolId = parseInt(values.rolId);

      if (uuidUser) values.id = uuidUser;

      return await callApis({
        base: "SECTION",
        api: "edit",
        method: "PUT",
        useToken: true,
        body: values,
        params: { id: uuidUser },
      }).then((res) => {
        const { message = "" } = res;
        setLoanding(false);
        if (res.status == 200) {
          pushNotify(message, "success");
          navigate("/section");
          return;
        }
        pushNotify(message ?? "Ha ocurrido un error", "error");
        return;
      });
    },
  });

  return (
    <>
      <MemoTitleSection
        title={title}
        icon={<RiArrowLeftLine />}
        onClick={handleBack}
        labelButton={"Atras"}
      />
      <SectionBgWhite80>
        <FormikContainer handleSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-4">
            <div className="col-span-2">
              <InputUi
                title="Nombre"
                placeholder="Mejores ofertas"
                name="name"
                value={formik.values.name}
                error={formik.errors.name}
                onChange={formik.handleChange}
                touched={formik?.touched?.name ?? false}
                disabled={!loanding}
              />
            </div>
            <div className="col-span-2">
              <InputUi
                title="Número de Tarjetas"
                placeholder="Ingrese la cantidad de tarjetas"
                name="quantity"
                type="number"
                value={formik.values.quantity}
                error={formik.errors.quantity}
                onChange={formik.handleChange}
                touched={formik?.touched?.quantity ?? false}
                disabled={loanding}
              />
            </div>

            <div className="col-span-2">
              <DivJustifyItemsCenter>
                <ToggleUi
                  name="status"
                  label="Estado"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  disabled={loanding}
                />
              </DivJustifyItemsCenter>
            </div>
          </div>
        </FormikContainer>
      </SectionBgWhite80>
    </>
  );
}
