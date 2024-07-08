import CopyClipboard from "@/components/CopyClipboard";
import { CurrencyFormat } from "@/utils/numberFormat";
import ReactPaginate from "react-paginate";
import React from "react";
import { dateTimeFormat } from "@/utils/dateFormat";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { useImmer } from "use-immer";
import Button from "@/components/Button";
import DatePicker from "react-datepicker";
import { IoSearch, IoFilterOutline } from "react-icons/io5";
import { getOrderSearch, getOrderStatus } from "@/services/shippingUnitService";
import { errorToast1 } from "@/components/Toast/Toast";
interface IOrderShipmentStatus {
    id: number
    name: string
}
interface IOrder {
    id: number
    orderDate: Date
    status: IOrderShipmentStatus
    totalPrice: number
    customer_name: string
    seller_name: string
}

interface IData {
    page: number
    page_total: number
    order_list: IOrder[]
    total_items: number
}

const tableHeaders = [
    {
        name: "Ngày",
        size: 1
    },
    {
        name: "Mã đơn hàng",
        size: 2
    },
    {
        name: "Người bán",
        size: 2
    },
    {
        name: "Người mua",
        size: 2
    },
    {
        name: "Trạng thái đơn hàng",
        size: 3
    },
    {
        name: "Tổng",
        size: 1
    },
    {
        name: "",
        size: 2
    },
];

const ORDER_STATUS = [
    {
        id: 0,
        name: "Tất cả",
        selected: true
    },
    {
        id: 3,
        name: "Chờ lấy hàng",
        selected: false
    },
    {
        id: 4,
        name: "Đã Lấy hàng",
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
        id: 9,
        name: "Đang trả hàng cho nhà bán",
        selected: false
    }
];

const SUOrderStatus = () => {

    const navigate = useNavigate();

    const [search, setSearch] = React.useState<string>("");
    const [searchParams] = useSearchParams();

    const [dateRange, setDateRange] = React.useState([null, null]);
    const [startDate, endDate] = dateRange;

    const [dataLoading, setDataLoading] = React.useState<boolean>(true);

    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(20);
    const [showItem, setShowItem] = React.useState<number>(10);

    const [orderCurrentStatus, setOrderCurrentStatus] = React.useState<number>(0);

    const [orderList, setOrderList] = React.useState<IOrder[]>([]);

    const [orderStatus, setOrderStatus] = useImmer(ORDER_STATUS);

    const hanldeSetOrderStatus = (id: number) => {
        navigate({
            pathname: "/fms/su/order/order-status",
            search: `?status=${id}`,

        }, {
            replace: true
        });
    }

    const handleShowOrderDetail = (order_id: number) => {
        navigate({
            pathname: "/fms/su/order/detail",
            search: `?code=${order_id}`,
        });
    }

    const handlePageClick = (event) => {
        setDataLoading(true);
        setCurrentPage(+event.selected + 1);
    }

    const fetchAllOrder = async (limit: number, page: number, status: number) => {
        let response: IData = await getOrderStatus(limit, page, status, startDate, endDate);
        if (response) {
            setOrderList(response.order_list);
            setTotalPages(response.page_total);
            setTimeout(() => {
                setDataLoading(false);
            }, 500);
        }
    }

    const handleFilterOrderDate = () => {
        if (startDate === null && endDate === null) {
            fetchAllOrder(showItem, 1, orderCurrentStatus);
            return;
        }

        if (startDate === null || endDate === null) {
            errorToast1("Khoảng thời gian không hợp lệ");
            return;
        }

        fetchAllOrder(showItem, 1, orderCurrentStatus);
    }

    const searchOrderByOrderID = async (order_id: number) => {
        let response: any = await getOrderSearch(order_id);
        if (response) {
            setOrderList(response.order_list);
            setTimeout(() => {
                setDataLoading(false);
            }, 1000);
        }
    }

    const handleKeyPress = async (event) => {

        if (event.key === 'Enter') {
            if (search === "") {
                navigate({
                    pathname: "/fms/su/order/order-status",
                    search: `?status=0`,

                }, {
                    replace: true
                });
            }
            else {
                setDataLoading(true);
                searchOrderByOrderID(+search);
            }
        }
    }

    React.useEffect(() => {

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        let order_status = searchParams.get('status');

        let activeOrderStatus: number = order_status ? +order_status : 0;

        if (activeOrderStatus !== orderCurrentStatus) {
            setOrderCurrentStatus(activeOrderStatus);
            setOrderStatus(draft => {
                draft.forEach(item => {
                    if (item.id === activeOrderStatus) {
                        item.selected = true;
                    } else {
                        item.selected = false;
                    }
                });
            });
            setDataLoading(true);
            setCurrentPage(1);
            fetchAllOrder(showItem, 1, activeOrderStatus);
        } else {
            setDataLoading(true);
            fetchAllOrder(showItem, currentPage, orderCurrentStatus);
        }

    }, [searchParams.get('status'), currentPage]);

    return (
        <>
            <div className="search-bar flex items-center justify-between mb-4">
                <div className="text-xl w-1/3">Trạng thái đơn hàng</div>
                <div className="flex items-center justify-end gap-x-6 w-2/3">
                    <div className="w-64 h-10 bg-white py-2 px-3 flex items-center gap-x-3 border border-gray-200 rounded">
                        <IoSearch className="text-gray-500 w-4 h-4" />
                        <input
                            value={search}
                            type="text"
                            placeholder="Tìm theo mã đơn hàng"
                            className="outline-none w-full text-sm rounded"
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(event) => handleKeyPress(event)}
                        />
                    </div>
                    <div className="flex items-center gap-x-1">
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
                        <Button styles="transition duration-300 bg-blue-600 text-white border border-blue-600 px-4 py-1.5 rounded hover:text-blue-600 hover:bg-white cursor-pointer flex items-center gap-x-2 font-medium" OnClick={() => handleFilterOrderDate()}><IoFilterOutline /> Xem</Button>
                    </div>
                </div>
            </div>
            <div className="tab-list w-full mb-2">
                <div className="flex mb-5 border-b border-gray-200 w-full overflow-x-auto">
                    {
                        orderStatus && orderStatus.length > 0 &&
                        orderStatus.map((item, index) => {
                            if (item.selected) {
                                return (
                                    <div className="shrink-0 px-5 py-2 border-b-2 border-blue-600 text-blue-600 font-medium cursor-pointer flex gap-x-1 items-center justify-center" key={`detail-${item.id}`}>
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
            <div>
                {
                    dataLoading ?
                        <div className="flex items-center justify-center w-full h-full">
                            <ThreeDots
                                height="60"
                                width="60"
                                color="#9ca3af"
                                ariaLabel="three-dots-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass="flex items-center justify-center tail-spin"
                                visible={true}
                            />
                        </div>
                        :
                        <table className="table-fixed w-full mb-8">
                            <thead>
                                <tr className='bg-gray-100 border-b-10 border-white'>
                                    {tableHeaders && tableHeaders.length > 0 &&
                                        tableHeaders.map((item, index) => {
                                            return (
                                                <th key={`header-${index}`} className="text-left py-3 px-3 font-medium" colSpan={item.size}>{item.name}</th>
                                            )
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (orderList && orderList.length > 0) ?
                                        <>

                                            {orderList.map((item, index) => {
                                                return (
                                                    <tr className="border-b border-gray-200 text-sm hover:bg-gray-100" key={`product-${index}`}>
                                                        <td className="py-4 px-3" colSpan={1}>{dateTimeFormat(`${item.orderDate}`)}</td>
                                                        <td className="py-4 px-3 " colSpan={2}>
                                                            <span className="flex items-center gap-x-1">
                                                                {item.id} <span className="cursor-pointer"><CopyClipboard value={item.id} /></span>
                                                            </span>
                                                        </td>
                                                        <td className="py-4 px-3" colSpan={2}>
                                                            <span className="line-clamp-2">{item.seller_name}</span>
                                                        </td>
                                                        <td className="py-4 px-3" colSpan={2}>
                                                            <span className="line-clamp-2">{item.customer_name}</span>
                                                        </td>
                                                        <td className="py-4 px-3" colSpan={3}>
                                                            {
                                                                item.status.id === 3 && <span>Chờ lấy hàng</span>
                                                            }
                                                            {
                                                                item.status.id === 4 && <span>Đã lấy hàng</span>
                                                            }
                                                            {
                                                                item.status.id !== 3 && item.status.id !== 4 && <span>{item.status.name}</span>
                                                            }
                                                        </td>
                                                        <td className="py-4 px-3 font-medium" colSpan={1}>{CurrencyFormat(item.totalPrice)}</td>
                                                        <td className="py-4 px-3 text-end" colSpan={2} >
                                                            <span className="cursor-pointer hover:underline hover:text-blue-600" onClick={() => handleShowOrderDetail(item.id)}>Xem chi tiết</span>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                            <tr>
                                                <td colSpan={13}>
                                                    {
                                                        <div className='pagination-sys-container my-4 flex justify-center'>
                                                            <ReactPaginate
                                                                nextLabel=">"
                                                                onPageChange={handlePageClick}
                                                                pageRangeDisplayed={5}
                                                                marginPagesDisplayed={0}
                                                                pageCount={totalPages}
                                                                previousLabel="<"
                                                                pageClassName="page-item"
                                                                pageLinkClassName="page-link page-background"
                                                                previousClassName="page-item"
                                                                previousLinkClassName="page-link pre-next"
                                                                nextClassName="page-item"
                                                                nextLinkClassName="page-link pre-next"
                                                                breakLabel=""
                                                                breakClassName="page-item"
                                                                breakLinkClassName="page-link"
                                                                containerClassName="pagination flex items-center gap-2 "
                                                                activeLinkClassName="page-active-background"
                                                                renderOnZeroPageCount={null}
                                                                forcePage={currentPage - 1}
                                                            />
                                                        </div>
                                                    }
                                                </td>
                                            </tr>
                                        </>
                                        :
                                        <tr>
                                            <td className="text-center py-3" colSpan={13}>
                                                <div className="w-full text-gray-500 text-center py-2">Không có dữ liệu !</div>
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                }
            </div>
        </>

    )
}

export default SUOrderStatus;