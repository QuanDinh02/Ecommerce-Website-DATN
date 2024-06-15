
import { CurrencyFormat } from "@/utils/numberFormat";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import React from "react";
import { ICartItem } from "./ShoppingCartPage";
import { RootState } from "@/redux/reducer/rootReducer";
import { useSelector } from "react-redux";
import { RotatingLines, TailSpin } from "react-loader-spinner";
import _ from 'lodash';
import { useImmer } from "use-immer";
import { getCustomerOrderAddress } from "@/services/customerService";
import { createNewOrder } from "@/services/orderServices";
import { successToast1 } from "@/components/Toast/Toast";
import Button from "@/components/Button";
import { deleteAllCartItem } from "@/services/cartItemService";
import { FaRegCircleCheck } from "react-icons/fa6";

const STEP = [
    {
        id: 1,
        label: "Địa Chỉ Giao Hàng"
    },
    {
        id: 2,
        label: "Thanh Toán & Đặt Mua"
    },
    {
        id: 3,
        label: "Hoàn Tất"
    }
]

const SHIPPING_METHOD = [
    {
        id: 1,
        label: "Giao hàng tiêu chuẩn",
        value: 0,
        isSelected: true
    },
    {
        id: 2,
        label: "Giao hàng tiết kiệm",
        value: 10000,
        isSelected: false
    },
    {
        id: 3,
        label: "Giao hàng hỏa tốc",
        value: 30000,
        isSelected: false
    },
]

const PAYMENT_METHOD = [
    {
        id: 1,
        label: "Thanh toán tiền mặt khi nhận hàng",
        isSelected: true
    },
    {
        id: 2,
        label: "Thanh toán bằng thẻ quốc tế Visa, Masterm, JCB",
        isSelected: false
    },
    {
        id: 3,
        label: "Thẻ ATM nội địa/ Internet Banking",
        isSelected: false
    },
]

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

const SuccessAnnouncement = () => {

    const navigate = useNavigate();

    return (
        <div className="border border-gray-200 shadow py-6 w-fit px-12">
            <div className="announcement__main flex flex-col gap-y-1 duration-800 mb-4">
                <div className="w-full flex item-center justify-center"><FaRegCircleCheck className="w-16 h-16 text-[#6acd03]" /></div>
            </div>
            <div className="announcement__title text-black text-xl mb-4 text-center text-gray-600 font-medium">Cám ơn bạn đã mua hàng tại FoxMart !</div>
            <div className="text-center mb-2">Mã đơn hàng của bạn:</div>
            <div className="flex items-center justify-center mb-5">
                <div className="bg-[#6acd03] text-white px-5 py-2 w-32 text-center">570774532</div>
            </div>
            <div className="text-center">Bạn có thể xem lại <span className="text-blue-600 hover:underline cursor-pointer">đơn hàng của tôi</span></div>
        </div>
    )
}

const PaymentPage = () => {

    const navigate = useNavigate();

    const [dataLoading, setDataLoading] = React.useState<boolean>(true);

    const [paymentStep, setPaymentStep] = React.useState<number>(1);
    const [shippingMethod, setShippingMethod] = React.useState<number>(1);
    const [paymentMethod, setPaymentMethod] = React.useState<number>(1);

    const [createOrder, setCreateOrder] = React.useState<boolean>(false);

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
        navigate({
            pathname: "/product",
            search: `?id=${product_id}`,
        });
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

    const handleOrderPayment = async () => {

        window.scrollTo({ top: 0, left: 0 });

        setPaymentStep(paymentStep + 1);
        // let orderItems = cartItemList.map(item => {

        //     let order_item = {
        //         productID: item.product_info.id,
        //         quantity: item.quantity,
        //         price: item.price
        //     }

        //     return order_item;
        // })

        // let response: any = await createNewOrder({
        //     status: 0,
        //     shipFee: transportedFee,
        //     totalPrice: orderCost,
        //     shipMethod: 0,
        //     address: orderAddress.other_address === "" ? orderAddress.address : orderAddress.other_address,
        //     note: orderAddress.note,
        //     customerID: account.customer_id,
        //     order_items: orderItems
        // });

        // if (response && response.EC === 0) {
        //     let result = await deleteAllCartItem(account.customer_id);
        //     if (result && result.EC === 0) {
        //         successToast1(response.EM);
        //         setTimeout(() => {
        //             window.location.reload();
        //         }, 1500);
        //     }
        // }
    }

    const handleSelectOrderAddress = () => {
        setPaymentStep(paymentStep + 1);
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

    React.useEffect(() => {
        if(paymentStep === 3) {
            setCreateOrder(true);
            setTimeout(() => {
                setCreateOrder(false);
            },2000);
        }
    },[paymentStep]);

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
                            <div className="step-box flex items-center justify-center mb-10">
                                <div className="flex items-center">
                                    {
                                        STEP.map((step, index) => {
                                            if (step.id <= paymentStep) {
                                                return (
                                                    <>
                                                        {(index !== 0) &&
                                                            <div className="w-60 h-2 bg-[#FCB800]"></div>
                                                        }
                                                        <div className="relative">
                                                            <div className="w-8 h-8 border-2 border-[#FCB800] rounded-full flex items-center justify-center text-xl bg-[#FCB800] text-white">{step.id}</div>
                                                            <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 text-center text-gray-600 font-medium">{step.label}</div>
                                                        </div>
                                                    </>
                                                )
                                            }
                                            return (
                                                <>
                                                    {(index !== 0) &&
                                                        <div className="w-60 h-2 bg-gray-200"></div>
                                                    }
                                                    <div className="relative">
                                                        <div className="w-8 h-8 border-2 border-gray-200 rounded-full flex items-center justify-center text-xl">{step.id}</div>
                                                        <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 text-center text-gray-400 font-medium">{step.label}</div>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                    {/* <div className="w-8 h-8 border-2 border-gray-200 rounded-full flex items-center justify-center text-xl">1</div>
                                <div className="w-60 h-2 bg-gray-200"></div>
                                <div className="w-8 h-8 border-2 border-gray-200 rounded-full flex items-center justify-center text-xl">2</div>
                                <div className="w-60 h-2 bg-gray-200"></div>
                                <div className="w-8 h-8 border-2 border-gray-200 rounded-full flex items-center justify-center text-xl">3</div> */}
                                </div>
                            </div>
                            {
                                paymentStep === 1 &&
                                <div className="shipping-order-address">
                                    <div>
                                        <div className="text-lg tracking-wide font-medium">Địa chỉ giao hàng</div>
                                        <div className="my-6 text-gray-600 font-medium">Chọn địa chỉ giao hàng có sẵn của bạn bên dưới:</div>
                                        <div className="border border-gray-200 shadow rounded px-4 py-3 w-1/2">
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="text-lg font-bold">{orderAddress.fullname}</div>
                                                <div className="text-green-500 font-medium">Mặc định</div>
                                            </div>
                                            <div className="mb-1 text-gray-600">Địa chỉ: {orderAddress.address}</div>
                                            <div className="mb-1 text-gray-600">Điện thoại: {orderAddress.mobile}</div>
                                            <div className="w-full flex items-center gap-x-2 mt-2 ">
                                                <Button styles="px-3 py-2 border border-[#FCB800] bg-[#FCB800] w-fit rounded cursor-pointer hover:opacity-80" OnClick={() => handleSelectOrderAddress()} >Giao đến địa chỉ này</Button>
                                                <Button styles="px-4 py-2 rounded cursor-pointer border border-gray-300 hover:bg-gray-100 w-fit">Sửa</Button>
                                            </div>
                                        </div>
                                        <div className="mt-6 flex items-center gap-x-1">
                                            <span className="text-gray-600">Bạn muốn giao hàng đến địa chỉ khác?</span>
                                            <span className="font-medium text-blue-600 cursor-pointer hover:underline">Thêm địa chỉ giao hàng mới</span>
                                        </div>
                                        {/* <div className="mb-4">
                                        <div className="mb-2">Họ và Tên</div>
                                        <input type="text" className="outline-none w-[40rem] h-12 border border-gray-400 px-3 cursor-not-allowed" value={orderAddress.fullname} disabled />
                                    </div>
                                    <div className="mb-4">
                                        <div className="mb-2">Số điện thoại</div>
                                        <input type="text" className="outline-none w-[40rem] h-12 border border-gray-400 px-3 cursor-not-allowed" value={orderAddress.mobile} disabled />
                                    </div>
                                    <div className="mb-4">
                                        <div className="mb-2">Địa chỉ</div>
                                        <input type="text" className="outline-none w-[40rem] h-12 border border-gray-400 px-3 cursor-not-allowed" value={orderAddress.address} disabled />
                                    </div>
                                    <div className="mb-4">
                                        <div className="mb-2">Địa chỉ giao hàng (nếu khác với địa chỉ hiện có)</div>
                                        <input onChange={(e) => handleOnChange('other_address', e.target.value)} type="text" className="outline-none w-[40rem] h-12 border border-gray-400 px-3" />
                                    </div>
                                    <div className="mb-4">
                                        <div className="mb-2">Ghi chú</div>
                                        <textarea onChange={(e) => handleOnChange('note', e.target.value)} className="outline-none w-[40rem] h-12 border border-gray-400 px-3 py-2 h-40" placeholder="Ghi chú cho đơn hàng" />
                                    </div> */}
                                    </div>

                                </div>
                            }
                            {
                                paymentStep === 2 &&
                                <div>
                                    <div className="w-full flex gap-x-8">
                                        <div className="w-3/4">
                                            <div className="text-lg font-bold text-xl text-gray-600 mb-4">1. Chọn hình thức giao hàng</div>
                                            <div className="border border-gray-300 rounded p-4">
                                                <div className="flex flex-col gap-y-4">
                                                    {
                                                        SHIPPING_METHOD.map((item, index) => {
                                                            return (
                                                                <div className='flex items-center gap-x-6 mb-2 cursor-pointer w-fit' key={`shipping-method-select-${index}`} onClick={() => setShippingMethod(item.id)}>
                                                                    <div className={item.id === shippingMethod ? 'w-7 h-7 border-2 border-[#FCB800] rounded-full flex items-center justify-center' : 'w-7 h-7 border-2 border-gray-300 rounded-full'}>
                                                                        <div className={item.id === shippingMethod ? 'w-3 h-3 bg-[#FCB800] rounded-full' : ""}></div>
                                                                    </div>
                                                                    <div className="flex gap-x-2 items-center">
                                                                        {item.value === 0 && <span className="rounded-full px-4 py-1 text-white bg-green-500">Miễn phí</span>}{item.label}
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className="text-lg font-bold text-xl text-gray-600 my-4">2. Chọn hình thức thanh toán</div>
                                            <div className="border border-gray-300 rounded p-4">
                                                <div className="flex flex-col gap-y-4">
                                                    {
                                                        PAYMENT_METHOD.map((item, index) => {
                                                            return (
                                                                <div className='flex items-center gap-x-6 mb-2 cursor-pointer w-fit' key={`shipping-method-select-${index}`} onClick={() => setPaymentMethod(item.id)}>
                                                                    <div className={item.id === paymentMethod ? 'w-7 h-7 border-2 border-[#FCB800] rounded-full flex items-center justify-center' : 'w-7 h-7 border-2 border-gray-300 rounded-full'}>
                                                                        <div className={item.id === paymentMethod ? 'w-3 h-3 bg-[#FCB800] rounded-full' : ""}></div>
                                                                    </div>
                                                                    <div className="flex gap-x-2 items-center">
                                                                        {item.label}
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <Button styles="w-[20rem] bg-red-500 hover:bg-red-600 px-4 py-2 mt-6 cursor-pointer text-center font-bold text-lg text-white rounded" OnClick={() => handleOrderPayment()}>ĐẶT MUA</Button>
                                                <div className="text-sm text-gray-600 mt-2">(Xin vui lòng kiểm tra đơn hàng trước khi đặt mua)</div>
                                            </div>
                                        </div>
                                        <div className="w-1/4">
                                            <div className="w-[23rem] border border-gray-300 px-6 py-5 rounded mb-4">
                                                <div className="w-full flex items-center justify-between mb-4 border-b border-gray-200 pb-4">
                                                    <div className="text-lg text-lg">Địa chỉ giao hàng</div>
                                                    <Button styles="px-4 py-2 rounded cursor-pointer border border-gray-300 hover:bg-gray-100 w-fit">Sửa</Button>
                                                </div>
                                                <div className="text-lg font-bold mb-1">{orderAddress.fullname}</div>
                                                <div className="mb-1 text-gray-600">Địa chỉ: {orderAddress.address}</div>
                                                <div className="mb-1 text-gray-600">Điện thoại: {orderAddress.mobile}</div>
                                            </div>
                                            <div className="w-[23rem] border border-gray-300 px-6 py-5 rounded">
                                                <div className="w-full flex items-center justify-between mb-4 border-b border-gray-200 pb-4">
                                                    <div className="text-lg text-lg">Thông tin đơn hàng</div>
                                                    <Button styles="px-4 py-2 rounded cursor-pointer border border-gray-300 hover:bg-gray-100 w-fit">Sửa</Button>
                                                </div>
                                                <div className="flex items-center justify-between pb-2 mb-4">
                                                    <div>SẢN PHẨM</div>
                                                    <div>THÀNH TIỀN</div>
                                                </div>
                                                <div className="pb-2 border-b border-gray-300 mb-4">
                                                    {
                                                        cartItemList && cartItemList.length > 0 &&
                                                        cartItemList.map((item, index) => {
                                                            return (
                                                                <div className="flex items-center justify-between pt-2 mb-2 text-sm border-t border-gray-200">
                                                                    <div className="flex items-center w-2/3">
                                                                        <div className="w-60 w-4/5 text-blue-600">{item.product_info.name}</div>
                                                                        <div className="font-bold w-1/5">x{item.quantity}</div>
                                                                    </div>
                                                                    <div className="w-1/3 text-end">{CurrencyFormat(item.price * item.quantity)}</div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <div className="flex items-center justify-between pb-5 border-b border-gray-300 text-sm mb-4">
                                                    <div>Tạm tính</div>
                                                    <div>{CurrencyFormat(cartItemTotal)}</div>
                                                </div>
                                                <div className="flex items-center justify-between pb-2 border-b border-gray-300 text-sm pb-10 mb-2">
                                                    <div>Phí vận chuyển</div>
                                                    <div>{CurrencyFormat(transportedFee)}</div>
                                                </div>
                                                <div className="flex items-center justify-between pb-2 border-b border-gray-300 text-sm pb-10 mb-3">
                                                    <div>Giảm giá</div>
                                                    <div>-{CurrencyFormat(discountValue)}</div>
                                                </div>
                                                <div className="flex justify-between text-lg font-medium">
                                                    <div>Tổng cộng</div>
                                                    <div className="text-end">
                                                        <div className="text-red-500 text-xl">{CurrencyFormat(orderCost)}</div>
                                                        <div className="text-gray-600 font-normal text-sm">(Đã bao gồm VAT nếu có)</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                paymentStep === 3 &&
                                (
                                    (createOrder) ?
                                        <div className="absolute w-full h-full bg-black opacity-30 z-[100] inset-0 flex items-center justify-center">
                                            <RotatingLines
                                                width="80"
                                                strokeWidth="5"
                                                strokeColor="white"
                                                animationDuration="0.75"
                                                ariaLabel="rotating-lines-loading"
                                                visible={true}
                                            />
                                        </div>
                                        :
                                        <div className="flex items-center justify-center">
                                            <SuccessAnnouncement />
                                        </div>
                                )
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export default PaymentPage;