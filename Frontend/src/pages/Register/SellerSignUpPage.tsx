import Button from "@/components/Button";
import React from "react";
import { BsFacebook } from "react-icons/bs";
import { GoMail } from "react-icons/go";
import { IoIosArrowRoundBack } from "react-icons/io";
import Google_Icon from '../../assets/img/login_page/google_icon.svg';
import { isValidEmail } from '@/utils/emailValidate';
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { FaCheck } from "react-icons/fa6";
import OTPInput from "@/components/OTPInput";
import { useImmer } from "use-immer";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import { IoAlertCircleOutline } from "react-icons/io5";
import { FaRegCircleCheck } from "react-icons/fa6";
import { checkSellerEmailExist } from "@/services/sellerService";
import { errorToast1, successToast1 } from "@/components/Toast/Toast";
import { sendOTPSellerSignUp, verifyOTPSellerrSignUp } from "@/services/otpServices";
import { userRegister } from "@/services/userService";

enum PATH {
    Login = "/login"
}

const RESEND_CODE_TIME = 30;

const STEP_BAR_DATA = [
    {
        id: 2,
        label: "Xác minh email",
        value: 1

    },
    {
        id: 3,
        label: "Tạo tài khoản",
        value: 2
    },
    {
        id: 4,
        label: "Hoàn thành",
        value: <FaCheck />
    }
];

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

interface IRegisterProp {
    email: string
    step: number
    setStep: (step: number) => void
}

interface ISellerRegisterInfo {
    role: number
    email: string
    username: string
    password: string
}

interface INewSellerAccount {
    password: string
    username: string
    confirm_password: string
}

interface IAnnounce {
    email: string
}

const EnterEmailRegister = (props: IEnterEmailProp) => {

    const { setStep, step, email, setEmail } = props;

    const navigate = useNavigate();

    const checkFullField = () => {
        return isValidEmail(email);
    }

    const handleNextStep = async () => {

        if (isValidEmail(email)) {
            let check = await checkSellerEmailExist(email);
            if (check) {
                if (check.EC === 0) {
                    errorToast1(check.EM);
                    return;
                } else if (check.EC === 1) {
                    let result = await sendOTPSellerSignUp(email);
                    if (result && result.EC === 0) {
                        setStep(step + 1);
                    }
                } else {
                    errorToast1(check.EM);
                    return;
                }
            }
        } else {
            return;
        }
    }

    return (
        <>
            <div className="signin-form__title text-black text-xl mb-8 text-center">Đăng ký Người Bán</div>
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
                    <div className='flex items-center justify-center gap-2 py-3 border border-gray-400 rounded-[4px] cursor-pointer mb-2 hover:shadow-md'>
                        <GoMail className="w-6 h-6" />
                        <div>Đăng ký bằng email</div>
                    </div>
                    <div className='flex items-center justify-center gap-2 py-3 border border-gray-400 rounded-[4px] cursor-pointer mb-2 hover:shadow-md'>
                        <BsFacebook className="w-6 h-6 text-[#1877f2]" />
                        <div>Tiếp tục với facebook</div>
                    </div>
                    <div className='flex items-center justify-center gap-2 py-3 border border-gray-400 rounded-[4px] cursor-pointer hover:shadow-md'>
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

    const [fullOTP, setFullOTP] = React.useState<string>("");
    const [OTP, setOTP] = React.useState<string[]>(Array(6).fill(''));

    const [resendCodeTime, setResendCodeTime] = React.useState<number>(RESEND_CODE_TIME);

    const checkFullField = () => {
        return fullOTP.length > 0;
    }

    const resendOTPCustomerSignUp = async () => {
        setResendCodeTime(RESEND_CODE_TIME);
        if (resendCodeTime === 0) {
            setResendCodeTime(RESEND_CODE_TIME);
            let result = await sendOTPSellerSignUp(email);
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
            let result = await verifyOTPSellerrSignUp(email, fullOTP);
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

    const resendCodeStyle = classNames('text-sm font-medium text-center', {
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
            <div className="signin-form__title text-black text-xl mb-8 text-center">Vui Lòng Nhập Mã Xác Minh</div>
            <div className="signin-form__main flex flex-col gap-2 duration-800">
                <div className="w-full flex flex-col items-center text-sm gap-y-2 mb-6">
                    <div>Mã xác minh của bạn sẽ được gửi bằng mail đến</div>
                    <div>({email})</div>
                </div>
                <div>
                    <OTPInput
                        OTP={OTP}
                        setOTP={setOTP}
                        length={6}
                        onComplete={setFullOTP}
                        style={"border-b-2 border-slate-200 focus:border-[#FCB800] px-4 outline-none text-center text-2xl"}
                    />
                </div>
                <div className="my-6 text-center">
                    <div className="text-sm mb-2">Bạn vẫn chưa nhận được mã ?</div>
                    <div className={resendCodeStyle} onClick={() => resendOTPCustomerSignUp()}>
                        {
                            resendCodeTime > 0 ?

                                <span>Vui lòng chờ ({resendCodeTime}) giây để gửi lại mã</span>
                                :
                                <span>GỬI LẠI MÃ</span>
                        }
                    </div>

                </div>
                <div className='mt-6 w-full'>
                    <Button styles={checkFullField() ? 'form_button_valid' : 'form_button'} OnClick={() => handleNextStep()}>XÁC MINH</Button>
                </div>
            </div>
        </>
    )
}

const SellerRegister = (props: IRegisterProp) => {

    const { email, setStep, step } = props;

    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [errorField, setErrorField] = React.useState<number>(0);

    const [errorPass, setErrorPass] = React.useState<boolean>(false);

    const [newCustomerAccount, setNewCustomerAccount] = useImmer<INewSellerAccount>({
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
        return newCustomerAccount.password.length > 0
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

        let register_customer_info: ISellerRegisterInfo = {
            password: newCustomerAccount.password,
            username: newCustomerAccount.username,
            role: 2,
            email: email
        }

        let result = await userRegister(register_customer_info);
        if (result) {
            if (result.EC === 0) {
                setStep(step + 1);
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

const SuccessAnnouncement = (props: IAnnounce) => {

    const [backHomePageTime, setBackHomePageTime] = React.useState<number>(5);

    const navigate = useNavigate();

    React.useEffect(() => {
        if (backHomePageTime > 0) {
            const interval = setInterval(() => {
                setBackHomePageTime(backHomePageTime - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [backHomePageTime]);

    React.useEffect(() => {
        if (backHomePageTime === 0) {
            navigate("/")
        }
    }, [backHomePageTime]);

    return (
        <>
            <div className="announcement__title text-black text-xl mb-8 text-center">Đăng Ký Thành Công !</div>
            <div className="announcement__main flex flex-col gap-y-1 duration-800">
                <div className="w-full flex item-center justify-center"><FaRegCircleCheck className="w-12 h-12 text-[#6acd03]" /></div>
                <div className="text-sm text-center mt-4">Bạn đã tạo thành công tài khoản FoxMart với email</div>
                <div className="text-sm text-center mb-2">({props.email})</div>
                <div className="text-sm text-center">Bạn sẽ được chuyển hướng tới trang chủ trong {backHomePageTime} giây</div>
                <Button styles="w-full py-2 bg-[#FCB800] font-medium mt-6 hover:opacity-85 cursor-pointer" OnClick={() => navigate("/")}>Trở Về Trang Chủ</Button>
            </div>
        </>
    )
}

const SellerSignUpPage = () => {

    const [registerStep, setRegisterStep] = React.useState(1);
    const [email, setEmail] = React.useState<string>("");

    return (
        <div className='signin-container bg-[#EEEEEE]'>
            {
                registerStep > 1 && registerStep < 4 &&
                <div className='px-[30px] w-[80rem] mx-auto pt-3'>
                    <div className='cursor-pointer hover:underline flex items-center gap-x-1 w-fit text-lg hover:text-blue-600' onClick={() => setRegisterStep(registerStep - 1)}><IoIosArrowRoundBack className='w-10 h-10' /> Trở lại</div>
                </div>
            }
            {
                registerStep > 1 &&
                <div className='px-[30px] w-[80rem] mx-auto pt-6 pb-1'>
                    <div className="w-full flex justify-center gap-x-1">
                        {
                            STEP_BAR_DATA.map((step, index) => {
                                if (step.id <= registerStep) {
                                    return (
                                        <div className="flex gap-x-1">
                                            {(index !== 0) &&
                                                <div className="mt-5"><i className="gg-arrow-long-right active"></i></div>
                                            }
                                            <div className="flex flex-col items-center justify-center gap-y-1 w-fit" key={`step-progress-item-${index}`}>
                                                <div className="w-10 h-10 border border-[#6acd03] rounded-full flex items-center justify-center text-lg text-white font-medium bg-[#6acd03] shadow-lg">{step.value}</div>
                                                <div className="text-[#6acd03] font-medium">{step.label}</div>
                                            </div>
                                        </div>
                                    )
                                }
                                return (
                                    <div className="flex gap-x-1">
                                        {(index !== 0) &&
                                            <div className="mt-5"><i className="gg-arrow-long-right"></i></div>
                                        }
                                        <div className="flex flex-col items-center justify-center gap-y-1 w-fit" key={`step-progress-item-${index}`}>
                                            <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-lg text-gray-300 font-medium bg-white shadow-lg">{step.value}</div>
                                            <div className="text-gray-300">{step.label}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
            <div className="flex justify-center pt-10 pb-20 px-3">

                <div className="signin-form rounded-[4px] w-[26rem] bg-white p-8 shadow-xl">
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
                        <SellerRegister email={email} step={registerStep} setStep={setRegisterStep} />
                    }
                    {
                        registerStep === 4 &&
                        <SuccessAnnouncement email={email} />
                    }
                </div>
            </div>
        </div>
    )
}

export default SellerSignUpPage;