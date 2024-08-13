import Icon from "../../components/common/icon";
import { useState } from "react";
import { IMenuItem } from "../../utils/util.interface";
import { motion } from "framer-motion";
import { MenuItemComponent } from "./layout.home-menu-item";

export const SubMenuComponent = ({ item }: { item: IMenuItem }) => {
  const [open, setOpen] = useState(false);
  const [isViewSection, setIsViewSection] = useState(true);

  const handleOpen = () => {
    setIsViewSection(false);
    setTimeout(() => {
      setIsViewSection(true);
      setOpen(!open);
    }, 100);
  };

  return (
    <>
      <div className="w-full">
        <button
          onClick={handleOpen}
          className=" h-32 w-60 flex justify-center items-center px-4 my-2 bg-white/75 shadow-lg rounded-lg text-[#222222] 
          font-semibold hover:bg-[#222222]/5  transition-all duration-300 ease-in-out hovver:shadow-xl hover:scale-105 hover:shadow-[#7F5574]/50"
        >
          <Icon name={item.icon} size={24} />
          <span className="pl-4">{item.title}</span>
        </button>

        {isViewSection && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
          >
            {open && (
              <div className="w-full flex flex-col justify-center ">
                {item.children?.map((subItem, index) => (
                  <MenuItemComponent key={index} item={subItem} />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </>
  );
};
