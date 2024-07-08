import Button from "@/components/Button";
import { errorToast1, successToast1 } from "@/components/Toast/Toast";
import { UserLogin } from "@/redux/actions/action";
import { APIResponse } from "@/services/common";
import { fetchSysAccount, userSysLogin } from "@/services/userService";
import _ from "lodash";
import React from "react";
import { Toaster } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useImmer } from "use-immer";

const USER = {
    username: '',
    password: ''
}

const SystemLogin = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [user, setUser] = useImmer(USER);

    const [showLoadingIcon, setShowLoadingIcon] = React.useState<boolean>(false);

    const handleOnChange = (field: string, value: string) => {
        setUser(draft => {
            draft[field] = value;
        });
    }

    const handleLogin = async () => {

        if (!checkFullField()) {
            return;
        } else {
            setShowLoadingIcon(true);
            let result: APIResponse = await userSysLogin(user.username, user.password);
            if (result) {
                if (result.EC !== 0) {
                    errorToast1("Tài khoản hoặc mật khẩu không đúng !")
                    setShowLoadingIcon(false);
                } else {
                    successToast1("Đăng nhập thành công !");
                    setShowLoadingIcon(false);

                    setTimeout(() => {
                        fetchAccountInfo();
                        //navigate("/fms/su")
                    }, 2000);
                }
            }
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    }

    const checkFullField = () => {
        return user.username.length > 0 && user.password.length > 0;
    }

    const fetchAccountInfo = async () => {
        let result: any = await fetchSysAccount();

        if (result && !_.isEmpty(result.DT)) {

            let userData = result.DT;

            if (userData.role === "shipping_unit") {

                let data = {
                    isAuthenticated: userData.isAuthenticated,
                    account: {
                        username: userData.username,
                        role: userData.role,
                        shipping_unit_id: userData.shipping_unit_id
                    }
                }

                dispatch(UserLogin(data));
                navigate("/fms/su/dashboard");
            }

            if (userData.role === "admin") {

                let data = {
                    isAuthenticated: userData.isAuthenticated,
                    account: {
                        username: userData.username,
                        role: userData.role,
                        asid: userData.asid
                    }
                }

                dispatch(UserLogin(data));
                navigate("/fms/admin/dashboard");
            }
        }
    }

    React.useEffect(() => {
        fetchAccountInfo();
    }, []);

    React.useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    return (
        <>
            <div className='system-login-container'>
                <div className="flex flex-col w-full h-screen relative bg-[#E6E6E6]">
                    <div className="absolute w-full h-full z-10 flex items-center justify-center">
                        <div className="login-sys-form border border-gray-300 rounded-[4px] w-[25rem] bg-white p-10 h-fit">
                            <div className="login-form__title text-black text-2xl mb-5 text-center font-medium flex items-center justify-center gap-x-2"><FaUser /> Sign In</div>
                            <div className="w-full border border-gray-200 mb-4"></div>
                            <div className="login-form__main flex flex-col gap-2">
                                <div className='w-full mb-2'>
                                    <div className='mb-2 text-gray-500 font-medium tracking-wide'>USERNAME</div>
                                    <input type="text" className="form_system_input" onChange={(e) => handleOnChange('username', e.target.value)} onKeyPress={(event) => handleKeyPress(event)} />
                                </div>
                                <div className='w-full'>
                                    <div className='mb-2 text-gray-500 font-medium tracking-wide'>PASSWORD</div>
                                    <input type="password" className="form_system_input" onChange={(e) => handleOnChange('password', e.target.value)} onKeyPress={(event) => handleKeyPress(event)} />
                                </div>
                                <div className='mt-6 w-full'>
                                    <Button
                                        styles={checkFullField() ? 'form_button_system_valid' : 'form_button'}
                                        OnClick={() => handleLogin()}
                                    >
                                        {showLoadingIcon ? <FaSpinner className='animate-spin' /> : "SIGN IN"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    )
}

export default SystemLogin;