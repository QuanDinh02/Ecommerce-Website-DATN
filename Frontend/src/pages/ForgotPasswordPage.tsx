import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { IoAlertCircleOutline, IoArrowBackOutline } from "react-icons/io5";
import { FaRegCircleCheck, FaSpinner } from 'react-icons/fa6';
import { isValidEmail } from '@/utils/emailValidate';
import OTPInput from '@/components/OTPInput';
import classNames from 'classnames';
import { checkEmailWebsiteUserExist, userChangePassword } from '@/services/userService';
import { errorToast1, successToast1 } from '@/components/Toast/Toast';
import { sendOTPChangePassword, verifyOTPUserChangePasswordSignUp } from '@/services/otpServices';

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

interface IChangePasswordStage {
    email: string
    step: number
    setStep: (step: number) => void
}

const RESEND_CODE_TIME = 30;

const EnterEmailRegister = (props: IEnterEmailProp) => {

    const { setStep, step, email, setEmail } = props;

    const navigate = useNavigate();
    const [showLoadingIcon, setShowLoadingIcon] = React.useState<boolean>(false);

    const checkFullField = () => {
        return isValidEmail(email);
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleNextStep();
        }
    }

    const redirectLoginPage = () => {
        navigate("/login");
    }

    const handleNextStep = async () => {
        if (isValidEmail(email)) {
            let check = await checkEmailWebsiteUserExist(email);
            if (check) {
                if (check.EC === 0) {
                    setShowLoadingIcon(true);
                    let result = await sendOTPChangePassword(email);
                    if (result && result.EC === 0) {
                        setTimeout(() => {
                            setShowLoadingIcon(false);
                            setStep(step + 1);
                        }, 2000);
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
            <div className="reset-form__title text-black text-xl mb-2 text-center font-medium">Quên mật khẩu ?</div>
            <div className='text-center text-sm text-gray-400 mb-5'>Chúng tôi sẽ hướng dẫn bạn khôi phục mật khẩu</div>
            <div className="reset-form__main flex flex-col gap-2">
                <div className='w-full'>
                    <div className='input_label'>Email</div>
                    <input type="text" className="form_input" placeholder='Nhập email của bạn' value={email} onChange={(e) => setEmail(e.target.value)} onKeyPress={(event) => handleKeyPress(event)} />
                </div>
                <div className='mt-6 w-full'>
                    <Button styles={(checkFullField() && !showLoadingIcon) ? 'form_button_valid' : 'form_button'} OnClick={() => handleNextStep()}>
                        {showLoadingIcon ? <FaSpinner className='animate-spin' /> : "Tiếp tục"}
                    </Button>
                </div>

                <div className='flex items-center justify-center gap-1 mt-4 text-black hover:text-orange-400'>
                    <IoArrowBackOutline />
                    <span className='ml-1 cursor-pointer hover:underline' onClick={() => redirectLoginPage()}>Trở lại đăng nhập</span>
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
        if (resendCodeTime === 0) {
            setResendCodeTime(RESEND_CODE_TIME);
            let result = await sendOTPChangePassword(email);
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
            let result = await verifyOTPUserChangePasswordSignUp(email, fullOTP);
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

const ChangeNewPassword = (props: IChangePasswordStage) => {

    const { setStep, step, email } = props;

    const [newPassword, setNewPassword] = React.useState<string>("");
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");
    const [showLoadingIcon, setShowLoadingIcon] = React.useState<boolean>(false);

    const checkPassword = () => {
        return confirmPassword === newPassword && newPassword.length >= 8;
    }

    const handleChangePassword = async () => {
        if (confirmPassword !== newPassword) {
            return;
        }

        if (newPassword.length < 8) {
            return;
        }

        setShowLoadingIcon(true);

        let result = await userChangePassword({
            email: email,
            password: newPassword
        });

        if (result) {
            if (result.EC === 0) {
                setTimeout(() => {
                    setShowLoadingIcon(false);
                    setStep(step + 1);
                }, 1000);
            } else {
                setShowLoadingIcon(false);
                errorToast1(result.EM);
                return;
            }
        }
        return;
    }

    return (
        <>
            <div className="reset-form__title text-black text-xl mb-6 text-center font-medium">Thiết lập mật khẩu mới</div>
            <div className="reset-form__main flex flex-col gap-2">
                <div className='w-full'>
                    <div className='input_label'>Mật khẩu mới</div>
                    <input type="password" className="form_input" placeholder='' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <div className='my-2 text-sm text-gray-400 flex items-center gap-x-1'><IoAlertCircleOutline className='w-4 h-4' /> Mật khẩu tối thiểu 8 ký tự</div>
                </div>
                <div className='w-full'>
                    <div className='input_label'>Xác nhận mật khẩu mới</div>
                    <input type="password" className="form_input" placeholder='' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className='mt-6 w-full'>
                    <Button styles={(checkPassword() && !showLoadingIcon) ? 'form_button_valid' : 'form_button'} OnClick={() => handleChangePassword()}>
                        {showLoadingIcon ? <FaSpinner className='animate-spin' /> : "Xác nhận"}
                    </Button>
                </div>
            </div>
        </>
    )
}

const SuccessAnnouncement = () => {

    const navigate = useNavigate();

    React.useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    return (
        <>
            <div className="announcement__title text-black text-xl mb-8 text-center">Thiết lập mật khẩu mới thành công</div>
            <div className="announcement__main flex flex-col gap-y-1 duration-800">
                <div className="w-full flex item-center justify-center"><FaRegCircleCheck className="w-12 h-12 text-[#6acd03]" /></div>
                <div className="text-sm text-center mt-4">Mật khẩu của bạn đã thay đổi thành công</div>
                <div className="text-sm text-center mb-6">Vui lòng trở lại trang đăng nhập</div>
                <Button styles={'form_button_valid'} OnClick={() => navigate("/login")}>Đăng nhập</Button>
            </div>
        </>
    )
}

const ForgotPasswordPage = () => {

    const [email, setEmail] = React.useState<string>("");

    const [changeStep, setChangeStep] = React.useState(1);

    React.useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className='reset-password-container'>
            <div className="flex justify-center py-20 px-3 bg-[#EEEEEE]">
                <div className="reset-form rounded-[4px] w-[26rem] bg-white p-8 shadow-xl">
                    {
                        changeStep === 1 &&
                        <EnterEmailRegister step={changeStep} setStep={setChangeStep} email={email} setEmail={setEmail} />
                    }
                    {
                        changeStep === 2 &&
                        <EmailVertification step={changeStep} setStep={setChangeStep} email={email} />
                    }
                    {
                        changeStep === 3 &&
                        <ChangeNewPassword step={changeStep} setStep={setChangeStep} email={email} />
                    }
                    {
                        changeStep === 4 &&
                        <SuccessAnnouncement />
                    }
                </div>
            </div>

        </div>
    )
}

export default ForgotPasswordPage;