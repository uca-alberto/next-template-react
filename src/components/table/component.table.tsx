import { useState, useEffect, memo } from "react";
import { IPropsTableComponent } from "../../utils/util.interface";
import { TableFooterComponent } from "./component/component.table-footer";
import { TableHeaderComponent } from "./component/component.table-header";
import { TableContentComponent } from "./component/component.table-content";
import { TableHighComponent } from "./component/component.table-high";

const MemoTableFooterComponent = memo(TableFooterComponent);
const MemoTableHeaderComponent = memo(TableHeaderComponent);
const MemoTableContentComponent = memo(TableContentComponent);

const TableComponent = ({
  columns,
  data,
  currentPage,
  itemsPerPage,
  totalItems,
  title,
  icon,
  heightTable,
  hideFooter,
  handleUpdateItem,
  onNextPage,
  onPreviousPage,
  handleDownload,
  selectItem,
  voidDelete,
  voidEdit,
  voidView,
  voidEditItem,
}: IPropsTableComponent) => {
  const [columnsState, setColumnsState] = useState(columns ?? []);
  const [array, setArray] = useState<any[]>([]);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  useEffect(() => {
    if (!columns.length) return;
    const handleResize = () => {
      let numberArr = 0;
      const width = window.innerWidth;

      if (width < 640) {
        numberArr = 3;
      } else if (width >= 640 && width < 1024) {
        numberArr = 2;
      }

      const newColumns = numberArr ? columns.slice(0, -numberArr) : columns;
      setArray(data);
      setColumnsState(newColumns);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [columns]);

  const handleSelectItem = (obj: any) => {
    if (selectItem) {
      selectItem(obj);
    }
  };

  const handleUpdateStatus = (id: string, status: boolean) => {
    if (handleUpdateItem) {
      handleUpdateItem(id, status);
      return;
    }
  };

  return (
    <div className="bg-white/80 rounded-lg px-4 py-2 ">
      <div className="h-6 px-2 my-3 flex">
        {icon}
        <span className="indent-4 text-[#391446] font-medium">{title}</span>
      </div>
      <TableHighComponent heightTable={heightTable}>
        <table className="table-auto rounded-lg">
          <thead className="w-full bg-[#391446]/20 ">
            <MemoTableHeaderComponent
              columnsState={columnsState}
              voidEdit={voidEdit}
              voidDelete={voidDelete}
              voidView={voidView}
              voidEditItem={voidEditItem}
            />
          </thead>
          <tbody className="w-full">
            {array?.map((obj, index) => (
              <MemoTableContentComponent
                key={"row" + index + 1}
                columnsState={columnsState}
                obj={obj}
                index={index}
                handleUpdateItem={handleUpdateStatus}
                handleSelectItem={handleSelectItem}
                voidEdit={voidEdit}
                voidDelete={voidDelete}
                voidView={voidView}
                voidEditItem={voidEditItem}
              />
            ))}
          </tbody>
        </table>
      </TableHighComponent>
      {!hideFooter && (
        <MemoTableFooterComponent
          currentPage={currentPage}
          totalItems={totalItems}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
          handleDownload={handleDownload}
        />
      )}
    </div>
  );
};

export default TableComponent;
