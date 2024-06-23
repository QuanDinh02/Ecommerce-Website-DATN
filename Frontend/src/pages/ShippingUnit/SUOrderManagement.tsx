import { Outlet } from "react-router-dom";
import './SUOrderStatus.scss';

const SUOrderManagement = () => {
    return (
        <div className="su-order-management-container py-4 px-5 bg-white">
            <Outlet />
        </div>
    )
}

export default SUOrderManagement;