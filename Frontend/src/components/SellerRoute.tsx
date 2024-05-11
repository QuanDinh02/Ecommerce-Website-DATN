import {  UserLogin } from "@/redux/actions/action";
import { fetchAccount } from "@/services/userService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from 'lodash';

import React from "react";

const SellerRoute = ({ children }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchAccountInfo = async () => {
        let result: any = await fetchAccount();
        if (result && !_.isEmpty(result.DT)) {

            let userData = result.DT;

            if (userData.role === "seller") {
                let data = {
                    isAuthenticated: userData.isAuthenticated,
                    account: {
                        id: userData.id,
                        username: userData.username,
                        role: userData.role,
                        seller_id: userData.seller_id
                    }
                }
                dispatch(UserLogin(data));
            } else {
                navigate("/");
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

export default SellerRoute;