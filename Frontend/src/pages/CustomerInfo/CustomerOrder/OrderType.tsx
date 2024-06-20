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