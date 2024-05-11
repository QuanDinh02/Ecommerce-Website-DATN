import { MdStorefront } from "react-icons/md";
import { CurrencyFormat } from "@/utils/numberFormat";
import Button from "@/components/Button";
import React from "react";
import { STATUS_STYLE } from "./AllOrder";

const ShippingOrder = () => {

    const [orderList, setOrderList] = React.useState<any>([]);

    // React.useEffect(() => {
    //     setOrderList(ORDER_SAMPLE_DATA);
    // }, []);

    return (
        <div className="all-order-container">
            <div className="text-xl pb-4 border-b border-gray-300 mb-4">Đơn hàng đang vận chuyển</div>
            {
                (orderList && orderList.length > 0) ?
                    <>
                        {
                            orderList.map((item, index) => {
                                return (
                                    <div className="order-item rounded-[4px] shadow-lg mb-12" key={`order-item-${index}`}>
                                        <div className="order-item__header px-3 py-2 flex items-center justify-between border-b border-gray-200 bg-[#F2F3F7]">
                                            <div className="shop-name flex items-center gap-x-4">
                                                <div className="shop-name__title font-bold">{item.shop_info.name}</div>
                                                <div className="shop-name__link flex items-center justify-center gap-x-1 py-1 px-3 border border-gray-300 bg-white text-gray-500 cursor-pointer"><MdStorefront /> Xem shop</div>
                                                <div className="tracking-wide font-medium">17-05-2024</div>
                                            </div>
                                            <div className={`order-status font-medium ${STATUS_STYLE[item.status].style}`}>{item.status}</div>
                                        </div>
                                        <div className="order-item__product-list px-5 py-3 bg-[#F2F3F7]">
                                            {
                                                item.order_items.map((product, product_index) => {
                                                    return (
                                                        <div className="order-product flex items-center justify-between pb-4 mb-4 border-b border-gray-300" key={`order-product-${index}-${product_index}`}>
                                                            <div className="order-product__info flex gap-x-4">
                                                                <div className="w-24 h-24"><img src={product.image} alt="" /></div>
                                                                <div className="flex flex-col gap-y-1">
                                                                    <div className="font-medium">{product.name}</div>
                                                                    <div>x{product.quantity}</div>
                                                                    <div className="px-2 py-1 border border-green-500 text-green-500 w-fit">{product.label}</div>
                                                                </div>
                                                            </div>
                                                            <div className="order-product__price flex items-center gap-x-2">
                                                                <div className="current_price text-lg text-[#FCB800] font-medium">{CurrencyFormat(product.current_price)}</div>
                                                                <div className="price line-through text-gray-500">{CurrencyFormat(product.price)}</div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="order-item__bottom bg-[#FFFEFA] px-3 py-2">
                                            <div className="my-6 text-end w-full">Thành tiền: <span className="text-xl text-[#FCB800] font-medium">{CurrencyFormat(item.total)}</span></div>
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
                    <div className="w-full text-gray-500 text-center border border-gray-100 bg-gray-100 py-2">Chưa có đơn hàng đang vận chuyển nào !</div>
            }



        </div>
    )
}

export default ShippingOrder;