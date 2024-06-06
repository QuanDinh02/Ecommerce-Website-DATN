import { clientBenefits } from "@/data/homepage";
import React from "react";
import { MdKeyboardArrowRight, MdOutlineMessage } from "react-icons/md";
import Banner from '../assets/img/homepage/Banner.svg';
import Item from '../assets/img/homepage/item.svg';
import Item2 from '../assets/img/homepage/item2.svg';
import Item3 from '../assets/img/homepage/item3.svg';
import Item4 from '../assets/img/homepage/item4.svg';
import Item5 from '../assets/img/homepage/item5.svg';
import Item6 from '../assets/img/homepage/item6.svg';
import Item7 from '../assets/img/homepage/item7.svg';
import Item8 from '../assets/img/homepage/item8.svg';
import Item9 from '../assets/img/homepage/item9.svg';
import Clothes_Banner_1 from '../assets/img/homepage/Clothes_Banner_1.svg';
import Clothes_Banner_2 from '../assets/img/homepage/Clothes_Banner_2.svg';
import Electronic_Banner_1 from '../assets/img/homepage/Electronic_Banner_1.svg';
import Electronic_Banner_2 from '../assets/img/homepage/Electronic_Banner_2.svg';
import Recommend_Item from '../assets/img/homepage/recommend_items/item1.svg';
import Recommend_Item2 from '../assets/img/homepage/recommend_items/item2.svg';
import Recommend_Item3 from '../assets/img/homepage/recommend_items/item3.svg';
import Recommend_Item4 from '../assets/img/homepage/recommend_items/item4.svg';
import Recommend_Item6 from '../assets/img/homepage/recommend_items/item6.svg';
import Recommend_Item7 from '../assets/img/homepage/recommend_items/item7.svg';
import Recommend_Item8 from '../assets/img/homepage/recommend_items/item8.svg';
import Recommend_Item9 from '../assets/img/homepage/recommend_items/item9.svg';
import Product01 from '../assets/img/product_detail/product_01.svg';

import { CiSpeaker } from "react-icons/ci";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { GoDotFill, GoStarFill } from "react-icons/go";
import { FaFireAlt } from "react-icons/fa";
import { PiImageThin, PiShoppingCartLight, PiTShirtLight } from "react-icons/pi";
import { successToast1 } from "@/components/Toast/Toast";
import { IoBagCheckOutline, IoEyeOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Modal from "@/components/Modal";
import { CurrencyFormat } from "@/utils/numberFormat";
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa6";
import { getRecommendItemByCustomer, startTrainingRecommendItemData, getProductWithImageByCustomer } from "@/services/recommendItemService";
import CategoryMenu from "@/components/CategoryMenu";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducer/rootReducer";
import ProductRating from "./Category/ProductRating";
import { saveCustomerActivity } from "@/services/customerService";

import IMG from '../assets/img/homepage/recommend_items/31261845.jpeg';
import LoadImage from "@/components/LoadImage";
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

const RecommendItem = () => {

    const navigate = useNavigate();

    const account: ICustomerAccount = useSelector<RootState, ICustomerAccount>(state => state.user.account);
    const isAuthenticated = useSelector<RootState, boolean>(state => state.user.isAuthenticated);

    const [recommendItemList, setRecommendItemList] = React.useState<IRecommendProduct[]>([]);

    const fetchRecommendItems = async (customer_id: number) => {
        let response: IData = await getRecommendItemByCustomer(customer_id);
        if (response) {
            setRecommendItemList(response.product_list);
            //let result = await getProductWithImageByCustomer(response.product_list);
            //console.log(result);
            startTrainingRecommendItemData(customer_id);
        }
    }

    const handleProductDetailNavigation = async (product_id: number) => {
        if (account && isAuthenticated) {
            let result = await saveCustomerActivity({
                product_id: product_id,
                type: 0
            });
            navigate("/product-detail", { state: { product_id: product_id } });
        }
        navigate("/product-detail", { state: { product_id: product_id } });
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
                        <div className="product cursor-pointer px-4 py-2 group bg-white border border-gray-200" key={`sale-off-product-${index}`} onClick={() => handleProductDetailNavigation(item.id)}>
                            <div className="relative">
                                <div className="product__image w-40 mx-auto mb-6">
                                    {/* <LoadImage img_style="w-40 h-40" product_id={31261845}/> */}
                                    {item.image ?
                                        <img src={`data:image/jpeg;base64,${item.image}`} alt='' className="w-40 h-40" />
                                        :
                                        <PiImageThin className="w-40 h-40 text-gray-300" />
                                    }
                                </div>
                                <div className="product__utility hidden flex items-center justify-center gap-x-4 group-hover:block group-hover:flex duration-300 absolute bottom-0 bg-white left-0 right-0">
                                    <div className="utility-item w-8 h-8 hover:bg-[#FCB800] hover:rounded-full flex items-center justify-center relative" onClick={(e) => {
                                        e.stopPropagation();
                                        //hanldeAddShoppingCart();
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
                                        //setShowQuickView(true);
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
                                        //hanldeFavoriteItem();
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

    const [imageList1, setImageList1] = React.useState([
        Item, Item2, Item3, Item4, Item5, Item6, Item7, Item8, Item9
    ]);

    const [imageList2, setImageList2] = React.useState([
        Item, Item2, Item3, Item4, Item, Item2, Item3, Item4
    ]);

    const [imageList3, setImageList3] = React.useState([
        Item5, Item6, Item7, Item8, Item9, Item5, Item6, Item7, Item8, Item9
    ]);

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
                    {/* <div className="section benefits bg-white my-8 px-5 py-6 flex items-center justify-between">
                        {clientBenefits.map((item, index) => {
                            return (
                                <div className="benefit-item flex items-center gap-4" key={`benefit-item-${index}`}>
                                    <div>{item.icon}</div>
                                    <div>
                                        <div className="font-medium">{item.title}</div>
                                        <div className="text-sm text-gray-400">{item.subtitle}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="section sale-off bg-white mb-8">
                        <div className="header px-5 py-6 bg-white flex items-center justify-between border-b border-gray-300 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="font-medium text-lg flex items-center gap-1"><FaFireAlt className="text-orange-500" /> Giảm giá Hot</div>
                                <div className="font-medium text-white rounded-[4px] px-2.5 py-1.5 bg-orange-500 w-fit">Kết thúc: 19 : 26 : 31</div>
                            </div>
                            <div className="hover:text-[#FCB800] underline cursor-pointer duration-300">Xem tất cả</div>
                        </div>
                        <div className="px-5 py-6 bg-white">
                            <Swiper
                                slidesPerView={5}
                                spaceBetween={30}
                                className="product-list"
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Pagination]}

                            >
                                {
                                    imageList1 && imageList1.length > 0 &&
                                    imageList1.map((item, index) => {
                                        return (
                                            <SwiperSlide>
                                                <div className="product cursor-pointer px-4 py-2 group" key={`sale-off-product-${index}`} onClick={() => navigate("/product-detail")}>
                                                    <div className="relative">
                                                        <div className="product__image w-40 mx-auto mb-6"><img src={item} alt="" /></div>
                                                        <div className="product__utility hidden flex items-center justify-center gap-x-4 group-hover:block group-hover:flex duration-300 absolute bottom-0 bg-white left-0 right-0">
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
                                                                hanldeFavoriteItem();
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
                                                    <div className="product__name text-blue-600 mb-3 line-clamp-2 text-sm duration-300 hover:text-[#FCB800]">Điện thoại NOKIA 1O5 4G 2O19 bản 2 sim thiết kế bền bỉ, tặng kèm pin sạc, bảo hành 12 tháng</div>
                                                    <div className="product__price flex items-center gap-2 mb-2.5">
                                                        <div className="price text-[#1A732E] font-medium">768,000 đ</div>
                                                        <div className="old-price text-sm text-gray-500 line-through">968,000 đ</div>
                                                    </div>
                                                    <div className="product__ratings flex items-center gap-2">
                                                        <div className="stars-rating flex items-center">
                                                            <GoStarFill className="text-[#FCB800]" />
                                                            <GoStarFill className="text-[#FCB800]" />
                                                            <GoStarFill className="text-[#FCB800]" />
                                                            <GoStarFill className="text-[#FCB800]" />
                                                            <GoStarFill className="text-[#FCB800]" />
                                                        </div>
                                                        <div className="rating-counts">123</div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                        </div>
                    </div>
                    <div className="section bg-white mb-8">
                        <div className="header px-5 py-4 flex items-center justify-between border-b border-gray-300">
                            <div className="header__title flex items-center gap-2">
                                <PiTShirtLight className="w-7 h-7" />
                                <span className="text-xl">Quần áo</span>
                            </div>
                            <div className="header__submenu flex items-center gap-8">
                                <div className="duration-300 hover:text-[#FCB800] cursor-pointer">Nữ</div>
                                <div className="duration-300 hover:text-[#FCB800] cursor-pointer">Nam</div>
                                <div className="duration-300 hover:text-[#FCB800] cursor-pointer">Bé trai</div>
                                <div className="duration-300 hover:text-[#FCB800] cursor-pointer">Bé gái</div>
                                <div className="duration-300 hover:text-[#FCB800] cursor-pointer">Em bé</div>
                            </div>
                        </div>
                        <div className="main flex">
                            <div className="left-content w-2/3 p-5">
                                <div className="banner w-full mb-5">
                                    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                                        <SwiperSlide>
                                            <img src={Clothes_Banner_1} className="w-full " alt="" />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <img src={Clothes_Banner_2} className="w-full " alt="" />
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                                <div className="item-category flex items-center gap-6 mb-2.5">
                                    <div className="text-black font-medium cursor-pointer hover:text-black">Hàng mới</div>
                                    <div className="text-gray-500 cursor-pointer hover:text-black">Bán chạy</div>
                                    <div className="text-gray-500 cursor-pointer hover:text-black">Giảm giá</div>
                                </div>
                                <div className="border-t border-gray-300 mb-4"></div>
                                <Swiper
                                    slidesPerView={3}
                                    spaceBetween={20}
                                    className="product-list"
                                    modules={[Pagination]}

                                >
                                    {
                                        imageList2 && imageList2.length > 0 &&
                                        imageList2.map((item, index) => {
                                            return (
                                                <SwiperSlide>
                                                    <div className="product cursor-pointer px-4 py-2 group border border-white hover:border-gray-400" key={`sale-off-product-${index}`} onClick={() => navigate("/product-detail")}>
                                                        <div className="relative">
                                                            <div className="product__image w-36 mx-auto mb-6"><img src={item} alt="" /></div>
                                                            <div className="product__utility hidden flex items-center justify-center gap-x-4 group-hover:block group-hover:flex duration-300 absolute bottom-0 bg-white left-0 right-0">
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
                                                        </div>
                                                        <div className="product__name text-blue-600 mb-3 line-clamp-2 text-sm duration-300 hover:text-[#FCB800]">Điện thoại NOKIA 1O5 4G 2O19 bản 2 sim thiết kế bền bỉ, tặng kèm pin sạc, bảo hành 12 tháng</div>
                                                        <div className="product__price flex items-center gap-2 mb-2.5">
                                                            <div className="price text-[#1A732E] font-medium">768,000 đ</div>
                                                            <div className="old-price text-sm text-gray-500 line-through">968,000 đ</div>
                                                        </div>
                                                        <div className="product__ratings flex items-center gap-2">
                                                            <div className="stars-rating flex items-center">
                                                                <GoStarFill className="text-[#FCB800]" />
                                                                <GoStarFill className="text-[#FCB800]" />
                                                                <GoStarFill className="text-[#FCB800]" />
                                                                <GoStarFill className="text-[#FCB800]" />
                                                                <GoStarFill className="text-[#FCB800]" />
                                                            </div>
                                                            <div className="rating-counts">123</div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                            </div>
                            <div className="right-content w-1/3 border-l border-gray-300 p-5">
                                <div className="text-xl">Đề xuất dành cho bạn</div>
                                <div className="border-t border-gray-300 mt-3 mb-4"></div>
                                <div className="list">
                                    <div className="item cursor-pointer flex items-center gap-4 mb-4" onClick={() => navigate("/product-detail")}>
                                        <div><img src={Recommend_Item} alt="" className="w-16 h-16" /></div>
                                        <div>
                                            <div className="item-name text-blue-600 line-clamp-2 hover:text-[#FCB800] duration-300 mb-1">Xbox One Wireless Controller Black Color</div>
                                            <div className="text-sm">167,000 đ</div>
                                        </div>
                                    </div>
                                    <div className="item cursor-pointer flex items-center gap-4 mb-4" onClick={() => navigate("/product-detail")}>
                                        <div><img src={Recommend_Item2} alt="" className="w-16 h-16" /></div>
                                        <div>
                                            <div className="item-name text-blue-600 line-clamp-2 hover:text-[#FCB800] duration-300 mb-1">Xbox One Wireless Controller Black Color</div>
                                            <div className="text-sm">167,000 đ</div>
                                        </div>
                                    </div>
                                    <div className="item cursor-pointer flex items-center gap-4 mb-4" onClick={() => navigate("/product-detail")}>
                                        <div><img src={Recommend_Item3} alt="" className="w-16 h-16" /></div>
                                        <div>
                                            <div className="item-name text-blue-600 line-clamp-2 hover:text-[#FCB800] duration-300 mb-1">Xbox One Wireless Controller Black Color</div>
                                            <div className="text-sm">167,000 đ</div>
                                        </div>
                                    </div>
                                    <div className="item cursor-pointer flex items-center gap-4 mb-4" onClick={() => navigate("/product-detail")}>
                                        <div><img src={Recommend_Item4} alt="" className="w-16 h-16" /></div>
                                        <div>
                                            <div className="item-name text-blue-600 line-clamp-2 hover:text-[#FCB800] duration-300 mb-1">Xbox One Wireless Controller Black Color</div>
                                            <div className="text-sm">167,000 đ</div>
                                        </div>
                                    </div>
                                    <div className="item cursor-pointer flex items-center gap-4 mb-4" onClick={() => navigate("/product-detail")}>
                                        <div><img src={Recommend_Item4} alt="" className="w-16 h-16" /></div>
                                        <div>
                                            <div className="item-name text-blue-600 line-clamp-2 hover:text-[#FCB800] duration-300 mb-1">Xbox One Wireless Controller Black Color</div>
                                            <div className="text-sm">167,000 đ</div>
                                        </div>
                                    </div>
                                    <div className="item cursor-pointer flex items-center gap-4" onClick={() => navigate("/product-detail")}>
                                        <div><img src={Recommend_Item4} alt="" className="w-16 h-16" /></div>
                                        <div>
                                            <div className="item-name text-blue-600 line-clamp-2 hover:text-[#FCB800] duration-300 mb-1">Xbox One Wireless Controller Black Color</div>
                                            <div className="text-sm">167,000 đ</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end mt-6">
                                    <span className="flex items-center hover:text-[#FCB800] duration-300 cursor-pointer">Xem thêm <MdKeyboardArrowRight className="w-5 h-5" /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section bg-white mb-8">
                        <div className="header px-5 py-4 flex items-center justify-between border-b border-gray-300">
                            <div className="header__title flex items-center gap-2">
                                <CiSpeaker className="w-7 h-7" />
                                <span className="text-xl">Điện tử</span>
                            </div>
                            <div className="header__submenu flex items-center gap-8">
                                <div className="duration-300 hover:text-[#FCB800] cursor-pointer">TV</div>
                                <div className="duration-300 hover:text-[#FCB800] cursor-pointer">Máy điều hòa</div>
                                <div className="duration-300 hover:text-[#FCB800] cursor-pointer">Máy giặt</div>
                                <div className="duration-300 hover:text-[#FCB800] cursor-pointer">Tủ lạnh</div>
                                <div className="duration-300 hover:text-[#FCB800] cursor-pointer">Lò vi sóng</div>
                            </div>
                        </div>
                        <div className="main flex">
                            <div className="left-content w-2/3 p-5">
                                <div className="banner w-full mb-5">
                                    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                                        <SwiperSlide>
                                            <img src={Electronic_Banner_1} className="w-full " alt="" />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <img src={Electronic_Banner_2} className="w-full " alt="" />
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                                <div className="item-category flex items-center gap-6 mb-2.5">
                                    <div className="text-black font-medium cursor-pointer hover:text-black">Hàng mới</div>
                                    <div className="text-gray-500 cursor-pointer hover:text-black">Bán chạy</div>
                                    <div className="text-gray-500 cursor-pointer hover:text-black">Giảm giá</div>
                                </div>
                                <div className="border-t border-gray-300 mb-4"></div>
                                <Swiper
                                    slidesPerView={3}
                                    spaceBetween={20}
                                    className="product-list"
                                    modules={[Pagination]}

                                >
                                    {
                                        imageList3 && imageList3.length > 0 &&
                                        imageList3.map((item, index) => {
                                            return (
                                                <SwiperSlide>
                                                    <div className="product cursor-pointer px-4 py-2 group border border-white hover:border-gray-400" key={`sale-off-product-${index}`} onClick={() => navigate("/product-detail")}>
                                                        <div className="relative">
                                                            <div className="product__image w-36 mx-auto mb-6"><img src={item} alt="" /></div>
                                                            <div className="product__utility hidden flex items-center justify-center gap-x-4 group-hover:block group-hover:flex duration-300 absolute bottom-0 bg-white left-0 right-0">
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
                                                        </div>
                                                        <div className="product__name text-blue-600 mb-3 line-clamp-2 text-sm duration-300 hover:text-[#FCB800]">Điện thoại NOKIA 1O5 4G 2O19 bản 2 sim thiết kế bền bỉ, tặng kèm pin sạc, bảo hành 12 tháng</div>
                                                        <div className="product__price flex items-center gap-2 mb-2.5">
                                                            <div className="price text-[#1A732E] font-medium">768,000 đ</div>
                                                            <div className="old-price text-sm text-gray-500 line-through">968,000 đ</div>
                                                        </div>
                                                        <div className="product__ratings flex items-center gap-2">
                                                            <div className="stars-rating flex items-center">
                                                                <GoStarFill className="text-[#FCB800]" />
                                                                <GoStarFill className="text-[#FCB800]" />
                                                                <GoStarFill className="text-[#FCB800]" />
                                                                <GoStarFill className="text-[#FCB800]" />
                                                                <GoStarFill className="text-[#FCB800]" />
                                                            </div>
                                                            <div className="rating-counts">123</div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                            </div>
                            <div className="right-content w-1/3 border-l border-gray-300 p-5">
                                <div className="text-xl">Đề xuất dành cho bạn</div>
                                <div className="border-t border-gray-300 mt-3 mb-4"></div>
                                <div className="list">
                                    <div className="item cursor-pointer flex items-center gap-4 mb-4" onClick={() => navigate("/product-detail")}>
                                        <div><img src={Recommend_Item6} alt="" className="w-16 h-16" /></div>
                                        <div>
                                            <div className="item-name text-blue-600 line-clamp-2 hover:text-[#FCB800] duration-300 mb-1">Xbox One Wireless Controller Black Color</div>
                                            <div className="text-sm">167,000 đ</div>
                                        </div>
                                    </div>
                                    <div className="item cursor-pointer flex items-center gap-4 mb-4" onClick={() => navigate("/product-detail")}>
                                        <div><img src={Recommend_Item7} alt="" className="w-16 h-16" /></div>
                                        <div>
                                            <div className="item-name text-blue-600 line-clamp-2 hover:text-[#FCB800] duration-300 mb-1">Xbox One Wireless Controller Black Color</div>
                                            <div className="text-sm">167,000 đ</div>
                                        </div>
                                    </div>
                                    <div className="item cursor-pointer flex items-center gap-4 mb-4" onClick={() => navigate("/product-detail")}>
                                        <div><img src={Recommend_Item8} alt="" className="w-16 h-16" /></div>
                                        <div>
                                            <div className="item-name text-blue-600 line-clamp-2 hover:text-[#FCB800] duration-300 mb-1">Xbox One Wireless Controller Black Color</div>
                                            <div className="text-sm">167,000 đ</div>
                                        </div>
                                    </div>
                                    <div className="item cursor-pointer flex items-center gap-4 mb-4" onClick={() => navigate("/product-detail")}>
                                        <div><img src={Recommend_Item9} alt="" className="w-16 h-16" /></div>
                                        <div>
                                            <div className="item-name text-blue-600 line-clamp-2 hover:text-[#FCB800] duration-300 mb-1">Xbox One Wireless Controller Black Color</div>
                                            <div className="text-sm">167,000 đ</div>
                                        </div>
                                    </div>
                                    <div className="item cursor-pointer flex items-center gap-4 mb-4" onClick={() => navigate("/product-detail")}>
                                        <div><img src={Recommend_Item6} alt="" className="w-16 h-16" /></div>
                                        <div>
                                            <div className="item-name text-blue-600 line-clamp-2 hover:text-[#FCB800] duration-300 mb-1">Xbox One Wireless Controller Black Color</div>
                                            <div className="text-sm">167,000 đ</div>
                                        </div>
                                    </div>
                                    <div className="item cursor-pointer flex items-center gap-4" onClick={() => navigate("/product-detail")}>
                                        <div><img src={Recommend_Item7} alt="" className="w-16 h-16" /></div>
                                        <div>
                                            <div className="item-name text-blue-600 line-clamp-2 hover:text-[#FCB800] duration-300 mb-1">Xbox One Wireless Controller Black Color</div>
                                            <div className="text-sm">167,000 đ</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end mt-6">
                                    <span className="flex items-center hover:text-[#FCB800] duration-300 cursor-pointer">Xem thêm <MdKeyboardArrowRight className="w-5 h-5" /></span>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="header mt-6 px-5 py-4 bg-white flex items-center justify-center border-b-4 border-red-500 text-red-500 text-lg sticky top-[75px] z-30">GỢI Ý DÀNH CHO BẠN</div>
                    <div className="section customer-recommendation bg-white mb-8">
                        <div className="px-5 py-6 bg-[#EEEEEE]">
                            <div className="product-list grid grid-cols-5 gap-y-6 gap-x-2">
                                <RecommendItem />
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
