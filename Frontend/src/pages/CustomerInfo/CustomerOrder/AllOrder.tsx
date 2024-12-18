import { CurrencyFormat } from "@/utils/numberFormat";
import Button from "@/components/Button";
import React from "react";
import { IAccount } from "@/pages/Product/ProductDetailPage_types";
import { RootState } from "@/redux/reducer/rootReducer";
import { useSelector } from "react-redux";
import { customerCancelOrder, getAllOrderByCustomer, getSearchCustomerOrder } from "@/services/orderServices";
import { IOrder, ORDER_STATUS } from "./OrderType";
import { dateTimeFormat } from "@/utils/dateFormat";
import { ThreeDots } from "react-loader-spinner";
import LoadImageS3 from "@/components/LoadImageS3";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { errorToast1, successToast1 } from "@/components/Toast/Toast";
import Modal from "@/components/Modal";
import { useImmer } from "use-immer";
import './CustomerOrder.scss';
import LinkNewTabProductDetail from "@/components/LinkNewTab";

const AllOrder = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [orderList, setOrderList] = React.useState<IOrder[]>([]);
    const [dataLoading, setDataLoading] = React.useState<boolean>(true);
    const [showCancelBox, setShowCancelBox] = React.useState<boolean>(false);

    const [search, setSearch] = React.useState<string>("");
    const [cancelOrder, setCancelOrder] = React.useState<number>(0);

    const [orderStatus, setOrderStatus] = useImmer(ORDER_STATUS);
    const [orderCurrentStatus, setOrderCurrentStatus] = React.useState<number>(0);

    const account: IAccount = useSelector<RootState, IAccount>(state => state.user.account);
    const isAuthenticated = useSelector<RootState, boolean>(state => state.user.isAuthenticated);

    const hanldeSetOrderStatus = (id: number) => {

        navigate({
            pathname: "/customer-info/order/status",
            search: `?status=${id}`,
        });
    }

    const fetchOrder = async (customer_id: number, status: number) => {
        let response: any = await getAllOrderByCustomer(customer_id, orderCurrentStatus);
        if (response && response.EC === 0) {
            setOrderList(response.DT);
            setTimeout(() => {
                setDataLoading(false);
            }, 300);
        }
    }

    const searchOrderByOrderID = async (order_id: number) => {
        let response: any = await getSearchCustomerOrder(order_id);
        if (response && response.EC === 0) {
            setOrderList(response.DT);
            setTimeout(() => {
                setDataLoading(false);
            }, 1000);
        }
    }

    const handleKeyPress = async (event) => {

        if (event.key === 'Enter') {
            if (search === "") {
                fetchOrder(account.customer_id, orderCurrentStatus);
            }
            else {
                setDataLoading(true);
                searchOrderByOrderID(+search);
            }
        }
    }

    const handleProductDetailNavigation = (product_id: number) => {
        navigate({
            pathname: "/product",
            search: `?id=${product_id}`,
        });
    }

    const handleTrackingOrderDetail = (order_id: number) => {
        navigate({
            pathname: "/customer-info/order/tracking-detail",
            search: `?code=${order_id}`,
        });
    }

    const handleOrderItemRating = (order_id: number) => {
        navigate({
            pathname: "/customer-info/order/rating",
            search: `?code=${order_id}`,
        });
    }

    const handleCancelOrder = async (order_id: number) => {
        if (order_id !== 0) {
            let result = await customerCancelOrder(order_id);
            if (result) {
                if (result.EC === 0) {
                    setShowCancelBox(false);
                    successToast1(result.EM);
                    setDataLoading(true);
                    fetchOrder(account.customer_id, orderCurrentStatus);
                    setTimeout(() => {
                        setDataLoading(false);
                    }, 1000);
                } else {
                    errorToast1(result.EM);
                }
            }
        }
    }

    const handleShowCancelModal = (order_id: number) => {
        setShowCancelBox(true);
        setCancelOrder(order_id);
    }

    React.useEffect(() => {

        let order_status = searchParams.get('status');
        console.log("Check order status: ", order_status);

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
        }

    }, [searchParams.get('status')]);

    React.useEffect(() => {

        setDataLoading(true);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        if (account && isAuthenticated) {
            fetchOrder(account.customer_id, orderCurrentStatus);
        }

    }, [orderCurrentStatus]);

    return (
        <>
            <div className="customer-order-container">
                <div className="tab-list w-full bg-white">
                    <div className="flex w-full overflow-x-auto border-b border-gray-200 pb-2">
                        {
                            orderStatus && orderStatus.length > 0 &&
                            orderStatus.map((item, index) => {
                                if (item.selected) {
                                    return (
                                        <div className="shrink-0 px-8 py-3 border-b-2 border-[#FCB800] text-[#FCB800] font-medium cursor-pointer flex gap-x-1 items-center justify-center" key={`detail-${item.id}`}>
                                            <div>{item.name}</div>
                                        </div>
                                    )
                                }
                                return (
                                    <div
                                        className="shrink-0 px-8 py-3 border-b-2 border-white cursor-pointer flex gap-x-1 items-center justify-center"
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
                <div className="w-full h-10 bg-white py-2 px-3 flex items-center gap-x-3 my-3">
                    <IoSearch className="text-gray-500 w-6 h-6" />
                    <input
                        value={search}
                        type="text"
                        placeholder="Bạn có thể tìm kiếm theo ID đơn hàng..."
                        className="outline-none bg-white w-full"
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(event) => handleKeyPress(event)}
                    />
                </div>
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
                        <>
                            {
                                (orderList && orderList.length > 0) ?
                                    <>
                                        {
                                            orderList.map((item, index) => {
                                                return (
                                                    <div className="order-item bg-white mb-6 p-5 shadow-md rounded" key={`order-item-${item.id}`}>
                                                        <div className="order-item__header flex items-center justify-between border-b border-gray-200 pb-3">
                                                            <div className="info flex items-center gap-x-4">
                                                                <div className="order-item__id flex items-center gap-x-1">
                                                                    <div className="text-gray-600 font-medium">Mã đơn hàng</div>
                                                                    <div className="text-[#FCB800] font-medium">#{item.id}</div>
                                                                </div>
                                                                <div className="order-item__date flex items-center gap-x-2 text-gray-500">
                                                                    <div>-</div>
                                                                    <div>{dateTimeFormat(`${item.orderDate ? item.orderDate : ""}`)}</div>
                                                                </div>
                                                            </div>
                                                            <div className="status font-medium text-lg">
                                                                {
                                                                    item.status.id === 10 ? <span className="text-red-500">Đã hủy</span> : <span className="text-gray-600">{item.status.name}</span>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="order-item__main mt-6 mb-8">
                                                            <div className="flex flex-col gap-y-6">
                                                                {
                                                                    item.order_item_list && item.order_item_list.length > 0 &&
                                                                    item.order_item_list.map((product, product_idx) => {
                                                                        return (
                                                                            <div className="flex gap-x-6" key={`product-item-${item.id}-${product_idx}`} onClick={() => handleProductDetailNavigation(product.product_id)}>
                                                                                {/* <LoadImage img_style="w-24 h-24" product_id={product.product_id} /> */}
                                                                                <LoadImageS3 img_style="w-24 h-24" img_url={product.product_image}/>
                                                                                <div className="flex flex-col gap-y-2">
                                                                                    <div className="opacity-90 line-clamp-1 cursor-pointer hover:underline hover:text-blue-600">
                                                                                        <LinkNewTabProductDetail id={product.product_id} name={product.product_name} />
                                                                                    </div>
                                                                                    <div className="order-item__price flex items-center gap-x-2">
                                                                                        {
                                                                                            product.price === product.product_price ?
                                                                                                <div className="font-medium">{CurrencyFormat(product.price)}</div>
                                                                                                :
                                                                                                <>
                                                                                                    <div className="font-medium">{CurrencyFormat(product.price)}</div>
                                                                                                    <div className="line-through text-gray-400">{CurrencyFormat(product.product_price)}</div>
                                                                                                </>
                                                                                        }
                                                                                    </div>
                                                                                    <div className="text-gray-500">Số lượng: {product.quantity}</div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }

                                                            </div>
                                                        </div>
                                                        <div className="border-t border-gray-200 pt-4">
                                                            <div className="total-price flex items-center gap-x-2 justify-end mb-3">
                                                                <div className="text-gray-600 text-lg">Tổng tiền</div>
                                                                <div className="text-xl">{CurrencyFormat(item.totalPrice)}</div>
                                                            </div>
                                                            <div className="w-full flex justify-end items-center gap-x-4 ">
                                                                {
                                                                    item.status.id === 1 &&
                                                                    <Button styles="px-5 py-2 border border-gray-300 rounded text-gray-600 font-medium cursor-pointer hover:bg-red-500 hover:text-white hover:border-red-500 transition duration-200" OnClick={() => handleShowCancelModal(item.id)}>Hủy đơn hàng</Button>
                                                                }
                                                                {
                                                                    item.status.id === 7 &&
                                                                    <Button styles="px-6 py-2 bg-[#FCB800] font-medium w-fit cursor-pointer opacity-80 hover:opacity-100 rounded" OnClick={() => handleOrderItemRating(item.id)}>Đánh giá</Button>
                                                                }
                                                                <Button styles="px-6 py-2 bg-[#FCB800] font-medium w-fit cursor-pointer opacity-80 hover:opacity-100 rounded" OnClick={() => handleTrackingOrderDetail(item.id)}>Theo dõi chi tiết</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </>
                                    :
                                    <div className="w-full text-gray-500 text-center text-lg font-medium py-2">Không có dữ liệu !</div>
                            }

                        </>
                }
            </div>
            <Modal show={showCancelBox} setShow={setShowCancelBox} size="delete-confirmation-box">
                <div className="delete-confirmation-box w-full h-full relative flex flex-col justify-between">
                    <div className="text-xl mt-2">Bạn muốn hủy đơn hàng này ?</div>
                    <div className="flex items-center justify-end gap-x-2 transition-all">
                        <Button styles="rounded-[4px] px-8 py-2 text-black hover:bg-gray-200 cursor-pointer duration-200" OnClick={() => setShowCancelBox(false)}>Trờ lại</Button>
                        <Button styles="rounded-[4px] px-8 py-2 bg-red-500 text-white hover:bg-red-600 cursor-pointer duration-200" OnClick={() => handleCancelOrder(cancelOrder)}>Hủy đơn hàng</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default AllOrder;