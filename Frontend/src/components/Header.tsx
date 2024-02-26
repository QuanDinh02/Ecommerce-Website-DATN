import React from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@/redux/reducer/rootReducer';
import { UserLogin } from '@/redux/actions/action';
// import { staffLogout, fetchAccount } from '@/services/userServices';
import _ from 'lodash';
import { successToast1 } from '@/components/Toast/Toast';
import { IoIosSearch } from "react-icons/io";
import { PiShoppingCartLight } from "react-icons/pi";
import { BsHeart, BsPerson } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import classNames from 'classnames';
export interface IAccount {
    id: number
    username: string
    role: string
}

const Header = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [ignore, setIgnore] = React.useState<boolean>(false);

    const account: IAccount = useSelector<RootState, IAccount>(state => state.user.account);
    const isAuthenticated = useSelector<RootState, boolean>(state => state.user.isAuthenticated);

    const dispatch = useDispatch();

    const roles = ["Quản lý", "Nhân viên"];

    const handleCheckRole = (role: string) => {
        return roles.some(item => item === role);
    }

    React.useEffect(() => {
        if (checkIsIgnorePathnames(location.pathname)) {
            setIgnore(true);
        } else {
            setIgnore(false);
        };
    }, [location]);

    const ignorePathnames = [
        '/register', '/login'
    ]

    const checkIsIgnorePathnames = (pathname: string) => {
        return ignorePathnames.includes(pathname);
    }

    // const fetchAccountInfo = async () => {
    //     let result: any = await fetchAccount();
    //     if (result && !_.isEmpty(result.DT)) {
    //         let userData = result.DT;
    //         let data = {
    //             isAuthenticated: userData.isAuthenticated,
    //             account: {
    //                 id: userData.id,
    //                 username: userData.username,
    //                 role: userData.role
    //             }
    //         }
    //         dispatch(UserLogin(data));
    //     }
    // }

    React.useEffect(() => {
        //fetchAccountInfo();
    }, []);

    // const handeStaffLogout = async () => {
    //     let result: any = await staffLogout();
    //     if (result && result.EC === 0) {
    //         successToast1(result.EM);
    //         setTimeout(() => {
    //             window.location.reload();
    //         }, 1500);
    //     }
    // }

    const [scrollPosition, setScrollPosition] = React.useState(0);

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

    return (
        <>
            <div className={headerStickyStyle}>
                <div className='section_top'>
                    <div className='logo' onClick={() => navigate('/')}>
                        <span className='text-black'>Fox</span>
                        <span className='text-white'>Mart</span>
                    </div>
                    <div className='search-bar'>
                        <div className='search-bar__text'>
                            <IoIosSearch className="w-6 h-6 text-gray-500" />
                            <input type="text" className='text-black font-normal px-2 w-full outline-none' />
                        </div>
                        <div className='search-bar__btn'>Tìm kiếm</div>
                    </div>
                    <div className="navigation">
                        <div className='favorite-items relative'>
                            <BsHeart className="icon" />
                            <div className='count absolute right-[-5px] top-[16px]'>2</div>
                        </div>
                        <div className='shopping-cart relative'>
                            <PiShoppingCartLight className="icon" />
                            <div className='count absolute right-[-5px] top-[16px]'>1</div>
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
            <div className='header__bottom'>
                <div className='section_bottom'>
                    <div className='categories'>
                        <div className='main'>
                            <FiMenu className="w-6 h-6" />
                            <span>Danh mục</span>
                        </div>
                    </div>
                    <div className='recent-products'>
                        <span>Sản phẩm xem gần đây</span>
                        <IoIosArrowDown />
                    </div>
                    <div className='order-tracking'>
                        <span>Theo dõi đơn hàng</span>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Header;