import Button from "@/components/Button";
import React from 'react';
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";

const Password = ({ style, label, value, onChange }) => {

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
                    <div className='absolute top-3 right-2 ' onClick={() => setShowPassword(!showPassword)}>
                        {!showPassword ? <PiEyeSlash className="w-5 h-5 text-xl text-gray-500 cursor-pointer" /> : <PiEyeLight className="w-5 h-5 text-xl cursor-pointer" />}
                    </div>
                </div>
            </div>
        </div>
    )
}

const PasswordModification = () => {

    const [oldPassword, setOldPassword] = React.useState<string>("");
    const [newPassword, setNewPassword] = React.useState<string>("");
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");

    return (
        <div className="password-container">
            <div className="customer-password__title pb-5 border-b border-gray-300">
                <div className="title text-xl mb-2">Đổi mật khẩu</div>
                <div className="sub-title text-gray-500">Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</div>
            </div>
            <div className="customer-password__main p-5 flex">
                <div className="w-1/2">
                    <Password style="mb-3 w-4/5" label={"Mật khẩu cũ"} value={oldPassword} onChange={setOldPassword} />
                    <Password style="mb-3 w-4/5" label={"Mật khẩu mới"} value={newPassword} onChange={setNewPassword} />
                    <Password style="w-4/5" label={"Xác nhận mật khẩu"} value={confirmPassword} onChange={setConfirmPassword} />
                    <div className="w-4/5 mt-6">
                        <Button styles="w-1/3 bg-[#FCB800] h-10 hover:opacity-80 font-medium">Xác nhận</Button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PasswordModification;