
import { RiGroup3Fill } from "@remixicon/react"
export const DashboardItems = () => {
    return (
        <>
            <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 justify-center items-start">
                <div className="px-4 pt-3 col-span-4">
                    <p className="text-3xl text-[#ED7004]">Dashboard</p>
                </div>
                <button
                    className="w-60 h-32 flex justify-center items-center px-2 my-3 bg-white/25 shadow-md rounded-lg text-[#222222] hover:bg-[#222222]/5 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:shadow-[#222222]/50"
                >
                    <RiGroup3Fill color={"Black"} size={24} />
                    <div className="w-full flex flex-col ">
                        <span className="text-2xl font-bold">165.168</span>
                        <span>Total de clientes</span>
                    </div>
                </button>

                <button
                    className="w-60 h-32 flex justify-center items-center px-2 my-3 bg-white/25 shadow-md rounded-lg text-[#222222] hover:bg-[#222222]/5 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:shadow-[#222222]/50"
                >
                    <div className="w-full flex flex-col ">
                        <span className="text-2xl font-bold">15.068</span>
                        <span>Referidos</span>
                    </div>
                </button>

                <button
                    className="w-60 h-32 flex justify-center items-center px-2 my-3 bg-white/25 shadow-md rounded-lg text-[#222222] hover:bg-[#222222]/5 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:shadow-[#222222]/50"
                >
                    <div className="w-full flex flex-col ">
                        <span className="text-2xl font-bold">60.052</span>
                        <span>Upgrade</span>
                    </div>
                </button>

                <button
                    className="w-60 h-32 flex justify-center items-center px-2 my-3 bg-white/25 shadow-md rounded-lg text-[#222222] hover:bg-[#222222]/5 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 hover:shadow-[#222222]/50"
                >
                    <div className="w-full flex flex-col ">
                        <span className="text-2xl font-bold">150.162</span>
                        <span>Cumpleaños</span>
                    </div>
                </button>
            </div>
        </>
    )
}