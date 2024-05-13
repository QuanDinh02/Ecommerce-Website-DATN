import React from "react";

const CancelOrder = () => {

    const [orderList, setOrderList] = React.useState<any>([]);

    // React.useEffect(() => {
    //     setOrderList(ORDER_SAMPLE_DATA);
    // }, []);

    return (
        <div className="all-order-container">
            <div className="text-xl pb-4 border-b border-gray-300 mb-4">Đơn hàng hủy</div>
            <div className="w-full text-gray-500 text-center border border-gray-100 bg-gray-100 py-2">Chưa có đơn hàng hủy nào !</div>
        </div>
    )
}

export default CancelOrder;