import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { IoArrowBackOutline } from "react-icons/io5";

const ForgotPasswordPage = () => {

    const navigate = useNavigate();
    const [email, setEmail] = React.useState<string>("");

    const [code, setCode] = React.useState<string>("");
    const [newPassword, setNewPassword] = React.useState<string>("");
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");

    const [changeStep, setChangeStep] = React.useState(1);

    const redirectLoginPage = () => {
        navigate("/login");
    }

    const checkEmail = () => {
        return email.length > 0;
    }

    const checkPassword = () => {
        return newPassword === confirmPassword && newPassword.length >= 8 && code.length > 0;
    }

    const handleEmail = () => {
        if(checkEmail()) {
            setChangeStep(changeStep + 1);
        }
    }

    const handleChangePassword = () => {
        if(checkPassword()) {
            setChangeStep(changeStep + 1);
        }
    }

    React.useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className='reset-password-container'>
            <div className="flex justify-center py-20 px-3 bg-[#EEEEEE]">
                <div className="reset-form rounded-[4px] w-[25rem] bg-white p-8 shadow-xl">
                    {
                        changeStep === 1 &&
                        <>
                            <div className="reset-form__title text-black text-xl mb-2 text-center font-medium">Quên mật khẩu ?</div>
                            <div className='text-center text-sm text-gray-400 mb-5'>Chúng tôi sẽ hướng dẫn bạn khôi phục mật khẩu</div>
                            <div className="reset-form__main flex flex-col gap-2">
                                <div className='w-full'>
                                    <div className='input_label'>Email</div>
                                    <input type="text" className="form_input" placeholder='Nhập email của bạn' value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className='mt-6 w-full'>
                                    <Button styles={checkEmail() ? 'form_button_valid' : 'form_button'} OnClick={() => handleEmail()}>Tiếp tục</Button>
                                </div>

                                <div className='flex items-center justify-center gap-1 mt-4 text-black hover:text-orange-400'>
                                    <IoArrowBackOutline />
                                    <span className='ml-1 cursor-pointer hover:underline' onClick={() => redirectLoginPage()}>Trở lại đăng nhập</span>
                                </div>
                            </div>
                        </>
                    }
                    {
                        changeStep === 2 &&
                        <>
                            <div className="reset-form__title text-black text-xl mb-2 text-center font-medium">Thiết lập mật khẩu mới</div>
                            <div className='text-center text-sm text-gray-400 mb-5'>Chúng tôi đã gửi mã thay đổi mật khẩu đến foxmart@gmail.com</div>
                            <div className="reset-form__main flex flex-col gap-2">
                                <div className='w-full'>
                                    <div className='input_label'>Mã thay đổi</div>
                                    <input type="text" className="form_input" placeholder='' value={code} onChange={(e) => setCode(e.target.value)} />
                                </div>
                                <div className='w-full'>
                                    <div className='input_label'>Mật khẩu mới</div>
                                    <input type="password" className="form_input" placeholder='' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                </div>
                                <div className='w-full'>
                                    <div className='input_label'>Xác nhận mật khẩu mới</div>
                                    <input type="password" className="form_input" placeholder='' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                                <div className='mt-6 w-full'>
                                    <Button styles={checkPassword() ? 'form_button_valid' : 'form_button'} OnClick={() => handleChangePassword()}>Xác nhận</Button>
                                </div>

                                <div className='flex items-center justify-center gap-1 mt-4 text-black hover:text-orange-400'>
                                    <IoArrowBackOutline />
                                    <span className='ml-1 cursor-pointer hover:underline' onClick={() => redirectLoginPage()}>Trở lại đăng nhập</span>
                                </div>
                            </div>
                        </>
                    }
                    {
                        changeStep === 3 &&
                        <>
                            <div className="reset-form__title text-black text-xl mb-2 text-center font-medium text-green-500">Thiết lập mật khẩu mới thành công</div>
                            <div className='text-center text-sm text-gray-400 mb-5'>
                                <div>Mật khẩu của bạn đã thay đổi thành công. </div>
                                <div>Vui lòng trở lại trang đăng nhập.</div>
                            </div>
                            <div className="reset-form__main flex flex-col gap-2">
                                <div className='mt-6 w-full'>
                                    <Button styles={'form_button_valid'} OnClick={() => redirectLoginPage()}>Đăng nhập</Button>
                                </div>

                                <div className='flex items-center justify-center gap-1 mt-4 text-black hover:text-orange-400'>
                                    <IoArrowBackOutline />
                                    <span className='ml-1 cursor-pointer hover:underline' onClick={() => navigate("/")}>Trở lại trang chủ</span>
                                </div>
                            </div>
                        </>
                    }

                </div>
            </div>

        </div>
    )
}

export default ForgotPasswordPage;