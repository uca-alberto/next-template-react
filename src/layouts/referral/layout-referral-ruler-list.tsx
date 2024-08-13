import { useState } from "react";
import { LayoutManagement } from "../../components/layouts/management.component";
import TableManagement from "../../components/table/management.table";
import {
  ButtonOutlineUi,
  ButtonUi,
  InputDateUi,
  ModalAlertUI,
} from "../../components/common/component.common";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { callApis } from "../../utils/util.callfetch";
import { ModalStandard } from "../../components/common/modal/component.modal";
import { DivJustifyItemsCenter } from "../../components/layouts/component.divs";
import { InputSelectStandard } from "../../components/common/input/input-select";
import { useToast } from "../../contexts/toastProvider";
import { getFormattedparseISO } from "../../utils/validate-schema.util";
import { PROGRAM_TYPE } from "../../utils/util.types";

export default function LayoutReferralRuler() {
  const navigate = useNavigate();
  const { pushNotify } = useToast();
  const [search, setSearch] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [countItems, setCountItems] = useState(0);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState(0);
  const [open, setOpen] = useState(false);
  const [dispense, setDispense] = useState("");
  const [info, setInfo] = useState({
    uuid: "",
    mode: "",
    title: "",
    status: false,
  });
  const [dateParam, setDateParam] = useState({
    fromDate: "",
    toDate: "",
    status: 0,
  });
  const onCloseModalFilter = () => setOpenFilter(false);

  const handleFetch = async (props: any) => {
    const params = {
      code: PROGRAM_TYPE.REFERRAL,
      offset: props?.number ?? 0,
      limit: 10,
      fromDate: props?.fromDateParam ?? "",
      toDate: props?.toDateParam ?? "",
      search: props?.label ?? "",
      status: props?.status ?? 0,
    };
    return await callApis({
      base: "PROGRAMS_RULES",
      api: `getByType`,
      method: "GET",
      useToken: true,
      params,
    })
      .then((res) => {
        setCountItems(res.response.count);
        res.response.list.map((item: any) => {
          item.createdAt = getFormattedparseISO(item?.createdAt);
          return item;
        });
        return res.response.list;
      })
      .catch(() => {
        return [];
      });
  };
  const handleSudmitFilter = () => {
    setOpenFilter(!openFilter);
    setDateParam({
      ...dateParam,
      fromDate: fromDate,
      toDate: toDate,
      status: status,
    });
  };

  const { data, isPending } = useQuery({
    queryKey: ["ruler-list", search, pageNumber, dispense, dateParam],
    queryFn: () =>
      handleFetch({
        label: search,
        number: pageNumber,
        fromDateParam: fromDate,
        toDateParam: toDate,
        status: status,
      }),
  });

  const handleChangePage = async (page: { pageNumber: number }) => {
    setPageNumber(page?.pageNumber ?? 0);
    return;
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPageNumber(0);
  };

  const handleFilter = () => {
    setOpenFilter(!openFilter);
  };

  const handleCreate = () => {
    navigate("/referral/ruler/create");
  };

  const handleEdit = (id: number) => {
    navigate(`/referral/ruler/edit/${id}`);
  };
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const handleUpdateStatus = async (id: string, status: boolean) => {
    setInfo(
      Object.assign({}, info, {
        uuid: id,
        mode: "status",
        title: status
          ? "¿Esta seguro que desea activar este registro?"
          : "¿Esta seguro que desea desactivar este registro?",
        status: status,
      })
    );
    onOpenModal();
  };

  const handleProcessDelete = async () => {
    setDispense("");
    if (info.mode === "status") {
      return await fetchUpdateStatus(info.uuid, info.status);
    }
  };

  const fetchUpdateStatus = async (id: string, status: boolean) => {
    const params = {
      id,
    };
    return await callApis({
      base: "PROGRAMS_RULES",
      api: "status",
      method: "PUT",
      useToken: true,
      params,
      body: { status },
    }).then((res) => {
      if (res.status === 200) {
        setDispense("status");
        pushNotify("Estado actualizado correctamente", "success");
        onCloseModal();
        return;
      }
      pushNotify("Error al actualizar el estado", "error");
      onCloseModal();
      return;
    });
  };

  return (
    <>
      <LayoutManagement
        title="Reglas del Módulo de Referidos"
        search={handleSearch}
        onClick={handleCreate}
        filter={handleFilter}
        labelButton="Agregar"
        clearFilter={() => {
          setFromDate("");
          setToDate("");
          setStatus(0);
        }}
      >
        <TableManagement
          title="Reglas del Módulo de Referidos"
          nowPage={pageNumber}
          data={data}
          changePage={handleChangePage}
          countItems={countItems}
          includeFields={{
            code: "Código",
            name: "Nombre",
            description: "Descripción",
            createdAt: "Fecha",
            status: "Estado",
            totalParticipants: "Participantes",
          }}
          voidEdit={handleEdit}
          isPending={!isPending}
          handleUpdateItem={handleUpdateStatus}
        />
      </LayoutManagement>
      <ModalStandard
        open={openFilter}
        onCloseModal={onCloseModalFilter}
        title=""
      >
        <div className="grid grid-cols-2 gap-x-3">
          <InputDateUi
            title="Desde"
            placeholder="Ingrese una fecha"
            name="initialDate"
            disabled={false}
            value={fromDate}
            onChange={(e: any) => setFromDate(e.target.value)}
          />
          <InputDateUi
            title="Hasta"
            placeholder="Ingrese una fecha"
            name="finalDate"
            disabled={false}
            value={toDate}
            onChange={(e: any) => setToDate(e.target.value)}
          />
        </div>
        <DivJustifyItemsCenter>
          <div className="grid grid-cols-1 gap-x-3">
            <InputSelectStandard
              title="Estado"
              name="status"
              placeholder="Seleccione un estado"
              value={status.toString()}
              options={[
                { label: "Inactivo", value: 1 },
                { label: "Activo", value: 2 },
              ]}
              onChange={(e: any) => {
                setStatus(e.target.value);
              }}
            />
          </div>
        </DivJustifyItemsCenter>
        <DivJustifyItemsCenter>
          <div className="grid grid-cols-2 gap-x-3">
            <ButtonOutlineUi onClick={onCloseModalFilter}>
              <span className="text-md ">Cancelar</span>
            </ButtonOutlineUi>
            <ButtonUi type="submit" onClick={handleSudmitFilter}>
              <span className="text-md ">Buscar</span>
            </ButtonUi>
          </div>
        </DivJustifyItemsCenter>
      </ModalStandard>
      <ModalAlertUI
        title={info.title}
        open={open}
        onCloseModal={onCloseModal}
        handleProcess={handleProcessDelete}
      />
    </>
  );
}
