import { ToggleUi } from "../../../components/common/component.common";
import { translate } from "../interface.role";

export const DivSecondaryRole = ({
  item,
  handleSelectChindren,
}: {
  item: any;
  handleSelectChindren: any;
}) => {
  return (
    <>
      {item?.open && (
        <div className="flex flex-col mx-2 mt-3 p-2 rounded-lg shadow-sm border border-[#7F5574]/10">
          {item?.childrenModules &&
            item?.childrenModules.map((child: any, i: number) => (
              <div
                key={"children" + i}
                className="w-full grid grid-cols-1 md:grid-cols-5 gap-2 my-2 "
              >
                <div className="col-span-2 flex items-center pl-2 m-2">
                  <p className="text-[#391446]">{child.name}</p>
                </div>
                <div className="col-span-3 grid grid-flow-col gap-2 divide-x divide-[#7F5574]/10">
                  {child?.action.map((action: any, j: number) => (
                    <ToggleUi
                      key={"action" + j}
                      name={action.action + "-" + child.id}
                      label={translate[action.action as keyof typeof translate]}
                      value={action?.status}
                      onChange={(e) =>
                        handleSelectChindren(e.target.checked, action, child.id, item.id)
                      }
                      row={false}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};
