import React from 'react';
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import { useImmer } from 'use-immer';

interface INewAccount {
    name: string
    age: number
    phone: string
    password: string
}

interface APIReponse {
    EC: number
    DT: any
    EM: string
}

const RegisterPage = () => {

    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const navigate = useNavigate();

    const [showErrorMsg, setShowErrorMsg] = React.useState<boolean>(false);
    const [showSuccessMsg, setShowSuccessMsg] = React.useState<boolean>(false);

    const [newAccount, setNewAccount] = useImmer<INewAccount>({
        name: "",
        age: 0,
        phone: "",
        password: "",
    });

    const handleOnChange = (field: string, value: string) => {
        setNewAccount(draft => {
            draft[field] = value;
        });
    }

    const checkFullField = () => {
        return newAccount.name.length > 0 && newAccount.phone.length > 0 && newAccount.password.length > 0 && !isNaN(newAccount.age);
    }

    // const handleRegister = async () => {
    //     setShowErrorMsg(false);
    //     if (!checkFullField()) {
    //         return;
    //     } else {

    //         let result: APIReponse | null = await createCustomer({
    //             name: newAccount.name,
    //             age: newAccount.age,
    //             gender: "",
    //             address: "",
    //             email: "",
    //             phone: newAccount.phone
    //         });

    //         if (result) {
    //             if (result.EC !== 0) {
    //                 setShowErrorMsg(true);
    //             } else {
    //                 let { id, phone } = result.DT;
    //                 let response = await createCustomerAccount({
    //                     customerID: id,
    //                     username: phone,
    //                     password: newAccount.password
    //                 })
    //                 if (response) {
    //                     if (response.EC !== 0) {
    //                         setShowErrorMsg(true);
    //                     } else {
    //                         setShowSuccessMsg(true);
    //                         setTimeout(() => {
    //                             setShowSuccessMsg(false);
    //                             navigate('/login');
    //                         }, 1500);
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }

    const redirectLoginPage = () => {
        navigate("/login");
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
            <div className="flex items-center justify-center py-20 px-3 form-container bg-blue-600 min-h-screen">
                <div className="register-form w-[31.25rem] rounded-[4px] bg-white px-5 py-10 shadow-lg opacity-95">
                    <div className="login-form__title text-black font-medium text-2xl text-center mb-8">Đăng ký</div>
                    <div className="login-form__main flex flex-col gap-5">
                        {
                            showErrorMsg &&
                            <div className='border border-red-300 bg-red-100 w-full rounded-[4px] px-3 py-5'>
                                <span>Thông tin đăng ký không đúng quy định !</span>
                            </div>
                        }
                        {
                            showSuccessMsg &&
                            <div className='border border-green-300 bg-green-100 w-full rounded-[4px] px-3 py-5'>
                                <span>Đăng ký thành công !</span>
                            </div>
                        }
                        <div className='flex items-center justify-end'>
                            <span>{requiredTag()}</span>
                            <span> Bắt buộc</span>
                        </div>
                        <div className="w-full">
                            <div className='input_label'>Họ và Tên {requiredTag()}</div>
                            <input type="text" className="form_input" onChange={(e) => handleOnChange("name", e.target.value)} />
                        </div>
                        <div className="w-full">
                            <div className='input_label'>Tuổi {requiredTag()}</div>
                            <input type="text" className="form_input" onChange={(e) => handleOnChange("age", e.target.value)} />
                        </div>
                        <div className="w-full">
                            <div className='input_label'>Số điện thoại {requiredTag()}</div>
                            <input type="text" className="form_input" onChange={(e) => handleOnChange("phone", e.target.value)} />
                        </div>
                        <div className='w-full'>
                            <div className='input_label'>Password {requiredTag()}</div>
                            <div className='relative'>
                                <input type={showPassword ? "text" : "password"} className="form_input" onChange={(e) => handleOnChange("password", e.target.value)} />
                                <div className='absolute top-3 right-2 ' onClick={() => setShowPassword(!showPassword)}>
                                    {!showPassword ? <RiEyeCloseLine className="w-5 h-5 text-xl text-gray-500 cursor-pointer" /> : <RiEyeLine className="w-5 h-5 text-xl cursor-pointer" />}
                                </div>
                            </div>
                        </div>
                        <div className='mt-10 mb-7 w-full'>
                            <Button styles={checkFullField() ? 'form_button_valid' : 'form_button'}>ĐĂNG KÝ</Button>
                        </div>
                        <div className='text-center text-large'>
                            <span className='font-medium'>Đã có tài khoản?</span>
                            <span className='text-blue-600 ml-1 hover:underline hover:cursor-pointer' onClick={() => redirectLoginPage()}>Đăng nhập</span>
                        </div>
                        <div className='w-full text-center cursor-pointer hover:text-red-500' onClick={() => navigate("/")}>&#8672; Trở về trang chủ</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default RegisterPage;