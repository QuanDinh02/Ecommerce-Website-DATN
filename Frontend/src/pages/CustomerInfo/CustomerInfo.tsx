import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const SideBar = [
    {
        path: "/account",
        name: "Thông tin tài khoản"
    },
    {
        path: "/password",
        name: "Đổi mật khẩu"
    },
    {
        path: "/notification-setting",
        name: "Cài đặt thông báo"
    },
    {
        path: "/address",
        name: "Địa chỉ"
    },
    {
        path: "/order",
        name: "Đơn hàng"
    },
    {
        path: "/notification",
        name: "Thông báo"
    },
    {
        path: "/voucher",
        name: "Kho Voucher"
    },
    {
        path: "/supports",
        name: "Hỗ trợ"
    },
    {
        path: "",
        name: "Đăng xuất"
    },
]

const CustomerInfo = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [pathname, setPathname] = React.useState<string>("");

    React.useEffect(() => {
        setPathname(location.pathname);
    }, []);

    return (
        <div className="customer-info-container w-full bg-[#EEEEEE]">
            <div className="px-[30px] w-[80rem] mx-auto py-8 flex">
                <div className="customer-info__sidebar w-1/3 border border-red-500 flex flex-col gap-x-2">
                    {
                        SideBar && SideBar.length > 0 &&
                        SideBar.map((item, index) => {
                            return (
                                <div onClick={() => navigate(`/customer-info${item.path}`)} className="hover:underline cursor-pointer">{item.name}</div>
                            )
                        })
                    }
                </div>
                <div className="customer-info__content w-2/3 border border-blue-500">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default CustomerInfo;