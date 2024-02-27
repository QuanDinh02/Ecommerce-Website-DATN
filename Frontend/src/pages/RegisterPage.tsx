import React from 'react';
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { GoMail } from "react-icons/go";
import { BsFacebook } from "react-icons/bs";
import Google_Icon from '../assets/img/login_page/google_icon.svg';
interface INewShopAccount {
    name: string
    shop_name: string
    email: string
    phone: string
    password: string
}

interface INewCustomerAccount {
    phone: string
    password: string
    email
}

interface APIReponse {
    EC: number
    DT: any
    EM: string
}

enum PATH {
    Login = "/login",
}

const RegisterPage = () => {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [isCustomer, setIsCustomer] = React.useState<boolean>(true);

    const [newCustomerAccount, setNewCustomerAccount] = useImmer<INewCustomerAccount>({
        phone: "",
        password: "",
        email: ""
    });

    const [newShopAccount, setNewShopAccount] = useImmer<INewShopAccount>({
        name: "",
        shop_name: "",
        email: "",
        phone: "",
        password: "",
    });

    const handleOnChange = (field: string, value: string) => {
        if (isCustomer) {
            setNewCustomerAccount(draft => {
                draft[field] = value;
            });
        }
        setNewShopAccount(draft => {
            draft[field] = value;
        });
    }

    const checkFullField = () => {
        if (isCustomer) {
            return newCustomerAccount.phone.length > 0 && newCustomerAccount.password.length > 0;
        }
        return newShopAccount.phone.length > 0 && newShopAccount.password.length > 0 && newShopAccount.name.length > 0 && newShopAccount.shop_name.length > 0;
    }

    const requiredTag = () => {
        return (
            <span className='text-red-500 font-medium'>(*)</span>
        )
    }

    React.useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);


    return (
        <div className='signin-container'>
            <div className="flex justify-center py-20 px-3 bg-[#EEEEEE] min-h-screen">
                <div className="signin-form rounded-[4px] w-[25rem] bg-white p-8 shadow-xl">
                    <div className="signin-form__title text-black text-xl mb-5 text-center font-medium">Đăng ký</div>
                    <div className="signin-form__main flex flex-col gap-2 duration-800">
                        <div className='w-full'>
                            <div className='input_label'>Số điện thoại {requiredTag()}</div>
                            <input type="text" className="form_input" onChange={(e) => handleOnChange('phone', e.target.value)} />
                        </div>
                        <div className='w-full'>
                            <div className='input_label'>Mật khẩu {requiredTag()}</div>
                            <div className='relative'>
                                <input type={showPassword ? "text" : "password"} className="form_input" onChange={(e) => handleOnChange('password', e.target.value)} />
                                <div className='absolute top-3 right-2 ' onClick={() => setShowPassword(!showPassword)}>
                                    {!showPassword ? <PiEyeSlash className="w-5 h-5 text-xl text-gray-500 cursor-pointer" /> : <PiEyeLight className="w-5 h-5 text-xl cursor-pointer" />}
                                </div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='input_label'>Email {requiredTag()}</div>
                            <input type="text" className="form_input" onChange={(e) => handleOnChange('email', e.target.value)} />
                        </div>
                        <div className={`overflow-hidden transition-all duration-500 ease-in-out flex flex-col gap-2
                        ${!isCustomer ? "h-44" : "h-0"}`}>
                            <div className='w-full'>
                                <div className='input_label'>Họ và tên {requiredTag()}</div>
                                <input type="text" className="form_input" onChange={(e) => handleOnChange('name', e.target.value)} />
                            </div>
                            <div className='w-full'>
                                <div className='input_label'>Tên shop {requiredTag()}</div>
                                <input type="text" className="form_input" onChange={(e) => handleOnChange('shop_name', e.target.value)} />
                            </div>
                        </div>
                        <div className='mt-2'>
                            <div className='flex items-center gap-2 mb-2 cursor-pointer w-fit' onClick={() => setIsCustomer(true)}>
                                <div className='w-5 h-5 border border-black rounded-full flex items-center justify-center'>
                                    {isCustomer && <div className='w-3 h-3 bg-black rounded-full'></div>}
                                </div>
                                <div>Khách hàng</div>
                            </div>
                            <div className='flex items-center gap-2 cursor-pointer w-fit' onClick={() => setIsCustomer(false)}>
                                <div className='w-5 h-5 border border-black rounded-full flex items-center justify-center'>
                                    {!isCustomer && <div className='w-3 h-3 bg-black rounded-full'></div>}
                                </div>
                                <div>Người bán</div>
                            </div>
                        </div>
                        <div className='mt-6 w-full'>
                            <Button styles={checkFullField() ? 'form_button_valid' : 'form_button'}>ĐĂNG KÝ</Button>
                        </div>
                        <div className='flex items-center my-2'>
                            <div className='border-t border-gray-400 w-2/5'></div>
                            <div className='text-gray-400 text-center w-1/5'>Hoặc</div>
                            <div className='border-t border-gray-400 w-2/5'></div>
                        </div>
                        <div className='others-login-method'>
                            <div className='pl-16 flex items-center gap-2 py-3 border border-gray-400 rounded-[4px] cursor-pointer mb-2 hover:shadow-md'>
                                <GoMail className="w-6 h-6" />
                                <div>Đăng ký bằng email</div>
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
                            <span className='text-gray-400'>Đã có tài khoản?</span>
                            <span className='text-blue-600 ml-1 hover:underline hover:cursor-pointer text-orange-400 font-medium' onClick={() => navigate(PATH.Login)}>Đăng nhập tại đây</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default RegisterPage;