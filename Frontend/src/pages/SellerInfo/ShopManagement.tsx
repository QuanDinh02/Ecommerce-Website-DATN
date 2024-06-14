import { Outlet } from "react-router-dom";

const ShopManagement = () => {

    return (
        <div className="shop-management-container h-full">
            <Outlet />
        </div>
    )
}

export default ShopManagement;