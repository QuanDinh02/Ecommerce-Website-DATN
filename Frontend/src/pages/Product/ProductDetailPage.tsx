import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Product01 from '../../assets/img/product_detail/product_01.svg';
import Product02 from '../../assets/img/product_detail/product_02.svg';
import Product03 from '../../assets/img/product_detail/product_03.svg';
import Product04 from '../../assets/img/product_detail/product_04.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css/navigation';
import React from "react";
import { GoStarFill } from "react-icons/go";
import { GoDotFill } from "react-icons/go";
import { MdOutlineMessage } from "react-icons/md";
import { IoBagCheckOutline } from "react-icons/io5";
import { CurrencyFormat } from "@/utils/numberFormat";
import { FiPlus, FiMinus } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa6";
import { successToast1 } from "@/components/Toast/Toast";
import { useImmer } from "use-immer";

const ProductDetailPage = () => {

    const navigate = useNavigate();

    const [selectedImage, setSelectedImage] = React.useState({
        id: 1,
        image: Product01
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

    const [commentList, setCommentList] = React.useState([
        {
            id: 1,
            customer_name: "Minh Nhựt",
            ratings: 5,
            date: "01/03/2023",
            content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
        },
        {
            id: 2,
            customer_name: "Thiên Bảo",
            ratings: 4,
            date: "01/03/2023",
            content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
        },
    ]);

    const handleProductAmount = (num: any) => {
        if (!isNaN(num) && num > 0) {
            setAmount(num);
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
        successToast1("Thêm vào sản phẩm yêu thích thành công");
    }

    const hanldeAddShoppingCart = () => {
        successToast1("Thêm vào giỏ hàng thành công");
    }

    return (
        <div className="product-detail-container">
            <div className="product-detail__breadcrumb border-b border-gray-300">
                <div className="breadcrumb-content w-[80rem] mx-auto px-[30px] py-4 flex items-center gap-2">
                    <div onClick={() => navigate("/")} className="cursor-pointer hover:underline">Trang chủ</div>
                    <MdOutlineArrowForwardIos />
                    <div className="cursor-pointer hover:underline">Điện thoại/ Thiết bị</div>
                    <MdOutlineArrowForwardIos />
                    <div className="font-medium cursor-pointer hover:underline">Điện Thoại Di Động Apple iPhone Retina 6s Plus 64GB</div>
                </div>
            </div>
            <div className="product-detail__content mt-16 mb-24">
                <div className="main w-[80rem] mx-auto px-[30px]">
                    <div className="flex">
                        <div className="product__images mr-16">
                            <div className="w-80 h-80">
                                <img src={selectedImage.image} className="select-none" />
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
                                <div className="product__info-description w-[50rem] text-gray-500 text-justify mb-5">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                </div>
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
                                    {commentList && commentList.length > 0 &&
                                        commentList.map((item, index) => {
                                            return (
                                                <div key={`customer-comment-${item.id}`} className="mb-10">
                                                    <div className="flex gap-x-2 mb-3">
                                                        <div className="w-12 h-12 rounded-full bg-cyan-200 flex items-center justify-center text-cyan-600">MN</div>
                                                        <div className="flex flex-col">
                                                            <div className="flex items-center gap-x-2">
                                                                <div className="font-medium">{item.customer_name}</div>
                                                                <div className="flex items-center gap-x-1">
                                                                    {
                                                                        [...Array(Math.floor(item.ratings))].map((item, index) => {
                                                                            return (
                                                                                <GoStarFill className="text-[#FCB800] w-4 h-4" />
                                                                            )
                                                                        })
                                                                    }
                                                                    {
                                                                        [...Array(5-Math.floor(item.ratings))].map((item, index) => {
                                                                            return (
                                                                                <GoStarFill className="text-gray-300 w-4 h-4" />
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>

                                                            <div className="text-gray-600">{item.date}</div>
                                                        </div>

                                                    </div>
                                                    <div className="w-[50rem] text-gray-500">{item.content}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </>
                        }
                        <div>
                            <div className="font-medium text-xl">Các sản phẩm liên quan</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailPage;