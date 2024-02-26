import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';

const ForgotPasswordPage = () => {

    const navigate = useNavigate();

    const redirectLoginPage = () => {
        navigate("/login");
    }

    React.useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className='reset-password-container'>
            <div className="flex items-center justify-center my-20 mx-3 form-container ">
                <div className="login-form w-[31.25rem] primary-color rounded-[20px] px-5 py-10 shadow-[0px_4px_4px_0_rgba(0,0,0,0.25)]">
                    <div className="login-form__title text-white font-bold text-2xl text-center mb-8">Forgot Password</div>
                    <div className="login-form__main flex flex-col gap-5">
                        <div className='w-full'>
                            <div className='input_label'>Email</div>
                            <input type="text" className="form_input" />
                        </div>
                        <div className='mt-10 mb-7 flex justify-center'>
                            <Button styles='form_button input-shadow'>Reset Password</Button>
                        </div>
                        <div className='text-center text-white font-bold text-sm'>
                            <span className='ml-2 hover:underline hover:cursor-pointer' onClick={() => redirectLoginPage()}>Back to Log In</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ForgotPasswordPage;