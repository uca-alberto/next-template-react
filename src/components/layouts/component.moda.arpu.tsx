import { useState } from "react";
import { ModalStandard } from "../common/modal/component.modal";
import { DivJustifyItemsCenter } from "./component.divs";
import { ButtonUi, InputUi } from "../common/component.common";
import { ButtonWide } from "../common/buttons/button-standard";
import { RiAddCircleFill } from "@remixicon/react";

const LayoutModalArpu = (props: any) => {
  const { labelButton, modalTitle, onSave, fields, values } = props;
  const [open, setOpen] = useState(false);
  const [arpu, setArpu] = useState(values ?? []);

  const onCloseModal = () => setOpen(false);
  const onOpenModal = () => {
    setOpen(true);
  };
  const onSaveModal = async () => {
    //onSave(arpu);
    console.log(arpu);
    onCloseModal();
  };
  const handleMoreArpu = () => {
    if (arpu.length >= 5) {
      return;
    }
    setArpu((prevArpu: any) => [
      ...prevArpu,
      {
        id: prevArpu[prevArpu.length - 1].id + 1,
        name: "ARPU",
        min: 0,
        max: 0,
        points: 0,
      },
    ]);
  };

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <ButtonWide onClick={onOpenModal} color="#DC8436">
          {labelButton}
        </ButtonWide>
      </div>
      <ModalStandard open={open} onCloseModal={onCloseModal} title={modalTitle}>
        <div className="grid grid-cols-12 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-x-4">
          <div className="col-span-12" style={{ marginLeft: "30%" }}>
            <span className="text-[#DC8436] font-medium text-md">ARPU</span>
          </div>
        </div>
        <div
          className="grid grid-cols-12 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-x-4 bg-[#CCCCCC]"
          style={{ textAlign: "center" }}
        >
          {fields.map((column: any) => (
            <div key={column} className="col-span-4">
              <DivJustifyItemsCenter>
                <span className="text-[#222222] font-bold text-md">
                  {column}
                </span>
              </DivJustifyItemsCenter>
            </div>
          ))}
        </div>
        {arpu.map((column: any) => (
          <div
            key={`arpu_${column.id}`}
            className="grid grid-cols-12 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-x-4"
          >
            <div key={`arp_min_${column.id}`} className="col-span-4">
              <InputUi
                title=""
                type="number"
                placeholder=""
                name={`arp_min_${column.id}`}
                value={column.min}
                onChange={(e) =>
                  setArpu((prevArpu: any) =>
                    prevArpu.map((item: any) =>
                      item.id === column.id
                        ? { ...item, min: e.target.value }
                        : item
                    )
                  )
                }
              />
            </div>
            <div key={`arp_max_${column.id}`} className="col-span-4">
              <InputUi
                title=""
                type="number"
                placeholder=""
                name={`arp_max_${column.id}`}
                value={column.max}
                onChange={(e) =>
                  setArpu((prevArpu: any) =>
                    prevArpu.map((item: any) =>
                      item.id === column.id
                        ? { ...item, max: e.target.value }
                        : item
                    )
                  )
                }
              />
            </div>
            <div key={`arp_points_${column.id}`} className="col-span-4">
              <InputUi
                title=""
                type="number"
                placeholder=""
                name={`arp_points_${column.id}`}
                value={column.points}
                onChange={(e) =>
                  setArpu((prevArpu: any) =>
                    prevArpu.map((item: any) =>
                      item.id === column.id
                        ? { ...item, points: e.target.value }
                        : item
                    )
                  )
                }
              />
            </div>
          </div>
        ))}
        <div
          className="grid grid-cols-12 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-x-4"
          style={{ justifyItems: "end" }}
        >
          <div className="col-span-11">
            <RiAddCircleFill onClick={handleMoreArpu} />
          </div>
        </div>

        <DivJustifyItemsCenter>
          <ButtonUi onClick={onCloseModal} color="#9E9E9E">
            Cancelar
          </ButtonUi>
          <ButtonUi onClick={onSaveModal}>Guardar</ButtonUi>
        </DivJustifyItemsCenter>
      </ModalStandard>
    </div>
  );
};
export { LayoutModalArpu };
