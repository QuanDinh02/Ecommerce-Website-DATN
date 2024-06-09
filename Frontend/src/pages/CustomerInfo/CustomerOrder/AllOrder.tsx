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
import { MdStorefront } from "react-icons/md";
import LoadImageS3 from "@/components/LoadImageS3";
import { useNavigate } from "react-router-dom";

export const STATUS_STYLE = {
    'ĐANG XỬ LÝ': {
        style: "text-blue-500",
        actions: [
            {
                path: "",
                title: "Liên Hệ Người Bán"
            },
            {
                path: "",
                title: "Hủy Đơn Hàng"
            },
        ]

    },
    'CHỜ GIAO HÀNG': {
        style: "text-yellow-500",
        actions: [
            {
                path: "",
                title: "Đã Nhận Hàng"
            },
            {
                path: "",
                title: "Liên Hệ Người Bán"
            },
        ]

    },
    'GIAO HÀNG THÀNH CÔNG': {
        style: "text-green-500",
        actions: [
            {
                path: "",
                title: "Mua Lại"
            },
            {
                path: "",
                title: "Trả Hàng/ Hoàn Tiền"
            },
        ]

    }
}

const AllOrder = () => {

    const navigate = useNavigate();

    const [orderList, setOrderList] = React.useState<IOrder[]>([]);

    const [dataLoading, setDataLoading] = React.useState<boolean>(true);

    const account: IAccount = useSelector<RootState, IAccount>(state => state.user.account);
    const isAuthenticated = useSelector<RootState, boolean>(state => state.user.isAuthenticated);

    const fetchAllOrder = async (customer_id: number) => {
        let response: any = await getAllOrderByCustomer(customer_id);
        if (response && response.EC === 0) {
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

    React.useEffect(() => {
        //setOrderList(ORDER_SAMPLE_DATA);
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
            <div className="text-xl pb-4 border-b border-gray-300 mb-4">Tất cả đơn hàng</div>
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
                                                <div className="order-item rounded-[4px] shadow-lg mb-12" key={`order-item-${index}`}>
                                                    <div className="order-item__header px-3 py-2 flex items-center justify-between border-b border-gray-200 bg-[#F2F3F7]">
                                                        <div className="shop-name flex items-center gap-x-4">
                                                            <div className="font-medium">#{item.id}</div>
                                                            <div className="shop-name__link flex items-center justify-center gap-x-1 py-1 px-3 border border-gray-300 bg-white text-gray-500 cursor-pointer"><MdStorefront /> Xem shop</div> 
                                                            <div className="tracking-wide font-medium">{dateFormat(`${item.orderDate}`)}</div>
                                                        </div>
                                                        <div className={`order-status font-medium ${STATUS_STYLE[item.status].style}`}>{item.status}</div>
                                                    </div>
                                                    <div className="order-item__product-list px-5 py-3 bg-[#F2F3F7]">
                                                        {
                                                            item.order_item_list && item.order_item_list.length > 0 &&
                                                            item.order_item_list.map((product, product_index) => {
                                                                return (
                                                                    <div className="order-product flex items-center justify-between pb-4 mb-4 border-b border-gray-300" key={`order-product-${index}-${product_index}`}>
                                                                        <div className="order-product__info flex gap-x-4">
                                                                            <LoadImageS3 img_style="w-24 h-24" img_url={product.product_image}/>
                                                                            <div className="flex flex-col gap-y-1">
                                                                                <div className="font-medium cursor-pointer hover:underline hover:text-[#FCB800]" onClick={() => handleProductDetailNavigation(product.product_id)}>{product.product_name}</div>
                                                                                <div>x{product.quantity}</div>
                                                                                <div className="px-2 py-1 border border-green-500 text-green-500 w-fit">Hoàn trả miễn phí 15 ngày</div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="order-product__price flex items-center gap-x-2">
                                                                            <div className="current_price text-lg text-[#FCB800] font-medium">{CurrencyFormat(product.price)}</div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div className="order-item__bottom bg-[#FFFEFA] px-3 py-2">
                                                        <div className="flex items-center justify-end my-3 text-gray-500">
                                                            <div>Phí vận chuyển: <span>{CurrencyFormat(item.shipFee)}</span></div>
                                                        </div>
                                                        <div className="mb-6 text-end w-full text-xl">Thành tiền: <span className="text-xl text-[#FCB800] font-medium">{CurrencyFormat(item.totalPrice)}</span></div>
                                                        <div className="flex items-center justify-between py-3">
                                                            <div className="text-sm text-gray-500 tracking-wide w-[30rem]">{item.note}</div>
                                                            <div className="flex items-center gap-x-3 transition-all">
                                                                <Button styles="px-3 py-2 rounded-[4px] bg-[#FCB800] text-black hover:opacity-80">{STATUS_STYLE[item.status].actions[0].title}</Button>
                                                                <Button styles="px-3 py-2 rounded-[4px] bg-white text-black border-gray-300 border hover:bg-gray-200">{STATUS_STYLE[item.status].actions[1].title}</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </>
                                :
                                <div className="w-full text-gray-500 text-center border border-gray-100 bg-gray-100 py-2">Chưa có đơn hàng nào !</div>
                        }
                    </>
            }
        </div>
    )
}

export default AllOrder;