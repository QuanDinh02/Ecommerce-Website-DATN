import LoadImage from "@/components/LoadImage";
import { getProductsHistory } from "@/services/productService";
import { CurrencyFormat, numberKFormat } from "@/utils/numberFormat";
import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoBagCheckOutline, IoEyeOutline } from "react-icons/io5";
import { PiShoppingCartLight } from "react-icons/pi";
import ProductRating from "./Category/ProductRating";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducer/rootReducer";
import { INewCartItem, createCartItem, fetchCartItem } from "@/services/cartItemService";
import { errorToast1, successToast1 } from "@/components/Toast/Toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddCartItem, AddWishListItem } from "@/redux/actions/action";
import { ICartItem } from "./Product/ProductDetailPage_types";
import { createWishListItem, fetchWishList } from "@/services/wishListService";
import { INewWishListItem, IWishList } from "./FavoriteProduct/FavoriteProductPage_types";
import { saveCustomerActivity, saveCustomerSearch } from "@/services/customerService";
import { useImmer } from "use-immer";
import Modal from "@/components/Modal";
import Rating from "@/components/Rating";
import { GoDotFill } from "react-icons/go";
import { FiMinus, FiPlus } from "react-icons/fi";
import ReactQuill from "react-quill";
import { FaRegHeart } from "react-icons/fa6";
import _ from 'lodash';
import ReactPaginate from "react-paginate";
import LinkNewTabProductDetail from "@/components/LinkNewTab";
import LoadImageS3 from "@/components/LoadImageS3";

const ITEM_SHOW_LIMIT = 40;

interface IShopInfo {
    id: number
    name: string
}

interface ICustomerAccount {
    customer_id: number
    username: string
    role: string
}

interface IHistoryProduct {
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
    product_list: IHistoryProduct[]
    page_total: number
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

const HistoryViewProductPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [dataLoading, setDataLoading] = React.useState<boolean>(true);
    const [showQuickView, setShowQuickView] = React.useState<boolean>(false);

    const [amount, setAmount] = React.useState<number>(1);

    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(1);

    const [historyProductList, setHistoryProductList] = React.useState<IHistoryProduct[]>([]);

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

    const account: ICustomerAccount = useSelector<RootState, ICustomerAccount>(state => state.user.account);
    const isAuthenticated = useSelector<RootState, boolean>(state => state.user.isAuthenticated);

    const handleCloseQuickView = (active: boolean) => {
        setShowQuickView(active);
        setAmount(1);
    }

    const handleQuickView = (item: IHistoryProduct) => {
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

    const fetchHistoryItems = async (data: number[]) => {
        let response: IData = await getProductsHistory({
            data: data,
            limit: ITEM_SHOW_LIMIT,
            page: currentPage
        });

        if (response) {
            setHistoryProductList(response.product_list);
            setTotalPages(response.page_total);
            setTimeout(() => {
                setDataLoading(false);
            }, 300);
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

    const handleProductAmount = (num: any) => {
        if (!isNaN(num) && num > 0) {
            setAmount(num);
        }
    }

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1);
    }

    React.useEffect(() => {

        setTimeout(() => {
            setDataLoading(false);
        }, 1000);

    }, []);

    React.useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        let history_product_view_list: string | null = localStorage.getItem("hpvl");
        if (history_product_view_list) {
            let old_data = JSON.parse(history_product_view_list);
            setDataLoading(true);
            fetchHistoryItems(old_data);
        }
    }, [currentPage]);

    return (
        <>
            <div className="history-view-product-container w-full bg-[#EEEEEE] min-h-[480px]">
                <div className="main w-[80rem] mx-auto px-[30px] flex flex-col gap-y-3 pb-10">
                    <div className="title my-10 w-full text-center font-medium text-2xl">Các Sản Phẩm Đã Xem</div>
                    <div className="product-list mb-8 grid grid-cols-5 gap-3">
                        {
                            dataLoading ?
                                <>
                                    {[...Array(Math.floor(10))].map((item, index) => {
                                        return (
                                            <div className="product px-4 py-2" key={`category-loding-item-${index}`}>
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
                                    {
                                        historyProductList && historyProductList.length > 0 &&
                                        historyProductList.map((product, index) => {
                                            return (
                                                <div className="product border border-gray-200 bg-white hover:border-gray-400 cursor-pointer px-4 py-2 group h-full" key={`history-product-${product.id}`} onClick={() => handleProductDetailNavigation(product.id, product.name)}>
                                                    <div className="product__image w-40 mx-auto mb-6 py-4 relative">
                                                        <LoadImageS3 img_style="w-full h-40" img_url={product.image} key={`history-product-view-${product.id}`}/>
                                                        {/* <LoadImage img_style="w-full h-40" product_id={product.id} /> */}
                                                        <div className="product__utility w-full absolute bottom-[-10px] bg-white hidden items-center justify-center gap-x-4 mb-2 group-hover:flex duration-300">
                                                            <div className="utility-item w-8 h-8 hover:bg-[#FCB800] hover:rounded-full flex items-center justify-center relative" onClick={(e) => {
                                                                e.stopPropagation();
                                                                if (product.quantity > 0) {
                                                                    hanldeAddShoppingCart(1, product.id);
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
                                                                handleQuickView(product);
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
                                                                handleAddFavouriteItem(product.id);
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
                                                    <div className="product__name text-blue-600 mb-3 line-clamp-2 text-sm duration-300 hover:text-[#FCB800] h-10"><LinkNewTabProductDetail id={product.id} name={product.name} /></div>
                                                    <div className="product__price flex items-center gap-2 mb-2.5">
                                                        {
                                                            product.current_price === product.price ?
                                                                <div className="price text-black font-medium">{CurrencyFormat(product.current_price)}</div>
                                                                :
                                                                <>
                                                                    <div className="price text-[#1A732E] font-medium">{CurrencyFormat(product.current_price)}</div>
                                                                    <div className="old-price text-sm text-gray-500 line-through">{CurrencyFormat(product.price)}</div>
                                                                </>
                                                        }
                                                    </div>
                                                    <ProductRating
                                                        ratings={product.rating}
                                                        selling_count={product.sold}
                                                        key={`item-rating-history-product-${product.id}`}
                                                        item_grid={false}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </>
                        }
                    </div>
                    {
                        totalPages > 1 &&
                        <div className='pagination-history-view-product-container flex justify-center'>
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
                    {
                        !dataLoading && historyProductList.length === 0 &&
                        <div className="w-full text-gray-500 text-center text-lg border border-gray-300 bg-white py-3">Chưa có sản phẩm !</div>
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
                                <span>Đã bán {numberKFormat(productQuickView.sold)}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 my-4">
                            {
                                productQuickView.current_price === productQuickView.price ?
                                    <div className="product__current-price text-2xl font-bold">{CurrencyFormat(productQuickView.current_price)}</div>
                                    :
                                    <>
                                        <div className="product__current-price text-2xl font-bold">{CurrencyFormat(productQuickView.current_price)}</div>
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
                                    </>
                            }
                            <div className="text-gray-600 hover:text-red-500 duration-300 cursor-pointer" onClick={() => handleAddFavouriteItem(productQuickView.id)}><FaRegHeart className="w-7 h-7" /></div>
                        </div>
                    </div>
                </div>
            </Modal>

        </>
    )
}

export default HistoryViewProductPage;