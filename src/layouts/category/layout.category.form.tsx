import { memo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RiArrowLeftLine } from "@remixicon/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SectionBgWhite80 } from "../../components/layouts/component.section-bg-80";
import { TitleSection } from "../../components/layouts/component.title-section";
import { getIdRoutes } from "../../utils/util.routes-process";
import { InputUi } from "../../components/common/component.common";
import { callApis } from "../../utils/util.callfetch";
import { FormikContainer } from "../../components/layouts/component.form";
import { useToast } from "../../contexts/toastProvider";
import { InputSelectStandard } from "../../components/common/input/input-select";
import ImageUpload from "../../components/common/input/input-image";
import { format } from "date-fns";
import TextareaUi from "../../components/common/input/input-text-area";
const MemoTitleSection = memo(TitleSection);

export default function LayouotCategoryForm() {
  const { pushNotify } = useToast();

  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [uuid, setUuid] = useState("");
  const [loanding, setLoanding] = useState(false);
  const formik = useFormik({
    initialValues: {
      code: "",
      name: "",
      description: "",
      details: "",
      initialStayTime: 0,
      finalStayTime: 0,
      status: 2,
      createdAt: "",
      createdBy: "",
      updatedAt: "",
      updatedBy: "",
      imageUrl: "",
      imageUrlApp: "",
    },
    validationSchema: Yup.object({
      code: Yup.string(),
      name: Yup.string()
        .required("Campo requerido")
        .max(100, "Máximo 100 caracteres"),
      description: Yup.string()
        .required("Campo requerido")
        .max(100, "Máximo 100 caracteres"),
      details: Yup.string().required("Campo requerido"),
      initialStayTime: Yup.number().required("Campo requerido").min(0),
      finalStayTime: Yup.number()
        .required("Campo requerido")
        .min(1, "El tiempo de permanencia debe ser mayor a 0"),
      status: Yup.number().required("Campo requerido"),
      createdAt: Yup.string(),
      updatedAt: Yup.string(),
      createdBy: Yup.string(),
      updatedBy: Yup.string(),
      imageUrl: Yup.string().required("Campo requerido"),
      imageUrlApp: Yup.string().required("Campo requerido"),
    }),

    onSubmit: async (values: any) => {
      setLoanding(true);
      let data = { ...values };
      data.imageUrl = values.imageUrl.includes("file-") ? values.imageUrl : "";
      data.imageUrlApp = values.imageUrlApp.includes("file-")
        ? values.imageUrlApp
        : "";
      if (values.initialStayTime > values.finalStayTime) {
        pushNotify("El rango de permanencia es incorrecto.", "error");
        setLoanding(false);
        return;
      }

      if (uuid) {
        return await callApis({
          base: "CATEGORY",
          api: "update",
          method: "PUT",
          useToken: true,
          body: data,
          params: { id: uuid },
        }).then((res) => {
          const { message = "" } = res;
          setLoanding(false);
          if (res.status === 200) {
            pushNotify(message, "success");
            navigate("/category");
            return;
          }
          pushNotify(message ?? "Ha ocurrido un error", "error");
          return;
        });
      }
      data.code = generateCode(data.name);
      return await callApis({
        base: "CATEGORY",
        api: "create",
        method: "POST",
        useToken: true,
        body: data,
      }).then((res) => {
        const { message = "" } = res;
        setLoanding(false);
        if (res.status === 201) {
          pushNotify(message, "success");
          navigate("/category");
          return;
        }
        pushNotify(message ?? "Ha ocurrido un error", "error");
        return;
      });
    },
  });

  console.log(formik.errors);
  useEffect(() => {
    const uUID = getIdRoutes(location.pathname);
    setTitle(uUID ? "Editar Categoría" : "Nueva Categoría");
    setUuid(uUID ?? "");

    if (uUID) {
      callApis({
        base: "CATEGORY",
        api: "getById",
        method: "GET",
        useToken: true,
        params: { id: uUID },
      }).then((res) => {
        formik.setValues({
          code: res.response.code,
          name: res.response.name,
          description: res.response.description,
          details: res.response.details,
          initialStayTime: res.response.initialStayTime,
          finalStayTime: res.response.finalStayTime,
          status:
            res.response.status === 0 ? 1 : res.response.status === 1 ? 2 : 1,
          createdAt: format(res?.response?.createdAt, "dd/MM/yyyy"),
          updatedAt: format(res?.response?.updatedAt, "dd/MM/yyyy"),
          createdBy: res.response.createdBy,
          updateBy: res.response.updateBy,
          imageUrl: res.response.imageUrl,
          imageUrlApp: res.response.imageUrlApp,
        });
      });
    }
  }, []);
  const generateCode = (benefitName: string) => {
    const getInitials = (name: string) => {
      return name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase())
        .join("")
        .slice(0, 4);
    };

    const initials = getInitials(benefitName);
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Mes empieza en 0
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const code = `CAT-${initials}-${month}${day}${hours}${minutes}${seconds}`;
    return code;
  };

  const handleBack = () => {
    navigate("/category");
  };

  const handleFetchUpload = async (file: any, type: number) => {
    if (!file) {
      pushNotify("Seleccione una imagen", "error");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("http://localhost:7000/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        if (type == 1) {
          formik.setFieldValue("imageUrl", result.filename);
        } else {
          formik.setFieldValue("imageUrlApp", result.filename);
        }
      }
    } catch (error) {
      pushNotify("Error uploading file", "error");
    }
  };

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
          <div className="col-span-12" style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "35px", fontWeight: "bold" }}>
              Datos Generales
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-4">
            <div className="col-span-2">
              <InputUi
                title="Código*"
                placeholder=""
                name="code"
                value={formik.values.code}
                error={formik.errors.code}
                onChange={formik.handleChange}
                touched={formik?.touched?.code ?? false}
                disabled={true}
              />
            </div>
            <div className="col-span-2">
              <InputUi
                title="Nombre*"
                placeholder="Ingrese el Nombre"
                name="name"
                value={formik.values.name}
                error={formik.errors.name}
                onChange={formik.handleChange}
                touched={formik?.touched?.name ?? false}
                disabled={loanding}
              />
            </div>
            <div className="col-span-2">
              <InputSelectStandard
                title="Estado*"
                name="status"
                placeholder="Seleccione un estado"
                value={formik.values.status.toString()}
                options={[
                  { label: "Inactivo", value: 1 },
                  { label: "Activo", value: 2 },
                ]}
                onChange={(e: any) => {
                  formik.setFieldValue("status", parseInt(e.target.value));
                }}
                disabled={uuid ? false : true}
              />
            </div>
            <div className="col-span-6">
              <InputUi
                title="Descripción*"
                placeholder="Descripción"
                name="description"
                value={formik.values.description}
                error={formik.errors.description}
                onChange={formik.handleChange}
                touched={formik?.touched?.description ?? false}
              />
            </div>
            <div className="col-span-6 flex flex-col">
              <span className="text-[#391446] font-medium text-md ">
                Detalle
              </span>
              <TextareaUi
                name="details"
                value={formik.values.details}
                onChangeArea={formik.handleChange}
                error={formik.errors.details}
                placeholder="Ingresar detalles"
                disabled={loanding}
                touched={formik?.touched?.details ?? false}
              />
            </div>
            <div className="col-span-2">
              <InputUi
                title="Fecha creación"
                placeholder="12/07/2024"
                name="fecha_creacion"
                value={formik.values.createdAt}
                error={formik.errors.createdAt}
                onChange={formik.handleChange}
                touched={formik?.touched?.createdAt ?? false}
                disabled={true}
              />
            </div>
            <div className="col-span-2">
              <InputUi
                title="Fecha modificación"
                placeholder="12/07/2024"
                name="fecha_modificacion"
                value={formik.values.updatedAt}
                error={formik.errors.updatedAt}
                onChange={formik.handleChange}
                touched={formik?.touched?.updatedAt ?? false}
                disabled={true}
              />
            </div>
            <div className="col-span-2">
              <InputUi
                title="Creado por"
                placeholder="Creado por"
                name="fecha_modificacion"
                value={formik.values.createdBy}
                error={formik.errors.createdBy}
                onChange={formik.handleChange}
                touched={formik?.touched?.createdBy ?? false}
                disabled={true}
              />
            </div>
          </div>
          <div
            className="col-span-12"
            style={{ textAlign: "start", color: "#DC8436" }}
          >
            <h1 style={{ fontSize: "25px" }}>Tiempo de permanencia</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-4">
            <div className="col-span-2">
              <InputUi
                type="number"
                title="Desde*"
                placeholder="0"
                name="initialStayTime"
                value={formik.values.initialStayTime}
                error={formik.errors.initialStayTime}
                onChange={formik.handleChange}
                touched={formik?.touched?.initialStayTime ?? false}
              />
            </div>
            <div className="col-span-2">
              <InputUi
                type="number"
                title="Hasta*"
                placeholder="0"
                name="finalStayTime"
                value={formik.values.finalStayTime}
                error={formik.errors.finalStayTime}
                onChange={formik.handleChange}
                touched={formik?.touched?.finalStayTime ?? false}
              />
            </div>
            <div className="col-span-1">
              <ImageUpload
                id="imageUrl"
                title="Imagen Categoría*"
                defaultValue={formik.values.imageUrl}
                onImageSelect={(item) => {
                  handleFetchUpload(item, 1);
                }}
                error={formik.errors.imageUrl}
                touched={formik?.touched?.imageUrl ?? false}
                isEdit={uuid ? true : false}
                titleLabel="Imagen Categoría"
              />
            </div>
            <div className="col-span-1">
              <ImageUpload
                id="imageUrlApp"
                title="Imagen Categoría App*"
                defaultValue={formik.values.imageUrlApp}
                onImageSelect={(item) => {
                  handleFetchUpload(item, 2);
                }}
                error={formik.errors.imageUrlApp}
                touched={formik?.touched?.imageUrlApp ?? false}
                isEdit={uuid ? true : false}
                titleLabel="Imagen Categoría App"
              />
            </div>
            <div className="col-span-6">
              <span className="">
                Nota: si dos categorías cubren el mismo rango se le asigna la
                categoría de la última fecha del usuario.
              </span>
            </div>
          </div>
        </FormikContainer>
      </SectionBgWhite80>
    </>
  );
}
