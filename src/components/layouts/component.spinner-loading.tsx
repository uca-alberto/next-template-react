import { SpinnerUi } from "../common/component.common";
import { DivJustifyItemsCenter } from "./component.divs";

export const SpinnerLoading = ({ isPending = true }) => {
  return (
    <>
      <div className="h-full">
        <DivJustifyItemsCenter>
          {isPending ? (
            <>
              <p className="text-lg font-semibold text-[#391446]/90 animate-pulse">
                Cargando...
              </p>
              <SpinnerUi />
            </>
          ) : (
            <p className="text-lg font-semibold text-[#391446]/90">
              No hay informacion para mostrar.
            </p>
          )}
        </DivJustifyItemsCenter>
      </div>
    </>
  );
};
