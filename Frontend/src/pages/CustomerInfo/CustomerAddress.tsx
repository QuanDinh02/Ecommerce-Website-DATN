import Button from "@/components/Button";
import FloatingInput from "@/components/Floating/FloatingInput";
import FloatingTextarea from "@/components/Floating/FloatingTextarea";
import Modal from "@/components/Modal";
import classNames from "classnames";
import React from "react";
import { FaCheck } from "react-icons/fa6";
import { HiOutlinePlus } from "react-icons/hi";

const Customer_Addresses: ICustomerAddress[] = [
    {
        name: "Minh Nhựt Home",
        phone: "(+84) 123456789",
        address: "123 Nguyễn Văn Cừ, Quận 5, TP. Hồ Chí Minh",
        default: true
    },
    {
        name: "Minh Nhựt HCMUS",
        phone: "(+84) 123456789",
        address: "123 Điện Biên Phủ, Quận 5, TP. Hồ Chí Minh",
        default: false
    }
]

interface ICustomerAddress {
    name: string
    phone: string
    address: string
    default: boolean
}

const AddressItem = ({ address, showUpdateModal, showDeleteModal }) => {

    let customer_address: ICustomerAddress = address;

    let handleShowUpdateModal = () => {
        showUpdateModal(true);
    }

    let handleShowDeleteModal = () => {
        showDeleteModal(true);
    }

    return (
        <div className="customer-address flex items-center justify-between mb-10">
            <div className="address-info">
                <div className="flex items-center gap-x-2 mb-2">
                    <div className="address-name font-medium">{customer_address.name}</div>
                    <div className="w-[2px] h-7 bg-gray-400"></div>
                    <div className="address-phone text-gray-500">{customer_address.phone}</div>
                </div>
                <div className="address text-gray-500 w-[16rem] mb-2">{customer_address.address}</div>
                {
                    customer_address.default && <div className="px-3 py-1.5 border border-red-500 text-red-500 w-fit font-medium">Địa chỉ mặc định</div>
                }
            </div>
            <div className="address-settings transition-all">
                <div className="w-full flex gap-x-1 mb-2">
                    <Button styles="border border-orange-500 text-orange-500 px-3 py-1.5 hover:text-white hover:bg-orange-500 duration-300" OnClick={() => handleShowUpdateModal()}>Cập nhật</Button>
                    <Button styles="border border-red-500 text-red-500 px-3 py-1.5 flex-1 hover:text-white hover:bg-red-500 duration-300" OnClick={() => handleShowDeleteModal()}>Xoá</Button>
                </div>
                <Button styles="border border-blue-500 text-blue-500 px-3 py-1.5 w-fit hover:text-white hover:bg-blue-500 duration-300">Thiết lập mặc định</Button>
            </div>
        </div>
    )
}

const CustomerAddress = () => {

    const [showAddNewModal, setShowAddNewModal] = React.useState<boolean>(false);
    const [showUpdateModal, setShowUpdateModal] = React.useState<boolean>(false);
    const [showDeleteBox, setShowDeleteBox] = React.useState<boolean>(false);

    const [defaultAddress, setDefaultAddress] = React.useState<boolean>(false);

    const defaultAddressStyle = () => classNames(
        'w-5 h-5 rounded-[2px] flex items-center justify-center', {
        'bg-[#FCB800] text-white': defaultAddress,
        'border border-gray-500': !defaultAddress,
    });

    return (
        <>
            <div className="address-container">
                <div className="customer-address__title pb-5 border-b border-gray-300 flex items-center justify-between w-full">
                    <div>
                        <div className="title text-xl mb-2">Địa chỉ của tôi</div>
                        <div className="sub-title text-gray-500">Địa chỉ nơi mà bạn có thể nhận hàng của mình</div>
                    </div>
                    <Button styles="px-5 py-2 bg-[#FCB800] font-medium flex items-center justify-center gap-x-2 hover:opacity-80 transition-all duration-200" OnClick={() => setShowAddNewModal(true)}><HiOutlinePlus /> Thêm địa chỉ mới</Button>
                </div>
                <div className="customer-address__main p-5">
                    <div className="text-lg mb-8">Địa chỉ</div>
                    {
                        Customer_Addresses.map((item, index) => {
                            return (
                                <AddressItem
                                    key={`customer-address-${index}`}
                                    address={item}
                                    showUpdateModal={setShowUpdateModal}
                                    showDeleteModal={setShowDeleteBox}
                                />
                            )
                        })
                    }

                </div>
            </div>
            <Modal show={showAddNewModal} setShow={setShowAddNewModal} size="form-box">
                <div>
                    <div className="text-xl font-medium mb-4">Địa chỉ mới</div>
                    <div className="flex gap-x-4 mb-4">
                        <FloatingInput
                            label="Họ và Tên"
                            input_style="px-3 py-2 border-gray-300 w-full"
                            block_style="flex-1"
                            id={'input-1'} />
                        <FloatingInput
                            label="Số điện thoại"
                            input_style="px-3 py-2 border-gray-300 w-full"
                            block_style="flex-1"
                            id={'input-2'} />
                    </div>
                    <FloatingTextarea
                        label="Địa chỉ cụ thể"
                        input_style="outline-none border border-gray-400 px-3 py-2 w-full h-40"
                        block_style="w-full"
                        id={'input-3'}
                    />
                    <div className="check_box flex items-center gap-x-2 cursor-pointer mt-3" onClick={() => setDefaultAddress(!defaultAddress)}>
                        <div className={defaultAddressStyle()}>{defaultAddress ? <FaCheck /> : ""}</div>
                        <div>Đặt làm địa chỉ mặc định</div>
                    </div>
                    <div className="flex justify-end gap-x-2 transition-all">
                        <Button styles="hover:bg-gray-200 text-black font-medium px-6 py-2 duration-200" OnClick={() => setShowAddNewModal(false)}>Trở lại</Button>
                        <Button styles="bg-[#FCB800] text-black font-medium px-6 py-2 hover:opacity-80 duration-200">Hoàn thành</Button>
                    </div>
                </div>
            </Modal>
            <Modal show={showUpdateModal} setShow={setShowUpdateModal} size="form-box">
                <div>
                    <div className="text-xl font-medium mb-4">Cập nhật địa chỉ</div>
                    <div className="flex gap-x-4 mb-4">
                        <FloatingInput
                            label="Họ và Tên"
                            input_style="px-3 py-2 border-gray-300 w-full"
                            block_style="flex-1"
                            id={'input-1'} />
                        <FloatingInput
                            label="Số điện thoại"
                            input_style="px-3 py-2 border-gray-300 w-full"
                            block_style="flex-1"
                            id={'input-2'} />
                    </div>
                    <FloatingTextarea
                        label="Địa chỉ cụ thể"
                        input_style="outline-none border border-gray-400 px-3 py-2 w-full h-40"
                        block_style="w-full"
                        id={'input-3'}
                    />
                    <div className="check_box flex items-center gap-x-2 cursor-pointer mt-3" onClick={() => setDefaultAddress(!defaultAddress)}>
                        <div className={defaultAddressStyle()}>{defaultAddress ? <FaCheck /> : ""}</div>
                        <div>Đặt làm địa chỉ mặc định</div>
                    </div>
                    <div className="flex justify-end gap-x-2 transition-all">
                        <Button styles="hover:bg-gray-200 text-black font-medium px-6 py-2 duration-200" OnClick={() => setShowUpdateModal(false)}>Trở lại</Button>
                        <Button styles="bg-[#FCB800] text-black font-medium px-6 py-2 hover:opacity-80 duration-200">Hoàn thành</Button>
                    </div>
                </div>
            </Modal>
            <Modal show={showDeleteBox} setShow={setShowDeleteBox} size="delete-confirmation-box">
                <div className="delete-confirmation-box w-full h-full relative flex flex-col justify-between">
                    <div className="text-xl mt-2">Bạn muốn xóa địa chỉ này ?</div>
                    <div className="flex items-center justify-end gap-x-2 transition-all">
                        <Button styles="rounded-[4px] px-8 py-2 text-black hover:bg-gray-200 cursor-pointer duration-200" OnClick={() => setShowDeleteBox(false)}>Hủy</Button>
                        <Button styles="rounded-[4px] px-8 py-2 bg-red-500 text-white hover:bg-red-600 cursor-pointer duration-200">Xóa</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default CustomerAddress;