import Button from "@/components/Button";
import { FieldDropdown } from "@/components/Dropdown";
import { errorToast1, successToast1 } from "@/components/Toast/Toast";
import { RootState } from "@/redux/reducer/rootReducer";
import { getSellerInfo, updateSellerInfo } from "@/services/sellerService";
import { getDayMonthYear, getRangeOfDays, getRangeOfMonths, getRangeOfYears, isValidDate } from "@/utils/dateFormat";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
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
    image: string
}

interface ISellerInfoFetch {
    id: number
    name: string
    mobile: string
    gender: number
    email: string
    birth: Date
    image: string
}

const FILE_UPLOAD_SIZE_MAX = 2 * 1024 * 1024; // 2MB

const IMAGE_FILE_TYPE_ALLOW = ["image/jpeg", "image/png", "image/jpg"];

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

    const [updateInfo, setUpdateInfo] = React.useState<boolean>(false);

    const [sellerImage, setSellerImage] = React.useState<string>("");
    const [imageFile, setImageFile] = React.useState(null);

    const [error, setError] = React.useState<boolean>(false);

    const [sellerInfo, setSellerInfo] = useImmer<ISellerInfo>({
        id: 0,
        name: "",
        mobile: "",
        gender: 0,
        email: "",
        image: ""
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
            birth: new_birth,
            image: imageFile ? imageFile : null
        }

        setUpdateInfo(true);

        let result: APIResponse = await updateSellerInfo(updateData);
        if (result) {
            if (result.EC === 0) {

                setTimeout(() => {
                    setUpdateInfo(false);
                    successToast1(result.EM);
                }, 1000);

                setTimeout(() => {
                    setUpdateInfo(false);
                    setDataLoading(true);
                }, 1500);

                setTimeout(() => {
                    fetchSellerInfo();
                    setDataLoading(false);
                }, 2000);
            } else {
                errorToast1("Cập nhật thông tin thất bại");
                setUpdateInfo(false);
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
                    draft.image = result.image;
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

    const handleUploadImage = (event: any) => {
        let image = event.target.files[0];

        if (image) {
            if (!IMAGE_FILE_TYPE_ALLOW.includes(image.type)) {
                errorToast1("Ảnh không đúng định dạng !");
                return;
            }
            if (image.size > FILE_UPLOAD_SIZE_MAX) {
                errorToast1("Dung lượng ảnh quá lớn !");
                return;
            }
            else {
                setSellerImage(URL.createObjectURL(image));
                setImageFile(image);
            }
        }
    }

    const handleClearImage = () => {
        setSellerImage("");
        setImageFile(null);
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
        <>
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
                                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center relative group">

                                        {/* <img src={img_url} alt='' className={img_style} /> */}
                                        {
                                            (!error && sellerImage === "") &&
                                            <img
                                                src={sellerInfo.image}
                                                alt=''
                                                className="w-full h-full rounded-full"
                                                onError={() => setError(true)}
                                            />
                                        }
                                        {
                                            (error || sellerImage !== "") &&
                                            <>
                                                {
                                                    sellerImage === "" ?
                                                        <AiOutlineUser className="w-14 h-14 text-gray-400" />
                                                        :
                                                        <img src={sellerImage} className="w-full h-full rounded-full" />
                                                }
                                            </>
                                        }
                                        <div className="cursor-pointer bg-black opacity-20 w-full h-full absolute rounded-full hidden group-hover:flex items-center justify-center" onClick={() => handleClearImage()}>
                                            <span className="text-white text-sm">Xóa ảnh</span>
                                        </div>
                                        <input
                                            type="file"
                                            id="shop-image"
                                            hidden
                                            onChange={(event) => handleUploadImage(event)}
                                        />
                                    </div>
                                    <label htmlFor="shop-image" className="border border-gray-200 px-5 py-2 hover:bg-gray-100 cursor-pointer transition-all duration-200">
                                        <span>Chọn ảnh</span>
                                    </label>

                                    <div className="flex flex-col items-center justify-center text-sm">
                                        <div className="text-gray-400">Dung lượng tối đa 2 MB</div>
                                        <div className="text-gray-400">Định dạng ảnh: JPG,PNG,JPEG</div>
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </div>
            {
                updateInfo &&
                <div className="absolute w-full h-full bg-black opacity-30 z-[100] inset-0 flex items-center justify-center">
                    <RotatingLines
                        width="80"
                        strokeWidth="5"
                        strokeColor="white"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        visible={true}
                    />
                </div>
            }
        </>
    )
}

export default SellerProfile;