import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DivRowPrimaryRole } from "./component.role-primary";
import { DivSecondaryRole } from "./component.role-secondary";
import { SpinnerLoading } from "../../../components/layouts/component.spinner-loading";

export const SelectItems = ({ data, getItems }: { data: any[]; getItems: any }) => {
  const [items, setItems] = useState(data);

  useEffect(() => {
    if (data?.length > 0) {
      setItems(data);
    }
  }, [data]);

  useEffect(() => {
    if (getItems && items?.length > 0) {
      getItems(items);
    }
  }, [items]);

  const handleOpen = (item: any) => {
    item.open = !item?.open;
    setItems([...items]);
  };

  const handleSelectChindren = (
    checked: boolean,
    action: any,
    childId: number,
    parentId: number
  ) => {
    const index = items.findIndex((item) => item.id === parentId);
    const indexChild = items[index].childrenModules.findIndex(
      (child: any) => child.id === childId
    );
    const arrayAction = items[index].childrenModules[indexChild].action.map(
      (item: any) => {
        if (item.id === action.id) {
          items[index].action[0].status = checked;
          item.status = checked;
        }
        return item;
      }
    );
    items[index].childrenModules[indexChild].action = arrayAction;
    setItems([...items]);
  };

  return (
    <>
      <AnimatePresence>
        <div className="bg-white p-4 rounded-lg shadow-md grid grid-flow-row gap-y-3 divide-y divide-[#7F5574]/20">
          {items && data?.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ ease: "easeOut", duration: 0.2 }}
            >
              {items?.map((item: any, index: number) => (
                <div key={index} className={`w-full pt-3 px-2 flex flex-col`}>
                  <DivRowPrimaryRole item={item} handleOpen={handleOpen} />
                  {item?.open && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ ease: "easeOut", duration: 0.3 }}
                    >
                      <DivSecondaryRole
                        item={item}
                        handleSelectChindren={handleSelectChindren}
                      />
                    </motion.div>
                  )}
                </div>
              ))}
            </motion.div>
          ) : (
            <SpinnerLoading isPending={true} />
          )}
        </div>
      </AnimatePresence>
    </>
  );
};
