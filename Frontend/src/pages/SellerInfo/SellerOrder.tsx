import { Outlet } from "react-router-dom";
import './SellerOrder/SellerOrder.scss';

const SellerOrder = () => {

    return (
        <div className="order-managment-container">
            <Outlet />
        </div>
    )
}

export default SellerOrder;