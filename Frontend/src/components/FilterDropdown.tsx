import React from "react"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"

interface ICategory {
    id: number
    title: string
}

interface IDropdown {
    id?: string
    depend?: boolean
    data: ICategory[]
    style: string
    value: ICategory
    setValue: (value: ICategory) => void
}

const FilterDropdown = (props: IDropdown) => {

    const { data, style, value, setValue, id, depend } = props;

    const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
    const ref = React.useRef<HTMLDivElement>(null);

    const [content, setContent] = React.useState<string>("");

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
        <div ref={ref} className={`dropdown-container ${style} flex items-center relative ${depend ? ("cursor-not-allowed bg-gray-100") : "cursor-pointer"}`} onClick={() => {
            if (!depend) {
                setShowDropdown(!showDropdown)
            }
        }}>
            <div className="w-full line-clamp-1">{value.title}</div>
            {/* <input type="text" className="outline-none w-full disabled:bg-gray-100 disabled:cursor-not-allowed" value={value.title} disabled={depend}/> */}
            {
                showDropdown ?
                    <>
                        <MdOutlineKeyboardArrowDown className="absolute right-1 top-2 w-6 h-6 text-gray-500 rotate-180 " />
                        <div className="w-full max-h-40 bg-white border border-gray-200 absolute top-11 left-0 overflow-y-auto z-10 shadow-lg rounded-md">
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

export default FilterDropdown;