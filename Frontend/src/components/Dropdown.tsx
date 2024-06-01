import React from "react"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"

interface IFieldDropdown {
    field: string
    data: any[]
    style: string
    value: number
    setValue: (field: string, value: any) => void
}

interface IDropdown {
    data: any[]
    style: string
    value: any
    setValue: (value: any) => void
}

export const FieldDropdown = (props: IFieldDropdown) => {

    const { data, style, value, setValue, field } = props;

    const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        setValue(field, value);

        const closeDropdown = (e) => {
            if (!ref.current?.contains(e.target)) {
                setShowDropdown(false);
            }
        }

        document.body.addEventListener("mousedown", closeDropdown);

        return () => document.body.removeEventListener('mousedown', closeDropdown);
    }, []);

    return (
        <div ref={ref} className={`dropdown-container ${style} flex items-center relative cursor-pointer`} onClick={() => setShowDropdown(!showDropdown)}>
            <div className="w-full px-2">{value}</div>
            {
                showDropdown ?
                    <>
                        <MdOutlineKeyboardArrowDown className="absolute right-1 top-2 w-6 h-6 text-gray-500 rotate-180 " />
                        <div className="w-full h-40 bg-white border border-gray-200 absolute top-10 overflow-y-auto">
                            {data && data.length > 0 &&
                                data.map(item => {
                                    return (
                                        <div className="w-full h-10 p-2 cursor-pointer hover:bg-gray-100" key={`select-item-${item}`} onClick={() => setValue(field, item)}>
                                            {item}
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </>
                    :
                    <MdOutlineKeyboardArrowDown className="absolute right-1 top-2 w-6 h-6 text-gray-500" />
            }
        </div>
    )
}

export const Dropdown = (props: IDropdown) => {

    const { data, style, value, setValue } = props;

    const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        setValue(data[0]);

        const closeDropdown = (e) => {
            if (!ref.current?.contains(e.target)) {
                setShowDropdown(false);
            }
        }

        document.body.addEventListener("mousedown", closeDropdown);

        return () => document.body.removeEventListener('mousedown', closeDropdown);
    }, []);

    return (
        <div ref={ref} className={`dropdown-container ${style} flex items-center relative cursor-pointer`} onClick={() => setShowDropdown(!showDropdown)}>
            <div className="w-full px-2">{value}</div>
            {
                showDropdown ?
                    <>
                        <MdOutlineKeyboardArrowDown className="absolute right-1 top-2 w-6 h-6 text-gray-500 rotate-180 " />
                        <div className="w-full h-40 bg-white border border-gray-200 absolute top-10 overflow-y-auto">
                            {data && data.length > 0 &&
                                data.map(item => {
                                    return (
                                        <div className="w-full h-10 p-2 cursor-pointer hover:bg-gray-100" key={`select-item-${item}`} onClick={() => setValue(item)}>
                                            {item}
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </>
                    :
                    <MdOutlineKeyboardArrowDown className="absolute right-1 top-2 w-6 h-6 text-gray-500" />
            }
        </div>
    )
}