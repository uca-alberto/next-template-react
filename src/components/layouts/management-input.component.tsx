import { InputDateUi, InputUi } from "../common/component.common";

export const ManagementInput = ({ formik, useInput }: { formik: any; useInput: any }) => {
  return (
    <div className="w-full grid grid-cols-1">
      {useInput?.isUseSearch && (
        <InputUi
          title="Buscar"
          placeholder="Ingrese una palabra clave"
          name="name"
          value={formik.values.name}
          error={formik.errors.name}
          touched={formik.touched.name}
          onChange={formik.handleChange}
          disabled={false}
        />
      )}

      {useInput?.isUseDate && (
        <div className="grid grid-cols-2 gap-x-3">
          <InputDateUi
            title="Fecha Inicio"
            placeholder="Ingrese una fecha"
            name="initialDate"
            value={formik.values.initialDate}
            error={formik.errors.initialDate}
            touched={formik.touched.initialDate}
            onChange={formik.handleChange}
            disabled={false}
          />
          <InputDateUi
            title="Fecha Fin"
            placeholder="Ingrese una fecha"
            name="finalDate"
            value={formik.values.finalDate}
            error={formik.errors.finalDate}
            touched={formik.touched.finalDate}
            onChange={formik.handleChange}
            disabled={false}
          />
        </div>
      )}
    </div>
  );
};
