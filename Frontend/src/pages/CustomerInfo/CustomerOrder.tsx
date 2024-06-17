import { Outlet } from "react-router-dom";

const CustomerOrder = () => {

    return (
        <div className="customer-order-container">
            <div className="customer-order__list">
                <Outlet />
            </div>
        </div>
    )
}

export default CustomerOrder;