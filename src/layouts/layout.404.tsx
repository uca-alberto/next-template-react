import { useNavigate } from "react-router-dom";
import { ButtonOutlineUi } from "../components/common/component.common";
import { DivJustifyItemsCenter } from "../components/layouts/component.divs";

export default function NoMatch() {
  const navigate = useNavigate();
  const handleGoHome = () => navigate("/");
  return (
    <DivJustifyItemsCenter>
      <div className=" grid gap-3">
        <h1 className="text-xl font-semibold ">404 - Not Found!</h1>
        <ButtonOutlineUi onClick={handleGoHome}>Regresa al inicio</ButtonOutlineUi>
      </div>
    </DivJustifyItemsCenter>
  );
}
