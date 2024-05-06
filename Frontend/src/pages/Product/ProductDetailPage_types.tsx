export interface IProductActive {
    id: number
    name: string
}
export interface ISubCategoryActive {
    id: number
    title: string
}
export interface ICategoryActive {
    id: number
    title: string
}

export interface IProductReview {
    id: number
    comment: string
    rating: number
    createdAt: Date
    customer_name: string
}

export interface IProductType {
    id: number
    type: string
    typeName: string
    quantity: number
    size: string
    color: string
    currentPrice: number
    price: number
}

export interface IProductTypeGroup {
    color: string[]
    size: string[]
}

export interface IShop {
    id: number
    name: string
}
export interface IProductDetail {
    id: number
    name: string
    currentPrice: number
    price: number
    description: string
    comment_count: number
    rating_average: number
    product_image: string
    inventory_count: number
    reviews: IProductReview[]
    product_type_list: IProductType[]
    product_type_group: IProductTypeGroup
    sub_category: ISubCategoryActive
    category: ICategoryActive
    shop_info: IShop
}

export interface ISelectType {
    id: number
    label: string
    select: boolean
}

export interface IAccount {
    customer_id: number
    username: string
    role: string
}

export interface ICartItemInfo {
    id: number
    name: string
    image: string
}

export interface ICartItemShopInfo {
    id: number
    name: string
}
export interface ICartItem {
    id: number
    quantity: number
    price: number
    color: string
    size: string
    product_info: ICartItemInfo
    shop_info: ICartItemShopInfo
}