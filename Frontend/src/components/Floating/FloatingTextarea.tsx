
interface IProps {
    label: string
    input_style: string
    block_style: string
    id: string
    value: any
    setValue: (value: any) => void
}

const FloatingTextarea = (props: IProps) => {

    // style: px-3 py-2 w-full border-gray-300
    return (
        <div className={`relative ${props.block_style}`}>
            <textarea
                id={props.id}
                className={`block outline-none border bg-transparent border-1 appearance-none focus:ring-0 focus:border-black peer ${props.input_style}`}
                placeholder=" "
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)}
            />
            <label
                htmlFor={props.id}
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 bg-white">
                {props.label}
            </label>
        </div>
    )
}

export default FloatingTextarea;