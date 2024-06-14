import Button from "@/components/Button";
import { FieldDropdown } from "@/components/Dropdown";
import { errorToast1, successToast1 } from "@/components/Toast/Toast";
import { RootState } from "@/redux/reducer/rootReducer";
import { getSellerInfo, updateSellerInfo } from "@/services/sellerService";
import { getDayMonthYear, getRangeOfDays, getRangeOfMonths, getRangeOfYears, isValidDate } from "@/utils/dateFormat";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useImmer } from "use-immer";
import _ from 'lodash';
import { APIResponse } from "@/services/common";
interface IDate {
    day: number
    month: number
    year: number
}

interface IAccount {
    seller_id: number
    username: string
    role: string
}

interface ISellerInfo {
    id: number
    name: string
    mobile: string
    gender: number
    email: string
}

interface ISellerInfoFetch {
    id: number
    name: string
    mobile: string
    gender: number
    email: string
    birth: Date
}
const GENDERS = [
    {
        title: "Nam",
        value: 1
    },
    {
        title: "Nữ",
        value: 0
    },
    {
        title: "Khác",
        value: 2
    }
]

const DAYS = getRangeOfDays();
const MONTHS = getRangeOfMonths();
const YEARS = getRangeOfYears(1900);

const SellerProfile = () => {

    const account: IAccount = useSelector<RootState, IAccount>(state => state.user.account);
    const [dataLoading, setDataLoading] = React.useState<boolean>(true);

    const [sellerInfo, setSellerInfo] = useImmer<ISellerInfo>({
        id: 0,
        name: "",
        mobile: "",
        gender: 0,
        email: ""
    });

    const [date, setDate] = useImmer<IDate>({
        day: 1,
        month: 1,
        year: 2024
    });

    const handleDateSelect = (field: string, value: number) => {
        setDate(draft => {
            draft[field] = value;
        })
    }

    const handleOnChangeSellerInfo = (field: string, value: any) => {
        setSellerInfo(draft => {
            draft[field] = value;
        })
    }

    const handleUpdateSellerInfo = async () => {
        if (sellerInfo.name.length === 0) {
            errorToast1("Họ tên không hợp lệ");
            return;
        }

        if (sellerInfo.mobile.length < 10) {
            errorToast1("Số điện thoại không hợp lệ");
            return;
        }

        if (!isValidDate(date.day, date.month, date.year)) {
            errorToast1("Ngày tháng năm sinh không hợp lệ");
            return;
        }

        let new_birth = new Date();

        new_birth.setDate(date.day);
        new_birth.setMonth(date.month - 1);
        new_birth.setFullYear(date.year);

        let updateData = {
            name: sellerInfo.name,
            mobile: sellerInfo.mobile,
            gender: sellerInfo.gender,
            birth: new_birth
        }

        let result: APIResponse = await updateSellerInfo(updateData);
        if (result) {
            if (result.EC === 0) {
                successToast1(result.EM);

                setTimeout(() => {
                    setDataLoading(true);
                }, 1000);

                setTimeout(() => {
                    fetchSellerInfo();
                    setDataLoading(false);
                }, 2000);
            } else {
                errorToast1("Cập nhật thông tin thất bại");
                return;
            }
        }
    }

    const fetchSellerInfo = async () => {
        if (!_.isEmpty(account)) {
            let result: ISellerInfoFetch = await getSellerInfo();
            if (result) {
                setSellerInfo(draft => {
                    draft.id = result.id;
                    draft.name = result.name;
                    draft.mobile = result.mobile;
                    draft.gender = result.gender;
                    draft.email = result.email;
                });

                let { day: DAY, month: MONTH, year: YEAR } = getDayMonthYear(`${result.birth}`);

                setDate(draft => {
                    draft.day = +DAY;
                    draft.month = +MONTH + 1;
                    draft.year = +YEAR;
                })
            }
        }
    }

    React.useEffect(() => {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }

        fetchSellerInfo();

        setTimeout(() => {
            setDataLoading(false);
        }, 500);

    }, []);

    return (
        <div className="seller-account">
            <div className="seller-account__title pb-5 border-b border-gray-300">
                <div className="title text-xl mb-2">Thông tin tài khoản</div>
                <div className="sub-title text-gray-500">Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
            </div>
            <div className="seller-account__main p-6 flex">
                {
                    dataLoading ?
                        <div className="flex items-center justify-center w-full h-screen">
                            <ThreeDots
                                height="80"
                                width="80"
                                color="#FCB800"
                                ariaLabel="three-dots-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass="flex items-center justify-center tail-spin"
                                visible={true}
                            />
                        </div>
                        :
                        <>
                            <div className="customer-info w-2/3">
                                <div className="w-4/5 mb-6 flex items-center">
                                    <div className="title w-1/4 text-end pr-8">Tên đăng nhập</div>
                                    <div className="username font-medium w-3/4">{account.username}</div>
                                </div>
                                <div className='w-4/5 mb-6 flex items-center'>
                                    <div className='input_label w-1/4 text-end pr-8'>Họ Tên</div>
                                    <div className='w-3/4'>
                                        <input type="text" placeholder="Họ Tên" className="form_input" value={sellerInfo.name} onChange={(e) => handleOnChangeSellerInfo('name', e.target.value)} />
                                    </div>
                                </div>
                                <div className='w-4/5 mb-6 flex items-center'>
                                    <div className='input_label w-1/4 text-end pr-8'>Số điện thoại</div>
                                    <div className='w-3/4'>
                                        <input type="text" placeholder="Số điện thoại" className="form_input" value={sellerInfo.mobile} onChange={(e) => handleOnChangeSellerInfo('mobile', e.target.value)} />
                                    </div>
                                </div>
                                <div className='w-4/5 mb-6 flex items-center'>
                                    <div className='input_label w-1/4 text-end pr-8'>Email</div>
                                    <div className='w-3/4'>
                                        <input type="text" placeholder="Email" className="form_input cursor-not-allowed" disabled value={sellerInfo.email} />
                                    </div>
                                </div>
                                <div className='w-4/5 mb-6 flex items-center'>
                                    <div className='title w-1/4 text-end pr-8'>Giới tính</div>
                                    <div className='w-3/4'>
                                        <div className="flex gap-x-4">
                                            {
                                                GENDERS.map((item, index) => {
                                                    return (
                                                        <div className='flex items-center gap-2 mb-2 cursor-pointer w-fit' key={`gender-select-${index}`} onClick={() => handleOnChangeSellerInfo('gender', item.value)}>
                                                            <div className={sellerInfo.gender === item.value ? 'w-5 h-5 border-2 border-[#FCB800] rounded-full flex items-center justify-center' : 'w-5 h-5 border-2 border-gray-300 rounded-full'}>
                                                                <div className={sellerInfo.gender === item.value ? 'w-3 h-3 bg-[#FCB800] rounded-full' : ""}></div>
                                                            </div>
                                                            <div>{item.title}</div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='w-4/5 mb-6 flex items-center'>
                                    <div className='input_label w-1/4 text-end pr-8'>Ngày sinh</div>
                                    <div className='w-3/4'>
                                        <div className="w-2/3 flex gap-x-2">
                                            <FieldDropdown key="select-day" style={"border h-10 w-1/3"} data={DAYS} value={date.day} setValue={handleDateSelect} field="day" />
                                            <FieldDropdown key="select-month" style={"border h-10 w-1/3"} data={MONTHS} value={date.month} setValue={handleDateSelect} field="month" />
                                            <FieldDropdown key="select-year" style={"border h-10 w-1/3"} data={YEARS} value={date.year} setValue={handleDateSelect} field="year" />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-4/5 flex items-center">
                                    <div className="w-1/4"></div>
                                    <div className="w-2/4">
                                        <Button styles="w-1/3 bg-[#FCB800] h-10 hover:opacity-80 cursor-pointer rounded" OnClick={() => handleUpdateSellerInfo()}>Lưu</Button>
                                    </div>
                                </div>
                            </div>
                            <div className="customer-image w-1/3 flex flex-col items-center gap-y-2 border-l border-gray-100">
                                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                                    <AiOutlineUser className="w-14 h-14 text-gray-400" />
                                </div>
                                <Button styles="border border-gray-200 px-5 py-2 hover:bg-gray-100">Chọn ảnh</Button>
                                <div className="flex flex-col items-center justify-center">
                                    <div className="text-gray-400">Dung lượng tối đa 1 MB</div>
                                    <div className="text-gray-400">Định dạng ảnh: .JPED, .PNG</div>
                                </div>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}

export default SellerProfile;