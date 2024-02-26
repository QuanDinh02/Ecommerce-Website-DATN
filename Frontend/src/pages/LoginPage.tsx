import React from 'react';
import { FaUserTie, FaUser } from "react-icons/fa";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { useImmer } from 'use-immer';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@/redux/reducer/rootReducer';
import { UserLogin } from '@/redux/actions/action';

import _ from 'lodash';
import classNames from 'classnames';

enum PATH {
    Register = "/register",
    ResetPassword = "/reset"
}

const USER = {
    username: '',
    password: ''
}

interface APIReponse {
    EC: number
    DT: any
    EM: string
}

const LoginPage = () => {

    const dispatch = useDispatch();

    const account = useSelector<RootState, boolean>(state => state.user.account);
    const isAuthenticated = useSelector<RootState, boolean>(state => state.user.isAuthenticated);

    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [showErrorMsg, setShowErrorMsg] = React.useState<boolean>(false);
    const [showSuccessMsg, setShowSuccessMsg] = React.useState<boolean>(false);

    const [isCustomer, setIsCustomer] = React.useState<boolean>(true);

    const [user, setUser] = useImmer(USER);

    const navigate = useNavigate();

    const redirectPage = (path: string) => {
        navigate(path);
    }

    React.useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    const handleOnChange = (field: string, value: string) => {
        setUser(draft => {
            draft[field] = value;
        });
    }

    const checkFullField = () => {
        return user.username && user.password;
    }

    // const fetchAccountInfo = async () => {
    //     let result: any = await fetchAccount();
    //     if (result && !_.isEmpty(result.DT)) {
    //         let userData = result.DT;
    //         console.log(result);
    //         let data = {
    //             isAuthenticated: userData.isAuthenticated,
    //             account: {
    //                 id: userData.id,
    //                 username: userData.username,
    //             }
    //         }
    //         dispatch(UserLogin(data));
    //         navigate('/');
    //     }
    // }

    // const handleLogin = async () => {
    //     setShowErrorMsg(false);
    //     if (!checkFullField()) {
    //         return;
    //     } else {
    //         let result: APIReponse = await (isCustomer ? customerLogin(user.username, user.password) : staffLogin(user.username, user.password));

    //         if (result) {
    //             if (result.EC !== 0) {
    //                 setShowErrorMsg(true);
    //             } else {
    //                 setShowSuccessMsg(true);
    //                 let userData = result.DT;

    //                 let data = {
    //                     isAuthenticated: true,
    //                     account: {
    //                         id: userData.id,
    //                         username: userData.username,
    //                         role: userData.role
    //                     }
    //                 }
    //                 dispatch(UserLogin(data));

    //                 setTimeout(() => {
    //                     setShowSuccessMsg(false);
    //                     navigate('/');
    //                 }, 2000);
    //             }
    //         }
    //     }
    // }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            //handleLogin();
        }
    }

    React.useEffect(() => {
        //fetchAccountInfo();
        if (account && isAuthenticated === true) {
            navigate('/');
        }
    }, []);

    const activeStyle = (active: boolean) => classNames(
        "w-40 h-40 shadow-md flex flex-col items-center justify-center rounded-lg cursor-pointer",
        {
            'border-blue-600 bg-blue-100 text-blue-600 border-2': active,
            'border border-gray-200 text-gray-400': !active,
        }
    );

    return (
        <div className='login-container'>
            <div className="flex justify-center py-20 px-3 form-container bg-blue-600 min-h-screen">
                <div className='rounded-l-[4px] w-[31.25rem] bg-white px-5 py-10 items-stretch'>
                    <div className="login-form__title text-black font-medium text-2xl text-center mb-8">Chọn người dùng</div>
                    <div className='w-full h-full flex items-start justify-center gap-10'>
                        <div className={activeStyle(isCustomer)} onClick={() => setIsCustomer(true)}>
                            <div><FaUser className="w-12 h-12" /></div>
                            <div className='text-xl font-medium mt-2'>Khách hàng</div>
                        </div>
                        <div className={activeStyle(!isCustomer)} onClick={() => setIsCustomer(false)}>
                            <div><FaUserTie className="w-12 h-12" /></div>
                            <div className='text-xl font-medium mt-2'>Nhân viên</div>
                        </div>
                    </div>
                </div>
                <div className="login-form rounded-r-[4px] w-[31.25rem] bg-white px-5 py-10 opacity-95 border-l border-gray-100">
                    <div className="login-form__title text-black font-medium text-2xl text-center mb-8">Đăng nhập</div>
                    <div className="login-form__main flex flex-col gap-5">
                        {
                            showErrorMsg &&
                            <div className='border border-red-300 bg-red-100 w-full rounded-[4px] px-3 py-5'>
                                <span>Tài khoản/ Số điện thoại hoặc Mật khẩu không đúng !</span>
                            </div>
                        }
                        {
                            showSuccessMsg &&
                            <div className='border border-green-300 bg-green-100 w-full rounded-[4px] px-3 py-5'>
                                <span>Đăng nhập thành công !</span>
                            </div>
                        }
                        <div className='w-full'>
                            {
                                isCustomer ?
                                    <div className='input_label'>Số điện thoại</div>
                                    :
                                    <div className='input_label'>Tài khoản</div>
                            }

                            <input type="text" className="form_input" onChange={(e) => handleOnChange('username', e.target.value)} />
                        </div>
                        <div className='w-full'>
                            <div className='input_label'>Mật khẩu</div>
                            <div className='relative'>
                                <input type={showPassword ? "text" : "password"} className="form_input" onChange={(e) => handleOnChange('password', e.target.value)}
                                    onKeyPress={(event) => handleKeyPress(event)}
                                />
                                <div className='absolute top-3 right-2 ' onClick={() => setShowPassword(!showPassword)}>
                                    {!showPassword ? <RiEyeCloseLine className="w-5 h-5 text-xl text-gray-500 cursor-pointer" /> : <RiEyeLine className="w-5 h-5 text-xl cursor-pointer" />}
                                </div>
                            </div>
                        </div>
                        {
                            isCustomer &&
                            <div>
                                <span className="text-blue-600 cursor-pointer hover:underline">Quên mật khẩu ?</span>
                            </div>
                        }
                        <div className='mt-10 mb-7 w-full'>
                            <Button styles={checkFullField() ? 'form_button_valid' : 'form_button'}>ĐĂNG NHẬP</Button>
                        </div>
                        {
                            isCustomer &&
                            <div className='text-center text-large'>
                                <span className='font-medium'>Bạn chưa có tài khoản mới?</span>
                                <span className='text-blue-600 ml-1 hover:underline hover:cursor-pointer' onClick={() => redirectPage(PATH.Register)}>Tạo tài khoản tại đây</span>
                            </div>
                        }
                        <div className='w-full text-center cursor-pointer hover:text-red-500' onClick={() => navigate("/")}>&#8672; Trở về trang chủ</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LoginPage;