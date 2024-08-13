import { useState } from "react";
import { LayoutManagement } from "../../components/layouts/management.component";
import TableManagement from "../../components/table/management.table";
import {
  ButtonOutlineUi,
  ButtonUi,
  InputDateUi,
} from "../../components/common/component.common";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { callApis } from "../../utils/util.callfetch";
import { ModalStandard } from "../../components/common/modal/component.modal";
import { DivJustifyItemsCenter } from "../../components/layouts/component.divs";
import { InputSelectStandard } from "../../components/common/input/input-select";
import { getFormattedparseISO } from "../../utils/validate-schema.util";

export default function LayoutBenefit() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [countItems, setCountItems] = useState(0);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState(0);
  const [dateParam, setDateParam] = useState({
    fromDate: "",
    toDate: "",
    status: 0,
  });

  const onCloseModalFilter = () => setOpenFilter(false);

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
      base: "BENEFIT",
      api: "list",
      method: "GET",
      useToken: true,
      params,
    })
      .then((res) => {
        setCountItems(res.response.count);
        res.response.list.map((item: any) => {
          switch (item.status) {
            case 1:
              item.statusGlobal = "Pendiente";
              break;
            case 2:
              item.statusGlobal = "Inactivo";
              break;
            case 3:
              item.statusGlobal = "Activo";
              break;
            case 4:
              item.statusGlobal = "Anulado";
              break;
            default:
              break;
          }
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
    queryKey: ["benefit-list", search, pageNumber, dateParam],
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
    navigate("/benefit/create");
  };

  const handleEdit = (id: number) => {
    navigate(`/benefit/edit/${id}`);
  };

  return (
    <>
      <LayoutManagement
        title="Beneficios"
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
          title="Lista de Beneficios"
          nowPage={pageNumber}
          data={data}
          changePage={handleChangePage}
          countItems={countItems}
          includeFields={{
            code: "Código",
            name: "Nombre",
            description: "Descripción",
            createdAt: "Fecha",
            requiredPoints: "Puntos",
            statusGlobal: "Estado",
            totalParticipants: "Participantes",
          }}
          voidEdit={handleEdit}
          isPending={!isPending}
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
                { label: "Pendiente", value: 1 },
                { label: "Inactivo", value: 2 },
                { label: "Activo", value: 3 },
                { label: "Anulado", value: 4 },
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
    </>
  );
}
