import React from 'react';
import { FaCheck } from "react-icons/fa6";
import classNames from 'classnames';
import { IoBuildOutline } from 'react-icons/io5';

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
        <div className="customer-notification-container w-full py-5 px-10 bg-white h-full">
            <div className="w-full h-full flex flex-col items-center justify-center gap-y-2">
                <div><IoBuildOutline className="w-12 h-12" /></div>
                <div className="text-xl font-medium">THIS FEATURE UNDER MAINTENANCE</div>
                <div className="text-center">
                    <div className="text-sm text-gray-500">Our website is currenly undergoing scheduled maintenance</div>
                    <div className="text-sm text-gray-500">We should be back shortly. Thank you for your patience</div>
                </div>
            </div>
        </div>
    )
}

export default NotificationSetting;