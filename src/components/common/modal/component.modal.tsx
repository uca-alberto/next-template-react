import Modal from "react-responsive-modal";
import { IPropsModalUi } from "../../../utils/util.interface";
import { DivJustifyItemsCenter } from "../../layouts/component.divs";

export const ModalStandard = (props: IPropsModalUi) => {
  const { open, onCloseModal, children, title } = props;
  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      center
      classNames={{
        modal: "rounded-lg p-2",
        overlay: "bg-[#7F5574]/35 bg-opacity-50",
      }}
    >
      <div className="flex flex-col min-w-[35rem]">
        <DivJustifyItemsCenter>
          <div className="h-10 text-2xl text-[#222222]">{title}</div>
        </DivJustifyItemsCenter>        
        <div className="grid grid-cols-1 px-2">{children}</div>
      </div>
    </Modal>
  );
};
