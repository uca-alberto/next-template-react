import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { callApis } from "../utils/util.callfetch";

const handleFetch = async (props: any) => {
     const params = {
          search: props.label,
          pageNumber: props?.pageNumber || 0,
     };
     return await callApis({
          base: props.base,
          api: "list",
          method: "GET",
          useToken: true,
          params,
     })
          .then((res: any) => {
               return res.response.list;
          })
          .catch(() => {
               return [];
          });
};

interface IUseListOptions {
     search: string;
     base: string;
     pageNumber?: number;
}

const useListHook = (queryKey: string[], { search, base, pageNumber }: IUseListOptions): UseQueryResult<any, Error> => {
     return useQuery({
          queryKey: [...queryKey, search, base, pageNumber],
          queryFn: () => handleFetch({ label: search, base, pageNumber }),
     });
};

export default useListHook;