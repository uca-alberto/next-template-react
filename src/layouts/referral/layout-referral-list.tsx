import { useState } from "react";
import { LayoutManagement } from "../../components/layouts/management.component";
import TableManagement from "../../components/table/management.table";
import { ModalReferralForm } from "./components/modal-referral-form";
import { callApis } from "../../utils/util.callfetch";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function LayoutReferralList() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
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

    const handleFetch = async (props: any) => {
        const params = {
            offset: props?.number ?? 1,
            limit: 10,
            fromDate: props?.fromDateParam ?? "",
            toDate: props?.toDateParam ?? "",
            search: props?.label ?? "",
            status: props?.status ?? 0,
        };
        return await callApis({
            base: "REFERRAL",
            api: "list",
            method: "GET",
            useToken: true,
            params,
        })
            .then((res) => {

                setCountItems(res.response.total);
                if (res.response) {
                    const list = res.response.list.map((item: any) => {
                        const element = item;
                        element.name = `${item.first_name} ${item.last_name}`;
                        return element;
                    });

                    return list;
                }
                return [];
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


    const handleEdit = (id: number) => {
        navigate(`/referral/list/edit/${id}`);
    };

    return (
        <>
            <LayoutManagement
                title="Lista de referidos"
                search={handleSearch}
                filter={handleFilter}
            >
                <TableManagement
                    title="Lista de referidos"
                    nowPage={pageNumber}
                    data={data}
                    changePage={handleChangePage}
                    countItems={countItems}
                    includeFields={{
                        name: "Nombre Completo",
                        created_at: "Fecha",
                        status: "Estado",

                    }}
                    isPending={!isPending}
                    voidEdit={handleEdit}

                />
            </LayoutManagement>


        </>
    )
}