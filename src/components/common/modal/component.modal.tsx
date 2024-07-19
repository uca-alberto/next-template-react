import Modal from "react-responsive-modal";
import { IPropsModalUi } from "../../../utils/util.interface";

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
      <div className="flex flex-col">
        <div className="h-10 text-[#391446]">{title}</div>
        <div className="grid grid-cols-1 px-2">{children}</div>
      </div>
    </Modal>
  );
};
