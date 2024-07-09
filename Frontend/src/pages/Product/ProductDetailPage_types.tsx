interface ICustomerInfo {
    id: number
    name: string
}
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
    customer: ICustomerInfo
    createdAt: Date
    customer_image: string
}

export interface IRatings {
    "1" : number
    "2" : number
    "3" : number
    "4" : number
    "5" : number
}
export interface IReviewData {
    page: number
    page_total: number
    total_ratings: number
    rating_average: number
    ratings: IRatings
    product_reviews: IProductReview[]
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

export interface IProductDetail {
    id: number
    name: string
    currentPrice: number
    price: number
    sold: number
    description: string
    product_image: string
    inventory_count: number
    sub_category: ISubCategoryActive
    category: ICategoryActive
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