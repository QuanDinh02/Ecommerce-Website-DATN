import { ICartItem } from "@/pages/Product/ProductDetailPage_types";
import { AddCartItem, AddWishListItem, UserLogin } from "@/redux/actions/action";
import { fetchAccount } from "@/services/userService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from 'lodash';
import { fetchCartItem } from "@/services/cartItemService";
import { fetchWishList } from "@/services/wishListService";
import { IWishList } from "@/pages/FavoriteProduct/FavoriteProductPage_types";
import React from "react";

const CustomerRoute = ({ children }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchAccountInfo = async () => {
        let result: any = await fetchAccount();
        if (result && !_.isEmpty(result.DT)) {

            let userData = result.DT;

            if (userData.role === "customer") {
                let data = {
                    isAuthenticated: userData.isAuthenticated,
                    account: {
                        id: userData.id,
                        username: userData.username,
                        role: userData.role,
                        customer_id: userData.customer_id
                    }
                }

                dispatch(UserLogin(data));

                let cartItemsData: any = await fetchCartItem(userData.customer_id);
                if (cartItemsData && !_.isEmpty(cartItemsData.DT)) {
                    let cart_item_data: ICartItem[] = cartItemsData.DT;
                    let count = cart_item_data.length;

                    dispatch(AddCartItem({
                        cart_items: cart_item_data,
                        count: count
                    }));
                }

                let wishListData: any = await fetchWishList(userData.customer_id);
                if (wishListData && !_.isEmpty(wishListData.DT)) {
                    let wish_list_data: IWishList[] = wishListData.DT;
                    let count = wish_list_data.length;

                    dispatch(AddWishListItem({
                        wish_list_item: wish_list_data,
                        wish_list_count: count
                    }));
                }

            } else {
                let data = {
                    isAuthenticated: userData.isAuthenticated,
                    account: {
                        id: userData.id,
                        username: userData.username,
                        role: userData.role
                    }
                }
                dispatch(UserLogin(data));
            }
        } else {
            navigate("/login");
        }
    }

    React.useEffect(() => {
        fetchAccountInfo();
    }, []);

    return <>{children}</>
}

export default CustomerRoute;