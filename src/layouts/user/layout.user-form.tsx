import { memo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RiArrowLeftLine } from "@remixicon/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SectionBgWhite80 } from "../../components/layouts/component.section-bg-80";
import { TitleSection } from "../../components/layouts/component.title-section";
import { getIdRoutes } from "../../utils/util.routes-process";
import { InputUi, SelectUi, ToggleUi } from "../../components/common/component.common";
import { DivJustifyItemsCenter } from "../../components/layouts/component.divs";
import { callApis } from "../../utils/util.callfetch";
import { useQuery } from "@tanstack/react-query";
import { FormikContainer } from "../../components/layouts/component.form";
import { useToast } from "../../contexts/toastProvider";
const MemoTitleSection = memo(TitleSection);

export default function LayouotUserForm() {
  const { pushNotify } = useToast();

  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [uuidUser, setUuidUser] = useState("");
  const [loanding, setLoanding] = useState(false);
  const [verifyAccount, setVerifyAccount] = useState(true);

  useEffect(() => {
    const userUUID = getIdRoutes(location.pathname);
    setTitle(userUUID ? "Editar Usuario" : "Crear Usuario");
    setUuidUser(userUUID ?? "");

    if (userUUID) {
      callApis({
        base: "USER",
        api: "get",
        method: "GET",
        useToken: true,
        params: { id: userUUID },
      }).then((res) => {
        setVerifyAccount(!res.response.user.verifyAccount);
        formik.setValues({
          name: res.response.user.name,
          lastName: res.response.user.lastName,
          email: res.response.user.email,
          status: res.response.user.status,
          verifyAccount: res.response.user.verifyAccount,
          rolId: res.response.user.rolId,
        });
      });
    }
  }, []);

  const handleFetch = async () => {
    return await callApis({
      base: "ROLES",
      api: "listline",
      method: "GET",
      useToken: true,
    }).then((res) => {
      return res.response.list.map((rol: any) => {
        return {
          value: rol.id,
          label: rol.name,
        };
      });
    });
  };

  const { data: roles } = useQuery({
    queryKey: ["role-list"],
    queryFn: () => handleFetch(),
  });

  const handleBack = () => {
    navigate("/user");
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      status: false,
      verifyAccount: false,
      rolId: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Nombre del usuario requerido")
        .max(30, "El nombre no puede tener más de 30 caracteres"),
      lastName: Yup.string()
        .max(30, "El apellido no puede tener más de 30 caracteres")
        .required("Apellido del usuario requerido"),
      email: Yup.string()
        .email("El correo no es válido")
        .required("El correo es requerido")
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-z.-]+\.(com|es)$/,
          "El correo no cumple los parametros requeridos"
        )
        .max(30, "El correo no puede tener más de 30 caracteres"),
      password: uuidUser
        ? Yup.string()
            .min(8, "La contraseña debe tener al menos 8 caracteres")
            .matches(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
            .matches(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
            .matches(/[0-9]/, "La contraseña debe contener al menos un número")
            .matches(/[^a-zA-Z0-9]/, "La contraseña debe contener al menos un símbolo")
        : Yup.string()
            .required("Contraseña es requerida")
            .min(8, "La contraseña debe tener al menos 8 caracteres")
            .matches(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
            .matches(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
            .matches(/[0-9]/, "La contraseña debe contener al menos un número")
            .matches(/[^a-zA-Z0-9]/, "La contraseña debe contener al menos un símbolo"),
      rolId: Yup.number().required("Campo requerido").moreThan(0, "Debe elegir un rol"),
    }),

    onSubmit: async (values: any) => {
      setLoanding(true);
      delete values.verifyAccount;
      values.rolId = parseInt(values.rolId);

      if (uuidUser) values.id = uuidUser;

      return await callApis({
        base: "USER",
        api: "upsert",
        method: "POST",
        useToken: true,
        body: values,
      }).then((res) => {
        const { message = "" } = res;
        setLoanding(false);
        if (res.status === 201) {
          pushNotify(message, "success");
          navigate("/user");
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
                placeholder="Ingrese el nombre"
                name="name"
                value={formik.values.name}
                error={formik.errors.name}
                onChange={formik.handleChange}
                touched={formik?.touched?.name ?? false}
                disabled={loanding}
              />
            </div>
            <div className="col-span-2">
              <InputUi
                title="Apellido"
                placeholder="Ingrese el apellido"
                name="lastName"
                value={formik.values.lastName}
                error={formik.errors.lastName}
                onChange={formik.handleChange}
                touched={formik?.touched?.lastName ?? false}
                disabled={loanding}
              />
            </div>
            <div className="col-span-2">
              <InputUi
                title="Correo"
                placeholder="example@example.com"
                name="email"
                value={formik.values.email}
                error={formik.errors.email}
                onChange={formik.handleChange}
                touched={formik?.touched?.email ?? false}
                disabled={!verifyAccount}
              />
            </div>

            <div className="col-span-2">
              <SelectUi
                title="Roles"
                placeholder="Seleccione un rol"
                name="rolId"
                value={formik.values.rolId}
                error={formik.errors.rolId}
                onChange={formik.handleChange}
                options={roles}
                touched={formik?.touched?.rolId}
                disabled={loanding}
              />
            </div>
            <div className="col-span-2">
              <InputUi
                title="Contraseña"
                placeholder="Ingrese una nueva contraseña"
                name="password"
                value={formik.values.password}
                error={formik.errors.password}
                onChange={formik.handleChange}
                type="password"
                touched={formik?.touched?.password ?? false}
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
