import { useFormik } from "formik";
import * as Yup from "yup";
import { IPropsLayouts } from "../../utils/util.interface";
import {
  ButtonUi,
  InputUi,
  ButtonOutlineIconUI,
  SelectUi,
} from "../../components/common/component.common";
import { RiAddFill } from "@remixicon/react";
import { TitleSection } from "../../components/layouts/component.title-section";
import { memo } from "react";
import { SectionBgWhite80 } from "../../components/layouts/component.section-bg-80";
import { DivJustifyItemsCenter } from "../../components/layouts/component.divs";
import { RiEraserLine } from "@remixicon/react";

const MemoTitleSection = memo(TitleSection);

const LayoutListFilter = (props: IPropsLayouts) => {
  try {
    const {
      children,
      title,
      labelButton,
      search,
      onClick,
      isViewButton = false,
      isUseSearch = true,
      data,
    } = props;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const formik = useFormik({
      initialValues: {
        initialDate: "",
        finalDate: "",
        event: "",
        page: "",
      },
      validationSchema: Yup.object({
        event: Yup.string().nullable(),
        page: Yup.string().nullable(),
        initialDate: Yup.date()
          .nullable()
          .typeError("Fecha inválida")
          .max(new Date(), "La fecha no puede ser en el futuro"),
        finalDate: Yup.date()
          .nullable()
          .typeError("Fecha inválida")
          .test(
            "is-greater",
            "La fecha final debe ser mayor o igual a la fecha inicial",
            function (value) {
              const { initialDate } = this.parent;
              if (initialDate && value) {
                return value >= initialDate;
              }
              return true;
            }
          ),
      }),

      onSubmit: (values: any) => {
        if (search) {
          search(values);
        }
      },
    });

    const handleCleanSearch = () => {
      formik.resetForm();
      if (search) {
        search("");
      }
    };

    return (
      <div className="flex flex-col">
        <MemoTitleSection
          title={title}
          icon={<RiAddFill />}
          onClick={onClick}
          labelButton={labelButton}
          isViewButton={isViewButton}
        />

        {isUseSearch && (
          <form onSubmit={formik.handleSubmit}>
            <SectionBgWhite80>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-4">
                <div className="col-span-2 ">
                  <InputUi
                    title="Fecha inicio"
                    placeholder="Ingrese una fecha"
                    name="initialDate"
                    type="date"
                    value={formik.values.initialDate}
                    error={formik.errors.initialDate}
                    onChange={formik.handleChange}
                    touched={formik?.touched?.initialDate}
                    disabled={false}
                  />
                </div>
                <div className="col-span-2 ">
                  <InputUi
                    title="Fecha fin"
                    placeholder="Ingrese una fecha"
                    name="finalDate"
                    type="date"
                    value={formik.values.finalDate}
                    error={formik.errors.finalDate}
                    onChange={formik.handleChange}
                    touched={formik?.touched?.finalDate}
                    disabled={false}
                  />
                </div>
                <div className="col-span-2 ">
                  <SelectUi
                    title="Eventos"
                    placeholder="Seleccione un evento"
                    name="event"
                    value={formik.values.event}
                    error={formik.errors.event}
                    onChange={formik.handleChange}
                    options={data.events || []}
                    touched={formik?.touched?.event}
                    disabled={false}
                  />
                </div>
                <div className="col-span-2 ">
                  <SelectUi
                    title="Páginas"
                    placeholder="Seleccione una página"
                    name="page"
                    value={formik.values.page}
                    error={formik.errors.page}
                    onChange={formik.handleChange}
                    options={data.pages || []}
                    touched={formik?.touched?.page}
                    disabled={false}
                  />
                </div>

                <div className="grid grid-cols-2">
                  <div className="flex col-span-2">
                    <DivJustifyItemsCenter>
                      <ButtonUi type="submit">
                        <span className="text-md ">Generar reporte</span>
                      </ButtonUi>
                    </DivJustifyItemsCenter>

                    <DivJustifyItemsCenter>
                      <ButtonOutlineIconUI
                        type="button"
                        onClick={handleCleanSearch}
                      >
                        <RiEraserLine />
                      </ButtonOutlineIconUI>
                    </DivJustifyItemsCenter>
                  </div>
                </div>
              </div>
            </SectionBgWhite80>
          </form>
        )}

        <div className="w-full grid grid-cols-1">{children}</div>
      </div>
    );
  } catch (error) {
    console;
  }
};

export { LayoutListFilter };
