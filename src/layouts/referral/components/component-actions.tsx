import { RiListCheck, RiChatCheckLine } from "@remixicon/react";
import { useNavigate } from "react-router-dom";

export const ActionItems = () => {
  const navigate = useNavigate();
  const handleNavigateToReferralForm = () => {
    navigate("/referral/form");
  };

  const handleNavigateToReferralList = () => {
    navigate("/referral/list");
  };

  const handleNavigateToReferralRulerList = () => {
    navigate("/referral/ruler");
  };
  return (
    <>
      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 justify-center items-center">
        <button
          className="w-60 h-32 flex justify-center items-center px-2 my-3 font-semibold bg-white/25 shadow-md rounded-lg text-[#222222]
                     hover:bg-[#222222]/5 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:shadow-[#222222]/50"
          onClick={handleNavigateToReferralRulerList}
        >
          <RiChatCheckLine color={"Black"} size={24} />
          <div className="w-full flex flex-col ">
            <span>Reglas de Referidos</span>
          </div>
        </button>

        <button
          className="w-60 h-32 flex justify-center items-center px-2 my-3 font-semibold bg-white/25 shadow-md rounded-lg text-[#222222]
                     hover:bg-[#222222]/5 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:shadow-[#222222]/50"
          onClick={handleNavigateToReferralForm}
        >
          <RiChatCheckLine color={"Black"} size={24} />
          <div className="w-full flex flex-col ">
            <span>Configurar formulario de referido</span>
          </div>
        </button>

        <button
          className="w-60 h-32 flex justify-center items-center px-2 my-3 font-semibold bg-white/25 shadow-md 
                    rounded-lg text-[#222222] hover:bg-[#222222]/5 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:shadow-[#222222]/50"
          onClick={handleNavigateToReferralList}
        >
          <RiListCheck color={"Black"} size={24} />
          <div className="w-full flex flex-col ">
            <span>Lista de referidos</span>
          </div>
        </button>
      </div>
    </>
  );
};
