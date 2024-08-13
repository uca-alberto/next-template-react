import { memo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RiArrowLeftLine } from "@remixicon/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SectionBgWhite80 } from "../../components/layouts/component.section-bg-80";
import { TitleSection } from "../../components/layouts/component.title-section";
import { getIdRoutes } from "../../utils/util.routes-process";
import {
  InputDateUi,
  InputUi,
  ToggleUi,
} from "../../components/common/component.common";
import { callApis } from "../../utils/util.callfetch";
import { FormikContainer } from "../../components/layouts/component.form";
import { useToast } from "../../contexts/toastProvider";
import { InputSelectStandard } from "../../components/common/input/input-select";
import { format } from "date-fns";
import TextareaUi from "../../components/common/input/input-text-area";
import InputSelectMulti from "../../components/common/input/input-select-multi";
import { useQuery } from "@tanstack/react-query";
import RenderField from "../../components/common/render/render-field";
import { MENU_TYPE } from "../../utils/util.types";
import { LayoutModalArpu } from "../../components/layouts/component.moda.arpu";
const MemoTitleSection = memo(TitleSection);

export default function LayouotReferralRulerForm() {
  const { pushNotify } = useToast();

  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [uuid, setUuid] = useState("");
  const [loanding, setLoanding] = useState(false);
  const [fieldsOnRule, setFieldsOnRule] = useState([]);
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
      validityStartDate: "",
      validityEndDate: "",
      maxDaysToValidate: 0,
      maxMonthsToValidate: 0,
      categories: [],
      recurringPaidInvoices: 0,
      pendingReferredValues: false,
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
      validityStartDate: Yup.string().required("Campo requerido"),
      validityEndDate: Yup.string().required("Campo requerido"),
      maxDaysToValidate: Yup.number().required("Campo requerido").min(1),
      maxMonthsToValidate: Yup.number().required("Campo requerido").min(1),
      categories: Yup.array(),
      recurringPaidInvoices: Yup.number().required("Campo requerido").min(1),
      pendingReferredValues: Yup.boolean(),
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

  useEffect(() => {
    const uUID = getIdRoutes(location.pathname);
    setTitle(uUID ? "Editar Regla" : "Crear Regla");
    setUuid(uUID ?? "");

    if (uUID) {
      callApis({
        base: "PROGRAMS_RULES",
        api: "getById",
        method: "GET",
        useToken: true,
        params: { id: uUID, module: MENU_TYPE.REFERRAL },
      }).then((res) => {
        const categories = res?.response?.categories?.map((item: any) => {
          return {
            value: item.id,
            label: item.name,
          };
        });
        setFieldsOnRule(res?.response?.fieldsOnRule);
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
          validityStartDate: format(
            res?.response?.validityStartDate,
            "yyyy-MM-dd"
          ),
          validityEndDate: res?.respose?.validityEndDate
            ? format(res?.response?.validityEndDate, "yyyy-MM-dd")
            : "",
          maxDaysToValidate: res?.response?.maxDaysToValidate,
          maxMonthsToValidate: res?.response?.maxMonthsToValidate,
          categories: categories,
          recurringPaidInvoices: res?.response?.recurringPaidInvoices,
          pendingReferredValues:
            res?.response?.pendingReferredValues == 1 ? true : false,
          ...res?.response?.fieldsOnRule?.reduce((acc: any, field: any) => {
            acc[field.fieldName] = {
              idFieldConfiguration: field.idFieldConfiguration,
              idValue: field.idValue || "",
              type: field.fieldType,
              value: field.valueInRule || "",
            };
            return acc;
          }, {}),
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
    navigate("/referral/ruler/");
  };

  const { data: categories } = useQuery({
    queryKey: ["categorie-list"],
    queryFn: () => handleFetchCategorie(),
  });
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

  return (
    <>
      <MemoTitleSection
        title={title}
        icon={<RiArrowLeftLine />}
        onClick={handleBack}
        labelButton={"Atras"}
      />
      <FormikContainer handleSubmit={formik.handleSubmit}>
        <SectionBgWhite80>
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
            <div className="col-span-2" style={{ marginTop: "4px" }}>
              <InputSelectMulti
                options={categories}
                values={formik.values.categories}
                title="Categoría"
                name="categories"
                onCategorieSelect={(item: any) =>
                  formik.setFieldValue("categories", item)
                }
              />
            </div>
            <div className="col-span-3">
              <InputUi
                title="Dias de Control por Usuario*"
                placeholder="Dias de Control por Usuario"
                name="maxDaysToValidate"
                value={formik.values.maxDaysToValidate}
                error={formik.errors.maxDaysToValidate}
                onChange={formik.handleChange}
                touched={formik?.touched?.maxDaysToValidate ?? false}
                disabled={false}
              />
            </div>
            <div className="col-span-3">
              <InputUi
                title="Meses de Control por Usuario*"
                placeholder="Meses de Control por Usuario"
                name="maxMonthsToValidate"
                value={formik.values.maxMonthsToValidate}
                error={formik.errors.maxMonthsToValidate}
                onChange={formik.handleChange}
                touched={formik?.touched?.maxMonthsToValidate ?? false}
                disabled={false}
              />
            </div>
          </div>
        </SectionBgWhite80>
        <SectionBgWhite80>
          <div className="col-span-12" style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "35px", fontWeight: "bold" }}>
              Datos de Validación
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-4">
            {fieldsOnRule.map((field: any) => (
              <RenderField
                key={field.idFieldConfiguration}
                field={field}
                formik={formik}
              />
            ))}
          </div>
        </SectionBgWhite80>
        <SectionBgWhite80>
          <div className="col-span-12" style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "35px", fontWeight: "bold" }}>
              Datos Prorrogantes
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-4">
            <div className="col-span-2 flex justify-center items-center">
              <InputUi
                title="Facturas Pagadas Recurrente*"
                placeholder="Meses de Control por Usuario"
                name="recurringPaidInvoices"
                value={formik.values.recurringPaidInvoices}
                error={formik.errors.recurringPaidInvoices}
                onChange={formik.handleChange}
                touched={formik?.touched?.recurringPaidInvoices ?? false}
                disabled={false}
              />
            </div>
            <div className="col-span-2 flex justify-center items-center">
              <LayoutModalArpu
                idFilter={uuid}
                base={"BENEFIT_REQUEST_OBSERVATION"}
                api={"getById"}
                labelButton="Asignar Matriz de Puntos"
                modalTitle={"Asignar Puntos"}
                fields={["MIN", "MAX", "Puntos"]}
                values={[{ id: 1, name: "ARPU", min: 0, max: 0, points: 0 }]}
                onSave={(item: any) => {
                  //handleMatrixPoints(item);
                  console.log(item);
                }}
              />
            </div>
            <div
              className="col-span-2 flex justify-center items-center"
              style={{ padding: "5%" }}
            >
              <ToggleUi
                label="Pendiente de valores referidos"
                row={false}
                name="pendingReferredValues"
                value={formik.values.pendingReferredValues}
                onChange={formik.handleChange}
                disabled={false}
              />
            </div>
          </div>
        </SectionBgWhite80>
      </FormikContainer>
    </>
  );
}
