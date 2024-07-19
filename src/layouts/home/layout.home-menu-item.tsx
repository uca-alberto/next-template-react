import { useNavigate } from "react-router-dom";
import Icon from "../../components/common/icon";
import { IMenuItem } from "../../utils/util.interface";

export const MenuItemComponent = ({ item }: { item: IMenuItem }) => {
  const navigateTo = useNavigate();
  return (
    <button
      onClick={() => navigateTo(item?.path ?? "")}
      className="w-full h-16 flex justify-center items-center px-2 my-3 bg-white/25 shadow-md rounded-lg text-[#7F5574] font-semibold hover:bg-[#7F5574]/5  transition-all duration-300 ease-in-out hovver:shadow-lg hover:scale-105 hover:shadow-[#7F5574]/50"
    >
      <Icon name={item.icon} size={24} />
      <span className="pl-4">{item.title}</span>
    </button>
  );
};
