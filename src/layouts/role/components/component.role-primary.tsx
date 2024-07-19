import { RiArrowDownCircleLine, RiArrowUpCircleLine } from "@remixicon/react";
import { ButtonIconUi } from "../../../components/common/component.common";
import { DivJustifyBetweenItemsCenter } from "../../../components/layouts/component.divs";

export const DivRowPrimaryRole = ({
  item,
  handleOpen,
}: {
  item: any;
  handleOpen: any;
}) => {
  return (
    <DivJustifyBetweenItemsCenter>
      <p className="text-[#391446]">{item.name}</p>
      <ButtonIconUi
        onClick={() => handleOpen(item)}
        disabled={!item?.childrenModules.length}
      >
        {item?.open ? <RiArrowUpCircleLine /> : <RiArrowDownCircleLine />}
      </ButtonIconUi>
    </DivJustifyBetweenItemsCenter>
  );
};
