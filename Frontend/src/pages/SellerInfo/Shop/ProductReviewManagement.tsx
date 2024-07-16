import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { useImmer } from "use-immer";
import { FaCheck } from "react-icons/fa6";
import { IoBuildOutline, IoSearch } from "react-icons/io5";
import DatePicker from "react-datepicker";
import Button from "@/components/Button";
import CopyClipboard from "@/components/CopyClipboard";
import Rating from "@/components/Rating";
import { getProductReviewByOrder, getSearchProductReviewByOrder, responseCustomerRating } from "@/services/sellerService";
import LoadImageS3 from "@/components/LoadImageS3";
import ReactPaginate from "react-paginate";
import { Dropdown } from "@/components/Dropdown";
import { dateFormat } from "@/utils/dateFormat";
import { errorToast1, successToast1 } from "@/components/Toast/Toast";
import Modal from "@/components/Modal";

const SHOW_ITEMS = [10, 25, 50];

interface IShopResonse {
    id: number
    comment: string
    parentID: number
}

interface IProductReview {
    id: number
    rating: number
    comment: string
}

interface ICustomerInfo {
    id: number
    name: string
    mobile: string
}

interface IProduct {
    id: number
    name: string
    image: string
    review: IProductReview
    shop_response: IShopResonse
}

interface IOrder {
    id: number
    orderDate: Date
    customer_info: ICustomerInfo
    product_list: IProduct[]
}

interface IData {
    page: number
    page_total: number
    order_list: IOrder[]
    total_items: number
}

interface IEditResponse {
    order_id: number
    customer_name: string
    review: IProductReview
    shop_response: IShopResonse
}

const TEXT_DESCRIPTION_MAX = 500;

const ProductReviewByOrder = () => {

    const [search, setSearch] = React.useState<string>("");
    const [dateRange, setDateRange] = React.useState([null, null]);
    const [startDate, endDate] = dateRange;

    const [showInfoBox, setShowInfoBox] = React.useState<boolean>(false);

    const [dataLoading, setDataLoading] = React.useState<boolean>(true);
    const [showItem, setShowItem] = React.useState<number>(SHOW_ITEMS[0]);

    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(20);
    const [orderList, setOrderList] = useImmer<IOrder[]>([]);

    const [editResponse, setEditResponse] = useImmer<IEditResponse>({
        order_id: 0,
        customer_name: "",
        review: {
            id: 0,
            rating: 0,
            comment: ""
        },
        shop_response: {
            id: 0,
            comment: "",
            parentID: 0
        }
    });

    const handeHideInfoBox = () => {
        setEditResponse({
            order_id: 0,
            customer_name: "",
            review: {
                id: 0,
                rating: 0,
                comment: ""
            },
            shop_response: {
                id: 0,
                comment: "",
                parentID: 0
            }
        });

        setShowInfoBox(false);
    }

    const [orderReviewStatusTabs, setOrderReviewStatusTabs] = useImmer([
        {
            id: 1,
            name: "Tất cả",
            selected: true,
            quantity: 0
        },
        {
            id: 2,
            name: "Chưa trả lời",
            selected: false,
            quantity: 0
        },
        {
            id: 3,
            name: "Đã trả lời",
            selected: false,
            quantity: 0
        }
    ]);

    const handleSearch = async (order_id: number) => {
        let response: any = await getSearchProductReviewByOrder(order_id);
        if (response) {
            console.log(response);
            setOrderList(response.order_list);
            setTimeout(() => {
                setDataLoading(false);
            }, 1000);
        }
    }

    const handleKeyPress = async (event) => {

        if (event.key === 'Enter') {
            if (search === "") {
                fetchAllOrder(showItem, currentPage);
            }
            else {
                setDataLoading(true);
                handleSearch(+search);
            }
        }
    }

    const hanldeSetActiveOrderTab = (id: number) => {
        setOrderReviewStatusTabs(draft => {
            draft.forEach(item => {
                if (item.id === id) {
                    item.selected = true;
                } else {
                    item.selected = false;
                }
            });
        });
    }

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1);
    }

    const fetchAllOrder = async (limit: number, page: number) => {
        let response: IData = await getProductReviewByOrder(limit, page, startDate, endDate);
        if (response) {
            setOrderList(response.order_list);
            setTotalPages(response.page_total);
            setDataLoading(false);
        }
    }

    const handleFilterOrderDate = () => {
        if (startDate === null && endDate === null) {
            fetchAllOrder(showItem, 1);
            return;
        }

        if (startDate === null || endDate === null) {
            errorToast1("Khoảng thời gian không hợp lệ");
            return;
        }

        fetchAllOrder(showItem, 1);
    }

    const hanldeResetFilter = () => {
        setDateRange([null, null]);
        fetchAllOrder(showItem, currentPage);
    }

    const handleShowResponseBox = (order_id: number, customer_name: string, review: IProductReview, shop_response: IShopResonse) => {
        setEditResponse(draft => {
            draft.order_id = order_id;
            draft.customer_name = customer_name;
            draft.review = review;
            draft.shop_response = shop_response;
        })
        setShowInfoBox(true);
    }

    const handleOnChangeShopComment = (value: any) => {

        if (value.length > TEXT_DESCRIPTION_MAX) {
            return;
        }

        setEditResponse(draft => {
            draft.shop_response.comment = value;
        });
    }

    const handleResponseCustomerRating = async () => {

        if (editResponse.shop_response.comment === "") {
            errorToast1("Vui lòng nhập phản hồi của bạn");
            return;
        }

        let result = await responseCustomerRating(editResponse.shop_response, editResponse.review);

        if (result) {
            if (result.EC === 0) {
                successToast1(result.EM);

                let response: IShopResonse = result.DT;

                setOrderList(draft => {
                    draft.forEach(order => {
                        if(order.id === editResponse.order_id) {
                            order.product_list.forEach(product => {
                                if(product.review.id === response.parentID) {
                                    product.shop_response.id = response.id;
                                    product.shop_response.comment = response.comment;
                                    product.shop_response.parentID = response.parentID;
                                }
                            })
                        }
                    })
                });

                handeHideInfoBox();

            } else {
                errorToast1(result.EM);
                return;
            }
        }
    }

    React.useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setDataLoading(true);
        fetchAllOrder(showItem, currentPage);

    }, [currentPage, showItem]);

    return (
        <>
            <div className="order-review-management mt-8">
                {/* <div className="order-review-status flex items-center gap-x-4 mb-6">
                    <div className="text-gray-500">Trạng thái</div>
                    <div className="flex items-center gap-x-2">
                        {
                            orderReviewStatusTabs && orderReviewStatusTabs.length > 0 &&
                            orderReviewStatusTabs.map((item) => {
                                if (item.selected) {
                                    return (
                                        <div className="text-sm px-5 py-1 border border-[#FCB800] text-[#FCB800] font-medium cursor-pointer rounded-full" key={`order-review-status-${item.id}`}>{item.name} <span className="text-[#FCB800] font-medium">({item.quantity})</span></div>
                                    )
                                }
                                return (
                                    <div
                                        className="text-sm px-5 py-1 border border-gray-300 rounded-full cursor-pointer font-medium"
                                        key={`order-review-status-${item.id}`}
                                        onClick={() => hanldeSetActiveOrderTab(item.id)}
                                    >{item.name} <span className="text-[#FCB800]">({item.quantity})</span></div>
                                )
                            })
                        }
                    </div>
                </div> */}
                <div className="flex items-center justify-between">
                    <div className="search-bar flex items-center gap-x-4">
                        <div className="w-72 h-10 bg-white py-2 px-3 flex items-center gap-x-3 border border-gray-200 rounded">
                            <IoSearch className="text-gray-500 w-5 h-5" />
                            <input
                                value={search}
                                type="text"
                                placeholder="Tìm theo mã đơn hàng"
                                className="outline-none w-full text-sm rounded"
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(event) => handleKeyPress(event)}
                            />
                        </div>
                        <div className="flex items-center gap-x-4">
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
                            <Button styles="bg-[#FCB800] px-4 py-1.5 rounded hover:opacity-80 cursor-pointer flex items-center gap-x-2 font-medium" OnClick={() => handleFilterOrderDate()}>Apply</Button>
                            <Button styles="border border-gray-300 px-4 py-1.5 rounded hover:bg-gray-100 cursor-pointer flex items-center gap-x-2 font-medium" OnClick={() => hanldeResetFilter()}>Reset</Button>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-3">
                        <div>Hiển thị</div>
                        <Dropdown data={SHOW_ITEMS} value={showItem} setValue={setShowItem} style={"border border-gray-200 h-10 w-20"} />
                        <div>đơn hàng</div>
                    </div>
                </div>
            </div>
            <div className="mt-8 mb-4">
                <div className="bg-gray-100 w-full flex items-center text-gray-500 py-2 rounded">
                    <div className="w-1/4 text-center">Thông tin Sản phẩm</div>
                    <div className="w-1/2 text-center">Đánh giá của Người mua</div>
                    <div className="w-1/4 text-center">Action</div>
                </div>
            </div>
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
                    <>
                        {
                            (orderList && orderList.length > 0) ?
                                <>
                                    <div className="order-list">
                                        {
                                            orderList.map((order) => {
                                                return (
                                                    <div className="order-info px-5 py-3 border border-gray-200 rounded mb-4" key={`order-${order.id}`}>
                                                        <div className="order-info__header text-sm text-gray-600 flex items-center gap-x-4 mb-2">
                                                            <div className="pr-3 border-r-2 border-gray-200 w-fit">
                                                                <span>{order.customer_info.name} - </span>
                                                                <span>{order.customer_info.mobile} - </span>
                                                                <span>{dateFormat(`${order.orderDate}`)}</span>
                                                            </div>
                                                            <div className="flex items-center gap-x-2">
                                                                <span>ID đơn hàng</span>
                                                                <div className="flex items-center gap-x-1">
                                                                    <span className="underline text-black">{order.id}</span>
                                                                    <span className="cursor-pointer"><CopyClipboard value={order.id} /></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="order-info__detail">
                                                            {
                                                                order.product_list && order.product_list.length > 0 &&
                                                                order.product_list.map((order_item) => {
                                                                    return (
                                                                        <div className="order-item-info w-full flex pb-3 mt-2 mb-3" key={`order-item-${order.id}-${order_item.id}`}>
                                                                            <div className="w-1/4 border-r border-gray-300 py-4 pr-4">
                                                                                <div className="w-full flex gap-x-2">
                                                                                    <LoadImageS3 img_style="w-14 h-14 shrink-0" img_url={order_item.image} />
                                                                                    <div className="w-full text-sm font-medium">
                                                                                        <span className="line-clamp-3">{order_item.name}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="w-2/4 border-r border-gray-300 py-4 px-4">
                                                                                {
                                                                                    order_item.review.id !== 0 ?
                                                                                        <>
                                                                                            <div className="mb-1"><Rating rating={order_item.review.rating} key={`order-item-rating-${order_item.id}`} /></div>
                                                                                            <div>{order_item.review.comment}</div>
                                                                                        </>
                                                                                        :
                                                                                        <>
                                                                                            <div className="mb-1"><Rating rating={0} key={`order-item-no-rating-${order_item.id}`} /></div>
                                                                                            <div>Chưa có đánh giá sản phẩm</div>
                                                                                        </>
                                                                                }
                                                                            </div>
                                                                            <div className="w-1/4 py-4 flex items-center justify-center px-4">
                                                                                {
                                                                                    order_item.shop_response.id === 0 ?
                                                                                        <>
                                                                                            {
                                                                                                order_item.review.id !== 0 ?
                                                                                                    <Button styles="font-medium px-4 py-1 border border-gray-300 rounded hover:bg-gray-100" OnClick={() => handleShowResponseBox(order.id, order.customer_info.name, order_item.review, order_item.shop_response)}>Trả lời</Button>
                                                                                                    :
                                                                                                    <Button styles="font-medium px-4 py-1 border border-gray-300 rounded cursor-not-allowed bg-gray-100 text-gray-500">Trả lời</Button>
                                                                                            }
                                                                                        </>
                                                                                        :
                                                                                        <Button styles="font-medium px-4 py-1 border border-gray-300 rounded hover:bg-gray-100" OnClick={() => handleShowResponseBox(order.id, order.customer_info.name, order_item.review, order_item.shop_response)}>Sửa</Button>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
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
                                </>
                                :
                                <div className="w-full text-gray-500 text-center text-lg font-medium py-2">Không có dữ liệu !</div>
                        }
                    </>
            }
            <Modal show={showInfoBox} setShow={setShowInfoBox} size="form-box" close_icon={true}>
                <div className="text-xl mb-4">Phản hồi</div>
                <div className="flex items-center gap-x-2 mb-2">
                    <div>{editResponse.customer_name}</div>
                    <Rating rating={editResponse.review.rating} key={`edit-order-item-response-${editResponse.review.id}`} />
                </div>
                <div className="mb-2">{editResponse.review.comment}</div>
                <div className='w-full mb-4'>
                    <textarea
                        value={editResponse.shop_response.comment}
                        onChange={(e) => handleOnChangeShopComment(e.target.value)}
                        className="rounded-[4px] px-4 py-3 text-sm border border-gray-300 w-full focus:border-black h-40 outline-none"
                        placeholder="Nhập mô tả shop"
                    />
                    <div className="text-end">
                        <span className="text-gray-400">{editResponse.shop_response.comment.length}/{TEXT_DESCRIPTION_MAX}</span>
                    </div>
                </div>
                <div className="flex items-center justify-end gap-x-2">
                    <Button styles="rounded-[4px] px-6 py-1.5 border border-gray-200 text-black hover:bg-gray-200 cursor-pointer duration-200" OnClick={() => handeHideInfoBox()}>Cancel</Button>
                    <Button styles="rounded-[4px] px-6 py-1.5 bg-[#FCB800] border border-[#FCB800] text-black hover:opacity-80 cursor-pointer duration-200" OnClick={() => handleResponseCustomerRating()}>Submit</Button>
                </div>
            </Modal>
        </>
    )
}

const ProductReviewByProduct = () => {

    // const [search, setSearch] = React.useState<string>("");
    // const [dateRange, setDateRange] = React.useState([null, null]);
    // const [startDate, endDate] = dateRange;

    // const [productRatingTabs, setProductRatingTabs] = useImmer([
    //     {
    //         id: 1,
    //         name: "Tất cả",
    //         selected: true,
    //         quantity: 0
    //     },
    //     {
    //         id: 2,
    //         name: "5 sao",
    //         selected: false,
    //         quantity: 0
    //     },
    //     {
    //         id: 3,
    //         name: "4 sao",
    //         selected: false,
    //         quantity: 0
    //     },
    //     {
    //         id: 4,
    //         name: "3 sao",
    //         selected: false,
    //         quantity: 0
    //     },
    //     {
    //         id: 5,
    //         name: "2 sao",
    //         selected: false,
    //         quantity: 0
    //     },
    //     {
    //         id: 6,
    //         name: "1 sao",
    //         selected: false,
    //         quantity: 0
    //     },
    //     {
    //         id: 7,
    //         name: "Chưa đánh giá",
    //         selected: false,
    //         quantity: 0
    //     },
    // ]);

    // const handleKeyPress = async (event) => {

    //     if (event.key === 'Enter') {
    //         if (search === "") {

    //         }
    //         else {

    //         }
    //     }
    // }

    // const hanldeSetActiveRatingTab = (id: number) => {
    //     setProductRatingTabs(draft => {
    //         draft.forEach(item => {
    //             if (item.id === id) {
    //                 item.selected = true;
    //             } else {
    //                 item.selected = false;
    //             }
    //         });
    //     });
    // }

    return (
        <>
            {/* <div className="product-review-management mt-8">
                <div className="product-rating-status flex items-center gap-x-2 mb-6">
                    <div className="text-gray-500">Số sao đánh giá</div>
                    <div className="flex items-center gap-x-2">
                        {
                            productRatingTabs && productRatingTabs.length > 0 &&
                            productRatingTabs.map((item) => {
                                if (item.selected) {
                                    return (
                                        <div
                                            className="text-sm px-2 py-1 cursor-pointer flex items-center gap-x-2"
                                            key={`product-rating-tab-${item.id}`}
                                            onClick={() => hanldeSetActiveRatingTab(item.id)}
                                        >
                                            <div className="w-5 h-5 rounded border border-[#FCB800] flex items-center justify-center bg-[#FCB800]"><FaCheck className="text-white" /></div>
                                            <span>{item.name} ( {item.quantity} )</span>
                                        </div>
                                    )
                                }
                                return (
                                    <div
                                        className="text-sm px-2 py-1 cursor-pointer flex items-center gap-x-2"
                                        key={`product-rating-tab-${item.id}`}
                                        onClick={() => hanldeSetActiveRatingTab(item.id)}
                                    >
                                        <div className="w-5 h-5 rounded border border-gray-400"></div>
                                        <span>{item.name} ( {item.quantity} )</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="search-bar flex items-center gap-x-4">
                    <div className="w-72 h-10 bg-white py-2 px-3 flex items-center gap-x-3 border border-gray-200 rounded">
                        <IoSearch className="text-gray-500 w-5 h-5" />
                        <input
                            value={search}
                            type="text"
                            placeholder="Tìm theo mã sản phẩm"
                            className="outline-none w-full text-sm rounded"
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(event) => handleKeyPress(event)}
                        />
                    </div>
                    <div className="flex items-center gap-x-4">
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
                        <Button styles="bg-[#FCB800] px-4 py-1.5 rounded hover:opacity-80 cursor-pointer flex items-center gap-x-2 font-medium">Apply</Button>
                        <Button styles="border border-gray-300 px-4 py-1.5 rounded hover:bg-gray-100 cursor-pointer flex items-center gap-x-2 font-medium">Reset</Button>
                    </div>
                </div>
            </div>
            <div className="mt-8 mb-4">
                <div className="bg-gray-100 w-full flex items-center text-gray-500 py-2 rounded">
                    <div className="w-1/4 text-center">Thông tin Sản phẩm</div>
                    <div className="w-1/2 text-center">Đánh giá của Người mua</div>
                    <div className="w-1/4 text-center">Action</div>
                </div>
            </div>
            <div className="product-list">
                <div className="order-info border border-gray-200 px-5 py-3 rounded">
                    <div className="order-info__header text-sm text-gray-600 flex items-center gap-x-4 mb-2">
                        <div className="pr-3 border-r-2 border-gray-200 w-fit">customer123</div>
                        <div className="flex items-center gap-x-2">
                            <span>ID đơn hàng</span>
                            <div className="flex items-center gap-x-1">
                                <span className="underline text-black">1231231CUKFH</span>
                                <span className="cursor-pointer"><CopyClipboard value={1231231} /></span>
                            </div>
                        </div>
                    </div>
                    <div className="order-info__detail">
                        <div className="order-item-info w-full border-b border-gray-300 flex pb-3 mb-3">
                            <div className="w-1/4 border-r border-gray-300 py-4 pr-4">
                                <div className="w-full flex gap-x-2">
                                    <div className="w-14 h-14 bg-gray-200 shrink-0"></div>
                                    <div className="w-full text-sm font-medium">
                                        <span className="line-clamp-3">Điện thoại Samsung Galaxy A05s (4GB/128GB) - Đã kích hoạt bảo hành điện tử - Hàng chính hãng</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-2/4 border-r border-gray-300 py-4 px-4">
                                <div className="mb-1"><Rating rating={5} /></div>
                                <div>Sản phẩm hay tuyệt đẹp chất lượng tốt nhất ko có vấn đề gì hết!!</div>
                            </div>
                            <div className="w-1/4 py-4 flex items-center justify-center px-4"><Button styles="font-medium px-4 py-1 border border-gray-300 rounded hover:bg-gray-100">Trả lời</Button></div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="customer-notification-container w-full py-10 px-10 bg-white h-full">
                <div className="w-full h-full flex flex-col items-center justify-center gap-y-2">
                    <div><IoBuildOutline className="w-12 h-12" /></div>
                    <div className="text-xl font-medium">THIS FEATURE UNDER MAINTENANCE</div>
                    <div className="text-center">
                        <div className="text-sm text-gray-500">Our website is currenly undergoing scheduled maintenance</div>
                        <div className="text-sm text-gray-500">We should be back shortly. Thank you for your patience</div>
                    </div>
                </div>
            </div>
        </>
    )
}

const ProductReviewManagement = () => {

    const [dataLoading, setDataLoading] = React.useState<boolean>(true);

    const [tabs, setTabs] = useImmer([
        {
            id: 1,
            name: "Đơn hàng",
            selected: true
        },
        {
            id: 2,
            name: "Sản phẩm",
            selected: false
        }
    ]);

    const hanldeSetActiveTab = (id: number) => {
        setTabs(draft => {
            draft.forEach(item => {
                if (item.id === id) {
                    item.selected = true;
                } else {
                    item.selected = false;
                }
            });
        });
    }

    React.useEffect(() => {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }

        setTimeout(() => {
            setDataLoading(false);
        }, 500);

    }, []);

    return (
        <div className="product-review-management">
            <div className="product-review-management__title pb-5">
                <div className="title text-xl">Quản lý Đánh Giá</div>
            </div>
            <div className="product-review-management__main">
                {
                    dataLoading ?
                        <div className="flex items-center justify-center w-full h-screen">
                            <ThreeDots
                                height="80"
                                width="80"
                                color="#FCB800"
                                ariaLabel="three-dots-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass="flex items-center justify-center tail-spin"
                                visible={true}
                            />
                        </div>
                        :
                        <div className="main w-full">
                            <div className="flex items-center border-b border-gray-200">
                                {
                                    tabs && tabs.length > 0 &&
                                    tabs.map((item) => {
                                        if (item.selected) {
                                            return (
                                                <div className="px-5 py-2 border-b-2 border-[#FCB800] text-[#FCB800] font-medium cursor-pointer" key={`detail-${item.id}`}>{item.name}</div>
                                            )
                                        }
                                        return (
                                            <div
                                                className="px-5 py-2 border-b-2 border-white cursor-pointer"
                                                key={`detail-${item.id}`}
                                                onClick={() => hanldeSetActiveTab(item.id)}
                                            >{item.name}</div>
                                        )
                                    })
                                }
                            </div>
                            {
                                tabs[0].selected &&
                                <ProductReviewByOrder />
                            }
                            {
                                tabs[1].selected &&
                                <ProductReviewByProduct />
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export default ProductReviewManagement;