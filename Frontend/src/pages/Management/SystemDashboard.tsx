import { MdOutlineStorefront } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { BsTruck } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import AnimatedNumber from "@/components/AnimatedNumber";
import { getAdminDashboardData } from "@/services/adminService";
import React from "react";

const OVERVIEW_DATA = [
    {
        id: 1,
        title: "Khách hàng",
        number: 10,
        text_style: "text-green-500",
        border_style: "border-green-500",
        icon: <FiUsers className="w-10 h-10 text-green-500" />
    },
    {
        id: 2,
        title: "Người bán",
        number: 1,
        text_style: "text-orange-500",
        border_style: "border-orange-500",
        icon: <MdOutlineStorefront className="w-10 h-10 text-orange-500" />
    },
    {
        id: 3,
        title: "Nhân viên",
        number: 4,
        text_style: "text-blue-500",
        border_style: "border-blue-500",
        icon: <AiOutlineUser className="w-10 h-10 text-blue-500" />
    },
    {
        id: 4,
        title: "Đơn vị Vận Chuyển",
        number: 3,
        text_style: "text-red-500",
        border_style: "border-red-500",
        icon: <BsTruck className="w-10 h-10 text-red-500" />
    },

];

const SystemDashboard = () => {

    let [data, setData] = React.useState<number[]>([0, 0, 0, 0]);

    let fetchDashboardData = async () => {
        let result = await getAdminDashboardData();
        if (result) {
            setData(result);
        }
    }

    React.useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <div className="system-dashboard py-4 px-5">
            <div className="text-xl w-1/3 mb-6">Dashboard</div>
            <div className="grid grid-cols-4 gap-x-2">
                {
                    OVERVIEW_DATA.map((item, index) => {
                        return (
                            <div
                                className={`overview-item bg-white rounded shadow px-8 py-4 ${item.border_style}`}
                                key={`overview-item-${index}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="text-gray-500 text-lg">{item.title}</div>
                                    <div>{item.icon}</div>
                                </div>
                                <div className="text-center text-2xl font-medium my-4"><AnimatedNumber n={data[index]} /></div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SystemDashboard;