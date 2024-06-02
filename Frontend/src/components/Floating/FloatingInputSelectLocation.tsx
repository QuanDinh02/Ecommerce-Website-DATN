import { getAllProvinces, getDistrictsByProvince, getWardsByDistrict } from "@/services/locationServices"
import classNames from "classnames"
import React from "react"
import { MdCancel } from "react-icons/md";

export interface IOtherAddress {
    ward: string
    district: string
    province: string
}

interface IProps {
    label: string
    input_style: string
    block_style: string
    id: string
    value: IOtherAddress
    setValue: (field: string, value: string) => void
}

interface IProvince {
    code: string
    name: string
}

interface IDistrictWard {
    code: string
    full_name: string
}

const TAB_SELECT = [
    {
        id: 1,
        label: "Tỉnh/Thành phố",
        active: true
    },
    {
        id: 2,
        label: "Quận/Huyện",
        active: false
    },
    {
        id: 3,
        label: "Phường/Xã",
        active: false
    }
]

const FloatingInputSelectLocation = (props: IProps) => {

    const { setValue } = props;
    const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
    const [tab, setTab] = React.useState<number>(1);
    const [tabAllow, setTabAllow] = React.useState<number>(1);

    const [finalAddress, setFinalAddress] = React.useState<string>("")

    const [selectProvince, setSelectProvince] = React.useState<IProvince>({
        code: "",
        name: ""
    });


    const [selectDistrict, setSelectDistrict] = React.useState<IDistrictWard>({
        code: "",
        full_name: ""
    });

    const [selectWard, setSelectWard] = React.useState<IDistrictWard>({
        code: "",
        full_name: ""
    });

    const [provinceList, setProvinceList] = React.useState<IProvince[]>([]);
    const [districtList, setDistrictList] = React.useState<IDistrictWard[]>([]);
    const [wardList, setWardList] = React.useState<IDistrictWard[]>([]);

    const ref = React.useRef<HTMLDivElement>(null);

    const activeTab = (tab_id: number) => classNames('transition-all duration-300 flex-1 border-b-2 flex items-center justify-center py-2.5', {
        'border-red-500 text-red-500': tab_id === tab,
        'border-gray-200 text-black': tab_id !== tab,
        'cursor-pointer': tab_id <= tabAllow,
        'cursor-not-allowed': tab_id > tabAllow,
    })

    const handleSetTab = (tab_id: number) => {
        if (tab_id <= tabAllow) {
            setTab(tab_id);
        }
        else {
            return;
        }
    }

    const handleSelectProvince = (province: IProvince) => {

        setSelectProvince({
            code: province.code,
            name: province.name
        });

        setTabAllow(2);
        setFinalAddress(province.name);
        setValue('province',province.name);
        handleFetchDistrictList(province.code);
    }

    const handleSelectDistrict = (district: IDistrictWard) => {

        setSelectDistrict({
            code: district.code,
            full_name: district.full_name
        });

        setTabAllow(3);
        setValue('district',district.full_name);
        setFinalAddress(selectProvince.name + ", " + district.full_name);
        handleFetchWardList(district.code);
    }

    const handleSelectWard = (ward: IDistrictWard) => {
        setSelectWard({
            code: ward.code,
            full_name: ward.full_name
        });
        setValue('ward',ward.full_name);
        setFinalAddress(selectProvince.name + ", " + selectDistrict.full_name + ", " + ward.full_name);
        setShowDropdown(false);
    }

    const handleFetchDistrictList = async (province_code) => {
        let result = await getDistrictsByProvince(province_code);
        if (result) {
            setDistrictList(result);
            setTab(2)
        }
    }

    const handleFetchWardList = async (district_code) => {
        let result = await getWardsByDistrict(district_code);
        if (result) {
            setWardList(result);
            setTab(3);
        }
    }

    const hanldeResetFinalAddress = () => {
        setFinalAddress("");
        setSelectProvince({
            code: "",
            name: ""
        });
        setSelectDistrict({
            code: "",
            full_name: ""
        })
        setSelectWard({
            code: "",
            full_name: ""
        });
        setDistrictList([]);
        setWardList([]);

        setValue('province',"");
        setValue('district',"");
        setValue('ward',"");

        setTab(1);
        setTabAllow(1);
    }

    React.useEffect(() => {

        const closeDropdown = (e) => {
            if (!ref.current?.contains(e.target)) {
                setShowDropdown(false);
            }
        }

        document.body.addEventListener("mousedown", closeDropdown);

        return () => document.body.removeEventListener('mousedown', closeDropdown);
    }, []);

    const fetchAllProvinces = async () => {
        let result = await getAllProvinces();
        if (result) {
            setProvinceList(result);
        }
    }

    React.useEffect(() => {
        fetchAllProvinces();
    }, []);

    return (
        <div className={`relative ${props.block_style}`}>
            <input
                type="text"
                id={props.id}
                className={`tracking-wide block outline-none border bg-transparent border-1 appearance-none focus:ring-0 focus:border-black peer ${props.input_style}`}
                placeholder=" "
                onFocus={() => setShowDropdown(true)}
                value={finalAddress}
            />
            <label
                htmlFor={props.id}
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 bg-white">
                {props.label}
            </label>
            {
                showDropdown &&
                <div ref={ref} >
                    {showDropdown && finalAddress.length > 0 && <MdCancel className="w-5 h-5 text-gray-400 absolute right-3 top-3 cursor-pointer hover:text-gray-500" onClick={() => hanldeResetFinalAddress()} />}
                    <div className={`dropdown-container shadow w-full z-[60] top-12 absolute border border-gray-300`}>
                        <div className="w-full flex items-center bg-white">
                            {TAB_SELECT.map((item) => {
                                return (
                                    <div key={`location-select-${item.id}`} className={activeTab(item.id)} onClick={() => handleSetTab(item.id)}>{item.label}</div>
                                )
                            })}
                        </div>
                        <div className="bg-white h-52 overflow-y-auto">
                            {
                                (tab === 1 &&
                                    ((provinceList && provinceList.length > 0) ?
                                        provinceList.map(item => {
                                            return (
                                                <div className="px-3 py-2 text-gray-600 hover:bg-[#EEEEEE] cursor-pointer" key={`item-${item.code}`} onClick={() => handleSelectProvince(item)}>{item.name}</div>
                                            )
                                        })
                                        :
                                        <div className="text-center py-4">Không có dữ liệu!</div>)
                                )
                            }
                            {
                                (tab === 2 &&
                                    ((districtList && districtList.length > 0) ?
                                        districtList.map(item => {
                                            return (
                                                <div className="px-3 py-2 text-gray-600 hover:bg-[#EEEEEE] cursor-pointer" key={`item-${item.code}`} onClick={() => handleSelectDistrict(item)}>{item.full_name}</div>
                                            )
                                        })
                                        :
                                        <div className="text-center py-4">Không có dữ liệu!</div>)
                                )
                            }
                            {
                                (tab === 3 &&
                                    ((wardList && wardList.length > 0) ?
                                        wardList.map(item => {
                                            return (
                                                <div className="px-3 py-2 text-gray-600 hover:bg-[#EEEEEE] cursor-pointer" key={`item-${item.code}`} onClick={() => handleSelectWard(item)}>{item.full_name}</div>
                                            )
                                        })
                                        :
                                        <div className="text-center py-4">Không có dữ liệu!</div>)
                                )
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default FloatingInputSelectLocation;