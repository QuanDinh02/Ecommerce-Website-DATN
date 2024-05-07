import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";
import { TfiLocationPin } from "react-icons/tfi";
import { TfiReceipt } from "react-icons/tfi";
import { GoBell } from "react-icons/go";
import { PiTicket } from "react-icons/pi";
import { GoQuestion } from "react-icons/go";
import Accordion from "@/components/Accordion";
import { IAccount } from "../Product/ProductDetailPage_types";
import { RootState } from "@/redux/reducer/rootReducer";
import { useSelector } from "react-redux";

interface ISideBarChild {
    path: string
    name: string
}

interface ISideBarItem {
    path: string
    name: string
    icon: any
    children: ISideBarChild[]
}

const SideBar: ISideBarItem[] = [
    {
        path: "/account",
        name: "Tài Khoản Của Tôi",
        icon: <RiErrorWarningLine className="w-5 h-5 text-gray-500 side-bar-icon" />,
        children: [
            {
                path: "/account",
                name: "Thông tin tài khoản",
            },
            {
                path: "/password",
                name: "Đổi mật khẩu"
            },
            {
                path: "/notification-setting",
                name: "Cài đặt thông báo"
            },
        ]
    },
    {
        path: "/address",
        name: "Địa chỉ",
        icon: <TfiLocationPin className="w-5 h-5 text-gray-500 side-bar-icon" />,
        children: []
    },
    {
        path: "/order",
        name: "Đơn hàng",
        icon: <TfiReceipt className="w-5 h-5 text-gray-500 side-bar-icon" />,
        children: []
    },
    {
        path: "/notification",
        name: "Thông báo",
        icon: <GoBell className="w-5 h-5 text-gray-500 side-bar-icon" />,
        children: []
    },
    {
        path: "/voucher",
        name: "Kho Voucher",
        icon: <PiTicket className="w-5 h-5 text-gray-500 side-bar-icon" />,
        children: []
    },
    {
        path: "/supports",
        name: "Hỗ trợ",
        icon: <GoQuestion className="w-5 h-5 text-gray-500 side-bar-icon" />,
        children: []
    },
    {
        path: "",
        name: "Đăng xuất",
        icon: "",
        children: []
    },
]

const CustomerInfo = () => {

    const navigate = useNavigate();
    const account: IAccount = useSelector<RootState, IAccount>(state => state.user.account);

    const sideBarNavigation = (path: string) => {
        navigate(`/customer-info${path}`)
    }

    return (
        <div className="customer-info-container w-full bg-[#EEEEEE]">
            <div className="px-[30px] w-[80rem] mx-auto py-8 flex">
                <div className="customer-info__sidebar w-1/3 flex flex-col gap-x-2 w-60 bg-gray-100">
                    <div className="p-3 flex items-center gap-x-2 mb-2 bg-gray-200">
                        <div className="w-12 h-12 border rounded-full border-gray-600 flex items-center justify-center"><AiOutlineUser className="w-6 h-6 text-gray-500" /></div>
                        <div>
                            <div className="user_name font-bold" onClick={() => sideBarNavigation("/account")}>{account.username}</div>
                            <div className="text-gray-500 flex items-center cursor-pointer hover:underline gap-x-1"><MdModeEdit /> Sửa hồ sơ</div>
                        </div>
                    </div>
                    <Accordion data={SideBar} navigate={sideBarNavigation}/>
                </div>
                <div className="customer-info__content w-2/3 flex-1 py-5 px-10 bg-white">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default CustomerInfo;