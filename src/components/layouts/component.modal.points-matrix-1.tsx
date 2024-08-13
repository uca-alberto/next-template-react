import { useEffect, useState } from "react";
import { ModalStandard } from "../common/modal/component.modal";
import { DivJustifyItemsCenter } from "./component.divs";
import { ButtonUi, InputUi } from "../common/component.common";
import { ButtonWide } from "../common/buttons/button-standard";
import { callApis } from "../../utils/util.callfetch";

const LayoutModalPointMatrix1 = (props: any) => {
  const { labelButton, idFilter, modalTitle, onSave } = props;
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [info, setInfo] = useState<any>({});

  const onCloseModal = () => setOpen(false);
  const onOpenModal = () => {
    setOpen(true);
    fetchCategories();
  };
  const onSaveModal = async () => {
    onSave(info);
    onCloseModal();
  };

  const fetchCategories = () => {
    if (idFilter) {
      callApis({
        base: "PROGRAMS_RULES_CATEGORY",
        api: "getByIdProgramRule",
        method: "GET",
        useToken: true,
        params: { id: idFilter },
      }).then((res) => {

        const categories = res.response.map((item: any) => ({
          id: item.id,
          idProgramRuleCategory: item.idProgramRuleCategory,
          idPoints: item.idPoints,
          name: item.name,
          C1: item.C1,
          C2: item.C2,
          C3: item.C3,
          C4: item.C4,
          C5: item.C5,
        }));

        setCategories(categories);
        setInfo((prevInfo: any) => ({
          ...prevInfo,
          ...categories.reduce((acc: any, category: any) => {
            acc[category.id] = {
              id: category.id,
              idProgramRuleCategory: category.idProgramRuleCategory,
              idPoints: category.idPoints,
              name: category.name,
              C1: category.C1 ?? "",
              C2: category.C2 ?? "",
              C3: category.C3 ?? "",
              C4: category.C4 ?? "",
              C5: category.C5 ?? "",
            };
            return acc;
          }, {})
        }));
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <ButtonWide onClick={onOpenModal} color="#DC8436">
          {labelButton}
        </ButtonWide>
      </div>
      <ModalStandard open={open} onCloseModal={onCloseModal} title={modalTitle}>
        <div className="grid grid-cols-12 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-x-4">
          <div className="col-span-2">
            <span className="text-[#DC8436] font-medium text-md ">
              Categoría
            </span>
          </div>
          <div className="col-span-10">
            <DivJustifyItemsCenter>
              <span className="text-[#DC8436] font-medium text-md ">
                C. Pago
              </span>
            </DivJustifyItemsCenter>
          </div>
        </div>
        <div className="grid grid-cols-12 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-x-4 bg-[#CCCCCC]">
          <div className="col-span-2"></div>
          {["C1", "C2", "C3", "C4", "C5"].map((column) => (
            <div key={column} className="col-span-2">
              <DivJustifyItemsCenter>
                <span className="text-[#222222] font-bold text-md">{column}</span>
              </DivJustifyItemsCenter>
            </div>
          ))}
        </div>

        {categories.map((category: any) => (
          <div key={category.id} className="grid grid-cols-12 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-x-4">
            <div className="col-span-2 bg-[#CCCCCC]">
              <DivJustifyItemsCenter>
                <span className="text-[#222222] font-medium text-md">{category.name}</span>
              </DivJustifyItemsCenter>
            </div>
            {["C1", "C2", "C3", "C4", "C5"].map((column) => (
              <div key={column} className="col-span-2">
                <InputUi
                  title=""
                  placeholder=""
                  name={`puntos_${category.name.toLowerCase()}_${column.toLowerCase()}`}
                  value={info[category.id][column]}
                  onChange={(e) =>
                    setInfo((prevInfo: any) => ({
                      ...prevInfo,
                      [category.id]: {
                        ...prevInfo[category.id],
                        [column]: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            ))}
          </div>
        ))}

        <DivJustifyItemsCenter>
          <ButtonUi onClick={onCloseModal} color="#9E9E9E">Cancelar</ButtonUi>
          <ButtonUi onClick={onSaveModal}>Guardar</ButtonUi>
        </DivJustifyItemsCenter>
      </ModalStandard>
    </div>
  );

};
export { LayoutModalPointMatrix1 };