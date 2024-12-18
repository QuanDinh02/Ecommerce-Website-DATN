import Button from "@/components/Button"
import CopyClipboard from "@/components/CopyClipboard"
import { Dropdown } from "@/components/Dropdown"
import { getSellerDetailInfo, getSellerList, getSellerSearch, updateAccountStatus } from "@/services/adminService"
import React from "react"
import { IoCalendarOutline, IoSearch } from "react-icons/io5"
import { ThreeDots } from "react-loader-spinner"
import ReactPaginate from "react-paginate"
import ToggleButton from "@/components/ToggleButton"
import { useImmer } from "use-immer"
import Modal from "@/components/Modal"
import { errorToast1, successToast1 } from "@/components/Toast/Toast"
import { LuUser2 } from "react-icons/lu"
import { AiOutlineMail } from "react-icons/ai"
import { BsGenderAmbiguous } from "react-icons/bs"
import { HiOutlinePhone } from "react-icons/hi2"
import { PiCake, PiStorefrontLight } from "react-icons/pi"
import { TfiLocationPin } from "react-icons/tfi";
import { dateFormat } from "@/utils/dateFormat"

interface IShop {
    id: number
    name: string
    shopName: string
    mobile: string
    email: string
    uid: number
    active: number
}

interface ISellerActive {
    id: number
    uid: number
    active: boolean
}

interface ISellerInfoDetail {
    name: string
    email: string
    mobile: string
    address: string
    gender: number
    birth: Date
    join_date: Date
    shopName: string
}

const customerTableHeaders = [
    {
        name: "Mã Shop",
        size: 1,
        style: "",
    },
    {
        name: "Người bán",
        size: 1,
        style: "",
    },
    {
        name: "Tên shop",
        size: 1,
        style: "",
    },
    {
        name: "Số điện thoại",
        size: 1,
        style: "",
    },
    {
        name: "Email",
        size: 1,
        style: "",
    },
    {
        name: "Trạng thái",
        size: 1,
        style: "",
    },
    {
        name: "",
        size: 2,
        style: "",
    },
];

const SHOW_ITEMS = [10, 25, 50];

const SellerManagement = () => {

    const [search, setSearch] = React.useState<string>("");

    const [sellerList, setSellerList] = useImmer<IShop[]>([]);
    const [showActiveBox, setShowActiveBox] = React.useState<boolean>(false);
    const [showInfoBox, setShowInfoBox] = React.useState<boolean>(false);

    const [sellerActive, setSellerActive] = useImmer<ISellerActive>({
        id: 0,
        uid: 0,
        active: false
    });

    const [sellerInfoDetail, setSellerInfoDetail] = useImmer<ISellerInfoDetail>({
        name: "",
        email: "",
        mobile: "",
        address: "",
        gender: 1,
        birth: new Date(),
        join_date: new Date(),
        shopName: ""
    })

    const [dataLoading, setDataLoading] = React.useState<boolean>(true);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalItems, setTotalItems] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>(20);

    const [showItem, setShowItem] = React.useState<number>(10);

    const fetchSellerList = async (limit: number, page: number) => {
        let result = await getSellerList(limit, page);
        if (result) {
            setSellerList(result.seller_list);
            setTotalPages(result.page_total);
            setTotalItems(result.total_items);

            setTimeout(() => {
                setDataLoading(false);
            }, 500);
        }
    }

    const handleSearchSeller = async () => {
        let response: any = await getSellerSearch(search);
        if (response) {
            setSellerList(response.seller_list);
            setTimeout(() => {
                setDataLoading(false);
            }, 500);
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (search === "") {
                setCurrentPage(1);
                fetchSellerList(showItem, 1);
                return;
            }
            else {
                handleSearchSeller();
            }

        }
    }

    const handlePageClick = (event) => {
        setDataLoading(true);
        setCurrentPage(+event.selected + 1);
    }

    const handleShowConfirmBox = (uid: number, active: boolean) => {
        let sellerInfo = sellerList.filter(seller => seller.uid === uid)[0];

        setSellerActive(draft => {
            draft.id = sellerInfo.id;
            draft.uid = uid;
            draft.active = active;
        });
        setShowActiveBox(true);
    }

    const handleUpdateAccountStatus = async () => {
        let result = await updateAccountStatus({
            uid: sellerActive.uid,
            status: sellerActive.active ? 1 : 0
        });

        if (result) {
            if (result.EC === 0) {
                successToast1(result.EM);
                setSellerList(draft => {
                    draft.forEach(customer => {
                        if (customer.uid === sellerActive.uid) {
                            customer.active = sellerActive.active ? 1 : 0
                        }
                    })
                })
                setSellerActive({
                    id: 0,
                    uid: 0,
                    active: false
                });
                setShowActiveBox(false);
            } else {
                errorToast1(result.EM);
                return;
            }
        }
    }

    const handleShowSellerDetailInfo = async (seller_id: number) => {
        let result: ISellerInfoDetail | null = await getSellerDetailInfo(seller_id);
        if (result) {

            setSellerInfoDetail(draft => {
                draft.name = result.name;
                draft.email = result.email;
                draft.mobile = result.mobile;
                draft.address = result.address;
                draft.gender = result.gender;
                draft.birth = result.birth;
                draft.join_date = result.join_date;
                draft.shopName = result.shopName;
            });

            setShowInfoBox(true);
        }
    }

    React.useEffect(() => {

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setDataLoading(true);
        fetchSellerList(showItem, currentPage);

    }, [currentPage, showItem]);

    return (
        <>
            <div className="py-4 px-5 bg-white">
                <div className="flex items-center justify-between mb-6">
                    <div className="text-xl w-1/3">Người Bán</div>
                    <div className="w-1/3 h-10 bg-white py-2 px-3 flex items-center gap-x-3 border border-gray-300 rounded">
                        <IoSearch className="text-gray-500 w-5 h-5" />
                        <input
                            value={search}
                            type="text"
                            placeholder="Tìm theo tên, số điện thoại shop"
                            className="outline-none w-full text-sm rounded"
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={(event) => handleKeyPress(event)}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-x-3">
                        <div>Hiển thị</div>
                        <Dropdown data={SHOW_ITEMS} value={showItem} setValue={setShowItem} style={"border border-gray-200 h-10 w-20"} />
                        <div>người bán</div>
                    </div>
                    <div>Tổng <span className="text-red-500 font-medium">{totalItems}</span> người bán </div>
                </div>
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
                                        {customerTableHeaders && customerTableHeaders.length > 0 &&
                                            customerTableHeaders.map((item, index) => {
                                                if (index === 5) {
                                                    return (
                                                        <th key={`header-${index}`} className={`text-center py-3 px-3 font-medium ${item.style}`} colSpan={item.size}>{item.name}</th>
                                                    )
                                                }
                                                return (
                                                    <th key={`header-${index}`} className={`text-left py-3 px-3 font-medium ${item.style}`} colSpan={item.size}>{item.name}</th>
                                                )
                                            })
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (sellerList && sellerList.length > 0) ?
                                            <>
                                                {sellerList.map((item, index) => {
                                                    return (
                                                        <tr className="border-b border-gray-200 text-sm hover:bg-gray-100" key={`product-${index}`}>
                                                            <td className="py-4 px-3 " colSpan={1}>
                                                                <span className="flex items-center gap-x-1">
                                                                    {item.id} <span className="cursor-pointer"><CopyClipboard value={item.id} /></span>
                                                                </span>
                                                            </td>
                                                            <td className="py-4 px-3" colSpan={1}>
                                                                <span className="line-clamp-2">{item.name}</span>
                                                            </td>
                                                            <td className="py-4 px-3" colSpan={1}>
                                                                <span className="line-clamp-2">{item.shopName}</span>
                                                            </td>
                                                            <td className="py-4 px-3" colSpan={1}>
                                                                <span>{item.mobile}</span>
                                                            </td>
                                                            <td className="py-4 px-3" colSpan={1}>
                                                                <span>{item.email}</span>
                                                            </td>
                                                            <td className="py-4 px-3" colSpan={1}>
                                                                <div className="w-full flex items-center justify-center">
                                                                    <ToggleButton id={item.uid} check={item.active === 1} setCheck={handleShowConfirmBox} />
                                                                </div>
                                                            </td>
                                                            <td className="py-4 px-3 text-center" colSpan={2}>
                                                                <span className="cursor-pointer hover:underline hover:text-blue-500" onClick={() => handleShowSellerDetailInfo(item.id)}>Thông tin</span>
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
            <Modal show={showInfoBox} setShow={setShowInfoBox} size="customize-h-auto" close_icon={true}>
                <div className="text-xl mb-12 text-center">THÔNG TIN NGƯỜI BÁN</div>
                <div className="w-full flex items-center justify-center">
                    <div className="w-2/3 grid grid-cols-2 gap-x-20 mb-8">
                        <div className="flex flex-col gap-y-6">
                            <div className="flex items-center gap-x-2 justify-between">
                                <div className="flex items-center gap-x-2">
                                    <LuUser2 className="w-6 h-6" />
                                    <div className="font-medium">Họ và Tên</div>
                                </div>
                                <div className="text-right"><span>{sellerInfoDetail.name}</span></div>
                            </div>
                            <div className="flex items-center gap-x-2 justify-between">
                                <div className="flex items-center gap-x-2">
                                    <PiCake className="w-6 h-6" />
                                    <div className="font-medium">Ngày sinh</div>
                                </div>
                                <div>{dateFormat(`${sellerInfoDetail.birth}`)}</div>
                            </div>
                            <div className="flex items-center gap-x-2 justify-between">
                                <div className="flex items-center gap-x-2">
                                    <BsGenderAmbiguous className="w-6 h-6" />
                                    <div className="font-medium">Giới tính</div>
                                </div>
                                <div>{sellerInfoDetail.gender === 1 ? "Nam" : "Nữ"}</div>
                            </div>
                            <div className="flex items-center gap-x-2 justify-between">
                                <div className="flex items-center gap-x-2">
                                    <HiOutlinePhone className="w-6 h-6" />
                                    <div className="font-medium">Số điện thoại</div>
                                </div>
                                <div>{sellerInfoDetail.mobile}</div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-6">
                            <div className="flex items-center gap-x-2 justify-between">
                                <div className="flex items-center gap-x-2">
                                    <PiStorefrontLight className="w-6 h-6" />
                                    <div className="font-medium">Tên shop</div>
                                </div>
                                <div className="text-right"><span>{sellerInfoDetail.shopName}</span></div>
                            </div>
                            <div className="flex items-center gap-x-2 justify-between">
                                <div className="flex items-center gap-x-2">
                                    <IoCalendarOutline className="w-6 h-6" />
                                    <div className="font-medium">Ngày tham gia</div>
                                </div>
                                <div>{dateFormat(`${sellerInfoDetail.join_date}`)}</div>
                            </div>
                            <div className="flex items-center gap-x-2 justify-between">
                                <div className="flex items-center gap-x-2 shrink-0">
                                    <TfiLocationPin className="w-6 h-6" />
                                    <div className="font-medium">Địa chỉ</div>
                                </div>
                                <div className="text-right"><span>{sellerInfoDetail.address}</span></div>
                            </div>
                            <div className="flex items-center gap-x-2 justify-between">
                                <div className="flex items-center gap-x-2">
                                    <AiOutlineMail className="w-6 h-6" />
                                    <div className="font-medium">Email</div>
                                </div>
                                <div className="text-right"><span>{sellerInfoDetail.email}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end">
                    <Button styles="rounded-[4px] px-8 py-2 border border-gray-200 text-black hover:bg-gray-200 cursor-pointer duration-200" OnClick={() => setShowInfoBox(false)}>Thoát</Button>
                </div>
            </Modal>
            <Modal show={showActiveBox} setShow={setShowActiveBox} size="delete-confirmation-box" close_icon={true}>
                <div className="delete-confirmation-box w-full h-full relative flex flex-col justify-between">
                    {
                        !sellerActive.active ?
                            <div className="text-xl mt-2">Bạn muốn khóa tài khoản <span className="font-medium">#{sellerActive.id}</span> ?</div>
                            :
                            <div className="text-xl mt-2">Bạn muốn mở khóa tài khoản <span className="font-medium">#{sellerActive.id}</span> ?</div>
                    }
                    <div className="flex items-center justify-end gap-x-2 transition-all">
                        <Button styles="rounded-[4px] px-8 py-2 text-black hover:bg-gray-200 cursor-pointer duration-200" OnClick={() => setShowActiveBox(false)}>Hủy</Button>
                        {
                            sellerActive.active ?
                                <Button styles="rounded-[4px] px-8 py-2 bg-green-500 text-white hover:bg-green-600 cursor-pointer duration-200" OnClick={() => handleUpdateAccountStatus()}>Mở</Button>
                                :
                                <Button styles="rounded-[4px] px-8 py-2 bg-red-500 text-white hover:bg-red-600 cursor-pointer duration-200" OnClick={() => handleUpdateAccountStatus()}>Khóa</Button>
                        }
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default SellerManagement;