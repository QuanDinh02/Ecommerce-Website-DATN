
import React from "react";
import { MdOutlineMessage } from "react-icons/md";
import Banner from '../assets/img/homepage/Banner.svg';
import Product01 from '../assets/img/product_detail/product_01.svg';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { GoDotFill, GoStarFill } from "react-icons/go";

import { PiShoppingCartLight} from "react-icons/pi";
import { successToast1 } from "@/components/Toast/Toast";
import { IoBagCheckOutline, IoEyeOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Modal from "@/components/Modal";
import { CurrencyFormat } from "@/utils/numberFormat";
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa6";
import { getRecommendItemByCustomer, startTrainingRecommendItemData} from "@/services/recommendItemService";
import CategoryMenu from "@/components/CategoryMenu";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducer/rootReducer";
import ProductRating from "./Category/ProductRating";
import { saveCustomerActivity, saveCustomerSearch } from "@/services/customerService";

import LoadImage from "@/components/LoadImage";
import _ from 'lodash';
import { INewCartItem, createCartItem, fetchCartItem } from "@/services/cartItemService";
import { ICartItem } from "./Product/ProductDetailPage_types";
import { AddCartItem, AddWishListItem } from "@/redux/actions/action";
import { useDispatch } from "react-redux";
import { createWishListItem, fetchWishList } from "@/services/wishListService";
import { INewWishListItem, IWishList } from "./FavoriteProduct/FavoriteProductPage_types";
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
    setShow_quick_view: (value: boolean) => void
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
        if (account && isAuthenticated) {
            fetchRecommendItems(account.customer_id);
        }
    }, [isAuthenticated]);

    return (
        <>
            {
                recommendItemList && recommendItemList.length > 0 &&
                recommendItemList.map((item, index) => {
                    return (
                        <div className="product cursor-pointer px-4 py-2 group bg-white border border-gray-200" key={`sale-off-product-${index}`} onClick={() => handleProductDetailNavigation(item.id, item.name)}>
                            <div className="relative">
                                <div className="product__image w-40 mx-auto mb-6">
                                    <LoadImage img_style="w-40 h-40" product_id={item.id}/>
                                    {/* {item.image ?
                                        <img src={`data:image/jpeg;base64,${item.image}`} alt='' className="w-40 h-40" />
                                        :
                                        <PiImageThin className="w-40 h-40 text-gray-300" />
                                    } */}
                                </div>
                                <div className="product__utility hidden flex items-center justify-center gap-x-4 group-hover:block group-hover:flex duration-300 absolute bottom-0 bg-white left-0 right-0">
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
                    )
                })
            }
        </>
    )
}

const Homepage = () => {

    const navigate = useNavigate();
    const userRole = useSelector<RootState, string>(state => state.user.role);

    const [showQuickView, setShowQuickView] = React.useState<boolean>(false);

    const [amount, setAmount] = React.useState<number>(1);

    const hanldeFavoriteItem = () => {
        successToast1("Thêm vào sản phẩm yêu thích thành công");
    }

    const hanldeAddShoppingCart = () => {
        successToast1("Thêm vào giỏ hàng thành công");
    }

    const handleProductAmount = (num: any) => {
        if (!isNaN(num) && num > 0) {
            setAmount(num);
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

    return (
        <>
            <div className="homepage-container w-full bg-[#EEEEEE]">
                <div className='px-[30px] w-[80rem] mx-auto  py-8'>
                    <div className="section flex">
                        <CategoryMenu />
                        <div className="banner flex-1 border border-gray-300 ml-[50px]">
                            <img src={Banner} alt="" className="w-full h-full" />
                        </div>
                    </div>
                    <div className="header mt-6 px-5 py-4 bg-white flex items-center justify-center border-b-4 border-red-500 text-red-500 text-lg sticky top-[75px] z-30">GỢI Ý DÀNH CHO BẠN</div>
                    <div className="section customer-recommendation bg-white mb-8">
                        <div className="px-5 py-6 bg-[#EEEEEE]">
                            <div className="product-list grid grid-cols-5 gap-y-6 gap-x-2">
                                <RecommendItemList setShow_quick_view={setShowQuickView} />
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-center bg-[#EEEEEE]">
                            <div className="w-1/3 bg-white flex items-center justify-center py-2 border border-gray-300 hover:bg-gray-100 cursor-pointer">Xem Thêm</div>
                        </div>
                    </div>
                </div>
            </div>
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
                            <div className="text-gray-600 hover:text-red-500 duration-300 cursor-pointer" onClick={() => hanldeFavoriteItem()}><FaRegHeart className="w-7 h-7" /></div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>

    )
}

export default Homepage;
