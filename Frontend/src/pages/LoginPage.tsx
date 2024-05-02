import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { useImmer } from 'use-immer';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '@/redux/reducer/rootReducer';
import { GoMail } from "react-icons/go";
import { BsFacebook } from "react-icons/bs";
import _ from 'lodash';
import Google_Icon from '../assets/img/login_page/google_icon.svg';
import { IoCheckmark } from "react-icons/io5";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import { FaSpinner } from "react-icons/fa";
import { UserLogin } from '@/redux/actions/action';
import { successToast1 } from '@/components/Toast/Toast';
import { fetchAccount, userLogin } from '@/services/userService';

enum PATH {
    Register = "/register",
    ResetPassword = "/reset-password"
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
    const [loginRemember, setLoginRemember] = React.useState<boolean>(false);
    const [showErrorMsg, setShowErrorMsg] = React.useState<boolean>(false);
    const [showLoadingIcon, setShowLoadingIcon] = React.useState<boolean>(false);

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

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    }

    const handleLogin = async () => {
        setShowErrorMsg(false);
        setShowLoadingIcon(true);

        if (!checkFullField()) {
            return;
        } else {
            let result: APIReponse = await userLogin(user.username, user.password);
            if (result) {
                if (result.EC !== 0) {
                    setShowErrorMsg(true);
                    setShowLoadingIcon(false);
                } else {
                    let userData = result.DT;
                    console.log(userData);

                    let data = {
                        isAuthenticated: true,
                        account: {
                            id: userData.id,
                            username: userData.username,
                            role: userData.role
                        }
                    }
                    
                    successToast1("Đăng nhập thành công !");
                    setShowLoadingIcon(false);

                    setTimeout(() => {
                        dispatch(UserLogin(data));
                        window.location.reload();
                        navigate('/');
                    }, 2000);
                }
            }
        }
    }

    const fetchAccountInfo = async () => {
        let result: any = await fetchAccount();
        if (result && !_.isEmpty(result.DT)) {
            let userData = result.DT;
            let data = {
                isAuthenticated: userData.isAuthenticated,
                account: {
                    id: userData.id,
                    username: userData.username,
                    role: userData.role
                }
            }
            dispatch(UserLogin(data));
            if (userData.isAuthenticated === true) {
                navigate('/');
            }
        }
    }

    React.useEffect(() => {
        fetchAccountInfo();
    }, []);

    return (
        <div className='login-container'>
            <div className="flex justify-center py-20 px-3 bg-[#EEEEEE] min-h-screen">
                <div className="login-form rounded-[4px] w-[25rem] bg-white p-8 shadow-xl">
                    <div className="login-form__title text-black text-xl mb-5 text-center font-medium">Đăng nhập</div>
                    <div className="login-form__main flex flex-col gap-2">
                        {showErrorMsg &&
                            <div className='w-full rounded-[4px] px-4 py-3 text-sm text-red-700 bg-red-100 border border-red-300'>Tên đăng nhập hoặc Mật khẩu không đúng !</div>
                        }
                        <div className='w-full'>
                            <div className='input_label'>Tên đăng nhập</div>
                            <input type="text" className="form_input" onChange={(e) => handleOnChange('username', e.target.value)} />
                        </div>
                        <div className='w-full'>
                            <div className='input_label'>Mật khẩu</div>
                            <div className='relative'>
                                <input type={showPassword ? "text" : "password"} className="form_input" onChange={(e) => handleOnChange('password', e.target.value)}
                                    onKeyPress={(event) => handleKeyPress(event)}
                                />
                                <div className='absolute top-3 right-2 ' onClick={() => setShowPassword(!showPassword)}>
                                    {!showPassword ? <PiEyeSlash className="w-5 h-5 text-xl text-gray-500 cursor-pointer" /> : <PiEyeLight className="w-5 h-5 text-xl cursor-pointer" />}
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center justify-between mt-2'>
                            <div className='flex items-center gap-2'>
                                <div className='w-5 h-5 border border-black rounded cursor-pointer flex items-center justify-center' onClick={() => setLoginRemember(!loginRemember)}>
                                    {loginRemember ? <IoCheckmark /> : ""}
                                </div>
                                <div className='text-sm'>Ghi nhớ đăng nhập</div>
                            </div>
                            <div className="text-orange-400 cursor-pointer hover:underline text-sm" onClick={() => redirectPage(PATH.ResetPassword)}>Quên mật khẩu ?</div>
                        </div>
                        <div className='mt-6 w-full'>
                            <Button 
                            styles={checkFullField() ? 'form_button_valid' : 'form_button'}
                            OnClick={() => handleLogin()}>
                                {showLoadingIcon ? <FaSpinner className='animate-spin' /> : "ĐĂNG NHẬP"}
                            </Button>
                        </div>
                        <div className='flex items-center my-2'>
                            <div className='border-t border-gray-400 w-2/5'></div>
                            <div className='text-gray-400 text-center w-1/5'>Hoặc</div>
                            <div className='border-t border-gray-400 w-2/5'></div>
                        </div>
                        <div className='others-login-method'>
                            <div className='pl-16 flex items-center gap-2 py-3 border border-gray-400 rounded-[4px] cursor-pointer mb-2 hover:shadow-md'>
                                <GoMail className="w-6 h-6" />
                                <div>Đăng nhập bằng email</div>
                            </div>
                            <div className='pl-16 flex items-center gap-2 py-3 border border-gray-400 rounded-[4px] cursor-pointer mb-2 hover:shadow-md'>
                                <BsFacebook className="w-6 h-6 text-[#1877f2]" />
                                <div>Tiếp tục với facebook</div>
                            </div>
                            <div className='pl-16 flex items-center gap-2 py-3 border border-gray-400 rounded-[4px] cursor-pointer hover:shadow-md'>
                                <img src={Google_Icon} alt="" className="w-6 h-6" />
                                <div>Tiếp tục với Google</div>
                            </div>
                        </div>
                        <div className='text-center mt-4'>
                            <span className='text-gray-400'>Người dùng mới?</span>
                            <span className='text-blue-600 ml-1 hover:underline hover:cursor-pointer text-orange-400 font-medium' onClick={() => redirectPage(PATH.Register)}>Đăng ký tại đây</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;