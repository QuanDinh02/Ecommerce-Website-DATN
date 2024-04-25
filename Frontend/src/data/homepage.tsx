import { CiStar } from "react-icons/ci";
import { PiTShirtLight } from "react-icons/pi";
import { TbToolsKitchen } from "react-icons/tb";
import { PiHeartbeatLight } from "react-icons/pi";
import { IoDiamondOutline } from "react-icons/io5";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { LiaBabyCarriageSolid } from "react-icons/lia";
import { IoTennisballOutline } from "react-icons/io5";
import { CiMobile4 } from "react-icons/ci";
import { IoBookOutline } from "react-icons/io5";
import { PiRocketLaunchThin } from "react-icons/pi";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { CiCreditCard1 } from "react-icons/ci";
import { PiWechatLogoLight } from "react-icons/pi";
import { CiSpeaker } from "react-icons/ci";

export const menuCategoryItems = [
    {
        icon: <CiStar className="w-5 h-5"/>,
    },
    {
        icon: <CiSpeaker className="w-5 h-5"/>,
        name: "Đồ điện",
        sub_menu: {
            check: true
        }
    },
    {
        icon: <PiTShirtLight className="w-5 h-5"/>,
        name: "Quần áo",
        sub_menu: {
            check: false
        }
    },
    {
        icon: <TbToolsKitchen className="w-5 h-5"/>,
        name: "Nội thất, Vườn & Bếp",
        sub_menu: {
            check: false
        }
    },
    {
        icon: <PiHeartbeatLight className="w-5 h-5"/>,
        name: "Sức khỏe & Sắc đẹp",
        sub_menu: {
            check: false
        }
    },
    {
        icon: <IoDiamondOutline className="w-5 h-5"/>,
        name: "Trang sức",
        sub_menu: {
            check: false
        }
    },
    {
        icon: <HiOutlineComputerDesktop className="w-5 h-5"/>,
        name: "Máy tính/ Công nghệ",
        sub_menu: {
            check: true
        }
    },
    {
        icon: <LiaBabyCarriageSolid className="w-5 h-5"/>,
        name: "Bé & Mẹ",
        sub_menu: {
            check: false
        }
    },
    {
        icon: <IoTennisballOutline className="w-5 h-5"/>,
        name: "Thể thao",
        sub_menu: {
            check: false
        }
    },
    {
        icon: <CiMobile4 className="w-5 h-5"/>,
        name: "Điện thoại/ Thiết bị",
        sub_menu: {
            check: true
        }
    },
    {
        icon: <IoBookOutline className="w-5 h-5"/>,
        name: "Sách",
        sub_menu: {
            check: false
        }
    }
];

export const clientBenefits = [
    {
        icon: <PiRocketLaunchThin className="w-12 h-12 text-[#FCB800]"/>,
        title: "Giao hàng miễn phí",
        subtitle: "Cho các đơn hàng từ 300k"
    },
    {
        icon: <LiaExchangeAltSolid className="w-12 h-12 text-[#FCB800]"/>,
        title: "90 ngày đổi trả hàng",
        subtitle: "Nếu như sản phẩm lỗi"
    },
    {
        icon: <CiCreditCard1 className="w-12 h-12 text-[#FCB800]"/>,
        title: "Thanh toán tin cậy",
        subtitle: "100% thanh toán dễ dàng"
    },
    {
        icon: <PiWechatLogoLight className="w-12 h-12 text-[#FCB800]"/>,
        title: "Hỗ trợ 24/7",
        subtitle: "Đội ngũ chăm sóc khách hàng tận tình"
    }
]

export const categoryIcon = [
    {
        icon: <CiStar className="w-5 h-5" />,
    },
    {
        icon: <CiSpeaker className="w-5 h-5" />,
    },
    {
        icon: <PiTShirtLight className="w-5 h-5" />,
    },
    {
        icon: <TbToolsKitchen className="w-5 h-5" />,
    },
    {
        icon: <PiHeartbeatLight className="w-5 h-5" />,
    },
    {
        icon: <IoDiamondOutline className="w-5 h-5" />,
    },
    {
        icon: <HiOutlineComputerDesktop className="w-5 h-5" />,
    },
    {
        icon: <LiaBabyCarriageSolid className="w-5 h-5" />,
    },
    {
        icon: <IoTennisballOutline className="w-5 h-5" />,
    },
    {
        icon: <CiMobile4 className="w-5 h-5" />,
    },
    {
        icon: <IoBookOutline className="w-5 h-5" />,
    }
];