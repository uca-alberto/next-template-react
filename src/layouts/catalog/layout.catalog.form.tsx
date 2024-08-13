import { memo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RiArrowLeftLine } from "@remixicon/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SectionBgWhite80 } from "../../components/layouts/component.section-bg-80";
import { TitleSection } from "../../components/layouts/component.title-section";
import { getIdRoutes } from "../../utils/util.routes-process";
import { ButtonUi, InputUi } from "../../components/common/component.common";
import { callApis } from "../../utils/util.callfetch";
import { FormikContainer } from "../../components/layouts/component.form";
import { useToast } from "../../contexts/toastProvider";
import { LayoutCardList } from "../../components/layouts/component.card.list";
import { DivJustifyItemsCenter } from "../../components/layouts/component.divs";
const MemoTitleSection = memo(TitleSection);

export default function LayouotCatalogForm() {
  const { pushNotify } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [uuid, setUuid] = useState("");
  const formik = useFormik({
    initialValues: {
      code: "",
      name: "",
      elementId: 0,
      elementName: "",
      elementIdTelco: "",
      elementOrder: null,
      status: true,
      parentCatalogId: null,
      createdAt: "",
      updatedAt: "",
      createdBy: "",
      updatedBy: "",
      dependentOnCatalogId: null,
      children: [],
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Campo requerido"),
      name: Yup.string().required("Campo requerido"),
      elementId: Yup.number().required("Campo requerido"),
      elementName: Yup.string().required("Campo requerido"),
      elementIdTelco: Yup.string().required("Campo requerido"),
      elementOrder: Yup.number().required("Campo requerido"),
      status: Yup.bool(),
      parentCatalogId: Yup.number().required("Campo requerido"),
      createdAt: Yup.string().required("Campo requerido"),
      updatedAt: Yup.string().required("Campo requerido"),
      createdBy: Yup.string().required("Campo requerido"),
      updatedBy: Yup.string().required("Campo requerido"),
      dependentOnCatalogId: Yup.number().required("Campo requerido"),
      children: Yup.array(),
    }),
    onSubmit: (values) => {
      console.log("values", values);
    },
  });

  useEffect(() => {
    const uUID = getIdRoutes(location.pathname);
    setTitle(uUID ? "Editar Catálogo" : "Nuevo Catálogo");
    setUuid(uUID ?? "");
    handleGetById(uUID);
  }, []);
  const handleGetById = async (id: any) => {
    if (id) {
      callApis({
        base: "CATALOG",
        api: "getById",
        method: "GET",
        useToken: true,
        params: { id: id },
      }).then((res) => {
        formik.setValues({
          code: res?.response?.code,
          name: res?.response?.name,
          elementId: res?.response?.elementId,
          elementName: res?.response?.elementName,
          elementIdTelco: res?.response?.elementIdTelco,
          elementOrder: res?.response?.elementOrder,
          status: res?.response?.status,
          parentCatalogId: res?.response?.parentCatalogId,
          createdAt: res?.response?.createdAt,
          updatedAt: res?.response?.updatedAt,
          createdBy: res?.response?.createdBy,
          updatedBy: res?.response?.updatedBy,
          dependentOnCatalogId: res?.response?.dependentOnCatalogId,
          children: res?.response?.children,
        });
      });
    }
  };

  const handleBack = () => {
    navigate("/catalog");
  };
  const handleSave = async (item: any) => {
    const data: any = {
      elementName: item.nameCatalog,
      elementIdTelco: item.elementIdTelco,
      elementOrder: String(item.elementOrder),
      parentCatalogId: uuid,
      status: true,
      createdBy: item.createdBy,
      createdAt: item.createdAt,
    };
    if (!uuid) {
      formik.setValues((prevValues: any) => {
        const children = [...prevValues.children];
        const existingIndex = children.findIndex(
          (child) => child.elementName === data.elementName
        );
        if (existingIndex !== -1) {
          children[existingIndex] = data;
        } else {
          children.push(data);
        }
        return {
          ...prevValues,
          children,
        };
      });
      formik.setFieldValue("createdBy", item.createdBy);
      return;
    }
    await callApis({
      base: "CATALOG",
      api: "children",
      method: item.isUpdate ? "PUT" : "POST",
      useToken: true,
      params: { id: item.isUpdate ? item.id : uuid },
      body: data,
    }).then((res) => {
      const { message = "" } = res;
      if (res.status === 201 || res.status === 200) {
        pushNotify(message, "success");
        return;
      }
      pushNotify(message ?? "Ha ocurrido un error", "error");
      return;
    });
    handleGetById(uuid);
  };
  const handleCancel = () => {
    navigate("/catalog");
  };
  const handleUpdate = async () => {
    if (uuid) {
      await callApis({
        base: "CATALOG",
        api: "update",
        method: "PUT",
        useToken: true,
        body: formik.values,
        params: { id: uuid },
      }).then((res) => {
        const { message = "" } = res;
        if (res.status === 200) {
          pushNotify(message, "success");
          navigate("/catalog");
          return;
        }
        pushNotify(message ?? "Ha ocurrido un error", "error");
        return;
      });
      return;
    }
    let data = formik.values;
    data.status = true;
    return await callApis({
      base: "CATALOG",
      api: "create",
      method: "POST",
      useToken: true,
      body: data,
    }).then((res) => {
      const { message = "" } = res;
      if (res.status === 201) {
        pushNotify(message, "success");
        navigate("/catalog");
        return;
      }
      pushNotify(message ?? "Ha ocurrido un error", "error");
      return;
    });
  };

  const handleChangeStatus = (data: any) => {
    if (uuid) {
      const params = {
        id: data,
      };
      callApis({
        base: "CATALOG",
        api: "status",
        method: "PUT",
        useToken: true,
        params,
      }).then((res) => {
        const { message = "" } = res;
        if (res.status === 200) {
          pushNotify(message, "success");
          handleGetById(uuid);
          return;
        }
        pushNotify(message ?? "Ha ocurrido un error", "error");
        return;
      });
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
        <FormikContainer handleSubmit={formik.handleSubmit} hide={true}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-4">
            <div className="col-span-3" style={{ textAlign: "start" }}>
              <h1 style={{ fontSize: "35px", fontWeight: "bold" }}>Detalle</h1>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-4">
            <div className="col-span-3">
              <InputUi
                title="Código"
                placeholder="ingrese el código"
                name="code"
                value={formik.values.code}
                error={formik.errors.code}
                onChange={formik.handleChange}
                touched={formik?.touched?.code ?? false}
                disabled={uuid ? true : false}
              />
            </div>
            <div className="col-span-3">
              <InputUi
                title="Nombre"
                placeholder="ingrese el código"
                name="name"
                value={formik.values.name}
                error={formik.errors.name}
                onChange={formik.handleChange}
                touched={formik?.touched?.name ?? false}
              />
            </div>
          </div>
        </FormikContainer>
      </SectionBgWhite80>
      <SectionBgWhite80>
        <LayoutCardList
          title={"Lista"}
          idFilter={uuid}
          labelButton={"Nuevo"}
          modalTitle={"Nuevo"}
          data={formik.values.children}
          fieldData={{
            elementId: "id",
            elementName: "Nombre",
            elementIdTelco: "Telco Id",
            status: "Estado",
            createdBy: "Creado Por",
          }}
          onSave={(item: any) => {
            handleSave(item);
          }}
          type={"catalog"}
          onChangeStatus={(data: any) => handleChangeStatus(data)}
        />
      </SectionBgWhite80>
      <div className="w-full">
        <DivJustifyItemsCenter>
          <ButtonUi onClick={handleCancel} color="#5c5c5c">
            Cancelar
          </ButtonUi>
          <ButtonUi onClick={handleUpdate}>Guardar</ButtonUi>
        </DivJustifyItemsCenter>
      </div>
    </>
  );
}
