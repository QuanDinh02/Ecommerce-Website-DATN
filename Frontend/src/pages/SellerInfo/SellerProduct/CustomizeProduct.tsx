import React from "react"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"

interface ICategory {
    id: number
    title: string
}

interface IDropdown {
    id?: string
    label?: string
    depend?: boolean
    data: ICategory[]
    style: string
    value: ICategory
    setValue: (value: ICategory) => void
}

const CustomizeDropdown = (props: IDropdown) => {

    const { data, style, value, setValue, id, label, depend } = props;

    const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        setValue(value);

        const closeDropdown = (e) => {
            if (!ref.current?.contains(e.target)) {
                setShowDropdown(false);
            }
        }

        document.body.addEventListener("mousedown", closeDropdown);

        return () => document.body.removeEventListener('mousedown', closeDropdown);
    }, []);

    return (
        <div ref={ref} className={`dropdown-container ${style} flex items-center relative ${depend ? ("cursor-not-allowed") : "cursor-pointer"}`} onClick={() => {
            if (!depend) {
                setShowDropdown(!showDropdown)
            }
        }}>
            <div className="w-full">{value.title}</div>
            <label
                htmlFor={id}
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 bg-white">
                {label}
            </label>
            {
                showDropdown ?
                    <>
                        <MdOutlineKeyboardArrowDown className="absolute right-1 top-2 w-6 h-6 text-gray-500 rotate-180 " />
                        <div className="w-full max-h-40 bg-white border border-gray-200 absolute top-11 left-0 overflow-y-auto z-20 shadow-lg rounded-md">
                            {data && data.length > 0 &&
                                data.map(item => {
                                    return (
                                        <div className="w-full h-10 p-2 cursor-pointer hover:bg-gray-100" key={`select-item-${item.id}-${id}`} onClick={() => setValue(item)}>
                                            <span className="line-clamp-1">{item.title}</span>
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

export default CustomizeDropdown;