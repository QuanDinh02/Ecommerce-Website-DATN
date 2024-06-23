import CopyClipboard from "@/components/CopyClipboard";
import { CurrencyFormat } from "@/utils/numberFormat";
import { confirmCustomerOrder, getOrderAll, packingCustomerOrder } from "@/services/sellerService";
import ReactPaginate from "react-paginate";
import React from "react";
import { dateTimeFormat } from "@/utils/dateFormat";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { useImmer } from "use-immer";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { errorToast1, successToast1 } from "@/components/Toast/Toast";
import DatePicker from "react-datepicker";
import { IoSearch, IoFilterOutline } from "react-icons/io5";
interface IOrderShipmentStatus {
    id: number
    name: string
}
interface IOrder {
    id: number
    orderDate: Date
    status: IOrderShipmentStatus
    totalPrice: number
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
        size: 2
    },
    {
        name: "Mã đơn hàng",
        size: 2
    },
    {
        name: "Trạng thái đơn hàng",
        size: 2
    },
    {
        name: "Tổng",
        size: 1
    },
    {
        name: "",
        size: 2
    },
    {
        name: "",
        size: 1
    }
];

const ORDER_STATUS = [
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
];

const AllOrder = () => {

    const navigate = useNavigate();

    const [search, setSearch] = React.useState<string>("");

    const [dateRange, setDateRange] = React.useState([null, null]);
    const [startDate, endDate] = dateRange;

    const [dataLoading, setDataLoading] = React.useState<boolean>(true);
    const [showConfirmBox, setShowConfirmBox] = React.useState<boolean>(false);
    const [showPackingBox, setShowPackingBox] = React.useState<boolean>(false);

    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(20);
    const [showItem, setShowItem] = React.useState<number>(10);

    const [orderCurrentStatus, setOrderCurrentStatus] = React.useState<number>(0);

    const [orderList, setOrderList] = React.useState<IOrder[]>([]);

    const [orderStatus, setOrderStatus] = useImmer(ORDER_STATUS);
    const [updateOrder, setUpdateOrder] = React.useState<number>(0);

    const hanldeSetOrderStatus = (id: number) => {
        setOrderCurrentStatus(id);
        setOrderStatus(draft => {
            draft.forEach(item => {
                if (item.id === id) {
                    item.selected = true;
                } else {
                    item.selected = false;
                }
            });
        });
    }

    const handleShowOrderDetail = (order_id: number) => {
        navigate({
            pathname: "/seller-info/order/detail",
            search: `?code=${order_id}`,
        });
    }

    const handlePageClick = (event) => {
        setDataLoading(true);
        setCurrentPage(+event.selected + 1);
    }

    const fetchAllOrder = async (limit: number, page: number, status: number) => {
        let response: IData = await getOrderAll(limit, page, status);
        if (response) {
            setOrderList(response.order_list);
            setTotalPages(response.page_total);
            setTimeout(() => {
                setDataLoading(false);
            }, 500);
        }
    }

    const handleShowConfirmBox = (order_id: number) => {
        setUpdateOrder(order_id);
        setShowConfirmBox(true);
    }

    const handleShowPackingBox = (order_id: number) => {
        setUpdateOrder(order_id);
        setShowPackingBox(true);
    }

    const handleConfirmOrder = async (order_id: number, packing: boolean) => {
        let result = await confirmCustomerOrder(order_id, packing);
        if (result) {
            if (result.EC === 0) {
                successToast1(result.EM);
                setShowConfirmBox(false);
                setUpdateOrder(0);
                fetchAllOrder(showItem, currentPage, orderCurrentStatus);
            } else {
                errorToast1(result.EM);
                setShowConfirmBox(false);
                setUpdateOrder(0);
            }
        }
    }

    const handlePackingOrder = async (order_id: number) => {
        let result = await packingCustomerOrder(order_id);
        if (result) {
            if (result.EC === 0) {
                successToast1(result.EM);
                setShowPackingBox(false);
                setUpdateOrder(0);
                fetchAllOrder(showItem, currentPage, orderCurrentStatus);
            } else {
                errorToast1(result.EM);
                setShowPackingBox(false);
                setUpdateOrder(0);
            }
        }
    }

    React.useEffect(() => {

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setDataLoading(true);
        fetchAllOrder(showItem, currentPage, orderCurrentStatus);

    }, [currentPage]);

    React.useEffect(() => {

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setDataLoading(true);
        setCurrentPage(1);
        fetchAllOrder(showItem, 1, orderCurrentStatus);

    }, [orderCurrentStatus]);

    return (
        <>
            <div className="search-bar flex items-center justify-between mb-4">
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
            <div className="tab-list w-full mb-2">
                <div className="flex mb-5 border-b border-gray-200 w-full overflow-x-scroll pb-2">
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
                                                        <td className="py-4 px-2" colSpan={2}>{dateTimeFormat(`${item.orderDate}`)}</td>
                                                        <td className="py-4 px-2 " colSpan={2}>
                                                            <span className="flex items-center gap-x-1">
                                                                {item.id} <span className="cursor-pointer"><CopyClipboard value={item.id} /></span>
                                                            </span>
                                                        </td>
                                                        <td className="py-4 px-2" colSpan={2}>
                                                            <span>{item.status.name}</span>
                                                        </td>
                                                        <td className="py-4 px-2 font-medium" colSpan={1}>{CurrencyFormat(item.totalPrice)}</td>
                                                        <td className="py-4 px-2" colSpan={2}>
                                                            <div className="flex items-center justify-center">
                                                                {
                                                                    item.status.id === 1 &&
                                                                    <Button
                                                                        styles="border border-green-600 px-4 py-1.5 text-green-600 transition duration-300 hover:bg-green-600 hover:text-white w-fit cursor-pointer font-medium rounded"
                                                                        OnClick={() => handleShowConfirmBox(item.id)}
                                                                    >
                                                                        <span>XN đơn hàng</span>
                                                                    </Button>
                                                                }
                                                                {
                                                                    item.status.id === 2 &&
                                                                    <Button
                                                                        styles="border border-blue-600 px-4 py-1.5 text-blue-600 transition duration-300 hover:bg-blue-600 hover:text-white w-fit cursor-pointer font-medium rounded"
                                                                        OnClick={() => handleShowPackingBox(item.id)}
                                                                    >
                                                                        <span>Đóng gói</span>
                                                                    </Button>
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-2" colSpan={1} >
                                                            <span className="cursor-pointer hover:underline hover:text-blue-600" onClick={() => handleShowOrderDetail(item.id)}>Xem chi tiết</span>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                            <tr>
                                                <td colSpan={9}>
                                                    {
                                                        <div className='pagination-container my-4 flex justify-center'>
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
                                            <td className="text-center py-3" colSpan={9}>
                                                <div className="w-full text-gray-500 text-center py-2">Không có dữ liệu !</div>
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                }
            </div>
            <Modal show={showConfirmBox} setShow={setShowConfirmBox} size="delete-confirmation-box">
                <div className="delete-confirmation-box w-full h-full relative flex flex-col justify-between">
                    <div className="text-xl">Xác nhận đơn hàng #{updateOrder}</div>
                    <div className="flex items-center justify-end gap-x-2 transition-all">
                        <Button styles="rounded-[4px] px-8 py-2 text-black hover:bg-gray-200 cursor-pointer duration-200" OnClick={() => setShowConfirmBox(false)}>Hủy</Button>
                        <Button styles="rounded-[4px] px-8 py-2 bg-blue-500 text-white hover:bg-blue-600 cursor-pointer duration-200 rounded" OnClick={() => handleConfirmOrder(updateOrder, true)}>Xác nhận & Đóng gói</Button>
                        <Button styles="rounded-[4px] px-8 py-2 bg-green-500 text-white hover:bg-green-600 cursor-pointer duration-200 rounded" OnClick={() => handleConfirmOrder(updateOrder, false)}>Xác nhận</Button>
                    </div>
                </div>
            </Modal>
            <Modal show={showPackingBox} setShow={setShowPackingBox} size="delete-confirmation-box">
                <div className="delete-confirmation-box w-full h-full relative flex flex-col justify-between">
                    <div className="text-xl">Đóng gói đơn hàng #{updateOrder}</div>
                    <div className="flex items-center justify-end gap-x-2 transition-all">
                        <Button styles="rounded-[4px] px-8 py-2 text-black hover:bg-gray-200 cursor-pointer duration-200" OnClick={() => setShowPackingBox(false)}>Hủy</Button>
                        <Button styles="rounded-[4px] px-8 py-2 bg-blue-500 text-white hover:bg-blue-600 cursor-pointer duration-200 rounded" OnClick={() => handlePackingOrder(updateOrder)}>Đóng gói</Button>
                    </div>
                </div>
            </Modal>
        </>

    )
}

export default AllOrder;