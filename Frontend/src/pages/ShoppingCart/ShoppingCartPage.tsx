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

const tableHeaders = [
    "", "TÊN SẢN PHẨM", "GIÁ", "SỐ LƯỢNG", "THÀNH TIỀN", ""
];

const ShoppingCartPage = () => {

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

    const handleProductAmount = (num: any, id: number) => {
        setCartItems(draft => {
            draft.forEach(item => {
                if (item.id === id && !isNaN(num) && num > 0) {
                    item.amount = +num;
                }
            })
        })

    }

    const hanldeRemoveFavoriteItem = () => {
        successToast1("Xóa thành công");
    }

    return (
        <div className="shopping-cart-container">
            <div className="shopping-cart__breadcrumb border-b border-gray-300 bg-[#F1F1F1]">
                <div className="breadcrumb-content w-[80rem] mx-auto px-[30px] py-4 flex items-center gap-2">
                    <div onClick={() => navigate("/")} className="cursor-pointer hover:underline">Trang chủ</div>
                    <MdOutlineArrowForwardIos />
                    <div className="font-medium cursor-pointer hover:underline">Giỏ hàng</div>
                </div>
            </div>
            <div className="shopping-cart__content mt-16 mb-24">
                <div className="main main w-[80rem] mx-auto px-[30px]">
                    <div className="title text-4xl text-center font-medium mb-20">Giỏ hàng</div>
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
                                                    <div className="cursor-pointer text-blue-500 hover:text-[#FCB800] duration-300 w-80 line-clamp-2 mb-2">{item.name}</div>
                                                    <div>Shop: <span className="text-blue-600 font-medium cursor-pointer hover:underline">{item.shop_name}</span></div>
                                                </td>
                                                <td className="py-3 px-2">{CurrencyFormat(item.price)}</td>
                                                <td className="py-3 px-2">
                                                    <div className="w-28 h-11 border border-gray-300 flex items-center hover:border-black duration-300 px-2">
                                                        <FiMinus className="w-6 h-6 cursor-pointer text-gray-400 hover:text-black duration-300" onClick={(e) => handleProductAmount(item.amount - 1, item.id)} />
                                                        <input type="text" className="w-1/2 text-center outline-none select-none" value={item.amount} onChange={(e) => handleProductAmount(e.target.value, item.id)} />
                                                        <FiPlus className="w-6 h-6 cursor-pointer text-gray-400 hover:text-black duration-300" onClick={(e) => handleProductAmount(item.amount + 1, item.id)} />
                                                    </div>
                                                </td>
                                                <td className="py-3 px-2">{CurrencyFormat(item.price * item.amount)}</td>
                                                <td className="py-3 px-2"><VscTrash className="text-gray-600 hover:text-red-500 w-6 h-6 cursor-pointer" onClick={() => hanldeRemoveFavoriteItem()} /></td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                    <div className="shopping-cart-payment">
                        <div>
                            <div className="text-lg">Phiếu giảm giá</div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCartPage;