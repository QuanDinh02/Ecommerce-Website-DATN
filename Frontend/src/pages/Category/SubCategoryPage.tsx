import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineArrowForwardIos, MdKeyboardArrowDown, MdCancel, MdOutlineMessage } from "react-icons/md";
import { useImmer } from "use-immer";
import { GoDotFill, GoStarFill } from "react-icons/go";
import { BsGrid3X3 } from "react-icons/bs";
import { TfiViewListAlt } from "react-icons/tfi";
import { CurrencyFormat } from '@/utils/numberFormat';
import { FaRegHeart } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { PiShoppingCartLight } from "react-icons/pi";
import { IoBagCheckOutline, IoEyeOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { successToast1 } from "@/components/Toast/Toast";
import Modal from "@/components/Modal";
import Product01 from '../../assets/img/products_by_category/product_01.svg';
import { FiMinus, FiPlus } from "react-icons/fi";
import { getProductsBySubCategory } from "@/services/productService";
import ProductRating from "@pages/Category/ProductRating";
import { TailSpin } from 'react-loader-spinner';
import { IAccount } from "../Product/ProductDetailPage_types";
import { RootState } from "@/redux/reducer/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { createWishListItem, fetchWishList } from "@/services/wishListService";
import { INewWishListItem, IWishList } from "../FavoriteProduct/FavoriteProductPage_types";
import _ from 'lodash';
import { AddWishListItem } from "@/redux/actions/action";
interface ISubCategoryActive {
    id: number
    title: string
}
interface ICategory {
    id: number
    name: string
}

interface ICateogryProduct {
    id: number
    current_price: number
    price: number
    image: string
    name: string
}

interface IData {
    page: number
    page_total: number
    product_list: ICateogryProduct[]
    total_items: number
}

const SubCategoryPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [dataLoading, setDataLoading] = React.useState<boolean>(true);
    const [productListLoading, setProductListLoading] = React.useState<boolean>(true);

    const account: IAccount = useSelector<RootState, IAccount>(state => state.user.account);
    const isAuthenticated = useSelector<RootState, boolean>(state => state.user.isAuthenticated);

    const [previewImage, setPreviewImage] = React.useState("");

    const [activeCategory, setActiveCategory] = React.useState<ICategory>({
        id: 0,
        name: ""
    });

    const [activeSubCategory, setActiveSubCategory] = React.useState<ISubCategoryActive>({
        id: 0,
        title: ""
    });

    const [productList, setProductList] = React.useState<ICateogryProduct[]>([]);

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

    const [priceArrangement, setPriceArrangement] = React.useState<string>("Giá");

    const [itemGrid, setItemGrid] = React.useState<boolean>(true);

    const [showQuickView, setShowQuickView] = React.useState<boolean>(false);
    const [amount, setAmount] = React.useState<number>(1);

    const handleFilter = (id: number) => {
        setFilterItems(draft => {
            draft.forEach(item => {
                if (item.id === id) {
                    item.check = !item.check;
                }
            })
        })
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
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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

    const handleAddFavouriteItem = async (product_id: number, customer_id: number) => {
        if (account && isAuthenticated) {
            let data: INewWishListItem = {
                productID: product_id,
                customerID: customer_id
            }

            let result = await createWishListItem(data);
            if (result && result.EC === 0) {
                refetchWishList();
                successToast1(result.EM);
            }
        } else {
            navigate("/login");
        }
    }

    const hanldeAddShoppingCart = () => {
        successToast1("Thêm vào giỏ hàng thành công");
    }

    const handleQuickView = () => {
        setShowQuickView(true);
    }

    const handleProductAmount = (num: any) => {
        if (!isNaN(num) && num > 0) {
            setAmount(num);
        }
    }

    const fetchProductsBySubCategory = async (sub_category_id: number) => {
        let response: IData = await getProductsBySubCategory(+sub_category_id, currentPage);
        if (response) {
            setProductList(response.product_list);
            setTotalPages(response.page_total);
            setTotalItems(response.total_items);
        }
    }

    const handleCategoryNavigation = (category_id: number, category_title: string) => {
        navigate("/category", { state: { category_id: category_id, category_name: category_title } })
    }

    const handleProductDetailNavigation = (product_id: number) => {
        navigate("/product-detail", { state: { product_id: product_id } });
    }

    React.useEffect(() => {
        let { category_id, category_name, sub_category_id, sub_category_name } = location.state;

        setActiveCategory({
            ...activeCategory, id: category_id, name: category_name
        });

        setActiveSubCategory({
            ...activeSubCategory, id: sub_category_id ? sub_category_id : 0, title: sub_category_name ? sub_category_name : ""
        });

        fetchProductsBySubCategory(sub_category_id);
    }, []);

    React.useEffect(() => {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }

        setTimeout(() => {
            setDataLoading(false);
        }, 1000);

        setTimeout(() => {
            setProductListLoading(false);
        }, 2500);
    }, [])

    React.useEffect(() => {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }
        fetchProductsBySubCategory(activeSubCategory.id);
    }, [currentPage])

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
                        <div className="category__breadcrumb border-b border-gray-300 bg-[#F1F1F1]">
                            <div className="breadcrumb-content w-[80rem] mx-auto px-[30px] py-4 flex items-center gap-2">
                                <div onClick={() => navigate("/")} className="cursor-pointer hover:underline">Trang chủ</div>
                                <MdOutlineArrowForwardIos />
                                <div className="cursor-pointer hover:underline" onClick={() => handleCategoryNavigation(activeCategory.id, activeCategory.name)}>{activeCategory.name}</div>
                                <MdOutlineArrowForwardIos />
                                <div className="font-medium cursor-pointer hover:underline">{activeSubCategory.title}</div>
                            </div>
                        </div>
                        <div className="category__content mt-4 mb-24">
                            <div className="main w-[80rem] mx-auto px-[30px] flex gap-x-3">
                                <div className="main__filter-sidebar w-60 px-4 py-3 rounded-[4px] bg-[#EEEEEE] h-fit">
                                    {/* <div className="section">
                                        <div className="section__title text-lg mb-3">Thương hiệu</div>
                                        {filterItems.map((item, index) => {
                                            return (
                                                <div key={`category-item-${index}`} className="mb-2 duration-300 group cursor-pointer flex items-center gap-x-2" onClick={() => handleFilter(item.id)}>
                                                    {
                                                        item.check ?
                                                            <>
                                                                <div className="w-5 h-5 border-2 rounded-[2px] bg-white border-[#FCB800] flex items-center justify-center"><FaCheck className="w-4 h-4 text-[#FCB800]" /></div>
                                                                <div className="group-hover:text-[#FCB800]">{item.name}</div>
                                                            </>
                                                            :
                                                            <>
                                                                <div className="w-5 h-5 border-2 border-gray-300 rounded-[2px] bg-white group-hover:border-[#FCB800]"></div>
                                                                <div className="group-hover:text-[#FCB800]">{item.name}</div>
                                                            </>
                                                    }
                                                </div>
                                            )
                                        })}
                                        <div className="flex items-center gap-1 cursor-pointer font-medium text-[#FCB800] hover:underline">Xem thêm <MdKeyboardArrowDown /></div>
                                    </div>
                                    <div className="section-breakline border-t border-gray-300 my-4"></div> */}
                                    <div className="section">
                                        <div className="section__title text-lg mb-3">Chọn khoảng giá</div>
                                        <div className="flex items-center gap-x-2">
                                            <input type="text" className="border border-gray-300 bg-white px-3 py-2 text-sm w-1/2 rounded-[4px]" placeholder="Tối thiểu" />
                                            <div>-</div>
                                            <input type="text" className="border border-gray-300 bg-white px-3 py-2 text-sm w-1/2 rounded-[4px]" placeholder="Tối đa" />
                                        </div>
                                        <div className="my-2 w-full py-2 text-center border-2 rounded-[4px] border-[#FCB800] bg-white text-[#FCB800] hover:bg-[#FCB800] hover:text-white cursor-pointer">Áp dụng</div>
                                    </div>
                                    <div className="section-breakline border-t border-gray-300 my-4"></div>
                                    <div className="section">
                                        <div className="section__title text-lg mb-3">Đánh giá</div>
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
                                        <div className="box__top rounded-t-[4px] bg-[#EEEEEE] px-4 pt-2 pb-4">
                                            <div className="text-2xl my-2">{activeSubCategory.id !== 0 ? activeSubCategory.title : activeCategory.name}</div>
                                            <div className="flex items-center gap-x-1 mb-5">
                                                <span className="font-medium">299</span>
                                                <span className="text-gray-500">sản phẩm được tìm thấy trong Điện thoại/ Phụ kiện</span>
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
                                                                <span>{priceArrangement}</span> <MdKeyboardArrowDown className="w-6 h-6" />
                                                            </div>
                                                            <div className="absolute top-100 border border-gray-300 hidden group-hover:block">
                                                                <div className="px-2.5 py-2 w-52 bg-white cursor-pointer hover:text-[#FCB800]" onClick={() => setPriceArrangement("Giá: Thấp đến Cao")}>Giá: Thấp đến Cao</div>
                                                                <div className="px-2.5 py-2 w-52 bg-white cursor-pointer hover:text-[#FCB800]" onClick={() => setPriceArrangement("Giá: Cao đến Thấp")}>Giá: Cao đến Thấp</div>
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
                                        <div className="box__bottom rounded-b-[4px] bg-[#EEEEEE] px-4 py-2 mt-1">
                                            <div className="content flex items-center gap-x-4">
                                                <div>Lọc theo:</div>
                                                <div className="filter-items flex items-center gap-x-2">
                                                    <div className="flex items-center gap-x-2 px-4 py-2 rounded-full border border-[#FCB800] bg-orange-100">
                                                        <span>từ 5 sao</span>
                                                        <MdCancel className="text-[#FCB800] w-6 h-6 cursor-pointer" />
                                                    </div>
                                                    <div className="flex items-center gap-x-2 px-4 py-2 rounded-full border border-[#FCB800] bg-orange-100">
                                                        <span>logitech</span>
                                                        <MdCancel className="text-[#FCB800] w-6 h-6 cursor-pointer" />
                                                    </div>
                                                </div>
                                                <div className="text-[#FCB800] font-bold hover:underline cursor-pointer">Xóa tất cả</div>
                                            </div>
                                        </div>
                                    </div>
                                    {itemGrid ?
                                        <>
                                            {
                                                productList && productList.length > 0 ?
                                                    <div className="product-list grid grid-cols-4 gap-y-6 gap-x-2 px-4 mt-3 mb-16">
                                                        {
                                                            <>
                                                                {
                                                                    productListLoading ?
                                                                        <>
                                                                            {productList.length > 0 && productList.map((item, index) => {
                                                                                return (
                                                                                    <div className="product border border-white px-4 py-2" key={`sub-category-loading-item-${index}`}>
                                                                                        <div className="product__image flex items-center justify-center">
                                                                                            <div className="w-40 h-60 bg-gray-200 rounded-lg dark:bg-gray-300 animate-pulse"></div>
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
                                                                                        className="product border border-white hover:border-gray-400 cursor-pointer px-4 py-2 group"
                                                                                        key={`sub-category-item-${index}`}
                                                                                        onClick={() => {
                                                                                            handleProductDetailNavigation(item.id);
                                                                                        }}
                                                                                    >
                                                                                        <div className="product__image flex items-center justify-center">
                                                                                            {item.image ?
                                                                                                <img src={`data:image/jpeg;base64,${item.image}`} alt='' className="w-40 h-60" />
                                                                                                :
                                                                                                <img src={Product01} className="w-40 h-60" />
                                                                                            }
                                                                                        </div>
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
                                                                                                handleQuickView();
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
                                                                                                handleAddFavouriteItem(item.id, account.customer_id);
                                                                                            }}>
                                                                                                <IoMdHeartEmpty className="w-6 h-6" />
                                                                                                <div className="tooltip-box absolute top-[-40px] flex flex-col items-center">
                                                                                                    <div className="tooltip bg-black text-white rounded-[4px] py-1 px-3 w-40 text-center">
                                                                                                        <span className="text-sm">Yêu thích</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="product__name text-blue-600 mt-3 mb-2 line-clamp-2 text-sm duration-300 hover:text-[#FCB800] h-10">{item.name}</div>
                                                                                        <div className="flex items-center gap-2 mb-2">
                                                                                            <div className="product__current-price font-medium text-lg">{CurrencyFormat(item.current_price)}</div>
                                                                                            <div className="product__price text-gray-400 text-sm line-through">{CurrencyFormat(item.current_price)}</div>
                                                                                        </div>

                                                                                        <ProductRating
                                                                                            ratings={4.9}
                                                                                            ratings_count={123}
                                                                                            selling_count={123}
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
                                        <div className="product-list flex flex-col gap-x-4 mt-8 mb-16">
                                            {productList && productList.length > 0 && productList.map((item, index) => {
                                                return (
                                                    <div className="product flex border border-white border-b-gray-200 cursor-pointer mb-4 pb-4 hover:border hover:border-gray-400 p-4"
                                                        key={`sub-category-column-item-${index}`}
                                                        onClick={() => {
                                                            handleProductDetailNavigation(item.id);
                                                        }}
                                                    >
                                                        <div className="product__image w-44 mx-auto mb-12">
                                                            {item.image ?
                                                                <img src={`data:image/jpeg;base64,${item.image}`} alt='' className="w-40 h-60" />
                                                                :
                                                                <img src={Product01} className="w-40 h-60" />
                                                            }
                                                        </div>
                                                        <div className="flex-1 flex justify-between">
                                                            <div className="product__left-content w-80">
                                                                <div className="product__name text-blue-600 mb-2 line-clamp-2 duration-300 hover:text-[#FCB800]">{item.name}</div>
                                                                <ProductRating
                                                                    ratings={4.9}
                                                                    ratings_count={123}
                                                                    selling_count={123}
                                                                    key={`item-rating-${item.id}`}
                                                                    item_grid={false}
                                                                />
                                                                <div className="product__benefit text-sm text-gray-400 flex flex-col gap-1 mt-4">
                                                                    <div>Unrestrained and portable active stereo speaker</div>
                                                                    <div>Free from the confines of wires and chords</div>
                                                                    <div>20 hours of portable capabilities</div>
                                                                    <div>Double-ended Coil Cord with 3.5mm Stereo Plugs Included</div>
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
                                                                    hanldeAddShoppingCart();
                                                                }}>Thêm vào giỏ hàng</div>
                                                                <div className="mt-2 flex items-center gap-x-1 text-gray-400 hover:text-red-600 hover:font-medium w-fit" onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleAddFavouriteItem(item.id, account.customer_id);
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
                                        <div className='pagination-container flex justify-center'>
                                            <ReactPaginate
                                                nextLabel=">"
                                                onPageChange={handlePageClick}
                                                pageRangeDisplayed={3}
                                                marginPagesDisplayed={3}
                                                pageCount={totalPages}
                                                previousLabel="<"
                                                pageClassName="page-item"
                                                pageLinkClassName="page-link page-background"
                                                previousClassName="page-item"
                                                previousLinkClassName="page-link pre-next"
                                                nextClassName="page-item"
                                                nextLinkClassName="page-link pre-next"
                                                breakLabel="..."
                                                breakClassName="page-item"
                                                breakLinkClassName="page-link"
                                                containerClassName="pagination flex items-center gap-2 "
                                                activeLinkClassName="page-active-background"
                                                renderOnZeroPageCount={null}
                                            />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
            }
            <Modal show={showQuickView} setShow={setShowQuickView} size="customize">
                <div className="product-quick-view flex w-full relative">
                    <div className="product-quick-view__image w-2/5">
                        <img src={Product01} alt="" className="w-[26.875rem] h-[26.875rem]" />
                    </div>
                    <div className="product-quick-view__info w-3/5">
                        <div className="product__name font-medium text-2xl">Apple iPhone Retina 6s Plus 64GB</div>
                        <div className="product__rating-stars flex items-center gap-x-3 mt-1">
                            <div className="flex items-center gap-x-0.5">
                                {
                                    [...Array(5)].map((item, index) => {
                                        return (
                                            <GoStarFill className="text-[#FCB800]" />
                                        )
                                    })
                                }
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
                            <div className="text-gray-600 hover:text-red-500 duration-300 cursor-pointer"><FaRegHeart className="w-7 h-7" /></div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default SubCategoryPage;