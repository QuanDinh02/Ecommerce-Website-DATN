interface IOrderItem {
    id: number
    quantity: number
    price: number
    product_id: number
    product_name: string
    product_image: string
    product_price: number
}

export interface IOrder {
    id: number
    orderDate: Date
    totalPrice: number
    note: string
    shipFee: number
    status: string
    order_item_list: IOrderItem[]
}