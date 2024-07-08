import CopyClipboard from "@/components/CopyClipboard";
import { CurrencyFormat } from "@/utils/numberFormat";
import ReactPaginate from "react-paginate";
import React from "react";
import { dateTimeFormat } from "@/utils/dateFormat";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Button from "@/components/Button";
import DatePicker from "react-datepicker";
import { IoFilterOutline } from "react-icons/io5";
import { confirmReceiveOrderSeller, getOrderStatus } from "@/services/shippingUnitService";
import Modal from "@/components/Modal";
import { errorToast1, successToast1 } from "@/components/Toast/Toast";
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

const ORDER_STATUS = 3

const SUOrderReceipt = () => {

    const navigate = useNavigate();

    const [dateRange, setDateRange] = React.useState([null, null]);
    const [startDate, endDate] = dateRange;

    const [dataLoading, setDataLoading] = React.useState<boolean>(true);
    const [showConfirmBox, setShowConfirmBox] = React.useState<boolean>(false);

    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(20);
    const [showItem, setShowItem] = React.useState<number>(10);

    const [orderList, setOrderList] = React.useState<IOrder[]>([]);
    const [updateOrder, setUpdateOrder] = React.useState<number>(0);

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

    const handleShowConfirmBox = (order_id: number) => {
        setUpdateOrder(order_id);
        setShowConfirmBox(true);
    }

    const handleFilterOrderDate = () => {
        if (startDate === null && endDate === null) {
            fetchAllOrder(showItem, 1, ORDER_STATUS);
            return;
        }

        if (startDate === null || endDate === null) {
            errorToast1("Khoảng thời gian không hợp lệ");
            return;
        }

        fetchAllOrder(showItem, 1, ORDER_STATUS);
    }

    const handleConfirmOrder = async (order_id: number, order_status: number) => {

        // order_status: 4 - Đã lấy hàng, 5 - Lấy hàng thất bại

        let result = await confirmReceiveOrderSeller(order_id, order_status);
        if (result) {
            if (result.EC === 0) {
                successToast1(result.EM);
                setShowConfirmBox(false);
                setUpdateOrder(0);
                fetchAllOrder(showItem, currentPage, ORDER_STATUS);
            } else {
                errorToast1(result.EM);
                setShowConfirmBox(false);
                setUpdateOrder(0);
            }
        }
    }

    React.useEffect(() => {

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setDataLoading(true);
        fetchAllOrder(showItem, currentPage, ORDER_STATUS);

    }, [currentPage]);

    return (
        <>
            <div className="search-bar flex items-center justify-between mb-4">
                <div className="text-xl w-1/3">Lấy hàng nhà bán</div>
                <div className="flex items-center justify-end w-2/3">
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
                                                            <Button
                                                                styles="border border-green-600 px-4 py-1.5 text-green-600 transition duration-300 hover:bg-green-600 hover:text-white w-fit cursor-pointer font-medium rounded"
                                                                OnClick={() => handleShowConfirmBox(item.id)}
                                                            >
                                                                <span>XN lấy hàng</span>
                                                            </Button>
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
            <Modal show={showConfirmBox} setShow={setShowConfirmBox} size="delete-confirmation-box">
                <div className="delete-confirmation-box w-full h-full relative flex flex-col justify-between">
                    <div className="text-xl">Xác nhận lấy đơn hàng #{updateOrder}</div>
                    <div className="flex items-center justify-end gap-x-2 transition-all">
                        <Button styles="rounded-[4px] px-8 py-2 text-black hover:bg-gray-200 cursor-pointer duration-200" OnClick={() => setShowConfirmBox(false)}>Hủy</Button>
                        <Button styles="rounded-[4px] px-8 py-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer duration-200 rounded" OnClick={() => handleConfirmOrder(updateOrder, 5)}>Trả hàng</Button>
                        <Button styles="rounded-[4px] px-8 py-2 bg-green-500 text-white hover:bg-green-600 cursor-pointer duration-200 rounded" OnClick={() => handleConfirmOrder(updateOrder, 4)}>Xác nhận</Button>
                    </div>
                </div>
            </Modal>
        </>

    )
}

export default SUOrderReceipt;