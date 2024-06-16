import React from "react";
import { useSearchParams } from "react-router-dom";

const ORDER_STATUS = [
    {
        id: 1,
        label: "Đặt hàng thành công"
    },
    {
        id: 2,
        label: "Đã xác nhận đơn hàng"
    },
    {
        id: 3,
        label: "Đang đóng gói"
    },
    {
        id: 4,
        label: "Đang vận chuyển"
    },
    {
        id: 5,
        label: "Giao hàng thành công"
    }
]

const OrderTracking = () => {

    const [searchParams] = useSearchParams();

    const [orderID, setOrderID] = React.useState<number>(0);
    const [orderStatus, setOrderStatus] = React.useState<number>(2);

    React.useEffect(() => {

        let order_id = searchParams.get('code');

        let activeOrderID: number = order_id ? +order_id : 0;

        if (activeOrderID !== orderID) {
            setOrderID(activeOrderID);
        }

    }, [searchParams.get('code')]);

    React.useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [orderID]);

    return (
        <div className="order-tracking-container">
            <div className="text-xl text-gray-600 mb-8">Theo dõi đơn hàng #{orderID}</div>
            <div className="text-sm font-medium text-gray-600 mb-4">TRẠNG THÁI ĐƠN HÀNG</div>
            <div className="bg-white px-5 pt-20 pb-12 rounded">
                <div className="flex items-center w-full">
                    {
                        ORDER_STATUS.map((step, index) => {
                            if (step.id < orderStatus) {
                                return (
                                    <>
                                        {(index !== 0) &&
                                            <div className="flex-1 h-2 bg-[#6acd03]"></div>
                                        }
                                        <div className="relative">
                                            <div className="w-5 h-5 border-2 border-[#6acd03] rounded-full flex items-center justify-center text-xl bg-[#6acd03]"></div>
                                            {
                                                (index !== ORDER_STATUS.length - 1) ?
                                                    <div className="text-sm absolute left-[-10px] top-[-48px] w-32 text-gray-600 font-medium h-10">{step.label}</div>
                                                    :
                                                    <div className="text-sm absolute right-0 top-[-48px] w-32 text-gray-600 font-medium text-end h-10">{step.label}</div>
                                            }
                                        </div>
                                    </>
                                )
                            }
                            else if (step.id === orderStatus) {
                                return (
                                    <>
                                        {(index !== 0) &&
                                            <div className="flex-1 h-2 bg-[#6acd03]"></div>
                                        }
                                        <div className="relative">
                                            <div className="w-5 h-5 border-4 border-[#6acd03] rounded-full flex items-center justify-center text-xl bg-white"></div>
                                            {
                                                (index !== ORDER_STATUS.length - 1) ?
                                                    <div className="text-sm absolute left-[-10px] top-[-48px] w-32 text-gray-600 font-medium h-10">{step.label}</div>
                                                    :
                                                    <div className="text-sm absolute right-0 top-[-48px] w-32 text-gray-600 font-medium text-end h-10">{step.label}</div>
                                            }
                                        </div>
                                    </>
                                )
                            }
                            else {
                                return (
                                    <>
                                        {(index !== 0) &&
                                            <div className="flex-1 h-2 bg-gray-200"></div>
                                        }
                                        <div className="relative">
                                            <div className="w-5 h-5 border-2 border-gray-200 rounded-full flex items-center justify-center text-xl bg-gray-200"></div>
                                            {
                                                (index !== ORDER_STATUS.length - 1) ?
                                                    <div className="text-sm absolute left-[-10px] top-[-48px] w-32 text-gray-400 font-medium">{step.label}</div>
                                                    :
                                                    <div className="text-sm absolute right-0 top-[-48px] w-32 text-gray-400 font-medium text-end">{step.label}</div>
                                            }
                                        </div>
                                    </>
                                )
                            }
                        })
                    }
                </div>
            </div>
            <div className="text-sm font-medium text-gray-600 my-4">CHI TIẾT TRẠNG THÁI ĐƠN HÀNG</div>
            <div className="bg-white p-5 rounded">
                <div className="w-full h-full rounded border border-gray-300">
                    <div className="bg-gray-100 font-medium px-3 py-4 rounded-t">Cập nhật mới nhất: 16/04/2024</div>
                    <div className="bg-white px-3 py-4 border-t border-gray-300 font-medium flex items-center gap-x-6">
                        <span className="status__time">16:32</span>
                        <span className="status__name">Đã xác nhận đơn hàng</span>
                    </div>
                    <div className="bg-white px-3 py-4 border-t border-gray-300 flex items-center gap-x-6 rounded-b">
                        <span className="status__time">16:32</span>
                        <span className="status__name">Đặt hàng thành công</span>
                    </div>
                </div>
            </div>
            <div className="text-sm font-medium text-gray-600 my-4">KIỆN HÀNG GỒM CÓ</div>
            <div className="bg-white p-5 rounded">
                <div className="flex items-center gap-x-6">
                    <div className="w-24 h-24 bg-gray-100"></div>
                    <div className="opacity-90 line-clamp-1 cursor-pointer hover:underline hover:text-blue-600">Thớt tre tự nhiên Sunhouse KS-CH3522B</div>
                </div>
            </div>
        </div>
    )
}

export default OrderTracking;