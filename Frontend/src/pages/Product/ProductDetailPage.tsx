import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

import Product01 from '../../assets/img/product_detail/product_01.svg';
import Product02 from '../../assets/img/product_detail/product_02.svg';
import Product03 from '../../assets/img/product_detail/product_03.svg';
import Product04 from '../../assets/img/product_detail/product_04.svg';

import Item from '../../assets/img/homepage/item.svg';
import Item2 from '../../assets/img/homepage/item2.svg';
import Item3 from '../../assets/img/homepage/item3.svg';
import Item4 from '../../assets/img/homepage/item4.svg';
import Item5 from '../../assets/img/homepage/item5.svg';
import Item6 from '../../assets/img/homepage/item6.svg';
import Item7 from '../../assets/img/homepage/item7.svg';
import Item8 from '../../assets/img/homepage/item8.svg';
import Item9 from '../../assets/img/homepage/item9.svg';

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
import { getProductDetailInfo } from "@/services/productService";
import { LiaCartPlusSolid } from "react-icons/lia";
import { dateFormat } from "@/utils/dateFormat";
import classNames from "classnames";
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
    IProductType, IProductDetail, ISelectType,
    IAccount, ICartItem
} from "./ProductDetailPage_types";
import { INewWishListItem, IWishList } from "../FavoriteProduct/FavoriteProductPage_types";
import { createWishListItem, fetchWishList } from "@/services/wishListService";

const ProductDetailPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [dataLoading, setDataLoading] = React.useState<boolean>(true);

    const account: IAccount = useSelector<RootState, IAccount>(state => state.user.account);
    const isAuthenticated = useSelector<RootState, boolean>(state => state.user.isAuthenticated);

    const [showQuickView, setShowQuickView] = React.useState<boolean>(false);

    const [productAmount, setProductAmount] = React.useState<number>(0);

    const [colors, setColors] = useImmer<ISelectType[]>([]);
    const [sizes, setSizes] = useImmer<ISelectType[]>([]);

    const [productDetailInfo, setProductDetailInfo] = useImmer<IProductDetail>({
        id: 0,
        name: "",
        currentPrice: 0,
        price: 0,
        description: "",
        comment_count: 0,
        rating_average: 0,
        product_image: "",
        inventory_count: 0,
        reviews: [],
        product_type_list: [],
        product_type_group: {
            color: [],
            size: []
        },
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

    const [selectedImage, setSelectedImage] = React.useState({
        id: 1,
        image: Product01
    });

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

    const [images, setImages] = React.useState([
        {
            id: 1,
            image: Product01
        },
        {
            id: 2,
            image: Product02
        },
        {
            id: 3,
            image: Product03
        },
        {
            id: 4,
            image: Product04
        },
        {
            id: 5,
            image: Product01
        },
        {
            id: 6,
            image: Product02
        },
    ]);

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

    const [selectTypeNotice, setSelectTypeNotice] = React.useState<boolean>(false);

    const selectTypeNoticeClassname = classNames(
        "w-full p-4",
        {
            'bg-red-100': selectTypeNotice,
        }
    );

    const selectProductTypeClassname = (IsSelected: boolean) => classNames(
        "px-3 py-1.5 border border-gray-300 flex items-center justify-center w-fit hover:border-red-500 hover:text-red-500 cursor-pointer",
        {
            'border-red-500 text-red-500': IsSelected,
            'bg-white': !IsSelected,
        }
    );

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

    const handleSelectProductType = (id: number, type: string) => {
        if (type === "COLORS") {
            setColors(draft => {
                draft.forEach(item => {
                    if (item.id === +id) {
                        item.select = !item.select;
                    } else {
                        item.select = false;
                    }
                })
            })
        }

        if (type === "SIZES") {
            setSizes(draft => {
                draft.forEach(item => {
                    if (item.id === +id) {
                        item.select = !item.select;
                    } else {
                        item.select = false;
                    }
                })
            })
        }
    }

    React.useEffect(() => {
        if (selectTypeNotice) {
            let selectColor = colors.some(item => item.select === true);
            let selectSize = sizes.some(item => item.select === true);
            if (selectColor && selectSize) {
                setSelectTypeNotice(false);
            }
        }
    }, [colors, sizes]);

    React.useEffect(() => {
        let selectColor = colors.filter(item => item.select === true)[0];
        let selectSize = sizes.filter(item => item.select === true)[0];

        if (!_.isEmpty(selectColor) && !_.isEmpty(selectSize)) {
            productDetailInfo.product_type_list.forEach(item => {
                if (item.color === selectColor.label && item.size === selectSize.label) {
                    setProductAmount(item.quantity);
                }
            });
        } else {
            setProductAmount(productDetailInfo.inventory_count);
        }
    }, [colors, sizes]);

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
        if (colors.length > 0) {
            let IsSelected = colors.some(item => item.select === true);
            if (!IsSelected) {
                setSelectTypeNotice(true);
                return;
            }
        }
        if (sizes.length > 0) {
            let IsSelected = sizes.some(item => item.select === true);
            if (!IsSelected) {
                setSelectTypeNotice(true);
                return;
            }
        }
        setSelectTypeNotice(false);
        if (productAmount === 0) {
            errorToast1("Sản phẩm hết hàng !");
            return;
        }
        if (!_.isEmpty(account) && isAuthenticated) {
            if (colors.length === 0 && sizes.length === 0) {
                let productTypeItem: IProductType = productDetailInfo.product_type_list[0];
                handleAddCartItem(amount, account.customer_id, productTypeItem.id);
            } else {

                let selectColor = colors.filter(item => item.select === true)[0];
                let selectSize = sizes.filter(item => item.select === true)[0];

                let productTypeItem: IProductType = productDetailInfo.product_type_list.filter(item => item.color === selectColor.label && item.size === selectSize.label)[0];
                handleAddCartItem(amount, account.customer_id, productTypeItem.id);
            }
        } else {
            navigate("/login");
        }
    }

    const fetchProductsBySubCategory = async (product_id: number) => {
        let response: IProductDetail = await getProductDetailInfo(+product_id);
        if (response) {

            setProductDetailInfo(draft => {
                draft.id = response.id;
                draft.name = response.name;
                draft.currentPrice = response.currentPrice;
                draft.price = response.price;
                draft.description = response.description;
                draft.comment_count = response.comment_count;
                draft.rating_average = response.rating_average;
                draft.product_image = response.product_image;
                draft.inventory_count = response.inventory_count;
                draft.reviews = response.reviews;
                draft.product_type_list = response.product_type_list;
                draft.product_type_group = response.product_type_group;
                draft.sub_category = response.sub_category;
                draft.category = response.category;
                draft.shop_info = response.shop_info;
            })

            setProductAmount(response.inventory_count);

            if (response.product_type_group.color.length > 0) {
                let result: ISelectType[] = response.product_type_group.color.map((item, index) => {
                    return {
                        id: +index,
                        label: item,
                        select: false
                    }
                });
                setColors(result);
            }

            if (response.product_type_group.size.length > 0) {
                let result: ISelectType[] = response.product_type_group.size.map((item, index) => {
                    return {
                        id: +index,
                        label: item,
                        select: false
                    }
                });
                setSizes(result);
            }

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

    const handleAddCartItem = async (quantity: number, customer_id: number, product_type_id: number) => {
        let data: INewCartItem = {
            quantity: quantity,
            customerID: customer_id,
            productTypeID: product_type_id
        }

        let result = await createCartItem(data);
        if (result && result.EC === 0) {
            refetchCartItem();
            successToast1(result.EM);
        }
    }

    const handleAddFavouriteItem = async (product_id: number, customer_id: number) => {
        let data: INewWishListItem = {
            productID: product_id,
            customerID: customer_id
        }

        let result = await createWishListItem(data);
        if (result && result.EC === 0) {
            refetchWishList();
            successToast1(result.EM);
        }
    }

    const handleCategoryNavigation = (category_id: number, category_title: string) => {
        navigate("/category", { state: { category_id: category_id, category_name: category_title } })
    }

    const handleSubCategoryNavigation = (category_id: number, category_title: string, sub_category_id: number, sub_category_title: string) => {
        navigate("/sub-category", {
            state: {
                category_id: category_id, category_name: category_title,
                sub_category_id: sub_category_id, sub_category_name: sub_category_title,
            }
        })
    }

    const swiperSlides = () => {
        return (
            <>
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
                                {
                                    [...Array(Math.floor(5))].map((item, index) => {
                                        return (
                                            <GoStarFill className="text-[#FCB800]" />
                                        )
                                    })
                                }
                                {
                                    [...Array(5 - Math.floor(5))].map((item, index) => {
                                        return (
                                            <GoStarFill className="text-gray-400" />
                                        )
                                    })
                                }
                            </div>
                            <TbMinusVertical className="text-gray-300" />
                            <div className="text-sm">Đã bán {numberKFormat(1200)}</div>
                        </div>
                        <div className="product_ratings group-hover:hidden flex items-center text-sm ">
                            <div className="font-bold">4.9</div>
                            <div>/5.0</div>
                            <div className="ml-1">(123)</div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="product border border-white hover:border-gray-400 cursor-pointer px-4 py-2 group">
                        <div className="product__image w-40 mx-auto mb-6"><img src={Item2} alt="" /></div>
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
                                {
                                    [...Array(Math.floor(5))].map((item, index) => {
                                        return (
                                            <GoStarFill className="text-[#FCB800]" />
                                        )
                                    })
                                }
                                {
                                    [...Array(5 - Math.floor(5))].map((item, index) => {
                                        return (
                                            <GoStarFill className="text-gray-400" />
                                        )
                                    })
                                }
                            </div>
                            <TbMinusVertical className="text-gray-300" />
                            <div className="text-sm">Đã bán {numberKFormat(1200)}</div>
                        </div>
                        <div className="product_ratings group-hover:hidden flex items-center text-sm ">
                            <div className="font-bold">4.9</div>
                            <div>/5.0</div>
                            <div className="ml-1">(123)</div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="product border border-white hover:border-gray-400 cursor-pointer px-4 py-2 group">
                        <div className="product__image w-40 mx-auto mb-6"><img src={Item3} alt="" /></div>
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
                                {
                                    [...Array(Math.floor(5))].map((item, index) => {
                                        return (
                                            <GoStarFill className="text-[#FCB800]" />
                                        )
                                    })
                                }
                                {
                                    [...Array(5 - Math.floor(5))].map((item, index) => {
                                        return (
                                            <GoStarFill className="text-gray-400" />
                                        )
                                    })
                                }
                            </div>
                            <TbMinusVertical className="text-gray-300" />
                            <div className="text-sm">Đã bán {numberKFormat(1200)}</div>
                        </div>
                        <div className="product_ratings group-hover:hidden flex items-center text-sm ">
                            <div className="font-bold">4.9</div>
                            <div>/5.0</div>
                            <div className="ml-1">(123)</div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="product border border-white hover:border-gray-400 cursor-pointer px-4 py-2 group">
                        <div className="product__image w-40 mx-auto mb-6"><img src={Item4} alt="" /></div>
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
                                {
                                    [...Array(Math.floor(5))].map((item, index) => {
                                        return (
                                            <GoStarFill className="text-[#FCB800]" />
                                        )
                                    })
                                }
                                {
                                    [...Array(5 - Math.floor(5))].map((item, index) => {
                                        return (
                                            <GoStarFill className="text-gray-400" />
                                        )
                                    })
                                }
                            </div>
                            <TbMinusVertical className="text-gray-300" />
                            <div className="text-sm">Đã bán {numberKFormat(1200)}</div>
                        </div>
                        <div className="product_ratings group-hover:hidden flex items-center text-sm ">
                            <div className="font-bold">4.9</div>
                            <div>/5.0</div>
                            <div className="ml-1">(123)</div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="product border border-white hover:border-gray-400 cursor-pointer px-4 py-2 group">
                        <div className="product__image w-40 mx-auto mb-6"><img src={Item5} alt="" /></div>
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
                                {
                                    [...Array(Math.floor(5))].map((item, index) => {
                                        return (
                                            <GoStarFill className="text-[#FCB800]" />
                                        )
                                    })
                                }
                                {
                                    [...Array(5 - Math.floor(5))].map((item, index) => {
                                        return (
                                            <GoStarFill className="text-gray-400" />
                                        )
                                    })
                                }
                            </div>
                            <TbMinusVertical className="text-gray-300" />
                            <div className="text-sm">Đã bán {numberKFormat(1200)}</div>
                        </div>
                        <div className="product_ratings group-hover:hidden flex items-center text-sm ">
                            <div className="font-bold">4.9</div>
                            <div>/5.0</div>
                            <div className="ml-1">(123)</div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="product border border-white hover:border-gray-400 cursor-pointer px-4 py-2 group">
                        <div className="product__image w-40 mx-auto mb-6"><img src={Item6} alt="" /></div>
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
                                {
                                    [...Array(Math.floor(5))].map((item, index) => {
                                        return (
                                            <GoStarFill className="text-[#FCB800]" />
                                        )
                                    })
                                }
                                {
                                    [...Array(5 - Math.floor(5))].map((item, index) => {
                                        return (
                                            <GoStarFill className="text-gray-400" />
                                        )
                                    })
                                }
                            </div>
                            <TbMinusVertical className="text-gray-300" />
                            <div className="text-sm">Đã bán {numberKFormat(1200)}</div>
                        </div>
                        <div className="product_ratings group-hover:hidden flex items-center text-sm ">
                            <div className="font-bold">4.9</div>
                            <div>/5.0</div>
                            <div className="ml-1">(123)</div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="product border border-white hover:border-gray-400 cursor-pointer px-4 py-2 group">
                        <div className="product__image w-40 mx-auto mb-6"><img src={Item7} alt="" /></div>
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
                                {
                                    [...Array(Math.floor(5))].map((item, index) => {
                                        return (
                                            <GoStarFill className="text-[#FCB800]" />
                                        )
                                    })
                                }
                                {
                                    [...Array(5 - Math.floor(5))].map((item, index) => {
                                        return (
                                            <GoStarFill className="text-gray-400" />
                                        )
                                    })
                                }
                            </div>
                            <TbMinusVertical className="text-gray-300" />
                            <div className="text-sm">Đã bán {numberKFormat(1200)}</div>
                        </div>
                        <div className="product_ratings group-hover:hidden flex items-center text-sm ">
                            <div className="font-bold">4.9</div>
                            <div>/5.0</div>
                            <div className="ml-1">(123)</div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="product border border-white hover:border-gray-400 cursor-pointer px-4 py-2 group">
                        <div className="product__image w-40 mx-auto mb-6"><img src={Item8} alt="" /></div>
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
                                {
                                    [...Array(Math.floor(5))].map((item, index) => {
                                        return (
                                            <GoStarFill className="text-[#FCB800]" />
                                        )
                                    })
                                }
                                {
                                    [...Array(5 - Math.floor(5))].map((item, index) => {
                                        return (
                                            <GoStarFill className="text-gray-400" />
                                        )
                                    })
                                }
                            </div>
                            <TbMinusVertical className="text-gray-300" />
                            <div className="text-sm">Đã bán {numberKFormat(1200)}</div>
                        </div>
                        <div className="product_ratings group-hover:hidden flex items-center text-sm ">
                            <div className="font-bold">4.9</div>
                            <div>/5.0</div>
                            <div className="ml-1">(123)</div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="product border border-white hover:border-gray-400 cursor-pointer px-4 py-2 group">
                        <div className="product__image w-40 mx-auto mb-6"><img src={Item9} alt="" /></div>
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
                                {
                                    [...Array(Math.floor(5))].map((item, index) => {
                                        return (
                                            <GoStarFill className="text-[#FCB800]" />
                                        )
                                    })
                                }
                                {
                                    [...Array(5 - Math.floor(5))].map((item, index) => {
                                        return (
                                            <GoStarFill className="text-gray-400" />
                                        )
                                    })
                                }
                            </div>
                            <TbMinusVertical className="text-gray-300" />
                            <div className="text-sm">Đã bán {numberKFormat(1200)}</div>
                        </div>
                        <div className="product_ratings group-hover:hidden flex items-center text-sm ">
                            <div className="font-bold">4.9</div>
                            <div>/5.0</div>
                            <div className="ml-1">(123)</div>
                        </div>
                    </div>
                </SwiperSlide>
            </>
        )
    }

    React.useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        setTimeout(() => {
            setDataLoading(false);
        }, 1000);
    }, []);

    React.useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        if (location.state) {
            let { product_id } = location.state;
            if (product_id) {
                fetchProductsBySubCategory(product_id);
            }
        }
    }, [location.state]);

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
                                <div className="breadcrumb-content w-[80rem] mx-auto px-[30px] py-4 flex items-center gap-2">
                                    <div onClick={() => navigate("/")} className="cursor-pointer hover:underline">Trang chủ</div>
                                    <MdOutlineArrowForwardIos />
                                    <div
                                        className="cursor-pointer hover:underline"
                                        onClick={() => handleCategoryNavigation(activeCategory.id, activeCategory.title)}
                                    >
                                        {activeCategory.title}
                                    </div>
                                    <MdOutlineArrowForwardIos />
                                    <div
                                        className="cursor-pointer hover:underline"
                                        onClick={() => handleSubCategoryNavigation(activeCategory.id, activeCategory.title, activeSubCategory.id, activeSubCategory.title)}
                                    >
                                        {activeSubCategory.title}
                                    </div>
                                    <MdOutlineArrowForwardIos />
                                    <div className="font-medium cursor-pointer hover:underline">{activeProduct.name}</div>
                                </div>
                            </div>
                            <div className="product-detail__content mt-16 mb-24">
                                <div className="main w-[80rem] mx-auto px-[30px]">
                                    <div className="flex">
                                        <div className="product__images mr-16">
                                            <div className="w-80 h-80 flex items-center justify-center">
                                                {/* <img src={selectedImage.image} className="select-none" /> */}
                                                {productDetailInfo.product_image !== "" ?
                                                    <img src={`data:image/jpeg;base64,${productDetailInfo.product_image}`} alt='' />
                                                    :
                                                    <img src={Product01} />
                                                }
                                            </div>
                                            <div className="swiper-list w-80 mt-2 mb-5">
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
                                            </div>
                                        </div>
                                        <div className="product__informations flex-1">
                                            <div className="product__name font-medium text-2xl">{productDetailInfo.name}</div>
                                            <div className="product__rating-stars flex items-center gap-x-3 mt-1">
                                                <div className="flex items-center gap-x-0.5">
                                                    <Rating rating={productDetailInfo.rating_average} />
                                                    <span className="ml-1 text-[#FCB800] font-medium">{productDetailInfo.rating_average}</span>
                                                </div>
                                                <GoDotFill className="text-gray-300 w-3 h-3" />
                                                <div className="product__comment-count text-gray-400 flex items-center gap-x-1">
                                                    <MdOutlineMessage className="w-5 h-5" />
                                                    <span>{productDetailInfo.comment_count} đánh giá</span>
                                                </div>
                                                <GoDotFill className="text-gray-300 w-3 h-3" />
                                                <div className="product__comment-count text-gray-400 flex items-center gap-x-1">
                                                    <IoBagCheckOutline className="w-5 h-5" />
                                                    <span>Đã bán 2k2</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <div className="product__price text-3xl font-medium my-4">{CurrencyFormat(productDetailInfo.currentPrice)}</div>
                                                <div className="product__price text-lg text-gray-400 line-through my-4">{CurrencyFormat(productDetailInfo.price)}</div>
                                            </div>
                                            <div className="shop flex items-center gap-x-4">
                                                <div>Shop: <span className="font-bold text-blue-500 cursor-pointer hover:underline">{productDetailInfo.shop_info.name}</span></div>
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
                                            <div className={selectTypeNoticeClassname}>
                                                <div className="product__type-selection">
                                                    <div className="group">
                                                        {colors && colors.length > 0 &&
                                                            <div>
                                                                <div className="text-gray-500 mb-2">Màu Sắc</div>
                                                                <div className="flex gap-x-2">
                                                                    {
                                                                        colors.map((item, index) => {
                                                                            return (
                                                                                <div
                                                                                    key={`color-item-${item.id}`}
                                                                                    className={selectProductTypeClassname(item.select)}
                                                                                    onClick={() => handleSelectProductType(item.id, "COLORS")}
                                                                                >
                                                                                    {item.label}
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        }
                                                        {sizes && sizes.length > 0 &&
                                                            <div className="mt-4 mb-6">
                                                                <div className="text-gray-500 mb-2">Size</div>
                                                                <div className="flex gap-x-2">
                                                                    {
                                                                        sizes.map((item, index) => {
                                                                            return (
                                                                                <div
                                                                                    key={`size-item-${item.id}`}
                                                                                    className={selectProductTypeClassname(item.select)}
                                                                                    onClick={() => handleSelectProductType(item.id, "SIZES")}
                                                                                >
                                                                                    {item.label}
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        }

                                                    </div>
                                                </div>
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
                                                {
                                                    selectTypeNotice && <div className="text-red-500 mt-4">Vui lòng chọn phân loại hàng</div>
                                                }
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
                                    <div className="border-t border-gray-300 w-full my-4"></div>
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
                                            <>
                                                <div className="product__info-description w-[50rem] text-gray-500 text-justify mb-5">{productDetailInfo.description}</div>
                                                <div className="w-[37rem] flex border boder-gray-400 mb-16">
                                                    <table className='w-1/3'>
                                                        <tbody>
                                                            <tr className='border-b boder-gray-400 bg-[#EFF2F4]'>
                                                                <td className="text-gray-600 py-2 px-2">Model</td>
                                                            </tr>
                                                            <tr className='border-b boder-gray-400 bg-[#EFF2F4]'>
                                                                <td className="text-gray-600 py-2 px-2">Style</td>
                                                            </tr>
                                                            <tr className='border-b boder-gray-400 bg-[#EFF2F4]'>
                                                                <td className="text-gray-600 py-2 px-2">Certificate</td>
                                                            </tr>
                                                            <tr className='border-b boder-gray-400 bg-[#EFF2F4]'>
                                                                <td className="text-gray-600 py-2 px-2">Size</td>
                                                            </tr>
                                                            <tr className='bg-[#EFF2F4]'>
                                                                <td className="text-gray-600 py-2 px-2">Memory</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <table className='w-2/3'>
                                                        <tbody>
                                                            <tr className='border-b boder-gray-400'>
                                                                <td className="py-2 px-2">#8786867</td>
                                                            </tr>
                                                            <tr className='border-b boder-gray-400'>
                                                                <td className="py-2 px-2">Classic style</td>
                                                            </tr>
                                                            <tr className='border-b boder-gray-400'>
                                                                <td className="py-2 px-2">ISO-898921212</td>
                                                            </tr>
                                                            <tr className='border-b boder-gray-400'>
                                                                <td className="py-2 px-2">34mm x 450mm x 19mm</td>
                                                            </tr>
                                                            <tr className=''>
                                                                <td className="py-2 px-2">36GB RAM</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </>
                                        }
                                        {
                                            productDetail[1].selected &&
                                            <>
                                                <div className="border bg-gray-100 border-gray-300 p-5 mb-8">
                                                    <div className="product_ratings flex items-center gap-x-3 mb-4">
                                                        <div className="text-3xl font-bold text-[#FCB800]">5.0</div>
                                                        <div className="flex items-center">
                                                            {
                                                                [...Array(5)].map((item, index) => {
                                                                    return (
                                                                        <GoStarFill className="text-[#FCB800] w-5 h-5" />
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="product_rating_filter flex items-center gap-x-2">
                                                        <div className={ratingFilter === 0 ? "border border-[#FCB800] bg-white w-fit px-5 py-2 text-[#FCB800] font-medium cursor-pointer" : "border border-gray-300 bg-white w-fit px-5 py-2 cursor-pointer"} onClick={() => setRatingFilter(0)}>Tất cả</div>
                                                        <div className={ratingFilter === 5 ? "border border-[#FCB800] bg-white w-fit px-5 py-2 text-[#FCB800] font-medium cursor-pointer" : "border border-gray-300 bg-white w-fit px-5 py-2 cursor-pointer"} onClick={() => setRatingFilter(5)}>5 sao (232)</div>
                                                        <div className={ratingFilter === 4 ? "border border-[#FCB800] bg-white w-fit px-5 py-2 text-[#FCB800] font-medium cursor-pointer" : "border border-gray-300 bg-white w-fit px-5 py-2 cursor-pointer"} onClick={() => setRatingFilter(4)}>4 sao (12)</div>
                                                        <div className={ratingFilter === 3 ? "border border-[#FCB800] bg-white w-fit px-5 py-2 text-[#FCB800] font-medium cursor-pointer" : "border border-gray-300 bg-white w-fit px-5 py-2 cursor-pointer"} onClick={() => setRatingFilter(3)}>3 sao (31)</div>
                                                        <div className={ratingFilter === 2 ? "border border-[#FCB800] bg-white w-fit px-5 py-2 text-[#FCB800] font-medium cursor-pointer" : "border border-gray-300 bg-white w-fit px-5 py-2 cursor-pointer"} onClick={() => setRatingFilter(2)}>2 sao (4)</div>
                                                        <div className={ratingFilter === 1 ? "border border-[#FCB800] bg-white w-fit px-5 py-2 text-[#FCB800] font-medium cursor-pointer" : "border border-gray-300 bg-white w-fit px-5 py-2 cursor-pointer"} onClick={() => setRatingFilter(1)}>1 sao (1)</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    {productDetailInfo.reviews && productDetailInfo.reviews.length > 0 &&
                                                        productDetailInfo.reviews.map((item, index) => {
                                                            return (
                                                                <div key={`customer-comment-${item.id}`} className="mb-10">
                                                                    <div className="flex gap-x-2 mb-3">
                                                                        <div className="w-12 h-12 rounded-full bg-cyan-200 flex items-center justify-center text-cyan-600">CS</div>
                                                                        <div className="flex flex-col">
                                                                            <div className="flex items-center gap-x-2">
                                                                                <div className="font-medium">{item.customer_name}</div>
                                                                                <Rating rating={item.rating} />
                                                                            </div>
                                                                            <div className="text-gray-600">{dateFormat(`${item.createdAt}`)}</div>
                                                                        </div>

                                                                    </div>
                                                                    <div className="w-[50rem] text-gray-500">{item.comment}</div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </>
                                        }
                                        <div>
                                            <div className="font-medium text-xl">Các sản phẩm liên quan</div>
                                            <div className="banner w-full mb-5">
                                                <Swiper
                                                    navigation={true}
                                                    modules={[Navigation]}
                                                    className="mySwiper product-list"
                                                    spaceBetween={10}
                                                    slidesPerView={5}
                                                >
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