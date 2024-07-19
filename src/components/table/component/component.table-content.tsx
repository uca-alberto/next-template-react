import { RiDeleteBin6Line, RiEdit2Line, RiEyeFill } from "@remixicon/react";
import { ButtonIconUi, ToggleUi } from "../../common/component.common";
import { IPropsTableContent } from "../../../utils/util.interface";
import { DivJustifyItemsCenter } from "../../layouts/component.divs";
import { usePermission } from "../../../contexts/permissionsProvider";

export const TableContentComponent = ({
  columnsState,
  obj,
  index,
  handleUpdateItem,
  handleSelectItem,
  voidEdit,
  voidDelete,
  voidView,
}: IPropsTableContent) => {
  const permission = usePermission();

  const statusEdit = permission?.hasPermission("WRITE");
  const statusDelete = permission?.hasPermission("DELETE");

  const getDisplayValue = (field: string, obj: { [key: string]: any }) => {
    switch (field) {
      case "status":
        return (
          <DivJustifyItemsCenter>
            <ToggleUi
              name="status"
              value={obj[field]}
              disabled={!statusEdit}
              onChange={() => handleUpdateItem(obj?.id, !obj[field])}
            />
          </DivJustifyItemsCenter>
        );
      case "verifyAccount":
        return (
          <>
            <div className="text-center">{obj[field] ? "Si" : "No"}</div>
          </>
        );
      case "createdAt":
      case "created_at":
        return new Date(obj[field]).toLocaleDateString();
      case "updatedAt":
      case "updated_at":
        return obj[field] ? new Date(obj[field]).toLocaleDateString() : "N/A";

      default:
        return obj[field] || "-";
    }
  };
  const classTR = index % 2 === 0 ? "bg-[#391446]/5" : "bg-[#391446]/10";
  return (
    <>
      <tr className={`${classTR}`} onClick={() => handleSelectItem(obj)}>
        {columnsState.length &&
          columnsState?.map((item: any, i: number) => (
            <CellComponent key={"row-columns" + i}>
              {getDisplayValue(item?.field, obj)}
            </CellComponent>
          ))}
        {voidEdit && (
          <CellComponent>
            <ButtonIconUi
              onClick={() => voidEdit(obj?.id)}
              disabled={!statusEdit}
            >
              <RiEdit2Line />
            </ButtonIconUi>
          </CellComponent>
        )}
        {voidDelete && (
          <CellComponent>
            <ButtonIconUi
              onClick={() => voidDelete(obj?.id, obj?.name)}
              disabled={!statusDelete}
            >
              <RiDeleteBin6Line />
            </ButtonIconUi>
          </CellComponent>
        )}
        {voidView && (
          <CellComponent>
            <ButtonIconUi onClick={() => voidView(obj?.id)}>
              <RiEyeFill />
            </ButtonIconUi>
          </CellComponent>
        )}
      </tr>
    </>
  );
};

const CellComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <td className="w-full min-w-32 px-3 py-1.5 whitespace-nowrap text-xs text-[#391446]">
      {children}
    </td>
  );
};
