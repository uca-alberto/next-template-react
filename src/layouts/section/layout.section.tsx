import { useState } from "react";
import { LayoutManagement } from "../../components/layouts/management.component";
import TableManagement from "../../components/table/management.table";
import { ModalAlertUI } from "../../components/common/component.common";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { callApis } from "../../utils/util.callfetch";
import { useToast } from "../../contexts/toastProvider";

export default function LayoutSection() {
  const navigate = useNavigate();
  const { pushNotify } = useToast();
  const [open, setOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

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
      base: "SECTION",
      api: "list",
      method: "GET",
      useToken: true,
      //params,
    })
      .then((res) => {
        return res.response;
      })
      .catch(() => {
        return [];
      });
  };

  const { data, isPending } = useQuery({
    queryKey: ["section-list", dispense],
    queryFn: () => handleFetch(),
  });

  const handleChangePage = async (page: { pageNumber: number }) => {
    setPageNumber(page?.pageNumber ?? 0);
    return;
  };

  const handleEdit = (id: number) => {
    navigate(`/section/edit/${id}`);
  };

  const handleUpdateStatus = async (id: string, status: boolean) => {
    setInfo(
      Object.assign({}, info, {
        uuid: id,
        mode: "status",
        title: status
          ? "¿Esta seguro que desea activar esta sección?"
          : "¿Esta seguro que desea desactivar esta sección?",
        status: status,
      })
    );
    onOpenModal();
  };

  const handleProcessDelete = async () => {
    setDispense("delete");

    if (info.mode === "status") {
      return await fetchUpdateStatus(info.uuid, info.status);
    }
  };

  const fetchUpdateStatus = async (id: string, status: boolean) => {
    const params = {
      id,
    };

    return await callApis({
      base: "SECTION",
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
      <div className="pb-4 ">
        <LayoutManagement
          title="ADMINISTRACIÓN DE SECCIONES"
          isViewButton={false}
          isViewForm={false}
        >
          <TableManagement
            title="Lista de secciones con Slider"
            nowPage={pageNumber}
            data={data?.editable || []}
            changePage={handleChangePage}
            countItems={data?.editable.length || 0}
            includeFields={{
              title: "Sección",
              quantity: "Número de Tarjetas",
              status: "Estado",
              userName: "Nombre de usuario",
              updated_at: "Actualizado el",
            }}
            heightTable="auto"
            voidEdit={handleEdit}
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
      </div>
      <TableManagement
        title="Lista de secciones sin Slider"
        nowPage={pageNumber}
        data={data?.noEditable || []}
        changePage={handleChangePage}
        countItems={data?.noEditable.length || 0}
        includeFields={{
          title: "Sección",
          status: "Estado",
          userName: "Nombre de usuario",
          updated_at: "Actualizado el",
        }}
        heightTable="auto"
        handleUpdateItem={handleUpdateStatus}
        isPending={!isPending}
      />
    </>
  );
}
