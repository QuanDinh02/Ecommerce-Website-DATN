import LinkNewTabProductDetail from "@/components/LinkNewTab";
import LoadImage from "@/components/LoadImage";
import LoadImageS3 from "@/components/LoadImageS3";
import { getCustomerOrderDetail } from "@/services/orderServices";
import { dateFormat, dateTimeFormat } from "@/utils/dateFormat";
import { CurrencyFormat } from "@/utils/numberFormat";
import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useImmer } from "use-immer";

interface IShippingLocation {
    address: string
    phone: string
    fullName: string
}

interface IOrderItem {
    id: number
    quantity: number
    price: number
    product_id: number
    product_name: string
    product_image: string
}

interface IOrderStatus {
    id: number
    name: string
    date: Date
}

interface IOrderDetail {
    id: number
    orderDate: Date
    totalPrice: number
    shipFee: number
    payment_method: string
    shipping_method: string
    shipping_unit: string
}

interface IOrderDetailFetching {
    id: number
    orderDate: Date
    totalPrice: number
    shipFee: number
    shipping_location: IShippingLocation
    shipping_unit: string
    payment_method: string
    shipping_method: string
    order_item_list: IOrderItem[]
    order_status_history: IOrderStatus[]
}

const tableHeaders = [
    'Sản phẩm', '', 'Giá', 'Số lượng', 'Thành tiền'
];

const ORDER_STATUS = [
    {
        id: 1,
        label: "Đặt hàng thành công"
    },
    {
        id: 2,
        label: "Đã xác nhận đơn hàng"
    },
    {
        id: 3,
        label: "Đang đóng gói"
    },
    {
        id: 6,
        label: "Đang vận chuyển"
    },
    {
        id: 7,
        label: "Giao hàng thành công"
    }
]

const OrderTracking = () => {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [dataLoading, setDataLoading] = React.useState<boolean>(true);

    const [orderID, setOrderID] = React.useState<number>(0);
    const [orderStatus, setOrderStatus] = React.useState<number>(2);
    const [orderUpdateDate, setOrderUpdateDate] = React.useState<Date>();

    const [orderDetailInfo, setOrderDetailInfo] = useImmer<IOrderDetail>({
        id: 0,
        orderDate: new Date(),
        totalPrice: 0,
        shipFee: 0,
        payment_method: "",
        shipping_method: "",
        shipping_unit: ""
    });

    const [orderShippingInfo, setOrderShippingInfo] = React.useState<IShippingLocation>({
        address: "",
        phone: "",
        fullName: ""
    });
    const [orderStatusList, setOrderStatusList] = React.useState<IOrderStatus[]>([]);
    const [orderItemList, setOrderItemList] = React.useState<IOrderItem[]>([]);

    const fetchOrderDetail = async (order_id: number) => {
        let response: IOrderDetailFetching = await getCustomerOrderDetail(order_id);
        if (response) {
            setOrderDetailInfo(draft => {
                draft.id = response.id;
                draft.orderDate = response.orderDate;
                draft.totalPrice = response.totalPrice;
                draft.shipFee = response.shipFee;
                draft.payment_method = response.payment_method;
                draft.shipping_method = response.shipping_method;
                draft.shipping_unit = response.shipping_unit;
            });

            let order_status_list = response.order_status_history;

            setOrderShippingInfo(response.shipping_location);
            setOrderItemList(response.order_item_list);
            setOrderStatusList(order_status_list);
            setOrderStatus(order_status_list[0].id !== 10 ? order_status_list[0].id : 1);
            setOrderUpdateDate(order_status_list[0].date);

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

        let order_id = searchParams.get('code');
        let activeOrderID: number = order_id ? +order_id : 0;
        if (activeOrderID !== orderID) {
            setOrderID(activeOrderID);
        }

    }, [searchParams.get('code')]);

    React.useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        if (orderID !== 0) {
            fetchOrderDetail(orderID);
        }

    }, [orderID]);


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
                    <div className="order-tracking-container">
                        <div className="flex items-center justify-between mb-8">
                            <div className="text-xl text-gray-600">Chi tiết đơn hàng <span className="text-black font-medium">#{orderID}</span></div>
                            <div className="text-gray-600 font-medium">Ngày đặt hàng: {dateTimeFormat(`${orderDetailInfo.orderDate}`)}</div>
                        </div>
                        <div className="flex gap-4 mb-16 h-fit">
                            <div className="flex-1">
                                <div className="text-sm font-medium text-gray-600 mb-4">ĐỊA CHỈ NGƯỜI NHẬN</div>
                                <div className="p-4 bg-white flex flex-col gap-y-2 h-full">
                                    <div className="name font-medium">{orderShippingInfo.fullName}</div>
                                    <div className="name text-sm text-gray-600 font-medium">Địa chỉ: {orderShippingInfo.address}</div>
                                    <div className="name text-sm text-gray-600 font-medium">Điện thoại: {orderShippingInfo.phone}</div>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-medium text-gray-600 mb-4">THÔNG TIN VẬN CHUYỂN</div>
                                <div className="p-4 bg-white flex flex-col gap-y-2 h-full">
                                    <div>
                                        {orderDetailInfo.shipping_method}
                                        {
                                            orderDetailInfo.shipFee === 0 && <span> (Miễn phí vận chuyển)</span>
                                        }
                                    </div>
                                    <div>Đơn vị vận chuyển: <span className="font-medium">{orderDetailInfo.shipping_unit}</span></div>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-medium text-gray-600 mb-4">PHƯƠNG THỨC THANH TOÁN</div>
                                <div className="p-4 bg-white h-full">
                                    <div>{orderDetailInfo.payment_method}</div>
                                </div>
                            </div>
                        </div>
                        <div className="text-sm font-medium text-gray-600 mb-4">TRẠNG THÁI ĐƠN HÀNG</div>
                        <div className="bg-white px-5 pt-20 pb-12 rounded">
                            <div className="flex items-center w-full">
                                {
                                    ORDER_STATUS.map((step, index) => {
                                        if (step.id < orderStatus) {
                                            return (
                                                <>
                                                    {(index !== 0) &&
                                                        <div className="flex-1 h-2 bg-[#6acd03]"></div>
                                                    }
                                                    <div className="relative">
                                                        <div className="w-5 h-5 border-2 border-[#6acd03] rounded-full flex items-center justify-center text-xl bg-[#6acd03]"></div>
                                                        {
                                                            (index !== ORDER_STATUS.length - 1) ?
                                                                <div className="text-sm absolute left-[-10px] top-[-48px] w-32 text-gray-600 font-medium h-10">{step.label}</div>
                                                                :
                                                                <div className="text-sm absolute right-0 top-[-48px] w-32 text-gray-600 font-medium text-end h-10">{step.label}</div>
                                                        }
                                                    </div>
                                                </>
                                            )
                                        }
                                        else if (step.id === orderStatus) {
                                            return (
                                                <>
                                                    {(index !== 0) &&
                                                        <div className="flex-1 h-2 bg-[#6acd03]"></div>
                                                    }
                                                    <div className="relative">
                                                        <div className="w-5 h-5 border-4 border-[#6acd03] rounded-full flex items-center justify-center text-xl bg-white"></div>
                                                        {
                                                            (index !== ORDER_STATUS.length - 1) ?
                                                                <div className="text-sm absolute left-[-10px] top-[-48px] w-32 text-gray-600 font-medium h-10">{step.label}</div>
                                                                :
                                                                <div className="text-sm absolute right-0 top-[-48px] w-32 text-gray-600 font-medium text-end h-10">{step.label}</div>
                                                        }
                                                    </div>
                                                </>
                                            )
                                        }
                                        else {
                                            return (
                                                <>
                                                    {(index !== 0) &&
                                                        <div className="flex-1 h-2 bg-gray-200"></div>
                                                    }
                                                    <div className="relative">
                                                        <div className="w-5 h-5 border-2 border-gray-200 rounded-full flex items-center justify-center text-xl bg-gray-200"></div>
                                                        {
                                                            (index !== ORDER_STATUS.length - 1) ?
                                                                <div className="text-sm absolute left-[-10px] top-[-48px] w-32 text-gray-400 font-medium">{step.label}</div>
                                                                :
                                                                <div className="text-sm absolute right-0 top-[-48px] w-32 text-gray-400 font-medium text-end">{step.label}</div>
                                                        }
                                                    </div>
                                                </>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                        <div className="text-sm font-medium text-gray-600 my-4">CHI TIẾT TRẠNG THÁI ĐƠN HÀNG</div>
                        <div className="bg-white p-5 rounded">
                            <div className="w-full h-full rounded border border-gray-300">
                                <div className="bg-gray-100 font-medium px-3 py-4 rounded-t">Cập nhật mới nhất: {dateFormat(`${orderUpdateDate}`)}</div>
                                {
                                    orderStatusList && orderStatusList.length > 0 &&
                                    orderStatusList.map((order_status, index) => {
                                        if (index === 0) {
                                            return (
                                                <div className="bg-white px-3 py-4 border-t border-gray-300 font-medium flex items-center gap-x-6" key={`order-status-${orderID}-${order_status.id}`}>
                                                    <span className="status__time">{dateTimeFormat(`${order_status.date}`)}</span>
                                                    <span className="status__name">{order_status.name}</span>
                                                </div>
                                            )
                                        }
                                        return (
                                            <div className="bg-white px-3 py-4 border-t border-gray-300 flex items-center gap-x-6" key={`order-status-${orderID}-${order_status.id}`}>
                                                <span className="status__time">{dateTimeFormat(`${order_status.date}`)}</span>
                                                <span className="status__name">{order_status.name}</span>
                                            </div>
                                        )
                                    })
                                }
                                <div className="bg-white px-3 py-4 border-t border-gray-300 flex items-center gap-x-6 rounded-b">
                                    <span className="status__time">{dateTimeFormat(`${orderDetailInfo.orderDate}`)}</span>
                                    <span className="status__name">Đặt hàng thành công</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-sm font-medium text-gray-600 my-4">KIỆN HÀNG GỒM CÓ</div>
                        <div className="bg-white p-5 rounded">
                            <div className="w-full">
                                <table className="table-fixed w-full">
                                    <thead>
                                        <tr>
                                            {tableHeaders && tableHeaders.length > 0 &&
                                                tableHeaders.map((item, index) => {
                                                    return (
                                                        <th key={`header-${index}`} className="text-left py-3 px-2 text-gray-600 font-medium">{item}</th>
                                                    )
                                                })
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orderItemList && orderItemList.length > 0 &&
                                            orderItemList.map((item, index) => {
                                                return (
                                                    <tr key={`product-${index}`}>
                                                        <td className="py-3 px-2" colSpan={2}>
                                                            <div className="flex items-center gap-x-3">
                                                                {/* <LoadImage img_style={"w-16 h-16 rounded-lg"} product_id={item.product_id} /> */}
                                                                <LoadImageS3 img_style="w-16 h-16 rounded-lg" img_url={item.product_image} />
                                                                <div className="line-clamp-2 font-medium text-sm cursor-pointer hover:underline hover:text-blue-600 w-60" onClick={() => handleProductDetailNavigation(item.product_id)}><LinkNewTabProductDetail id={item.product_id} name={item.product_name} /></div>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-2"><span className="text-sm text-gray-600 font-medium">{CurrencyFormat(item.price)}</span></td>
                                                        <td className="py-3 px-2 text-sm text-gray-600 font-medium">{item.quantity}</td>
                                                        <td className="py-3 px-2"><span className="text-sm text-gray-600 font-medium">{CurrencyFormat(item.price * item.quantity)}</span></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="border-t border-gray-200 mt-4">
                                <div className="w-full flex mt-4 mb-2">
                                    <td className="w-4/5 text-gray-500 font-medium text-end">Chi phí vận chuyển: </td>
                                    <td className="w-1/5 text-end text-sm text-gray-600 font-medium">{CurrencyFormat(orderDetailInfo.shipFee)}</td>
                                </div>
                                <div className="w-full flex my-2">
                                    <td className="w-4/5 text-gray-500 font-medium text-end">Tổng đơn hàng: </td>
                                    <td className="w-1/5 text-end text-lg font-medium">{CurrencyFormat(orderDetailInfo.totalPrice)}</td>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>

    )
}

export default OrderTracking;