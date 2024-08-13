import { IPropsModalUi } from "../../../utils/util.interface";
import { DivJustifyItemsCenter } from "../../../components/layouts/component.divs";
import { InputUi } from "../../../components/common/component.common";
import { ModalStandard } from "../../../components/common/modal/component.modal";
import { FormikContainer } from "../../../components/layouts/component.form";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToggleButton } from "../../../components/common/toggle/Toggle";
import { InputSelectStandard } from "../../../components/common/input/input-select";
import { callApis } from "../../../utils/util.callfetch";
import { useToast } from "../../../contexts/toastProvider";
import { useEffect, useState } from "react";

export const ModalReferralForm = (props: IPropsModalUi) => {
    const { open, onCloseModal } = props;
    const { pushNotify } = useToast();
    const [catalogList, setCatalogList] = useState([]);
    const [fieldTypeSelected, setFieldTypeSelected] = useState("");
    const optionsTypeField = [
        {
            label: 'VARCHAR',
            value: 1
        },
        {
            label: 'INTEGER',
            value: 2
        },
        {
            label: 'TINYINT',
            value: 3
        },
        {
            label: 'DOUBLE',
            value: 4
        },
        {
            label: 'TEXT',
            value: 5
        },
        {
            label: "CATALOGO",
            value: 6
        }
    ]


    const formik = useFormik({
        initialValues: {
            name: "",
            status: true,
            description: "",
            fieldType: 0,
            fieldCatalogId: 0,
            fieldLength: 0,
            order: 0,
            columnName: "",
            editable: false,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Campo requerido"),
            description: Yup.string().required("Campo requerido"),
            columnName: Yup.string().required("Campo requerido"),
            fieldType: Yup.string().required("Campo Requerido"),
            order: Yup.number().required("Campo Requerido"),
            fieldLength: Yup.number()
        }),

        onSubmit: async (values: any) => {
            console.log('onSubmit', values);

            values.fieldType = fieldTypeSelected;
            return await callApis({
                base: "REFERRAL_FORM",
                api: "item",
                method: "POST",
                useToken: true,
                body: values,
            }).then((res) => {
                const { message = "" } = res;
                if (res.status === 200 || res.status === 201) {
                    pushNotify(message, "success");
                    onCloseModal();
                    return;
                }
                pushNotify(message ?? "Ha ocurrido un error", "error");
                return;
            });
        },
    });

    useEffect(() => {
        handleFetch();
    }, [open]);
    useState()

    const handleFetch = async () => {

        return await callApis({
            base: "CATALOG",
            api: "item",
            method: "GET",
            useToken: true,
        })
            .then((res) => {
                if (res.status == 200) {

                    const list: any = res.response.map((item: any) => {

                        const element =
                        {
                            label: item.name,
                            value: item.id
                        }
                        return element
                    });

                    setCatalogList(list);
                }
            })
            .catch(() => {
                return [];
            });
    };

    const handleChange = (e: any) => {
        const selectedValue = parseInt(e.target.value);
        const selectedOption = optionsTypeField.find(option => option.value === selectedValue);
        const selectedLabel = selectedOption ? selectedOption.label : "";
        const label = selectedValue != 6 ? selectedLabel : "INTEGER";

        setFieldTypeSelected(label);

        formik.setFieldValue("fieldType", selectedValue);
    }

    return (
        <ModalStandard
            open={open}
            onCloseModal={onCloseModal}
            title=""
        >
            <DivJustifyItemsCenter>
                <div className="grid grid-cols-1 gap-x-3">
                    <label className="text-[#391446] font-large text-2xl font-semibold text-md ">
                        Datos Generales
                    </label>
                </div>
            </DivJustifyItemsCenter>
            <FormikContainer handleSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-4">
                    <div className="col-span-3">
                        <InputUi
                            title="Nombre"
                            placeholder="Ingrese el nombre del campo"
                            name="name"
                            value={formik.values.name}
                            error={formik.errors.name}
                            onChange={formik.handleChange}
                            touched={formik?.touched?.name ?? false}
                        />

                    </div>
                    <div className="col-span-3 pt-2">
                        <ToggleButton
                            label="Estado"
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            row={false}
                        />

                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-4">
                    <div className="col-span-6">
                        <InputUi
                            title="Descripción"
                            placeholder="Ingrese la descripción del campo"
                            name="description"
                            value={formik.values.description}
                            error={formik.errors.description}
                            onChange={formik.handleChange}
                        //touched={formik?.touched?.description ?? false}
                        />

                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-4">

                    <div className="col-span-3">
                        <InputSelectStandard
                            title="Tipo de campo*"
                            name="fieldType"
                            placeholder="Seleccione un tipo de campo"
                            value={formik.values.fieldType.toString()}
                            options={optionsTypeField}
                            onChange={handleChange}
                        />
                    </div>
                    {formik.values.fieldType === 6 && (
                        <div className="col-span-3">
                            <InputSelectStandard
                                title="Catalogo"
                                name="fieldCatalogId"
                                placeholder="Seleccione un catalogo"
                                value={formik.values.fieldCatalogId.toString()}
                                options={catalogList}
                                onChange={(e) => {
                                    formik.setFieldValue("fieldCatalogId", parseInt(e.target.value));
                                }}
                            />
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-4">
                    <div className="col-span-3">
                        <InputUi
                            title="Nombre de columna"
                            placeholder="Ingrese el nombre de la columna"
                            name="columnName"
                            value={formik.values.columnName}
                            error={formik.errors.columnName}
                            onChange={formik.handleChange}
                            touched={formik?.touched?.columnName ?? false}
                        />
                    </div>
                    <div className="col-span-3">
                        <InputUi
                            title="Tamaño de columna"
                            placeholder="Ingrese el tamaño de la columna"
                            name="fieldLength"
                            value={formik.values.fieldLength}
                            error={formik.errors.fieldLength}
                            onChange={formik.handleChange}
                            touched={formik?.touched?.fieldLength ?? false}
                            type="number"
                        />
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-4">

                    <div className="col-span-3">
                        <InputUi
                            title="Orden"
                            placeholder="Ingrese el orden "
                            name="order"
                            value={formik.values.order}
                            error={formik.errors.order}
                            onChange={formik.handleChange}
                            touched={formik?.touched?.order ?? false}
                            type="number"

                        />
                    </div>
                    <div className="col-span-3 pt-2">
                        <ToggleButton
                            label="¿Es editable?"
                            name="editable"
                            value={formik.values.editable}
                            onChange={formik.handleChange}
                            row={false}
                        />
                    </div>
                </div>
            </FormikContainer>

        </ModalStandard>
    );
};
