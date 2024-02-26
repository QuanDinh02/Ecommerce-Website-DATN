import './InvoicePrinting.scss';
import React from 'react';
import { GrPlayFill } from 'react-icons/gr';
import Modal from "./Modal";
import Button from '@/components/Button';
import _ from 'lodash';
import { dateFormat } from '@/utils/dateFormat';
import { CurrencyFormat } from '@/utils/numberFormat';
// import Logo from '../assets/img/logo/seven_hover.png';
import { MdPrint } from "react-icons/md";
import { fetchInvoiceDetail } from '@/services/invoiceServies';

interface ICustomerSimple {
    name: string
    phone: string
}

interface IData {
    registrationID: number
    customerInfo: ICustomerSimple
}
interface IProps {
    show: boolean
    setShow: any
    print: any
    data: IData
}

interface I_InvoiceInfo {
    id: number
    Date: Date
    Staff: string
    Total: number
}

interface IRegisterdPolicy {
    id: number
    policy_id: number
    Age: string
    policy_type: string
    total: number
}
interface IInvoiceFetch {
    id: number
    RegistraionID: number
    Date: Date
    Staff: string
    Total: number
}

interface I_InvoiceInfo {
    invoice: IInvoiceFetch
    total_payment: number
    registered_policies: IRegisterdPolicy[]
}

export type Ref = HTMLDivElement | null;

const ReceiptPrinting = React.forwardRef<Ref, IProps>((props, ref) => {

    const { show, setShow, print, data } = props;

    const [invoiceData, setInvoiceData] = React.useState<I_InvoiceInfo>();

    const handleCloseModal = () => {
        setShow(false);
    }

    const fetchInvoiceDetailInfo = async () => {
        let result = await fetchInvoiceDetail(data.registrationID);
        if (result) {
            setInvoiceData(result);
        }
    }

    React.useEffect(() => {
        if (data.registrationID !== 0 && show) {
            fetchInvoiceDetailInfo();
        }
    }, [show]);

    return (
        <>
            <Modal show={show} setShow={setShow} size='lg'>
                <div className='px-4 py-2' ref={ref}>
                    <div className='flex justify-between gap-4'>
                        <div className='flex items-center gap-2 mb-4'>
                            <div className='w-10 h-10'>
                                {/* <img src={Logo} alt='' /> */}
                            </div>
                            <div className='font-medium text-orange-400'>SEVEN INSURANCE</div>
                        </div>
                        <div className='hotel-info'>
                            <div className='flex flex-col gap-1'>
                                <span className='flex items-center gap-x-2'><GrPlayFill className='w-4 h-4' /> 228 Nguyen Van Cu Street, 4 Ward, District 5, Ho Chi Minh city</span>
                                <span className='flex items-center gap-x-2'><GrPlayFill className='w-4 h-4' /> Phone: 012 3456 7890</span>
                                <span className='flex items-center gap-x-2'><GrPlayFill className='w-4 h-4' /> Website: https://www.seveninsurance.com</span>
                            </div>
                        </div>
                    </div>
                    <div className='content'>
                        <div className='text-center text-2xl text-blue-600 my-10'>
                            <span>HÓA ĐƠN THANH TOÁN BẢO HIỂM</span>
                        </div>
                        <div className='flex justify-between bottomBorder py-4'>
                            <span className='font-medium'>Mã hóa đơn: <span className='ms-2 font-normal'>#{invoiceData ? invoiceData.invoice.id : ""}</span></span>
                            <span className='font-medium'>Nhân viên lập đơn: <span className='ms-2 font-normal'>{invoiceData ? invoiceData.invoice.Staff : ""}</span></span>
                            <span className='font-medium'>Ngày lập: <span className='ms-2 font-normal'>{dateFormat(`${invoiceData ? invoiceData.invoice.Date : ""}`)}</span></span>
                        </div>
                        <div className='w-full bottomBorder py-3'>
                            <div className='flex items-start gap-10'>
                                <table className='w-1/2'>
                                    <tbody>
                                        <tr>
                                            <td className="font-medium py-2">Tên khách hàng: </td>
                                            <td className="py-2">{data ? data.customerInfo.name : ""}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className='w-1/2'>
                                    <tbody>
                                        <tr>
                                            <td className="font-medium py-2">Số điện thoại: </td>
                                            <td className="py-2">{data ? data.customerInfo.phone : ""}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='bottomBorder py-6'>
                            <table className="table-auto w-full bg-gray-100 ">
                                <thead>
                                    <tr>
                                        <th className='text-left py-3 px-2 font-medium'>STT</th>
                                        <th className='text-left py-3 px-2 font-medium'>Tên gói bảo hiểm</th>
                                        <th className='text-left py-3 px-2 font-medium'>Tuổi</th>
                                        <th className='text-left py-3 px-2 font-medium'>Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (invoiceData?.registered_policies && invoiceData?.registered_policies.length > 0) ?
                                            <>
                                                {invoiceData?.registered_policies.map((item, index) => {
                                                    return (
                                                        <tr className="" key={`registered-policy-${index}`}>
                                                            <td className="py-3 px-2">{index + 1}</td>
                                                            <td className="py-3 px-2">{item.policy_type}</td>
                                                            <td className="py-3 px-2">{item.Age}</td>
                                                            <td className="py-3 px-2">{CurrencyFormat(item.total)}</td>
                                                        </tr>
                                                    )
                                                })}
                                                <tr className='bg-gray-100 border-t border-gray-300'>
                                                    <td></td>
                                                    <td className="py-3 px-2" colSpan={2}>Tổng chi trả</td>
                                                    <td className="py-3 px-2 text-red-500 font-medium" >{CurrencyFormat(invoiceData.total_payment)}</td>
                                                </tr>
                                            </>
                                            :
                                            <tr>
                                                <td className="text-center text-sm py-3" colSpan={4}>Không có dữ liệu !</td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-start px-4 mt-10'>
                    <Button styles="bg-gray-500 text-white px-5 py-3 hover:bg-gray-600 rounded-[4px] flex items-center gap-x-2" OnClick={() => print()}><MdPrint className="w-5 h-5"/> Xuất hóa đơn</Button>
                </div>
            </Modal>
        </>
    )
});

export default ReceiptPrinting;