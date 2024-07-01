import { IoBuildOutline } from "react-icons/io5";

const SellerNotification = () => {
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

export default SellerNotification;