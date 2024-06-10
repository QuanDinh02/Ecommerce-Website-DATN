import { Outlet } from "react-router-dom";

const SellerProduct = () => {

    return (
        <div className="seller-order-container h-full">
            <Outlet />
        </div>
    )
}

export default SellerProduct;