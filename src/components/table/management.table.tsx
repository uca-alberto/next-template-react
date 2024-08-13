import { useState, useEffect, memo } from "react";
import { columnsFilter } from "../../utils/util.columns";
import TableComponent from "./component.table";
import { IPropsTableManagement } from "../../utils/util.interface";
import { SpinnerLoading } from "../layouts/component.spinner-loading";

const MemoTableComponent = memo(TableComponent);

export default function TableManagement({
  title,
  icon,
  nowPage = 0,
  data,
  changePage,
  countItems = 0,
  includeFields = {},
  isPending = true,
  heightTable,
  hideFooter = false,
  handleUpdateItem,
  onDownload,
  voidDelete,
  voidEdit,
  voidView,
  selectItem,
  voidEditItem,
}: IPropsTableManagement) {
  const [loading, setLoading] = useState<boolean>(false);
  const [array, setArray] = useState<any[]>([]);
  const [columns, setColumns] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (data?.length > 0) {
      const columnsData = columnsFilter({ includeFields });

      setColumns(columnsData);
      setCurrentPage(nowPage);
      setArray(data);
      setLoading(true);
      return;
    }
    setLoading(false);
  }, [data]);

  const goToNextPage = () => {
    const pageNow = currentPage + 1;
    changePage({ pageNumber: pageNow }).then(() => {
      setCurrentPage(pageNow);
      return;
    });
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      const pageNow = currentPage - 1;
      changePage({ pageNumber: pageNow }).then(() => {
        setCurrentPage(pageNow);
        return;
      });
    }
  };

  return (
    <>
      {loading && isPending ? (
        <MemoTableComponent
          title={title}
          icon={icon}
          columns={columns}
          data={array}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={countItems}
          onNextPage={goToNextPage}
          onPreviousPage={goToPreviousPage}
          handleDownload={onDownload}
          voidDelete={voidDelete}
          voidEdit={voidEdit}
          voidView={voidView}
          handleUpdateItem={handleUpdateItem}
          heightTable={heightTable}
          selectItem={selectItem}
          hideFooter={hideFooter}
          voidEditItem={voidEditItem}
        />
      ) : (
        <div className="h-[500px] bg-white/80 rounded-lg ">
          <SpinnerLoading isPending={loading} />
        </div>
      )}
    </>
  );
}
