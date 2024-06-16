import Button from "@/components/Button";
import FloatingInput from "@/components/Floating/FloatingInput";
import FloatingTextarea from "@/components/Floating/FloatingTextarea";
import Modal from "@/components/Modal";
import classNames from "classnames";
import React from "react";
import { FaCheck } from "react-icons/fa6";
import { HiOutlinePlus } from "react-icons/hi";
import { 
    getCustomerAddress, updateDefaultAddress, 
    createNewAddress, removeCustomerAddress,
    updateAddress
} from "@/services/customerService";
import { errorToast1, successToast1 } from "@/components/Toast/Toast";
import { ThreeDots } from "react-loader-spinner";
import FloatingInputSelectLocation from "@/components/Floating/FloatingInputSelectLocation";
import { useImmer } from "use-immer";
import { IOtherAddress } from "@/components/Floating/FloatingInputSelectLocation";
interface ICustomerAddress {
    id: number
    fullname: string
    mobile: string
    street: string
    ward: string
    district: string
    province: string
    country: string
    type: number
}

const AddressItem = ({ address, showUpdateModal, showDeleteModal, updateDefault, setDelete, setUpdate }) => {

    let customer_address: ICustomerAddress = address;

    const full_address =
        `
    ${customer_address.street === "" ? "" : (customer_address.street + ", ")}
    ${customer_address.ward === "" ? "" : (customer_address.ward + ", ")}
    ${customer_address.district === "" ? "" : (customer_address.district + ", ")}
    ${customer_address.province === "" ? "" : (customer_address.province + ", ")}
    ${customer_address.country === "" ? "" : customer_address.country}
    `;

    let handleShowUpdateModal = () => {
        showUpdateModal(true);
        setUpdate(customer_address);
    }

    let handleShowDeleteModal = (address_id: number) => {
        setDelete(address_id);
        showDeleteModal(true);
    }

    return (
        <div className="customer-address flex items-center justify-between mb-10">
            <div className="address-info">
                <div className="flex items-center gap-x-2 mb-2">
                    <div className="address-name font-medium">{customer_address.fullname}</div>
                    <div className="w-[2px] h-7 bg-gray-400"></div>
                    <div className="address-phone text-gray-500">{customer_address.mobile}</div>
                </div>
                <div className="address text-gray-500 w-[16rem] mb-2">{full_address}</div>
                {
                    customer_address.type === 1 && <div className="px-3 py-1.5 border border-red-500 text-red-500 w-fit font-medium">Địa chỉ mặc định</div>
                }
            </div>
            <div className="address-settings transition-all">
                <div className="w-full flex gap-x-1 mb-2">
                    <Button styles="border border-orange-500 text-orange-500 px-3 py-1.5 hover:text-white hover:bg-orange-500 duration-300" OnClick={() => handleShowUpdateModal()}>Cập nhật</Button>
                    <Button styles="border border-red-500 text-red-500 px-3 py-1.5 flex-1 hover:text-white hover:bg-red-500 duration-300" OnClick={() => handleShowDeleteModal(customer_address.id)}>Xoá</Button>
                </div>
                {
                    customer_address.type === 0 &&
                    <Button styles="border border-blue-500 text-blue-500 px-3 py-1.5 w-fit hover:text-white hover:bg-blue-500 duration-300" OnClick={() => updateDefault(customer_address.id)}>Thiết lập mặc định</Button>
                }
            </div>
        </div>
    )
}

const CustomerAddress = () => {

    const [showAddNewModal, setShowAddNewModal] = React.useState<boolean>(false);
    const [showUpdateModal, setShowUpdateModal] = React.useState<boolean>(false);
    const [showDeleteBox, setShowDeleteBox] = React.useState<boolean>(false);

    const [defaultAddress, setDefaultAddress] = React.useState<boolean>(false);
    const [addressList, setAddressList] = React.useState<ICustomerAddress[]>([]);

    const [deleteAddress, setDeleteAddress] = React.useState<number>(-1);

    const [newAddressName, setNewAddressName] = React.useState<string>("");
    const [newAddressPhone, setNewAddressPhone] = React.useState<string>("");
    const [streetAddress, setStreetAddress] = React.useState<string>("");

    const [otherAddress, setOtherAddress] = useImmer<IOtherAddress>({
        ward: "",
        district: "",
        province: ""
    })

    const [updateAddressID, setUpdateAddressID] = React.useState<number>(0);
    const [updateName, setUpdateName] = React.useState<string>("");
    const [updatePhone, setUpdatePhone] = React.useState<string>("");
    const [updateStreetAddress, setUpdateStreetAddress] = React.useState<string>("");

    const [otherUpdateAddress, setOtherUpdateAddress] = useImmer<IOtherAddress>({
        ward: "",
        district: "",
        province: ""
    })

    const [dataLoading, setDataLoading] = React.useState<boolean>(true);

    const handleUpdateOtherAddress = (field: string, value: string) => {
        setOtherUpdateAddress(draft => {
            draft[field] = value;
        })
    }

    const handleOnChangeOtherAddress = (field: string, value: string) => {
        setOtherAddress(draft => {
            draft[field] = value;
        })
    }

    const defaultAddressStyle = () => classNames(
        'w-5 h-5 rounded-[2px] flex items-center justify-center', {
        'bg-[#FCB800] text-white': defaultAddress,
        'border border-gray-500': !defaultAddress,
    });

    const fetchAllCustomerAddress = async () => {
        let result = await getCustomerAddress();
        if (result) {
            setAddressList(result);
            setTimeout(() => {
                setDataLoading(false);
            }, 1000);
        }
    }

    const handleUpdateAddressDefault = async (id: number) => {
        let result = await updateDefaultAddress(id);
        if (result) {
            if (result.EC === 0) {
                successToast1(result.EM);

                setTimeout(() => {
                    setDataLoading(true);
                    fetchAllCustomerAddress();
                }, 1000);

            } else {
                errorToast1(result.EM);
                return;
            }
        }
    }

    const handleCreateNewAddress = async () => {

        if (newAddressName.length === 0) {
            errorToast1("Họ và Tên không hợp lệ !");
            return;
        }

        if (newAddressPhone.length !== 10) {
            errorToast1("Số điện thoại không hợp lệ !");
            return;
        }

        if (otherAddress.province === "") {
            errorToast1("Vui lòng chọn Tỉnh/Thành phố !");
            return;
        }

        if (otherAddress.district === "") {
            errorToast1("Vui lòng chọn Quận/Huyện !");
            return;
        }

        if (otherAddress.ward === "") {
            errorToast1("Vui lòng chọn phường/xã !");
            return;
        }

        if (streetAddress === "") {
            errorToast1("Vui lòng điền địa chỉ cụ thể !");
            return;
        }

        let result = await createNewAddress({
            fullname: newAddressName,
            mobile: newAddressPhone,
            street: streetAddress,
            ward: otherAddress.ward,
            district: otherAddress.district,
            province: otherAddress.province,
            country: "Việt Nam",
            type: defaultAddress ? 1 : 0
        });

        if (result && result.EC === 0) {
            successToast1(result.EM);
            handleCloseAddNewModal();
            setTimeout(() => {
                fetchAllCustomerAddress();
            }, 1000);
        }
    }

    const handleUpdateAddress = async () => {

        if (updateName.length === 0) {
            errorToast1("Họ và Tên không hợp lệ !");
            return;
        }

        if (updatePhone.length !== 10) {
            errorToast1("Số điện thoại không hợp lệ !");
            return;
        }

        if (otherUpdateAddress.province === "") {
            errorToast1("Vui lòng chọn Tỉnh/Thành phố !");
            return;
        }

        if (otherUpdateAddress.district === "") {
            errorToast1("Vui lòng chọn Quận/Huyện !");
            return;
        }

        if (otherUpdateAddress.ward === "") {
            errorToast1("Vui lòng chọn phường/xã !");
            return;
        }

        if (updateStreetAddress === "") {
            errorToast1("Vui lòng điền địa chỉ cụ thể !");
            return;
        }

        let result = await updateAddress({
            id: updateAddressID,
            fullname: updateName,
            mobile: updatePhone,
            street: updateStreetAddress,
            ward: otherUpdateAddress.ward,
            district: otherUpdateAddress.district,
            province: otherUpdateAddress.province,
        });

        if (result && result.EC === 0) {
            successToast1(result.EM);
            handleCloseUpdateModal();
            setTimeout(() => {
                fetchAllCustomerAddress();
            }, 1000);
        }
    }

    const handleCloseAddNewModal = () => {
        setNewAddressName("");
        setNewAddressPhone("");
        setOtherAddress({
            ward: "",
            district: "",
            province: ""
        });
        setStreetAddress("");
        setDefaultAddress(false);
        setShowAddNewModal(false);
    }

    const handleCloseUpdateModal = () => {
        setUpdateAddressID(0);
        setUpdateName("");
        setUpdatePhone("");
        setOtherUpdateAddress({
            ward: "",
            district: "",
            province: ""
        });
        setUpdateStreetAddress("");
        setShowUpdateModal(false);
    }

    const handleRemoveCustomerAddress = async (address_id: number) => {
        let result = await removeCustomerAddress(address_id);
        if (result && result.EC === 0) {
            successToast1(result.EM);
            setShowDeleteBox(false);
            setTimeout(() => {
                fetchAllCustomerAddress();
            }, 1000);
        } else {
            return;
        }
    }

    const handleSetUpdateAddress = (address: ICustomerAddress) => {
        setUpdateAddressID(address.id);
        setUpdateName(address.fullname);
        setUpdatePhone(address.mobile);
        setUpdateStreetAddress(address.street);
        setOtherUpdateAddress(draft => {
            draft.province = address.province;
            draft.district = address.district;
            draft.ward = address.ward;
        })
    }

    React.useEffect(() => {
        fetchAllCustomerAddress();

        setTimeout(() => {
            setDataLoading(false);
        }, 1000);
    }, []);

    return (
        <>
            <div className="address-container w-full py-5 px-10 bg-white h-full">
                <div className="customer-address__title pb-5 border-b border-gray-300 flex items-center justify-between w-full">
                    <div>
                        <div className="title text-xl mb-2">Địa chỉ của tôi</div>
                        <div className="sub-title text-gray-500">Địa chỉ nơi mà bạn có thể nhận hàng của mình</div>
                    </div>
                    <Button styles="px-5 py-2 bg-[#FCB800] font-medium flex items-center justify-center gap-x-2 hover:opacity-80 transition-all duration-200" OnClick={() => setShowAddNewModal(true)}><HiOutlinePlus /> Thêm địa chỉ mới</Button>
                </div>
                {
                    dataLoading ?
                        <div className="flex items-center justify-center w-full min-h-screen">
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
                        <div className="customer-address__main p-5">
                            {
                                addressList && addressList.length > 0 &&
                                addressList.map((item, index) => {
                                    return (
                                        <AddressItem
                                            key={`customer-address-${index}`}
                                            address={item}
                                            showUpdateModal={setShowUpdateModal}
                                            showDeleteModal={setShowDeleteBox}
                                            updateDefault={handleUpdateAddressDefault}
                                            setDelete={setDeleteAddress}
                                            setUpdate={handleSetUpdateAddress}
                                        />
                                    )
                                })
                            }

                        </div>
                }

            </div>
            <Modal show={showAddNewModal} setShow={setShowAddNewModal} size="form-box-2">
                <div className="flex flex-col justify-between h-full">
                    <div>
                        <div className="text-xl font-medium mb-4">Địa chỉ mới</div>
                        <div className="flex gap-x-4 mb-6">
                            <FloatingInput
                                label="Họ và Tên"
                                value={newAddressName}
                                setValue={setNewAddressName}
                                input_style="px-3 py-2 border-gray-300 w-full"
                                block_style="flex-1"
                                id={'input-1'} />
                            <FloatingInput
                                label="Số điện thoại"
                                value={newAddressPhone}
                                setValue={setNewAddressPhone}
                                input_style="px-3 py-2 border-gray-300 w-full"
                                block_style="flex-1"
                                id={'input-2'} />
                        </div>
                        <div className="w-full mb-6">
                            <FloatingInputSelectLocation
                                label="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
                                value={otherAddress}
                                setValue={handleOnChangeOtherAddress}
                                input_style="px-3 py-2 border-gray-300 w-full"
                                block_style="w-full"
                                id={'input-3'} />
                        </div>
                        <FloatingTextarea
                            label="Địa chỉ cụ thể"
                            value={streetAddress}
                            setValue={setStreetAddress}
                            input_style="outline-none border border-gray-400 px-3 py-2 w-full h-20"
                            block_style="w-full"
                            id={'input-4'}
                        />
                        <div className="check_box flex items-center gap-x-2 cursor-pointer mt-3" onClick={() => setDefaultAddress(!defaultAddress)}>
                            <div className={defaultAddressStyle()}>{defaultAddress ? <FaCheck /> : ""}</div>
                            <div>Đặt làm địa chỉ mặc định</div>
                        </div>
                    </div>
                    <div className="transition-all flex justify-end items-center gap-x-1">
                        <Button styles="hover:bg-gray-200 text-black font-medium px-6 py-2 duration-200" OnClick={() => handleCloseAddNewModal()}>Trở lại</Button>
                        <Button styles="bg-[#FCB800] text-black font-medium px-6 py-2 hover:opacity-80 duration-200" OnClick={() => handleCreateNewAddress()}>Hoàn thành</Button>
                    </div>
                </div>
            </Modal>
            <Modal show={showUpdateModal} setShow={setShowUpdateModal} size="form-box-2">
                <div className="flex flex-col justify-between h-full">
                    <div>
                        <div className="text-xl font-medium mb-4">Cập nhật địa chỉ</div>
                        <div className="flex gap-x-4 mb-6">
                            <FloatingInput
                                label="Họ và Tên"
                                value={updateName}
                                setValue={setUpdateName}
                                input_style="px-3 py-2 border-gray-300 w-full"
                                block_style="flex-1"
                                id={'input-10'} />
                            <FloatingInput
                                label="Số điện thoại"
                                value={updatePhone}
                                setValue={setUpdatePhone}
                                input_style="px-3 py-2 border-gray-300 w-full"
                                block_style="flex-1"
                                id={'input-20'} />
                        </div>
                        <div className="w-full mb-6">
                            <FloatingInputSelectLocation
                                label="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
                                value={otherUpdateAddress}
                                setValue={handleUpdateOtherAddress}
                                updateAddress={`${otherUpdateAddress.province}, ${otherUpdateAddress.district}, ${otherUpdateAddress.ward}`}
                                input_style="px-3 py-2 border-gray-300 w-full"
                                block_style="w-full"
                                id={'input-30'}
                            />
                        </div>
                        <FloatingTextarea
                            label="Địa chỉ cụ thể"
                            value={updateStreetAddress}
                            setValue={setUpdateStreetAddress}
                            input_style="outline-none border border-gray-400 px-3 py-2 w-full h-20"
                            block_style="w-full"
                            id={'input-40'}
                        />
                    </div>
                    <div className="transition-all flex justify-end items-center gap-x-1 mt-4">
                        <Button styles="hover:bg-gray-200 text-black font-medium px-6 py-2 duration-200" OnClick={() => handleCloseUpdateModal()}>Trở lại</Button>
                        <Button styles="bg-[#FCB800] text-black font-medium px-6 py-2 hover:opacity-80 duration-200" OnClick={() => handleUpdateAddress()}>Cập nhật</Button>
                    </div>
                </div>
            </Modal>
            <Modal show={showDeleteBox} setShow={setShowDeleteBox} size="delete-confirmation-box">
                <div className="delete-confirmation-box w-full h-full relative flex flex-col justify-between">
                    <div className="text-xl mt-2">Bạn muốn xóa địa chỉ này ?</div>
                    <div className="flex items-center justify-end gap-x-2 transition-all">
                        <Button styles="rounded-[4px] px-8 py-2 text-black hover:bg-gray-200 cursor-pointer duration-200" OnClick={() => setShowDeleteBox(false)}>Hủy</Button>
                        <Button styles="rounded-[4px] px-8 py-2 bg-red-500 text-white hover:bg-red-600 cursor-pointer duration-200" OnClick={() => handleRemoveCustomerAddress(deleteAddress)}>Xóa</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default CustomerAddress;