import { RxDashboard } from "react-icons/rx";
import { LuUsers } from "react-icons/lu";
import { AiOutlineUser } from "react-icons/ai";
import { PiStorefrontLight } from "react-icons/pi";
import { FaRegBuilding } from "react-icons/fa";
import { GoReport } from "react-icons/go";
import SidebarAccordion from "./SidebarAccordion";
import { VscBell } from "react-icons/vsc";
import { Outlet, useNavigate } from "react-router-dom";
import React from "react";
import classNames from "classnames";

interface ISideBarChild {
    path: string
    name: string
}

interface ISideBarItem {
    path: string
    name: string
    icon: any
    children: ISideBarChild[]
    skip: boolean
}

const SideBar: ISideBarItem[] = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: <RxDashboard className="w-5 h-5 text-gray-500 side-bar-icon" />,
        skip: false,
        children: []
    },
    {
        path: "/employee",
        name: "Employee",
        icon: <LuUsers className="w-5 h-5 text-gray-500 side-bar-icon" />,
        skip: false,
        children: []
    },
    {
        path: "/customer",
        name: "Customer",
        icon: <AiOutlineUser className="w-5 h-5 text-gray-500 side-bar-icon" />,
        skip: false,
        children: []
    },
    {
        path: "/seller",
        name: "Seller",
        icon: <PiStorefrontLight className="w-5 h-5 text-gray-500 side-bar-icon" />,
        skip: false,
        children: []
    },
    {
        path: "/department",
        name: "Department",
        icon: <FaRegBuilding className="w-5 h-5 text-gray-500 side-bar-icon" />,
        skip: false,
        children: []
    },
    {
        path: "/report",
        name: "Report",
        icon: <GoReport className="w-5 h-5 text-gray-500 side-bar-icon" />,
        skip: false,
        children: []
    }
]

const SystemMain = () => {

    const navigate = useNavigate();

    const [showNotification, setShowNotification] = React.useState<boolean>(false);

    const notificationStyle = classNames('w-10 h-10 flex items-center justify-center rounded-full cursor-pointer', {
        'bg-gray-200 text-black': showNotification,
        'bg-[#F5F5F5] text-gray-500': !showNotification,
    });

    React.useEffect(() => {
        navigate("/fms/dashboard");
    },[]);

    return (
        <div className="system-main w-full flex relative">
            <div className="system-main__sidebar w-1/6 h-screen absolute top-0 sticky bg-white relative">
                <div className="w-full h-20 flex items-center justify-center text-2xl font-semibold absolute top-0 sticky z-10 bg-white">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text inline-block">FoxMart</div>
                </div>
                <div className="w-full h-fit px-2 pb-2">
                    <SidebarAccordion data={SideBar} />
                </div>
            </div>

            <div className="system-main__content w-5/6 bg-[#F5F5F5] h-fit min-h-screen realative ">
                <div className="content__header w-full h-20 px-5 py-3 flex items-center justify-end absolute top-0 sticky bg-[#F5F5F5] gap-x-2">
                    <div className={notificationStyle} onClick={() => setShowNotification(!showNotification)}><VscBell className="w-6 h-6" /></div>
                    <div className="flex items-center gap-x-2">Welcome Admin <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white">A</div></div>
                </div>
                <div className="content__body w-full bg-[#F5F5F5] px-5 pb-5">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default SystemMain;