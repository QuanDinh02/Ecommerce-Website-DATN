import Button from "@/components/Button";
import { NOTIFICATION_SAMPLE_DATA } from "./CustomerOrder/OrderDataSample";

const CustomerNotification = () => {
    return (
        <div className="customer-notification-container">
            <div className="customer-notification__title mb-6">
                <div className="title text-xl">Thông báo</div>
            </div>
            <div className="customer-notification__main">
                <div className="notification-item  flex items-center justify-between px-3 py-2 bg-[#ffe8e8] mb-1">
                    <div className="flex gap-x-4 items-center">
                        <div className="w-24 h-24"><img src={NOTIFICATION_SAMPLE_DATA(1)?.image} alt="" /></div>
                        <div className="flex flex-col gap-y-1">
                            <div className="font-medium">{NOTIFICATION_SAMPLE_DATA(1)?.status}</div>
                            <div className="text-gray-500 text-sm w-[36rem]">{NOTIFICATION_SAMPLE_DATA(1)?.message}</div>
                            <div className="text-gray-500 text-sm">{NOTIFICATION_SAMPLE_DATA(1)?.date}</div>
                        </div>
                    </div>
                    <div>
                        <Button styles="px-3 py-1 border border-gray-300 bg-white text-sm hover:bg-gray-100">Xem chi tiết</Button>
                    </div>
                </div>
                <div className="notification-item  flex items-center justify-between px-3 py-2 bg-[#ffe8e8] mb-1">
                    <div className="flex gap-x-4 items-center">
                        <div className="w-24 h-24"><img src={NOTIFICATION_SAMPLE_DATA(2)?.image} alt="" /></div>
                        <div className="flex flex-col gap-y-1">
                            <div className="font-medium">{NOTIFICATION_SAMPLE_DATA(2)?.status}</div>
                            <div className="text-gray-500 text-sm w-[36rem]">{NOTIFICATION_SAMPLE_DATA(2)?.message}</div>
                            <div className="text-gray-500 text-sm">{NOTIFICATION_SAMPLE_DATA(2)?.date}</div>
                        </div>
                    </div>
                    <div>
                        <Button styles="px-3 py-1 border border-gray-300 bg-white text-sm hover:bg-gray-100">Xem chi tiết</Button>
                    </div>
                </div>
                <div className="notification-item  flex items-center justify-between px-3 py-2 bg-[#ffe8e8] mb-1">
                    <div className="flex gap-x-4 items-center">
                        <div className="w-24 h-24"><img src={NOTIFICATION_SAMPLE_DATA(3)?.image} alt="" /></div>
                        <div className="flex flex-col gap-y-1">
                            <div className="font-medium">{NOTIFICATION_SAMPLE_DATA(3)?.status}</div>
                            <div className="text-gray-500 text-sm w-[36rem]">{NOTIFICATION_SAMPLE_DATA(3)?.message}</div>
                            <div className="text-gray-500 text-sm">{NOTIFICATION_SAMPLE_DATA(3)?.date}</div>
                        </div>
                    </div>
                    <div>
                        <Button styles="px-3 py-1 border border-gray-300 bg-white text-sm hover:bg-gray-100">Xem chi tiết</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerNotification;