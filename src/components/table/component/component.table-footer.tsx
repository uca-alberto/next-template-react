import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";
import { ButtonIconUi, ButtonUi } from "../../common/component.common";
import { IPropsTableFooter } from "../../../utils/util.interface";

export const TableFooterComponent = ({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  onNextPage,
  onPreviousPage,
  handleDownload,
}: IPropsTableFooter) => {
  return (
    <>
      <div className="pt-2 flex justify-between aling-center">
        <div className="grid grid-cols-2 gap-1">
          <ButtonIconUi onClick={onPreviousPage} disabled={currentPage === 1}>
            <RiArrowLeftLine size={20} />
          </ButtonIconUi>
          <ButtonIconUi onClick={onNextPage} disabled={currentPage === totalPages}>
            <RiArrowRightLine size={20} />
          </ButtonIconUi>
        </div>
        <div className="pt-1">
          {handleDownload && (
            <ButtonUi onClick={handleDownload} disabled={!totalItems}>
              Descargar
            </ButtonUi>
          )}
        </div>
        <div className="bg-[#391446]/20 mx-2 px-3 py-2 grid grid-cols-2 md:grid-cols-4 items-center rounded-md text-stone-700 text-xs ">
          <div className="md:col-span-2 text-center ">
            {startIndex} - {endIndex}
          </div>
          <div className="">total: {totalItems}</div>
        </div>
      </div>
    </>
  );
};
