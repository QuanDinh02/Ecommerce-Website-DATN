interface IOrderItem {
    id: number
    quantity: number
    price: number
    product_id: number
    product_name: string
    product_image: string
    product_price: number
}

interface IOrderStatus {
    id: number
    name: string
    date: Date
}

export interface IOrder {
    id: number
    orderDate: Date
    totalPrice: number
    status: IOrderStatus
    order_item_list: IOrderItem[]
}

export const ORDER_STATUS = [
    {
        id: 0,
        name: "Tất cả",
        selected: true
    },
    {
        id: 1,
        name: "Chờ xác nhận",
        selected: false
    },
    {
        id: 2,
        name: "Đã xác nhận",
        selected: false
    },
    {
        id: 3,
        name: "Đang đóng gói",
        selected: false
    },
    {
        id: 6,
        name: "Đang giao hàng",
        selected: false
    },
    {
        id: 7,
        name: "Giao hàng thành công",
        selected: false
    },
    {
        id: 10,
        name: "Đã hủy",
        selected: false
    },
];