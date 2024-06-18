import CopyClipboard from "@/components/CopyClipboard";
import { CurrencyFormat } from "@/utils/numberFormat";
import { getOrderAll } from "@/services/sellerService";
import ReactPaginate from "react-paginate";
import React from "react";
import { dateTimeFormat } from "@/utils/dateFormat";
import { useNavigate } from "react-router-dom";


interface IOrder {
    id: number
    orderDate: Date
    status: string
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
        size: 2
    },
    {
        name: "",
        size: 1
    }
];


const AllOrder = () => {

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(20);
    const [showItem, setShowItem] = React.useState<number>(10);

    const [orderList, setOrderList] = React.useState<IOrder[]>([]);

    const handleShowOrderDetail = (order_id: number, status: string) => {
        navigate({
            pathname: "/seller-info/order/detail",
            search: `?code=${order_id}&status=${status}`,
        });
    }

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1);
    }

    const fetchAllOrder = async (limit: number, page: number) => {
        let response: IData = await getOrderAll(limit, page);
        if (response) {
            setOrderList(response.order_list);
            setTotalPages(response.page_total);
        }
    }

    React.useEffect(() => {

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        fetchAllOrder(showItem, currentPage);

    }, [currentPage]);

    return (
        <div>
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
                                            <td className="py-4 px-2" colSpan={2}>{item.status}</td>
                                            <td className="py-4 px-2 font-medium" colSpan={2}>{CurrencyFormat(item.totalPrice)}</td>
                                            <td className="py-4 px-2 cursor-pointer hover:underline hover:text-blue-600" colSpan={1} onClick={() => handleShowOrderDetail(item.id, item.status)}>Xem chi tiết</td>
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
        </div>
    )
}

export default AllOrder;