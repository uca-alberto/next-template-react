import { useState } from "react";
import { LayoutManagement } from "../../components/layouts/management.component";
import TableManagement from "../../components/table/management.table";
import { ModalAlertUI } from "../../components/common/component.common";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { callApis } from "../../utils/util.callfetch";
import { useToast } from "../../contexts/toastProvider";
import { labels_list as labels } from "./interface.role";

export default function LayoutRole() {
  const navigate = useNavigate();
  const { pushNotify } = useToast();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [countItems, setCountItems] = useState(0);
  const [info, setInfo] = useState({ uuid: "", mode: "", title: "", status: false });
  const [dispense, setDispense] = useState("");

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleFetch = async (props: any) => {
    const params = {
      search: props.label,
      pageNumber: props?.number ?? 1,
    };
    return await callApis({
      base: labels.base,
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
    queryKey: ["role-list", search, pageNumber, dispense],
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
    navigate(`${labels.path}/create`);
  };

  const handleEdit = (id: number) => {
    navigate(`${labels.path}/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    setInfo(
      Object.assign({}, info, {
        uuid: id,
        mode: "delete",
        title: `¿Esta seguro que desea eliminar este ${labels.min}?`,
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
          ? `¿Esta seguro que desea activar este ${labels.min}?`
          : `¿Esta seguro que desea desactivar este ${labels.min}?`,
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
      base: labels.base,
      api: "delete",
      method: "DELETE",
      useToken: true,
      params,
    }).then((res) => {
      onCloseModal();
      const response = res.response;
      const messageError = response?.error ?? labels.messageErrorDelete;
      const message = res.status === 200 ? labels.messageDelete : messageError;
      if (res.status === 200) {
        setDispense("delete");
        setSearch("  ");
        pushNotify(labels.messageDelete, "success");
        return;
      }
      pushNotify(message, "error");
      return;
    });
  };

  const fetchUpdateStatus = async (id: string, status: boolean) => {
    const params = {
      id,
    };
    return await callApis({
      base: labels.base,
      api: "status",
      method: "PUT",
      useToken: true,
      params,
      body: { status },
    }).then((res) => {
      onCloseModal();
      const response = res.response;
      const messageError = response?.error ?? labels.messageErrorUpdate;
      const message = res.status === 200 ? labels.messageUpdate : messageError;
      if (res.status === 200) {
        setDispense("status");
        setSearch(" ");
        pushNotify(message, "success");
        return;
      }
      pushNotify(message, "error");
      return;
    });
  };

  return (
    <>
      <LayoutManagement
        title={labels.title}
        search={handleSearch}
        onClick={handleCreate}
        labelButton={labels.createButton}
      >
        <TableManagement
          title={labels.tableTitle}
          nowPage={pageNumber}
          data={data}
          changePage={handleChangePage}
          countItems={countItems}
          includeFields={labels.includeFields}
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
