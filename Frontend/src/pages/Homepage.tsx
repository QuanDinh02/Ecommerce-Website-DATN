import { menuCategoryItems, clientBenefits } from "@/data/homepage";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
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

import { CiSpeaker } from "react-icons/ci";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { GoStarFill } from "react-icons/go";
import { FaFireAlt } from "react-icons/fa";
import { PiShoppingCartLight, PiTShirtLight } from "react-icons/pi";
import { successToast1 } from "@/components/Toast/Toast";
import { IoEyeOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { CurrencyFormat, numberKFormat } from "@/utils/numberFormat";
import { TbMinusVertical } from "react-icons/tb";

const Homepage = () => {

    const [showSubmenu, setShowSubmenu] = React.useState<boolean>(false);

    const [imageList1, setImageList1] = React.useState([
        Item, Item2, Item3, Item4, Item5, Item6, Item7, Item8, Item9
    ]);

    const [imageList2, setImageList2] = React.useState([
        Item, Item2, Item3, Item4, Item, Item2, Item3, Item4
    ]);

    const [imageList3, setImageList3] = React.useState([
        Item5, Item6, Item7, Item8, Item9, Item5, Item6, Item7, Item8, Item9
    ]);

    const handleShowSubmenu = (show: boolean, check: boolean) => {
        if (show && check) {
            setShowSubmenu(true);
        } else {
            setShowSubmenu(false);
        }
    }

    const hanldeFavoriteItem = () => {
        successToast1("Thêm vào sản phẩm yêu thích thành công");
    }

    const hanldeAddShoppingCart = () => {
        successToast1("Thêm vào giỏ hàng thành công");
    }

    return (
        <div className="homepage-container w-full bg-[#EEEEEE]">
            <div className='px-[30px] w-[80rem] mx-auto  py-8'>
                <div className="section flex">
                    <div className="menu-sidebar w-60 border border-gray-300 bg-white relative"
                        onMouseLeave={() => handleShowSubmenu(false, true)}>
                        {menuCategoryItems.map((item, index) => {
                            return (
                                <div key={`category-item-${index}`} className="w-full px-3.5 py-3 hover:bg-[#FCB800] cursor-pointer flex items-center flex gap-4 group"
                                    onMouseEnter={() => handleShowSubmenu(true, item.sub_menu.check)}

                                >
                                    <span>{item.icon}</span>
                                    <div className="flex-1 flex items-center justify-between">
                                        <span>{item.name}</span>
                                        <span>{item.sub_menu.check === true ? <MdKeyboardArrowRight className="w-5 h-5 text-gray-400 group-hover:text-black" /> : ""}</span>
                                    </div>
                                </div>
                            )
                        })}
                        {
                            showSubmenu &&
                            <div className="sub-menu w-[33.25rem] h-full absolute top-0 left-[240px] border border-gray-400 bg-white px-8 py-6 flex gap-10">
                                <div className="sub-menu-category">
                                    <div className="title font-bold mb-3">Đồ điện</div>
                                    <div className="item mb-2 hover:text-[#FCB800] cursor-pointer hover:translate-x-1 duration-300">Home video & Theaters</div>
                                    <div className="item mb-2 hover:text-[#FCB800] cursor-pointer hover:translate-x-1 duration-300">TV & Videos</div>
                                    <div className="item mb-2 hover:text-[#FCB800] cursor-pointer hover:translate-x-1 duration-300">Headphones</div>
                                    <div className="item mb-2 hover:text-[#FCB800] cursor-pointer hover:translate-x-1 duration-300">Video Games</div>
                                    <div className="item mb-2 hover:text-[#FCB800] cursor-pointer hover:translate-x-1 duration-300">Wireless Speaker</div>
                                </div>
                                <div className="sub-menu-category">
                                    <div className="title font-bold mb-3">Đồ điện</div>
                                    <div className="item mb-2 hover:text-[#FCB800] cursor-pointer hover:translate-x-1 duration-300">Home video & Theaters</div>
                                    <div className="item mb-2 hover:text-[#FCB800] cursor-pointer hover:translate-x-1 duration-300">TV & Videos</div>
                                    <div className="item mb-2 hover:text-[#FCB800] cursor-pointer hover:translate-x-1 duration-300">Headphones</div>
                                    <div className="item mb-2 hover:text-[#FCB800] cursor-pointer hover:translate-x-1 duration-300">Video Games</div>
                                    <div className="item mb-2 hover:text-[#FCB800] cursor-pointer hover:translate-x-1 duration-300">Wireless Speaker</div>
                                </div>
                            </div>
                        }

                    </div>
                    <div className="banner flex-1 border border-gray-300 ml-[50px]">
                        <img src={Banner} alt="" className="w-full h-full" />
                    </div>
                </div>
                <div className="section benefits bg-white my-8 px-5 py-6 flex items-center justify-between">
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
                                            <div className="product cursor-pointer px-4 py-2 group" key={`sale-off-product-${index}`}>
                                                <div className="relative">
                                                    <div className="product__image w-40 mx-auto mb-6"><img src={item} alt="" /></div>
                                                    <div className="product__utility hidden flex items-center justify-center gap-x-4 group-hover:block group-hover:flex duration-300 absolute bottom-0 bg-white left-0 right-0">
                                                        <div className="utility-item w-8 h-8 hover:bg-[#FCB800] hover:rounded-full flex items-center justify-center relative" onClick={() => hanldeAddShoppingCart()}>
                                                            <PiShoppingCartLight className="w-6 h-6 " />
                                                            <div className="tooltip-box absolute top-[-40px] flex flex-col items-center">
                                                                <div className="tooltip bg-black text-white rounded-[4px] py-1 px-3 w-40 text-center">
                                                                    <span className="text-sm">Thêm vào giỏ hàng</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="utility-item w-8 h-8 hover:bg-[#FCB800] hover:rounded-full flex items-center justify-center relative">
                                                            <IoEyeOutline className="w-6 h-6" />
                                                            <div className="tooltip-box absolute top-[-40px] flex flex-col items-center">
                                                                <div className="tooltip bg-black text-white rounded-[4px] py-1 px-3 w-40 text-center">
                                                                    <span className="text-sm">Xem nhanh</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="utility-item w-8 h-8 hover:bg-[#FCB800] hover:rounded-full flex items-center justify-center relative" onClick={() => hanldeFavoriteItem()}>
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
                                                <div className="product cursor-pointer px-4 py-2 group border border-white hover:border-gray-400" key={`sale-off-product-${index}`}>
                                                    <div className="relative">
                                                        <div className="product__image w-36 mx-auto mb-6"><img src={item} alt="" /></div>
                                                        <div className="product__utility hidden flex items-center justify-center gap-x-4 group-hover:block group-hover:flex duration-300 absolute bottom-0 bg-white left-0 right-0">
                                                            <div className="utility-item w-8 h-8 hover:bg-[#FCB800] hover:rounded-full flex items-center justify-center relative" onClick={() => hanldeAddShoppingCart()}>
                                                                <PiShoppingCartLight className="w-6 h-6 " />
                                                                <div className="tooltip-box absolute top-[-40px] flex flex-col items-center">
                                                                    <div className="tooltip bg-black text-white rounded-[4px] py-1 px-3 w-40 text-center">
                                                                        <span className="text-sm">Thêm vào giỏ hàng</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="utility-item w-8 h-8 hover:bg-[#FCB800] hover:rounded-full flex items-center justify-center relative">
                                                                <IoEyeOutline className="w-6 h-6" />
                                                                <div className="tooltip-box absolute top-[-40px] flex flex-col items-center">
                                                                    <div className="tooltip bg-black text-white rounded-[4px] py-1 px-3 w-40 text-center">
                                                                        <span className="text-sm">Xem nhanh</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="utility-item w-8 h-8 hover:bg-[#FCB800] hover:rounded-full flex items-center justify-center relative" onClick={() => hanldeFavoriteItem()}>
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
                                <div className="item cursor-pointer flex items-center gap-4 mb-4">
                                    <div><img src={Recommend_Item} alt="" className="w-16 h-16" /></div>
                                    <div>
                                        <div className="item-name text-blue-600 line-clamp-2 hover:text-[#FCB800] duration-300 mb-1">Xbox One Wireless Controller Black Color</div>
                                        <div className="text-sm">167,000 đ</div>
                                    </div>
                                </div>
                                <div className="item cursor-pointer flex items-center gap-4 mb-4">
                                    <div><img src={Recommend_Item2} alt="" className="w-16 h-16" /></div>
                                    <div>
                                        <div className="item-name text-blue-600 line-clamp-2 hover:text-[#FCB800] duration-300 mb-1">Xbox One Wireless Controller Black Color</div>
                                        <div className="text-sm">167,000 đ</div>
                                    </div>
                                </div>
                                <div className="item cursor-pointer flex items-center gap-4 mb-4">
                                    <div><img src={Recommend_Item3} alt="" className="w-16 h-16" /></div>
                                    <div>
                                        <div className="item-name text-blue-600 line-clamp-2 hover:text-[#FCB800] duration-300 mb-1">Xbox One Wireless Controller Black Color</div>
                                        <div className="text-sm">167,000 đ</div>
                                    </div>
                                </div>
                                <div className="item cursor-pointer flex items-center gap-4 mb-4">
                                    <div><img src={Recommend_Item4} alt="" className="w-16 h-16" /></div>
                                    <div>
                                        <div className="item-name text-blue-600 line-clamp-2 hover:text-[#FCB800] duration-300 mb-1">Xbox One Wireless Controller Black Color</div>
                                        <div className="text-sm">167,000 đ</div>
                                    </div>
                                </div>
                                <div className="item cursor-pointer flex items-center gap-4 mb-4">
                                    <div><img src={Recommend_Item4} alt="" className="w-16 h-16" /></div>
                                    <div>
                                        <div className="item-name text-blue-600 line-clamp-2 hover:text-[#FCB800] duration-300 mb-1">Xbox One Wireless Controller Black Color</div>
                                        <div className="text-sm">167,000 đ</div>
                                    </div>
                                </div>
                                <div className="item cursor-pointer flex items-center gap-4">
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
                                                <div className="product cursor-pointer px-4 py-2 group border border-white hover:border-gray-400" key={`sale-off-product-${index}`}>
                                                    <div className="relative">
                                                        <div className="product__image w-36 mx-auto mb-6"><img src={item} alt="" /></div>
                                                        <div className="product__utility hidden flex items-center justify-center gap-x-4 group-hover:block group-hover:flex duration-300 absolute bottom-0 bg-white left-0 right-0">
                                                            <div className="utility-item w-8 h-8 hover:bg-[#FCB800] hover:rounded-full flex items-center justify-center relative" onClick={() => hanldeAddShoppingCart()}>
                                                                <PiShoppingCartLight className="w-6 h-6 " />
                                                                <div className="tooltip-box absolute top-[-40px] flex flex-col items-center">
                                                                    <div className="tooltip bg-black text-white rounded-[4px] py-1 px-3 w-40 text-center">
                                                                        <span className="text-sm">Thêm vào giỏ hàng</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="utility-item w-8 h-8 hover:bg-[#FCB800] hover:rounded-full flex items-center justify-center relative">
                                                                <IoEyeOutline className="w-6 h-6" />
                                                                <div className="tooltip-box absolute top-[-40px] flex flex-col items-center">
                                                                    <div className="tooltip bg-black text-white rounded-[4px] py-1 px-3 w-40 text-center">
                                                                        <span className="text-sm">Xem nhanh</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="utility-item w-8 h-8 hover:bg-[#FCB800] hover:rounded-full flex items-center justify-center relative" onClick={() => hanldeFavoriteItem()}>
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
                                <div className="item cursor-pointer flex items-center gap-4 mb-4">
                                    <div><img src={Recommend_Item6} alt="" className="w-16 h-16" /></div>
                                    <div>
                                        <div className="item-name text-blue-600 line-clamp-2 hover:text-[#FCB800] duration-300 mb-1">Xbox One Wireless Controller Black Color</div>
                                        <div className="text-sm">167,000 đ</div>
                                    </div>
                                </div>
                                <div className="item cursor-pointer flex items-center gap-4 mb-4">
                                    <div><img src={Recommend_Item7} alt="" className="w-16 h-16" /></div>
                                    <div>
                                        <div className="item-name text-blue-600 line-clamp-2 hover:text-[#FCB800] duration-300 mb-1">Xbox One Wireless Controller Black Color</div>
                                        <div className="text-sm">167,000 đ</div>
                                    </div>
                                </div>
                                <div className="item cursor-pointer flex items-center gap-4 mb-4">
                                    <div><img src={Recommend_Item8} alt="" className="w-16 h-16" /></div>
                                    <div>
                                        <div className="item-name text-blue-600 line-clamp-2 hover:text-[#FCB800] duration-300 mb-1">Xbox One Wireless Controller Black Color</div>
                                        <div className="text-sm">167,000 đ</div>
                                    </div>
                                </div>
                                <div className="item cursor-pointer flex items-center gap-4 mb-4">
                                    <div><img src={Recommend_Item9} alt="" className="w-16 h-16" /></div>
                                    <div>
                                        <div className="item-name text-blue-600 line-clamp-2 hover:text-[#FCB800] duration-300 mb-1">Xbox One Wireless Controller Black Color</div>
                                        <div className="text-sm">167,000 đ</div>
                                    </div>
                                </div>
                                <div className="item cursor-pointer flex items-center gap-4 mb-4">
                                    <div><img src={Recommend_Item6} alt="" className="w-16 h-16" /></div>
                                    <div>
                                        <div className="item-name text-blue-600 line-clamp-2 hover:text-[#FCB800] duration-300 mb-1">Xbox One Wireless Controller Black Color</div>
                                        <div className="text-sm">167,000 đ</div>
                                    </div>
                                </div>
                                <div className="item cursor-pointer flex items-center gap-4">
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
                </div>
            </div>
        </div>

    )
}

export default Homepage;
