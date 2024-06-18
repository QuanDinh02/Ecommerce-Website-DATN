import { Outlet } from "react-router-dom";
import { IoSearch, IoFilterOutline } from "react-icons/io5";
import React from "react";
import { useImmer } from "use-immer";
import Button from "@/components/Button";
import DatePicker from "react-datepicker";
import './SellerOrder/SellerOrder.scss';

const SellerOrder = () => {

    const [search, setSearch] = React.useState<string>("");

    const [dateRange, setDateRange] = React.useState([null, null]);
    const [startDate, endDate] = dateRange;

    const [orderStatus, setOrderStatus] = useImmer([
        {
            id: 0,
            name: "Tất cả",
            selected: true
        },
        {
            id: 1,
            name: "Chờ xác nhận",
            selected: false
        },
        {
            id: 2,
            name: "Đã xác nhận",
            selected: false
        },
        {
            id: 3,
            name: "Đang đóng gói",
            selected: false
        },
        {
            id: 4,
            name: "Lấy hàng",
            selected: false
        },
        {
            id: 5,
            name: "Lấy hàng thất bại",
            selected: false
        },
        {
            id: 6,
            name: "Đang giao hàng",
            selected: false
        },
        {
            id: 7,
            name: "Giao hàng thành công",
            selected: false
        },
        {
            id: 8,
            name: "Giao hàng thất bại",
            selected: false
        },
        {
            id: 9,
            name: "Đang trả hàng cho nhà bán",
            selected: false
        },
        {
            id: 10,
            name: "Đã hủy(Chưa giao hàng)",
            selected: false
        },
    ]);

    const hanldeSetOrderStatus = (id: number) => {
        setOrderStatus(draft => {
            draft.forEach(item => {
                if (item.id === id) {
                    item.selected = true;
                } else {
                    item.selected = false;
                }
            });
        })
    }

    return (
        <div className="order-managment-container">
            <div className="order-management__header flex items-center justify-between mb-4">
                <div className="text-xl w-1/3">Trạng thái đơn hàng</div>
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
            <div className="order-managment__tab-list w-full mb-2">
                <div className="flex mb-5 border-b-2 border-gray-200 w-full overflow-x-scroll pb-4">
                    {
                        orderStatus && orderStatus.length > 0 &&
                        orderStatus.map((item, index) => {
                            if (item.selected) {
                                return (
                                    <div className="shrink-0 px-5 py-2 border-b-2 border-[#FCB800] text-[#FCB800] font-bold cursor-pointer flex gap-x-1 items-center justify-center" key={`detail-${item.id}`}>
                                        <div>{item.name}</div>
                                    </div>
                                )
                            }
                            return (
                                <div
                                    className="shrink-0 px-5 py-2 border-b-2 border-white cursor-pointer flex gap-x-1 items-center justify-center"
                                    key={`detail-${item.id}`}
                                    onClick={() => hanldeSetOrderStatus(item.id)}
                                >
                                    <div>{item.name}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className="order-managment__list">
                <Outlet />
            </div>
        </div>
    )
}

export default SellerOrder;