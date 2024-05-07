import React from 'react';
import { FaCheck } from "react-icons/fa6";
import classNames from 'classnames';

const SettingItem = ({ style, title, sub_title }) => {

    const [activate, setActivate] = React.useState<boolean>(false);

    const activateStyle = () => classNames(
        'w-5 h-5 rounded-[2px] flex items-center justify-center', {
        'bg-[#FCB800] text-white': activate,
        'border border-gray-500': !activate,
    }
    );

    return (
        <div className={`${style} flex items-center justify-between`}>
            <div className="title-section">
                <div className="title text-lg mb-1">{title}</div>
                <div className="sub-title text-gray-500">{sub_title}</div>
            </div>
            <div className="activate-section flex items-center gap-x-2 cursor-pointer" onClick={() => setActivate(!activate)}>
                <div className={activateStyle()}>{activate ? <FaCheck /> : ""}</div>
                <div className='font-medium'>Kích hoạt</div>
            </div>
        </div>
    )
}

const NotificationSetting = () => {

    return (
        <div className="notification-setting">
            <div className="notification-setting__title pb-5 border-b border-gray-300">
                <div className="title text-xl">Cài đặt thông báo</div>
            </div>
            <div className="notification-setting__main p-5 flex flex-col">
                <SettingItem style={"mb-5 w-full"} title={"Thông báo qua Email"} sub_title={"Các thông tin sẽ được thông báo qua email"} />
                <SettingItem style={"mb-5 w-full"} title={"Cập nhật đơn hàng"} sub_title={"Thông báo khi có cập nhật về đơn hàng của tôi, bao gồm cả việc cập nhật than toán"} />
                <SettingItem style={"mb-5 w-full"} title={"Cập nhật sản phẩm"} sub_title={"Thông báo khi sản phẩm của tôi hết hàng, bị xóa hoặc bị khóa"} />
                <SettingItem style={"mb-5 w-full"} title={"Bản tin"} sub_title={"Gửi tôi thông tin xu hướng, chương trình khuyến mãi & cập nhật mới nhất"} />
            </div>
        </div>
    )
}

export default NotificationSetting;