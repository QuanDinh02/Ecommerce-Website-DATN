import Button from "@/components/Button"
import CopyClipboard from "@/components/CopyClipboard"
import { changePasswordShippingUnit, getShippingUnitList, getShippingUnitSearch, updateShippingUnit } from "@/services/adminService"
import React from "react"
import { IoSearch } from "react-icons/io5"
import { ThreeDots } from "react-loader-spinner"
import ReactPaginate from "react-paginate"
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom"
import Modal from "@/components/Modal"
import { useImmer } from "use-immer"
import { BiSave } from "react-icons/bi"
import { errorToast1, successToast1 } from "@/components/Toast/Toast"

interface IShippingUnit {
    id: number
    nameUnit: string
    address: string
    mobile: string
    description: string
}

interface IUpdatePassword {
    old_password: string
    new_password: string
}


const suTableHeaders = [
    {
        name: "Mã đơn vị",
        size: 1,
        style: "",
    },
    {
        name: "Tên đơn vị",
        size: 1,
        style: "",
    },
    {
        name: "Địa chỉ",
        size: 1,
        style: "",
    },
    {
        name: "Số điện thoại",
        size: 1,
        style: "",
    },
    {
        name: "Mô tả đơn vị",
        size: 1,
        style: "",
    },
    {
        name: "",
        size: 2,
        style: "",
    },
];

const requiredField = () => {
    return (
        <span className="text-red-500">(*)</span>
    )
}

const ShippingUnitManagement = () => {

    const navigate = useNavigate();

    const [search, setSearch] = React.useState<string>("");
    const [showUpdateModal, setShowUpdateModal] = React.useState<boolean>(false);

    const [shippingUnitList, setShippingUnitList] = React.useState<IShippingUnit[]>([]);

    const [dataLoading, setDataLoading] = React.useState<boolean>(true);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalItems, setTotalItems] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>(20);

    const [showItem, setShowItem] = React.useState<number>(10);

    const [updateSU, setUpdateSU] = useImmer<IShippingUnit>({
        id: 0,
        nameUnit: "",
        address: "",
        mobile: "",
        description: ""
    });

    const [updatePassword, setUpdatePassword] = useImmer<IUpdatePassword>({
        old_password: "",
        new_password: ""
    });

    const handleUpdateOnChange = (field: string, value: string) => {
        setUpdateSU(draft => {
            draft[field] = value;
        });
    }

    const refreshNewForm = () => {
        setUpdateSU({
            id: 0,
            nameUnit: "",
            address: "",
            mobile: "",
            description: ""
        });

        setUpdatePassword({
            old_password: "",
            new_password: ""
        });
    }

    const handlePasswordOnChange = (field: string, value: string) => {
        setUpdatePassword(draft => {
            draft[field] = value;
        });
    }

    const handleShowUpdateModal = (su: IShippingUnit) => {
        setShowUpdateModal(true);
        setUpdateSU(su);
    }

    const handleCloseModal = (active: boolean) => {
        setShowUpdateModal(false);
        setUpdatePassword({
            old_password: "",
            new_password: ""
        });
    }

    const fetchShippingUnitList = async (limit: number, page: number) => {
        let result = await getShippingUnitList(limit, page);
        if (result) {
            setShippingUnitList(result.su_list);
            setTotalPages(result.page_total);
            setTotalItems(result.total_items);

            setTimeout(() => {
                setDataLoading(false);
            }, 500);
        }
    }

    const handleSearchShippingUnit = async () => {
        let response: any = await getShippingUnitSearch(search);
        if (response) {
            setShippingUnitList(response.su_list);
            setTimeout(() => {
                setDataLoading(false);
            }, 500);
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (search === "") {
                setCurrentPage(1);
                fetchShippingUnitList(showItem, 1);
                return;
            }
            else {
                handleSearchShippingUnit();
            }

        }
    }

    const handlePageClick = (event) => {
        setDataLoading(true);
        setCurrentPage(+event.selected + 1);
    }

    const handleUpdateSU = async () => {

        if (updateSU.nameUnit.length === 0) {
            errorToast1("Vui lòng nhập tên đơn vị !");
            return;
        }

        if (updateSU.mobile.length === 0) {
            errorToast1("Vui lòng nhập SĐT đơn vị !");
            return;
        }

        if (updateSU.address.length === 0) {
            errorToast1("Vui lòng nhập địa chỉ đơn vị !");
            return;
        }

        if (updateSU.mobile.length < 10 || updateSU.mobile.length > 11) {
            errorToast1("Số điện thoại không hợp lệ !");
            return;
        }

        let result = await updateShippingUnit(updateSU);

        if (result) {
            if (result.EC === 0) {
                successToast1(result.EM);
                fetchShippingUnitList(showItem, currentPage);
                setTimeout(() => {
                    setShowUpdateModal(false);
                    refreshNewForm();
                }, 1000);
            } else {
                errorToast1(result.EM);
                return;
            }
        }
    }

    const changeSUPassword = async () => {

        if (updatePassword.old_password.length === 0) {
            errorToast1("Vui lòng nhập mật khẩu cũ !");
            return;
        }

        if (updatePassword.new_password.length === 0) {
            errorToast1("Vui lòng nhập mật khẩu mới !");
            return;
        }

        let result = await changePasswordShippingUnit({
            su_id: updateSU.id,
            old_password: updatePassword.old_password,
            new_password: updatePassword.new_password,
        });

        if (result) {
            if (result.EC === 0) {
                successToast1(result.EM);
                setTimeout(() => {
                    setShowUpdateModal(false);
                    refreshNewForm();
                }, 1000);
            } else {
                errorToast1(result.EM);
                return;
            }
        }
    }

    React.useEffect(() => {

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setDataLoading(true);
        fetchShippingUnitList(showItem, currentPage);

    }, [currentPage, showItem]);

    return (
        <>
            <div className="py-4 px-5 bg-white">
                <div className="flex items-center justify-between mb-6">
                    <div className="text-xl w-1/3">Đơn Vị Vận Chuyển</div>
                    <div className="w-1/3 flex items-center gap-x-2">
                        <div className="w-full h-10 bg-white py-2 px-3 flex items-center gap-x-3 border border-gray-300 rounded">
                            <IoSearch className="text-gray-500 w-5 h-5" />
                            <input
                                value={search}
                                type="text"
                                placeholder="Tìm theo tên, số điện thoại của đơn vị"
                                className="outline-none w-full text-sm rounded"
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={(event) => handleKeyPress(event)}
                            />
                        </div>
                        <Button styles="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 w-fit flex items-center justify-center gap-x-1" OnClick={() => { navigate("/fms/admin/partner/shipping_unit/new"); }}><FaPlus /> Thêm</Button>
                    </div>
                </div>
                <div className=" mb-6 text-end w-full">Tổng <span className="text-red-500 font-medium">{totalItems}</span> đơn vị vận chuyển </div>
                <div>
                    {
                        dataLoading ?
                            <div className="flex items-center justify-center w-full h-full">
                                <ThreeDots
                                    height="60"
                                    width="60"
                                    color="#9ca3af"
                                    ariaLabel="three-dots-loading"
                                    radius="1"
                                    wrapperStyle={{}}
                                    wrapperClass="flex items-center justify-center tail-spin"
                                    visible={true}
                                />
                            </div>
                            :
                            <table className="table-fixed w-full mb-8">
                                <thead>
                                    <tr className='bg-gray-100 border-b-10 border-white'>
                                        {suTableHeaders && suTableHeaders.length > 0 &&
                                            suTableHeaders.map((item, index) => {
                                                return (
                                                    <th key={`header-${index}`} className={`text-left py-3 px-3 font-medium ${item.style}`} colSpan={item.size}>{item.name}</th>
                                                )
                                            })
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (shippingUnitList && shippingUnitList.length > 0) ?
                                            <>
                                                {shippingUnitList.map((item, index) => {
                                                    return (
                                                        <tr className="border-b border-gray-200 text-sm hover:bg-gray-100" key={`product-${index}`}>
                                                            <td className="py-4 px-3 " colSpan={1}>
                                                                <span className="flex items-center gap-x-1">
                                                                    {item.id} <span className="cursor-pointer"><CopyClipboard value={item.id} /></span>
                                                                </span>
                                                            </td>
                                                            <td className="py-4 px-3" colSpan={1}>
                                                                <span className="line-clamp-2">{item.nameUnit}</span>
                                                            </td>
                                                            <td className="py-4 px-3" colSpan={1}>
                                                                <span className="line-clamp-2">{item.address}</span>
                                                            </td>
                                                            <td className="py-4 px-3" colSpan={1}>
                                                                <span>{item.mobile}</span>
                                                            </td>
                                                            <td className="py-4 px-3" colSpan={1}>
                                                                <span className="line-clamp-2">{item.description}</span>
                                                            </td>
                                                            <td className="py-4 px-3" colSpan={2}>
                                                                <div className="w-full flex items-center justify-center gap-x-4">
                                                                    <span className="cursor-pointer hover:underline hover:text-orange-500" onClick={() => handleShowUpdateModal(item)}>Chỉnh sửa</span>
                                                                    <span className="cursor-pointer hover:underline hover:text-blue-500">Xem chi tiết</span>
                                                                </div>

                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                                <tr>
                                                    <td colSpan={7}>
                                                        {
                                                            <div className='pagination-sys-container my-4 flex justify-center'>
                                                                <ReactPaginate
                                                                    nextLabel=">"
                                                                    onPageChange={handlePageClick}
                                                                    pageRangeDisplayed={5}
                                                                    marginPagesDisplayed={0}
                                                                    pageCount={totalPages}
                                                                    previousLabel="<"
                                                                    pageClassName="page-item"
                                                                    pageLinkClassName="page-link page-background"
                                                                    previousClassName="page-item"
                                                                    previousLinkClassName="page-link pre-next"
                                                                    nextClassName="page-item"
                                                                    nextLinkClassName="page-link pre-next"
                                                                    breakLabel=""
                                                                    breakClassName="page-item"
                                                                    breakLinkClassName="page-link"
                                                                    containerClassName="pagination flex items-center gap-2 "
                                                                    activeLinkClassName="page-active-background"
                                                                    renderOnZeroPageCount={null}
                                                                    forcePage={currentPage - 1}
                                                                />
                                                            </div>
                                                        }
                                                    </td>
                                                </tr>
                                            </>
                                            :
                                            <tr>
                                                <td className="text-center py-3" colSpan={7}>
                                                    <div className="w-full text-gray-500 text-center py-2">Không có dữ liệu !</div>
                                                </td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                    }
                </div>
            </div>
            <Modal show={showUpdateModal} setShow={handleCloseModal} size="update-modal">
                <div className="flex flex-col h-full relative">
                    <div className="text-xl mb-8">Cập nhật thông tin đơn vị vận chuyển</div>
                    <div className="text-lg mb-4">Thông tin đơn vị vận chuyển</div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-4">
                        <div>
                            <div className='input_label font-medium'>Tên đơn vị vận chuyển {requiredField()}</div>
                            <input type="text" className="form_input" onChange={(e) => handleUpdateOnChange('nameUnit', e.target.value)} value={updateSU.nameUnit} placeholder="Nhập tên đơn vị vận chuyển" />
                        </div>
                        <div>
                            <div className='input_label font-medium'>Số điện thoại {requiredField()} <span className="text-sm text-gray-400">(10 hoặc 11 số)</span></div>
                            <input type="text" className="form_input" onChange={(e) => handleUpdateOnChange('mobile', e.target.value)} value={updateSU.mobile} placeholder="Nhập số điện thoại đơn vị vận chuyển" />
                        </div>
                        <div>
                            <div className='input_label font-medium'>Địa chỉ {requiredField()}</div>
                            <input type="text" className="form_input" onChange={(e) => handleUpdateOnChange('address', e.target.value)} value={updateSU.address} placeholder="Nhập địa chỉ đơn vị vận chuyển" />
                        </div>
                        <div>
                            <div className='input_label font-medium'>Mô tả đơn vị</div>
                            <input type="text" className="form_input" onChange={(e) => handleUpdateOnChange('description', e.target.value)} value={updateSU.description} placeholder="Nhập mô tả đơn vị vận chuyển" />
                        </div>
                    </div>
                    <Button styles="px-4 py-2 rounded bg-orange-400 text-white hover:bg-orange-500 w-fit flex items-center justify-center gap-x-1" OnClick={() => handleUpdateSU()}><BiSave /> Lưu</Button>
                    <div className="text-lg my-4">Đổi mật khẩu</div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-4">
                        <div>
                            <div className='input_label font-medium'>Mật khẩu cũ</div>
                            <input type="password" className="form_input" onChange={(e) => handlePasswordOnChange('old_password', e.target.value)} value={updatePassword.old_password} placeholder="Nhập mật khẩu cũ" />
                        </div>
                        <div>
                            <div className='input_label font-medium'>Mật khẩu mới</div>
                            <input type="password" className="form_input" onChange={(e) => handlePasswordOnChange('new_password', e.target.value)} value={updatePassword.new_password} placeholder="Nhập mật khẩu mới" />
                        </div>
                    </div>
                    <Button styles="px-4 py-2 rounded bg-red-500 text-white hover:bg-orange-500 w-fit flex items-center justify-center gap-x-1" OnClick={() => changeSUPassword()}>Đổi mật khẩu</Button>
                </div>
            </Modal>
        </>
    )
}

export default ShippingUnitManagement;