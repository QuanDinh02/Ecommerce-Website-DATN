import Button from "@/components/Button";
import React from "react";
import DatePicker from "react-datepicker";
import { IoSearch, IoFilterOutline } from "react-icons/io5";

const SellerControlDelivery = () => {

    const [search, setSearch] = React.useState<string>("");

    const [dateRange, setDateRange] = React.useState([null, null]);
    const [startDate, endDate] = dateRange;

    return (
        <>
             <div className="search-bar flex items-center justify-between mb-4">
                <div className="text-xl w-1/3">Đối soát hàng giao</div>
                <div className="flex items-center justify-between gap-x-16 w-2/3">
                    <div className="flex items-center gap-x-2 flex-1">
                        <div className="w-full h-10 bg-white py-2 px-3 flex items-center gap-x-3 border border-gray-200 rounded">
                            <input
                                value={search}
                                type="text"
                                placeholder="Tìm mã đơn hàng"
                                className="outline-none w-full text-sm rounded"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <IoSearch className="text-gray-500 w-4 h-4" />
                        </div>
                        <DatePicker
                            showIcon
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update) => {
                                setDateRange(update);
                            }}
                            isClearable={true}
                            className="border border-gray-300 rounded"
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                    <Button styles="bg-[#FCB800] px-4 py-1.5 rounded hover:opacity-80 cursor-pointer flex items-center gap-x-2 font-medium"><IoFilterOutline /> Xem</Button>
                </div>
            </div>
        </>
    )
}

export default SellerControlDelivery;