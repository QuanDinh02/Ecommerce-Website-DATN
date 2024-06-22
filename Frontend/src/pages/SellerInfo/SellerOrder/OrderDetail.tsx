import Button from "@/components/Button";
import CopyClipboard from "@/components/CopyClipboard";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { FiPrinter } from "react-icons/fi";
import LoadImage from "@/components/LoadImage";
import { CurrencyFormat } from "@/utils/numberFormat";
import { getOrderDetail } from "@/services/sellerService";
import { dateTimeFormat } from "@/utils/dateFormat";
import { ThreeDots } from "react-loader-spinner";

const tableHeaders = [
    {
        name: "Hình ảnh",
        size: 1
    },
    {
        name: "Thông tin sản phẩm",
        size: 3
    },
    {
        name: "Giá",
        size: 1
    },
    {
        name: "Số lượng",
        size: 1
    },
    {
        name: "Doanh thu",
        size: 1
    }
];

interface IOrderItem {
    id: number
    quantity: number
    price: number
    product_id: number
    product_name: string
}

interface IOrderAddress {
    customer_name: string
    name: string
    phone: string
    address: string
}
interface IOrderDetail {
    id: number
    orderDate: Date
    totalPrice: number
    shipFee: number
    order_address: IOrderAddress
    order_item_list: IOrderItem[]
    payment_method: string
    shipping_method: string
    shipping_unit: string
    status: string
}

const OrderDetail = () => {

    const [dataLoading, setDataLoading] = React.useState<boolean>(true);

    const [searchParams] = useSearchParams();

    const [orderID, setOrderID] = React.useState<number>(0);

    const [orderDetailInfo, setOrderDetailInfo] = React.useState<IOrderDetail>();

    const fetchOrderDetail = async () => {
        let result = await getOrderDetail(orderID);
        if (result) {
            setOrderDetailInfo(result);
        }
    }

    React.useEffect(() => {

        let order_id = searchParams.get('code');
        let activeOrderID: number = order_id ? +order_id : 0;
        if (activeOrderID !== orderID) {
            setOrderID(activeOrderID);
        }

    }, [searchParams.get('code')]);

    React.useEffect(() => {
        if (orderID !== 0) {
            fetchOrderDetail();
        }
    }, [orderID]);

    React.useEffect(() => {
        setTimeout(() => {
            setDataLoading(false);
        }, 500);
    }, []);

    return (
        <>
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
                    <div className="order-detail-container">
                        {
                            orderDetailInfo &&
                            <>
                                <div className="order-detail__header mb-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-x-2">
                                            <span className="font-medium">Mã đơn hàng:</span>
                                            <div className="font-medium text-red-500">
                                                <span className="flex items-center gap-x-1">
                                                    #{orderID} <span className="cursor-pointer"><CopyClipboard value={orderID} /></span>
                                                </span>
                                            </div>
                                            <span>-</span>
                                            <span>{orderDetailInfo.status}</span>
                                        </div>
                                        <div><Button styles="px-12 py-1 flex items-center gap-x-2 border border-gray-400 hover:bg-gray-100 text-gray-600 rounded"><FiPrinter /> In</Button></div>
                                    </div>
                                    <div className="flex items-center mt-2 text-sm pb-2 border-b border-gray-300">
                                        <div className="flex-1">Ngày đặt hàng: <span className="font-medium">{dateTimeFormat(`${orderDetailInfo.orderDate}`)}</span></div>
                                        <div className="flex-1">Hình thức thanh toán: <span className="font-medium">{orderDetailInfo.payment_method}</span></div>
                                    </div>
                                </div>
                                <div className="order-detail__main">
                                    <div className="order-item-list">
                                        <div className="font-medium mb-4">Danh sách sản phẩm</div>
                                        <div className="w-full">
                                            <table className="table-fixed w-full">
                                                <thead>
                                                    <tr className="bg-gray-100">
                                                        {tableHeaders && tableHeaders.length > 0 &&
                                                            tableHeaders.map((item, index) => {
                                                                return (
                                                                    <th key={`header-${index}`} className="text-left py-3 px-2 text-gray-600 font-medium text-sm" colSpan={item.size}>{item.name}</th>
                                                                )
                                                            })
                                                        }
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        orderDetailInfo.order_item_list && orderDetailInfo.order_item_list.length > 0 &&
                                                        orderDetailInfo.order_item_list.map((item, index) => {
                                                            return (
                                                                <tr key={`product-${index}`}>
                                                                    <td className="py-3 px-2" colSpan={1}>
                                                                        <div className="flex items-center gap-x-3">
                                                                            <LoadImage img_style={"w-20 h-20 rounded-lg"} product_id={item.product_id} />
                                                                        </div>
                                                                    </td>
                                                                    <td colSpan={3}>
                                                                        <div className="text-sm w-full">
                                                                            <div className="font-medium cursor-pointer line-clamp-2">{item.product_name}</div>
                                                                            <div className="flex items-center gap-x-1">Mã sản phẩm:
                                                                                <span className="font-medium flex items-center gap-x-1">
                                                                                    {item.product_id} <span className="cursor-pointer"><CopyClipboard value={item.product_id} /></span>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="py-3 px-2" colSpan={1}><span className="text-sm text-gray-600 font-medium">{CurrencyFormat(item.price)}</span></td>
                                                                    <td className="py-3 px-2 text-sm text-gray-600 font-medium" colSpan={1}>{item.quantity}</td>
                                                                    <td className="py-3 px-2" colSpan={1}><span className="text-sm text-gray-600 font-medium">{CurrencyFormat(item.price * item.quantity)}</span></td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="order-info grid grid-cols-2 gap-x-6 gap-y-1 mt-4 border-t border-gray-300 pt-4">
                                        <div>
                                            <div className="mb-4">
                                                <div className="font-medium mb-2">Thông tin thanh toán</div>
                                                <div className="mb-2 text-sm flex items-center justify-between">
                                                    <span className="text-gray-600">Phương thức thanh toán</span>
                                                    <span className="font-medium">{orderDetailInfo.payment_method}</span>
                                                </div>
                                                <div className="text-sm flex items-center justify-between">
                                                    <span className="text-gray-600">Tiền khách trả</span>
                                                    <span className="font-medium">{CurrencyFormat(orderDetailInfo.totalPrice)}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-medium mb-2">Thông tin vận chuyển</div>
                                                <div className="mb-2 text-sm flex items-center justify-between">
                                                    <span className="text-gray-600">Đơn vị vận chuyển</span>
                                                    <span className="font-medium">{orderDetailInfo.shipping_unit}</span>
                                                </div>
                                                <div className="mb-2 text-sm flex items-center justify-between">
                                                    <span className="text-gray-600">Gói cước vận chuyển</span>
                                                    <span className="font-medium">{orderDetailInfo.shipping_method}</span>
                                                </div>
                                                <div className="mb-2 text-sm flex items-center justify-between">
                                                    <span className="text-gray-600">Phí vận chuyển</span>
                                                    <span className="font-medium">{CurrencyFormat(orderDetailInfo.shipFee)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-medium mb-2">Thông tin khách hàng</div>
                                            <div className="mb-2 text-sm flex items-center justify-between">
                                                <span className="text-gray-600">Tên khách hàng</span>
                                                <span className="font-medium">{orderDetailInfo.order_address.customer_name}</span>
                                            </div>
                                            <div className="mb-2 text-sm flex items-center justify-between">
                                                <span className="text-gray-600">Tên người/địa điểm nhận hàng</span>
                                                <span className="font-medium">{orderDetailInfo.order_address.name}</span>
                                            </div>
                                            <div className="mb-2 text-sm flex items-center justify-between">
                                                <span className="text-gray-600">Số điện thoại</span>
                                                <span className="font-medium">{orderDetailInfo.order_address.phone}</span>
                                            </div>
                                            <div className="text-sm flex">
                                                <span className="text-gray-600 flex-1">Địa chỉ nhận hàng</span>
                                                <span className="font-medium flex-1 text-right">{orderDetailInfo.order_address.address}</span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </>
                        }
                    </div>
            }
        </>

    )
}

export default OrderDetail;