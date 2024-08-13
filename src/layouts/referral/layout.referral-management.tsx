import { ActionItems } from "./components/component-actions";
export default function LayoutReferralManagement() {

    return (
        <>
            <div className="h-full w-full flex flex-col justify-center ">
                <div className="w-full flex justify-center h-32 ">

                    <div className="flex items-center">
                        <p className="px-4 pt-3">
                            <span className="text-3xl font-bold text-[#ED7004]">Gestion de referidos</span>
                        </p>
                    </div>
                </div>
                <div className="w-full flex justify-center h-32 ">

                    <div className="flex items-center">
                        <p className="px-4 pt-3">
                            <span className="text-3xl font-bold text-[#ED7004]">Acciones</span>
                        </p>
                    </div>
                </div>

                <div className="w-full flex flex-col justify-center items-center container py-6">
                    <ActionItems />
                </div>

                <div className="w-full flex justify-center h-32 ">

                    <div className="flex items-center">
                        <p className="px-4 pt-3">
                            <span className="text-3xl font-bold text-[#ED7004]">Dashboard</span>
                        </p>
                    </div>
                </div>

                {/* <div className="w-full flex flex-col justify-center items-center container py-6">
          <DashboardItems />
        </div> */}



            </div>
        </>
    );
}
