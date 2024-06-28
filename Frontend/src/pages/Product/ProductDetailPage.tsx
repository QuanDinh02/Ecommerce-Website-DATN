import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";

import { IoIosArrowForward } from "react-icons/io";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css/navigation';
import React from "react";
import { GoStarFill } from "react-icons/go";
import { GoDotFill } from "react-icons/go";
import { MdOutlineMessage } from "react-icons/md";
import { IoBagCheckOutline, IoEyeOutline } from "react-icons/io5";
import { CurrencyFormat, numberKFormat } from "@/utils/numberFormat";
import { FiPlus, FiMinus } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa6";
import { useImmer } from "use-immer";
import { PiShoppingCartLight } from "react-icons/pi";
import { IoMdHeartEmpty } from "react-icons/io";

import Modal from "@/components/Modal";
import { errorToast1, successToast1 } from "@/components/Toast/Toast";
import Rating from "@/components/Rating";
import { getProductDetailInfo, getProductDetailShopInfo, getProductReview, getProductsHistoryNoPagination } from "@/services/productService";
import { LiaCartPlusSolid } from "react-icons/lia";

import { RootState } from "@/redux/reducer/rootReducer";
import { useSelector } from "react-redux";
import { createCartItem, fetchCartItem, INewCartItem } from "@/services/cartItemService";

import _ from "lodash";
import Button from "@/components/Button";
import { useDispatch } from "react-redux";
import { AddCartItem, AddWishListItem } from "@/redux/actions/action";
import { TailSpin } from "react-loader-spinner";
import {
    IProductActive, ISubCategoryActive, ICategoryActive,
    IProductDetail, IProductReview, IReviewData, IRatings,
    IAccount, ICartItem
} from "./ProductDetailPage_types";
import { INewWishListItem, IWishList } from "../FavoriteProduct/FavoriteProductPage_types";
import { createWishListItem, fetchWishList } from "@/services/wishListService";
import ReactPaginate from "react-paginate";
import { dateFormat, dateSpan } from "@/utils/dateFormat";
import { saveCustomerActivity, saveCustomerSearch } from "@/services/customerService";
import { getRecommendRelevantProduct } from "@/services/recommendItemService";

import ProductRating from "../Category/ProductRating";
import LoadImage from "@/components/LoadImage";
import ReactQuill from "react-quill";
import { PiStorefrontLight } from "react-icons/pi";
import classNames from "classnames";

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

interface IShopInfoDetail {
    id: number
    image: string
    shop_name: string
    product_total: number
    shop_join_date: Date
}

interface IProps {
    setShow_quick_view: (item: IRecommendProduct) => void,
    item_id: number
}

interface IHistoryItemProps {
    setShow_quick_view: (product: IRecommendProduct) => void
    data: IRecommendProduct[]
    item_id: number
}

const RelevantRecommendItemList = (props: IProps) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const account: ICustomerAccount = useSelector<RootState, ICustomerAccount>(state => state.user.account);
    const isAuthenticated = useSelector<RootState, boolean>(state => state.user.isAuthenticated);

    const [recommendItemList, setRecommendItemList] = React.useState<IRecommendProduct[]>([]);

    const fetchRecommendItems = async (item_id: number) => {
        let response: IData = await getRecommendRelevantProduct(item_id);
        if (response) {
            setRecommendItemList(response.product_list);
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
        if (props.item_id !== 0) {
            fetchRecommendItems(props.item_id);
        }
    }, [props.item_id]);

    return (
        <>
            <Swiper
                navigation={true}
                modules={[Navigation, Autoplay]}
                className="mySwiper product-list"
                spaceBetween={10}
                slidesPerView={5}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
            >
                {
                    recommendItemList && recommendItemList.length > 0 &&
                    recommendItemList.map((item, index) => {
                        return (
                            <SwiperSlide>
                                <div className="product border border-white hover:border-gray-400 cursor-pointer px-4 py-2 group" key={`recommend-relavent-product-${index}`} onClick={() => handleProductDetailNavigation(item.id, item.name)}>
                                    <div className="product__image w-40 mx-auto mb-6 relative py-4">
                                        {/* <LoadImageS3 img_style="w-full h-full" img_url={item.image} /> */}
                                        <LoadImage img_style="w-full h-40" product_id={item.id} key={`recommend-item-img-${item.id}`} />
                                        <div className="product__utility w-full absolute bottom-[-10px] bg-white hidden items-center justify-center gap-x-4 mb-2 group-hover:flex duration-300">
                                            <div className="utility-item w-8 h-8 hover:bg-[#FCB800] hover:rounded-full flex items-center justify-center relative" onClick={(e) => {
                                                e.stopPropagation();
                                                hanldeAddShoppingCart(1, item.id);
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
                                    <div className="product__name text-blue-600 mb-3 line-clamp-2 text-sm duration-300 hover:text-[#FCB800] h-10">{item.name}</div>
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
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>

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
                className="mySwiper product-list"
                spaceBetween={10}
                slidesPerView={5}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
            >
                {
                    props.data && props.data.length > 0 &&
                    props.data.map((item, index) => {
                        return (
                            <SwiperSlide>
                                <div className="product border border-white hover:border-gray-400 cursor-pointer px-4 py-2 group" key={`recommend-relavent-product-${index}`} onClick={() => handleProductDetailNavigation(item.id, item.name)}>
                                    <div className="product__image w-40 mx-auto mb-6 relative py-4">
                                        {/* <LoadImageS3 img_style="w-full h-full" img_url={item.image} /> */}
                                        <LoadImage img_style="w-full h-40" product_id={item.id} key={`history-item-img-${item.id}`} />
                                        <div className="product__utility w-full absolute bottom-[-10px] bg-white hidden items-center justify-center gap-x-4 mb-2 group-hover:flex duration-300">
                                            <div className="utility-item w-8 h-8 hover:bg-[#FCB800] hover:rounded-full flex items-center justify-center relative" onClick={(e) => {
                                                e.stopPropagation();
                                                hanldeAddShoppingCart(1, item.id);
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
                                    <div className="product__name text-blue-600 mb-3 line-clamp-2 text-sm duration-300 hover:text-[#FCB800] h-10">{item.name}</div>
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
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>

        </>
    )
}

const ProductDetailPage = () => {

    const [searchParams] = useSearchParams();

    const product_detail_ref = React.useRef<HTMLDivElement>(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [dataLoading, setDataLoading] = React.useState<boolean>(true);
    const [productID, setProductID] = React.useState<number>(0);
    const [shopInfo, setShopInfo] = React.useState<IShopInfoDetail>({
        id: 0,
        image: "",
        shop_name: "Shop Name",
        product_total: 0,
        shop_join_date: new Date()
    });
    const [historyProductList, setHistoryProductList] = React.useState<IRecommendProduct[]>([]);

    const account: IAccount = useSelector<RootState, IAccount>(state => state.user.account);
    const isAuthenticated = useSelector<RootState, boolean>(state => state.user.isAuthenticated);

    const [showQuickView, setShowQuickView] = React.useState<boolean>(false);

    const [productAmount, setProductAmount] = React.useState<number>(0);

    const [productDetailInfo, setProductDetailInfo] = useImmer<IProductDetail>({
        id: 0,
        name: "",
        currentPrice: 0,
        price: 0,
        sold: 0,
        description: "",
        product_image: "",
        inventory_count: 0,
        sub_category: {
            id: 0,
            title: ""
        },
        category: {
            id: 0,
            title: ""
        },
        shop_info: {
            id: 0,
            name: ""
        },
    });

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

    const [productReviews, setProductReviews] = React.useState<IProductReview[]>([]);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(20);
    const [totalRatings, setTotalRatings] = React.useState<number>(0);
    const [ratings, setRatings] = React.useState<IRatings>();
    const [ratingAverage, setRatingAverage] = React.useState<number>(0);

    const [activeCategory, setActiveCategory] = React.useState<ICategoryActive>({
        id: 0,
        title: ""
    });

    const [activeSubCategory, setActiveSubCategory] = React.useState<ISubCategoryActive>({
        id: 0,
        title: ""
    });

    const [activeProduct, setActiveProduct] = React.useState<IProductActive>({
        id: 0,
        name: ""
    });

    const [productDetail, setProductDetail] = useImmer([
        {
            id: 1,
            name: "Mô tả sản phẩm",
            selected: true
        },
        {
            id: 2,
            name: "Đánh giá",
            selected: false
        }
    ]);

    const [amount, setAmount] = React.useState<number>(1);

    const [ratingFilter, setRatingFilter] = React.useState<number>(0);

    const [scrollPosition, setScrollPosition] = React.useState(0);

    const handleCloseQuickView = (active: boolean) => {
        setShowQuickView(active);
        setAmount(1);
    }

    const handleProductAmount = (num: any) => {
        if (!isNaN(num) && num > 0) {
            if (productAmount > 0 && num > productAmount) {
                setAmount(productAmount);
            } else {
                setAmount(num);
            }
        }
    }

    const hanldeSetProductDetail = (id: number) => {
        setProductDetail(draft => {
            draft.forEach(item => {
                if (item.id === id) {
                    item.selected = true;
                } else {
                    item.selected = false;
                }
            });
        })
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

    const fetchShopInfoDetail = async (product_id: number) => {
        let res: IShopInfoDetail = await getProductDetailShopInfo(product_id);
        if (res) {
            setShopInfo(res);
        }
    }

    const fetchProductDetail = async (product_id: number) => {
        let response: IProductDetail = await getProductDetailInfo(+product_id);
        if (response) {

            setProductDetailInfo(draft => {
                draft.id = response.id;
                draft.name = response.name;
                draft.currentPrice = response.currentPrice;
                draft.price = response.price;
                draft.description = response.description;
                draft.product_image = response.product_image;
                draft.inventory_count = response.inventory_count;
                draft.sold = response.sold;
                draft.sub_category = response.sub_category;
                draft.category = response.category;
                draft.shop_info = response.shop_info;
            })

            setProductAmount(response.inventory_count);

            setActiveCategory({
                ...activeCategory, id: response.category.id, title: response.category.title
            });

            setActiveSubCategory({
                ...activeSubCategory, id: response.sub_category.id, title: response.sub_category.title
            });

            setActiveProduct({
                ...activeProduct, id: product_id ? product_id : 0, name: response.name
            });
        }
    }

    const fetchProductReviews = async (product_id: number) => {
        let response: IReviewData = await getProductReview(+product_id, +currentPage);
        if (response) {
            setProductReviews(response.product_reviews);
            setTotalPages(response.page_total);
            setTotalRatings(response.total_ratings);
            setRatings(response.ratings);
            setRatingAverage(response.rating_average)
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

    const handleCategoryNavigation = (category_id: number) => {
        navigate({
            pathname: "/category",
            search: `?id=${category_id}&page=1`,
        });
    }

    const handleSubCategoryNavigation = (sub_category_id: number) => {
        navigate({
            pathname: "/sub-category",
            search: `?id=${sub_category_id}&page=1`,
        });
    }

    const handleShopNavigation = (shop_id: number) => {
        navigate({
            pathname: "/shop",
            search: `?shop=${shop_id}`,
        });
    }

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1);
        product_detail_ref.current?.scrollIntoView({ behavior: 'smooth' });
    }

    const fetchHistoryItems = async (data: number[]) => {
        let response: IData = await getProductsHistoryNoPagination(data);
        if (response) {
            setHistoryProductList(response.product_list);
        }
    }

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    const breadCrumbStickyStyle = classNames(
        "product-detail__breadcrumb border-b border-gray-200 bg-white",
        {
            'sticky top-[76px] border-gray-300 z-40': scrollPosition > 144
        }
    );

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    React.useEffect(() => {
        if (productID !== 0) {
            let history_product_view_list: string | null = localStorage.getItem("hpvl");
            if (history_product_view_list) {
                let old_data = JSON.parse(history_product_view_list);
                if (old_data.includes(productID)) {
                    fetchHistoryItems(old_data);
                    return;
                } else {
                    let new_data = [productID, ...old_data];
                    localStorage.setItem("hpvl", JSON.stringify(new_data));
                    fetchHistoryItems(new_data);
                }
            } else {
                let data: number[] = [productID];
                localStorage.setItem("hpvl", JSON.stringify(data));
            }
        }
    }, [productID]);

    React.useEffect(() => {

        let product_id = searchParams.get('id');

        let activeProductID: number = product_id ? +product_id : 0;

        if (activeProductID !== productID) {
            setProductID(activeProductID);
        }

    }, [searchParams.get('id')]);

    React.useEffect(() => {

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        if (productID !== 0) {
            fetchProductDetail(productID);
            fetchProductReviews(productID);
            fetchShopInfoDetail(productID);
        }

    }, [productID]);

    React.useEffect(() => {
        // 2876581
        //fetchProductDetail(2876581);
        //fetchProductReviews(2876581);

        if (productDetailInfo.id !== 0) {
            fetchProductReviews(productDetailInfo.id);
        }
    }, [currentPage]);

    React.useEffect(() => {

        setTimeout(() => {
            setDataLoading(false);
        }, 1000);
    }, []);

    return (
        <>
            <div className="product-detail-container">
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
                            <div className={breadCrumbStickyStyle}>
                                <div className="breadcrumb-content w-[80rem] mx-auto px-[30px] py-4 flex items-center gap-1">
                                    <div onClick={() => navigate("/")} className="cursor-pointer hover:underline">Trang chủ</div>
                                    {
                                        activeCategory && activeCategory.id !== null &&
                                        <>
                                            <MdOutlineArrowForwardIos />
                                            <div
                                                className="cursor-pointer hover:underline"
                                                onClick={() => handleCategoryNavigation(activeCategory.id)}
                                            >
                                                {activeCategory.title}
                                            </div>
                                        </>
                                    }
                                    {
                                        activeSubCategory && activeSubCategory.id !== null &&
                                        <>
                                            <MdOutlineArrowForwardIos />
                                            <div
                                                className="cursor-pointer hover:underline"
                                                onClick={() => handleSubCategoryNavigation(activeSubCategory.id)}
                                            >
                                                {activeSubCategory.title}
                                            </div>
                                        </>
                                    }
                                    <MdOutlineArrowForwardIos />
                                    <div className="font-medium cursor-pointer hover:underline w-1/3 line-clamp-1">{activeProduct.name}</div>
                                </div>
                            </div>
                            <div className="product-detail__content mt-16 mb-24">
                                <div className="main w-[80rem] mx-auto px-[30px]">
                                    <div className="flex">
                                        <div className="product__images mr-16">
                                            <div className="w-80 h-80 flex items-center justify-center">
                                                {/* <LoadImageS3 img_style="w-full h-full" img_url={productDetailInfo.product_image}/> */}
                                                <LoadImage img_style="w-full h-full" product_id={productDetailInfo.id} key={`product-img-${productDetailInfo.id}`} />
                                            </div>
                                        </div>
                                        <div className="product__informations flex-1">
                                            <div className="product__name font-medium text-2xl">{productDetailInfo.name}</div>
                                            <div className="product__rating-stars flex items-center gap-x-3 mt-1">
                                                <div className="flex items-center gap-x-0.5">
                                                    <Rating rating={ratingAverage} />
                                                    <span className="ml-1 text-[#FCB800] font-medium">{ratingAverage ? ratingAverage : 0}</span>
                                                </div>
                                                <GoDotFill className="text-gray-300 w-3 h-3" />
                                                <div className="product__comment-count text-gray-400 flex items-center gap-x-1">
                                                    <MdOutlineMessage className="w-5 h-5" />
                                                    <span>{totalRatings} đánh giá</span>
                                                </div>
                                                <GoDotFill className="text-gray-300 w-3 h-3" />
                                                <div className="product__comment-count text-gray-400 flex items-center gap-x-1">
                                                    <IoBagCheckOutline className="w-5 h-5" />
                                                    <span>Đã bán {productDetailInfo.sold ? numberKFormat(productDetailInfo.sold) : 0}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                {
                                                    productDetailInfo.currentPrice === productDetailInfo.price ?
                                                        <div className="product__price text-3xl font-medium my-4">{CurrencyFormat(productDetailInfo.currentPrice)}</div>
                                                        :
                                                        <>
                                                            <div className="product__price text-green-600 text-3xl font-medium my-4">{CurrencyFormat(productDetailInfo.currentPrice)}</div>
                                                            <div className="product__price text-lg text-gray-400 line-through my-4">{CurrencyFormat(productDetailInfo.price)}</div>
                                                        </>
                                                }
                                            </div>
                                            <div className="shop flex items-center gap-x-4">
                                                {
                                                    productDetailInfo.shop_info.id &&
                                                    <div>Shop: <span className="font-bold text-blue-500 cursor-pointer hover:underline">{productDetailInfo.shop_info.name}</span></div>
                                                }
                                                <div>Tình trạng:&nbsp;
                                                    {
                                                        productDetailInfo.inventory_count > 0 ?
                                                            <span className="font-medium text-green-500">Còn hàng</span>
                                                            :
                                                            <span className="font-medium text-red-500">Hết hàng</span>
                                                    }
                                                </div>
                                            </div>
                                            <div className="border-t border-gray-300 w-full my-4"></div>
                                            <div className="flex items-center gap-x-4 mt-6">
                                                <div className="mb-1">Số lượng</div>
                                                {
                                                    productAmount > 0 ?
                                                        <div className="w-28 h-11 border border-gray-300 flex items-center hover:border-black duration-300 px-2 select-none bg-white">
                                                            <FiMinus className="w-6 h-6 cursor-pointer text-gray-400 hover:text-black duration-300" onClick={(e) => handleProductAmount(amount - 1)} />
                                                            <input type="text" className="w-1/2 text-center outline-none select-none" value={amount} onChange={(e) => handleProductAmount(+e.target.value)} />
                                                            <FiPlus className="w-6 h-6 cursor-pointer text-gray-400 hover:text-black duration-300" onClick={(e) => handleProductAmount(amount + 1)} />
                                                        </div>
                                                        :
                                                        <>
                                                            <div className="w-28 h-11 border border-gray-300 flex items-center hover:border-black duration-300 px-2 bg-gray-100">
                                                                <FiMinus className="w-6 h-6 text-gray-400" />
                                                                <input type="text" className="w-1/2 text-center outline-none select-none bg-gray-100" value={0} disabled />
                                                                <FiPlus className="w-6 h-6 text-gray-400" />
                                                            </div>
                                                        </>

                                                }
                                                <div className={productAmount > 0 ? "text-gray-500" : "text-red-500"}>
                                                    {productAmount > 0 ? `${productAmount} sản phẩm có sẵn` : "Hết hàng !"}

                                                </div>
                                            </div>
                                            <div className="flex items-center gap-x-4 mt-6 mb-4">
                                                <Button
                                                    styles="w-52 py-3 font-medium bg-[#FCB800] text-center rounded-[4px] hover:opacity-80 cursor-pointer flex items-center justify-center gap-x-2"
                                                    OnClick={() => hanldeAddShoppingCart(amount, productDetailInfo.id)}
                                                >
                                                    <LiaCartPlusSolid className="w-7 h-7" /> Thêm vào giỏ hàng
                                                </Button>
                                                <Button
                                                    styles="text-gray-600 hover:text-red-500 duration-300 cursor-pointer"
                                                    OnClick={() => handleAddFavouriteItem(productDetailInfo.id)}
                                                >
                                                    <FaRegHeart className="w-7 h-7" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-100 mt-6"></div>
                                    <div className="p-5 flex items-center gap-x-4 bg-gray-50 border border-gray-300">
                                        <div className="w-16 h-16 border border-gray-200 bg-[#FCB800] rounded-full text-3xl text-white flex items-center justify-center">S</div>
                                        <div className="pr-8 border-r border-gray-300 mr-4">
                                            <div className="shop_name text-lg mb-2">{shopInfo.shop_name}</div>
                                            <div className="px-3 py-1 border border-gray-300 bg-white hover:bg-gray-100 cursor-pointer flex items-center justify-center gap-x-2" onClick={() => handleShopNavigation(shopInfo.id)}><PiStorefrontLight className="w-5 h-5" /> Xem Shop</div>
                                        </div>
                                        <div className="flex-1 flex item-center gap-x-10">
                                            <div className="flex items-center gap-x-10">
                                                <span className="text-gray-500">Sản Phẩm</span>
                                                <span className="text-red-500">{numberKFormat(shopInfo.product_total)}</span>
                                            </div>
                                            <div className="flex items-center gap-x-10">
                                                <span className="text-gray-500">Tham Gia</span>
                                                <span className="text-red-500">{dateSpan(`${shopInfo.shop_join_date}`)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-100 w-full mb-6" ref={product_detail_ref}></div>
                                    <div className="product__info-detail">
                                        <div className="flex items-center mb-5 border-b-2 border-gray-200">
                                            {
                                                productDetail && productDetail.length > 0 &&
                                                productDetail.map((item, index) => {
                                                    if (item.selected) {
                                                        return (
                                                            <div className="px-5 py-2.5 border-b-2 border-[#FCB800] text-[#FCB800] font-medium cursor-pointer" key={`detail-${item.id}`}>{item.name}</div>
                                                        )
                                                    }
                                                    return (
                                                        <div
                                                            className="px-5 py-2.5 text-gray-400 font-medium cursor-pointer"
                                                            key={`detail-${item.id}`}
                                                            onClick={() => hanldeSetProductDetail(item.id)}
                                                        >{item.name}</div>
                                                    )
                                                })
                                            }
                                        </div>
                                        {
                                            productDetail[0].selected &&
                                            <ReactQuill
                                                value={productDetailInfo.description}
                                                readOnly={true}
                                                theme={"bubble"}
                                                className="ql-no-border"
                                            />
                                        }
                                        {
                                            productDetail[1].selected &&
                                            <>
                                                <div className="border bg-gray-100 border-gray-300 p-5 mb-12">
                                                    <div className="product_ratings flex items-center gap-x-3 mb-4">
                                                        <div className="text-3xl font-bold text-[#FCB800]">{ratingAverage ? ratingAverage : 0}</div>
                                                        <div className="flex items-center">
                                                            {
                                                                [...Array(Math.floor(ratingAverage))].map((item, index) => {
                                                                    return (
                                                                        <GoStarFill className="text-[#FCB800] w-5 h-5" />
                                                                    )
                                                                })
                                                            }
                                                            {
                                                                [...Array(5 - Math.floor(ratingAverage))].map((item, index) => {
                                                                    return (
                                                                        <GoStarFill className="text-gray-300 w-5 h-5" />
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="product_rating_filter flex items-center gap-x-2">
                                                        <div className={ratingFilter === 0 ? "border border-[#FCB800] bg-white w-fit px-5 py-2 text-[#FCB800] font-medium cursor-pointer" : "border border-gray-300 bg-white w-fit px-5 py-2 cursor-pointer"} onClick={() => setRatingFilter(0)}>Tất cả</div>
                                                        <div className={ratingFilter === 5 ? "border border-[#FCB800] bg-white w-fit px-5 py-2 text-[#FCB800] font-medium cursor-pointer" : "border border-gray-300 bg-white w-fit px-5 py-2 cursor-pointer"} onClick={() => setRatingFilter(5)}>5 sao ({ratings ? ratings["5"] : 0})</div>
                                                        <div className={ratingFilter === 4 ? "border border-[#FCB800] bg-white w-fit px-5 py-2 text-[#FCB800] font-medium cursor-pointer" : "border border-gray-300 bg-white w-fit px-5 py-2 cursor-pointer"} onClick={() => setRatingFilter(4)}>4 sao ({ratings ? ratings["4"] : 0})</div>
                                                        <div className={ratingFilter === 3 ? "border border-[#FCB800] bg-white w-fit px-5 py-2 text-[#FCB800] font-medium cursor-pointer" : "border border-gray-300 bg-white w-fit px-5 py-2 cursor-pointer"} onClick={() => setRatingFilter(3)}>3 sao ({ratings ? ratings["3"] : 0})</div>
                                                        <div className={ratingFilter === 2 ? "border border-[#FCB800] bg-white w-fit px-5 py-2 text-[#FCB800] font-medium cursor-pointer" : "border border-gray-300 bg-white w-fit px-5 py-2 cursor-pointer"} onClick={() => setRatingFilter(2)}>2 sao ({ratings ? ratings["2"] : 0})</div>
                                                        <div className={ratingFilter === 1 ? "border border-[#FCB800] bg-white w-fit px-5 py-2 text-[#FCB800] font-medium cursor-pointer" : "border border-gray-300 bg-white w-fit px-5 py-2 cursor-pointer"} onClick={() => setRatingFilter(1)}>1 sao ({ratings ? ratings["1"] : 0})</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    {productReviews && productReviews.length > 0 &&
                                                        productReviews.map((item, index) => {
                                                            return (
                                                                <div key={`customer-comment-${item.id}`} className="mb-10">
                                                                    <div className="flex gap-x-2 mb-3">
                                                                        <div className="w-12 h-12 rounded-full bg-cyan-200 flex items-center justify-center text-cyan-600">CS</div>
                                                                        <div className="flex flex-col">
                                                                            <div className="flex items-center gap-x-2">
                                                                                <div className="font-medium">{item?.customer?.name ? item?.customer?.name : "Ẩn Danh"}</div>
                                                                                <Rating rating={item.rating} />
                                                                            </div>
                                                                            <div className="text-gray-600">{dateFormat(`${item.createdAt}`)}</div>
                                                                        </div>

                                                                    </div>
                                                                    <div className="w-full text-gray-500">{item.comment ? item.comment : <span className="w-full border border-gray-200 px-3 py-1 bg-gray-100">Không có nhận xét sản phẩm</span>}</div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        productReviews && productReviews.length > 0 &&
                                                        <div className='pagination-container flex justify-center mb-12'>
                                                            <ReactPaginate
                                                                nextLabel=">"
                                                                onPageChange={handlePageClick}
                                                                pageRangeDisplayed={5}
                                                                marginPagesDisplayed={0}
                                                                pageCount={totalPages}
                                                                previousLabel="<"
                                                                pageClassName="page-item"
                                                                pageLinkClassName="page-link page-background"
                                                                previousClassName="page-item"
                                                                previousLinkClassName="page-link pre-next"
                                                                nextClassName="page-item"
                                                                nextLinkClassName="page-link pre-next"
                                                                breakLabel=""
                                                                breakClassName="page-item"
                                                                breakLinkClassName="page-link"
                                                                containerClassName="pagination flex items-center gap-2 "
                                                                activeLinkClassName="page-active-background"
                                                                renderOnZeroPageCount={null}
                                                                forcePage={currentPage - 1}
                                                            />
                                                        </div>
                                                    }
                                                </div>
                                            </>
                                        }
                                        <div>
                                            <div className="text-lg text-gray-400 mb-4">CÁC SẢN PHẨM LIÊN QUAN</div>
                                            <div className="banner w-full mb-5">
                                                <RelevantRecommendItemList setShow_quick_view={handleQuickView} item_id={productID} />
                                            </div>
                                        </div>
                                        {
                                            historyProductList.length > 0 &&
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-lg text-gray-400">SẢN PHẨM BẠN ĐÃ XEM</span>
                                                    <div className="text-red-500 hover:underline cursor-pointer flex items-center gap-x-1" onClick={() => navigate("/history")}><span>Xem Tất Cả</span> <IoIosArrowForward /></div>
                                                </div>
                                                <div className="banner w-full mb-5">
                                                    <HistoryItemList data={historyProductList} setShow_quick_view={handleQuickView} item_id={productID} />
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </>
                }
            </div>
            <Modal show={showQuickView} setShow={handleCloseQuickView} size="customize">
                <div className="product-quick-view flex w-full relative">
                    <div className="product-quick-view__image w-2/5 flex items-center justify-center">
                        {/* <LoadImageS3 img_style="w-[24rem] h-[24rem]" img_url={productQuickView.image_url} /> */}
                        <LoadImage img_style="w-[24rem] h-[24rem]" product_id={productQuickView.id} />
                    </div>
                    <div className="product-quick-view__info w-3/5">
                        <div className="product__name font-medium text-2xl">{productQuickView.name}</div>
                        <div className="product__rating-stars flex items-center gap-x-3 my-3">
                            <Rating rating={productQuickView.rating} />
                            <GoDotFill className="text-gray-300 w-3 h-3" />
                            <div className="product__comment-count text-gray-400 flex items-center gap-x-1">
                                <IoBagCheckOutline className="w-5 h-5" />
                                <span>Đã bán {productQuickView.sold ? numberKFormat(productQuickView.sold) : 0}</span>
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
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ProductDetailPage;