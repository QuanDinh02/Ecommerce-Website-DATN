import React from "react";
import { useImmer } from "use-immer";
import { PiTicketLight } from "react-icons/pi";

const VoucherHistory = () => {

    const [voucherList, setVoucherList] = React.useState([]);

    const [voucherType, setVoucherType] = useImmer([
        {
            id: 1,
            name: "Hết hiệu lực",
            selected: true
        },
        {
            id: 2,
            name: "Đã sử dụng",
            selected: false
        }
    ]);

    const hanldeSelectVoucherType = (id: number) => {
        setVoucherType(draft => {
            draft.forEach(item => {
                if (item.id === id) {
                    item.selected = true;
                } else {
                    item.selected = false;
                }
            });
        })
    }

    return (
        <div className="voucher-history-container">
            <div className="voucher-history__title text-xl mb-6 pb-5 border-b border-gray-300">Lịch sử Voucher</div>
            <div className="voucher-history__type-selection">
                <div className="flex items-center border-b border-gray-300">
                    {
                        voucherType && voucherType.length > 0 &&
                        voucherType.map((item, index) => {
                            if (item.selected) {
                                return (
                                    <div className="px-5 py-2 border-b-2 border-[#FCB800] text-[#FCB800] font-medium cursor-pointer" key={`detail-${item.id}`}>{item.name}</div>
                                )
                            }
                            return (
                                <div
                                    className="px-5 py-2 text-black cursor-pointer"
                                    key={`detail-${item.id}`}
                                    onClick={() => hanldeSelectVoucherType(item.id)}
                                >{item.name}</div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="voucher-history__list">
                {
                    voucherList && voucherList.length ?
                        <></>
                        :
                        <div className="w-full flex flex-col items-center justify-center gap-y-1 my-28">
                            <PiTicketLight className="w-36 h-36 text-gray-300" />
                            <div>Không tìm thấy lịch sử Voucher</div>
                            <div className="text-sm text-gray-400">Không có voucher nào trong mục này</div>
                        </div>
                }
            </div>
        </div>
    )
}

export default VoucherHistory;