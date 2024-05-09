import Button from "@/components/Button";
import { useImmer } from "use-immer";
import voucher_tag from '../../../assets/img/voucher/voucher.png';
import { GiFox } from "react-icons/gi";
import { VOUCHER_SAMPLE_DATA } from "./VoucherDataSample";
import { LuClock } from "react-icons/lu";

const VoucherAll = () => {

    const [voucherType, setVoucherType] = useImmer([
        {
            id: 1,
            name: "Fox Mart",
            selected: true
        },
        {
            id: 2,
            name: "Shop",
            selected: false
        },
        {
            id: 3,
            name: "Của Tôi",
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
        <div className="voucher-container">
            <div className="voucher__title text-xl mb-6">Kho Voucher</div>
            <div className="voucher__input-form bg-gray-100 py-6 flex items-center justify-center gap-x-2 mb-6">
                <span className="text-lg mr-3">Mã Voucher</span>
                <input
                    type="text"
                    className="w-[25rem] px-3 py-2 rounded-[4px] border border-gray-200 outline-none focus:border-black"
                    placeholder="Nhập mã voucher tại đây"
                />
                <Button styles="w-[6.25rem] py-2 bg-[#FCB800] rounded-[4px]">Lưu</Button>
            </div>
            <div className="voucher__type-selection mb-10">
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
            <div className="voucher__list grid grid-cols-2 gap-y-4 gap-x-4">
                {
                    VOUCHER_SAMPLE_DATA.map((item, index) => {
                        if (item.valid) {
                            return (
                                <div className="voucher-item h-[7.5rem] flex" key={`voucher-item-${index}`}>
                                    <div className="voucher-item__tag relative">
                                        <img src={voucher_tag} alt="" className="h-full" />
                                        <div className="text-white absolute m-auto left-0 right-0 top-1/3 w-fit text-lg flex flex-col items-center justify-center">
                                            <GiFox className="w-6 h-6" />
                                            <div>
                                                <span className="text-black font-medium">Fox</span>Mart
                                            </div>
                                        </div>
                                    </div>
                                    <div className="voucher-item__content bg-white flex-1 border border-gray-200 shadow-md p-4 flex items-center">
                                        <div className="info w-2/3">
                                            <div className="line-clamp-1">{item.description}</div>
                                            <div>
                                                {
                                                    item.minCost > 0 && <span>Đơn tối thiểu {item.minCost}k</span>
                                                }
                                                {
                                                    item.maxCost > 0 && <span>Đơn tối đa {item.maxCost}k</span>
                                                }
                                            </div>
                                            <div className="text-gray-500 flex items-center gap-x-1 mt-2"><LuClock /> Có hiệu lực sau: {item.valid_days} ngày</div>
                                        </div>
                                        <div className="save-btn w-1/3 flex justify-end">
                                            <Button styles="rounded-[4px] text-white bg-[#FCB800] px-2 py-1 hover:opacity-80">Lưu ngay</Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        return (
                            <div className="voucher-item h-[7.5rem] flex relative" key={`voucher-item-${index}`}>
                                <div className="voucher-item__tag relative opacity-50 ">
                                    <img src={voucher_tag} alt="" className="h-full" />
                                    <div className="text-white absolute m-auto left-0 right-0 top-1/3 w-fit text-lg flex flex-col items-center justify-center">
                                        <GiFox className="w-6 h-6" />
                                        <div>
                                            <span className="text-black font-medium">Fox</span>Mart
                                        </div>
                                    </div>
                                </div>
                                <div className="voucher-item__content bg-white flex-1 border border-gray-200 shadow-md p-4 flex items-center opacity-50 ">
                                    <div className="info w-2/3">
                                        <div className="line-clamp-1">{item.description}</div>
                                        <div>
                                            {
                                                item.minCost > 0 && <span>Đơn tối thiểu {item.minCost}k</span>
                                            }
                                            {
                                                item.maxCost > 0 && <span>Đơn tối đa {item.maxCost}k</span>
                                            }
                                        </div>
                                        <div className="text-gray-500 flex items-center gap-x-1 mt-2"><LuClock /> Có hiệu lực sau: {item.valid_days} ngày</div>
                                    </div>
                                    <div className="save-btn w-1/3 flex justify-end">
                                        <Button styles="rounded-[4px] text-white bg-[#FCB800] px-2 py-1 cursor-default">Lưu ngay</Button>
                                    </div>
                                </div>
                                <div className="voucher-outdated-tag bg-gray-400 absolute text-xs px-2 py-1 left-0 top-1"><span className="text-white">Hết hiệu lực</span></div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default VoucherAll;