import { useState } from "react";
import TableManagement from "../../components/table/management.table";
import { useQuery } from "@tanstack/react-query";
import { callApis } from "../../utils/util.callfetch";
import { LayoutListFilter } from "./component.filter";

export default function LayoutUserTracking() {
  const [countItems, setCountItems] = useState(0);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [dispense] = useState("");

  const handleFetch = async (props: any, pageNumber: number) => {
    const { initialDate = "", finalDate = "", event = "", page = "" } = props;

    const params = {
      initialDate,
      finalDate,
      event,
      page,
      pageNumber,
    };

    return await callApis({
      base: "USER_TRACKING",
      api: "list",
      method: "GET",
      params,
      useToken: true,
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
    queryKey: ["user-tracking-list", search, pageNumber, dispense],
    queryFn: () => handleFetch(search, pageNumber),
  });

  const handleChangePage = async (page: { pageNumber: number }) => {
    setPageNumber(page?.pageNumber ?? 0);
    return;
  };

  const handleFetchEvent = async () => {
    return await callApis({
      base: "USER_TRACKING",
      api: "events",
      method: "GET",
      useToken: true,
    }).then((res) => {
      return res.response.map((s: any) => {
        return {
          label: s.name,
        };
      });
    });
  };

  const { data: events } = useQuery({
    queryKey: ["event-list"],
    queryFn: () => handleFetchEvent(),
  });

  const handleFetchPage = async () => {
    return await callApis({
      base: "USER_TRACKING",
      api: "pages",
      method: "GET",
      useToken: true,
    }).then((res) => {
      return res.response.map((a: any) => {
        return {
          label: a.name,
        };
      });
    });
  };

  const { data: pages } = useQuery({
    queryKey: ["pages-list"],
    queryFn: () => handleFetchPage(),
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    setPageNumber(1);
  };

  return (
    <>
      <LayoutListFilter
        title="REPORTE DE CONCILIACIÓN TRACKING USUARIOS"
        data={{ events, pages }}
        search={handleSearch}
      >
        <TableManagement
          title="Lista de tracking de usuario"
          nowPage={pageNumber}
          data={data}
          changePage={handleChangePage}
          countItems={countItems}
          includeFields={{
            id: "Id",
            username: "Nombre",
            email: "Correo",
            pageEvents: "Evento",
            page: "Pagina",
            created_at: "Fecha creación",
          }}
          isPending={!isPending}
        />
      </LayoutListFilter>
    </>
  );
}
