import { useEffect, useState } from "react";
import { LayoutCardList } from "../../components/layouts/component.card.list";
import { SectionBgBlack80, SectionBgWhite80 } from "../../components/layouts/component.section-bg-80";
import { useToast } from "../../contexts/toastProvider";
import { callApis } from "../../utils/util.callfetch";
import { FormikContainer } from "../../components/layouts/component.form";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ButtonUi, InputUi } from "../../components/common/component.common";
import { InputSelectStandard } from "../../components/common/input/input-select";
import { getIdRoutes } from "../../utils/util.routes-process";
import { useNavigate } from "react-router-dom";
import { DivJustifyItemsCenter } from "../../components/layouts/component.divs";
import { ButtonStandard } from "../../components/common/buttons/button-standard";

export default function LayoutReferralView() {
    const { pushNotify } = useToast();
    const navigate = useNavigate();

    const uuid = getIdRoutes(location.pathname);

    const [observationList, setObservationList] = useState([]);
    const [disable, setDisable] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [customer, setCustomer] = useState({
        firstName: "",
        lastName: "",
        status: false,
        login: "",
        phone: "",
        email: "",
    });
    //const id = "a08e4463-91e9-4d39-82c8-fc8aa8b9af33"

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            status: 1,
            login: "",
            createdAt: "",
            phone: "",
            email: ""
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("Campo requerido"),
            lastName: Yup.string().required("Campo requerido"),
            phone: Yup.string().required("Campo requerido"),
            email: Yup.string().required("Campo Requerido")
        }),

        onSubmit: async (values: any) => {
            const data = { ...values };

            delete data.createdAt;

            const params = {
                id: uuid
            }
            return await callApis({
                base: "REFERRAL",
                api: "list",
                method: "PUT",
                useToken: true,
                body: data,
                params: params
            }).then((res) => {
                const { message = "" } = res;
                if (res.status === 200) {
                    pushNotify(message, "success");
                    setDisable(!disable);
                    setIsEditing(!isEditing);
                    return;
                }
                pushNotify(message ?? "Ha ocurrido un error", "error");
                return;
            });
        },
    });

    const handleGetObservation = () => {

        const params = {
            id: uuid
        }
        callApis({
            base: "REFERRAL_OBSERVATION",
            api: "item",
            method: "GET",
            useToken: true,
            params
        }).then((res) => {

            setObservationList(res.response);
        });
    };

    const handleGetCustomer = (idCustomer: string) => {

        const params = {
            id: idCustomer
        }
        callApis({
            base: "CUSTOMER",
            api: "item",
            method: "GET",
            useToken: true,
            params
        }).then((res) => {
            setCustomer(res.response);
        });

    }

    const handleGetReferral = () => {

        const params = {
            id: uuid
        }
        callApis({
            base: "REFERRAL",
            api: "item",
            method: "GET",
            useToken: true,
            params
        }).then((res) => {
            if (!res.response) return;
            const referral = res.response;
            handleGetCustomer(referral.id_referring_customer);
            formik.setValues({
                firstName: referral.first_name,
                lastName: referral.last_name,
                login: referral.login,
                createdAt: referral.created_at,
                status: referral.status,
                email: referral.email,
                phone: referral.phone_number
            });
        });
    };

    const handleSaveObservation = async (item: any) => {

        const { observation } = item;

        const data = {
            idReferral: uuid,
            observation,
        }
        await callApis({
            base: "REFERRAL_OBSERVATION",
            api: "item",
            method: "POST",
            useToken: true,
            body: data,
        }).then((res) => {
            const { message = "" } = res;
            if (res.status === 201) {
                pushNotify(message, "success");
                handleGetObservation();
                return;
            }
            pushNotify(message ?? "Ha ocurrido un error", "error");
            return;
        });
    };

    const handleBack = () => {
        navigate('/referral/list');
    };

    const handleReject = async () => {
        const data = {
            status: 4
        }

        const params = {
            id: uuid
        }
        return await callApis({
            base: "REFERRAL",
            api: "list",
            method: "PUT",
            useToken: true,
            body: data,
            params: params
        }).then((res) => {
            const { message = "" } = res;
            if (res.status === 200) {
                pushNotify(message, "success");
                return;
            }
            pushNotify(message ?? "Ha ocurrido un error", "error");
            return;
        });
    }

    const handleEdit = () => {
        setDisable(false);
        setIsEditing(true);
    }

    useEffect(() => {
        handleGetObservation();
        handleGetReferral();
    }, [uuid]);


    return (
        <>


            <div className="flex justify-center w-full">

                <div className="w-5/6">

                    <div className="w-full flex flex-col items-start h-32 px-4">
                        <div className="flex justify-between w-full items-center">
                            <div>
                                <p className=" pt-3">
                                    <span className="text-3xl font-bold text-[#ED7004]">Gestión de referidos</span>
                                </p>
                            </div>
                            <button
                                onClick={handleBack}
                                className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition"
                            >
                                Back
                            </button>
                        </div>
                    </div>

                    <SectionBgBlack80>
                        <div className="text-[#ED7004] font-semibold">
                            <span className="text-2xl"> Referente</span>
                        </div>

                        <div className="grid grid-cols-3 font-semibold pt-3">
                            <div>
                                <div className="flex ">
                                    <span className="text-[#ED7004] pr-3">Nombre: </span>
                                    <span className="text-[#808080]">{customer?.firstName}</span>

                                </div>
                                <div className="flex ">
                                    <span className="text-[#ED7004] pr-3">Apellido: </span>
                                    <span className="text-[#808080]">{customer?.lastName}</span>

                                </div>
                            </div>
                            <div>
                                <div className="flex ">
                                    <span className="text-[#ED7004] pr-3">Estado: </span>
                                    <span className="text-[#808080]">{customer.status ? "Activo" : "Inactivo"}</span>

                                </div>
                                <div className="flex ">
                                    <span className="text-[#ED7004] pr-3">Login: </span>
                                    <span className="text-[#808080]">{customer.login}</span>

                                </div>
                            </div>
                            <div>
                                <div className="flex ">
                                    <span className="text-[#ED7004] pr-3">Telefono: </span>
                                    <span className="text-[#808080]">{customer.phone}</span>

                                </div>
                                <div className="flex ">
                                    <span className="text-[#ED7004] pr-3">Correo: </span>
                                    <span className="text-[#808080]">{customer.email}</span>

                                </div>
                            </div>
                        </div>

                    </SectionBgBlack80>

                    <SectionBgWhite80>
                        <FormikContainer handleSubmit={formik.handleSubmit} hide={!isEditing}>
                            <div className="w-full flex flex-col items-start h-32">
                                <div className="flex justify-between w-full items-center">
                                    <div>
                                        <p>
                                            <span className="text-3xl font-bold text-black">Referido</span>
                                        </p>
                                    </div>
                                    {!isEditing && <button
                                        onClick={handleEdit}
                                        className="bg-[#ED7004] text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition"
                                    >
                                        Editar
                                    </button>}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 font-semibold">
                                <div className="col-span-3">
                                    <InputUi
                                        title="Nombre"
                                        placeholder="Ingrese el nombre"
                                        name="firstName"
                                        value={formik.values.firstName}
                                        error={formik.errors.firstName}
                                        onChange={formik.handleChange}
                                        touched={formik?.touched?.firstName ?? false}
                                        disabled={disable}

                                    />

                                </div>
                                <div className="col-span-3">
                                    <InputUi
                                        title="Apellido"
                                        placeholder="Ingrese el apellido"
                                        name="lastName"
                                        value={formik.values.lastName}
                                        error={formik.errors.lastName}
                                        onChange={formik.handleChange}
                                        touched={formik?.touched?.lastName ?? false}
                                        disabled={disable}
                                    />

                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 font-semibold">
                                <div className="col-span-2">

                                    <InputSelectStandard
                                        title="Estado"
                                        name="status"
                                        placeholder="Seleccione un estado"
                                        value={formik.values.status.toString()}
                                        options={[
                                            { label: "Nuevo", value: 1 },
                                            { label: "Pendiente", value: 2 },
                                            { label: "Activo", value: 3 },
                                            { label: "Anulado", value: 4 },
                                        ]}
                                        onChange={(e: any) => {
                                            formik.setFieldValue("status", parseInt(e.target.value));
                                        }}
                                        disabled={disable}
                                    />


                                </div>

                                <div className="col-span-2">
                                    <InputUi
                                        title="Login"
                                        placeholder=""
                                        name="login"
                                        value={formik.values.login}
                                        error={formik.errors.login}
                                        onChange={formik.handleChange}
                                        touched={formik?.touched?.login ?? false}
                                        disabled={true}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <InputUi
                                        title="Fecha de creacion"
                                        placeholder=""
                                        name="createdAt"
                                        value={formik.values.createdAt}
                                        error={formik.errors.createdAt}
                                        onChange={formik.handleChange}
                                        touched={formik?.touched?.createdAt ?? false}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 font-semibold">
                                <div className="col-span-3">
                                    <InputUi
                                        title="Telefono"
                                        placeholder="Ingrese el telefono"
                                        name="phone"
                                        value={formik.values.phone}
                                        error={formik.errors.phone}
                                        onChange={formik.handleChange}
                                        touched={formik?.touched?.phone ?? false}
                                        disabled={disable}

                                    />

                                </div>
                                <div className="col-span-3">
                                    <InputUi
                                        title="Correo"
                                        placeholder="Ingrese el correo"
                                        name="email"
                                        value={formik.values.email}
                                        error={formik.errors.email}
                                        onChange={formik.handleChange}
                                        touched={formik?.touched?.email ?? false}
                                        disabled={disable}
                                    />

                                </div>
                            </div>

                        </FormikContainer>

                    </SectionBgWhite80>

                    <SectionBgWhite80>
                        <LayoutCardList
                            title={"Observaciones"}
                            labelButton={"Nueva Observación"}
                            modalTitle={"Observación"}
                            data={observationList}
                            fieldData={{
                                observation: "Observación",
                                createdBy: "Usuario",
                                createdAt: "Fecha",
                            }}
                            onSave={(item: any) => {
                                handleSaveObservation(item);
                            }}
                        />
                    </SectionBgWhite80>

                    <div className="flex w-full justify-center">

                        <div className="flex justify-center items-center gap-3">

                            <ButtonUi disabled={false} color={"#808080"} description="" onClick={handleReject}>
                                <span>Cerrar</span>

                            </ButtonUi>
                            {formik.values.status == 2 && (<ButtonUi disabled={false} description="" onClick={handleReject}>
                                <span>Rechazar</span>

                            </ButtonUi>)

                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
