import { Outlet } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import React from "react";
import { useImmer } from "use-immer";
import { Dropdown } from "@/components/Dropdown";
import Button from "@/components/Button";
import DatePicker from "react-datepicker";
import './SellerOrder/SellerOrder.scss';
const SEARCH_TYPE = ["Mã đơn hàng", "Mã khách hàng", "Tên khách hàng"];

const SellerOrder = () => {

    const [search, setSearch] = React.useState<string>("");
    const [searchType, setSearchType] = React.useState<string>("");

    const [dateRange, setDateRange] = React.useState([null, null]);
    const [startDate, endDate] = dateRange;

    const [productDetail, setProductDetail] = useImmer([
        {
            id: 1,
            name: "Tất cả",
            value: 4,
            selected: true
        },
        {
            id: 2,
            name: "Chờ xác nhận",
            value: 1,
            selected: false
        },
        {
            id: 3,
            name: "Chờ lấy hàng",
            value: 1,
            selected: false
        },
        {
            id: 4,
            name: "Đang giao",
            value: 0,
            selected: false
        },
        {
            id: 5,
            name: "Đã giao",
            value: 2,
            selected: false
        },
        {
            id: 6,
            name: "Đơn hủy",
            value: 0,
            selected: false
        },
        {
            id: 7,
            name: "Trả hàng/ Hoàn tiền",
            value: 0,
            selected: false
        },
    ]);

    const hanldeSetProductDetail = (id: number) => {
        setProductDetail(draft => {
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
            <div className="order-managment__tab-list mb-10">
                <div className="flex items-center mb-5 border-b-2 border-gray-200">
                    {
                        productDetail && productDetail.length > 0 &&
                        productDetail.map((item, index) => {
                            if (item.selected) {
                                return (
                                    <div className="px-5 py-2 border-b-2 border-[#FCB800] text-[#FCB800] font-medium cursor-pointer text-sm flex flex-col gap-y-1 items-center justify-center" key={`detail-${item.id}`}>
                                        <div>{item.name}</div>
                                        <div>({item.value})</div>
                                    </div>
                                )
                            }
                            return (
                                <div
                                    className="px-5 py-2 border-b-2 border-white text-gray-300 cursor-pointer text-sm flex flex-col gap-y-1 items-center justify-center"
                                    key={`detail-${item.id}`}
                                    onClick={() => hanldeSetProductDetail(item.id)}
                                >
                                    <div>{item.name}</div>
                                    <div>({item.value})</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="order-managment__search-bar mb-10 flex">
                <Dropdown data={SEARCH_TYPE} style={"border border-gray-300 h-10 w-[12rem] text-sm"} value={searchType} setValue={setSearchType} />
                <div className="w-full h-10 bg-white py-2 px-3 flex items-center gap-x-3 border border-gray-200 mr-2">
                    <input
                        value={search}
                        type="text"
                        placeholder="Bạn có thể tìm kiếm theo ID đơn hàng, khách hàng..."
                        className="outline-none w-full text-sm"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <IoSearch className="text-gray-500 w-4 h-4" />
                </div>
                <Button styles="text-black font-medium bg-[#FCB800] w-28 rounded-[4px] text-sm hover:opacity-80">Tìm kiếm</Button>
            </div>
            <div className="order-managment__order-date-search flex items-center gap-x-2 justify-end mb-10">
                <div className="text-sm">Ngày đặt hàng</div>
                <DatePicker
                    showIcon
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => {
                        setDateRange(update);
                    }}
                    isClearable={true}
                    className="border border-gray-300"
                    dateFormat="dd/MM/yyyy"
                />
                <Button styles="text-black font-medium bg-[#FCB800] w-8 h-8 flex items-center justify-center hover:opacity-80"><IoSearch className="w-4 h-4" /></Button>
            </div>
            <div className="order-managment__list">
                <Outlet />
            </div>
        </div>
    )
}

export default SellerOrder;