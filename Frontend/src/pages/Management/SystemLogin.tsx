import Button from "@/components/Button";
import React from "react";
import { FaSpinner } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const SystemLogin = () => {

    const naviate = useNavigate();

    const [showLoadingIcon, setShowLoadingIcon] = React.useState<boolean>(false);

    const handleSystemLogin = () => {
        naviate("/fms");
    }

    const checkFullField = () => {
        return true;
    }

    return (
        <div className='system-login-container'>
            <div className="flex flex-col w-full h-screen relative bg-gradient-to-r from-cyan-500 to-blue-500">
                <div className="absolute w-full h-full z-10 flex items-center justify-center">
                    <div className="login-form rounded-[4px] w-[25rem] bg-white p-10 h-fit">
                        <div className="login-form__title text-black text-2xl mb-5 text-center font-medium flex items-center justify-center gap-x-2"><FaUser/> Sign In</div>
                        <div className="w-full border border-gray-200 mb-4"></div>
                        <div className="login-form__main flex flex-col gap-2">
                            <div className='w-full mb-2'>
                                <div className='mb-2 text-gray-500 font-medium tracking-wide'>USERNAME</div>
                                <input type="text" className="form_system_input" />
                            </div>
                            <div className='w-full'>
                                <div className='mb-2 text-gray-500 font-medium tracking-wide'>PASSWORD</div>
                                <input type="password" className="form_system_input" />
                            </div>
                            <div className="my-2 text-blue-600 hover:underline cursor-pointer font-medium w-fit">Forget password?</div>
                            <div className='mt-6 w-full'>
                                <Button
                                    styles={checkFullField() ? 'form_button_system_valid' : 'form_button'}
                                    OnClick={() => handleSystemLogin()}
                                    >
                                    {showLoadingIcon ? <FaSpinner className='animate-spin' /> : "SIGN IN"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SystemLogin;