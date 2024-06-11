import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";

import Product01 from '../../assets/img/product_detail/product_01.svg';

import Item from '../../assets/img/homepage/item.svg';

import { IoIosArrowForward } from "react-icons/io";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

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
import { TbMinusVertical } from "react-icons/tb";

import Modal from "@/components/Modal";
import { errorToast1, successToast1 } from "@/components/Toast/Toast";
import Rating from "@/components/Rating";
import { getProductDetailInfo, getProductReview } from "@/services/productService";
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
import { dateFormat } from "@/utils/dateFormat";
import { saveCustomerActivity, saveCustomerSearch } from "@/services/customerService";
import { getRecommendRelevantProduct } from "@/services/recommendItemService";

import LoadImageS3 from "@/components/LoadImageS3";
import ProductRating from "../Category/ProductRating";
import LoadImage from "@/components/LoadImage";
import ReactQuill from "react-quill";

interface IRecommendProduct {
    id: number
    current_price: number
    price: number
    image: string
    name: string
    rating: number
    sold: number
    summary: string
}

interface ICustomerAccount {
    customer_id: number
    username: string
    role: string
}

interface IData {
    product_list: IRecommendProduct[]
}

interface IProps {
    setShow_quick_view: (value: boolean) => void,
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
        if (account && isAuthenticated && props.item_id !== 0) {
            fetchRecommendItems(props.item_id);
        }
    }, [isAuthenticated]);

    return (
        <>
            {
                recommendItemList && recommendItemList.length > 0 &&
                recommendItemList.map((item, index) => {
                    return (
                        <SwiperSlide>
                            <div className="product border border-white hover:border-gray-400 cursor-pointer px-4 py-2 group" key={`recommend-relavent-product-${index}`} onClick={() => handleProductDetailNavigation(item.id, item.name)}>
                                <div className="product__image w-40 mx-auto mb-6">
                                    {/* <LoadImageS3 img_style="w-full h-full" img_url={item.image} /> */}
                                    <LoadImage img_style="w-full h-full" product_id={item.id} />
                                </div>
                                <div className="product__utility hidden flex items-center justify-center gap-x-4 mb-2 group-hover:block group-hover:flex duration-300">
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
                                        props.setShow_quick_view(true);
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
                                <div className="product__name text-blue-600 mb-3 line-clamp-2 text-sm duration-300 hover:text-[#FCB800]">{item.name}</div>
                                <div className="product__price flex items-center gap-2 mb-2.5">
                                    <div className="price text-[#1A732E] font-medium">{CurrencyFormat(item.current_price)}</div>
                                    <div className="old-price text-sm text-gray-500 line-through">{CurrencyFormat(item.price)}</div>
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

    const hanldeFavoriteItem = () => {
        successToast1("Thêm vào sản phẩm yêu thích !");
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

    const hanldeAddShoppingCart = () => {

        if (productAmount === 0) {
            errorToast1("Sản phẩm hết hàng !");
            return;
        }
        if (!_.isEmpty(account) && isAuthenticated) {
            handleAddCartItem(amount, account.customer_id, productDetailInfo.id);
        } else {
            navigate("/login");
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

    const handleAddCartItem = async (quantity: number, customer_id: number, product_id: number) => {
        if (account && isAuthenticated) {
            let data: INewCartItem = {
                quantity: quantity,
                customerID: customer_id,
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

    const handleAddFavouriteItem = async (product_id: number, customer_id: number) => {
        if (account && isAuthenticated) {
            let data: INewWishListItem = {
                productID: product_id,
                customerID: customer_id
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

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1);
        product_detail_ref.current?.scrollIntoView({ behavior: 'smooth' });
    }

    const swiperSlides = () => {
        return (
            <>
                {
                    [...Array(10)].map((item, index) => {
                        return (
                            <SwiperSlide>
                                <div className="product border border-white hover:border-gray-400 cursor-pointer px-4 py-2 group">
                                    <div className="product__image w-40 mx-auto mb-6"><img src={Item} alt="" /></div>
                                    <div className="product__utility hidden flex items-center justify-center gap-x-4 mb-2 group-hover:block group-hover:flex duration-300">
                                        <div className="utility-item w-8 h-8 hover:bg-[#FCB800] hover:rounded-full flex items-center justify-center relative" onClick={(e) => {
                                            e.stopPropagation();
                                            hanldeAddShoppingCart();
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
                                            setShowQuickView(true);
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
                                            hanldeFavoriteItem()
                                        }}>
                                            <IoMdHeartEmpty className="w-6 h-6" />
                                            <div className="tooltip-box absolute top-[-40px] flex flex-col items-center">
                                                <div className="tooltip bg-black text-white rounded-[4px] py-1 px-3 w-40 text-center">
                                                    <span className="text-sm">Yêu thích</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product__name text-blue-600 mb-3 line-clamp-2 text-sm duration-300 hover:text-[#FCB800]">Điện thoại NOKIA 1O5 4G 2O19 bản 2 sim thiết kế bền bỉ, tặng kèm pin sạc, bảo hành 12 tháng</div>
                                    <div className="product__price font-medium text-lg mb-2">{CurrencyFormat(768000)}</div>
                                    <div className="flex items-center mb-1 group-hover:hidden">
                                        <div className="product__rating-stars flex items-center gap-x-1">
                                            <Rating rating={5} />
                                        </div>
                                        <TbMinusVertical className="text-gray-300" />
                                        <div className="text-sm">Đã bán {numberKFormat(1200)}</div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }

            </>
        )
    }

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
                            <div className="product-detail__breadcrumb border-b border-gray-300 bg-[#F1F1F1]">
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
                                                <LoadImage img_style="w-full h-full" product_id={productDetailInfo.id} />
                                            </div>
                                            {/* <div className="swiper-list w-80 mt-2 mb-5">
                                                <Swiper
                                                    spaceBetween={10}
                                                    slidesPerView={4}
                                                    navigation={true}
                                                    modules={[Navigation]}
                                                    className="mySwiper"
                                                >
                                                    {images && images.length > 0 && images.map((item, index) => {
                                                        return (
                                                            <SwiperSlide>
                                                                <img
                                                                    key={`image-${index}`}
                                                                    src={item.image}
                                                                    className={selectedImage.id === item.id ? "border-2 border-[#FCB800] cursor-pointer select-none" : "border-2 boder-gray-600 cursor-pointer select-none"}
                                                                    onClick={() => setSelectedImage(item)}
                                                                />
                                                            </SwiperSlide>
                                                        )
                                                    })}

                                                </Swiper>
                                            </div> */}
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
                                                <div className="product__price text-3xl font-medium my-4">{CurrencyFormat(productDetailInfo.currentPrice)}</div>
                                                <div className="product__price text-lg text-gray-400 line-through my-4">{CurrencyFormat(productDetailInfo.price)}</div>
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
                                                        <div className="w-28 h-11 border border-gray-300 flex items-center hover:border-black duration-300 px-2 bg-white">
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
                                                    OnClick={() => hanldeAddShoppingCart()}
                                                >
                                                    <LiaCartPlusSolid className="w-7 h-7" /> Thêm vào giỏ hàng
                                                </Button>
                                                <Button
                                                    styles="text-gray-600 hover:text-red-500 duration-300 cursor-pointer"
                                                    OnClick={() => handleAddFavouriteItem(productDetailInfo.id, account.customer_id)}
                                                >
                                                    <FaRegHeart className="w-7 h-7" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-300 w-full my-4" ref={product_detail_ref}></div>
                                    <div className="product__info-detail">
                                        <div className="flex items-center mb-5">
                                            {
                                                productDetail && productDetail.length > 0 &&
                                                productDetail.map((item, index) => {
                                                    if (item.selected) {
                                                        return (
                                                            <div className="px-5 py-2 border-b-2 border-[#FCB800] text-[#FCB800] font-medium cursor-pointer" key={`detail-${item.id}`}>{item.name}</div>
                                                        )
                                                    }
                                                    return (
                                                        <div
                                                            className="px-5 py-2 border-b-2 border-gray-300 text-gray-400 font-medium cursor-pointer"
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
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-lg text-gray-400">CÁC SẢN PHẨM LIÊN QUAN</span>
                                                <div className="text-red-500 hover:underline cursor-pointer flex items-center gap-x-1"><span>Xem Tất Cả</span> <IoIosArrowForward /></div>
                                            </div>
                                            <div className="banner w-full mb-5">
                                                <Swiper
                                                    navigation={true}
                                                    modules={[Navigation]}
                                                    className="mySwiper product-list"
                                                    spaceBetween={10}
                                                    slidesPerView={5}
                                                >
                                                    {/* {<RelevantRecommendItemList setShow_quick_view={setShowQuickView} item_id={productID}/>} */}
                                                    {swiperSlides()}
                                                </Swiper>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                }
            </div>
            <Modal show={showQuickView} setShow={setShowQuickView} size="customize">
                <div className="product-quick-view flex w-full relative">
                    <div className="product-quick-view__image w-2/5">
                        <img src={Product01} alt="" className="w-[26.875rem] h-[26.875rem]" />
                    </div>
                    <div className="product-quick-view__info w-3/5">
                        <div className="product__name font-medium text-2xl">{productDetailInfo.name}</div>
                        <div className="product__rating-stars flex items-center gap-x-3 mt-1">
                            <div className="flex items-center gap-x-0.5">
                                <Rating rating={5} />
                                <span className="ml-1 text-[#FCB800] font-medium">5.0</span>
                            </div>
                            <GoDotFill className="text-gray-300 w-3 h-3" />
                            <div className="product__comment-count text-gray-400 flex items-center gap-x-1">
                                <MdOutlineMessage className="w-5 h-5" />
                                <span>101 đánh giá</span>
                            </div>
                            <GoDotFill className="text-gray-300 w-3 h-3" />
                            <div className="product__comment-count text-gray-400 flex items-center gap-x-1">
                                <IoBagCheckOutline className="w-5 h-5" />
                                <span>Đã bán 2k2</span>
                            </div>
                        </div>
                        <div className="product__price text-2xl font-bold my-4">{CurrencyFormat(2399000)}</div>
                        <div className="shop flex items-center gap-x-4">
                            <div>Shop: <span className="font-bold text-blue-500">Shop Pro</span></div>
                            <div>Tình trạng: <span className="font-medium text-green-500">Còn hàng</span></div>
                        </div>
                        <div className="border-t border-gray-300 w-full my-4"></div>
                        <div className="product__benefit text-sm text-gray-400 flex flex-col gap-2">
                            <div className="flex items-center gap-x-1"><GoDotFill className="text-gray-400 w-2 h-2" />Unrestrained and portable active stereo speaker</div>
                            <div className="flex items-center gap-x-1"><GoDotFill className="text-gray-400 w-2 h-2" />Free from the confines of wires and chords</div>
                            <div className="flex items-center gap-x-1"><GoDotFill className="text-gray-400 w-2 h-2" />20 hours of portable capabilities</div>
                            <div className="flex items-center gap-x-1"><GoDotFill className="text-gray-400 w-2 h-2" />Double-ended Coil Cord with 3.5mm Stereo Plugs Included</div>
                        </div>
                        <div className="border-t border-gray-300 w-full my-4"></div>
                        <div className="flex items-end gap-x-4">
                            <div>
                                <div className="mb-1">Số lượng</div>
                                <div className="w-28 h-11 border border-gray-300 flex items-center hover:border-black duration-300 px-2">
                                    <FiMinus className="w-6 h-6 cursor-pointer text-gray-400 hover:text-black duration-300" onClick={(e) => handleProductAmount(amount - 1)} />
                                    <input type="text" className="w-1/2 text-center outline-none select-none" value={amount} onChange={(e) => handleProductAmount(e.target.value)} />
                                    <FiPlus className="w-6 h-6 cursor-pointer text-gray-400 hover:text-black duration-300" onClick={(e) => handleProductAmount(amount + 1)} />
                                </div>
                            </div>
                            <div className="w-52 py-3 font-medium bg-[#FCB800] text-center rounded-[4px] hover:opacity-80 cursor-pointer" onClick={() => hanldeAddShoppingCart()}>Thêm vào giỏ hàng</div>
                            <div className="text-gray-600 hover:text-red-500 duration-300 cursor-pointer" onClick={() => hanldeFavoriteItem()}><FaRegHeart className="w-7 h-7" /></div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ProductDetailPage;