import CurrencyInput from 'react-currency-input-field';

interface IProps {
    label: string
    input_style: string
    block_style: string
    id: string
    value: any
    setValue: (value: any) => void
    normal?: boolean
}

const FloatingNumberInput = (props: IProps) => {

    const handleOnChange = (value, name, values) => {
        props.setValue(value);
    }

    // style: px-3 py-2 w-full border-gray-300
    return (
        <div className={`relative ${props.block_style}`}>
            {
                props.normal ?
                    <>
                        <CurrencyInput
                            id={props.id}
                            value={props.value}
                            placeholder="Nhập số tiền"
                            className={`block outline-none border bg-transparent border-1 appearance-none focus:ring-0 focus:border-black peer ${props.input_style}`}
                            onValueChange={handleOnChange}
                        />
                        <label
                            htmlFor={props.id}
                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 bg-white">
                            {props.label}
                        </label>
                    </>
                    :
                    <>
                        <CurrencyInput
                            id={props.id}
                            value={props.value}
                            placeholder="Nhập số tiền"
                            className={`block outline-none border bg-transparent border-1 appearance-none focus:ring-0 focus:border-black peer ${props.input_style}`}
                            intlConfig={{ locale: 'vi-VN', currency: 'VND' }}
                            onValueChange={handleOnChange}
                        />
                        <label
                            htmlFor={props.id}
                            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 bg-white">
                            {props.label}
                        </label>
                    </>
            }

        </div>
    )
}

export default FloatingNumberInput;