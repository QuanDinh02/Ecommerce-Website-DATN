import { LuStore } from "react-icons/lu";
import { BsTag } from "react-icons/bs";
import { PiWallet } from "react-icons/pi";
import { FiTruck } from "react-icons/fi";
import { RiExchangeLine } from "react-icons/ri";
import { BsFileText } from "react-icons/bs";

export const CATEGORIES_SUPPORT = [
    {
        name: "Mua sắm cùng FoxMart",
        icon: <LuStore className="icon w-6 h-6 text-red-500" />,
        bg_color: "bg-red-100"
    },
    {
        name: "Khuyển Mãi & Ưu Đãi",
        icon: <BsTag className="icon w-6 h-6 text-orange-500" />,
        bg_color: "bg-orange-100"
    },
    {
        name: "Thanh toán",
        icon: <PiWallet className="icon w-6 h-6 text-orange-500" />,
        bg_color: "bg-orange-100"
    },
    {
        name: "Đơn Hàng & Vận Chuyển",
        icon: <FiTruck className="icon w-6 h-6 text-green-500" />,
        bg_color: "bg-green-100"
    },
    {
        name: "Trả Hàng & Hoàn Tiền",
        icon: <RiExchangeLine className="icon w-6 h-6 text-orange-500" />,
        bg_color: "bg-orange-100"
    },
    {
        name: "Thông Tin Chung",
        icon: <BsFileText className="icon w-6 h-6 text-blue-500" />,
        bg_color: "bg-blue-100"
    }
]

export const FAQS = [
    {
        id: 1,
        message: "Điều khoản FoxMart"
    },
    {
        id: 2,
        message: "[Bảo mật tài khoản] Làm gì khi nhận được thông báo là thông tin tài khoản đã được thay đổi?"
    },
    {
        id: 3,
        message: "[Thông tin vận chuyển] Làm sao để liên hệ Đơn vị vận chuyển/tra cứu thông tin vận chuyển/hối giao hàng?"
    },
    {
        id: 4,
        message: "[Lỗi] Tại sao tôi không thể thanh toán đơn hàng trên FoxMart?"
    },
    {
        id: 5,
        message: "[Lỗi] Tại sao tôi không dùng được Voucher/Mã giảm giá?"
    },
    {
        id: 6,
        message: "[Thành viên mới] Tại sao tôi không thể đăng ký tạo tài khoản FoxMart bằng số điện thoại của mình?"
    },
    {
        id: 7,
        message: "[Dịch vụ] Làm sao để liên hệ Chăm sóc Khách hàng (CSKH) ?"
    },
    {
        id: 8,
        message: "[Dịch vụ] Làm sao để liên hệ Chăm sóc Khách hàng (CSKH) ?"
    },
]