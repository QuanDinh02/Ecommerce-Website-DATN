import { useNavigate, useRouteError } from "react-router-dom";
import FoxImage from '../../src/assets/img/error_page/fox.jpg';

const ErrorPage = () => {
    const error: any = useRouteError();
    const navigate = useNavigate();
    console.error(error);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex items-center gap-x-20">
                <div className="w-80 ">
                    <img src={FoxImage} alt="" className="w-full h-full"/>
                </div>
                <div>
                    <div className="text-7xl font-bold text-[#FCB800] mb-2">404</div>
                    <div className="text-4xl font-bold text-gray-800">Page Not Found!</div>
                    <div className="text-lg w-[16.25rem] mt-4 mb-6 text-justify">Xin lỗi, trang bạn muốn truy cập hiện không có. Vui lòng quay lại trang chủ!</div>
                    <div className="w-[16.25rem] py-3 rounded bg-[#FCB800] font-medium text-center cursor-pointer hover:opacity-80" onClick={() => navigate("/")}>TRANG CHỦ</div>
                </div>
            </div>

        </div>
    );
}

export default ErrorPage;