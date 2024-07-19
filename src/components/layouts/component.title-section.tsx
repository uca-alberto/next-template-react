import { ButtonUi } from "../common/component.common";
import { IPropsTitleSection } from "../../utils/util.interface";
import { usePermission } from "../../contexts/permissionsProvider";
import { useLocation } from "react-router-dom";

export const TitleSection = (props: IPropsTitleSection) => {
  const { pathname } = useLocation();
  const permission = usePermission();

  const section = pathname.split("/")[2];
  const typeAction = section === "edit" ? "WRITE" : "CREATE";
  const statusCreate = permission?.hasPermission(typeAction);
  const { title, labelButton, icon, onClick, isViewButton = true } = props;

  return (
    <div className="w-full flex justify-between items-center my-6 mb-5">
      <div>
        <p className="text-2xl text-[#391446] font-bold">{title}</p>
      </div>
      {isViewButton && (
        <ButtonUi onClick={onClick} disabled={statusCreate}>
          <div className="flex justify-center items-center gap-3">
            {icon}
            <span className="text-md ">{labelButton}</span>
          </div>
        </ButtonUi>
      )}
    </div>
  );
};
