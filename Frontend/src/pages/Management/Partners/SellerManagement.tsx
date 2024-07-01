import Button from "@/components/Button"
import CopyClipboard from "@/components/CopyClipboard"
import { Dropdown } from "@/components/Dropdown"
import { getSellerList, getSellerSearch } from "@/services/adminService"
import React from "react"
import { IoSearch } from "react-icons/io5"
import { ThreeDots } from "react-loader-spinner"
import ReactPaginate from "react-paginate"
import { FaPlus } from "react-icons/fa6";

interface IShop {
    id: number
    name: string
    shopName: string
    mobile: string
    email: string
}

const customerTableHeaders = [
    {
        name: "Mã Shop",
        size: 1,
        style: "",
    },
    {
        name: "Người bán",
        size: 1,
        style: "",
    },
    {
        name: "Tên shop",
        size: 1,
        style: "",
    },
    {
        name: "Số điện thoại",
        size: 1,
        style: "",
    },
    {
        name: "Email",
        size: 1,
        style: "",
    },
    {
        name: "",
        size: 2,
        style: "",
    },
];

const SHOW_ITEMS = [10, 25, 50];

const SellerManagement = () => {

    const [search, setSearch] = React.useState<string>("");

    const [sellerList, setSellerList] = React.useState<IShop[]>([]);

    const [dataLoading, setDataLoading] = React.useState<boolean>(true);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalItems, setTotalItems] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>(20);

    const [showItem, setShowItem] = React.useState<number>(10);

    const fetchSellerList = async (limit: number, page: number) => {
        let result = await getSellerList(limit, page);
        if (result) {
            setSellerList(result.seller_list);
            setTotalPages(result.page_total);
            setTotalItems(result.total_items);

            setTimeout(() => {
                setDataLoading(false);
            }, 500);
        }
    }

    const handleSearchSeller = async () => {
        let response: any = await getSellerSearch(search);
        if (response) {
            setSellerList(response.seller_list);
            setTimeout(() => {
                setDataLoading(false);
            }, 500);
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (search === "") {
                setCurrentPage(1);
                fetchSellerList(showItem, 1);
                return;
            }
            else {
                handleSearchSeller();
            }

        }
    }

    const handlePageClick = (event) => {
        setDataLoading(true);
        setCurrentPage(+event.selected + 1);
    }

    React.useEffect(() => {

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setDataLoading(true);
        fetchSellerList(showItem, currentPage);

    }, [currentPage, showItem]);

    return (
        <div className="py-4 px-5 bg-white">
            <div className="flex items-center justify-between mb-6">
                <div className="text-xl w-1/3">Người Bán</div>
                <div className="w-1/3 h-10 bg-white py-2 px-3 flex items-center gap-x-3 border border-gray-300 rounded">
                    <IoSearch className="text-gray-500 w-5 h-5" />
                    <input
                        value={search}
                        type="text"
                        placeholder="Tìm theo tên, số điện thoại shop"
                        className="outline-none w-full text-sm rounded"
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyPress={(event) => handleKeyPress(event)}
                    />
                </div>
            </div>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-x-3">
                    <div>Hiển thị</div>
                    <Dropdown data={SHOW_ITEMS} value={showItem} setValue={setShowItem} style={"border border-gray-200 h-10 w-20"} />
                    <div>người bán</div>
                </div>
                <div>Tổng <span className="text-red-500 font-medium">{totalItems}</span> người bán </div>
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
                                    {customerTableHeaders && customerTableHeaders.length > 0 &&
                                        customerTableHeaders.map((item, index) => {
                                            return (
                                                <th key={`header-${index}`} className={`text-left py-3 px-3 font-medium ${item.style}`} colSpan={item.size}>{item.name}</th>
                                            )
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (sellerList && sellerList.length > 0) ?
                                        <>
                                            {sellerList.map((item, index) => {
                                                return (
                                                    <tr className="border-b border-gray-200 text-sm hover:bg-gray-100" key={`product-${index}`}>
                                                        <td className="py-4 px-3 " colSpan={1}>
                                                            <span className="flex items-center gap-x-1">
                                                                {item.id} <span className="cursor-pointer"><CopyClipboard value={item.id} /></span>
                                                            </span>
                                                        </td>
                                                        <td className="py-4 px-3" colSpan={1}>
                                                            <span className="line-clamp-2">{item.name}</span>
                                                        </td>
                                                        <td className="py-4 px-3" colSpan={1}>
                                                            <span className="line-clamp-2">{item.shopName}</span>
                                                        </td>
                                                        <td className="py-4 px-3" colSpan={1}>
                                                            <span>{item.mobile}</span>
                                                        </td>
                                                        <td className="py-4 px-3" colSpan={1}>
                                                            <span>{item.email}</span>
                                                        </td>
                                                        <td className="py-4 px-3 text-center" colSpan={2}>
                                                            <span className="cursor-pointer hover:underline hover:text-blue-500">Xem chi tiết</span>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                            <tr>
                                                <td colSpan={7}>
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
                                            <td className="text-center py-3" colSpan={7}>
                                                <div className="w-full text-gray-500 text-center py-2">Không có dữ liệu !</div>
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                }
            </div>
        </div>
    )
}

export default SellerManagement;