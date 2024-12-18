
import React from "react";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { GoDotFill } from "react-icons/go";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { PiShoppingCartLight } from "react-icons/pi";
import { errorToast1, successToast1 } from "@/components/Toast/Toast";
import { IoBagCheckOutline, IoEyeOutline } from "react-icons/io5";
import { IoIosArrowForward, IoMdHeartEmpty } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Modal from "@/components/Modal";
import { CurrencyFormat, numberKFormat } from "@/utils/numberFormat";
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa6";
import { getRecommendItemByCustomer, startTrainingRecommendItemData } from "@/services/recommendItemService";
import CategoryMenu from "@/components/CategoryMenu";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducer/rootReducer";
import ProductRating from "./Category/ProductRating";
import { checkNewCustomer, saveCustomerActivity, saveCustomerSearch } from "@/services/customerService";

import _ from 'lodash';
import { INewCartItem, createCartItem, fetchCartItem } from "@/services/cartItemService";
import { IAccount, ICartItem } from "./Product/ProductDetailPage_types";
import { AddCartItem, AddWishListItem } from "@/redux/actions/action";
import { useDispatch } from "react-redux";
import { createWishListItem, fetchWishList } from "@/services/wishListService";
import { INewWishListItem, IWishList } from "./FavoriteProduct/FavoriteProductPage_types";
import LoadImageS3 from "@/components/LoadImageS3";
import { useImmer } from "use-immer";
import Rating from "@/components/Rating";
import LoadImage from "@/components/LoadImage";
import ReactQuill from "react-quill";
import Button from "@/components/Button";
import { getProductsHistoryNoPagination } from "@/services/productService";

import Banner_1 from '../assets/img/homepage/Banner_1.svg';
import Banner_2 from '../assets/img/homepage/Banner_2.svg';
import Banner_3 from '../assets/img/homepage/Banner_3.svg';
import Banner_4 from '../assets/img/homepage/Banner_4.svg';
import Banner_5 from '../assets/img/homepage/Banner_5.svg';
import Banner_6 from '../assets/img/homepage/Banner_6.svg';
import Banner_7 from '../assets/img/homepage/Banner_7.jpg';
import Banner_8 from '../assets/img/homepage/Banner_8.jpg';

import { updateProductRecommendClick } from "@/services/productTrackingService";
import LinkNewTabProductDetail from "@/components/LinkNewTab";

interface IRecommendProduct {
    id: number
    current_price: number
    price: number
    image: string
    name: string
    rating: number
    sold: number
    summary: string
    seller_info: IShopInfo
    quantity: number
}

interface ICustomerAccount {
    customer_id: number
    username: string
    role: string
}

interface IData {
    product_list: IRecommendProduct[]
}

interface IShopInfo {
    id: number
    name: string
}
interface IProductQuickView {
    id: number
    name: string
    image_url: string
    current_price: number
    price: number
    rating: number
    sold: number
    summary: string
    seller_info: IShopInfo
    quantity: number
}

interface IProps {
    setShow_quick_view: (product: IRecommendProduct) => void
}

interface IHistoryItemProps {
    setShow_quick_view: (product: IRecommendProduct) => void
    data: IRecommendProduct[]
}

const RecommendItemList = (props: IProps) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const account: ICustomerAccount = useSelector<RootState, ICustomerAccount>(state => state.user.account);
    const isAuthenticated = useSelector<RootState, boolean>(state => state.user.isAuthenticated);

    const [recommendItemList, setRecommendItemList] = React.useState<IRecommendProduct[]>([]);

    const fetchRecommendItems = async (customer_id: number) => {
        let response: IData = await getRecommendItemByCustomer(customer_id);
        if (response) {
            let suffle_data = _.shuffle(response.product_list);
            setRecommendItemList(suffle_data);
            startTrainingRecommendItemData(customer_id);
        }
    }

    const refetchWishList = async () => {
        let wishListData: any = await fetchWishList(account.customer_id);
        if (wishListData && !_.isEmpty(wishListData.DT)) {
            let wish_list_data: IWishList[] = wishListData.DT;
            let count = wish_list_data.length;

            dispatch(AddWishListItem({
                wish_list_item: wish_list_data,
                wish_list_count: count
            }));
        }
    }

    const handleAddFavouriteItem = async (product_id: number) => {
        if (account && isAuthenticated) {
            let data: INewWishListItem = {
                productID: product_id,
                customerID: account.customer_id
            }

            let result = await createWishListItem(data);
            if (result && result.EC === 0) {
                await saveCustomerActivity({
                    product_id: product_id,
                    type: 2
                });
                refetchWishList();
                successToast1(result.EM);
            }
        } else {
            navigate("/login");
        }
    }

    const hanldeAddShoppingCart = async (quantity: number, product_id: number) => {
        if (account && isAuthenticated) {
            let data: INewCartItem = {
                quantity: quantity,
                customerID: account.customer_id,
                productID: product_id
            }

            let result = await createCartItem(data);
            if (result && result.EC === 0) {
                refetchCartItem();
                successToast1(result.EM);
            }
        } else {
            navigate("/login");
        }
    }

    const refetchCartItem = async () => {
        let cartItemsData: any = await fetchCartItem(account.customer_id);
        if (cartItemsData && !_.isEmpty(cartItemsData.DT)) {
            let cart_item_data: ICartItem[] = cartItemsData.DT;
            let count = cart_item_data.length;

            dispatch(AddCartItem({
                cart_items: cart_item_data,
                count: count
            }));
        }
    }

    const handleProductDetailNavigation = (product_id: number, product_name: string) => {
        if (account && isAuthenticated) {
            saveCustomerActivity({
                product_id: product_id,
                type: 0
            });

            saveCustomerSearch(product_name);

            updateProductRecommendClick(product_id);

            navigate({
                pathname: "/product",
                search: `?id=${product_id}`,
            });
        }

        navigate({
            pathname: "/product",
            search: `?id=${product_id}`,
        });
    }

    React.useEffect(() => {
        if (account && isAuthenticated && account.role === "customer") {
            fetchRecommendItems(account.customer_id);
        }
    }, [isAuthenticated]);

    return (
        <>
            {
                recommendItemList && recommendItemList.length > 0 &&
                recommendItemList.map((item, index) => {
                    return (
                        <div className="product cursor-pointer px-4 py-2 bg-white border border-gray-200 hover:shadow-md hover:border-gray-400 group" key={`sale-off-product-${index}`} onClick={() => handleProductDetailNavigation(item.id, item.name)}>
                            <div className="relative">
                                <div className="product__image w-40 mx-auto mb-6 relative py-4">
                                    <LoadImageS3 img_style="w-40 h-40" img_url={item.image} />
                                    {/* <LoadImage img_style="w-40 h-40" product_id={item.id} /> */}
                                    <div className="product__utility w-full absolute bottom-[-10px] bg-white hidden items-center justify-center gap-x-4 mb-2 group-hover:flex duration-300">
                                        <div className="utility-item w-8 h-8 hover:bg-[#FCB800] hover:rounded-full flex items-center justify-center relative" onClick={(e) => {
                                            e.stopPropagation();
                                            if (item.quantity > 0) {
                                                hanldeAddShoppingCart(1, item.id);
                                            } else {
                                                errorToast1("Sản phẩm hết hàng");
                                                return;
                                            }
                                        }}>
                                            <PiShoppingCartLight className="w-6 h-6 " />
                                            <div className="tooltip-box absolute top-[-40px] flex flex-col items-center">
                                                <div className="tooltip bg-black text-white rounded-[4px] py-1 px-3 w-40 text-center">
                                                    <span className="text-sm">Thêm vào giỏ hàng</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="utility-item w-8 h-8 hover:bg-[#FCB800] hover:rounded-full flex items-center justify-center relative" onClick={(e) => {
                                            e.stopPropagation();
                                            props.setShow_quick_view(item);
                                        }}>
                                            <IoEyeOutline className="w-6 h-6" />
                                            <div className="tooltip-box absolute top-[-40px] flex flex-col items-center">
                                                <div className="tooltip bg-black text-white rounded-[4px] py-1 px-3 w-40 text-center">
                                                    <span className="text-sm">Xem nhanh</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="utility-item w-8 h-8 hover:bg-[#FCB800] hover:rounded-full flex items-center justify-center relative" onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddFavouriteItem(item.id);
                                        }}>
                                            <IoMdHeartEmpty className="w-6 h-6" />
                                            <div className="tooltip-box absolute top-[-40px] flex flex-col items-center">
                                                <div className="tooltip bg-black text-white rounded-[4px] py-1 px-3 w-40 text-center">
                                                    <span className="text-sm">Yêu thích</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product__name text-blue-600 mb-3 line-clamp-2 text-sm duration-300 hover:text-[#FCB800] h-10"><LinkNewTabProductDetail id={item.id} name={item.name} /></div>
                            <div className="product__price flex items-center gap-2 mb-2.5">
                                {
                                    item.current_price === item.price ?
                                        <div className="price text-black font-medium">{CurrencyFormat(item.current_price)}</div>
                                        :
                                        <>
                                            <div className="price text-[#1A732E] font-medium">{CurrencyFormat(item.current_price)}</div>
                                            <div className="old-price text-sm text-gray-500 line-through">{CurrencyFormat(item.price)}</div>
                                        </>
                                }
                            </div>
                            <ProductRating
                                ratings={item.rating}
                                selling_count={item.sold}
                                key={`item-rating-product-${item.id}`}
                                item_grid={true}
                            />
                        </div>
                    )
                })
            }
        </>
    )
}

const HistoryItemList = (props: IHistoryItemProps) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const account: ICustomerAccount = useSelector<RootState, ICustomerAccount>(state => state.user.account);
    const isAuthenticated = useSelector<RootState, boolean>(state => state.user.isAuthenticated);

    const refetchWishList = async () => {
        let wishListData: any = await fetchWishList(account.customer_id);
        if (wishListData && !_.isEmpty(wishListData.DT)) {
            let wish_list_data: IWishList[] = wishListData.DT;
            let count = wish_list_data.length;

            dispatch(AddWishListItem({
                wish_list_item: wish_list_data,
                wish_list_count: count
            }));
        }
    }

    const handleAddFavouriteItem = async (product_id: number) => {
        if (account && isAuthenticated) {
            let data: INewWishListItem = {
                productID: product_id,
                customerID: account.customer_id
            }

            let result = await createWishListItem(data);
            if (result && result.EC === 0) {
                await saveCustomerActivity({
                    product_id: product_id,
                    type: 2
                });
                refetchWishList();
                successToast1(result.EM);
            }
        } else {
            navigate("/login");
        }
    }

    const hanldeAddShoppingCart = async (quantity: number, product_id: number) => {
        if (account && isAuthenticated) {
            let data: INewCartItem = {
                quantity: quantity,
                customerID: account.customer_id,
                productID: product_id
            }

            let result = await createCartItem(data);
            if (result && result.EC === 0) {
                refetchCartItem();
                successToast1(result.EM);
            }
        } else {
            navigate("/login");
        }
    }

    const refetchCartItem = async () => {
        let cartItemsData: any = await fetchCartItem(account.customer_id);
        if (cartItemsData && !_.isEmpty(cartItemsData.DT)) {
            let cart_item_data: ICartItem[] = cartItemsData.DT;
            let count = cart_item_data.length;

            dispatch(AddCartItem({
                cart_items: cart_item_data,
                count: count
            }));
        }
    }

    const handleProductDetailNavigation = (product_id: number, product_name: string) => {
        if (account && isAuthenticated) {
            saveCustomerActivity({
                product_id: product_id,
                type: 0
            });

            saveCustomerSearch(product_name);

            navigate({
                pathname: "/product",
                search: `?id=${product_id}`,
            });
        }

        navigate({
            pathname: "/product",
            search: `?id=${product_id}`,
        });
    }

    return (
        <>
            <Swiper
                navigation={true}
                modules={[Navigation, Autoplay]}
                className="mySwiper product-list select-none"
                spaceBetween={10}
                slidesPerView={5}
                loop={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
            >
                {
                    props.data && props.data.length > 0 &&
                    props.data.map((item, index) => {
                        return (
                            <SwiperSlide>
                                <div className="product border border-white hover:border-gray-400 cursor-pointer px-4 py-2 group h-full" key={`history-item-${index}`} onClick={() => handleProductDetailNavigation(item.id, item.name)}>
                                    <div className="product__image w-40 mx-auto mb-6 relative py-4">
                                        <LoadImageS3 img_style="w-full h-40" img_url={item.image} />
                                        {/* <LoadImage img_style="w-full h-40" product_id={item.id} /> */}
                                        <div className="product__utility w-full absolute bottom-[-10px] bg-white hidden items-center justify-center gap-x-4 mb-2 group-hover:flex duration-300">
                                            <div className="utility-item w-8 h-8 hover:bg-[#FCB800] hover:rounded-full flex items-center justify-center relative" onClick={(e) => {
                                                e.stopPropagation();
                                                if (item.quantity > 0) {
                                                    hanldeAddShoppingCart(1, item.id);
                                                } else {
                                                    errorToast1("Sản phẩm hết hàng");
                                                    return;
                                                }
                                            }}>
                                                <PiShoppingCartLight className="w-6 h-6 " />
                                                <div className="tooltip-box absolute top-[-40px] flex flex-col items-center">
                                                    <div className="tooltip bg-black text-white rounded-[4px] py-1 px-3 w-40 text-center">
                                                        <span className="text-sm">Thêm vào giỏ hàng</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="utility-item w-8 h-8 hover:bg-[#FCB800] hover:rounded-full flex items-center justify-center relative" onClick={(e) => {
                                                e.stopPropagation();
                                                props.setShow_quick_view(item);
                                            }}>
                                                <IoEyeOutline className="w-6 h-6" />
                                                <div className="tooltip-box absolute top-[-40px] flex flex-col items-center">
                                                    <div className="tooltip bg-black text-white rounded-[4px] py-1 px-3 w-40 text-center">
                                                        <span className="text-sm">Xem nhanh</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="utility-item w-8 h-8 hover:bg-[#FCB800] hover:rounded-full flex items-center justify-center relative" onClick={(e) => {
                                                e.stopPropagation();
                                                handleAddFavouriteItem(item.id);
                                            }}>
                                                <IoMdHeartEmpty className="w-6 h-6" />
                                                <div className="tooltip-box absolute top-[-40px] flex flex-col items-center">
                                                    <div className="tooltip bg-black text-white rounded-[4px] py-1 px-3 w-40 text-center">
                                                        <span className="text-sm">Yêu thích</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product__name text-blue-600 mb-3 line-clamp-2 text-sm duration-300 hover:text-[#FCB800] h-10"><LinkNewTabProductDetail id={item.id} name={item.name} /></div>
                                    <div className="product__price flex items-center gap-2 mb-2.5">
                                        {
                                            item.current_price === item.price ?
                                                <div className="price text-black font-medium">{CurrencyFormat(item.current_price)}</div>
                                                :
                                                <>
                                                    <div className="price text-[#1A732E] font-medium">{CurrencyFormat(item.current_price)}</div>
                                                    <div className="old-price text-sm text-gray-500 line-through">{CurrencyFormat(item.price)}</div>
                                                </>
                                        }
                                    </div>
                                    <ProductRating
                                        ratings={item.rating}
                                        selling_count={item.sold}
                                        key={`item-rating-product-${item.id}`}
                                        item_grid={false}
                                    />
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>

        </>
    )
}

const Homepage = () => {

    const navigate = useNavigate();
    const userRole = useSelector<RootState, string>(state => state.user.role);
    const dispatch = useDispatch();

    const account: IAccount = useSelector<RootState, IAccount>(state => state.user.account);
    const isAuthenticated = useSelector<RootState, boolean>(state => state.user.isAuthenticated);

    const [historyProductList, setHistoryProductList] = React.useState<IRecommendProduct[]>([]);

    const [showQuickView, setShowQuickView] = React.useState<boolean>(false);

    const [productQuickView, setProductQuickView] = useImmer<IProductQuickView>({
        id: 0,
        name: "",
        image_url: "",
        current_price: 0,
        price: 0,
        rating: 0,
        sold: 0,
        summary: "",
        quantity: 0,
        seller_info: {
            id: 0,
            name: ""
        }
    })

    const [amount, setAmount] = React.useState<number>(1);

    const handleCloseQuickView = (active: boolean) => {
        setShowQuickView(active);
        setAmount(1);
    }

    const handleQuickView = (item: IRecommendProduct) => {
        setProductQuickView(draft => {
            draft.id = item.id;
            draft.name = item.name;
            draft.image_url = item.image;
            draft.current_price = item.current_price;
            draft.price = item.price;
            draft.rating = item.rating;
            draft.sold = item.sold;
            draft.summary = item.summary;
            draft.quantity = item.quantity;
            draft.seller_info = item.seller_info;
        });
        setShowQuickView(true);
    }

    const hanldeAddShoppingCart = async (quantity: number, product_id: number) => {
        if (account && isAuthenticated) {
            let data: INewCartItem = {
                quantity: quantity,
                customerID: account.customer_id,
                productID: product_id
            }

            let result = await createCartItem(data);
            if (result && result.EC === 0) {
                refetchCartItem();
                successToast1(result.EM);
                setAmount(1);
            }
        } else {
            navigate("/login");
        }
    }

    const refetchCartItem = async () => {
        let cartItemsData: any = await fetchCartItem(account.customer_id);
        if (cartItemsData && !_.isEmpty(cartItemsData.DT)) {
            let cart_item_data: ICartItem[] = cartItemsData.DT;
            let count = cart_item_data.length;

            dispatch(AddCartItem({
                cart_items: cart_item_data,
                count: count
            }));
        }
    }

    const refetchWishList = async () => {
        let wishListData: any = await fetchWishList(account.customer_id);
        if (wishListData && !_.isEmpty(wishListData.DT)) {
            let wish_list_data: IWishList[] = wishListData.DT;
            let count = wish_list_data.length;

            dispatch(AddWishListItem({
                wish_list_item: wish_list_data,
                wish_list_count: count
            }));
        }
    }

    const handleAddFavouriteItem = async (product_id: number) => {
        if (account && isAuthenticated) {
            let data: INewWishListItem = {
                productID: product_id,
                customerID: account.customer_id
            }

            let result = await createWishListItem(data);
            if (result && result.EC === 0) {
                await saveCustomerActivity({
                    product_id: product_id,
                    type: 2
                });
                refetchWishList();
                successToast1(result.EM);
            }
        } else {
            navigate("/login");
        }
    }

    const handleProductAmount = (num: any) => {
        if (!isNaN(num) && num > 0) {
            setAmount(num);
        }
    }

    const fetchHistoryItems = async (data: number[]) => {
        let response: IData = await getProductsHistoryNoPagination(data);
        if (response) {
            setHistoryProductList(response.product_list);
        }
    }

    const checkIsNewCustomer = async (customer_id: number) => {
        let result = await checkNewCustomer(customer_id);
        if (result) {
            if (result.new_customer) {
                navigate("/new-customer");
            }
        }
    }

    React.useEffect(() => {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }
    }, []);

    React.useEffect(() => {
        if (userRole === "seller") {
            navigate("/seller-info/dashboard");
        }
    }, [userRole]);

    React.useEffect(() => {
        let history_product_view_list: string | null = localStorage.getItem("hpvl");
        if (history_product_view_list) {
            let old_data = JSON.parse(history_product_view_list);
            fetchHistoryItems(old_data);
        }
    }, []);

    React.useEffect(() => {
        setTimeout(() => {
            if (account && isAuthenticated && account.role === "customer") {
                checkIsNewCustomer(account.customer_id);
            }
        }, 1000);
    }, [isAuthenticated]);

    return (
        <>
            <div className="homepage-container w-full bg-[#EEEEEE]">
                <div className='px-[30px] w-[80rem] mx-auto py-8'>
                    <div className="section w-full flex gap-x-3">
                        <CategoryMenu />
                        <div className="w-4/5 homepage-banner select-none ">
                            <div className="h-[22rem] bg-white">
                                <Swiper
                                    slidesPerView={2}
                                    navigation={true}
                                    modules={[Navigation, Autoplay]}
                                    loop={true}
                                    autoplay={{
                                        delay: 4000,
                                        disableOnInteraction: false,
                                    }}
                                    className="mySwiper h-full"
                                >
                                    <SwiperSlide>
                                        <img src={Banner_1} className="w-full h-full px-1" alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img src={Banner_2} className="w-full h-full px-1" alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img src={Banner_3} className="w-full h-full px-1" alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img src={Banner_4} className="w-full h-full px-1" alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img src={Banner_5} className="w-full h-full px-1" alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img src={Banner_6} className="w-full h-full px-1" alt="" />
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                            <div className="w-full pt-2">
                                <div className="w-full h-1/2 bg-white flex">
                                    <img src={Banner_7} className="w-1/2 " alt="" />
                                    <img src={Banner_8} className="w-1/2 " alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        historyProductList.length > 0 &&
                        <div className="bg-white p-4 mt-6 history-products">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-lg text-gray-500">SẢN PHẨM BẠN ĐÃ XEM</span>
                                <div className="text-red-500 hover:underline cursor-pointer flex items-center gap-x-1" onClick={() => navigate("/history")}><span>Xem Tất Cả</span> <IoIosArrowForward /></div>
                            </div>
                            <div className="w-full mb-5">
                                <HistoryItemList data={historyProductList} setShow_quick_view={handleQuickView} />
                            </div>
                        </div>
                    }
                    {
                        (account && isAuthenticated && account.role === "customer") ?
                            <>
                                <div className="header mt-6 px-5 py-4 bg-white flex items-center justify-center border-b-4 border-red-500 text-red-500 text-lg sticky top-[75px] z-30">GỢI Ý DÀNH CHO BẠN</div>
                                <div className="section customer-recommendation bg-white mb-8">
                                    <div className="px-5 py-6 bg-[#EEEEEE]">
                                        <div className="product-list grid grid-cols-5 gap-y-6 gap-x-2">
                                            <RecommendItemList setShow_quick_view={handleQuickView} />
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <div className="mt-6 p-6 bg-white flex flex-col items-center justify-center gap-y-2">
                                <div className="">Các sản phẩm đề xuất dành cho bạn</div>
                                <Button styles="w-60 px-3 py-2 bg-[#FCB800] font-medium rounded-md" OnClick={() => navigate("/login")}>Đăng nhập</Button>
                                <div className="text-sm">Khách hàng mới? <span className="cursor-pointer hover:text-blue-600 hover:underline" onClick={() => navigate("/register/customer")}>Đăng ký tại đây</span></div>
                            </div>
                    }

                </div>
            </div>
            <Modal show={showQuickView} setShow={handleCloseQuickView} size="customize-h-auto">
                <div className="product-quick-view flex w-full relative">
                    <div className="product-quick-view__image w-2/5 flex items-center justify-center">
                        <LoadImageS3 img_style="w-[24rem] h-[24rem]" img_url={productQuickView.image_url} />
                        {/* <LoadImage img_style="w-[24rem] h-[24rem]" product_id={productQuickView.id} /> */}
                    </div>
                    <div className="product-quick-view__info w-3/5">
                        <div className="product__name font-medium text-2xl">{productQuickView.name}</div>
                        <div className="product__rating-stars flex items-center gap-x-3 my-3">
                            <Rating rating={productQuickView.rating} />
                            <GoDotFill className="text-gray-300 w-3 h-3" />
                            <div className="product__comment-count text-gray-400 flex items-center gap-x-1">
                                <IoBagCheckOutline className="w-5 h-5" />
                                <span>Đã bán {numberKFormat(productQuickView.sold ? productQuickView.sold : 0)}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 my-4">
                            {
                                productQuickView.current_price === productQuickView.price ?
                                    <div className="product__current-price text-2xl font-bold">{CurrencyFormat(productQuickView.current_price)}</div>
                                    :
                                    <>
                                        <div className="product__current-price text-green-600 text-2xl font-bold">{CurrencyFormat(productQuickView.current_price)}</div>
                                        <div className="product__price text-gray-400 text-sm line-through">{CurrencyFormat(productQuickView.price)}</div>
                                    </>
                            }
                        </div>
                        <div className="shop flex items-center gap-x-4 mb-4">
                            {
                                productQuickView.seller_info.id ?
                                    <div>Shop: <span className="font-bold text-blue-500 cursor-pointer hover:underline">{productQuickView.seller_info.name}</span></div>
                                    : <></>
                            }
                            <div>Tình trạng:&nbsp;
                                {
                                    productQuickView.quantity > 0 ?
                                        <span className="font-medium text-green-500">Còn hàng</span>
                                        :
                                        <span className="font-medium text-red-500">Hết hàng</span>
                                }
                            </div>
                        </div>
                        <ReactQuill
                            value={productQuickView.summary}
                            readOnly={true}
                            theme={"bubble"}
                            className="ql-no-border ql-line-clamp-3"
                        />
                        <div className="flex items-end gap-x-4">
                            {
                                productQuickView.quantity > 0 ?
                                    <>
                                        <div>
                                            <div className="mb-1">Số lượng</div>
                                            <div className="w-28 h-11 border border-gray-300 flex items-center hover:border-black duration-300 select-none px-2">
                                                <FiMinus className="w-6 h-6 cursor-pointer text-gray-400 hover:text-black duration-300" onClick={(e) => handleProductAmount(amount - 1)} />
                                                <input type="text" className="w-1/2 text-center outline-none select-none" value={amount} onChange={(e) => handleProductAmount(e.target.value)} />
                                                <FiPlus className="w-6 h-6 cursor-pointer text-gray-400 hover:text-black duration-300" onClick={(e) => handleProductAmount(amount + 1)} />
                                            </div>
                                        </div>
                                        <div className="w-52 py-3 font-medium bg-[#FCB800] text-center rounded-[4px] hover:opacity-80 cursor-pointer" onClick={() => hanldeAddShoppingCart(amount, productQuickView.id)}>Thêm vào giỏ hàng</div>
                                        <div className="text-gray-600 hover:text-red-500 duration-300 cursor-pointer" onClick={() => handleAddFavouriteItem(productQuickView.id)}><FaRegHeart className="w-7 h-7" /></div>
                                    </>
                                    :
                                    <>
                                        <div>
                                            <div className="mb-1">Số lượng</div>
                                            <div className="w-28 h-11 border border-gray-300 flex items-center select-none px-2 cursor-not-allowed">
                                                <FiMinus className="w-6 h-6 text-gray-400" />
                                                <input type="text" className="w-1/2 text-center outline-none select-none cursor-not-allowed opacity-50" value={amount} />
                                                <FiPlus className="w-6 h-6 text-gray-400" />
                                            </div>
                                        </div>
                                        <div className="w-52 py-3 font-medium bg-[#FCB800] text-center rounded-[4px] opacity-50 cursor-not-allowed">Thêm vào giỏ hàng</div>
                                        <div className="text-gray-600 hover:text-red-500 duration-300 cursor-pointer" onClick={() => handleAddFavouriteItem(productQuickView.id)}><FaRegHeart className="w-7 h-7" /></div>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </Modal>
        </>

    )
}

export default Homepage;
