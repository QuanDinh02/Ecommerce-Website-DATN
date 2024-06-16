
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
import { getCustomerAddress } from "@/services/customerService";
import { createNewOrder, getAllPaymentMethod, getAllShippingMethod } from "@/services/orderServices";
import { successToast1 } from "@/components/Toast/Toast";
import Button from "@/components/Button";
import { deleteAllCartItem } from "@/services/cartItemService";
import { FaRegCircleCheck } from "react-icons/fa6";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { ClearAllCartItem } from "@/redux/actions/action";

const TEXT_DESCRIPTION_MAX = 500;

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

interface ICustomerAddress {
    id: number
    fullname: string
    mobile: string
    street: string
    ward: string
    district: string
    province: string
    country: string
    type: number
}
interface CustomerOrderAddress {
    fullname: string
    address: string
    mobile: string
}

interface ICustomerAccount {
    customer_id: number
    username: string
    role: string
}

interface IShippingMethod {
    id: number
    nameMethod: string
    price: number
    status: number
}

interface IPaymentMethod {
    id: number
    method_name: string
    status: number
}

interface IAnnouncementProps {
    order_id: number
}

const SuccessAnnouncement = (props: IAnnouncementProps) => {

    const navigate = useNavigate();

    return (
        <div className="border border-gray-200 shadow py-6 w-fit px-12">
            <div className="announcement__main flex flex-col gap-y-1 duration-800 mb-4">
                <div className="w-full flex item-center justify-center"><FaRegCircleCheck className="w-16 h-16 text-[#6acd03]" /></div>
            </div>
            <div className="announcement__title text-black text-xl mb-4 text-center text-gray-600 font-medium">Cám ơn bạn đã mua hàng tại FoxMart !</div>
            <div className="text-center mb-2">Mã đơn hàng của bạn:</div>
            <div className="flex items-center justify-center mb-5">
                <div className="bg-[#6acd03] text-white px-5 py-2 w-32 text-center">{props.order_id}</div>
            </div>
            <div className="text-center">Bạn có thể xem lại <span className="text-blue-600 hover:underline cursor-pointer">đơn hàng của tôi</span></div>
        </div>
    )
}

interface IFullAddressProps {
    customer_address: ICustomerAddress
}

const FullAddress = (props: IFullAddressProps) => {
    let { customer_address } = props;

    return (
        <span>{`
            ${customer_address.street === "" ? "" : (customer_address.street + ", ")}
            ${customer_address.ward === "" ? "" : (customer_address.ward + ", ")}
            ${customer_address.district === "" ? "" : (customer_address.district + ", ")}
            ${customer_address.province === "" ? "" : (customer_address.province + ", ")}
            ${customer_address.country === "" ? "" : customer_address.country}
            `}
        </span>
    )
}


const PaymentPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [dataLoading, setDataLoading] = React.useState<boolean>(true);

    const [paymentStep, setPaymentStep] = React.useState<number>(1);

    const [createOrderID, setCreateOrderID] = React.useState<number>(0);

    const [createOrder, setCreateOrder] = React.useState<boolean>(false);

    const cartItemList: ICartItem[] = useSelector<RootState, ICartItem[]>(state => state.cartItem.cart_item_list);

    const [addressList, setAddressList] = React.useState<ICustomerAddress[]>([]);
    const [shippingMethodList, setShippingMethodList] = React.useState<IShippingMethod[]>([]);
    const [paymentMethodList, setPaymentMethodList] = React.useState<IPaymentMethod[]>([]);

    const account: ICustomerAccount = useSelector<RootState, ICustomerAccount>(state => state.user.account);
    const isAuthenticated = useSelector<RootState, boolean>(state => state.user.isAuthenticated);

    const [cartItemTotal, setCartItemTotal] = React.useState<number>(0);
    const [orderCost, setOrderCost] = React.useState<number>(0);
    const [transportedFee, setTransportedFee] = React.useState<number>(0);
    const [discountValue, setDiscountValue] = React.useState<number>(0);

    const [orderNote, setOrderNode] = React.useState<string>("");

    const [orderAddress, setOrderAddress] = useImmer<CustomerOrderAddress>({
        fullname: "",
        mobile: "",
        address: ""
    });

    const [selectShippingMethod, setSelectShippingMethod] = useImmer<IShippingMethod>({
        id: 1,
        nameMethod: "",
        price: 0,
        status: 0,
    });

    const [selectPaymentMethod, setSelectPaymentMethod] = useImmer<IPaymentMethod>({
        id: 1,
        method_name: "",
        status: 0,
    });

    const [textCount, setTextCount] = React.useState<number>(0);

    const handleSetNote = (value: any) => {

        if (value.length > TEXT_DESCRIPTION_MAX) {
            return;
        }
        setOrderNode(value);
        setTextCount(value.length);
    }

    const handleSelectShippingMethod = (method: IShippingMethod) => {
        if (method.status === 1) {
            setSelectShippingMethod(method)
            setTransportedFee(method.price);
        }
        return;
    }

    const handleSelectPaymentMethod = (method: IPaymentMethod) => {
        if (method.status === 1) {
            setSelectPaymentMethod(method)
        }
        return;
    }

    const paymentBtnStyle = classNames("w-[20rem] px-4 py-2 mt-6 cursor-pointer text-center font-bold text-lg text-white rounded", {
        "bg-gray-400": createOrder,
        "bg-red-500 hover:bg-red-600": !createOrder,
    })

    const handleOrderPayment = async () => {

        window.scrollTo({ top: 0, left: 0 });

        setCreateOrder(true);

        let orderItems = cartItemList.map(item => {

            let order_item = {
                productID: item.product_info.id,
                quantity: item.quantity,
                price: item.price
            }

            return order_item;
        })

        let create_res: any = await createNewOrder({
            status: 0,
            shipFee: transportedFee,
            totalPrice: orderCost,
            shipMethod: selectShippingMethod.id,
            paymentMethod: selectPaymentMethod.id,
            address: orderAddress.address,
            note: orderNote,
            customerID: account.customer_id,
            order_items: orderItems
        });

        if (create_res && create_res.EC === 0) {
            let delete_res = await deleteAllCartItem(account.customer_id);
            if (delete_res && delete_res.EC === 0) {
                dispatch(ClearAllCartItem());
                setCreateOrderID(create_res.DT.order_id);

                setTimeout(() => {
                    setPaymentStep(paymentStep + 1);
                    setCreateOrder(false);
                }, 1000);
            }
        }
    }

    const handleSelectOrderAddress = (customer_address: ICustomerAddress) => {

        setOrderAddress(draft => {
            draft.fullname = customer_address.fullname;
            draft.mobile = customer_address.mobile;
            draft.address = `${customer_address.street === "" ? "" : (customer_address.street + ", ")}${customer_address.ward === "" ? "" : (customer_address.ward + ", ")}${customer_address.district === "" ? "" : (customer_address.district + ", ")}${customer_address.province === "" ? "" : (customer_address.province + ", ")}${customer_address.country === "" ? "" : customer_address.country}`;
        });
        setPaymentStep(paymentStep + 1);
    }

    const fetchAllCustomerAddress = async () => {
        let result = await getCustomerAddress();
        if (result) {
            setAddressList(result);
        }
    }

    const fetchAllShippingMethod = async () => {
        let result = await getAllShippingMethod();
        if (result) {
            setShippingMethodList(result);

            let method = result[0];
            setSelectShippingMethod(method);
            setTransportedFee(method.price);
        }
    }

    const fetchAllPaymentMethod = async () => {
        let result = await getAllPaymentMethod();
        if (result) {
            setPaymentMethodList(result);

            let method = result[0];
            setSelectPaymentMethod(method);
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
        setOrderCost(cartItemTotal + transportedFee);

    }, [transportedFee]);

    React.useEffect(() => {
        if (account && isAuthenticated) {
            fetchAllCustomerAddress();
            fetchAllShippingMethod();
            fetchAllPaymentMethod();
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
                                </div>
                            </div>
                            {
                                paymentStep === 1 &&
                                <div className="shipping-order-address">
                                    <div>
                                        <div className="text-lg tracking-wide font-medium">Địa chỉ giao hàng</div>
                                        <div className="my-6 text-gray-600 font-medium">Chọn địa chỉ giao hàng có sẵn của bạn bên dưới:</div>
                                        <div className="grid grid-cols-2 gap-4">
                                            {
                                                addressList && addressList.length > 0 &&
                                                addressList.map((address, index) => {
                                                    return (
                                                        <div className="border border-gray-200 shadow rounded px-4 py-3 w-full flex flex-col justify-between">
                                                            <div className="address-info">
                                                                <div className="flex items-center justify-between mb-1">
                                                                    <div className="text-lg font-bold">{address.fullname}</div>
                                                                    {
                                                                        address.type === 1 &&
                                                                        <div className="text-green-500 font-medium">Mặc định</div>
                                                                    }
                                                                </div>
                                                                <div className="mb-1 text-gray-600">Địa chỉ: <FullAddress customer_address={address} /></div>
                                                                <div className="mb-1 text-gray-600">Điện thoại: {address.mobile}</div>
                                                            </div>
                                                            <div className="w-full flex items-center gap-x-2 mt-2 ">
                                                                <Button styles="px-3 py-2 border border-[#FCB800] bg-[#FCB800] w-fit rounded cursor-pointer hover:opacity-80" OnClick={() => handleSelectOrderAddress(address)} >Giao đến địa chỉ này</Button>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>

                                        <div className="mt-6 flex items-center gap-x-1">
                                            <span className="text-gray-600">Bạn muốn giao hàng đến địa chỉ khác?</span>
                                            <span className="font-medium text-blue-600 cursor-pointer hover:underline" onClick={() => navigate("/customer-info/address")}>Thêm địa chỉ giao hàng mới</span>
                                        </div>
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
                                                        shippingMethodList && shippingMethodList.length > 0 &&
                                                        shippingMethodList.map((item, index) => {
                                                            return (
                                                                <div className='flex items-center gap-x-6 mb-2 cursor-pointer w-fit' key={`shipping-method-select-${index}`} onClick={() => handleSelectShippingMethod(item)}>
                                                                    <div className={item.id === selectShippingMethod.id ? 'w-6 h-6 border-2 border-[#FCB800] rounded-full flex items-center justify-center' : 'w-6 h-6 border-2 border-gray-300 rounded-full'}>
                                                                        <div className={item.id === selectShippingMethod.id ? 'w-2 h-2 bg-[#FCB800] rounded-full' : ""}></div>
                                                                    </div>
                                                                    <div className="flex gap-x-2 items-center">
                                                                        {item.nameMethod}{item.price === 0 && <span className="rounded-full px-3 py-0.5 text-white bg-green-500 text-sm">Miễn phí</span>}
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className="text-lg font-bold text-xl text-gray-600 my-4">2. Chọn hình thức thanh toán</div>
                                            <div className="border border-gray-300 rounded p-4 my-6">
                                                <div className="flex flex-col gap-y-4">
                                                    {
                                                        paymentMethodList.map((item, index) => {
                                                            return (
                                                                <div className={item.status === 1 ? 'flex items-center gap-x-6 mb-2 cursor-pointer w-fit' : 'flex items-center gap-x-6 mb-2 cursor-not-allowed w-fit'} key={`shipping-method-select-${index}`} onClick={() => handleSelectPaymentMethod(item)}>
                                                                    <div className={item.id === selectPaymentMethod.id ? 'w-6 h-6 border-2 border-[#FCB800] rounded-full flex items-center justify-center' : 'w-6 h-6 border-2 border-gray-300 rounded-full'}>
                                                                        <div className={item.id === selectPaymentMethod.id ? 'w-2 h-2 bg-[#FCB800] rounded-full' : ""}></div>
                                                                    </div>
                                                                    <div className="flex items-center gap-x-2">
                                                                        <span className={item.status === 0 ? "text-gray-400" : ""}>{item.method_name}</span>
                                                                        {
                                                                            item.status === 0 &&
                                                                            <span className="text-gray-400 text-sm">(Tạm ngưng)</span>
                                                                        }

                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className='w-full'>
                                                <textarea
                                                    value={orderNote}
                                                    onChange={(e) => handleSetNote(e.target.value)}
                                                    className="rounded-[4px] px-4 py-3 border border-gray-300 w-full focus:border-black h-44 outline-none"
                                                    placeholder="Ghi chú cho đơn hàng (nếu có)"
                                                />
                                                <div className="text-end">
                                                    <span className="text-gray-400">{textCount}/{TEXT_DESCRIPTION_MAX}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <Button styles={paymentBtnStyle} OnClick={() => handleOrderPayment()}>ĐẶT MUA</Button>
                                                <div className="text-sm text-gray-600 mt-2">(Xin vui lòng kiểm tra đơn hàng trước khi đặt mua)</div>
                                            </div>
                                        </div>
                                        <div className="w-1/4">
                                            <div className="w-[23rem] border border-gray-300 px-6 py-5 rounded mb-4">
                                                <div className="w-full flex items-center justify-between mb-4 border-b border-gray-200 pb-4">
                                                    <div className="text-lg text-lg">Địa chỉ giao hàng</div>
                                                    <Button styles="px-4 py-2 rounded cursor-pointer border border-gray-300 hover:bg-gray-100 w-fit" OnClick={() => setPaymentStep(paymentStep - 1)}>Sửa</Button>
                                                </div>
                                                <div className="text-lg font-bold mb-1">{orderAddress.fullname}</div>
                                                <div className="mb-1 text-gray-600">Địa chỉ: {orderAddress.address}</div>
                                                <div className="mb-1 text-gray-600">Điện thoại: {orderAddress.mobile}</div>
                                            </div>
                                            <div className="w-[23rem] border border-gray-300 px-6 py-5 rounded">
                                                <div className="w-full flex items-center justify-between mb-4 border-b border-gray-200 pb-4">
                                                    <div className="text-lg text-lg">Thông tin đơn hàng</div>
                                                    <Button styles="px-4 py-2 rounded cursor-pointer border border-gray-300 hover:bg-gray-100 w-fit" OnClick={() => navigate("/cart")}>Sửa</Button>
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
                                                                    <div className="flex items-center gap-x-1 w-2/3">
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
                                createOrder &&
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
                            }
                            {
                                paymentStep === 3 &&
                                <div className="flex items-center justify-center">
                                    <SuccessAnnouncement order_id={createOrderID} />
                                </div>
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export default PaymentPage;