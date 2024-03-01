
import { CurrencyFormat } from "@/utils/numberFormat";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { VscTrash } from "react-icons/vsc";
import Item7 from '../../assets/img/homepage/item7.svg';
import Item8 from '../../assets/img/homepage/item8.svg';
import Item9 from '../../assets/img/homepage/item9.svg';
import { useImmer } from "use-immer";
import { FiMinus, FiPlus } from "react-icons/fi";
import { successToast1 } from "@/components/Toast/Toast";
import React from "react";

const tableHeaders = [
    "", "TÊN SẢN PHẨM", "GIÁ", "SỐ LƯỢNG", "THÀNH TIỀN"
];

const PaymentPage = () => {

    const navigate = useNavigate();

    const [cartItems, setCartItems] = useImmer([
        {
            id: 1,
            image: Item7,
            name: "Xbox One Wireless Controller Black Color",
            shop_name: "Shop Pro",
            price: 199000,
            amount: 1
        },
        {
            id: 2,
            image: Item8,
            name: "Sound Intone I65 Earphone White Version",
            shop_name: "Shop Pro",
            price: 199000,
            amount: 1
        },
        {
            id: 3,
            image: Item9,
            name: "Samsung Gear VR Virtual Reality Headset",
            shop_name: "Shop Pro",
            price: 199000,
            amount: 1
        }
    ]);

    const requiredTag = () => {
        return (
            <span className='text-red-500 font-medium'>(*)</span>
        )
    }

    React.useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="payment-container">
            <div className="payment__breadcrumb border-b border-gray-300 bg-[#F1F1F1]">
                <div className="breadcrumb-content w-[80rem] mx-auto px-[30px] py-4 flex items-center gap-2">
                    <div onClick={() => navigate("/")} className="cursor-pointer hover:underline">Trang chủ</div>
                    <MdOutlineArrowForwardIos />
                    <div className="font-medium cursor-pointer hover:underline">Thanh toán</div>
                </div>
            </div>
            <div className="payment__content mt-16 mb-24">
                <div className="main main w-[80rem] mx-auto px-[30px]">
                    <div className="title text-4xl text-center font-medium mb-20">Thanh toán</div>
                    <div className="w-full">
                        <table className="table-auto w-full bg-white">
                            <thead>
                                <tr className="bg-[#F2F2F2]">
                                    {tableHeaders && tableHeaders.map((item, index) => {
                                        return (
                                            <th className="text-left py-3 px-2 font-medium text-sm" key={`header-field-${index}`}>{item}</th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems && cartItems.length > 0 &&
                                    cartItems.map((item, index) => {
                                        return (
                                            <tr key={`cart-item-${index}`} className="border-b border-gray-300">
                                                <td className="py-3 px-2"><img src={item.image} alt="" className="w-32 h-32" /></td>
                                                <td className="py-3 px-2">
                                                    <div className="cursor-pointer text-blue-500 hover:text-[#FCB800] duration-300 w-80 line-clamp-2 mb-2" onClick={() => navigate("/product-detail")}>{item.name}</div>
                                                    <div>Shop: <span className="text-blue-600 font-medium cursor-pointer hover:underline">{item.shop_name}</span></div>
                                                </td>
                                                <td className="py-3 px-2">{CurrencyFormat(item.price)}</td>
                                                <td className="py-3 px-2">
                                                    <div>
                                                        {item.amount}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-2">{CurrencyFormat(item.price * item.amount)}</td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                    <div className="payment-order- mt-20 flex justify-between">
                        <div>
                            <div className="text-lg tracking-wide font-medium mb-6">Thông tin giao hàng</div>
                            <div className="mb-4">
                                <div className="mb-2">Họ và Tên {requiredTag()}</div>
                                <input type="text" className="outline-none w-[40rem] h-12 border border-gray-400 px-3" placeholder="Nhập họ và tên" />
                            </div>
                            <div className="mb-4">
                                <div className="mb-2">Số điện thoại {requiredTag()}</div>
                                <input type="text" className="outline-none w-[40rem] h-12 border border-gray-400 px-3" placeholder="Nhập họ và tên" />
                            </div>
                            <div className="mb-4">
                                <div className="mb-2">Địa chỉ {requiredTag()}</div>
                                <input type="text" className="outline-none w-[40rem] h-12 border border-gray-400 px-3" placeholder="Nhập họ và tên" />
                            </div>
                            <div className="mb-4">
                                <div className="mb-2">Địa chỉ giao hàng (nếu khác với địa chỉ hiện có)</div>
                                <input type="text" className="outline-none w-[40rem] h-12 border border-gray-400 px-3" placeholder="Nhập họ và tên" />
                            </div>
                            <div className="mb-4">
                                <div className="mb-2">Ghi chú</div>
                                <textarea className="outline-none w-[40rem] h-12 border border-gray-400 px-3 py-2 h-40" placeholder="Ghi chú cho đơn hàng" />
                            </div>
                        </div>
                        <div>
                            <div className="text-lg tracking-wide font-medium">Thông tin đơn hàng</div>
                            <div className="w-[23rem] bg-gray-100 border border-gray-400 px-8 py-5 mt-6">
                                <div className="flex items-center justify-between pb-2 border-b border-gray-300 mb-4 font-medium">
                                    <div>SẢN PHẨM</div>
                                    <div>THÀNH TIỀN</div>
                                </div>
                                <div className="pb-2 border-b border-gray-300 mb-4">
                                    {
                                        cartItems && cartItems.length > 0 &&
                                        cartItems.map((item, index) => {
                                            return (
                                                <div className="flex justify-between mb-2 text-sm">
                                                    <div className="w-60 line-clamp-2">{item.name}</div>
                                                    <div>{CurrencyFormat(item.price)}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                <div className="flex items-center justify-between pb-5 border-b border-gray-300 mb-4 font-medium">
                                    <div>Tổng</div>
                                    <div>{CurrencyFormat(597000)}</div>
                                </div>
                                <div className="flex items-center justify-between pb-2 border-b border-gray-300 text-sm pb-10 mb-2">
                                    <div>Phí vận chuyển</div>
                                    <div>{CurrencyFormat(20000)}</div>
                                </div>
                                <div className="flex items-center justify-between pb-2 border-b border-gray-300 text-sm pb-10 mb-6">
                                    <div>Giảm giá</div>
                                    <div>-{CurrencyFormat(0)}</div>
                                </div>
                                <div className="flex items-center justify-between text-lg font-medium">
                                    <div>Tổng cộng</div>
                                    <div className="text-red-500 text-xl font-bold">{CurrencyFormat(617000)}</div>
                                </div>
                            </div>
                            <div className="bg-[#FCB800] px-5 py-3 w-full mt-6 cursor-pointer hover:opacity-80 text-center font-bold">Thanh toán</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentPage;