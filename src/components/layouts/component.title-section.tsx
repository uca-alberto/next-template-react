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
  const {
    title,
    labelButton,
    icon,
    onClick,
    isViewButton = true,
    color = "#DC8436",
  } = props;
  const style = {
    color: color,
  };
  const inputColor = `text-2xl text-[#391446] font-bold`;
  return (
    <div className="w-full flex justify-between items-center my-6 mb-5">
      <div>
        <p style={style} className={inputColor}>
          {title}
        </p>
      </div>
      {isViewButton && labelButton && (
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
