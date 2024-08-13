import React from "react";
import { InputDateUi, InputUi } from "../component.common";
import { InputSelectStandard } from "../input/input-select";
import InputSelectMulti from "../input/input-select-multi";

interface RenderFieldProps {
  field: any;
  formik: any;
}

const RenderField: React.FC<RenderFieldProps> = ({ field, formik }) => {
  console.log("field", field);
  const handleChange = (
    fieldName: string,
    fieldType: string,
    idFieldConfiguration: string,
    idValue: string | null,
    value: any
  ) => {
    formik.setFieldValue(fieldName, {
      idFieldConfiguration,
      idValue: idValue || "",
      type: fieldType,
      value,
    });
  };

  switch (field.fieldType) {
    case "TEXT":
    case "INT":
      return (
        <div key={field.idFieldConfiguration} className="col-span-2">
          <InputUi
            title={field.fieldDescription}
            placeholder={field.fieldDescription}
            name={field.fieldName}
            value={formik.values[field.fieldName].value}
            error={formik.errors[field.fieldName]}
            onChange={(e) =>
              handleChange(
                field.fieldName,
                field.fieldType,
                field.idFieldConfiguration,
                field.idValue,
                e.target.value
              )
            }
            touched={formik?.touched?.[field.fieldName] ?? false}
          />
        </div>
      );
    case "DATE":
      return (
        <div key={field.idFieldConfiguration} className="col-span-2">
          <InputDateUi
            title={field.fieldDescription}
            placeholder={field.fieldDescription}
            name={field.fieldName}
            value={formik.values[field.fieldName]}
            error={formik.errors[field.fieldName]}
            onChange={(e) =>
              handleChange(
                field.fieldName,
                field.fieldType,
                field.idFieldConfiguration,
                field.idValue,
                e.target.value
              )
            }
            touched={formik?.touched?.[field.fieldName] ?? false}
          />
        </div>
      );
    case "SINGLE_LIST":
      return (
        <div key={field.idFieldConfiguration} className="col-span-2">
          <InputSelectStandard
            title={field.fieldDescription}
            name={field.fieldName}
            placeholder={`Seleccione ${field.fieldDescription}`}
            value={formik.values[field.fieldName].value}
            options={field.catalog.childs.map(
              (child: { name: any; id: any }) => ({
                label: child.name,
                value: child.id,
              })
            )}
            onChange={(e) =>
              handleChange(
                field.fieldName,
                field.fieldType,
                field.idFieldConfiguration,
                field.idValue,
                e.target.value
              )
            }
            disabled={false}
          />
        </div>
      );
    case "MULTI_LIST":
      return (
        <div key={field.idFieldConfiguration} className="col-span-2">
          <InputSelectMulti
            options={field.catalog.childs.map(
              (child: { name: any; id: any }) => ({
                label: child.name,
                value: child.id,
              })
            )}
            values={formik.values[field.fieldName].value}
            title={field.fieldDescription}
            name={field.fieldName}
            onCategorieSelect={(item: any) =>
              handleChange(
                field.fieldName,
                field.fieldType,
                field.idFieldConfiguration,
                field.idValue,
                item
              )
            }
          />
        </div>
      );
    default:
      return null;
  }
};

export default RenderField;
