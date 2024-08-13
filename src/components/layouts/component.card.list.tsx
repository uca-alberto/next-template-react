import { useState } from "react";
import TableManagement from "../table/management.table";
import { ButtonUi, InputUi, ModalAlertUI } from "../common/component.common";
import { RiAddFill } from "@remixicon/react";
import { ModalStandard } from "../common/modal/component.modal";
import { DivJustifyItemsCenter } from "./component.divs";
import { getFormattedDates } from "../../utils/validate-schema.util";
import { useAuth } from "../../contexts/authProvider";
import { format } from "date-fns";

const LayoutCardList = (props: any) => {
  const { dateNow } = getFormattedDates();
  const { user } = useAuth();
  const {
    title,
    labelButton,
    modalTitle,
    onSave,
    data,
    fieldData,
    type,
    infoEdit,
    onChangeStatus,
  } = props;
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [info, setInfo] = useState({
    idBenefitRequest: "",
    observation: "",
    id: infoEdit ? infoEdit.id : "",
    nameCatalog: infoEdit ? infoEdit.elementName : "",
    elementIdTelco: infoEdit ? infoEdit.elementIdTelco : "",
    elementOrder: infoEdit ? infoEdit.elementOrder : "",
    createdBy: user.email,
    createdAt: dateNow,
    isUpdate: false,
  });
  const [infoModal, setInfoModal] = useState({
    uuid: "",
    mode: "",
    title: "",
    status: false,
  });
  const onCloseModal = () => {
    setInfo({
      id: "",
      idBenefitRequest: "",
      observation: "",
      nameCatalog: "",
      elementIdTelco: "",
      elementOrder: "",
      createdBy: user.email,
      createdAt: dateNow,
      isUpdate: false,
    });
    setOpen(false);
  };
  const onOpenModal = () => setOpen(true);
  const onOpenModalInfo = () => setOpenInfo(true);
  const onCloseModalInfo = () => setOpenInfo(false);
  const onSaveModal = async () => {
    onCloseModal();
    onSave(info);
    setInfo({
      id: "",
      idBenefitRequest: "",
      observation: "",
      nameCatalog: "",
      elementIdTelco: "",
      elementOrder: "",
      createdBy: user.email,
      createdAt: dateNow,
      isUpdate: false,
    });
  };
  const handleEdit = (data: any) => {
    if (type == "catalog") {
      setInfo({
        ...info,
        id: data.id,
        nameCatalog: data.elementName,
        elementIdTelco: data.elementIdTelco,
        elementOrder: data.elementOrder ?? 0,
        isUpdate: true,
      });
    }
    onOpenModal();
  };

  const handleUpdateStatus = async (id: string, status: boolean) => {
    setInfoModal(
      Object.assign({}, infoModal, {
        uuid: id,
        mode: "status",
        title: status
          ? "¿Esta seguro que desea activar este registro?"
          : "¿Esta seguro que desea desactivar esta registro?",
        status: status,
      })
    );
    onOpenModalInfo();
  };

  const handleProcess = async () => {
    if (infoModal.mode === "status") {
      onChangeStatus(infoModal.uuid);
      onCloseModalInfo();
    }
  };
  return (
    <div className="flex flex-col">
      <TableManagement
        title={title}
        nowPage={1}
        data={data}
        changePage={null}
        countItems={data?.length ?? 0}
        includeFields={fieldData}
        hideFooter={true}
        heightTable="auto"
      />
      <div className="flex justify-end">
        <ButtonUi onClick={onOpenModal}>
          {<RiAddFill />}
          <span className="text-md ">{labelButton}</span>
        </ButtonUi>
      </div>
      <ModalStandard open={open} onCloseModal={onCloseModal} title={modalTitle}>
        {type === "benefit-request" ? (
          <>
            <div className="w-min-[50rem]">
              <textarea
                name="details"
                value={info.observation}
                onChange={(e) =>
                  setInfo({ ...info, observation: e.target.value })
                }
                placeholder="Mensaje"
                rows={5}
                className="w-full px-4 py-2 mt-1 text-sm text-[#393e3f] bg-white/60 placeholder-gray-400 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#FB963D] focus:border-[#FB963D] disabled:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>
          </>
        ) : null}

        {type === "catalog" ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-4">
              <div className="col-span-3">
                <InputUi
                  title="Nombre"
                  placeholder="Nombre"
                  name="nameCatalog"
                  value={info.nameCatalog}
                  onChange={(e) =>
                    setInfo({ ...info, nameCatalog: e.target.value })
                  }
                />
              </div>
              <div className="col-span-3">
                <InputUi
                  type="number"
                  title="Orden de presentación"
                  placeholder="Orden de presentación"
                  name="elementOrder"
                  value={info.elementOrder}
                  onChange={(e) =>
                    setInfo({ ...info, elementOrder: e.target.value })
                  }
                />
              </div>
              <div className="col-span-3">
                <InputUi
                  title="Telco Id"
                  placeholder="Telco Id"
                  name="elementIdTelco"
                  value={info.elementIdTelco}
                  onChange={(e) =>
                    setInfo({ ...info, elementIdTelco: e.target.value })
                  }
                />
              </div>
            </div>
          </>
        ) : null}

        <DivJustifyItemsCenter>
          <div className="grid grid-cols-2 gap-x-3">
            <InputUi
              title="Usuario"
              placeholder=""
              name="usuario"
              value={user.name}
              disabled={true}
            />
            <InputUi
              title="Fecha Creación"
              placeholder=""
              name="fecha"
              value={format(dateNow, "dd/MM/yyyy")}
              disabled={true}
            />
          </div>
        </DivJustifyItemsCenter>
        <DivJustifyItemsCenter>
          <ButtonUi onClick={onCloseModal} color="#5c5c5c">
            Cancelar
          </ButtonUi>
          <ButtonUi onClick={onSaveModal}>Guardar</ButtonUi>
        </DivJustifyItemsCenter>
      </ModalStandard>
      <ModalAlertUI
        title={infoModal.title}
        open={openInfo}
        onCloseModal={onCloseModalInfo}
        handleProcess={handleProcess}
      />
    </div>
  );
};
export { LayoutCardList };
