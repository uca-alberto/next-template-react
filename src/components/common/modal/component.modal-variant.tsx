import { IPropsModalUiAlert } from "../../../utils/util.interface";
import { ButtonOutlineUi, ButtonUi, ModalUi } from "../component.common";

export const ModalAlert = (props: IPropsModalUiAlert) => {
  const { open, onCloseModal, handleProcess, title } = props;
  return (
    <ModalUi open={open} onCloseModal={onCloseModal}>
      <div className="p-8">
        <div className="flex justify-center mt-2 mb-8 ">
          <p className="text-lg">{title}</p>
        </div>
        <div className="w-full grid grid-cols-2 justify-center items-center gap-x-4">
          <div className="flex justify-center">
            <ButtonOutlineUi onClick={onCloseModal}>
              <span className="text-md ">Cancelar</span>
            </ButtonOutlineUi>
          </div>
          <div className="flex justify-center">
            <ButtonUi onClick={handleProcess}>
              <span className="text-md ">Aceptar</span>
            </ButtonUi>
          </div>
        </div>
      </div>
    </ModalUi>
  );
};
