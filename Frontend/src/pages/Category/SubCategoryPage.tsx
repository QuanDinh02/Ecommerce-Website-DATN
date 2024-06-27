import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MdOutlineArrowForwardIos, MdKeyboardArrowDown } from "react-icons/md";
import { useImmer } from "use-immer";
import { GoDotFill, GoStarFill } from "react-icons/go";
import { BsGrid3X3 } from "react-icons/bs";
import { TfiViewListAlt } from "react-icons/tfi";
import { CurrencyFormat, numberKFormat } from '@/utils/numberFormat';
import { FaRegHeart } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { PiShoppingCartLight } from "react-icons/pi";
import { IoBagCheckOutline, IoEyeOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { successToast1 } from "@/components/Toast/Toast";
import Modal from "@/components/Modal";
import { FiMinus, FiPlus } from "react-icons/fi";
import { getProductsBySubCategory } from "@/services/productService";
import ProductRating from "@pages/Category/ProductRating";
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import { IAccount, ICartItem } from "../Product/ProductDetailPage_types";
import { RootState } from "@/redux/reducer/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { createWishListItem, fetchWishList } from "@/services/wishListService";
import { INewWishListItem, IWishList } from "../FavoriteProduct/FavoriteProductPage_types";
import _ from 'lodash';
import { AddCartItem, AddWishListItem } from "@/redux/actions/action";
import { saveCustomerActivity, saveCustomerSearch } from "@/services/customerService";
import { INewCartItem, createCartItem, fetchCartItem } from "@/services/cartItemService";
import {
    PRODUCT_PRICE_SORT, PRODUCT_PRICE_SORT_LIST,
    PRODUCT_PRICE_SORT_TIME
} from "@/data/category";

import { getSubCategoryInfo } from "@/services/subCategoryService";
import LoadImageS3 from "@/components/LoadImageS3";
import Rating from "@/components/Rating";
import LoadImage from "@/components/LoadImage";
import ReactQuill from "react-quill";
import classNames from "classnames";

interface ISubCategoryActive {
    id: number
    title: string
}
interface ICategory {
    id: number
    name: string
}

interface ICategoryProduct {
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

interface IData {
    page: number
    page_total: number
    product_list: ICategoryProduct[]
    total_items: number
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

const SubCategoryPage = () => {

    const [searchParams] = useSearchParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [dataLoading, setDataLoading] = React.useState<boolean>(true);
    const [subCategoryID, setSubCategoryID] = React.useState<number>(0);

    const [productListLoading, setProductListLoading] = React.useState<boolean>(true);
    const [productListFetch, setProductListFetch] = React.useState<boolean>(true);

    const account: IAccount = useSelector<RootState, IAccount>(state => state.user.account);
    const isAuthenticated = useSelector<RootState, boolean>(state => state.user.isAuthenticated);

    const [scrollPosition, setScrollPosition] = React.useState(0);

    const [activeCategory, setActiveCategory] = React.useState<ICategory>({
        id: 0,
        name: ""
    });

    const [activeSubCategory, setActiveSubCategory] = React.useState<ISubCategoryActive>({
        id: 0,
        title: ""
    });

    const [productList, setProductList] = React.useState<ICategoryProduct[]>([]);

    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(20);
    const [totalItems, setTotalItems] = React.useState<number>(0);

    const [filterItems, setFilterItems] = useImmer([
        {
            id: 1,
            name: "Apple",
            check: false
        },
        {
            id: 2,
            name: "Samsung",
            check: false
        },
        {
            id: 3,
            name: "Logitech",
            check: false
        },
        {
            id: 4,
            name: "HP",
            check: false
        },
        {
            id: 5,
            name: "Oppo",
            check: false
        },
    ]);

    const [arrangement, setArrangement] = useImmer([
        {
            id: 1,
            label: "Phổ Biến",
            selected: true
        },
        {
            id: 2,
            label: "Mới Nhất",
            selected: false
        },
        {
            id: 3,
            label: "Bán Chạy",
            selected: false
        },
    ]);

    const [priceArrangement, setPriceArrangement] = React.useState({
        id: 0,
        label: "Tất Cả",
        value: ""
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

    const [itemGrid, setItemGrid] = React.useState<boolean>(true);

    const [showQuickView, setShowQuickView] = React.useState<boolean>(false);
    const [amount, setAmount] = React.useState<number>(1);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    const breadCrumbStickyStyle = classNames(
        "category__breadcrumb border-b border-gray-200 bg-white",
        {
            'sticky top-[76px] border-gray-300 z-40': scrollPosition > 144
        }
    );

    const handleFilter = (id: number) => {
        setFilterItems(draft => {
            draft.forEach(item => {
                if (item.id === id) {
                    item.check = !item.check;
                }
            })
        })
    }

    const handleProductPriceSort = (item_id: number) => {

        let sort_item = PRODUCT_PRICE_SORT[`${item_id}`];
        setPriceArrangement(sort_item);

        let sortProductListRaw = _.cloneDeep(productList);

        if (sort_item.value !== "") {

            let sortProductList = _.orderBy(sortProductListRaw, 'current_price', sort_item.value.toLowerCase());
            setProductList(sortProductList);

            setProductListLoading(true);

            setTimeout(() => {
                setProductListLoading(false);
            }, PRODUCT_PRICE_SORT_TIME);
        }
    }

    const handleArrangement = (id: number) => {
        setArrangement(draft => {
            draft.forEach(item => {
                if (item.id === id) {
                    item.selected = true;
                }
                else {
                    item.selected = false;
                }
            })
        })
    }

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1);

        navigate({
            pathname: "/sub-category",
            search: `?id=${subCategoryID}&page=${+event.selected + 1}`,

        }, {
            replace: true
        });
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

    const handleQuickView = (item: ICategoryProduct) => {

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

    const handleProductAmount = (num: any) => {
        if (!isNaN(num) && num > 0) {
            setAmount(num);
        }
    }

    const setLoadingAnimation = () => {
        setProductListFetch(false);
        setProductListLoading(true);
        setTimeout(() => {
            setProductListLoading(false);
        }, 1500);
    }

    const fetchSubCategoryInfo = async (sub_category_id: number) => {
        let sub_category_info = await getSubCategoryInfo(sub_category_id);
        if (sub_category_info) {

            setActiveSubCategory({
                ...activeSubCategory, id: sub_category_info.id, title: sub_category_info.title
            })

            let category_info = sub_category_info.category_info;

            if (category_info.id !== null) {
                setActiveCategory({
                    ...activeCategory, id: category_info.id, name: category_info.title
                });
            }
        }
    }

    const fetchProductsBySubCategory = async (sub_category_id: number) => {
        let response: IData = await getProductsBySubCategory(+sub_category_id, currentPage);
        if (response) {
            if (priceArrangement.value === "") {
                setProductList(response.product_list);
                setTotalPages(response.page_total);
                setTotalItems(response.total_items);
                setLoadingAnimation();
            } else {
                let product_list = response.product_list;
                switch (priceArrangement.value) {
                    case "ASC":
                        let sortProductList1 = _.orderBy(product_list, 'current_price', "asc");
                        setProductList(sortProductList1);
                        setLoadingAnimation();
                        return;
                    case "DESC":
                        let sortProductList2 = _.orderBy(product_list, 'current_price', "desc");
                        setProductList(sortProductList2);
                        setLoadingAnimation();
                        return;
                }
            }
        }
    }

    const handleCategoryNavigation = (category_id: number) => {
        navigate({
            pathname: "/category",
            search: `?id=${category_id}&page=1`,
        });
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
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    React.useEffect(() => {

        let sub_category_id = searchParams.get('id');

        let activeSubCategoryID: number = sub_category_id ? +sub_category_id : 0;

        if (activeSubCategoryID !== subCategoryID) {
            setSubCategoryID(activeSubCategoryID);
            fetchSubCategoryInfo(activeSubCategoryID);
        }

    }, [searchParams.get('id')]);

    React.useEffect(() => {

        let page = searchParams.get('page');

        let activePage: number = page ? +page : 1;

        if (activePage !== currentPage) {
            setCurrentPage(activePage);
        }

    }, [searchParams.get('page')])

    React.useEffect(() => {

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        if (subCategoryID !== 0 && currentPage != 0) {
            fetchProductsBySubCategory(subCategoryID);
        }

    }, [subCategoryID, currentPage]);

    React.useEffect(() => {

        setTimeout(() => {
            setDataLoading(false);
        }, 1000);

    }, []);

    return (
        <>
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
                    <div className="category-container">
                        <div className={breadCrumbStickyStyle}>
                            <div className="breadcrumb-content w-[80rem] mx-auto px-[30px] py-4 flex items-center gap-2">
                                <div onClick={() => navigate("/")} className="cursor-pointer hover:underline">Trang chủ</div>
                                <MdOutlineArrowForwardIos />
                                <div className="cursor-pointer hover:underline" onClick={() => handleCategoryNavigation(activeCategory.id)}>{activeCategory.name}</div>
                                <MdOutlineArrowForwardIos />
                                <div className="font-medium cursor-pointer hover:underline">{activeSubCategory.title}</div>
                            </div>
                        </div>
                        <div className="category__content bg-[#F5F5F5] pt-4 pb-4">
                            <div className="main w-[80rem] mx-auto px-[30px] flex gap-x-3">
                                <div className="main__filter-sidebar w-60 pr-4 py-3 rounded-[4px] bg-[#F5F5F5] h-fit">
                                    <div className="section">
                                        <div className="section__title text-lg mb-3 font-medium">Chọn khoảng giá</div>
                                        <div className="flex items-center gap-x-2">
                                            <input type="text" className="border border-gray-300 bg-white px-3 py-2 text-sm w-1/2 rounded-[4px]" placeholder="Tối thiểu" />
                                            <div>-</div>
                                            <input type="text" className="border border-gray-300 bg-white px-3 py-2 text-sm w-1/2 rounded-[4px]" placeholder="Tối đa" />
                                        </div>
                                        <div className="my-2 w-full py-2 text-center border-2 rounded-[4px] border-[#FCB800] bg-white text-[#FCB800] hover:bg-[#FCB800] hover:text-white cursor-pointer">Áp dụng</div>
                                    </div>
                                    <div className="section-breakline border-t border-gray-300 my-4"></div>
                                    <div className="section">
                                        <div className="section__title text-lg mb-3 font-medium">Đánh giá</div>
                                        <div className="ratings-filter">
                                            <div className="5-stars flex items-center gap-x-4 cursor-pointer group mb-1">
                                                <div className="flex items-center gap-x-1 bg-yellow-100 p-1 rounded-[4px] border border-[#FCB800]">
                                                    <GoStarFill className="text-[#FCB800]" />
                                                    <GoStarFill className="text-[#FCB800]" />
                                                    <GoStarFill className="text-[#FCB800]" />
                                                    <GoStarFill className="text-[#FCB800]" />
                                                    <GoStarFill className="text-[#FCB800]" />
                                                </div>
                                                <div className="text-gray-400">Từ 5 sao</div>
                                            </div>
                                            <div className="4-stars flex items-center gap-x-4 cursor-pointer group mb-1">
                                                <div className="flex items-center gap-x-1 p-1">
                                                    <GoStarFill className="text-[#FCB800]" />
                                                    <GoStarFill className="text-[#FCB800]" />
                                                    <GoStarFill className="text-[#FCB800]" />
                                                    <GoStarFill className="text-[#FCB800]" />
                                                    <GoStarFill className="text-gray-400" />
                                                </div>
                                                <div className="text-gray-400">Từ 4 sao</div>
                                            </div>
                                            <div className="3-stars flex items-center gap-x-4 cursor-pointer group mb-1">
                                                <div className="flex items-center gap-x-1 p-1">
                                                    <GoStarFill className="text-[#FCB800]" />
                                                    <GoStarFill className="text-[#FCB800]" />
                                                    <GoStarFill className="text-[#FCB800]" />
                                                    <GoStarFill className="text-gray-400" />
                                                    <GoStarFill className="text-gray-400" />
                                                </div>
                                                <div className="text-gray-400">Từ 3 sao</div>
                                            </div>
                                            <div className="2-stars flex items-center gap-x-4 cursor-pointer group mb-1">
                                                <div className="flex items-center gap-x-1 p-1">
                                                    <GoStarFill className="text-[#FCB800]" />
                                                    <GoStarFill className="text-[#FCB800]" />
                                                    <GoStarFill className="text-gray-400" />
                                                    <GoStarFill className="text-gray-400" />
                                                    <GoStarFill className="text-gray-400" />
                                                </div>
                                                <div className="text-gray-400">Từ 2 sao</div>
                                            </div>
                                            <div className="1-stars flex items-center gap-x-4 cursor-pointer group mb-1">
                                                <div className="flex items-center gap-x-1 p-1">
                                                    <GoStarFill className="text-[#FCB800]" />
                                                    <GoStarFill className="text-gray-400" />
                                                    <GoStarFill className="text-gray-400" />
                                                    <GoStarFill className="text-gray-400" />
                                                    <GoStarFill className="text-gray-400" />
                                                </div>
                                                <div className="text-gray-400">Từ 1 sao</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="section-breakline border-t border-gray-300 my-4"></div>
                                    <div className="my-2 w-full py-2 text-center border-2 rounded-[4px] border-[#FCB800] bg-[#FCB800] text-white cursor-pointer hover:opacity-80">Xóa tất cả</div>
                                </div>
                                <div className="main__item-list flex-1">
                                    <div className="box">
                                        <div className="box__top rounded-t-[4px] bg-[#EDEDED] px-4 pt-2 pb-4">
                                            <div className="text-2xl my-2">{activeSubCategory.id !== 0 ? activeSubCategory.title : activeCategory.name}</div>
                                            <div className="flex items-center gap-x-1 mb-5">
                                                <span className="font-medium">{totalItems}</span>
                                                <span className="text-gray-500">sản phẩm được tìm thấy trong {activeSubCategory.title}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="mr-4">Sắp xếp theo</div>
                                                    <div className="flex items-center gap-x-2">
                                                        {
                                                            arrangement && arrangement.length > 0 && arrangement.map((item, index) => {
                                                                if (item.selected) {
                                                                    return (
                                                                        <div key={`arrangement-${index}`} className="w-24 py-2 border text-center bg-[#FCB800] text-white border-[#FCB800] cursor-pointer">{item.label}</div>
                                                                    )
                                                                }
                                                                return (
                                                                    <div key={`arrangement-${index}`} className="w-24 py-2 border border-gray-400 text-center bg-white hover:bg-[#FCB800] hover:text-white hover:border-[#FCB800] cursor-pointer"
                                                                        onClick={() => handleArrangement(item.id)}>{item.label}</div>
                                                                )
                                                            })
                                                        }
                                                        <div className="relative group">
                                                            <div className="w-52 py-2 border border-gray-400 px-2.5 bg-white flex items-center justify-between cursor-pointer">
                                                                <span>{priceArrangement.label}</span> <MdKeyboardArrowDown className="w-6 h-6" />
                                                            </div>
                                                            <div className="absolute top-100 border border-gray-300 hidden group-hover:block z-10">
                                                                {
                                                                    PRODUCT_PRICE_SORT_LIST.map(item => {
                                                                        return (
                                                                            <div
                                                                                key={`sort-price-sub-category-item-${item.id}`}
                                                                                className="px-2.5 py-2 w-52 bg-white cursor-pointer hover:text-[#FCB800]"
                                                                                onClick={() => handleProductPriceSort(item.id)}
                                                                            >{item.label}</div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-x-2">
                                                    <BsGrid3X3 className={itemGrid ? "w-5 h-5 text-black cursor-pointer" : "w-5 h-5 text-gray-400 cursor-pointer"} onClick={() => setItemGrid(true)} />
                                                    <TfiViewListAlt className={!itemGrid ? "w-5 h-5 text-black cursor-pointer" : "w-5 h-5 text-gray-400 cursor-pointer"} onClick={() => setItemGrid(false)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {itemGrid ?
                                        <>
                                            {
                                                productList && productList.length > 0 ?
                                                    <div className="product-list grid grid-cols-4 gap-y-6 gap-x-2 px-4 mt-3 mb-8">
                                                        {
                                                            productListFetch ?
                                                                <>
                                                                    <ThreeDots
                                                                        height="80"
                                                                        width="80"
                                                                        color="#FCB800"
                                                                        ariaLabel="three-dots-loading"
                                                                        radius="1"
                                                                        wrapperStyle={{}}
                                                                        wrapperClass="flex items-center justify-center tail-spin"
                                                                        visible={true}
                                                                    />
                                                                </>
                                                                :
                                                                <>
                                                                    {
                                                                        productListLoading ?
                                                                            <>
                                                                                {productList.length > 0 && productList.map((item, index) => {
                                                                                    return (
                                                                                        <div className="product bg-white shadow border border-[#EEEEEE] px-4 py-2" key={`sub-category-loading-item-${index}`}>
                                                                                            <div className="product__image flex items-center justify-center">
                                                                                                <div className="w-40 h-52 bg-gray-200 rounded-lg dark:bg-gray-300 animate-pulse"></div>
                                                                                            </div>
                                                                                            <div className="product__name bg-gray-200 rounded-full dark:bg-gray-300 h-2 animate-pulse mb-1 mt-3"></div>
                                                                                            <div className="product__name bg-gray-200 rounded-full dark:bg-gray-300 h-2 animate-pulse mb-2"></div>
                                                                                            <div className="flex items-center gap-2 mb-2 w-full mb-2">
                                                                                                <div className="product__name bg-gray-200 rounded-full dark:bg-gray-300 h-2 animate-pulse w-1/3"></div>
                                                                                                <div className="product__name bg-gray-200 rounded-full dark:bg-gray-300 h-2 animate-pulse w-2/3"></div>
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                            </>

                                                                            :
                                                                            <>
                                                                                {productList && productList.length > 0 && productList.map((item, index) => {
                                                                                    return (
                                                                                        <div
                                                                                            className="product bg-white shadow border border-white hover:border-gray-400 hover:shadow-md cursor-pointer px-4 py-2 group"
                                                                                            key={`sub-category-item-${index}`}
                                                                                            onClick={() => {
                                                                                                handleProductDetailNavigation(item.id, item.name);
                                                                                            }}
                                                                                        >
                                                                                            <div className="product__image flex items-center justify-center relative">
                                                                                                {/* <LoadImageS3 img_style="w-40 h-52" img_url={item.image} /> */}
                                                                                                <LoadImage img_style="w-40 h-52" product_id={item.id} />
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
                                                                                                        handleQuickView(item);
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
                                                                                            <div className="product__name text-blue-600 mt-3 mb-2 line-clamp-2 text-sm duration-300 hover:text-[#FCB800] h-10">{item.name}</div>
                                                                                            <div className="flex items-center gap-2 mb-2">
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
                                                                                                key={`item-rating-${item.id}`}
                                                                                                item_grid={true}
                                                                                            />
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                            </>
                                                                    }
                                                                </>
                                                        }
                                                    </div>
                                                    :
                                                    <div className="text-lg flex items-center justify-center h-4 text-black w-full my-6">
                                                        <span>Không tìm thấy sản phẩm !</span>
                                                    </div>
                                            }
                                        </>

                                        :
                                        <div className="product-list flex flex-col gap-x-4 mt-8 mb-4">
                                            {productList && productList.length > 0 && productList.map((item, index) => {
                                                return (
                                                    <div className="product bg-white flex border border-white border-b-gray-200 cursor-pointer mb-4 pb-4 hover:border hover:border-gray-400 p-4"
                                                        key={`sub-category-column-item-${index}`}
                                                        onClick={() => {
                                                            handleProductDetailNavigation(item.id, item.name);
                                                        }}
                                                    >
                                                        <div className="product__image w-44 mx-auto mb-12">
                                                            {/* <LoadImageS3 img_style="w-40 h-52" img_url={item.image} /> */}
                                                            <LoadImage img_style="w-40 h-52" product_id={item.id} />
                                                        </div>
                                                        <div className="flex-1 flex justify-between">
                                                            <div className="product__left-content w-80">
                                                                <div className="product__name text-blue-600 mb-2 line-clamp-2 duration-300 hover:text-[#FCB800]">{item.name}</div>
                                                                <ProductRating
                                                                    ratings={item.rating}
                                                                    selling_count={item.sold}
                                                                    key={`item-rating-${item.id}`}
                                                                    item_grid={false}
                                                                />
                                                                <div className="product__description text-sm text-gray-400 mt-4">
                                                                    <ReactQuill
                                                                        value={item.summary}
                                                                        readOnly={true}
                                                                        theme={"bubble"}
                                                                        className="ql-no-border ql-line-clamp-3"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="product__right-content w-60">
                                                                {/* <div className="product__price font-medium text-xl mb-2 tracking-wide mb-2">{CurrencyFormat(item.current_price)}</div> */}
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <div className="product__current-price font-medium text-lg">{CurrencyFormat(item.current_price)}</div>
                                                                    <div className="product__price text-gray-400 text-sm line-through">{CurrencyFormat(item.current_price)}</div>
                                                                </div>
                                                                <div className="w-full py-3 text-black font-bold bg-[#FCB800] text-center rounded-[4px] hover:opacity-80" onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    hanldeAddShoppingCart(1, item.id);
                                                                }}>Thêm vào giỏ hàng</div>
                                                                <div className="mt-2 flex items-center gap-x-1 text-gray-400 hover:text-red-600 hover:font-medium w-fit" onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleAddFavouriteItem(item.id);
                                                                }}><FaRegHeart /> Yêu thích</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    }
                                    {
                                        productList && productList.length > 0 &&
                                        <div className='pagination-container flex justify-center mb-6'>
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
                            </div>
                        </div>

                    </div>
            }
            <Modal show={showQuickView} setShow={setShowQuickView} size="customize-h-auto">
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
                                <div className="w-28 h-11 border border-gray-300 flex items-center hover:border-black duration-300 px-2">
                                    <FiMinus className="w-6 h-6 cursor-pointer text-gray-400 hover:text-black duration-300" onClick={(e) => handleProductAmount(amount - 1)} />
                                    <input type="text" className="w-1/2 text-center outline-none select-none" value={amount} onChange={(e) => handleProductAmount(e.target.value)} />
                                    <FiPlus className="w-6 h-6 cursor-pointer text-gray-400 hover:text-black duration-300" onClick={(e) => handleProductAmount(amount + 1)} />
                                </div>
                            </div>
                            <div className="w-52 py-3 font-medium bg-[#FCB800] text-center rounded-[4px] hover:opacity-80 cursor-pointer" onClick={() => hanldeAddShoppingCart(1, productQuickView.id)}>Thêm vào giỏ hàng</div>
                            <div className="text-gray-600 hover:text-red-500 duration-300 cursor-pointer" onClick={() => handleAddFavouriteItem(productQuickView.id)}><FaRegHeart className="w-7 h-7" /></div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}


export default SubCategoryPage;