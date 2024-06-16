import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const CustomerAccount = () => {

    const navigate = useNavigate();

    React.useEffect(() => {
        navigate("/customer-info/account/info");
    }, []);
    return (
        <div className="w-full py-5 px-10 bg-white h-full">
            <Outlet />
        </div>
    )
}

export default CustomerAccount;