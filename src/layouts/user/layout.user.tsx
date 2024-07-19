import { useState } from "react";
import { LayoutManagement } from "../../components/layouts/management.component";
import TableManagement from "../../components/table/management.table";
import { ModalAlertUI } from "../../components/common/component.common";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { callApis } from "../../utils/util.callfetch";
import { useToast } from "../../contexts/toastProvider";

export default function LayoutUser() {
  const navigate = useNavigate();
  const { pushNotify } = useToast();
  const [search, setSearch] = useState("");
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

  const handleFetch = async (props: any) => {
    const params = {
      search: props.label,
      pageNumber: props?.number ?? 1,
    };
    return await callApis({
      base: "USER",
      api: "list",
      method: "GET",
      useToken: true,
      params,
    })
      .then((res) => {
        setCountItems(res.response.count);
        return res.response.list;
      })
      .catch(() => {
        return [];
      });
  };

  const { data, isPending } = useQuery({
    queryKey: ["user-list", search, pageNumber, dispense],
    queryFn: () => handleFetch({ label: search, number: pageNumber }),
  });

  const handleChangePage = async (page: { pageNumber: number }) => {
    setPageNumber(page?.pageNumber ?? 0);
    return;
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPageNumber(1);
  };

  const handleCreate = () => {
    navigate("/user/create");
  };

  const handleEdit = (id: number) => {
    navigate(`/user/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    setInfo(
      Object.assign({}, info, {
        uuid: id,
        mode: "delete",
        title: "¿Esta seguro que desea eliminar este usuario?",
      })
    );
    onOpenModal();
  };

  const handleUpdateStatus = async (id: string, status: boolean) => {
    setInfo(
      Object.assign({}, info, {
        uuid: id,
        mode: "status",
        title: status
          ? "¿Esta seguro que desea activar este usuario?"
          : "¿Esta seguro que desea desactivar este usuario?",
        status: status,
      })
    );
    onOpenModal();
  };

  const handleProcessDelete = async () => {
    setDispense("");
    if (info.mode === "delete") {
      return await fetchDeleteItem(info.uuid);
    }
    if (info.mode === "status") {
      return await fetchUpdateStatus(info.uuid, info.status);
    }
  };

  const fetchDeleteItem = async (id: string) => {
    const params = {
      id: id,
    };
    return await callApis({
      base: "USER",
      api: "delete",
      method: "DELETE",
      useToken: true,
      params,
    }).then((res) => {
      if (res.status === 200) {
        setDispense("delete");
        setSearch("  ");
        pushNotify("Usuario eliminado correctamente", "success");
        onCloseModal();
        return;
      }
      return;
    });
  };

  const fetchUpdateStatus = async (id: string, status: boolean) => {
    const params = {
      id,
    };
    return await callApis({
      base: "USER",
      api: "status",
      method: "PUT",
      useToken: true,
      params,
      body: { status },
    }).then((res) => {
      if (res.status === 200) {
        setDispense("status");
        setSearch(" ");
        pushNotify("Estado actualizado correctamente", "success");
        onCloseModal();
        return;
      }
      return;
    });
  };

  return (
    <>
      <LayoutManagement
        title="Usuarios"
        search={handleSearch}
        onClick={handleCreate}
        labelButton="Crear"
      >
        <TableManagement
          title="Lista de usuarios"
          nowPage={pageNumber}
          data={data}
          changePage={handleChangePage}
          countItems={countItems}
          includeFields={{
            name: "Nombre",
            lastName: "Apellido",
            email: "Correo",
            role: "Rol",
            status: "Estado",
            verifyAccount: "Verificado",
            createdAt: "Creado el",
            updatedAt: "Actualizado el",
          }}
          voidDelete={handleDelete}
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
    </>
  );
}
