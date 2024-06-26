import LoadImage from "@/components/LoadImage";
import { PRODUCT_PRICE_SORT, PRODUCT_PRICE_SORT_LIST } from "@/data/category";
import { CurrencyFormat, numberKFormat } from "@/utils/numberFormat";
import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoBagCheckOutline, IoEyeOutline, IoListOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { PiShoppingCartLight } from "react-icons/pi";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useImmer } from "use-immer";
import ProductRating from "../Category/ProductRating";
import { IAccount, ICartItem } from "./ProductDetailPage_types";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducer/rootReducer";
import { INewCartItem, createCartItem, fetchCartItem } from "@/services/cartItemService";
import { AddCartItem, AddWishListItem } from "@/redux/actions/action";
import { successToast1 } from "@/components/Toast/Toast";
import { createWishListItem, fetchWishList } from "@/services/wishListService";
import { saveCustomerActivity, saveCustomerSearch } from "@/services/customerService";
import { INewWishListItem, IWishList } from "../FavoriteProduct/FavoriteProductPage_types";
import _ from "lodash";
import Modal from "@/components/Modal";
import Rating from "@/components/Rating";
import { GoDotFill } from "react-icons/go";
import ReactQuill from "react-quill";
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa6";

interface IShopInfo {
    id: number
    name: string
}

interface ICategory {
    id: number
    title: string
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

const CATEGORY_LIST = [
    {
        id: 0,
        title: "Tất Cả"
    },
    {
        id: 1,
        title: "KIT"
    },
    {
        id: 2,
        title: "Switch"
    },
    {
        id: 3,
        title: "Keycabs"
    },
    {
        id: 4,
        title: "Chuột và Lót chuột"
    },
    {
        id: 5,
        title: "Phím cơ Gaming"
    }
]

const ShopPage = () => {

    const [searchParams] = useSearchParams();

    const account: IAccount = useSelector<RootState, IAccount>(state => state.user.account);
    const isAuthenticated = useSelector<RootState, boolean>(state => state.user.isAuthenticated);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [dataLoading, setDataLoading] = React.useState<boolean>(true);

    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);
    const [amount, setAmount] = React.useState<number>(1);

    const [categoryID, setCategoryID] = React.useState<number>(0);
    const [categoryList, setCategoryList] = React.useState<ICategory[]>(CATEGORY_LIST);
    const [productList, setProductList] = React.useState<ICategoryProduct[]>([]);

    const [productListLoading, setProductListLoading] = React.useState<boolean>(false);
    const [productListFetch, setProductListFetch] = React.useState<boolean>(false);
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

    const handleProductAmount = (num: any) => {
        if (!isNaN(num) && num > 0) {
            setAmount(num);
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

    const handleSelectSubCategory = (category_shop_id: number) => {
        // navigate({
        //     pathname: "/sub-category",
        //     search: `?id=${sub_category_id}&page=1`,
        // });
    }

    const handleProductPriceSort = (item_id: number) => {

        let sort_item = PRODUCT_PRICE_SORT[`${item_id}`];
        setPriceArrangement(sort_item);

        // let sortProductListRaw = _.cloneDeep(productList);

        // if (sort_item.value !== "") {

        //     let sortProductList = _.orderBy(sortProductListRaw, 'current_price', sort_item.value.toLowerCase());
        //     setProductList(sortProductList);

        //     setProductListLoading(true);

        //     setTimeout(() => {
        //         setProductListLoading(false);
        //     }, PRODUCT_PRICE_SORT_TIME);
        // }
    }

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1);

        // navigate({
        //     pathname: "/category",
        //     search: `?id=${categoryID}&page=${+event.selected + 1}`,

        // }, {
        //     replace: true
        // });
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
                    <div className="shop-page-container">
                        <div className="shop-page__info w-[80rem] mx-auto px-[30px] py-4">SHOP INFO</div>
                        <div className="shop-page__content bg-[#F5F5F5] pt-10 pb-4">
                            <div className="main w-[80rem] mx-auto px-[30px] flex gap-x-3">
                                <div className="main__category-list w-60 pr-4 py-3 rounded-[4px] bg-[#F5F5F5] h-fit">
                                    <div className="section__title text-lg font-medium mb-3 flex items-center gap-x-2 pb-3 mb-2 border-b border-gray-300"><IoListOutline /> Danh Mục</div>
                                    <div className="pl-2">
                                        {categoryList.map((item, index) => {
                                            return (
                                                <div
                                                    key={`shop-category-item-${index}`}
                                                    className="mb-2 duration-300 cursor-pointer hover:text-[#FCB800]"
                                                    onClick={() => handleSelectSubCategory(item.id)}
                                                >{item.title}</div>
                                            )
                                        })}
                                    </div>

                                </div>
                                <div className="main__product-list flex-1">
                                    <div className="filter-box flex items-center bg-[#EDEDED] p-4">
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
                                                                    key={`sort-price-category-item-${item.id}`}
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
                                                                                    <div className="product bg-white shadow border border-[#EEEEEE] px-4 py-2" key={`category-loding-item-${index}`}>
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
                                                                            {productList.length > 0 && productList.map((item, index) => {
                                                                                return (
                                                                                    <div className="product bg-white shadow border border-white hover:border-gray-400 hover:shadow-md cursor-pointer px-4 py-2 group" key={`category-item-grid-${item.id}`} onClick={() => handleProductDetailNavigation(item.id, item.name)}>
                                                                                        <div className="product__image flex flex-col items-center justify-center relative">
                                                                                            {/* <LoadImageS3 img_style="w-40 h-60" img_url={item.image} /> */}
                                                                                            <LoadImage img_style="w-40 h-60" product_id={item.id} />
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
                                                                                            <div className="product__current-price font-medium text-lg">{CurrencyFormat(item.current_price)}</div>
                                                                                            <div className="product__price text-gray-400 text-sm line-through">{CurrencyFormat(item.current_price)}</div>
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
                                </div>
                            </div>
                        </div>
                    </div>
            }
            <Modal show={showQuickView} setShow={setShowQuickView} size="customize">
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
                            <div className="product__current-price  text-2xl font-bold">{CurrencyFormat(productQuickView.current_price)}</div>
                            <div className="product__price text-gray-400 text-sm line-through">{CurrencyFormat(productQuickView.current_price)}</div>
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

export default ShopPage;