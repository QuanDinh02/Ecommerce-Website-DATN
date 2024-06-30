import { RxDashboard } from "react-icons/rx";
import { LuUsers } from "react-icons/lu";
import { FaRegBuilding } from "react-icons/fa";
import { GoReport } from "react-icons/go";
import SidebarAccordion from "./SidebarAccordion";
import { VscBell } from "react-icons/vsc";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoMdExit } from "react-icons/io";
import { Outlet, useNavigate } from "react-router-dom";
import React from "react";
import classNames from "classnames";
import { userSysLogout } from "@/services/userService";
import { successToast1 } from "@/components/Toast/Toast";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducer/rootReducer";
import { FaRegHandshake } from "react-icons/fa";
import { BsBox } from "react-icons/bs";

interface IAdminAccount {
    asid: number
    username: string
    role: string
}

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
        path: "/admin/dashboard",
        name: "Dashboard",
        icon: <RxDashboard className="w-5 h-5 text-gray-500 side-bar-icon" />,
        skip: false,
        children: []
    },
    {
        path: "/admin/product",
        name: "Sản phẩm",
        icon: <BsBox className="w-5 h-5 text-gray-500 side-bar-icon" />,
        skip: false,
        children: []
    },
    {
        path: "/admin/employee",
        name: "Nhân viên",
        icon: <LuUsers className="w-5 h-5 text-gray-500 side-bar-icon" />,
        skip: false,
        children: []
    },
    {
        path: "/admin/partner",
        name: "Đối tác",
        icon: <FaRegHandshake className="w-5 h-5 text-gray-500 side-bar-icon" />,
        skip: true,
        children: [
            {
                path: "/customer",
                name: "Khách hàng",
            },
            {
                path: "/seller",
                name: "Người bán",
            },
            {
                path: "/shipping_unit",
                name: "Đơn vị vận chuyển",
            },
        ]
    },
    {
        path: "/admin/department",
        name: "Phòng ban",
        icon: <FaRegBuilding className="w-5 h-5 text-gray-500 side-bar-icon" />,
        skip: false,
        children: []
    },
    {
        path: "/admin/report",
        name: "Báo cáo",
        icon: <GoReport className="w-5 h-5 text-gray-500 side-bar-icon" />,
        skip: false,
        children: []
    }
]

const SystemMain = () => {

    const navigate = useNavigate();

    const account: IAdminAccount = useSelector<RootState, IAdminAccount>(state => state.user.account);

    const [showNotification, setShowNotification] = React.useState<boolean>(false);
    const [showInfoSettingBox, setShowInfoSettingBox] = React.useState<boolean>(false);

    const notificationStyle = classNames('w-10 h-10 flex items-center justify-center rounded-full cursor-pointer', {
        'bg-gray-200 text-black': showNotification,
        'bg-[#F5F5F5] text-gray-500': !showNotification,
    });

    const infoSettingBox = React.useRef<HTMLDivElement>(null);

    const handleShowWidgetInfo = () => {
        setShowInfoSettingBox(true);
        // if (account && isAuthenticated) {
        //     setShowInfoSettingBox(true);
        // }
    }

    const handleUserSysLogout = async () => {
        let result: any = await userSysLogout();
        if (result && result.EC === 0) {
            successToast1(result.EM);
            setShowInfoSettingBox(false);

            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    }

    React.useEffect(() => {

        const closeInfoSettingBox = (e) => {
            if (!infoSettingBox.current?.contains(e.target)) {
                setShowInfoSettingBox(false);
            }
        }

        document.body.addEventListener("mousedown", closeInfoSettingBox);

        return () => {
            document.body.removeEventListener('mousedown', closeInfoSettingBox);
        };
    }, []);

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
                <div className="content__header w-full h-20 px-5 py-3 flex items-center justify-end absolute top-0 z-20 sticky bg-[#F5F5F5] gap-x-2">
                    <div className={notificationStyle} onClick={() => setShowNotification(!showNotification)}><VscBell className="w-6 h-6" /></div>
                    <div
                        className="relative"
                        onClick={() => {
                            handleShowWidgetInfo();
                        }}
                    >
                        <div className="flex items-center gap-x-2 cursor-pointer group">
                            <span className="group-hover:text-blue-600">Xin chào {account.username}</span> <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white">A</div>
                        </div>
                        {
                            showInfoSettingBox &&
                            <div className='widget-info absolute bg-white top-10 w-[14rem] right-[-5px] z-50 border border-gray-300 shadow-xl'
                                onClick={() => handleShowWidgetInfo()}
                                ref={infoSettingBox}
                            >
                                <div className='info-item py-2.5 px-5 hover:bg-gray-100 hover:text-blue-600 cursor-pointer w-full flex items-center gap-x-2' onClick={(e) => {
                                    e.stopPropagation();
                                    setShowInfoSettingBox(false);
                                }}><MdOutlineAccountCircle className="w-5 h-5"/> Quản lý Tài Khoản</div>
                                <div className='info-item py-2.5 px-5 hover:bg-gray-100 hover:text-blue-600 cursor-pointer flex items-center gap-x-2' onClick={(e) => {
                                    e.stopPropagation();
                                    handleUserSysLogout();
                                }}><IoMdExit className="w-5 h-5"/> Đăng Xuất</div>
                            </div>
                        }
                    </div>

                </div>
                <div className="content__body w-full bg-[#F5F5F5] px-5 pb-5">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default SystemMain;