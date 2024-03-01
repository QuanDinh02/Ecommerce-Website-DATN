import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";
import _ from 'lodash';
import { IoIosSearch } from "react-icons/io";
import { PiShoppingCartLight } from "react-icons/pi";
import { BsHeart, BsPerson } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { menuCategoryItems } from '@/data/homepage';
import classNames from 'classnames';
import Item from '../assets/img/homepage/item.svg';
import Item2 from '../assets/img/homepage/item2.svg';
import Item3 from '../assets/img/homepage/item3.svg';
import Item6 from '../assets/img/homepage/item6.svg';
import { CurrencyFormat } from '@/utils/numberFormat';

export interface IAccount {
    id: number
    username: string
    role: string
}

const Header = () => {

    const navigate = useNavigate();

    const [scrollPosition, setScrollPosition] = React.useState(0);

    const [showMenu, setShowMenu] = React.useState<boolean>(false);
    const [showSubmenu, setShowSubmenu] = React.useState<boolean>(false);
    const [showViewProduct, setShowViewProduct] = React.useState<boolean>(false);
    const [showMiniShoppingCart, setShowMiniShoppingCart] = React.useState<boolean>(false);

    const [shoppingCartItems, setShoppingCartItems] = React.useState([
        {
            id: 1,
            name: "MVMTH Classical Leather Watch In Black",
            image: Item,
            amount: 1,
            price: 199000
        },
        {
            id: 2,
            name: "MVMTH Classical Leather Watch In Black",
            image: Item2,
            amount: 1,
            price: 199000
        },
        {
            id: 3,
            name: "MVMTH Classical Leather Watch In Black",
            image: Item3,
            amount: 1,
            price: 199000
        }
    ]);

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

    const handleShowMenu = (show: boolean, check: boolean) => {
        if (show && check) {
            setShowMenu(true);
        } else {
            setShowMenu(false);
        }
    }

    const handleShowSubmenu = (show: boolean, check: boolean) => {
        if (show && check) {
            setShowSubmenu(true);
        } else {
            setShowSubmenu(false);
        }
    }

    return (
        <>
            <div className={headerStickyStyle}>
                <div className='section_top'>
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
                                    <div className='absolute top-[3.375rem] z-50' onMouseLeave={() => handleShowMenu(false, true)}>
                                        <div className="menu-sidebar w-60 border border-gray-300 bg-white relative text-black font-normal">
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
                                                <div className="sub-menu w-[33.25rem] h-full absolute top-0 left-[238px]  border border-gray-400 bg-white px-8 py-6 flex gap-10">
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
                                    </div>
                                }

                            </div>
                            :
                            <div className='logo' onClick={() => navigate('/')}>
                                <span className='text-black'>Fox</span>
                                <span className='text-white'>Mart</span>
                            </div>
                    }

                    <div className='search-bar'>
                        <div className='search-bar__text'>
                            <IoIosSearch className="w-6 h-6 text-gray-500" />
                            <input type="text" className='text-black font-normal px-2 w-full outline-none' />
                        </div>
                        <div className='search-bar__btn'>Tìm kiếm</div>
                    </div>
                    <div className="navigation">
                        <div className='favorite-items relative' onClick={() => navigate("/favorite-products")}>
                            <BsHeart className="icon" />
                            <div className='count absolute right-[-5px] top-[16px]'>2</div>
                        </div>
                        <div className='shopping-cart relative z-50' onMouseEnter={() => setShowMiniShoppingCart(true)} onClick={() => navigate("/cart")}>
                            <PiShoppingCartLight className="icon" />
                            <div className='count absolute right-[-5px] top-[16px]'>3</div>
                            {
                                showMiniShoppingCart &&
                                <div className='widget-shopping-cart absolute bg-white top-[50px] w-[23rem] right-[-160px] z-50 px-5 py-4 border border-gray-400' 
                                onMouseEnter={() => setShowMiniShoppingCart(true)}
                                onMouseLeave={() => setShowMiniShoppingCart(false)}
                                >
                                    {shoppingCartItems && shoppingCartItems.length > 0 &&
                                        shoppingCartItems.map((item, index) => {
                                            return (
                                                <div key={`shopping-cart-item-${index}`} className='flex pb-5 mb-4 border-b border-gray-300 gap-x-2'>
                                                    <div className='w-12 h-12 cursor-pointer'><img src={item.image} alt="" /></div>
                                                    <div className='flex items-center'>
                                                        <div>
                                                            <div className='line-clamp-2 text-black text-blue-500 font-normal duration-300 hover:text-[#FCB800] cursor-pointer text-sm mb-1'>{item.name}</div>
                                                            <div className='flex items-center gap-x-1 text-black font-normal text-sm'>
                                                                <span>{item.amount}</span>
                                                                <span>x</span>
                                                                <span>{CurrencyFormat(item.price)}</span>
                                                            </div>
                                                        </div>
                                                        <div className='font-normal text-gray-300 text-xl hover:text-red-500 cursor-pointer'>&#128473;</div>
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }
                                    <div className='shopping-cart-total flex items-center justify-between mb-8'>
                                        <div className='font-medium text-black text-lg'>Tổng cộng</div>
                                        <div className='font-bold text-red-500 text-lg'>{CurrencyFormat(597000)}</div>
                                    </div>
                                    <div className='flex items-center justify-between gap-x-6'>
                                        <div className='bg-[#FCB800] py-3 text-black rounded-[4px] font-medium w-1/2 text-center hover:opacity-80 cursor-pointer' onClick={() => navigate("/cart")}>Xem giỏ hàng</div>
                                        <div className='bg-[#FCB800] py-3 text-black rounded-[4px] font-medium w-1/2 text-center hover:opacity-80 cursor-pointer'>Thanh toán</div>

                                    </div>
                                </div>
                            }
                        </div>
                        <div className='authentication'>
                            <BsPerson className="icon" />
                            <Link className="nav-item" to="/login">Đăng nhập&nbsp;/&nbsp;</Link>
                            <Link className="nav-item" to="/register"> Đăng ký</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full border-t border-gray-600'></div>
            <div className='header__bottom relative'>
                <div className='section_bottom'>
                    <div className='categories'>
                        <div className='main'>
                            <FiMenu className="w-6 h-6" />
                            <span>Danh mục</span>
                        </div>
                    </div>
                    <div className='recent-products font-normal' onMouseEnter={() => setShowViewProduct(true)}>
                        <span>Sản phẩm xem gần đây</span>
                        <IoIosArrowDown />
                    </div>
                </div>
                {
                    showViewProduct &&
                    <div className='recently-viewed-products absolute top-[3.25rem] bg-white w-full px-12 py-5' onMouseLeave={() => setShowViewProduct(false)}>
                        <div className='w-[80rem] mx-auto px-[30px] h-full flex flex-wrap'>
                            <div className='viewed-item border-2 border-white hover:border-[#FCB800] duration-500 cursor-pointer'>
                                <img src={Item6} alt="" className='w-24 h-24' />
                            </div>
                        </div>
                        <div className='text-black mt-10 text-center'>
                            <span className='cursor-pointer underline hover:text-[#FCB800] duration-300'>Xem tất cả các sản phẩm bạn đã xem</span>
                        </div>
                    </div>
                }

            </div>
        </>

    )
}

export default Header;