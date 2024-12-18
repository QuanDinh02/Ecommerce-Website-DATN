import React from "react";
import ReactQuill from 'react-quill';
import { RiEdit2Fill } from "react-icons/ri";
import { HiTrash } from "react-icons/hi2";
import { CurrencyFormat } from "@/utils/numberFormat";
import { IoSearch } from "react-icons/io5";
import Button from "@/components/Button";
import ReactPaginate from "react-paginate";
import { Dropdown } from "@/components/Dropdown";
import CustomizeDropdown from "./CustomizeProduct";
import { useImmer } from "use-immer";
import { ThreeDots } from "react-loader-spinner";
import { deleteProduct, getCategoryList, getProductSearch, getProductsPagination, getSubCategoryByCategory, updateProduct } from "@/services/sellerService";
import LoadImage from "@/components/LoadImage";
import Modal from "@/components/Modal";
import { errorToast1, successToast1 } from "@/components/Toast/Toast";
import { useNavigate } from "react-router-dom";
import FloatingInput from "@/components/Floating/FloatingInput";
import { TfiReload } from "react-icons/tfi";
import { getSubCategoryInfo } from "@/services/subCategoryService";
import FloatingNumberInput from "@/components/Floating/FloatingNumberInput";
import FilterDropdown from "@/components/FilterDropdown";
import CopyClipboard from "@/components/CopyClipboard";
import LoadImageS3 from "@/components/LoadImageS3";

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

interface IProduct {
    id: number
    name: string
    current_price: number
    price: number
    image: string
    sold: number
    quantity: number
    summary: string
    sub_category: ISubCategory
}

interface IData {
    page: number
    page_total: number
    product_list: IProduct[]
    total_items: number
}

interface ISubCategory {
    id: number
    title: string
}

interface ICategory {
    id: number
    title: string
}

const SORT_LIST = [
    {
        id: 0,
        title: "Không theo thứ tự"
    },
    {
        id: 1,
        title: "Giá giảm dần"
    },
    {
        id: 2,
        title: "Giá tăng dần"
    }
];

const tableHeaders = [
    'Mã sản phẩm', 'Tên sản phẩm', '', 'Loại sản phẩm', 'Tồn kho', 'Giá hiện tại', 'Giá', 'Chỉnh sửa'
];

const SHOW_ITEMS = [10, 25, 50];

const SellerProductAll = () => {

    const navigate = useNavigate();

    const [showDeleteBox, setShowDeleteBox] = React.useState<boolean>(false);
    const [showUpdateModal, setShowUpdateModal] = React.useState<boolean>(false);
    const [update, setUpdate] = React.useState<boolean>(false);

    const [deleteProductID, setDeleteProductID] = React.useState<number>(-1);
    const [deleteProductName, setDeleteProductName] = React.useState<string>("");

    const [showItem, setShowItem] = React.useState<number>(10);
    const [dataLoading, setDataLoading] = React.useState<boolean>(true);

    const [sort, setSort] = useImmer({
        id: 0,
        title: "Sắp xếp theo"
    });

    const [search, setSearch] = React.useState<string>("");
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(20);
    const [totalItems, setTotalItems] = React.useState<number>(0);

    const [productList, setProductList] = React.useState<IProduct[]>([]);

    const [productID, setProductID] = React.useState<number>(0);
    const [productImage, setProductImage] = React.useState<string>("");
    const [productName, setProductName] = React.useState<string>("");
    const [productPrice, setProductPrice] = React.useState<number>(0);
    const [productCurrentPrice, setProductCurrentPrice] = React.useState<number>(0);
    const [inventory, setInventory] = React.useState<number>(0);

    const [categoryList, setCategoryList] = React.useState<ICategory[]>([]);
    const [subCategoryList, setSubCategoryList] = React.useState<ISubCategory[]>([]);

    const [productDescription, setProductDescription] = React.useState<string>("");

    const [productCategory, setProductCategory] = useImmer({
        id: 0,
        title: "Chọn danh mục sản phẩm"
    });

    const [productSubCategory, setProductSubCategory] = useImmer({
        id: 0,
        title: "Chọn danh mục sản phẩm con"
    });


    const [categoryListUpdate, setCategoryListUpdate] = React.useState<ICategory[]>([]);
    const [subCategoryListUpdate, setSubCategoryListUpdate] = React.useState<ISubCategory[]>([]);
    const [productCategoryUpdate, setProductCategoryUpdate] = useImmer({
        id: 0,
        title: "Chọn danh mục sản phẩm"
    });
    const [productSubCategoryUpdate, setProductSubCategoryUpdate] = useImmer({
        id: 0,
        title: "Chọn danh mục sản phẩm con"
    });

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1);
        setDataLoading(true);
        // navigate({
        //     pathname: "/category",
        //     search: `?id=${categoryID}&page=${+event.selected + 1}`,

        // }, {
        //     replace: true
        // });
    }

    const fetchProductsPagination = async (limit: number, page: number, category: number, sub_category: number, sort: number) => {
        let response: IData = await getProductsPagination(limit, page, category, sub_category, sort);
        if (response) {
            setProductList(response.product_list);
            setTotalPages(response.page_total);
            setTotalItems(response.total_items);
            setTimeout(() => {
                setDataLoading(false);
            }, 500);
        }
    }

    const handleDeleteProduct = async (product_id: number) => {
        let result = await deleteProduct(product_id);
        if (result) {
            if (result.EC === 0) {
                successToast1(result.EM);
                setShowDeleteBox(false);
                setTimeout(() => {
                    setDataLoading(true);
                    fetchProductsPagination(showItem, currentPage, productCategory.id, productSubCategory.id, sort.id);
                }, 1000);
            } else {
                errorToast1(result.EM);
                return;
            }
        } else {
            return;
        }
    }

    let handleShowDeleteModal = (product_id: number, product_name: string) => {
        setDeleteProductID(product_id);
        setDeleteProductName(product_name);
        setShowDeleteBox(true);
    }

    let handleShowUpdateModal = async (item: IProduct) => {

        setProductID(item.id);
        setProductImage(item.image);
        setProductName(item.name);
        setProductPrice(item.price);
        setProductCurrentPrice(item.current_price);
        setInventory(item.quantity);
        setProductDescription(item.summary);

        if (item.sub_category.id !== null) {
            let subCategoryInfo = await getSubCategoryInfo(item.sub_category.id);

            setProductCategoryUpdate(draft => {
                draft.id = subCategoryInfo.category_info.id;
                draft.title = subCategoryInfo.category_info.title;
            });

            setProductSubCategoryUpdate(draft => {
                draft.id = subCategoryInfo.id;
                draft.title = subCategoryInfo.title;
            });

            let sub_category_list = await getSubCategoryByCategory(subCategoryInfo.category_info.id);
            setSubCategoryListUpdate(sub_category_list);

            setShowUpdateModal(true);
        }

        else {
            setProductCategoryUpdate(draft => {
                draft.id = 0;
                draft.title = "Chọn danh mục sản phẩm";
            });

            setProductSubCategoryUpdate(draft => {
                draft.id = 0;
                draft.title = "Chọn danh mục sản phẩm con";
            });

            fetchCategoryListUpdate();

            setSubCategoryListUpdate([]);

            setShowUpdateModal(true);
        }
    }

    const handleSetProductPrice = (num: any) => {
        if (!isNaN(num) && num >= 0) {
            setProductPrice(+num);
        }
    }

    const handleSetProductCurrentPrice = (num: any) => {
        if (!isNaN(num) && num >= 0) {
            setProductCurrentPrice(+num);
        }
    }

    const handleSetInventory = (num: any) => {
        if (!isNaN(num) && num >= 0) {
            setInventory(num);
        }
    }

    const handleSelectProductCategory = async (category: ICategory) => {
        if (category) {
            setProductCategory(draft => {
                draft.id = category.id;
                draft.title = category.title;
            });

            let sub_category_list = await getSubCategoryByCategory(category.id);
            if (sub_category_list) {
                setSubCategoryList(
                    [
                        {
                            id: 0,
                            title: "Tất Cả"
                        },
                        ...sub_category_list
                    ]
                );
                setProductSubCategory({
                    id: 0,
                    title: "Danh mục con"
                });
            }
        }
    }

    const handleSearchProduct = async () => {
        let response: any = await getProductSearch(+search);
        if (response) {
            setProductList(response.product_list);
            setTimeout(() => {
                setDataLoading(false);
            }, 500);
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (search === "") {
                if (currentPage === 1) {
                    fetchProductsPagination(showItem, 1, productCategory.id, productSubCategory.id, sort.id);
                    return;
                } else {
                    setCurrentPage(1);
                    return;
                }
            }

            if (!isNaN(+search)) {
                handleSearchProduct();
            } else {
                setProductList([]);
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

    const fetchCategoryList = async () => {
        let result = await getCategoryList();
        if (result) {
            setCategoryList(
                [
                    {
                        id: 0,
                        title: "Tất Cả"
                    },
                    ...result
                ]
            );
        }
    }

    const fetchCategoryListUpdate = async () => {
        let result = await getCategoryList();
        if (result) {
            setCategoryListUpdate(result);
        }
    }

    const handleSelectProductCategoryUpdate = async (category: ICategory) => {
        if (category) {
            setProductCategoryUpdate(draft => {
                draft.id = category.id;
                draft.title = category.title;
            });

            let sub_category_list = await getSubCategoryByCategory(category.id);
            if (sub_category_list) {
                setSubCategoryListUpdate(sub_category_list);
            }
        }
    }

    const handleSelectProductSubCategoryUpdate = (sub_category: ICategory) => {
        if (sub_category) {
            setProductSubCategoryUpdate(draft => {
                draft.id = sub_category.id;
                draft.title = sub_category.title;
            })
        }
    }

    const handleUpdateProduct = async () => {

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

        setUpdate(true);

        let data = {
            id: productID,
            name: productName,
            price: productPrice,
            currentPrice: productCurrentPrice,
            quantity: inventory,
            summary: productDescription,
            sub_category_id: productSubCategory.id
        };

        let result = await updateProduct(data);

        if (result) {
            if (result.EC === 0) {
                successToast1(result.EM);
                setUpdate(false);
                fetchProductsPagination(showItem, currentPage, productCategory.id, productSubCategory.id, sort.id);
                setTimeout(() => {
                    setShowUpdateModal(false);
                }, 1000);
            } else {
                errorToast1(result.EM);
                return;
            }
        }
    }

    const handleSelectSort = (sort: ICategory) => {
        if (sort) {
            setSort(draft => {
                draft.id = sort.id;
                draft.title = sort.title;
            });

            setCurrentPage(1);
        }
    }

    React.useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setDataLoading(true);
        fetchProductsPagination(showItem, currentPage, productCategory.id, productSubCategory.id, sort.id);

    }, [currentPage, productCategory, productSubCategory, sort, showItem]);

    React.useEffect(() => {
        setTimeout(() => {
            setDataLoading(false);
        }, 800);
    }, []);

    React.useEffect(() => {
        fetchCategoryList();
    }, []);

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <div className="text-xl">Sản phẩm <span className="text-lg text-gray-400 font-normal">({totalItems} sản phẩm)</span> </div>
                <div className="flex items-center gap-x-4">
                    <div className="w-64 border border-gray-300 py-2 px-3 flex items-center gap-x-2 rounded">
                        <IoSearch className="text-gray-500 w-4 h-4" />
                        <input
                            value={search}
                            type="text"
                            placeholder="Tìm theo mã sản phẩm"
                            className="outline-none w-full"
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={(event) => handleKeyPress(event)}
                        />
                    </div>
                    <Button styles="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 w-fit" OnClick={() => { navigate("/seller-info/product/new"); }}>Thêm Sản Phẩm</Button>
                </div>
            </div>
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-x-3">
                    <div>Hiển thị</div>
                    <Dropdown data={SHOW_ITEMS} value={showItem} setValue={setShowItem} style={"border border-gray-200 h-10 w-20"} />
                    <div>sản phẩm</div>
                </div>
                <div>

                </div>
                <div className="flex items-center gap-x-3">
                    <FilterDropdown
                        data={categoryList}
                        value={productCategory}
                        setValue={handleSelectProductCategory}
                        style="px-3 py-2 rounded border border-gray-300 w-60"
                        id={"product-category"}
                    />
                    <FilterDropdown
                        data={subCategoryList}
                        value={productSubCategory}
                        setValue={handleSelectProductSubCategory}
                        style="px-3 py-2 rounded border border-gray-300 w-60"
                        id={"product-sub-category"}
                        depend={productCategory.id === 0}
                    />
                    <FilterDropdown
                        data={SORT_LIST}
                        value={sort}
                        setValue={handleSelectSort}
                        style="px-3 py-2 rounded border border-gray-300 w-60"
                        id={"sort-category"}
                    />
                </div>
            </div>

            {
                dataLoading ?
                    <div className="flex items-center justify-center w-full h-screen">
                        <ThreeDots
                            height="80"
                            width="80"
                            color="#FCB800"
                            ariaLabel="three-dots-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass="flex items-center justify-center tail-spin"
                            visible={true}
                        />
                    </div>
                    :
                    <>
                        <div className="w-full border rounded-lg">
                            <table className="table-fixed w-full">
                                <thead>
                                    <tr className="border-b border-gray-200 bg-gray-100">
                                        {tableHeaders && tableHeaders.length > 0 &&
                                            tableHeaders.map((item, index) => {
                                                return (
                                                    <th key={`header-${index}`} className="text-left py-3 px-2 font-normal text-gray-600">{item}</th>
                                                )
                                            })
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (productList && productList.length > 0) ?
                                            <>

                                                {productList.map((item, index) => {
                                                    return (
                                                        <tr className="border-b border-gray-200" key={`product-${index}`}>
                                                            <td className="py-3 px-2 text-sm" colSpan={1}>
                                                                <span className="flex items-center gap-x-1">
                                                                    {item.id} <span className="cursor-pointer"><CopyClipboard value={item.id} /></span>
                                                                </span>
                                                            </td>
                                                            <td className="py-3 px-2" colSpan={2}>
                                                                <div className="flex items-center gap-x-2">
                                                                    {/* <LoadImage img_style={"w-16 h-16 rounded-lg"} product_id={item.id} /> */}
                                                                    <LoadImageS3 img_style="w-16 h-16 rounded-lg" img_url={item.image} />
                                                                    <div className="line-clamp-2 flex-1 font-medium text-sm">{item.name}</div>
                                                                </div>
                                                            </td>
                                                            <td className="py-3 px-2" colSpan={1}>
                                                                {item.sub_category.title !== "" &&
                                                                    <span className="px-3 py-0.5 bg-gray-100 text-sm line-clamp-1 rounded-full w-fit">{item.sub_category.title}</span>
                                                                }
                                                            </td>
                                                            <td className="py-3 px-2" colSpan={1}>{item.quantity}</td>
                                                            <td className="py-3 px-2" colSpan={1}><span className="text-gray-600 font-medium">{CurrencyFormat(item.current_price)}</span></td>
                                                            <td className="py-3 px-2" colSpan={1}><span className="text-gray-600 font-medium">{CurrencyFormat(item.price)}</span></td>
                                                            <td className="py-3 px-2" colSpan={1}>
                                                                <div className="flex gap-4 items-center">
                                                                    <div className="w-8 h-8 bg-orange-400 flex items-center justify-center cursor-pointer hover:bg-orange-500 rounded-lg" onClick={() => handleShowUpdateModal(item)}>
                                                                        <RiEdit2Fill className="w-4 h-4 text-white" />
                                                                    </div>
                                                                    <div className="w-8 h-8 bg-red-400 flex items-center justify-center cursor-pointer hover:bg-red-500 rounded-lg" onClick={() => handleShowDeleteModal(item.id, item.name)}>
                                                                        <HiTrash className="w-4 h-4 text-white" />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                                <tr>
                                                    <td colSpan={7}>
                                                        {
                                                            <div className='pagination-review-container my-4 flex justify-center'>
                                                                <ReactPaginate
                                                                    nextLabel=">"
                                                                    onPageChange={handlePageClick}
                                                                    pageRangeDisplayed={5}
                                                                    marginPagesDisplayed={0}
                                                                    pageCount={totalPages}
                                                                    previousLabel="<"
                                                                    pageClassName="page-item"
                                                                    pageLinkClassName="page-link page-background"
                                                                    previousClassName="page-item"
                                                                    previousLinkClassName="page-link pre-next"
                                                                    nextClassName="page-item"
                                                                    nextLinkClassName="page-link pre-next"
                                                                    breakLabel=""
                                                                    breakClassName="page-item"
                                                                    breakLinkClassName="page-link"
                                                                    containerClassName="pagination flex items-center gap-2 "
                                                                    activeLinkClassName="page-active-background"
                                                                    renderOnZeroPageCount={null}
                                                                    forcePage={currentPage - 1}
                                                                />
                                                            </div>
                                                        }
                                                    </td>
                                                </tr>
                                            </>
                                            :
                                            <tr>
                                                <td className="text-center py-3" colSpan={7}>
                                                    <div className="w-full text-gray-500 text-center py-2">Không có dữ liệu !</div>
                                                </td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
            }
            <Modal show={showDeleteBox} setShow={setShowDeleteBox} size="delete-confirmation-box">
                <div className="delete-confirmation-box w-full h-full relative flex flex-col justify-between">
                    <div className="text-xl mt-2">Bạn muốn xóa sản phẩm <span className="font-medium">{deleteProductName}</span> ?</div>
                    <div className="flex items-center justify-end gap-x-2 transition-all">
                        <Button styles="rounded-[4px] px-8 py-2 text-black hover:bg-gray-200 cursor-pointer duration-200" OnClick={() => setShowDeleteBox(false)}>Hủy</Button>
                        <Button styles="rounded-[4px] px-8 py-2 bg-red-500 text-white hover:bg-red-600 cursor-pointer duration-200" OnClick={() => handleDeleteProduct(deleteProductID)}>Xóa</Button>
                    </div>
                </div>
            </Modal>
            <Modal show={showUpdateModal} setShow={setShowUpdateModal} size="update-modal">
                <div className="flex flex-col h-full relative">
                    <div className="text-xl font-bold text-orange-400 mb-8">Cập nhật Sản Phẩm</div>
                    <div className="flex gap-x-4 flex-1 mb-2">
                        <div className="w-1/2">
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
                                    data={categoryListUpdate}
                                    value={productCategoryUpdate}
                                    setValue={handleSelectProductCategoryUpdate}
                                    style="px-3 py-2 rounded-md border border-gray-300 w-1/2"
                                    id={"product-category"}
                                    label={"Danh mục sản phẩm"}
                                />
                                <CustomizeDropdown
                                    data={subCategoryListUpdate}
                                    value={productSubCategoryUpdate}
                                    setValue={handleSelectProductSubCategoryUpdate}
                                    style="px-3 py-2 rounded-md border border-gray-300 w-1/2"
                                    id={"product-sub-category"}
                                    label={"Danh mục sản phẩm (con)"}
                                    depend={productCategoryUpdate.id === 0}
                                />
                            </div>
                            <div className="flex mt-4 gap-x-3">
                                <FloatingNumberInput
                                    label="Giá sản phẩm"
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
                                    label="Tồn kho"
                                    value={inventory}
                                    setValue={handleSetInventory}
                                    input_style="px-3 py-2 border-gray-300 w-full rounded-md"
                                    block_style="w-full"
                                    id={'product-inventory'}
                                    normal={true} />
                            </div>

                            <div className="font-medium mt-6 mb-4 text-sm">ẢNH SẢN PHẨM</div>
                            <div className="w-full grid grid-cols-4 gap-y-2 gap-x-2 border border-gray-300 rounded-md p-2">
                                <div className="w-full h-32 border border-gray-200 relative rounded-md group cursor-pointer">
                                    {/* <LoadImage img_style="w-full h-full rounded-md" product_id={productID} /> */}
                                    <LoadImageS3 img_style="w-full h-full rounded-lg" img_url={productImage} />
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="font-medium mb-1 text-sm">MÔ TẢ SẢN PHẨM</div>
                            <ReactQuill
                                theme="snow"
                                value={productDescription}
                                onChange={setProductDescription} className="w-full mt-4 "
                                modules={MODULE}
                            />

                        </div>
                    </div>
                    <div className="flex items-center justify-between sticky bottom-0 w-full bg-white border-t border-gray-200">
                        <Button styles="px-4 py-2 rounded-lg bg-orange-400 text-white hover:bg-orange-500 w-fit mt-4 " OnClick={() => handleUpdateProduct()}>
                            <div className="text-black font-medium flex items-center gap-x-2">{update && <TfiReload className="animate-spin" />} Cập nhật</div>
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default SellerProductAll;