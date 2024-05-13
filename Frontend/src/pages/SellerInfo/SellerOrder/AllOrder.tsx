import { ORDER_LIST_SAMPLE_DATA } from "./OrderDataSample";
import { BiUserCircle } from "react-icons/bi";
import { CurrencyFormat } from "@/utils/numberFormat";

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

const tableHeaders = [
    {
        name: "Sản phẩm",
        size: 2
    },
    {
        name: "Tổng đơn hàng",
        size: 1
    },
    {
        name: "Trạng thái",
        size: 1
    },
    {
        name: "Đơn vị vận chuyển",
        size: 1
    },
    {
        name: "Thao tác",
        size: 1
    }
];

const AllOrder = () => {

    return (
        <>
            <div className="text-xl pb-4 border-b border-gray-300 mb-4">Tất cả đơn hàng ({ORDER_LIST_SAMPLE_DATA.length})</div>
            <table className="table-fixed w-full mb-8">
                <thead>
                    <tr className='bg-gray-100 border-b-10 border-white'>
                        {tableHeaders && tableHeaders.length > 0 &&
                            tableHeaders.map((item, index) => {
                                return (
                                    <th key={`header-${index}`} className="text-left py-3 px-2 font-normal" colSpan={item.size}>{item.name}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                {
                    ORDER_LIST_SAMPLE_DATA.map((item, index) => {
                        return (
                            <tbody key={`order-${item.id}`}>
                                <tr>
                                    <td colSpan={6} className="bg-gray-100 px-2 py-1 rounded-t-lg">
                                        <div className="flex items-center justify-between text-gray-500">
                                            <div className="flex items-center gap-x-1"><BiUserCircle className="w-5 h-5" />{item.username}</div>
                                            <div>ID Đơn hàng {item.id}</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="border border-gray-200">
                                    <td className="py-2 px-2" colSpan={2}>
                                        <div className="flex gap-x-2 items-center">
                                            <div className="w-14 h-14 w-1/5"><img src={item.image} alt="" /></div>
                                            <div className="text-sm w-3/5">
                                                <div className="line-clamp-1 mb-1 font-medium">{item.product.name}</div>
                                                <div className="text-gray-600">{item.product.product_type_name}</div>
                                            </div>
                                            <div className="w-1/5 text-end">x {item.product.quantity}</div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-2" colSpan={1}>
                                        <div>
                                            <div className="font-medium">{CurrencyFormat(item.product.price * (item.product.quantity))}</div>
                                            <div className="text-gray-600 text-sm">Thanh toán khi nhận hàng</div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-2" colSpan={1}>
                                        <div className="font-bold">{item.status}</div>
                                        <div className="text-sm text-gray-600">Đã nhận: {item.status_date}</div>
                                    </td>
                                    <td className="py-2 px-2 font-medium text-green-500 text-sm" colSpan={1}>{item.shipping_unit.name}</td>
                                    <td className="py-2 px-2 text-sm" colSpan={1}>
                                        <div className="text-blue-500 hover:underline cursor-pointer">Thông tin vận chuyển</div>
                                        <div className="text-blue-500 hover:underline cursor-pointer">Chi tiết đơn hàng</div>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })
                }
            </table>
        </>
    )
}

export default AllOrder;