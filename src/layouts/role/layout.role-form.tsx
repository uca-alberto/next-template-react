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
import { Module, labels } from "./interface.role";
import { mergeActionsRol, roleProcess } from "../../utils/util.role-process";
import { SelectItems } from "./components/component.role-select";
const MemoTitleSection = memo(TitleSection);
const MemoSelectItems = memo(SelectItems);

export default function LayouotRoleForm() {
  const { pushNotify } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [uuid, setUuid] = useState("");
  const [loanding, setLoanding] = useState(false);
  const [modules, setModules] = useState<Module[]>([]);

  const handleFetch = async () => {
    return await callApis({
      base: "MODULES",
      api: "list",
      method: "GET",
      useToken: true,
    }).then((res) => {
      setModules(res.response.list);
      return res.response.list;
    });
  };

  useEffect(() => {
    setLoanding(true);
    const uuId = getIdRoutes(location.pathname);
    const titleGet = uuId ? labels.titleEdit : labels.titleCreate;
    setTitle(titleGet);
    setUuid(uuId ?? "");

    handleFetch().then((response) => {
      if (uuId) {
        callApis({
          base: labels.base,
          api: "get",
          method: "GET",
          useToken: true,
          params: { id: uuId },
        }).then((res) => {
          setTimeout(() => {
            setLoanding(false);
            const newArray = mergeActionsRol(response, res.response.role.permission);
            const newArrayActions = roleProcess(newArray);
            setModules(newArray);
            formik.setValues({
              name: res.response.role.name,
              status: res.response.role.status,
              permissions: newArrayActions,
            });
          }, 800);
          return;
        });
      } else {
        setLoanding(false);
      }
    });
  }, []);

  const handleBack = () => {
    navigate("/role");
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      status: false,
      permissions: [],
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Nombre del rol requerido")
        .max(30, "El nombre no puede tener más de 30 caracteres"),
      permissions: Yup.array()
        .required("Seleccione al menos un permiso")
        .min(1, "Seleccione al menos un permiso"),
    }),
    onSubmit: async (values: any) => {
      setLoanding(true);
      if (uuid) values.id = parseInt(uuid);

      return await callApis({
        base: labels.base,
        api: "upsert",
        method: "POST",
        useToken: true,
        body: values,
      }).then((res) => {
        setLoanding(false);
        const { error = "" } = res.response;
        if (res.status === 201) {
          const msgResponse = res.message;
          const msgSuccess = uuid ? "Rol actualizado" : "Rol creado";
          pushNotify(msgResponse ?? msgSuccess, "success");
          navigate("/role");
          return;
        }
        pushNotify(error ?? "Ha ocurrido un error", "error");
        return;
      });
    },
  });

  const getItems = (items: Module[]) => {
    if (!items) return;
    const arrayActions = roleProcess(items);
    if (arrayActions.length > 0) {
      formik.setFieldValue("permissions", arrayActions);
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
      <div className="mt-8">
        <SectionBgWhite80>
          <FormikContainer handleSubmit={formik.handleSubmit} loanding={loanding}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 mt-6">
              <div className="col-span-2 lg:col-span-3">
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
              <div className="col-span-1">
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
            <MemoSelectItems
              data={modules}
              getItems={getItems}
              //permissionsArr={permissionsArray}
            />
            <div className="min-h-7 max-h-9 flex justify-end items-center mt-1">
              {formik.errors.permissions && formik.touched?.permissions && (
                <span className="text-red-500 text-sm">
                  {String(formik?.errors?.permissions)}
                </span>
              )}
            </div>
          </FormikContainer>
        </SectionBgWhite80>
      </div>
    </>
  );
}
