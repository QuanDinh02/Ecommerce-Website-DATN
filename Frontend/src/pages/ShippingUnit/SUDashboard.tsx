import AnimatedNumber from "@/components/AnimatedNumber";
import { getSUDashboardData } from "@/services/shippingUnitService";
import React from "react";
import { ThreeDots } from "react-loader-spinner";

interface IDashboardData {
    overview_data: number[]
}

const order_data = [
    {
        label: "Chờ lấy hàng",
        value: 0
    },
    {
        label: "Đang giao hàng",
        value: 0
    },
    {
        label: "Đã giao hàng thành công",
        value: 0
    },
    {
        label: "Lượt khách hàng sử dụng dịch vụ",
        value: 0
    }
]

const SUDashboard = () => {

    const [dashboardData, setDashboardData] = React.useState<number[]>([0, 0, 0, 0]);

    const [dataLoading, setDataLoading] = React.useState<boolean>(true);

    const fetchDashboardData = async () => {
        let result: IDashboardData = await getSUDashboardData();
        if (result) {
            setDashboardData(result.overview_data);
        }
    }

    React.useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        fetchDashboardData();

        setTimeout(() => {
            setDataLoading(false);
        }, 800);
    }, []);

    return (
        <>
            {
                dataLoading ?
                    <div className="flex items-center justify-center w-full h-screen">
                        <ThreeDots
                            height="80"
                            width="80"
                            color="#9ca3af"
                            ariaLabel="three-dots-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass="flex items-center justify-center tail-spin"
                            visible={true}
                        />
                    </div>
                    :
                    <div className='py-4 px-5 bg-white h-72'>
                        <div className="text-black text-xl">Danh sách cần làm</div>
                        <div className='text-gray-500 mb-4'>Những việc bạn sẽ phải làm</div>
                        <div className='grid grid-cols-4 gap-y-2 gap-x-2'>
                            {
                                order_data.map((item, index) => {
                                    return (
                                        <div className='flex flex-col gap-y-1 items-center justify-center border border-gray-20 py-2' key={`order-type-${index}`}>
                                            <div className='text-blue-500 font-bold'><AnimatedNumber n={dashboardData[index]} /></div>
                                            <div className='text-sm text-center line-clamp-1'>{item.label}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default SUDashboard;