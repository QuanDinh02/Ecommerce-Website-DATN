import Button from "@/components/Button"
import { useImmer } from "use-immer"
import { BiSave } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { errorToast1, successToast1 } from "@/components/Toast/Toast";
import { createNewShippingUnit } from "@/services/adminService";

interface INewShippingUnit {
    nameUnit: string
    address: string
    mobile: string
    description: string
}

interface INewAccount {
    username: string
    password: string
}

const requiredField = () => {
    return (
        <span className="text-red-500">(*)</span>
    )
}

const SUAddNew = () => {

    const navigate = useNavigate();

    const [newSU, setNewSU] = useImmer<INewShippingUnit>({
        nameUnit: "",
        address: "",
        mobile: "",
        description: ""
    });

    const [newSUAccount, setNewSUAccount] = useImmer<INewAccount>({
        username: "",
        password: ""
    });

    const handleOnChange = (field: string, value: string) => {
        setNewSU(draft => {
            draft[field] = value;
        });
    }

    const handleAccountOnChange = (field: string, value: string) => {
        setNewSUAccount(draft => {
            draft[field] = value;
        });
    }

    const refreshNewForm = () => {
        setNewSU({
            nameUnit: "",
            address: "",
            mobile: "",
            description: ""
        });

        setNewSUAccount({
            username: "",
            password: ""
        });
    }

    const handleCreateSU = async () => {

        if (newSU.nameUnit.length === 0) {
            errorToast1("Vui lòng nhập tên đơn vị !");
            return;
        }

        if (newSU.mobile.length === 0) {
            errorToast1("Vui lòng nhập SĐT đơn vị !");
            return;
        }

        if (newSU.address.length === 0) {
            errorToast1("Vui lòng nhập địa chỉ đơn vị !");
            return;
        }

        if (newSUAccount.username.length === 0) {
            errorToast1("Vui lòng nhập tài khoản đơn vị !");
            return;
        }

        if (newSUAccount.password.length === 0) {
            errorToast1("Vui lòng nhập mật khẩu tài khoản đơn vị");
            return;
        }

        if (newSU.mobile.length < 10 || newSU.mobile.length > 11) {
            errorToast1("Số điện thoại không hợp lệ !");
            return;
        }

        let result = await createNewShippingUnit({
            nameUnit: newSU.nameUnit,
            address: newSU.address,
            mobile: newSU.mobile,
            description: newSU.description,
            username: newSUAccount.username,
            password: newSUAccount.password
        });

        if (result) {
            if (result.EC === 0) {
                successToast1(result.EM);
                setTimeout(() => {
                    refreshNewForm();
                }, 1000);
            } else {
                errorToast1(result.EM);
                return;
            }
        }
    }

    return (
        <div className="py-4 px-5 bg-white">
            <div className="text-xl w-1/3 mb-8">Đơn vị vận chuyển mới </div>
            <div className="text-lg mb-4">Thông tin đơn vị vận chuyển</div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
                <div>
                    <div className='input_label font-medium'>Tên đơn vị vận chuyển {requiredField()}</div>
                    <input type="text" className="form_input" onChange={(e) => handleOnChange('nameUnit', e.target.value)} value={newSU.nameUnit} placeholder="Nhập tên đơn vị vận chuyển" />
                </div>
                <div>
                    <div className='input_label font-medium'>Số điện thoại {requiredField()} <span className="text-sm text-gray-400">(10 hoặc 11 số)</span></div>
                    <input type="text" className="form_input" onChange={(e) => handleOnChange('mobile', e.target.value)} value={newSU.mobile} placeholder="Nhập số điện thoại đơn vị vận chuyển" />
                </div>
                <div>
                    <div className='input_label font-medium'>Địa chỉ {requiredField()}</div>
                    <input type="text" className="form_input" onChange={(e) => handleOnChange('address', e.target.value)} value={newSU.address} placeholder="Nhập địa chỉ đơn vị vận chuyển" />
                </div>
                <div>
                    <div className='input_label font-medium'>Mô tả đơn vị</div>
                    <input type="text" className="form_input" onChange={(e) => handleOnChange('description', e.target.value)} value={newSU.description} placeholder="Nhập mô tả đơn vị vận chuyển" />
                </div>
            </div>
            <div className="text-lg mb-4">Thông tin tài khoản</div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6">
                <div>
                    <div className='input_label font-medium'>Tài khoản {requiredField()}</div>
                    <input type="text" className="form_input" onChange={(e) => handleAccountOnChange('username', e.target.value)} value={newSUAccount.username} placeholder="Nhập tên tài khoản" />
                </div>
                <div>
                    <div className='input_label font-medium'>Mật khẩu {requiredField()}</div>
                    <input type="password" className="form_input" onChange={(e) => handleAccountOnChange('password', e.target.value)} value={newSUAccount.password} placeholder="Nhập mật khẩu" />
                </div>
            </div>
            <div className="flex items-center justify-end gap-x-2">
                <Button styles="px-6 py-2 rounded hover:bg-gray-200 w-fit flex items-center justify-center gap-x-1" OnClick={() => { navigate("/fms/admin/partner/shipping_unit"); }}>Hủy</Button>
                <Button styles="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 w-fit flex items-center justify-center gap-x-1" OnClick={() => handleCreateSU()}><BiSave /> Lưu</Button>
            </div>
        </div>
    )
}

export default SUAddNew;