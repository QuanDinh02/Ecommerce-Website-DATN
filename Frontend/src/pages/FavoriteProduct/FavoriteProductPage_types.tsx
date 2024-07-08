export interface IProductInfo {
    id: number
    name: string
    quantity: number
    image: string
}

export interface IShopInfo {
    id: number
    name: string
}

export interface IWishList {
    id: number
    price: number
    product_info: IProductInfo
    shop_info: IShopInfo
}

export interface INewWishListItem {
    productID: number
    customerID: number
}