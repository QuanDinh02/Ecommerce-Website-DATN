import FloatingInput from "@/components/Floating/FloatingInput";
import React from "react";
import { useImmer } from "use-immer";
import ReactQuill from 'react-quill';
import Button from "@/components/Button";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { TbTrash } from "react-icons/tb";
import { getCategoryList, getSubCategoryByCategory, createNewProduct } from "@/services/sellerService";
import { errorToast1, successToast1 } from "@/components/Toast/Toast";
import FloatingNumberInput from "@/components/Floating/FloatingNumberInput";
import CustomizeDropdown from "./CustomizeProduct";
import { RotatingLines } from "react-loader-spinner";

const FILE_UPLOAD_SIZE_MAX = 2 * 1024 * 1024; // 2MB

const IMAGE_FILE_TYPE_ALLOW = ["image/jpeg", "image/png", "image/jpg"];

const MODULE = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link'],
        ['clean'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, {
            'color': [
                '#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc',
                '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc',
                '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66',
                '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00',
                '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000',
                '#663d00', '#666600', '#003700', '#002966', '#3d1466', 'custom-color'
            ]
        }, { 'background': [] }, 'link'],
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

interface IUploadImage {
    url: string
    image_file: any
}

const SellerAddNewProduct = () => {

    const [productName, setProductName] = React.useState<string>("");
    const [productPrice, setProductPrice] = React.useState<number>(0);
    const [productCurrentPrice, setProductCurrentPrice] = React.useState<number>(0);
    const [inventory, setInventory] = React.useState<number>(0);

    const [categoryList, setCategoryList] = React.useState<ICategory[]>([]);
    const [subCategoryList, setSubCategoryList] = React.useState<ICategory[]>([]);

    const [uploadImageList, setUploadImageList] = useImmer<IUploadImage[]>([
        {
            url: "",
            image_file: null
        }
    ]);

    const [isCreating, setIsCreating] = React.useState<boolean>(false);

    const [productDescription, setProductDescription] = React.useState<string>("");

    const [productCategory, setProductCategory] = useImmer({
        id: 0,
        title: "Chọn danh mục sản phẩm"
    });

    const [productSubCategory, setProductSubCategory] = useImmer({
        id: 0,
        title: "Chọn danh mục sản phẩm con"
    });

    const handleSelectProductCategory = async (category: ICategory) => {
        if (category) {
            setProductCategory(draft => {
                draft.id = category.id;
                draft.title = category.title;
            });

            let sub_category_list = await getSubCategoryByCategory(category.id);
            if (sub_category_list) {
                setSubCategoryList(sub_category_list);
            }
        }

    }

    const handleSelectProductSubCategory = (sub_category: ICategory) => {
        if (sub_category) {
            setProductSubCategory(draft => {
                draft.id = sub_category.id;
                draft.title = sub_category.title;
            })
        }
    }

    const handleUploadImage = (image_index: number, value: any) => {

        if (value) {
            if (!IMAGE_FILE_TYPE_ALLOW.includes(value.type)) {
                errorToast1("Ảnh không đúng định dạng !");
                return;
            }
            if (value.size > FILE_UPLOAD_SIZE_MAX) {
                errorToast1("Dung lượng ảnh lớn hơn 2MB !");
                return;
            }
            else {
                setUploadImageList(draft => {
                    draft.forEach((image, index) => {
                        if (index === image_index) {
                            image.url = URL.createObjectURL(value);
                            image.image_file = value;
                        }
                    })
                });

                setUploadImageList(list => {
                    return (
                        [...list, {
                            url: "",
                            image_file: null
                        }]
                    )
                });
            }
        }
    }

    const handleDeleteImage = (image_index: number) => {
        if (uploadImageList.length === 1) {
            return;
        }

        let newList = uploadImageList.filter((item, index) => index !== image_index);
        setUploadImageList(newList);
    }

    const fetchCategoryList = async () => {
        let result = await getCategoryList();
        if (result) {
            setCategoryList(result);
        }
    }

    const refreshNewForm = () => {
        setProductName("");
        setProductPrice(0);
        setProductCurrentPrice(0);
        setInventory(0);

        setUploadImageList([
            {
                url: "",
                image_file: null
            }
        ]);

        setProductDescription("");
        setSubCategoryList([]);

        setProductCategory({
            id: 0,
            title: "Chọn danh mục sản phẩm"
        });
        setProductSubCategory({
            id: 0,
            title: "Chọn danh mục sản phẩm con"
        });
    }

    const handleSetProductPrice = (num: any) => {
        if (!isNaN(num) && num >= 0) {
            setProductPrice(num);
        }
    }

    const handleSetProductCurrentPrice = (num: any) => {
        if (!isNaN(num) && num >= 0) {
            setProductCurrentPrice(num);
        }
    }

    const handleSetInventory = (num: any) => {
        if (!isNaN(num) && num >= 0) {
            setInventory(num);
        }
    }

    const handleCreateProduct = async () => {

        if (productName.length === 0) {
            errorToast1("Tên sản phẩm trống !");
            return;
        }

        if (productSubCategory.id === 0) {
            errorToast1("Vui lòng chọn danh mục sản phẩm !");
            return;
        }

        if (productPrice < 1) {
            errorToast1("Vui lòng nhập giá sản phẩm !");
            return;
        }

        if (uploadImageList.length === 1) {
            errorToast1("Chưa có ảnh cho sản phẩm !");
            return;
        }

        if (productCurrentPrice >= productPrice) {
            errorToast1("Giá giảm thấp hơn giá gốc");
            return;
        }

        let currentPrice = productCurrentPrice === 0 ? productPrice : productCurrentPrice;

        setIsCreating(true);

        let result = await createNewProduct({
            name: productName,
            price: productPrice,
            currentPrice: currentPrice,
            quantity: inventory,
            summary: productDescription,
            image: uploadImageList[0].image_file,
            sub_category_id: productSubCategory.id
        });

        if (result) {
            if (result.EC === 0) {

                setTimeout(() => {
                    successToast1(result.EM);
                    refreshNewForm();
                    setIsCreating(false);
                }, 1000);
            } else {
                errorToast1(result.EM);
                setTimeout(() => {
                    refreshNewForm();
                    setIsCreating(false);
                }, 1000);
                return;
            }
        }
    }

    React.useEffect(() => {
        fetchCategoryList();
    }, []);

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
                        <CustomizeDropdown
                            data={categoryList}
                            value={productCategory}
                            setValue={handleSelectProductCategory}
                            style="px-3 py-2 rounded-md border border-gray-300 w-1/2"
                            id={"product-category"}
                            label={"Danh mục sản phẩm"}
                        />
                        <CustomizeDropdown
                            data={subCategoryList}
                            value={productSubCategory}
                            setValue={handleSelectProductSubCategory}
                            style="px-3 py-2 rounded-md border border-gray-300 w-1/2"
                            id={"product-sub-category"}
                            label={"Danh mục sản phẩm (con)"}
                            depend={productCategory.id === 0}
                        />
                    </div>
                    <div className="flex mt-4 gap-x-3">
                        <FloatingNumberInput
                            label="Giá gốc sản phẩm"
                            value={productPrice}
                            setValue={handleSetProductPrice}
                            input_style="px-3 py-2 border-gray-300 w-full rounded-md"
                            block_style="w-1/2"
                            id={'product-price'}
                        />
                        <FloatingNumberInput
                            label="Giá giảm (nếu có)"
                            value={productCurrentPrice}
                            setValue={handleSetProductCurrentPrice}
                            input_style="px-3 py-2 border-gray-300 w-full rounded-md"
                            block_style="w-1/2"
                            id={'product-current-price'} />
                    </div>
                    <div className="flex mt-4 gap-x-3">
                        <FloatingNumberInput
                            label="Số lượng nhập kho"
                            value={inventory}
                            setValue={handleSetInventory}
                            input_style="px-3 py-2 border-gray-300 w-full rounded-md"
                            block_style="w-full"
                            id={'product-inventory'}
                            normal={true} />
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
                    <div className="w-full grid grid-cols-4 gap-y-2 gap-x-2 border border-gray-300 rounded-md p-2">
                        {
                            uploadImageList && uploadImageList.length > 0 &&
                            uploadImageList.map((image, index) => {
                                if (image.url !== "") {
                                    return (
                                        <div className="w-full h-32 border border-gray-200 relative rounded-md group cursor-pointer" onClick={() => handleDeleteImage(index)}>
                                            <img src={image.url} alt="" className="w-full h-full rounded-md" key={`image-upload-item-${index}`} />
                                            <div className="absolute w-full h-full top-0 bg-black opacity-60 rounded-md items-center justify-center hidden group-hover:flex">
                                                <TbTrash className="text-white w-7 h-7 opacity-100" />
                                            </div>
                                            {
                                                index == 0 &&
                                                <div className="absolute bottom-0 bg-black w-full h-1/5 opacity-50 flex items-center justify-center rounded-b-md">
                                                    <div className="text-white font-normal text-xs tracking-wide">Mặc định</div>
                                                </div>
                                            }
                                        </div>
                                    )
                                }
                                return (
                                    <div key={`image-upload-item-${index}`} className="flex flex-col w-full items-center h-32 justify-center border border-dashed border-gray-300 rounded-md bg-gray-50">
                                        <label htmlFor={`image-${index}`} className="cursor-pointer"><BsFillPlusCircleFill className="w-8 h-8 text-gray-700" /></label>
                                        <input
                                            className="form-control"
                                            type="file"
                                            id={`image-${index}`}
                                            hidden
                                            onChange={(event) => handleUploadImage(index, event.target && event.target.files ? event.target?.files[0] : null)}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="text-gray-400 text-sm mt-2">
                        <div className="font-medium text-red-500 mb-1">(*) Lưu ý:</div>
                        <div>- Chỉ lưu ảnh định dạng JPG, PNG, JPEG</div>
                        <div>- Dung lượng tối đa 2MB</div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <Button styles="px-4 py-2 rounded-lg border border-gray-300 w-fit mt-4" OnClick={() => refreshNewForm()}>Làm mới</Button>
                <Button styles="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 w-fit mt-4" OnClick={() => handleCreateProduct()}>Thêm Sản Phẩm</Button>
            </div>
            {
                isCreating &&
                <div className="absolute w-full h-full bg-black opacity-30 z-[100] inset-0 flex items-center justify-center">
                    <RotatingLines
                        width="80"
                        strokeWidth="5"
                        strokeColor="white"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        visible={true}
                    />
                </div>
            }
        </>
    )
}

export default SellerAddNewProduct;