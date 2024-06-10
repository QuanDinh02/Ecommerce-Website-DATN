import FloatingInput from "@/components/Floating/FloatingInput";
import React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useImmer } from "use-immer";
import ReactQuill from 'react-quill';
import { LuImagePlus } from "react-icons/lu";
import Button from "@/components/Button";
import { FiUpload } from "react-icons/fi";

const Category = [
    {
        id: 1,
        title: "Đồ điện"
    },
    {
        id: 2,
        title: "Thiết bị điện tử"
    },
    {
        id: 3,
        title: "Thể thao"
    },
]

const SubCategory = [
    {
        id: 1,
        title: "Áo phao"
    },
    {
        id: 2,
        title: "Máy tính"
    },
    {
        id: 3,
        title: "Giày thể thao"
    },
]

const MODULE = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}

interface ICategory {
    id: number
    title: string
}

interface IDropdown {
    id?: string
    label?: string
    data: ICategory[]
    style: string
    value: ICategory
    setValue: (value: ICategory) => void
}

const Dropdown = (props: IDropdown) => {

    const { data, style, value, setValue, id, label } = props;

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
                                        <div className="w-full h-10 p-2 cursor-pointer hover:bg-gray-100" key={`select-item-${item}`} onClick={() => setValue(item)}>
                                            {item.title}
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

const SellerAddNewProduct = () => {

    const [productName, setProductName] = React.useState<string>("");
    const [productPrice, setProductPrice] = React.useState<number>(0);
    const [productCurrentPrice, setProductCurrentPrice] = React.useState<number>(0);
    const [inventory, setInventory] = React.useState<number>(0);

    const [previewImage, setPreviewImage] = React.useState<string>("");

    const [productDescription, setProductDescription] = React.useState('');

    const [productCategory, setProductCategory] = useImmer({
        id: 0,
        title: ""
    });

    const [productSubCategory, setProductSubCategory] = useImmer({
        id: 0,
        title: ""
    });

    const handleSelectProductCategory = (category: ICategory) => {
        setProductCategory(draft => {
            draft.id = category.id;
            draft.title = category.title;
        })
    }

    const handleSelectProductSubCategory = (sub_category: ICategory) => {
        setProductSubCategory(draft => {
            draft.id = sub_category.id;
            draft.title = sub_category.title;
        })
    }

    const handleSelectImage = (value: any) => {
        setPreviewImage(URL.createObjectURL(value));
    }

    return (
        <>
            <div className="text-xl font-bold text-gray-600 mb-8">Thêm Sản Phẩm</div>
            <div className="flex gap-x-4">
                <div className="w-3/5">
                    <div className="font-medium mb-4 text-sm">THÔNG TIN SẢN PHẨM</div>
                    <FloatingInput
                        label="Tên sản phẩm"
                        value={productName}
                        setValue={setProductName}
                        input_style="px-3 py-2 border-gray-300 w-full rounded-md"
                        block_style="w-full"
                        id={'product-name'} />
                    <div className="flex mt-4 gap-x-3">
                        <Dropdown
                            data={Category}
                            value={productCategory}
                            setValue={handleSelectProductCategory}
                            style="px-3 py-2 rounded-md border border-gray-300 w-1/2"
                            id={"product-category"}
                            label={"Danh mục sản phẩm"}
                        />
                        <Dropdown
                            data={SubCategory}
                            value={productSubCategory}
                            setValue={handleSelectProductSubCategory}
                            style="px-3 py-2 rounded-md border border-gray-300 w-1/2"
                            id={"product-sub-category"}
                            label={"Danh mục sản phẩm (con)"}
                        />
                    </div>
                    <div className="flex mt-4 gap-x-3">
                        <FloatingInput
                            label="Giá sản phẩm"
                            value={productPrice}
                            setValue={setProductPrice}
                            input_style="px-3 py-2 border-gray-300 w-full rounded-md"
                            block_style="w-1/2"
                            id={'product-price'} />
                        <FloatingInput
                            label="Giá giảm (nếu có)"
                            value={productCurrentPrice}
                            setValue={setProductCurrentPrice}
                            input_style="px-3 py-2 border-gray-300 w-full rounded-md"
                            block_style="w-1/2"
                            id={'product-current-price'} />
                    </div>
                    <div className="flex mt-4 gap-x-3">
                        <FloatingInput
                            label="Số lượng nhập kho"
                            value={inventory}
                            setValue={setInventory}
                            input_style="px-3 py-2 border-gray-300 w-full rounded-md"
                            block_style="w-full"
                            id={'product-inventory'} />
                    </div>
                    <div className="font-medium mt-6 mb-1 text-sm">MÔ TẢ SẢN PHẨM</div>
                    <ReactQuill
                        theme="snow"
                        value={productDescription}
                        onChange={setProductDescription} className="w-full mt-4"
                        modules={MODULE}
                    />
                </div>
                <div className="w-2/5">
                    <div className="font-medium mb-4 text-sm">ẢNH SẢN PHẨM</div>
                    <div className="w-full border-2 border-dashed border-gray-300 rounded-md bg-gray-50 flex items-center justify-center">
                        {previewImage !== "" ?
                            <img src={previewImage} alt="" className="w-full h-full"/>
                            :
                            <div className="flex flex-col w-full items-center h-48 justify-center">
                                <LuImagePlus className="w-8 h-8 text-gray-400" />
                                <label htmlFor="formFile" className="cursor-pointer underline text-blue-600 font-medium">Click to upload</label>
                                <div>or drag and drop</div>
                                <input
                                    className="form-control"
                                    type="file"
                                    id="formFile"
                                    hidden
                                    onChange={(event) => handleSelectImage(event.target && event.target.files ? event.target?.files[0] : null)}
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <Button styles="px-4 py-2 rounded-lg border border-gray-300 w-fit mt-4">Làm mới</Button>
                <Button styles="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 w-fit mt-4">Thêm Sản Phẩm</Button>
            </div>
        </>
    )
}

export default SellerAddNewProduct;