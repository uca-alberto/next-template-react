import { RiSave2Line } from "@remixicon/react";
import { IPropsChildrenHandleLayouts } from "../../utils/util.interface";
import { ButtonUi } from "../common/component.common";
import { DivJustifyEndItemsCenter } from "./component.divs";

export const FormikContainer = (props: IPropsChildrenHandleLayouts) => {
  const {
    children,
    handleSubmit,
    icon,
    label = "Guardar",
    loanding = false,
    hide = false,
  } = props;

  return (
    <form onSubmit={handleSubmit} className={loanding ? "animate-pulse " : ""}>
      <div className="flex flex-col gap-6">
        {children}
        <DivJustifyEndItemsCenter>
          {!hide && (
            <ButtonUi type="submit" disabled={!loanding}>
              <div className="flex justify-center items-center gap-3">
                {icon ?? <RiSave2Line />}
                <span className="text-md ">{label}</span>
              </div>
            </ButtonUi>
          )}
        </DivJustifyEndItemsCenter>
      </div>
    </form>
  );
};
