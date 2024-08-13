import { useState } from "react";
import { LayoutManagement } from "../../components/layouts/management.component";
import TableManagement from "../../components/table/management.table";
import { ModalReferralForm } from "./components/modal-referral-form";
import { callApis } from "../../utils/util.callfetch";
import { useQuery } from "@tanstack/react-query";
import { ModalAlertUI } from "../../components/common/component.common";
import { useToast } from "../../contexts/toastProvider";

export default function LayoutReferralForm() {
    const { pushNotify } = useToast();

    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [openMessage, setOpenMessage] = useState(false);
    const [dispense, setDispense] = useState("");

    const [openFilter, setOpenFilter] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [countItems, setCountItems] = useState(0);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [status, setStatus] = useState(0);
    const [dateParam, setDateParam] = useState({
        fromDate: "",
        toDate: "",
        status: 0,
    });

    const onOpenModalMessage = () => setOpenMessage(true);
    const onCloseModalMessage = () => setOpenMessage(false);


    const [info, setInfo] = useState({
        uuid: "",
        mode: "",
        title: "",
        status: false,
    });

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
            base: "REFERRAL_FORM",
            api: "item",
            method: "GET",
            useToken: true,
            params,
        })
            .then((res) => {

                setCountItems(res.response.total);
                return res.response.list;
            })
            .catch(() => {
                return [];
            });
    };

    const handleSubmitFilter = () => {
        setOpenFilter(!openFilter);
        setDateParam({
            ...dateParam,
            fromDate: fromDate,
            toDate: toDate,
            status: status,
        });
    };

    const { data, isPending } = useQuery({
        queryKey: ["referral-form-list", search, pageNumber, dispense, dateParam],
        queryFn: () =>
            handleFetch({
                label: search,
                number: pageNumber,
                fromDateParam: fromDate,
                toDateParam: toDate,
                status: status,
            }),
    });

    const handleUpdateStatus = async (id: string, status: boolean) => {
        setInfo(
            Object.assign({}, info, {
                uuid: id,
                mode: "status",
                title: status
                    ? "¿Esta seguro que desea activar este campo?"
                    : "¿Esta seguro que desea desactivar este campo?",
                status: status,
            })
        );
        onOpenModalMessage();
    };

    const fetchUpdateStatus = async (uuid: string, status: boolean) => {
        const params = {
            id: uuid,
        }
        const data = {
            status
        }
        return await callApis({
            base: "REFERRAL_FORM",
            api: "status",
            method: "PUT",
            useToken: true,
            body: data,
            params: params
        }).then((res) => {
            const { message = "" } = res;
            if (res.status === 200) {
                pushNotify(message, "success");
                onCloseModalMessage();
                setDispense("status");

                return;
            }
            pushNotify(message ?? "Ha ocurrido un error", "error");
            return;
        });
    }


    const handleChangePage = async (page: { pageNumber: number }) => {
        setPageNumber(page?.pageNumber ?? 0);
        return;
    };
    const handleSearch = (value: string) => {
        console.log('handleSearch', value);

        setSearch(value);
        setPageNumber(0);
    };

    const handleFilter = () => {
        setOpenFilter(!openFilter);
    };

    const handleCreate = () => {
        setOpen(true);

    };

    const onCloseModal = () => setOpen(false);

    const handleProcessDelete = async () => {
        setDispense("");

        return await fetchUpdateStatus(info.uuid, info.status);
    };

    return (
        <>
            <LayoutManagement
                title="Formulario de Referidos"
                search={handleSearch}
                onClick={handleCreate}
                filter={handleFilter}
                labelButton="Agregar"
            >
                <TableManagement
                    title="Lista de campos"
                    nowPage={pageNumber}
                    data={data}
                    changePage={handleChangePage}
                    countItems={countItems}
                    includeFields={{
                        name: "Nombre",
                        createdAt: "Fecha",
                        fieldType: "Tipo de campo",
                        fieldLength: "Longitud",
                        order: "Orden",
                        status: "Estado",
                    }}
                    isPending={!isPending}
                    handleUpdateItem={handleUpdateStatus}

                />
            </LayoutManagement>

            <ModalReferralForm
                open={open}
                onCloseModal={onCloseModal}
            >

            </ModalReferralForm>
            <ModalAlertUI
                title={info.title}
                open={openMessage}
                onCloseModal={onCloseModalMessage}
                handleProcess={handleProcessDelete}
            />
        </>
    )
}