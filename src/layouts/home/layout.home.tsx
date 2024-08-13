import LoyaltyLogo from "../../assets/logo-name.webp";
import { useEffect, useState } from "react";
import { SelectItemMenu } from "./layout.home-select-items";
import { AnimatePresence } from "framer-motion";
import { IMenuItem } from "../../utils/util.interface";
import { DashboardItems } from "./layout.dashboard-item"
export default function HomePage() {
  const [menu, setMenu] = useState<IMenuItem[]>(
    JSON.parse(localStorage.getItem("access") ?? "[]")
  );

  useEffect(() => {
    const access = localStorage.getItem("access");
    if (access && menu.length === 0) {
      setMenu(JSON.parse(access));
      return;
    }
  }, []);

  return (
    <>
      <div className="h-full w-full flex flex-col justify-center ">
        <div className="w-full flex justify-center h-32 ">

          <div className="flex items-center">
            <p className="px-4 pt-3">
              <span className="text-3xl font-bold text-[#ED7004]">Programa de Fidelización</span>
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col justify-center items-center container py-6">
          <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 justify-center items-start ">
            <AnimatePresence>
              {menu.map(
                (item: any, index) =>
                  item.title !== "Inicio" && <SelectItemMenu key={index} item={item} />
              )}
            </AnimatePresence>
          </div>
        </div>


        <div className="w-full flex flex-col justify-center items-center container py-6">
          <DashboardItems />
        </div>



      </div>
    </>
  );
}
