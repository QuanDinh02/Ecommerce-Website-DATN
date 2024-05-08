import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const CustomerAccount = () => {

    const navigate = useNavigate();

    React.useEffect(() => {
        navigate("/customer-info/account/info");
    },[]);
    return (
        <Outlet />
    )
}

export default CustomerAccount;