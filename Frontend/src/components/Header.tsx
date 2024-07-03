import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { IoIosSearch } from "react-icons/io";
import { PiShoppingCartLight } from "react-icons/pi";
import { BsHeart, BsPerson } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";

import classNames from 'classnames';
import { CurrencyFormat } from '@/utils/numberFormat';

import CategoryMenu from "@/components/CategoryMenu";
import { CiSearch } from 'react-icons/ci';
import { useDispatch, useSelector } from "react-redux";

import { successToast1 } from './Toast/Toast';

import { UserLogin, AddCartItem, DeleteCartItem, AddWishListItem } from '@/redux/actions/action';
import { RootState } from '@/redux/reducer/rootReducer';

import { getSearchProducts } from '@/services/productService';
import { fetchAccount, userLogout } from '@/services/userService';
import { fetchCartItem, deleteCartItem } from '@/services/cartItemService';
import { fetchWishList } from "@/services/wishListService";
import { saveCustomerSearch } from '@/services/customerService';
import LoadImageS3 from './LoadImageS3';
import LoadImage from "@components/LoadImage";

interface ICustomerAccount {
    customer_id: number
    username: string
    role: string
}

interface ISellerAccount {
    seller_id: number
    username: string
    role: string
}

interface ISearchProduct {
    id: number
    name: string
    selected: boolean
}

interface ICartItemInfo {
    id: number
    name: string
    image: string
}

interface ICartItemShopInfo {
    id: number
    name: string
}
interface ICartItem {
    id: number
    quantity: number
    price: number
    color: string
    size: string
    product_info: ICartItemInfo
    shop_info: ICartItemShopInfo
}

interface IProductInfo {
    id: number
    name: string
    image: string
}

interface IShopInfo {
    id: number
    name: string
}

interface IWishList {
    id: number
    price: number
    product_info: IProductInfo
    shop_info: IShopInfo
}

const Header = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const account: ICustomerAccount = useSelector<RootState, ICustomerAccount>(state => state.user.account);
    const isAuthenticated = useSelector<RootState, boolean>(state => state.user.isAuthenticated);
    const userRole = useSelector<RootState, string>(state => state.user.role);

    const cartItemList: ICartItem[] = useSelector<RootState, ICartItem[]>(state => state.cartItem.cart_item_list);
    const cartItemCount: number = useSelector<RootState, number>(state => state.cartItem.cart_item_count);

    const wishListCount: number = useSelector<RootState, number>(state => state.wishList.wish_list_count);

    const [scrollPosition, setScrollPosition] = React.useState(0);

    const [showMenu, setShowMenu] = React.useState<boolean>(false);
    const [showMiniShoppingCart, setShowMiniShoppingCart] = React.useState<boolean>(false);
    const [showInfoSettingBox, setShowInfoSettingBox] = React.useState<boolean>(false);

    const infoSettingBox = React.useRef<HTMLDivElement>(null);

    const [productSearch, setProductSearch] = React.useState<string>("");
    const [productSearchList, setProductSearchList] = React.useState<ISearchProduct[]>([]);
    const [showSearchList, setShowSearchList] = React.useState(true);

    const [productSearchRecommend, setProductSearchRecommend] = React.useState("");
    const [currentSelect, setCurrentSelect] = React.useState(-1);

    const [cartItemTotal, setCartItemTotal] = React.useState<number>(0);

    const fProductSearch = React.useCallback(_.debounce(async (value) => {
        let result = await getSearchProducts(value);
        if (result) {

            let products = result.map(item => {
                return {
                    ...item, selected: false
                }
            });
            setProductSearchList(products);
        }
    }, 500), []);

    React.useEffect(() => {
        if (productSearchList.length === 0 || productSearchRecommend === "") {
            setCurrentSelect(-1);
        }
    }, [productSearchList]);

    const handleSearchOnChange = (search: string) => {
        setProductSearchRecommend("");
        setProductSearch(search);
    }

    const handleSelectRecommendedProduct = (item: ISearchProduct) => {
        setProductSearch(item.name);
        setProductSearchRecommend("");
        setProductSearchList([]);
        setShowSearchList(false);
    }

    const handleKeyPress = (event) => {

        if (event.key === 'Enter') {
            handleSearch();
        }

        if (productSearchList.length > 0) {
            let _productSearchList = _.cloneDeep(productSearchList);

            if (event.key === 'ArrowDown') {
                if (currentSelect === -1) {
                    setCurrentSelect(0);
                    _productSearchList = _productSearchList.map((item, index) => {
                        if (index === 0) {
                            setProductSearchRecommend(item.name);
                            item.selected = true;
                            return item;
                        } else {
                            item.selected = false;
                            return item;
                        }
                    })
                } else {
                    if (currentSelect + 1 <= productSearchList.length - 1) {
                        setCurrentSelect(currentSelect + 1);
                        _productSearchList = _productSearchList.map((item, index) => {
                            if (index === currentSelect + 1) {
                                setProductSearchRecommend(item.name);
                                item.selected = true;
                                return item;
                            } else {
                                item.selected = false;
                                return item;
                            }
                        })
                    }
                }
            }

            if (event.key === 'ArrowUp') {
                if (currentSelect === -1) {
                    setCurrentSelect(productSearchList.length - 1);
                    _productSearchList = _productSearchList.map((item, index) => {
                        if (index === productSearchList.length - 1) {
                            setProductSearchRecommend(item.name)
                            item.selected = true;
                            return item;
                        } else {
                            item.selected = false;
                            return item;
                        }
                    })
                } else {
                    if (currentSelect - 1 >= 0) {
                        setCurrentSelect(currentSelect - 1);
                        _productSearchList = _productSearchList.map((item, index) => {
                            if (index === currentSelect - 1) {
                                setProductSearchRecommend(item.name);
                                item.selected = true;
                                return item;
                            } else {
                                item.selected = false;
                                return item;
                            }
                        })
                    }
                }
            }

            setProductSearchList(_productSearchList);
        }
    }

    React.useEffect(() => {
        if (productSearch) {
            fProductSearch(productSearch);
        } else {
            setProductSearchList([]);
            fProductSearch.cancel();
        }
    }, [productSearch]);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const headerStickyStyle = classNames(
        "header__top",
        {
            'sticky top-0': scrollPosition > 144
        }
    );

    const headerSectionTopStyle = classNames(
        "section_top ",
        {
            'seller-header': account ? (account.role === "seller" ? true : false) : false
        }
    )

    const handleShowMenu = (show: boolean, check: boolean) => {
        if (show && check) {
            setShowMenu(true);
        } else {
            setShowMenu(false);
        }
    }

    const handleShowWidgetInfo = () => {
        if (account && isAuthenticated) {
            setShowInfoSettingBox(true);
        }
    }

    React.useEffect(() => {

        const closeInfoSettingBox = (e) => {
            if (!infoSettingBox.current?.contains(e.target)) {
                setShowInfoSettingBox(false);
            }
        }

        document.body.addEventListener("mousedown", closeInfoSettingBox);

        return () => {
            document.body.removeEventListener('mousedown', closeInfoSettingBox);
        };
    }, []);

    const handleUserLogout = async () => {
        let result: any = await userLogout();
        if (result && result.EC === 0) {
            successToast1(result.EM);
            setShowInfoSettingBox(false);

            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    }

    const fetchAccountInfo = async () => {
        let result: any = await fetchAccount();
        if (result && !_.isEmpty(result.DT)) {

            let userData = result.DT;

            if (userData.role === "customer") {

                let data = {
                    isAuthenticated: userData.isAuthenticated,
                    account: {
                        id: userData.id,
                        username: userData.username,
                        role: userData.role,
                        customer_id: userData.customer_id
                    },
                    role: "customer"
                }

                dispatch(UserLogin(data));

                let cartItemsData: any = await fetchCartItem(userData.customer_id);
                if (cartItemsData && !_.isEmpty(cartItemsData.DT)) {
                    let cart_item_data: ICartItem[] = cartItemsData.DT;
                    let count = cart_item_data.length;

                    dispatch(AddCartItem({
                        cart_items: cart_item_data,
                        count: count
                    }));

                    let cartItemValueSum = _.sumBy(cart_item_data, function (o: ICartItem) { return o.price * o.quantity; });
                    setCartItemTotal(cartItemValueSum);
                }

                let wishListData: any = await fetchWishList(userData.customer_id);
                if (wishListData && !_.isEmpty(wishListData.DT)) {
                    let wish_list_data: IWishList[] = wishListData.DT;
                    let count = wish_list_data.length;

                    dispatch(AddWishListItem({
                        wish_list_item: wish_list_data,
                        wish_list_count: count
                    }));
                }

            }
            else if (userData.role === "seller") {

                let data = {
                    isAuthenticated: userData.isAuthenticated,
                    account: {
                        id: userData.id,
                        username: userData.username,
                        role: userData.role,
                        seller_id: userData.seller_id
                    },
                    role: "seller"
                }

                dispatch(UserLogin(data));
            }
            else {
                let data = {
                    isAuthenticated: userData.isAuthenticated,
                    account: {
                        id: userData.id,
                        username: userData.username,
                        role: userData.role
                    }
                }
                dispatch(UserLogin(data));
            }
        }
    }

    const handleProductDetailNavigation = (product_id: number) => {
        navigate({
            pathname: "/product",
            search: `?id=${product_id}`,
        });
    }

    const handleDeleteCartItem = async (id: number) => {

        let result = await deleteCartItem(id);
        if (result && result.EC === 0) {
            successToast1(result.EM);
            dispatch(DeleteCartItem({ id: id }));
        }
    }

    const handleSearch = async () => {
        await handleSaveSearch();
        setShowSearchList(false);
        navigate({
            pathname: "/search",
            search: `?keyword=${productSearch}&page=${1}`,
        })
    }

    const handleSaveSearch = async () => {
        if (account && isAuthenticated) {
            let result = await saveCustomerSearch(productSearch);
            if (result && result.EC === 0) {
                setProductSearch("");
            }
        } else {
            setProductSearch("");
        }
    }

    React.useEffect(() => {
        let cartItemValueSum = _.sumBy(cartItemList, function (o: ICartItem) { return o.price * o.quantity; });
        setCartItemTotal(cartItemValueSum);
    }, [cartItemList]);

    React.useEffect(() => {
        fetchAccountInfo();
    }, []);

    return (
        <>
            <div className={headerStickyStyle}>
                <div className={headerSectionTopStyle}>
                    {
                        scrollPosition > 144 ?
                            <div className='categories relative cursor-pointer'
                                onClick={() => setShowMenu(!showMenu)}>
                                <div className='main'>
                                    <FiMenu className="w-8 h-8" />
                                    <span className='text-lg'>Danh mục</span>
                                </div>
                                {
                                    showMenu &&
                                    <div className='absolute top-[3.375rem] z-50 text-black font-normal' onMouseLeave={() => handleShowMenu(false, true)}>
                                        <CategoryMenu />
                                    </div>
                                }
                            </div>
                            :
                            <>
                                {userRole === "customer" ?
                                    <div className='logo' onClick={() => navigate('/')}>
                                        <span className='text-black'>Fox</span>
                                        <span className='text-white'>Mart</span>
                                    </div>
                                    :
                                    <div className='logo flex items-center gap-x-6'>
                                        <div className='cursor-default'>
                                            <span className='text-black'>Fox</span>
                                            <span className='text-white'>Mart</span>
                                        </div>
                                        <div className='text-black font-normal cursor-default'>Người bán</div>
                                    </div>
                                }
                            </>
                    }
                    {
                        userRole !== "seller" &&
                        <>
                            <div className='search-bar'>
                                <div className='search-bar__text'>
                                    <IoIosSearch className="w-6 h-6 text-gray-500" />
                                    <input
                                        type="text"
                                        className='text-black font-normal px-2 w-full outline-none'
                                        value={productSearchRecommend ? productSearchRecommend : productSearch}
                                        placeholder='Tên sản phẩm tìm kiếm ...'
                                        onClick={() => setShowSearchList(true)}
                                        onChange={(event) => handleSearchOnChange(event.target.value)}
                                        onKeyDown={(event) => handleKeyPress(event)}
                                    />
                                </div>
                                {showSearchList && productSearch && productSearchList && productSearchList.length > 0 &&
                                    <div className='search-bar__search-list'>
                                        {
                                            productSearchList.map(item => {
                                                return (
                                                    <div
                                                        key={`search-item-${item.id}`}
                                                        className={item.selected ? 'search-item selected' : 'search-item'}
                                                        onClick={() => handleSelectRecommendedProduct(item)}
                                                    //onClick={() => handleSearchBookDetail(item.id, item.name)}
                                                    >
                                                        <div>
                                                            <CiSearch className='w-5 h-5' />
                                                        </div>

                                                        <span className='item-name'>{item.name}</span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }
                                <div className='search-bar__btn' onClick={() => handleSearch()}>Tìm kiếm</div>
                            </div>

                        </>
                    }
                    <div className="navigation">
                        {
                            userRole === "customer" &&
                            <>
                                <div className='favorite-items relative' onClick={() => navigate("/favorite-products")}>
                                    <BsHeart className="icon" />
                                    {wishListCount > 0 &&
                                        <div className='count absolute right-[-5px] top-[16px]'>{wishListCount}</div>
                                    }
                                </div>
                                <div className='shopping-cart relative z-40' onMouseEnter={() => {
                                    setShowMiniShoppingCart(true);
                                    setShowInfoSettingBox(false);
                                }}>
                                    <PiShoppingCartLight className="icon" onClick={() => navigate("/cart")} />
                                    {cartItemCount > 0 &&
                                        <div className='count absolute right-[-5px] top-[16px]'>{cartItemCount}</div>
                                    }
                                    {
                                        showMiniShoppingCart &&
                                        <div className='widget-shopping-cart absolute bg-white top-[50px] w-[23rem] right-[-160px] z-50 px-5 py-4 border border-gray-400'
                                            onMouseEnter={() => {
                                                setShowMiniShoppingCart(true)
                                            }}
                                            onMouseLeave={() => setShowMiniShoppingCart(false)}
                                        >
                                            {
                                                cartItemCount > 0 ?
                                                    <>
                                                        {
                                                            cartItemList.map((item, index) => {
                                                                if (index <= 3) {
                                                                    return (
                                                                        <div key={`shopping-cart-item-${item.id}`} className='flex pb-5 mb-4 border-b border-gray-300 gap-x-2'>
                                                                            {/* <LoadImageS3 img_style="w-12 h-12" img_url={item.product_info.image}/> */}
                                                                            <LoadImage img_style="w-12 h-12" product_id={item.product_info.id} />
                                                                            <div className='flex items-center justify-between w-full'>
                                                                                <div>
                                                                                    <div
                                                                                        className='line-clamp-2 text-black text-blue-500 font-normal duration-300 hover:text-[#FCB800] cursor-pointer text-sm mb-1'
                                                                                        onClick={(e) => {
                                                                                            e.stopPropagation();
                                                                                            handleProductDetailNavigation(item.product_info.id)
                                                                                        }
                                                                                        }
                                                                                    >
                                                                                        {item.product_info.name}
                                                                                    </div>
                                                                                    <div className='flex items-center gap-x-1 text-black font-normal text-sm'>
                                                                                        <span>{item.quantity}</span>
                                                                                        <span>x</span>
                                                                                        <span>{CurrencyFormat(item.price)}</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className='font-normal text-gray-300 text-xl hover:text-red-500 cursor-pointer' onClick={() => handleDeleteCartItem(+item.id)}>&#128473;</div>
                                                                            </div>

                                                                        </div>
                                                                    )
                                                                }

                                                            })
                                                        }
                                                        <div className='shopping-cart-total flex items-center justify-between mb-8'>
                                                            <div className='font-medium text-black text-lg'>Tổng cộng</div>
                                                            <div className='font-bold text-red-500 text-lg'>{CurrencyFormat(cartItemTotal)}</div>
                                                        </div>
                                                        <div className='flex items-center justify-between gap-x-6'>
                                                            <div className='bg-[#FCB800] py-3 text-black rounded-[4px] font-medium w-1/2 text-center hover:opacity-80 cursor-pointer' onClick={() => navigate("/cart")}>Xem giỏ hàng</div>
                                                            <div className='bg-[#FCB800] py-3 text-black rounded-[4px] font-medium w-1/2 text-center hover:opacity-80 cursor-pointer' onClick={() => navigate("/payment")}>Thanh toán</div>

                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className='text-black font-normal text-center py-4'>Chưa có sản phẩm</div>
                                                    </>
                                            }

                                        </div>
                                    }
                                </div>
                            </>
                        }
                        <div className='authentication relative z-50 cursor-pointer'
                            onClick={() => {
                                handleShowWidgetInfo()
                                setShowMiniShoppingCart(false)
                            }}
                        >

                            {
                                (!account || !isAuthenticated) ?
                                    <>
                                        <Link className="nav-item" to="/login">Đăng nhập&nbsp;/&nbsp;</Link>
                                        <Link className="nav-item" to="/register"> Đăng ký</Link>
                                    </>
                                    :
                                    <>
                                        <BsPerson className="icon" />
                                        <span className='hover:opacity-70 cursor-pointer'>{account.username}</span>
                                        {
                                            showInfoSettingBox &&
                                            <div className='widget-info absolute bg-white top-[50px] w-[12rem] right-[-20px] z-50 border border-gray-400'
                                                onClick={() => handleShowWidgetInfo()}
                                                ref={infoSettingBox}
                                            >
                                                {
                                                    userRole === "customer" &&
                                                    <div className='info-item py-2.5 px-5 font-medium hover:bg-gray-100 hover:text-green-500 cursor-pointer w-full' onClick={(e) => {
                                                        e.stopPropagation();
                                                        setShowInfoSettingBox(false);
                                                        navigate("/customer-info/account/info");
                                                    }}>Thông Tin Tài Khoản</div>
                                                }
                                                {
                                                    userRole === "customer" &&
                                                    <div className='info-item py-2.5 px-5 font-medium hover:bg-gray-100 hover:text-green-500 cursor-pointer w-full' onClick={(e) => {
                                                        e.stopPropagation();
                                                        setShowInfoSettingBox(false);
                                                        navigate("/customer-info/order/status");
                                                    }}>Đơn Hàng Của Tôi</div>
                                                }
                                                {
                                                    userRole === "seller" &&
                                                    <div className='info-item py-2.5 px-5 font-medium hover:bg-gray-100 hover:text-green-500 cursor-pointer w-full' onClick={(e) => {
                                                        e.stopPropagation();
                                                        setShowInfoSettingBox(false);
                                                        navigate("/seller-info/dashboard");
                                                    }}>Thông Tin Người Bán</div>
                                                }
                                                <div className='info-item py-2.5 px-5 font-medium hover:bg-gray-100 hover:text-green-500 cursor-pointer' onClick={() => handleUserLogout()}>Đăng Xuất</div>
                                            </div>
                                        }
                                    </>
                            }

                        </div>
                    </div>
                </div>
            </div>
            {
                userRole !== "seller" &&
                <>
                    <div className='w-full border-t border-gray-600'></div>
                    <div className='header__bottom relative'>
                        <div className='section_bottom'>
                            <div className='categories relative' onClick={() => {
                                if (location.pathname !== "/") {
                                    setShowMenu(!showMenu)
                                }
                            }}>
                                <div className='main'>
                                    <FiMenu className="w-6 h-6" />
                                    <span>Danh mục</span>
                                </div>
                                {
                                    showMenu &&
                                    <div className='absolute top-[2.5rem] z-50 text-black font-normal' onMouseLeave={() => handleShowMenu(false, true)}>
                                        <CategoryMenu />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </>
            }
        </>

    )
}

export default Header;