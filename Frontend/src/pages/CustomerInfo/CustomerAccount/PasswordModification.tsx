import Button from "@/components/Button";
import React from 'react';
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import { updateCustomerPassword } from "@/services/customerService";
import { errorToast1, successToast1 } from "@/components/Toast/Toast";
import { IoAlertCircleOutline } from "react-icons/io5";
import { userLogout } from "@/services/userService";

const Password = ({ style, label, value, onChange, hide }) => {

    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const hanldeOnChange = (value: string) => {
        onChange(value);
    }

    return (
        <div className={style}>
            <div className='w-full'>
                <div className='input_label'>{label}</div>
                <div className='relative'>
                    <input type={showPassword ? "text" : "password"} className="form_input" value={value} onChange={(e) => hanldeOnChange(e.target.value)} />
                    {!hide &&
                        <div className='absolute top-3 right-2 ' onClick={() => setShowPassword(!showPassword)}>
                            {!showPassword ? <PiEyeSlash className="w-5 h-5 text-xl text-gray-500 cursor-pointer" /> : <PiEyeLight className="w-5 h-5 text-xl cursor-pointer" />}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

const PasswordModification = () => {

    const [oldPassword, setOldPassword] = React.useState<string>("");
    const [newPassword, setNewPassword] = React.useState<string>("");
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");

    const [errorPass, setErrorPass] = React.useState<boolean>(false);
    const [errorPassField, setErrorPassField] = React.useState<number>(0);

    const handleChangePassword = async () => {
        let result = await updateCustomerPassword({
            old_password: oldPassword,
            new_password: newPassword
        });

        // if (newPassword.length < 8) {
        //     setErrorPass(true);
        //     setErrorPassField(1);
        //     return;
        // }

        if (confirmPassword !== newPassword) {
            setErrorPassField(2);
            return;
        }

        setErrorPassField(0);

        if (result) {
            if (result.EC === 0) {
                successToast1(result.EM);
                setTimeout(() => {
                    handleUserLogout();
                },1500);
            }
            else {
                errorToast1(result.EM);
                return;
            }
        }
    }

    const handleUserLogout = async () => {
        let result: any = await userLogout();
        if (result && result.EC === 0) {
            window.location.reload();
        }
    }

    return (
        <div className="password-container">
            <div className="customer-password__title pb-5 border-b border-gray-300">
                <div className="title text-xl mb-2">Đổi mật khẩu</div>
                <div className="sub-title text-gray-500">Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</div>
            </div>
            <div className="customer-password__main p-5 flex">
                <div className="w-1/2">
                    <Password style="mb-3 w-4/5" label={"Mật khẩu cũ"} value={oldPassword} onChange={setOldPassword} hide={false} />
                    <Password style="mb-3 w-4/5" label={"Mật khẩu mới"} value={newPassword} onChange={setNewPassword} hide={false} />
                    {/* {!errorPass && <div className='mb-3 text-sm text-gray-400 flex items-center gap-x-1'><IoAlertCircleOutline className='w-4 h-4' /> Mật khẩu tối thiểu 8 ký tự</div>} */}
                    {/* {errorPassField === 1 && <div className='my-2 text-sm text-red-500 flex items-center gap-x-1'>Mật khẩu tối thiểu 8 ký tự</div>} */}
                    <Password style="w-4/5" label={"Xác nhận mật khẩu mới"} value={confirmPassword} onChange={setConfirmPassword} hide={true} />
                    {errorPassField === 2 && <div className='my-2 text-sm text-red-500'>Xác nhận mật khẩu không đúng</div>}
                    <div className="w-4/5 mt-6">
                        <Button styles="w-1/3 bg-[#FCB800] h-10 hover:opacity-80 font-medium" OnClick={() => handleChangePassword()}>Xác nhận</Button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PasswordModification;