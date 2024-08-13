import { useState } from "react";
import { LayoutManagement } from "../../components/layouts/management.component";
import TableManagement from "../../components/table/management.table";
import { ModalAlertUI } from "../../components/common/component.common";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { callApis } from "../../utils/util.callfetch";
import { useToast } from "../../contexts/toastProvider";

export default function LayoutCatalog() {
  const navigate = useNavigate();
  const { pushNotify } = useToast();
  const [search, setSearch] = useState("");
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
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleFetch = async (props: any) => {
    const params = {
      offset: props?.number ?? 0,
      limit: 10,
      fromDate: props?.fromDateParam ?? "",
      toDate: props?.toDateParam ?? "",
      search: props?.label ?? "",
      status: props?.status ?? 0,
    };
    return await callApis({
      base: "CATALOG",
      api: "list",
      method: "GET",
      useToken: true,
      params,
    })
      .then((res) => {
        console.log(res);
        setCountItems(res.response.count);
        res.response.list.map((item: any) => {
          item.globalStatusCategory = item.status;
          return item;
        });
        return res.response.list;
      })
      .catch(() => {
        return [];
      });
  };
  const { data, isPending } = useQuery({
    queryKey: ["catalog-list", search, pageNumber, dispense],
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

  const handleCreate = () => {
    navigate("/catalog/create");
  };

  const handleEdit = (id: number) => {
    navigate(`/catalog/edit/${id}`);
  };

  const handleUpdateStatus = async (id: string, status: boolean) => {
    setInfo(
      Object.assign({}, info, {
        uuid: id,
        mode: "status",
        title: status
          ? "¿Esta seguro que desea activar este catálogo?"
          : "¿Esta seguro que desea desactivar este catálogo?",
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
      base: "CATALOG",
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
        title="Catálogo"
        search={handleSearch}
        onClick={handleCreate}
        isViewFilter={false}
        labelButton="Agregar"
        clearFilter={() => {
          setFromDate("");
          setToDate("");
          setStatus(0);
        }}
      >
        <TableManagement
          title="Lista de Catálogos"
          nowPage={pageNumber}
          data={data}
          changePage={handleChangePage}
          countItems={countItems}
          includeFields={{
            code: "Código",
            name: "Nombre",
            status: "Estado",
            createdBy: "Creado Por",
          }}
          voidEdit={handleEdit}
          isPending={!isPending}
          handleUpdateItem={handleUpdateStatus}
        />
      </LayoutManagement>
      <ModalAlertUI
        title={info.title}
        open={open}
        onCloseModal={onCloseModal}
        handleProcess={handleProcessDelete}
      />
    </>
  );
}
