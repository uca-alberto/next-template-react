import { useState } from "react";
import { LayoutManagement } from "../../components/layouts/management.component";
import TableManagement from "../../components/table/management.table";
import { ModalAlertUI } from "../../components/common/component.common";
import { useQuery } from "@tanstack/react-query";
import { callApis } from "../../utils/util.callfetch";
import { useToast } from "../../contexts/toastProvider";

export default function LayoutMenu() {
  const { pushNotify } = useToast();
  const [open, setOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [countItems, setCountItems] = useState(0);

  const [info, setInfo] = useState({
    uuid: "",
    mode: "",
    title: "",
    status: false,
  });
  const [dispense, setDispense] = useState("");

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleFetch = async () => {
    return await callApis({
      base: "MENU",
      api: "list",
      method: "GET",
      useToken: true,
    })
      .then((res) => {
        setCountItems(res.response.length);
        return res.response;
      })
      .catch(() => {
        return [];
      });
  };

  const { data, isPending } = useQuery({
    queryKey: ["menu-list", dispense],
    queryFn: () => handleFetch(),
  });

  const handleChangePage = async (page: { pageNumber: number }) => {
    setPageNumber(page?.pageNumber ?? 0);
    return;
  };

  const handleUpdateStatus = async (id: string, status: boolean) => {
    setInfo(
      Object.assign({}, info, {
        uuid: id,
        mode: "status",
        title: status
          ? "¿Esta seguro que desea activar esta opción del menú?"
          : "¿Esta seguro que desea desactivar esta opción del menú?",
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
      base: "MENU",
      api: "edit",
      method: "PUT",
      useToken: true,
      params,
      body: { status },
    }).then((res) => {
      setDispense("status");
      if (res.status == 200) {
        pushNotify("Estado actualizado correctamente", "success");
        onCloseModal();
        return;
      }
      pushNotify(res.message ?? "Ha ocurrido un error", "error");
      onCloseModal();
      return;
    });
  };

  return (
    <>
      <LayoutManagement
        title="ADMINISTRACIÓN DE MENÚ"
        isViewButton={false}
        isViewForm={false}
      >
        <TableManagement
          title="Menú principal"
          nowPage={pageNumber}
          data={data || []}
          changePage={handleChangePage}
          countItems={countItems}
          includeFields={{
            name: "opciones menú",
            status: "Estado",
            userName: "Nombre de usuario",
            updated_at: "Actualizado el",
          }}
          heightTable="auto"
          handleUpdateItem={handleUpdateStatus}
          isPending={!isPending}
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
