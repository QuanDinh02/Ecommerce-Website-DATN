
import Button from "@/components/Button";
import CopyClipboard from "@/components/CopyClipboard";
import Modal from "@/components/Modal";
import { getProducstAnnouncement } from "@/services/sellerService";
import { CurrencyFormatVND } from "@/utils/numberFormat";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { ThreeDots } from "react-loader-spinner";
import ReactPaginate from "react-paginate";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useImmer } from "use-immer";

const PRODUCT_TYPE = [
    {
        id: 1,
        name: "Sản phẩm hết hàng",
        selected: true
    },
    {
        id: 2,
        name: "Sản phẩm sắp hết hàng",
        selected: false
    }
];

const tableWillOutOfStockHeaders = [
    {
        name: "Mã sản phẩm",
        size: 1
    },
    {
        name: "Tên sản phẩm",
        size: 2
    },
    {
        name: "Tồn kho",
        size: 1
    },
    {
        name: "Giá bán",
        size: 1
    },
    {
        name: "Cập nhật tồn kho",
        size: 1
    }
];

interface IProduct {
    id: number
    name: string
    quantity: number
    price: number
}

interface IData {
    page: number
    page_total: number
    product_list: IProduct[]
    total_items: number
}

interface IUpdateProductInventory {
    id: number
    quantity: number
}

const SellerProductAnnouncement = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [search, setSearch] = React.useState<string>("");

    const [outOfOrderProductData, setOutOfOrderProductData] = React.useState<IProduct[]>([]);

    const [dataLoading, setDataLoading] = React.useState<boolean>(true);
    const [showUpdateModal, setShowUpdateModal] = React.useState<boolean>(false);

    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const [showItem, setShowItem] = React.useState<number>(10);
    const [totalItems, setTotalItems] = React.useState<number>(0);

    const [updateProductInventory, setUpdateProductInventory] = useImmer<IUpdateProductInventory>({
        id: 0,
        quantity: 0
    });

    const [productCurrentType, setProductCurrentType] = React.useState<number>(1);
    const [productType, setProductType] = useImmer(PRODUCT_TYPE);

    const handlePageClick = (event) => {
        setDataLoading(true);
        setCurrentPage(+event.selected + 1);
    }

    const handleCloseUpdateModal = (active: boolean) => {
        // setUpdateCategory({
        //     id: 0,
        //     title: "",
        //     quantity: 0
        // });
        setShowUpdateModal(active)
    }

    const handleShowUpdateModal = (value: any) => {
        setUpdateProductInventory(draft => {
            draft.id = value.id;
            draft.quantity = value.quantity;
        });
        setShowUpdateModal(true);
    }

    const handleOnChangeEdit = (value: any) => {
        if (!isNaN(value) && value > 0) {
            setUpdateProductInventory(draft => {
                draft.quantity = value;
            })
        } else {
            return;
        }
    }

    const handleKeyPress = (event) => {
        // if (event.key === 'Enter') {
        //     if (search === "") {
        //         if (currentPage === 1) {
        //             fetchProductsPagination(showItem, 1, productCategory.id, productSubCategory.id, sort.id);
        //             return;
        //         } else {
        //             setCurrentPage(1);
        //             return;
        //         }
        //     }

        //     if (!isNaN(+search)) {
        //         handleSearchProduct();
        //     } else {
        //         setProductList([]);
        //     }
        // }
    }

    const hanldeSetProductType = (id: number) => {
        navigate({
            pathname: "/seller-info/product/announce",
            search: `?type=${id}`,

        }, {
            replace: true
        });
    }

    const fetchProductsPagination = async (limit: number, page: number, type: number) => {
        let response: IData = await getProducstAnnouncement(limit, page, type);
        if (response) {
            setOutOfOrderProductData(response.product_list);
            setTotalPages(response.page_total);
            setTotalItems(response.total_items);
            setTimeout(() => {
                setDataLoading(false);
            }, 500);
        }
    }

    React.useEffect(() => {

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        let product_type = searchParams.get('type');

        let activeProductType: number = product_type ? +product_type : 1;

        if (activeProductType !== productCurrentType) {
            setProductCurrentType(activeProductType);
            setProductType(draft => {
                draft.forEach(item => {
                    if (item.id === activeProductType) {
                        item.selected = true;
                    } else {
                        item.selected = false;
                    }
                });
            });
            setDataLoading(true);
            setCurrentPage(1);
            fetchProductsPagination(showItem, 1, activeProductType);
        } else {
            setDataLoading(true);
            fetchProductsPagination(showItem, currentPage, productCurrentType);
        }

    }, [searchParams.get('type'), currentPage]);

    React.useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        setTimeout(() => {
            setDataLoading(false);
        }, 800);
    }, []);

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <div className="text-xl">Thông báo</div>
                <div className="flex items-center gap-x-4">
                    <div className="w-64 border border-gray-300 py-2 px-3 flex items-center gap-x-2 rounded">
                        <IoSearch className="text-gray-500 w-4 h-4" />
                        <input
                            value={search}
                            type="text"
                            placeholder="Tìm theo mã sản phẩm"
                            className="outline-none w-full"
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={(event) => handleKeyPress(event)}
                        />
                    </div>
                </div>
            </div>
            <div className="tab-list w-full mb-2">
                <div className="flex mb-5 border-b border-gray-200 w-full">
                    {
                        productType && productType.length > 0 &&
                        productType.map((item, index) => {
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
                                    onClick={() => hanldeSetProductType(item.id)}
                                >
                                    <div>{item.name}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {
                dataLoading ?
                    <div className="flex items-center justify-center w-full">
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
                    <table className="table-fixed w-full border">
                        <thead>
                            <tr className='bg-gray-100 border-b-10 border-white'>
                                {tableWillOutOfStockHeaders && tableWillOutOfStockHeaders.length > 0 &&
                                    tableWillOutOfStockHeaders.map((item, index) => {
                                        if (index === 2) {
                                            return (
                                                <th key={`header-${index}`} className="text-center py-3 px-3 font-medium" colSpan={item.size}>{item.name}</th>
                                            )
                                        }
                                        if (index === 4) {
                                            return (
                                                <th key={`header-${index}`} className="text-center py-3 px-3 font-medium" colSpan={item.size}>{item.name}</th>
                                            )
                                        }
                                        return (
                                            <th key={`header-${index}`} className="text-left py-3 px-3 font-medium" colSpan={item.size}>{item.name}</th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (outOfOrderProductData && outOfOrderProductData.length > 0) ?
                                    <>

                                        {outOfOrderProductData.map((item, index) => {
                                            return (
                                                <tr className="border-b border-gray-200 text-sm hover:bg-gray-100" key={`product-will-out-of-stock-${index}`}>
                                                    <td className="py-4 px-2" colSpan={1}>
                                                        <span className='flex items-center gap-x-1 cursor-pointer w-fit'>{item.id}<CopyClipboard value={item.id} /></span>
                                                    </td>
                                                    <td className="py-4 px-2" colSpan={2}><span className='line-clamp-1'>{item.name}</span></td>
                                                    <td className="py-4 px-2 text-center font-medium" colSpan={1}>
                                                        <span className={item.quantity === 0 ? "text-red-500" : "text-orange-500"}>{item.quantity}</span>
                                                    </td>
                                                    <td className="py-4 px-2 font-semibold" colSpan={1}>{CurrencyFormatVND(item.price)}</td>
                                                    <td className="py-4 px-2 text-center cursor-pointer hover:underline hover:text-blue-500" colSpan={1}>
                                                        <div onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleShowUpdateModal(item);
                                                        }}>Cập nhật</div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        {
                                            totalPages > 1 &&
                                            <tr>
                                                <td colSpan={5}>
                                                    {
                                                        <div className='pagination-review-container my-4 flex justify-center'>
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
                                        }
                                    </>
                                    :
                                    <tr>
                                        <td className="text-center py-3" colSpan={5}>
                                            <div className="w-full text-gray-500 text-center py-2">Không có dữ liệu !</div>
                                        </td>
                                    </tr>
                            }
                        </tbody>
                    </table>
            }
            <Modal show={showUpdateModal} setShow={handleCloseUpdateModal} size="form-box">
                <div className="delete-confirmation-box w-full h-full relative flex flex-col justify-between">
                    <div className="text-xl">Cập nhật tồn kho của sản phẩm <span className="font-medium">#{updateProductInventory.id}</span></div>
                    <div className="mt-6 mb-12">
                        <div className="font-medium mb-1">Số lượng</div>
                        <input type="text" className="form_input" value={updateProductInventory.quantity} onChange={(e) => handleOnChangeEdit((e.target.value))} />
                    </div>
                    <div className="flex items-center justify-end gap-x-2 transition-all">
                        <Button styles="rounded px-8 py-2 text-black cursor-pointer duration-200 border border-gray-300 hover:bg-gray-100" >Hủy</Button>
                        <Button styles="rounded px-8 py-2 bg-[#FCB800] font-medium cursor-pointer duration-200">Lưu</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default SellerProductAnnouncement;