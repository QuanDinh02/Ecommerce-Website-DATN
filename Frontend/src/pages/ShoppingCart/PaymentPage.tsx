
import { CurrencyFormat } from "@/utils/numberFormat";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import React from "react";
import { ICartItem } from "./ShoppingCartPage";
import { RootState } from "@/redux/reducer/rootReducer";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import { PiImageThin } from "react-icons/pi";
import _ from 'lodash';
import { useImmer } from "use-immer";
import { getCustomerOrderAddress } from "@/services/customerService";
import { createNewOrder } from "@/services/orderServices";
import { successToast1 } from "@/components/Toast/Toast";
import Button from "@/components/Button";
import { deleteAllCartItem } from "@/services/cartItemService";

const tableHeaders = [
    "", "TÊN SẢN PHẨM", "GIÁ", "SỐ LƯỢNG", "THÀNH TIỀN"
];

interface CustomerOrderAddress {
    fullname: string
    address: string
    mobile: string
    note: string
    other_address: string
}

interface ICustomerAccount {
    customer_id: number
    username: string
    role: string
}

const PaymentPage = () => {

    const navigate = useNavigate();

    const [dataLoading, setDataLoading] = React.useState<boolean>(true);

    const cartItemList: ICartItem[] = useSelector<RootState, ICartItem[]>(state => state.cartItem.cart_item_list);
    const cartItemCount: number = useSelector<RootState, number>(state => state.cartItem.cart_item_count);

    const account: ICustomerAccount = useSelector<RootState, ICustomerAccount>(state => state.user.account);
    const isAuthenticated = useSelector<RootState, boolean>(state => state.user.isAuthenticated);

    const [cartItemTotal, setCartItemTotal] = React.useState<number>(0);
    const [orderCost, setOrderCost] = React.useState<number>(0);
    const [transportedFee, setTransportedFee] = React.useState<number>(20000);
    const [discountValue, setDiscountValue] = React.useState<number>(0);

    const [orderAddress, setOrderAddress] = useImmer<CustomerOrderAddress>({
        fullname: "",
        mobile: "",
        address: "",
        note: "",
        other_address: ""

    });

    const requiredTag = () => {
        return (
            <span className='text-red-500 font-medium'>(*)</span>
        )
    }

    const handleProductDetailNavigation = (product_id: number) => {
        navigate("/product-detail", { state: { product_id: product_id } });
    }

    const handleOnChange = (field: string, value: string) => {
        setOrderAddress(draft => {
            draft[field] = value;
        });
    }

    const fetchCustomerOrderAddress = async (customer_id: number) => {
        let response: any = await getCustomerOrderAddress(+customer_id);

        if (response) {
            setOrderAddress(draft => {
                draft.fullname = response.fullname;
                draft.mobile = response.mobile;
                draft.address = `${response.street}, Ward ${response.ward}, ${response.district} District, ${response.province}, ${response.country}`;
            });
        }
    }

    const handlePayment = async () => {

        let orderItems = cartItemList.map(item => {

            let order_item = {
                productID: item.product_info.id,
                quantity: item.quantity,
                price: item.price
            }

            return order_item;
        })

        let response: any = await createNewOrder({
            status: 0,
            shipFee: transportedFee,
            totalPrice: orderCost,
            shipMethod: 0,
            address: orderAddress.other_address === "" ? orderAddress.address : orderAddress.other_address,
            note: orderAddress.note,
            customerID: account.customer_id,
            order_items: orderItems
        });

        if (response && response.EC === 0) {
            let result = await deleteAllCartItem(account.customer_id);
            if (result && result.EC === 0) {
                successToast1(response.EM);
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
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
        if (account && isAuthenticated) {
            fetchCustomerOrderAddress(account.customer_id);
        }
    }, [isAuthenticated]);

    React.useEffect(() => {
        let cartItemValueSum = _.sumBy(cartItemList, function (o: ICartItem) { return o.price * o.quantity; });
        setCartItemTotal(cartItemValueSum);
        setOrderCost(cartItemValueSum + transportedFee);
    }, [cartItemList]);


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
                        <div className="main main w-[80rem] mx-auto px-[30px]">
                            <div className="title text-4xl text-center font-medium mb-20">Thanh toán</div>
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
                                                                    {item.product_info.image ?
                                                                        <img src={`data:image/jpeg;base64,${item.product_info.image}`} alt='' className="w-32 h-32 cursor-pointer my-4" />
                                                                        :
                                                                        <PiImageThin className="w-32 h-32 cursor-pointer" />
                                                                    }
                                                                </td>
                                                                <td className="py-3 px-2">
                                                                    <div className="cursor-pointer text-blue-500 hover:text-[#FCB800] duration-300 w-80 line-clamp-2 mb-2" onClick={() => handleProductDetailNavigation(item.product_info.id)}>{item.product_info.name}</div>
                                                                    <div>Shop: <span className="text-blue-600 font-medium cursor-pointer hover:underline">{item.shop_info.name}</span></div>
                                                                </td>
                                                                <td className="py-3 px-2">{CurrencyFormat(item.price)}</td>
                                                                <td className="py-3 px-2"><div>{item.quantity}</div></td>
                                                                <td className="py-3 px-2">{CurrencyFormat(item.price * item.quantity)}</td>
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
                                                <input type="text" className="outline-none w-[40rem] h-12 border border-gray-400 px-3 cursor-not-allowed" value={orderAddress.fullname} disabled />
                                            </div>
                                            <div className="mb-4">
                                                <div className="mb-2">Số điện thoại {requiredTag()}</div>
                                                <input type="text" className="outline-none w-[40rem] h-12 border border-gray-400 px-3 cursor-not-allowed" value={orderAddress.mobile} disabled />
                                            </div>
                                            <div className="mb-4">
                                                <div className="mb-2">Địa chỉ {requiredTag()}</div>
                                                <input type="text" className="outline-none w-[40rem] h-12 border border-gray-400 px-3 cursor-not-allowed" value={orderAddress.address} disabled />
                                            </div>
                                            <div className="mb-4">
                                                <div className="mb-2">Địa chỉ giao hàng (nếu khác với địa chỉ hiện có)</div>
                                                <input onChange={(e) => handleOnChange('other_address', e.target.value)} type="text" className="outline-none w-[40rem] h-12 border border-gray-400 px-3" />
                                            </div>
                                            <div className="mb-4">
                                                <div className="mb-2">Ghi chú</div>
                                                <textarea onChange={(e) => handleOnChange('note', e.target.value)} className="outline-none w-[40rem] h-12 border border-gray-400 px-3 py-2 h-40" placeholder="Ghi chú cho đơn hàng" />
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
                                                        cartItemList && cartItemList.length > 0 &&
                                                        cartItemList.map((item, index) => {
                                                            return (
                                                                <div className="flex items-center justify-between mb-2 text-sm">
                                                                    <div className="flex items-center w-2/3">
                                                                        <div className="w-60 w-4/5">{item.product_info.name}</div>
                                                                        <div className="font-bold w-1/5">x{item.quantity}</div>
                                                                    </div>
                                                                    <div className="w-1/3 text-end">{CurrencyFormat(item.price * item.quantity)}</div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>

                                                <div className="flex items-center justify-between pb-5 border-b border-gray-300 mb-4 font-medium">
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
                                            <Button styles="bg-[#FCB800] px-5 py-3 w-full mt-6 cursor-pointer hover:opacity-80 text-center font-bold" OnClick={() => handlePayment()}>Thanh toán</Button>
                                        </div>
                                    </div>
                                </>
                                :
                                <div className="w-full text-gray-500 text-center text-lg border border-gray-300 bg-gray-100 py-2">Chưa có sản phẩm cần thanh toán !</div>
                            }

                        </div>
                }
            </div>
        </div>
    )
}

export default PaymentPage;