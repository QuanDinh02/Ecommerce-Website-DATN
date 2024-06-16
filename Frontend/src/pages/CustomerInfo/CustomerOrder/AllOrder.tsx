import { CurrencyFormat } from "@/utils/numberFormat";
import Button from "@/components/Button";
import React from "react";
import { IAccount } from "@/pages/Product/ProductDetailPage_types";
import { RootState } from "@/redux/reducer/rootReducer";
import { useSelector } from "react-redux";
import { getAllOrderByCustomer } from "@/services/orderServices";
import { IOrder } from "./OrderType";
import { dateFormat } from "@/utils/dateFormat";
import { ThreeDots } from "react-loader-spinner";
import LoadImageS3 from "@/components/LoadImageS3";
import { useNavigate } from "react-router-dom";
import LoadImage from "@/components/LoadImage";

const AllOrder = () => {

    const navigate = useNavigate();

    const [orderList, setOrderList] = React.useState<IOrder[]>([]);

    const [dataLoading, setDataLoading] = React.useState<boolean>(false);

    const account: IAccount = useSelector<RootState, IAccount>(state => state.user.account);
    const isAuthenticated = useSelector<RootState, boolean>(state => state.user.isAuthenticated);

    const fetchAllOrder = async (customer_id: number) => {
        let response: any = await getAllOrderByCustomer(customer_id);
        if (response && response.EC === 0) {
            console.log(response.DT);
            setOrderList(response.DT);
            setTimeout(() => {
                setDataLoading(false);
            }, 1000);
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

    React.useEffect(() => {
        if (account && isAuthenticated) {
            fetchAllOrder(account.customer_id);
        }
    }, []);

    React.useEffect(() => {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }
    }, []);

    return (
        <div className="all-order-container">
            <div className="text-lg pb-4 text-gray-600">Tất cả đơn hàng</div>
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
                                                <div className="order-item bg-white mb-12 p-5" key={`order-item-${item.id}`}>
                                                    <div className="order-item__header flex items-center justify-between">
                                                        <div className="info flex items-center gap-x-12">
                                                            <div className="order-item__id">
                                                                <div className="text-gray-600 mb-1 font-medium">Mã đơn hàng</div>
                                                                <div className="text-[#FCB800] font-medium">{item.id}</div>
                                                            </div>
                                                            <div className="order-item__date">
                                                                <div className="text-gray-600 mb-1 font-medium">Ngày mua</div>
                                                                <div>{dateFormat(`${item.orderDate ? item.orderDate : ""}`)}</div>
                                                            </div>
                                                            <div className="order-item__total-price">
                                                                <div className="text-gray-600 mb-1 font-medium">Tổng tiền</div>
                                                                <div className="font-medium">{CurrencyFormat(item.totalPrice)}</div>
                                                            </div>
                                                            <div className="order-item__shipping-fee">
                                                                <div className="text-gray-600 mb-1 font-medium">Phí vận chuyển</div>
                                                                <div>{CurrencyFormat(item.shipFee)}</div>
                                                            </div>
                                                        </div>
                                                        <Button styles="px-6 py-2 bg-[#FCB800] font-medium w-fit cursor-pointer opacity-80 hover:opacity-100 rounded" OnClick={() => handleTrackingOrderDetail(item.id)}>Theo dõi chi tiết</Button>
                                                    </div>
                                                    <div className="order-item__main mt-12 mb-8">
                                                        <div className="flex flex-col gap-y-6">
                                                            {
                                                                item.order_item_list && item.order_item_list.length > 0 &&
                                                                item.order_item_list.map((product, product_idx) => {
                                                                    return (
                                                                        <div className="flex gap-x-6" key={`product-item-${item.id}-${product_idx}`} onClick={() => handleProductDetailNavigation(product.product_id)}>
                                                                            <LoadImage img_style="w-24 h-24" product_id={product.product_id} />
                                                                            <div className="flex flex-col gap-y-2">
                                                                                <div className="opacity-90 line-clamp-1 cursor-pointer hover:underline hover:text-blue-600">{product.product_name}</div>
                                                                                <div className="order-item__price flex items-center gap-x-2">
                                                                                    <div className="font-medium">{CurrencyFormat(product.price)}</div>
                                                                                    <div className="line-through text-gray-400">{CurrencyFormat(product.product_price)}</div>
                                                                                </div>
                                                                                <div className="text-gray-500">Số lượng: {product.quantity}</div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }
                                </>
                                :
                                <div className="w-full text-gray-500 text-center text-lg font-medium py-2">Chưa có đơn hàng !</div>
                        }

                    </>
            }
        </div>
    )
}

export default AllOrder;