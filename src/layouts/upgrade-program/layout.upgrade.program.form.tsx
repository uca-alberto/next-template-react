import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";
import { SectionBgWhite80 } from "../../components/layouts/component.section-bg-80";
import { TitleSection } from "../../components/layouts/component.title-section";
import { InputDateUi, InputUi } from "../../components/common/component.common";
import { callApis } from "../../utils/util.callfetch";
import { FormikContainer } from "../../components/layouts/component.form";
import { useToast } from "../../contexts/toastProvider";
import { InputSelectStandard } from "../../components/common/input/input-select";
import { LayoutModalPointMatrix1 } from "../../components/layouts/component.modal.points-matrix-1";
import { getFormattedDates } from "../../utils/validate-schema.util";
import InputSelectMulti from "../../components/common/input/input-select-multi";
import { getIdRoutes } from "../../utils/util.routes-process";
import TextareaUi from "../../components/common/input/input-text-area";
import { MENU_TYPE } from "../../utils/util.types";
const MemoTitleSection = memo(TitleSection);

export default function LayoutUpgradeProgramForm() {
  const { pushNotify } = useToast();
  const { dateNow } = getFormattedDates();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [uuid, setUuid] = useState("");
  const [loanding, setLoanding] = useState(false);
  const [fieldsOnRule, setFieldsOnRule] = useState([]);

  // Campos estáticos
  const staticFields = {
    code: "",
    name: "",
    description: "",
    details: "",
    status: 1,
    createdAt: "",
    updatedAt: "",
    createdBy: "",
  };

  const staticValidationSchema = Yup.object().shape({
    code: Yup.string(),
    name: Yup.string()
      .required("Campo requerido")
      .max(100, "Máximo 100 caracteres"),
    description: Yup.string()
      .required("Campo requerido")
      .max(100, "Máximo 100 caracteres"),
    details: Yup.string().required("Campo requerido"),
    status: Yup.number().required("Campo requerido"),
  });

  useEffect(() => {
    const uUID = getIdRoutes(location.pathname);
    setTitle(uUID ? "Editar Regla" : "Nueva Regla");
    setUuid(uUID ?? "");

    if (uUID) {
      callApis({
        base: "PROGRAMS_RULES",
        api: "getById",
        method: "GET",
        useToken: true,
        params: { id: uUID, module: MENU_TYPE.SECURITY },
      }).then((res: any) => {
        setFieldsOnRule(res.response.fieldsOnRule);
        formik.setValues({
          id: res.response.id,
          code: res.response.code,
          categories: res?.response?.categories,
          name: res.response.name,
          status: res.response.status,
          description: res.response.description,
          details: res.response.details,
          createdAt: format(res?.response?.createdAt, "dd/MM/yyyy"),
          updatedAt: format(res?.response?.updatedAt, "dd/MM/yyyy"),
          createdBy: res.response.createdBy,
          ...res.response.fieldsOnRule?.reduce((acc: any, field: any) => {
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

  const dynamicInitialValues = fieldsOnRule.reduce((acc: any, field: any) => {
    acc[field.fieldName] = {
      idFieldConfiguration: field.idFieldConfiguration,
      idValue: field.idValue || "",
      type: field.fieldType,
      value: field.valueInRule || "",
    };
    return acc;
  }, {});

  const formik = useFormik({
    initialValues: { ...staticFields, ...dynamicInitialValues },
    validationSchema: staticValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values: any) => {
      setLoanding(true);

      const dynamicFieldsArray = fieldsOnRule.map((field: any) => {
        return {
          fieldName: field.fieldName,
          data: values[field.fieldName],
        };
      });

      const {
        code,
        name,
        status,
        description,
        details,
        categories,
        createdBy,
      } = values;

      let data = {
        code: code,
        categories: categories,
        name: name,
        status: status,
        description: description,
        details: details,
        createdBy: createdBy,
        fieldsOnRules: dynamicFieldsArray,
      };

      if (uuid) {
        return await callApis({
          base: "PROGRAMS_RULES",
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
            navigate("/birthday");
            return;
          }
          pushNotify(message ?? "Ha ocurrido un error", "error");
          return;
        });
      }
    },
  });

  const renderField = (field: any) => {
    switch (field.fieldType) {
      case "TEXT":
      case "INT":
        return (
          <div key={field.idFieldConfiguration} className="col-span-2">
            <InputUi
              title={field.fieldDescription}
              placeholder={field.fieldDescription}
              name={field.fieldName}
              value={formik.values[field.fieldName].value}
              error={formik.errors[field.fieldName]}
              onChange={(e) => {
                formik.setFieldValue(field.fieldName, {
                  idFieldConfiguration: field.idFieldConfiguration,
                  idValue: field.idValue || "",
                  type: field.fieldType,
                  value: e.target.value,
                });
              }}
              touched={formik?.touched?.[field.fieldName] ?? false}
            />
          </div>
        );
      case "DATE":
        return (
          <div key={field.idFieldConfiguration} className="col-span-2">
            <InputDateUi
              title={field.fieldDescription}
              placeholder={field.fieldDescription}
              name={field.fieldName}
              value={formik.values[field.fieldName]}
              error={formik.errors[field.fieldName]}
              onChange={(e) => {
                formik.setFieldValue(field.fieldName, {
                  idFieldConfiguration: field.idFieldConfiguration,
                  idValue: field.idValue || "",
                  type: field.fieldType,
                  value: e.target.value,
                });
              }}
              touched={formik?.touched?.[field.fieldName] ?? false}
            />
          </div>
        );
      case "SINGLE_LIST":
        return (
          <div key={field.idFieldConfiguration} className="col-span-2">
            <InputSelectStandard
              title={field.fieldDescription}
              name={field.fieldName}
              placeholder={`Seleccione ${field.fieldDescription}`}
              value={formik.values[field.fieldName].value}
              options={field.catalog.childs.map(
                (child: { name: any; id: any }) => ({
                  label: child.name,
                  value: child.id,
                })
              )}
              onChange={(e) => {
                formik.setFieldValue(field.fieldName, {
                  idFieldConfiguration: field.idFieldConfiguration,
                  idValue: field.idValue || "",
                  type: field.fieldType,
                  value: e.target.value,
                });
              }}
              disabled={false}
            />
          </div>
        );
      case "MULTI_LIST":
        return (
          <div key={field.idFieldConfiguration} className="col-span-2">
            <InputSelectMulti
              options={field.catalog.childs.map(
                (child: { name: any; id: any }) => ({
                  label: child.name,
                  value: child.id,
                })
              )}
              values={formik.values[field.fieldName].value}
              title={field.fieldDescription}
              name={field.fieldName}
              onCategorieSelect={(item: any) =>
                formik.setFieldValue(field.fieldName, {
                  idFieldConfiguration: field.idFieldConfiguration,
                  idValue: field.idValue || "",
                  type: field.fieldType,
                  value: item,
                })
              }
            />
          </div>
        );

      default:
        return null;
    }
  };

  const handleMatrixPoints = async (info: any) => {
    const data = Object.keys(info).map((key) => {
      const { idPoints, idProgramRuleCategory, C1, C2, C3, C4, C5 } = info[key];

      return {
        ...(idPoints === "" ? {} : { id: idPoints }),
        idProgramRuleCategory: idProgramRuleCategory,
        pointsC1: parseInt(C1),
        pointsC2: parseInt(C2),
        pointsC3: parseInt(C3),
        pointsC4: parseInt(C4),
        pointsC5: C5 === "" ? null : parseInt(C5),
      };
    });

    console.log(data);

    await callApis({
      base: "POINS_PROGRAMS_RULES",
      api: "save",
      method: "POST",
      useToken: true,
      body: data,
    }).then((res) => {
      const { message = "" } = res;
      if (res.status === 201) {
        pushNotify(message, "success");
        return;
      }
      pushNotify(message ?? "Ha ocurrido un error", "error");
      return;
    });
  };

  return (
    <>
      <MemoTitleSection title={title} isViewButton={false} />
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
                  { label: "Activo", value: 1 },
                  { label: "Inactivo", value: 2 },
                  { label: "Vencido", value: 3 },
                ]}
                onChange={(e: any) => {
                  formik.setFieldValue("status", parseInt(e.target.value));
                }}
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
                placeholder={format(dateNow, "dd/MM/yyyy")}
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
                placeholder={format(dateNow, "dd/MM/yyyy")}
                name="fecha_modificacion"
                value={formik.values.updatedAt ?? ""}
                error={formik.errors.updatedAt}
                disabled={true}
              />
            </div>

            {fieldsOnRule.map((field) => renderField(field))}
          </div>

          <LayoutModalPointMatrix1
            idFilter={uuid}
            base={"BENEFIT_REQUEST_OBSERVATION"}
            api={"getById"}
            labelButton="Asignar Matriz de Puntos"
            modalTitle={"Asignar Puntos"}
            onSave={(item: any) => {
              handleMatrixPoints(item);
            }}
          />
        </FormikContainer>
      </SectionBgWhite80>
    </>
  );
}
