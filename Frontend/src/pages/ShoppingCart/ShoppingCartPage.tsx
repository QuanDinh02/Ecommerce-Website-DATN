import { CurrencyFormat } from "@/utils/numberFormat";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { VscTrash } from "react-icons/vsc";
import { FiMinus, FiPlus } from "react-icons/fi";
import { errorToast1, successToast1 } from "@/components/Toast/Toast";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from '@/redux/reducer/rootReducer';
import { TailSpin } from "react-loader-spinner";
import _ from 'lodash';
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { useDispatch } from "react-redux";
import { DeleteCartItem, UpdateCartItem } from "@/redux/actions/action";
import { deleteCartItem, updateCartItem } from "@/services/cartItemService";
import LoadImageS3 from "@/components/LoadImageS3";
export interface ICartItemInfo {
    id: number
    name: string
    image: string
}

export interface ICartItemShopInfo {
    id: number
    name: string
}

export interface ICartItem {
    id: number
    quantity: number
    price: number
    product_info: ICartItemInfo
    shop_info: ICartItemShopInfo
}

const tableHeaders = [
    "", "TÊN SẢN PHẨM", "GIÁ", "SỐ LƯỢNG", "THÀNH TIỀN", ""
];

const ShoppingCartPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [dataLoading, setDataLoading] = React.useState<boolean>(true);

    const cartItemList: ICartItem[] = useSelector<RootState, ICartItem[]>(state => state.cartItem.cart_item_list);
    const cartItemCount: number = useSelector<RootState, number>(state => state.cartItem.cart_item_count);

    const [cartItemTotal, setCartItemTotal] = React.useState<number>(0);
    const [transportedFee, setTransportedFee] = React.useState<number>(20000);
    const [orderCost, setOrderCost] = React.useState<number>(0);
    const [discountValue, setDiscountValue] = React.useState<number>(0);

    const [showDeleteBox, setShowDeleteBox] = React.useState<boolean>(false);
    const [deleteCartItemId, setDeleteCartItemId] = React.useState<number>(0);

    const handleDeleteCartItem = async () => {
        let delete_id = deleteCartItemId;
        let result = await deleteCartItem(delete_id);
        if (result && result.EC === 0) {
            successToast1(result.EM);
            dispatch(DeleteCartItem({ id: delete_id }));
            setDeleteCartItemId(0);
            setShowDeleteBox(false);
        }
    }

    const handleProductDetailNavigation = (product_id: number) => {
        navigate({
            pathname: "/product",
            search: `?id=${product_id}`,
        });
    }

    const handleUpdateCartItem = async (id: number, quantity: number) => {
        if (quantity > 0) {
            let result = await updateCartItem({
                id: id,
                quantity: quantity
            });

            if (result) {
                if (result.EC === 0) {
                    successToast1(result.EM);
                    dispatch(UpdateCartItem({
                        id: id,
                        quantity: quantity
                    }))
                } else {
                    errorToast1(result.EM);
                }
            }
        }
    }

    React.useEffect(() => {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }

        let cartItemValueSum = _.sumBy(cartItemList, function (o: ICartItem) { return o.price * o.quantity; });

        setCartItemTotal(cartItemValueSum);
        setOrderCost(cartItemValueSum + transportedFee);

        setTimeout(() => {
            setDataLoading(false);
        }, 1000);

    }, []);

    React.useEffect(() => {
        let cartItemValueSum = _.sumBy(cartItemList, function (o: ICartItem) { return o.price * o.quantity; });
        setCartItemTotal(cartItemValueSum);
        setOrderCost(cartItemValueSum + transportedFee);
    }, [cartItemList]);

    return (

        <>
            <div className="shopping-cart-container">
                {
                    dataLoading ?
                        <div className="flex items-center justify-center w-full h-screen">
                            <TailSpin
                                height="80"
                                width="80"
                                color="#FCB800"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass="flex items-center justify-center tail-spin"
                                visible={true}
                            />
                        </div>
                        :
                        <>
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
                                    {cartItemCount > 0 ?
                                        <>
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
                                                        {cartItemList && cartItemList.length > 0 &&
                                                            cartItemList.map((item, index) => {
                                                                return (
                                                                    <tr key={`cart-item-${index}`} className="border-b border-gray-300">
                                                                        <td>
                                                                            <LoadImageS3 img_style="w-32 h-32" img_url={item.product_info.image}/>
                                                                        </td>
                                                                        <td className="py-3 px-2">
                                                                            <div className="cursor-pointer text-blue-500 hover:text-[#FCB800] duration-300 w-80 line-clamp-2 mb-2" onClick={() => handleProductDetailNavigation(item.product_info.id)}>{item.product_info.name}</div>
                                                                            <div>Shop: <span className="text-blue-600 font-medium cursor-pointer hover:underline">{item.shop_info.name}</span></div>
                                                                        </td>
                                                                        <td className="py-3 px-2">{CurrencyFormat(item.price)}</td>
                                                                        <td className="py-3 px-2">
                                                                            <div className="w-28 h-11 border border-gray-300 flex items-center hover:border-black duration-300 px-2">
                                                                                <FiMinus className="w-6 h-6 cursor-pointer text-gray-400 hover:text-black duration-300" onClick={() => handleUpdateCartItem(item.id, item.quantity - 1)} />
                                                                                <input type="text" className="w-1/2 text-center outline-none select-none" value={item.quantity} onChange={(e) => handleUpdateCartItem(item.id, +e.target.value)} />
                                                                                <FiPlus className="w-6 h-6 cursor-pointer text-gray-400 hover:text-black duration-300" onClick={() => handleUpdateCartItem(item.id, item.quantity + 1)} />
                                                                            </div>
                                                                        </td>
                                                                        <td className="py-3 px-2">{CurrencyFormat(item.price * item.quantity)}</td>
                                                                        <td className="py-3 px-2"><VscTrash className="text-gray-600 hover:text-red-500 w-6 h-6 cursor-pointer" onClick={() => {
                                                                            setDeleteCartItemId(item.id);
                                                                            setShowDeleteBox(true);
                                                                        }} /></td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }

                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="shopping-cart-payment mt-20 flex justify-between">
                                                <div>
                                                    <div className="text-lg tracking-wide">Phiếu giảm giá</div>
                                                    <div className="w-[23rem] border border-gray-400 h-12 mt-6 px-5 flex items-center">
                                                        <input type="text" className="outline-none w-full" placeholder="Nhập mã giảm giá" />
                                                    </div>
                                                    <div className="bg-[#FCB800] px-5 py-3 w-fit mt-6 font-medium cursor-pointer hover:opacity-80">Áp dụng mã giảm giá</div>
                                                </div>
                                                <div>
                                                    <div className="w-[23rem] bg-gray-100 border border-gray-400 px-8 py-5">
                                                        <div className="flex items-center justify-between pb-5 border-b border-gray-300 mb-4">
                                                            <div>Tổng</div>
                                                            <div>{CurrencyFormat(cartItemTotal)}</div>
                                                        </div>
                                                        <div className="flex items-center justify-between pb-2 border-b border-gray-300 text-sm pb-10 mb-2">
                                                            <div>Phí vận chuyển</div>
                                                            <div>{CurrencyFormat(transportedFee)}</div>
                                                        </div>
                                                        <div className="flex items-center justify-between pb-2 border-b border-gray-300 text-sm pb-10 mb-6">
                                                            <div>Giảm giá</div>
                                                            <div>-{CurrencyFormat(discountValue)}</div>
                                                        </div>
                                                        <div className="flex items-center justify-between text-lg font-medium">
                                                            <div>Tổng cộng</div>
                                                            <div className="text-red-500 text-xl font-bold">{CurrencyFormat(orderCost)}</div>
                                                        </div>
                                                    </div>
                                                    <div className="bg-[#FCB800] px-5 py-3 w-full mt-6 cursor-pointer hover:opacity-80 text-center font-bold" onClick={() => navigate("/payment")}>Tiến hành thanh toán</div>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <div className="w-full text-gray-500 text-center text-lg border border-gray-300 bg-gray-100 py-2">Chưa có sản phẩm trong giỏ hàng !</div>
                                    }

                                </div>
                            </div>
                        </>
                }

            </div>
            <Modal show={showDeleteBox} setShow={setShowDeleteBox} size="delete-confirmation-box">
                <div className="delete-confirmation-box w-full h-full relative flex flex-col justify-between">
                    <div className="text-xl mt-2">Bạn muốn xóa sản phẩm này khỏi giỏ hàng ?</div>
                    <div className="flex items-center justify-end gap-x-2">
                        <Button styles="rounded-[4px] px-8 py-2 text-black bg-gray-200 hover:bg-gray-300 cursor-pointer" OnClick={() => setShowDeleteBox(false)}>Hủy</Button>
                        <Button styles="rounded-[4px] px-8 py-2 bg-red-500 text-white hover:bg-red-600 cursor-pointer" OnClick={() => handleDeleteCartItem()}>Xóa</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ShoppingCartPage;