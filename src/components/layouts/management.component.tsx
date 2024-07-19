import { useFormik } from "formik";
import * as Yup from "yup";
import { IPropsLayouts } from "../../utils/util.interface";
import { ButtonUi, ButtonOutlineIconUI } from "../common/component.common";
import { RiAddFill } from "@remixicon/react";
import { TitleSection } from "./component.title-section";
import { memo, useEffect } from "react";
import { SectionBgWhite80 } from "./component.section-bg-80";
import { DivJustifyItemsCenter } from "./component.divs";
import { RiEraserLine } from "@remixicon/react";
import { ManagementInput } from "./management-input.component";
import { validateSchemaDate, getFormattedDates } from "../../utils/validate-schema.util";

const MemoTitleSection = memo(TitleSection);

const LayoutManagement = (props: IPropsLayouts) => {
  const {
    children,
    title,
    labelButton,
    handleSearch,
    search,
    onClick,
    isViewButton = true,
    isViewForm = true,
    isUseSearch = true,
    isUseDate = false,
    componentAdd,
  } = props;
  const { dateNow, dateBefore } = getFormattedDates();

  const formik = useFormik({
    initialValues: {
      name: "",
      initialDate: "",
      finalDate: "",
    },
    validationSchema: Yup.object({
      name: isUseSearch ? Yup.string().required("Campo requerido") : Yup.string(),
      initialDate: isUseDate
        ? Yup.string().test({
            name: "initialDate",
            test: function (value) {
              const { finalDate } = this.parent;
              const { isValid, message, path } = validateSchemaDate(
                value,
                finalDate,
                this.path
              );

              if (!isValid && path === this.path) {
                return this.createError({
                  path: "initialDate",
                  message,
                });
              }

              return true;
            },
          })
        : Yup.string(),
      finalDate: isUseDate
        ? Yup.string().test({
            name: "finalDate",
            test: function (value) {
              const { initialDate } = this.parent;
              const { isValid, message, path } = validateSchemaDate(
                initialDate,
                value,
                this.path
              );

              if (!isValid && path === this.path) {
                return this.createError({
                  path: "finalDate",
                  message,
                });
              }
              return true;
            },
          })
        : Yup.string(),
    }),

    onSubmit: (values: any) => {
      if (search) {
        search(values.name);
      }

      if (handleSearch) {
        handleSearch(values);
      }
    },
  });

  useEffect(() => {
    if (isUseDate && handleSearch) {
      formik.setFieldValue("initialDate", dateBefore);
      formik.setFieldValue("finalDate", dateNow);

      handleSearch({
        initialDate: dateBefore,
        finalDate: dateNow,
      });
    }
  }, []);

  const handleCleanSearch = () => {
    if (handleSearch) {
      formik.setFieldValue("initialDate", dateBefore);
      formik.setFieldValue("finalDate", dateNow);
      handleSearch({
        initialDate: dateBefore,
        finalDate: dateNow,
      });
    }

    if (search) {
      formik.setFieldValue("name", "");
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
      {isViewForm && (
        <form onSubmit={formik.handleSubmit}>
          <SectionBgWhite80>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ">
              <div className="col-span-3 pt-3">
                <ManagementInput formik={formik} useInput={{ isUseSearch, isUseDate }} />
                {componentAdd && componentAdd}
              </div>
              <div className="mt-11">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="col-span-2">
                    <DivJustifyItemsCenter>
                      <ButtonUi type="submit">
                        <span className="text-md ">Buscar</span>
                      </ButtonUi>
                    </DivJustifyItemsCenter>
                  </div>
                  <DivJustifyItemsCenter>
                    <ButtonOutlineIconUI type="button" onClick={handleCleanSearch}>
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
};

export { LayoutManagement };
