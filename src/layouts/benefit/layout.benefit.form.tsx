import { memo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RiArrowLeftLine } from "@remixicon/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SectionBgWhite80 } from "../../components/layouts/component.section-bg-80";
import { TitleSection } from "../../components/layouts/component.title-section";
import { getIdRoutes } from "../../utils/util.routes-process";
import { InputDateUi, InputUi } from "../../components/common/component.common";
import { callApis } from "../../utils/util.callfetch";
import { FormikContainer } from "../../components/layouts/component.form";
import { useToast } from "../../contexts/toastProvider";
import { InputSelectStandard } from "../../components/common/input/input-select";
import ImageUpload from "../../components/common/input/input-image";
import InputSelectMulti from "../../components/common/input/input-select-multi";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import TextareaUi from "../../components/common/input/input-text-area";
const MemoTitleSection = memo(TitleSection);

export default function LayouotBenefitForm() {
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
      validityStartDate: "",
      validityEndDate: "",
      imageUrl: "",
      imageUrl2: "",
      requiredPoints: 0,
      discountPercentageValue: 0,
      status: 1,
      cancellationReason: "",
      requestToTelconet: true,
      benefitCategories: [],
      createdAt: "",
      updatedAt: "",
      invoiceCount: 0,
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
      validityStartDate: Yup.string().required("Campo requerido"),
      validityEndDate: Yup.string().required("Campo requerido"),
      imageUrl: Yup.string().required("Campo requerido"),
      imageUrl2: Yup.string().required("Campo requerido"),
      requiredPoints: Yup.number()
        .required("Campo requerido")
        .min(1, "El valor mínimo es 1"),
      discountPercentageValue: Yup.number()
        .required("Campo requerido")
        .min(1, "El valor mínimo es 1")
        .max(100, "El porcentaje de descuento no puede ser mayor a 100"),
      status: Yup.number().required("Campo requerido"),
      cancellationReason: Yup.string(),
      requestToTelconet: Yup.boolean(),
      benefitCategories: Yup.array().required("Campo requerido"),
      createdAt: Yup.string(),
      updatedAt: Yup.string(),
      invoiceCount: Yup.number()
        .required("Campo requerido")
        .min(1, "El valor mínimo es 1")
        .max(72, "El valor máximo es 72"),
    }),

    onSubmit: async (values: any) => {
      setLoanding(true);
      let data = { ...values };
      const categories = values.benefitCategories.map((item: any) => {
        return item.value;
      });
      data.requestToTelconet = values.requestToTelconet ? true : false;
      data.benefitCategories = categories;
      data.imageUrl = values.imageUrl.includes("file-") ? values.imageUrl : "";
      data.imageUrl2 = values.imageUrl2.includes("file-")
        ? values.imageUrl2
        : "";
      // Validación de fechas
      const startDate = new Date(values.validityStartDate);
      const endDate = new Date(values.validityEndDate);
      if (startDate > endDate) {
        pushNotify(
          "La fecha de inicio no puede ser mayor a la fecha de fin.",
          "error"
        );
        setLoanding(false);
        return;
      }

      if (uuid) {
        return await callApis({
          base: "BENEFIT",
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
            navigate("/benefit");
            return;
          }
          pushNotify(message ?? "Ha ocurrido un error", "error");
          return;
        });
      }
      data.code = generateBenefitCode(data.name);
      return await callApis({
        base: "BENEFIT",
        api: "create",
        method: "POST",
        useToken: true,
        body: data,
      }).then((res) => {
        const { message = "" } = res;
        setLoanding(false);
        if (res.status === 201) {
          pushNotify(message, "success");
          navigate("/benefit");
          return;
        }
        pushNotify(message ?? "Ha ocurrido un error", "error");
        return;
      });
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categorie-list"],
    queryFn: () => handleFetchCategorie(),
  });

  useEffect(() => {
    const uUID = getIdRoutes(location.pathname);
    setTitle(uUID ? "Editar Beneficio" : "Nuevo Beneficio");
    setUuid(uUID ?? "");

    if (uUID) {
      callApis({
        base: "BENEFIT",
        api: "getById",
        method: "GET",
        useToken: true,
        params: { id: uUID },
      }).then((res) => {
        const categories = res.response.benefitCategories.map((item: any) => {
          return {
            value: item.idCategory,
            label: item.nameCategory,
          };
        });
        formik.setValues({
          code: res.response.code,
          name: res.response.name,
          description: res.response.description,
          details: res.response.details,
          validityStartDate: res.response.validityStartDate,
          validityEndDate: res.response.validityEndDate,
          imageUrl: res.response.imageUrl,
          imageUrl2: res.response.imageUrl2,
          requiredPoints: res.response.requiredPoints,
          discountPercentageValue: res.response.discountPercentageValue,
          status: res.response.status,
          cancellationReason: res.response.cancellationReason,
          requestToTelconet: res.response.requestToTelconet,
          benefitCategories: categories,
          createdAt: format(res?.response?.createdAt, "dd/MM/yyyy"),
          updatedAt: format(res?.response?.updatedAt, "dd/MM/yyyy"),
          invoiceCount: res.response.invoiceCount ?? 0,
        });
      });
    }
  }, []);
  const generateBenefitCode = (benefitName: string) => {
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
    const code = `BEN-${initials}-${month}${day}${hours}${minutes}${seconds}`;
    return code;
  };

  const handleBack = () => {
    navigate("/benefit");
  };

  const handleFetchCategorie = async () => {
    return await callApis({
      base: "CATEGORY",
      api: "list",
      method: "GET",
      useToken: true,
    }).then((res) => {
      return res.response.list.map((item: any) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
    });
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
          formik.setFieldValue("imageUrl2", result.filename);
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
            <div className="col-span-3">
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
            <div className="col-span-3">
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
            <div className="col-span-3">
              <InputSelectStandard
                title="Estado*"
                name="status"
                placeholder="Seleccione un estado"
                value={formik.values.status.toString()}
                options={[
                  { label: "Pendiente", value: 1 },
                  { label: "Inactivo", value: 2 },
                  { label: "Activo", value: 3 },
                  { label: "Anulado", value: 4 },
                ]}
                onChange={(e: any) => {
                  formik.setFieldValue("status", parseInt(e.target.value));
                }}
                disabled={uuid ? false : true}
              />
            </div>
            <div className="col-span-3">
              <InputSelectStandard
                title="Motivo"
                name="motivo"
                placeholder="Seleccione un motivo"
                value={formik.values.cancellationReason}
                options={[
                  { label: "Resultados desfavorables", value: 1 },
                  { label: "Actualización de Beneficio", value: 2 },
                  { label: "Baja por Temporada", value: 3 },
                  { label: "Error en la creación", value: 4 },
                  { label: "Finalización por bajo desempeño", value: 5 },
                ]}
                onChange={(e: any) => {
                  formik.setFieldValue("cancellationReason", e.target.value);
                }}
                disabled={uuid ? false : true}
              />
            </div>
            <div className="col-span-6">
              <InputUi
                title="Descripción*"
                placeholder="beneficios"
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
                value={formik.values.updateAt}
                error={formik.errors.updateAt}
                onChange={formik.handleChange}
                touched={formik?.touched?.updateAt ?? false}
                disabled={true}
              />
            </div>
            <div className="col-span-2">
              <InputSelectMulti
                options={categories}
                values={formik.values.benefitCategories}
                title="Categoría"
                name="benefitCategories"
                onCategorieSelect={(item: any) =>
                  formik.setFieldValue("benefitCategories", item)
                }
              />
            </div>
          </div>
          <div
            className="col-span-12"
            style={{ textAlign: "start", color: "#DC8436" }}
          >
            <h1 style={{ fontSize: "25px" }}>Vigencia del Beneficio</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-4">
            <div className="col-span-2">
              <InputDateUi
                title="Desde*"
                placeholder="Desde"
                name="finalStart"
                disabled={false}
                value={formik.values.validityStartDate}
                error={formik.errors.validityStartDate}
                onChange={async (e) => {
                  formik.setFieldValue("validityStartDate", e.target.value);
                }}
                touched={formik?.touched?.validityStartDate ?? false}
              />
            </div>
            <div className="col-span-2">
              <InputDateUi
                title="Hasta*"
                placeholder="Hasta"
                name="finalDate"
                disabled={false}
                value={formik.values.validityEndDate}
                error={formik.errors.validityEndDate}
                onChange={async (e) => {
                  formik.setFieldValue("validityEndDate", e.target.value);
                }}
                touched={formik?.touched?.validityEndDate ?? false}
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
                id="imageUrl2"
                title="Imagen Beneficio*"
                defaultValue={formik.values.imageUrl2}
                onImageSelect={(item) => {
                  handleFetchUpload(item, 2);
                }}
                error={formik.errors.imageUrl2}
                touched={formik?.touched?.imageUrl2 ?? false}
                isEdit={uuid ? true : false}
                titleLabel="Imagen Beneficio"
              />
            </div>
            <div className="col-span-2">
              <InputUi
                type="number"
                title="Puntos Requeridos*"
                placeholder="Puntos Requeridos"
                name="requiredPoints"
                value={formik.values.requiredPoints}
                error={formik.errors.requiredPoints}
                onChange={formik.handleChange}
                touched={formik?.touched?.requiredPoints ?? false}
              />
            </div>
            <div className="col-span-2">
              <InputUi
                type="number"
                title="Porcentaje de Descuento*"
                placeholder="Porcentaje de Descuento"
                name="discountPercentageValue"
                value={formik.values.discountPercentageValue}
                error={formik.errors.discountPercentageValue}
                onChange={formik.handleChange}
                touched={formik?.touched?.discountPercentageValue ?? false}
              />
            </div>
            <div className="col-span-2">
              <InputUi
                type="number"
                title="Cantidad de facturas*"
                placeholder="Cantidad de facturas"
                name="invoiceCount"
                value={formik.values.invoiceCount}
                error={formik.errors.invoiceCount}
                onChange={formik.handleChange}
                touched={formik?.touched?.invoiceCount ?? false}
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
