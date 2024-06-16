import { Outlet } from "react-router-dom";

const VoucherPage = () => {
    return (
        <div className="w-full py-5 px-10 bg-white h-full">
            <Outlet />
        </div>
    )
}

export default VoucherPage;