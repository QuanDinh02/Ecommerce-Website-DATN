import { Outlet } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import { GoBell } from "react-icons/go";
import { CiViewList } from "react-icons/ci";
import { GoQuestion } from "react-icons/go";
import Accordion from "@/components/Accordion";
import { RootState } from "@/redux/reducer/rootReducer";
import { useSelector } from "react-redux";
import { RxDashboard } from "react-icons/rx";
import { CgUserList } from "react-icons/cg";
import React from "react";
import { TailSpin } from "react-loader-spinner";
import { MdOutlineStorefront } from "react-icons/md";

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

export interface ISellerAccount {
    customer_id: number
    username: string
    role: string
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
        path: "/order",
        name: "Đơn hàng",
        icon: <CiViewList className="w-5 h-5 text-gray-500 side-bar-icon" />,
        skip: true,
        children: [
            {
                path: "/order-status",
                name: "Trạng thái đơn hàng",
            }
        ]
    },
    {
        path: "/product",
        name: "Quản Lý Sản Phẩm",
        icon: <BsBoxSeam className="w-5 h-5 text-gray-500 side-bar-icon" />,
        skip: true,
        children: [
            {
                path: "/all",
                name: "Tất Cả Sản Phẩm",
            },
            {
                path: "/new",
                name: "Thêm Sản Phẩm",
            },
            {
                path: "/announce",
                name: "Thông Báo",
            },
        ]
    },
    {
        path: "/profile",
        name: "Thông tin người bán",
        icon: <CgUserList className="w-5 h-5 text-gray-500 side-bar-icon" />,
        skip: false,
        children: []
    },
    {
        path: "/shop",
        name: "Quản Lý Shop",
        icon: <MdOutlineStorefront className="w-5 h-5 text-gray-500 side-bar-icon" />,
        skip: true,
        children: [
            {
                path: "/info",
                name: "Thông Tin Shop",
            },
            {
                path: "/category",
                name: "Danh mục sản phẩm",
            },
            {
                path: "/review",
                name: "Quản lý Đánh Giá",
            },
        ]
    },
    {
        path: "/notification",
        name: "Thông báo",
        icon: <GoBell className="w-5 h-5 text-gray-500 side-bar-icon" />,
        skip: false,
        children: []
    },
    {
        path: "/supports",
        name: "Hỗ trợ",
        icon: <GoQuestion className="w-5 h-5 text-gray-500 side-bar-icon" />,
        skip: false,
        children: []
    },
]

const SellerInfo = () => {

    const account: ISellerAccount = useSelector<RootState, ISellerAccount>(state => state.user.account);
    
    const [dataLoading, setDataLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        setTimeout(() => {
            setDataLoading(false);
        }, 1500);
    }, []);

    return (
        <div className="seller-info-container w-full bg-[#EEEEEE]">
            {
                dataLoading ?
                    <div className="flex items-center justify-center w-full h-screen">
                        <TailSpin
                            height="80"
                            width="80"
                            color="#FCB800"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass="flex items-center justify-center tail-spin"
                            visible={true}
                        />
                    </div>
                    :
                    <>
                        <div className="px-[30px] min-w-[92rem] mx-auto py-8 flex gap-x-4">
                            <div className="seller-info__sidebar w-1/3 flex flex-col gap-x-2 w-60">
                                <Accordion data={SideBar} user_type="seller" />
                            </div>
                            <div className="seller-info__content w-2/3 flex-1 py-4 px-5 bg-white">
                                <Outlet />
                            </div>
                        </div>
                    </>
            }

        </div>
    )
}

export default SellerInfo;