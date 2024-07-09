import Button from "@/components/Button";
import React from "react";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import { useImmer } from "use-immer";
import { IoImageOutline } from "react-icons/io5";
import { errorToast1, successToast1 } from "@/components/Toast/Toast";
import { getShopInfo, updateShopInfo } from "@/services/sellerService";
import { APIResponse } from "@/services/common";

const TEXT_DESCRIPTION_MAX = 500;

const FILE_UPLOAD_SIZE_MAX = 2 * 1024 * 1024; // 2MB

const IMAGE_FILE_TYPE_ALLOW = ["image/jpeg", "image/png", "image/jpg"];

interface IShopInfo {
    id: number
    shopName: string
    intro: string
    image: string
}

const ShopInfo = () => {

    const [dataLoading, setDataLoading] = React.useState<boolean>(true);

    const [textCount, setTextCount] = React.useState<number>(0);
    const [shopImage, setShopImage] = React.useState<string>("");
    const [imageFile, setImageFile] = React.useState(null);

    const [error, setError] = React.useState<boolean>(false);

    const [updateInfo, setUpdateInfo] = React.useState<boolean>(false);

    const [shopInfo, setShopInfo] = useImmer<IShopInfo>({
        id: 0,
        shopName: "",
        intro: "",
        image: ""
    });

    const handleUploadImage = (image: any) => {
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
                setShopImage(URL.createObjectURL(image));
                setImageFile(image);
            }
        }
    }

    const handleOnChangeShopInfo = (field: string, value: any) => {

        if (field === "intro") {
            if (value.length > TEXT_DESCRIPTION_MAX) {
                return;
            }

            setShopInfo(draft => {
                draft[field] = value;
            });
            setTextCount(value.length);
        }

        setShopInfo(draft => {
            draft[field] = value;
        });
    }

    const fetchShopInfo = async () => {
        let result: IShopInfo | null = await getShopInfo();
        if (result) {
            setShopInfo(draft => {
                draft.id = result.id;
                draft.shopName = result.shopName;
                draft.intro = result.intro;
                draft.image = result.image;
            });

            setTextCount(result.intro.length);
        }
    }

    const handleUpdateShopInfo = async () => {
        if (shopInfo.shopName.length === 0) {
            errorToast1("Vui lòng nhập tên Shop");
            return;
        }

        let updateData = {
            shopName: shopInfo.shopName,
            intro: shopInfo.intro,
            image: imageFile ? imageFile : null
        }

        setUpdateInfo(true);

        let result: APIResponse = await updateShopInfo(updateData);
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
                    fetchShopInfo();
                    setDataLoading(false);
                }, 2000);
            } else {
                errorToast1("Không thể cập nhật thông tin");
                setUpdateInfo(false);
                return;
            }
        }
    }

    React.useEffect(() => {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }

        fetchShopInfo();

        setTimeout(() => {
            setDataLoading(false);
        }, 500);

    }, []);

    return (
        <>
            <div className="shop-info-container">
                <div className="shop-info__title pb-5 border-b border-gray-300">
                    <div className="title text-xl">Thông tin Shop</div>
                </div>
                <div className="shop-info__main p-6">
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
                            <div className="customer-info w-full">
                                <div className='w-4/5 mb-6 flex items-center'>
                                    <div className='input_label w-1/4 text-end pr-8'>Tên Shop</div>
                                    <div className='w-3/4'>
                                        <input type="text" placeholder="Nhập tên shop" className="form_input" value={shopInfo.shopName} onChange={(e) => handleOnChangeShopInfo('shopName', e.target.value)} />
                                    </div>
                                </div>
                                <div className='w-4/5 mb-6 flex items-center'>
                                    <div className='input_label w-1/4 text-end pr-8'>Logo của Shop</div>
                                    <div className='w-3/4'>
                                        <div className="flex items-center gap-x-6">
                                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer relative group">
                                                {
                                                    (!error && shopImage === "") &&
                                                    <img
                                                        src={shopInfo.image}
                                                        alt=''
                                                        className="w-full h-full rounded-full"
                                                        onError={() => setError(true)}
                                                    />
                                                }
                                                {
                                                    (error || shopImage !== "") &&
                                                    <>
                                                        {
                                                            shopImage === "" ?
                                                                <IoImageOutline className="w-14 h-14 text-gray-300" />
                                                                :
                                                                <img src={shopImage} className="w-full h-full rounded-full" />
                                                        }
                                                    </>
                                                }
                                                <label htmlFor="shop-image" className="cursor-pointer bg-black opacity-20 w-full h-full absolute rounded-full hidden group-hover:flex items-center justify-center">
                                                    <span className="text-white text-xl">Sửa</span>
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="file"
                                                    id="shop-image"
                                                    hidden
                                                    onChange={(event) => handleUploadImage(event.target && event.target.files ? event.target?.files[0] : null)}
                                                />
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                <ul className="list-decimal">
                                                    <li>Kích thước ảnh tiêu chuẩn: Chiều rộng 300px, Chiều cao 300px</li>
                                                    <li>Dung lượng tối đa: 2MB</li>
                                                    <li>Định dạng file được hỗ trợ: JPG,JPEG,PNG</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-4/5 flex'>
                                    <div className='input_label w-1/4 text-end pr-8'>Mô tả Shop</div>
                                    <div className='w-3/4'>
                                        <textarea
                                            value={shopInfo.intro}
                                            onChange={(e) => handleOnChangeShopInfo('intro', e.target.value)}
                                            className="rounded-[4px] px-4 py-3 text-sm border border-gray-300 w-full focus:border-black h-40 outline-none"
                                            placeholder="Nhập mô tả shop"
                                        />
                                        <div className="text-end">
                                            <span className="text-gray-400">{textCount}/{TEXT_DESCRIPTION_MAX}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-4/5 flex items-center">
                                    <div className="w-1/4"></div>
                                    <div className="w-2/4 flex items-center gap-x-2">
                                        <Button styles="w-1/3 bg-[#FCB800] h-10 hover:opacity-80 cursor-pointer rounded" OnClick={() => handleUpdateShopInfo()}>Lưu</Button>
                                    </div>
                                </div>
                            </div>
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

export default ShopInfo;