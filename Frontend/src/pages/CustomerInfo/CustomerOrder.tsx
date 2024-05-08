import { Outlet } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import React from "react";

const CustomerOrder = () => {

    const [search, setSearch] = React.useState<string>("");

    return (
        <div className="customer-order-container">
            <div className="customer-order__search-bar w-full mb-10">
                <div className="w-full h-10 bg-gray-100 py-2 px-3 flex items-center gap-x-3">
                    <IoSearch className="text-gray-500 w-6 h-6" />
                    <input
                        value={search}
                        type="text"
                        placeholder="Bạn có thể tìm kiếm theo ID đơn hàng, tên sản phẩm, tên Shop..."
                        className="outline-none bg-gray-100 w-full"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
            <div className="customer-order__list">
                <Outlet />
            </div>
        </div>
    )
}

export default CustomerOrder;