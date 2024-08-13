import { memo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RiArrowLeftLine } from "@remixicon/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SectionBgWhite80 } from "../../components/layouts/component.section-bg-80";
import { TitleSection } from "../../components/layouts/component.title-section";
import { getIdRoutes } from "../../utils/util.routes-process";
import {
  ButtonOutlineUi,
  ButtonUi,
  InputUi,
} from "../../components/common/component.common";
import { callApis } from "../../utils/util.callfetch";
import { FormikContainer } from "../../components/layouts/component.form";
import { useToast } from "../../contexts/toastProvider";
import { LayoutCardList } from "../../components/layouts/component.card.list";
import { DivJustifyItemsCenter } from "../../components/layouts/component.divs";
import { ModalStandard } from "../../components/common/modal/component.modal";
import { format } from "date-fns";
const MemoTitleSection = memo(TitleSection);

export default function LayouotBenefitRequestForm() {
  const { pushNotify } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [uuid, setUuid] = useState("");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(0);
  const formik = useFormik({
    initialValues: {
      id: "",
      code: "",
      benefitName: "",
      discountPercentage: 0,
      validityStartDate: "",
      validityEndDate: "",
      requiredPoints: 0,
      benefitCategories: "",
      globalStatus: "",
      customerFirstName: "",
      customerLastName: "",
      customerCategories: "",
      createdAt: "",
      statusTelconet: "",
      kardexOut: "",
      balance: 0,
    },
    validationSchema: Yup.object({
      id: Yup.string().required("Campo requerido"),
      code: Yup.string().required("Campo requerido"),
      benefitName: Yup.string().required("Campo requerido"),
      discountPercentage: Yup.number().required("Campo requerido"),
      validityStartDate: Yup.string().required("Campo requerido"),
      validityEndDate: Yup.string().required("Campo requerido"),
      requiredPoints: Yup.number().required("Campo requerido"),
      benefitCategories: Yup.string().required("Campo requerido"),
      globalStatus: Yup.string().required("Campo requerido"),
      customerFirstName: Yup.string().required("Campo requerido"),
      customerLastName: Yup.string().required("Campo requerido"),
      customerCategories: Yup.string().required("Campo requerido"),
      createdAt: Yup.string().required("Campo requerido"),
      statusTelconet: Yup.string().required("Campo requerido"),
      kardexOut: Yup.string().required("Campo requerido"),
      balance: Yup.number().required("Campo requerido"),
    }),

    onSubmit: async (values: any) => {
      let data = { ...values };
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
          if (res.status === 200) {
            pushNotify(message, "success");
            navigate("/benefitrequest");
            return;
          }
          pushNotify(message ?? "Ha ocurrido un error", "error");
          return;
        });
      }
    },
  });

  useEffect(() => {
    const uUID = getIdRoutes(location.pathname);
    setTitle("Canjes");
    setUuid(uUID ?? "");
    handleGetById(uUID);
  }, []);
  const handleGetById = async (id: any) => {
    if (id) {
      callApis({
        base: "BENEFIT_REQUEST",
        api: "getById",
        method: "GET",
        useToken: true,
        params: { id: id },
      }).then((res) => {
        formik.setValues({
          id: res?.response?.id,
          code: res?.response?.benefit?.code,
          benefitName: res?.response?.benefit?.name,
          discountPercentage: res?.response?.discountPercentage,
          validityStartDate: res?.response?.benefit?.validityStartDate,
          validityEndDate: res?.response?.benefit?.validityEndDate,
          requiredPoints: res?.response?.benefit?.requiredPoints,
          benefitCategories: res?.response?.benefit?.benefitCategories
            .map((item: any) => item?.category?.name)
            .join(","),
          customerFirstName: res?.response?.customer?.firstName,
          customerLastName: res?.response?.customer?.lastName,
          customerCategory: res?.response?.customer?.category?.name,
          createdAt: format(res?.response?.createdAt, "dd/MM/yyyy"),
          statusTelconet: res?.response?.statusTelconet ? "" : "",
          kardexOut: res?.response?.kardexOut?.points,
          globalStatus: res?.response?.status,
          observationList: res?.response?.observationList,
          balance: res?.response?.balance,
        });
      });
    }
  };

  const handleBack = () => {
    navigate("/benefitrequest");
  };
  const handleSaveObservation = async (item: any) => {
    if (item.observation === "") {
      return pushNotify("Debe ingresar una observación", "error");
    }
    const data = {
      idBenefitRequest: formik.values.id,
      observation: item.observation,
    };
    await callApis({
      base: "BENEFIT_REQUEST_OBSERVATION",
      api: "create",
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
    handleGetById(uuid);
  };
  const handleCancel = () => {
    navigate("/benefitrequest");
  };
  const handleChangeStatus = async () => {
    await callApis({
      base: "BENEFIT_REQUEST",
      api: "update",
      method: "PUT",
      useToken: true,
      body: { status: status },
      params: { id: uuid },
    }).then((res) => {
      const { message = "" } = res;
      if (res.status === 200) {
        pushNotify(message, "success");
        navigate("/benefitrequest");
        return;
      }
      pushNotify(message ?? "Ha ocurrido un error", "error");
      return;
    });
  };
  const onCloseModal = () => setOpen(false);
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
          <div className="col-span-12" style={{ textAlign: "start" }}>
            <h1 style={{ fontSize: "35px", fontWeight: "bold" }}>
              Datos de Beneficio
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-4">
            <div className="col-span-2">
              <label className="text-[#391446] font-medium text-md ">
                Nombre: {formik.values.benefitName}
              </label>
            </div>
            <div className="col-span-2">
              <label className="text-[#391446] font-medium text-md ">
                Descuento del Beneficio: {formik.values.discountPercentageValue}
                %
              </label>
            </div>
            <div className="col-span-2">
              <label className="text-[#391446] font-medium text-md ">
                Fecha de Vigencia: {formik.values.validityStartDate}
              </label>
            </div>
            <div className="col-span-2">
              <label className="text-[#391446] font-medium text-md ">
                Código: {formik.values.code}
              </label>
            </div>
            <div className="col-span-2">
              <label className="text-[#391446] font-medium text-md ">
                Puntos Requeridos: {formik.values.requiredPoints}
              </label>
            </div>
            <div className="col-span-2">
              <label className="text-[#391446] font-medium text-md ">
                Categorías: {formik.values.benefitCategories}
              </label>
            </div>
          </div>
        </FormikContainer>
      </SectionBgWhite80>
      <SectionBgWhite80>
        <FormikContainer handleSubmit={formik.handleSubmit} hide={true}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-4">
            <div className="col-span-3" style={{ textAlign: "start" }}>
              <h1 style={{ fontSize: "35px", fontWeight: "bold" }}>
                Información de Canje
              </h1>
            </div>
            <div className="col-span-3" style={{ textAlign: "end" }}>
              <h1 style={{ fontSize: "25px", fontWeight: "bold" }}>
                {formik.values.globalStatus === 1 ? (
                  <>
                    <span style={{ color: "#ed7004" }}>Pendiente</span>
                  </>
                ) : formik.values.globalStatus === 2 ? (
                  <>
                    <span style={{ color: "#8a0000" }}>Rechazado</span>
                  </>
                ) : (
                  <>
                    <span style={{ color: "#039300" }}>Canjeado</span>
                  </>
                )}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-4">
            <div className="col-span-3">
              <InputUi
                title="Nombre"
                placeholder=""
                name="code"
                value={formik.values.customerFirstName}
                error={formik.errors.customerFirstName}
                onChange={formik.handleChange}
                touched={formik?.touched?.customerFirstName ?? false}
                disabled={true}
              />
            </div>
            <div className="col-span-3">
              <InputUi
                title="Apellido"
                placeholder=""
                name="code"
                value={formik.values.customerLastName}
                error={formik.errors.customerLastName}
                onChange={formik.handleChange}
                touched={formik?.touched?.customerLastName ?? false}
                disabled={true}
              />
            </div>
            <div className="col-span-2">
              <InputUi
                title="Categoría"
                placeholder=""
                name="code"
                value={formik.values.customerCategory}
                error={formik.errors.customerCategory}
                onChange={formik.handleChange}
                touched={formik?.touched?.customerCategory ?? false}
                disabled={true}
              />
            </div>
            <div className="col-span-2">
              <InputUi
                title="Saldo Actual"
                placeholder=""
                name="code"
                value={formik.values.balance}
                error={formik.errors.balance}
                onChange={formik.handleChange}
                touched={formik?.touched?.balance ?? false}
                disabled={true}
              />
            </div>
            <div className="col-span-2">
              <InputUi
                title="Puntos Canjeados"
                placeholder=""
                name="code"
                value={formik.values.kardexOut}
                error={formik.errors.kardexOut}
                onChange={formik.handleChange}
                touched={formik?.touched?.kardexOut ?? false}
                disabled={true}
              />
            </div>
            <div className="col-span-2">
              <InputUi
                title="Fecha de Canje"
                placeholder=""
                name="code"
                value={formik.values.createdAt}
                error={formik.errors.createdAt}
                onChange={formik.handleChange}
                touched={formik?.touched?.createdAt ?? false}
                disabled={true}
              />
            </div>
            <div className="col-span-2">
              <InputUi
                title="Estado solicitud Telconet"
                placeholder=""
                name="code"
                value={formik.values.statusTelconet}
                error={formik.errors.statusTelconet}
                onChange={formik.handleChange}
                touched={formik?.touched?.statusTelconet ?? false}
                disabled={true}
              />
            </div>
          </div>
        </FormikContainer>
      </SectionBgWhite80>
      <SectionBgWhite80>
        <LayoutCardList
          title={"Observaciones"}
          idFilter={uuid}
          base={"BENEFIT_REQUEST_OBSERVATION"}
          api={"getById"}
          labelButton={"Nueva Observación"}
          modalTitle={"Observación"}
          data={formik.values.observationList}
          fieldData={{
            observation: "Observación",
            createdBy: "Usuario",
            createdAt: "Fecha",
          }}
          onSave={(item: any) => {
            handleSaveObservation(item);
          }}
          type={"benefit-request"}
        />
      </SectionBgWhite80>
      <div className="w-full">
        <DivJustifyItemsCenter>
          <ButtonUi onClick={handleCancel} color="#5c5c5c">
            Cancelar
          </ButtonUi>
          <ButtonUi
            onClick={() => {
              setOpen(true);
              setStatus(2);
            }}
          >
            Rechazar
          </ButtonUi>
          <ButtonUi
            onClick={() => {
              setOpen(true);
              setStatus(3);
            }}
          >
            Aprobado
          </ButtonUi>
        </DivJustifyItemsCenter>
      </div>
      <ModalStandard
        open={open}
        onCloseModal={onCloseModal}
        title="Confirmación"
      >
        <div className="grid grid-cols-1 gap-x-3 text-center">
          <label className="text-[#391446] font-medium text-md ">
            ¿Está seguro de cambiar el estado?
          </label>
        </div>
        <DivJustifyItemsCenter>
          <div
            className="grid grid-cols-2 gap-x-3"
            style={{ marginTop: "40px" }}
          >
            <ButtonOutlineUi onClick={onCloseModal}>
              <span className="text-md ">Cancelar</span>
            </ButtonOutlineUi>
            <ButtonUi type="submit" onClick={handleChangeStatus}>
              <span className="text-md ">Aceptar</span>
            </ButtonUi>
          </div>
        </DivJustifyItemsCenter>
      </ModalStandard>
    </>
  );
}
