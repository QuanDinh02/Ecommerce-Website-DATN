import React from 'react';
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import Button from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { GoMail } from "react-icons/go";
import { BsFacebook } from "react-icons/bs";
import { IoAlertCircleOutline } from "react-icons/io5";
import Google_Icon from '../../assets/img/login_page/google_icon.svg';
import { fetchAccount } from '@/services/userService';
import { useDispatch } from 'react-redux';
import { UserLogin } from '@/redux/actions/action';
import { isValidEmail } from '@/utils/emailValidate';
import _ from 'lodash';
import classNames from 'classnames';
import { errorToast1, successToast1 } from '@/components/Toast/Toast';
import { IoIosArrowRoundBack } from "react-icons/io";
import { sendOTPCustomerSignUp, verifyOTPCustomerSignUp } from '@/services/otpServices';
import { userRegister, checkCustomerEmailExist } from '@/services/userService';

interface ICustomerRegisterInfo {
    role: number
    email: string
    username: string
    password: string
    phone: string
}

interface INewCustomerAccount {
    phone: string
    password: string
    username: string
    confirm_password: string
}

interface IEnterEmailProp {
    step: number
    setStep: (step: number) => void
    email: string
    setEmail: (email: string) => void
}

interface IEmailVertification {
    step: number
    setStep: (step: number) => void
    email: string
}

enum PATH {
    Login = "/login"
}

interface IRegisterProp {
    email: string
}

const RESEND_CODE_TIME = 30;

const EnterEmailRegister = (props: IEnterEmailProp) => {

    const { setStep, step, email, setEmail } = props;

    const navigate = useNavigate();

    const checkFullField = () => {
        return isValidEmail(email);
    }

    const handleNextStep = async () => {
        if (isValidEmail(email)) {
            let check = await checkCustomerEmailExist(email);
            if (check) {
                if (check.EC === 0) {
                    errorToast1(check.EM);
                    return;
                } else if (check.EC === 1) {
                    let result = await sendOTPCustomerSignUp(email);
                    if (result && result.EC === 0) {
                        setStep(step + 1);
                    }
                } else {
                    return;
                }
            }
        } else {
            return;
        }
    }

    return (
        <>
            <div className="signin-form__title text-black text-xl mb-8 text-center">Đăng ký Khách hàng</div>
            <div className="signin-form__main flex flex-col gap-2 duration-800">
                <div className='w-full'>
                    <div className='input_label'>Email</div>
                    <input type="text" className="form_input" placeholder='Nhập địa chỉ email' onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className='mt-6 w-full'>
                    <Button styles={checkFullField() ? 'form_button_valid' : 'form_button'} OnClick={() => handleNextStep()}>TIẾP THEO</Button>
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
        </>
    )
}

const EmailVertification = (props: IEmailVertification) => {

    const { setStep, step, email } = props;
    const [code, setCode] = React.useState<string>("");

    const [resendCodeTime, setResendCodeTime] = React.useState<number>(RESEND_CODE_TIME);

    const checkFullField = () => {
        return code.length > 0;
    }

    const resendOTPCustomerSignUp = async () => {
        if (resendCodeTime === 0) {
            setResendCodeTime(RESEND_CODE_TIME);
            let result = await sendOTPCustomerSignUp(email);
            if (result) {
                if (result.EC === 0) {
                    successToast1("Đã gửi mã OTP");
                } else {
                    errorToast1("Gửi mã OTP thất bại");
                }
            }
        }
    }

    const handleNextStep = async () => {
        if (checkFullField()) {
            let result = await verifyOTPCustomerSignUp(email, code);
            if (result) {
                if (result.EC === 0) {
                    successToast1(result.EM);
                    setTimeout(() => {
                        setStep(step + 1);
                    }, 1000);
                } else {
                    errorToast1(result.EM);
                    return;
                }
            }
        } else {
            return;
        }
    }

    const resendCodeStyle = classNames('text-xs font-medium my-2 text-end', {
        'text-red-500 hover:underline cursor-pointer': resendCodeTime === 0,
        'text-gray-400': resendCodeTime > 0,
    });

    React.useEffect(() => {
        if (resendCodeTime > 0) {
            const interval = setInterval(() => {
                setResendCodeTime(resendCodeTime - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [resendCodeTime]);

    return (
        <>
            <div className="signin-form__title text-black text-xl mb-8 text-center">Xác minh</div>
            <div className="signin-form__main flex flex-col gap-2 duration-800">
                <div className='p-2 border border-gray-200 text-gray-500 text-sm bg-gray-100 mb-2 tracking-wide'>Vui lòng điền mã xác minh được gửi đến {email}</div>
                <div className='w-full'>
                    <div className='input_label'>Mã xác nhận</div>
                    <input type="text" className="form_input" placeholder='Nhập mã xác minh' onChange={(e) => setCode(e.target.value)} value={code} />
                </div>
                <div className={resendCodeStyle} onClick={() => resendOTPCustomerSignUp()}><span>GỬI LẠI MÃ ({resendCodeTime})</span></div>
                <div className='mt-6 w-full'>
                    <Button styles={checkFullField() ? 'form_button_valid' : 'form_button'} OnClick={() => handleNextStep()}>XÁC MINH</Button>
                </div>
            </div>
        </>
    )
}

const CustomerRegister = (props: IRegisterProp) => {

    const navigate = useNavigate();
    const { email } = props;

    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [errorField, setErrorField] = React.useState<number>(0);

    const [errorPass, setErrorPass] = React.useState<boolean>(false);

    const [newCustomerAccount, setNewCustomerAccount] = useImmer<INewCustomerAccount>({
        phone: "",
        password: "",
        username: "",
        confirm_password: ""
    });

    const handleOnChange = (field: string, value: string) => {
        setNewCustomerAccount(draft => {
            draft[field] = value;
        });
    }

    const checkFullField = () => {
        return newCustomerAccount.phone.length > 0
            && newCustomerAccount.password.length > 0
            && newCustomerAccount.username.length > 0
            && newCustomerAccount.confirm_password.length > 0;
    }


    const handleCustomerRegister = async () => {
        if (!checkFullField()) {
            return;
        }

        if (newCustomerAccount.username.length === 0) {
            setErrorField(1);
            return;
        }

        if (newCustomerAccount.phone.length < 10) {
            setErrorField(2);
            return;
        }

        if (newCustomerAccount.password.length < 8) {
            setErrorField(3);
            setErrorPass(true);
            return;
        }

        if (newCustomerAccount.confirm_password !== newCustomerAccount.password) {
            setErrorField(4);
            return;
        }

        setErrorField(0);

        let register_customer_info: ICustomerRegisterInfo = {
            phone: newCustomerAccount.phone,
            password: newCustomerAccount.password,
            username: newCustomerAccount.username,
            role: 3,
            email: email
        }

        let result = await userRegister(register_customer_info);
        if (result) {
            if (result.EC === 0) {
                successToast1(result.EM);
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            } else {
                errorToast1(result.EM);
                return;
            }
        }
        return;
    }

    return (
        <>
            <div className="signin-form__title text-black text-xl mb-8 text-center">Đăng ký</div>
            <div className="signin-form__main flex flex-col gap-2 duration-800">
                <div className='w-full'>
                    <div className='input_label'>Tên đăng nhập</div>
                    <input type="text" className="form_input" onChange={(e) => handleOnChange('username', e.target.value)} />
                    {errorField === 1 && <div className='my-2 text-sm text-red-500'>Tên đăng nhập đã tồn tại</div>}
                </div>
                <div className='w-full'>
                    <div className='input_label'>Số điện thoại</div>
                    <input type="text" className="form_input" onChange={(e) => handleOnChange('phone', e.target.value)} />
                    {errorField === 2 && <div className='my-2 text-sm text-red-500'>Số điện thoại không đúng</div>}
                </div>
                <div className='w-full'>
                    <div className='input_label'>Mật khẩu</div>
                    <div className='relative'>
                        <input type={showPassword ? "text" : "password"} className="form_input" onChange={(e) => handleOnChange('password', e.target.value)} />
                        <div className='absolute top-3 right-2 ' onClick={() => setShowPassword(!showPassword)}>
                            {!showPassword ? <PiEyeSlash className="w-5 h-5 text-xl text-gray-500 cursor-pointer" /> : <PiEyeLight className="w-5 h-5 text-xl cursor-pointer" />}
                        </div>
                    </div>
                    {!errorPass && <div className='my-2 text-sm text-gray-400 flex items-center gap-x-1'><IoAlertCircleOutline className='w-4 h-4' /> Mật khẩu tối thiểu 8 ký tự</div>}
                    {errorField === 3 && <div className='my-2 text-sm text-red-500 flex items-center gap-x-1'>Mật khẩu tối thiểu 8 ký tự</div>}
                </div>
                <div className='w-full'>
                    <div className='input_label'>Xác nhận mật khẩu</div>
                    <input type="password" className="form_input" onChange={(e) => handleOnChange('confirm_password', e.target.value)} />
                    {errorField === 4 && <div className='my-2 text-sm text-red-500'>Xác nhận mật khẩu không đúng</div>}
                </div>
                <div className='mt-6 w-full'>
                    <Button styles={checkFullField() ? 'form_button_valid' : 'form_button'} OnClick={() => handleCustomerRegister()}>Đăng ký</Button>
                </div>
            </div>
        </>
    )
}

const CustomerSignUpPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [registerStep, setRegisterStep] = React.useState(1);
    const [email, setEmail] = React.useState<string>("");

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
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    React.useEffect(() => {
        fetchAccountInfo();
    }, []);

    return (
        <div className='signin-container bg-[#EEEEEE]'>
            {registerStep > 1 &&
                <div className='px-[30px] w-[80rem] mx-auto py-3'>
                    <div className='cursor-pointer hover:underline flex items-center gap-x-1 w-fit text-lg hover:text-blue-600' onClick={() => setRegisterStep(registerStep - 1)}><IoIosArrowRoundBack className='w-10 h-10' /> Trở lại</div>
                </div>
            }

            <div className="flex justify-center py-20 px-3">

                <div className="signin-form rounded-[4px] w-[25rem] bg-white p-8 shadow-xl">
                    {
                        registerStep === 1 &&
                        <EnterEmailRegister
                            step={registerStep}
                            setStep={setRegisterStep}
                            email={email}
                            setEmail={setEmail}
                        />
                    }
                    {
                        registerStep === 2 &&
                        <EmailVertification step={registerStep} setStep={setRegisterStep} email={email} />
                    }
                    {
                        registerStep === 3 &&
                        <CustomerRegister email={email} />
                    }
                </div>
            </div>

        </div>
    )
}

export default CustomerSignUpPage;
