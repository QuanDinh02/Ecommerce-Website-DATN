import Button from "@/components/Button";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const GENDERS = [
    {
        title: "Nam",
        value: 0
    },
    {
        title: "Nữ",
        value: 1
    },
    {
        title: "Khác",
        value: 2
    }
]

const DAYS = [1, 2, 3, 4, 5];
const MONTHS = [1, 2, 3, 4, 5];
const YEARS = [2024, 2023, 2022, 2021, 2020];

const Dropdown = ({ data, style }) => {

    const [value, setValue] = React.useState<number>(0);
    const [showDropdown, setShowDropdown] = React.useState<boolean>(false);

    React.useEffect(() => {
        setValue(data[0]);
    }, []);

    return (
        <div className={`dropdown-container ${style} flex items-center relative cursor-pointer`} onClick={() => setShowDropdown(!showDropdown)}>
            <div className="w-full px-2">{value}</div>
            {
                showDropdown ?
                    <>
                        <MdOutlineKeyboardArrowDown className="absolute right-1 top-2 w-6 h-6 text-gray-500 rotate-180 " />
                        <div className="w-full h-40 bg-white border border-gray-200 absolute top-10 overflow-y-auto">
                            {data && data.length > 0 &&
                                data.map(item => {
                                    return (
                                        <div className="w-full h-10 p-2 cursor-pointer hover:bg-gray-100" key={`select-item-${item}`} onClick={() => setValue(item)}>
                                            {item}
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </>
                    :
                    <MdOutlineKeyboardArrowDown className="absolute right-1 top-2 w-6 h-6 text-gray-500" />
            }
        </div>
    )
}

const CustomerAccountInfo = () => {

    const [gender, setGender] = React.useState<number>(0);

    return (
        <div className="customer-account">
            <div className="customer-account__title pb-5 border-b border-gray-300">
                <div className="title text-xl mb-2">Thông tin tài khoản</div>
                <div className="sub-title text-gray-500">Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
            </div>
            <div className="customer-account__main p-5 flex">
                <div className="customer-info w-1/2">
                    <div className="mb-5">
                        <div className="title mb-1">Tên đăng nhập</div>
                        <div className="username">minhnhutleader</div>
                    </div>
                    <div className='w-4/5 mb-5'>
                        <div className='input_label'>Họ Tên</div>
                        <div className='relative'>
                            <input type="text" placeholder="Họ Tên" className="form_input" />
                        </div>
                    </div>
                    <div className='w-4/5 mb-5'>
                        <div className='input_label'>Số điện thoại</div>
                        <div className='relative'>
                            <input type="text" placeholder="Số điện thoại" className="form_input" />
                        </div>
                    </div>
                    <div className="mb-5">
                        <div className="title mb-1">Giới tính</div>
                        <div className="flex gap-x-4">
                            {
                                GENDERS.map((item, index) => {
                                    return (
                                        <div className='flex items-center gap-2 mb-2 cursor-pointer w-fit' key={`gender-${item.value}`} onClick={() => setGender(item.value)}>
                                            <div className={gender === item.value ? 'w-5 h-5 border-2 border-[#FCB800] rounded-full flex items-center justify-center' : 'w-5 h-5 border-2 border-gray-300 rounded-full'}>
                                                <div className={gender === item.value ? 'w-3 h-3 bg-[#FCB800] rounded-full' : ""}></div>
                                            </div>
                                            <div>{item.title}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="w-4/5 mb-6">
                        <div className="title mb-1">Ngày sinh</div>
                        <div className="w-full flex gap-x-2">
                            <Dropdown style={"border h-10 w-1/3"} data={DAYS} />
                            <Dropdown style={"border h-10 w-1/3"} data={MONTHS} />
                            <Dropdown style={"border h-10 w-1/3"} data={YEARS} />
                        </div>
                    </div>
                    <div className="w-4/5">
                        <Button styles="w-1/3 bg-[#FCB800] h-10 hover:opacity-80">Lưu</Button>
                    </div>

                </div>
                <div className="customer-image w-1/2 flex flex-col items-center justify-center gap-y-2 border-l border-gray-200">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                        <AiOutlineUser className="w-14 h-14 text-gray-400" />
                    </div>
                    <Button styles="border border-gray-200 px-5 py-2 hover:bg-gray-100">Chọn ảnh</Button>
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-gray-400">Dung lượng tối đa 1 MB</div>
                        <div className="text-gray-400">Định dạng ảnh: .JPED, .PNG</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerAccountInfo;