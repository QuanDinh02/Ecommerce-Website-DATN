import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { errorToast1, successToast1 } from "@/components/Toast/Toast";
import { createShopCategory, editShopCategory, getShopCategory, removeShopCategory } from "@/services/sellerService";
import React from "react";
import { FiPlus, FiEdit, FiTrash } from "react-icons/fi";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useImmer } from "use-immer";

interface IShopCategory {
    id: number
    title: string
    quantity: number
}

const ShopCategory = () => {

    const navigate = useNavigate();

    const [dataLoading, setDataLoading] = React.useState<boolean>(true);

    const [categoryList, setCategoryList] = useImmer<IShopCategory[]>([]);

    const [showAddNewModal, setShowAddNewModal] = React.useState<boolean>(false);
    const [showUpdateModal, setShowUpdateModal] = React.useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);

    const [newCategory, setNewCategory] = React.useState<string>("");
    const [updateCategory, setUpdateCategory] = useImmer<IShopCategory>({
        id: 0,
        title: "",
        quantity: 0
    });
    const [deleteCategory, setDeleteCategory] = React.useState<IShopCategory>({
        id: 0,
        title: "",
        quantity: 0
    });

    const handleCloseAddNewModal = (active: boolean) => {
        setNewCategory("");
        setShowAddNewModal(active)
    }

    const handleCloseUpdateModal = (active: boolean) => {
        setUpdateCategory({
            id: 0,
            title: "",
            quantity: 0
        });
        setShowUpdateModal(active)
    }

    const handleCloseDeleteModal = (active: boolean) => {
        setDeleteCategory({
            id: 0,
            title: "",
            quantity: 0
        });
        setShowDeleteModal(active)
    }

    const handleOnChangeEdit = (value: string) => {
        setUpdateCategory(draft => {
            draft.title = value;
        })
    }

    const handleShowDeleteModal = (value: IShopCategory) => {
        setDeleteCategory(value);
        setShowDeleteModal(true);
    }

    const handleShowUpdateModal = (value: IShopCategory) => {
        setUpdateCategory(value);
        setShowUpdateModal(true);
    }

    const fetchShopCategory = async () => {
        let data = await getShopCategory();
        if (data) {
            setCategoryList(data);
            setTimeout(() => {
                setDataLoading(false);
            }, 300);
        }
    }

    const createNewShopCategory = async () => {
        let res = await createShopCategory(newCategory);
        if (res) {
            if (res.EC === 0) {
                successToast1(res.EM);
                setCategoryList([...categoryList, res.DT]);
                handleCloseAddNewModal(false);
            } else {
                errorToast1(res.EM);
                handleCloseAddNewModal(false);
            }
        }
    }

    const updateShopCategory = async () => {
        let res = await editShopCategory(updateCategory.id, updateCategory.title);
        if (res) {
            if (res.EC === 0) {
                successToast1(res.EM);
                setCategoryList(draft => {
                    draft.forEach(category => {
                        if (category.id === updateCategory.id) {
                            category.title = updateCategory.title;
                        }
                    })
                })
                handleCloseUpdateModal(false);
            } else {
                errorToast1(res.EM);
                handleCloseUpdateModal(false);
            }
        }
    }

    const deleteShopCategory = async () => {
        let res = await removeShopCategory(deleteCategory.id);
        if (res) {
            if (res.EC === 0) {
                successToast1(res.EM);
                setCategoryList(draft => {
                    return draft.filter(category => category.id !== deleteCategory.id);
                })
                handleCloseDeleteModal(false);
            } else {
                errorToast1(res.EM);
                handleCloseDeleteModal(false);
            }
        }
    }

    const handleShowCategoryDetail = (category_id: number, category_title: string) => {
        navigate({
            pathname: "/seller-info/shop/category/detail",
            search: `?id=${category_id}&name=${category_title}`,
        });
    }

    React.useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        fetchShopCategory();
    }, []);

    return (
        <>
            <div className="shop-category-container">
                <div className="shop-category__title pb-5 border-b border-gray-300 flex items-center justify-between">
                    <div className="title text-xl">Danh mục sản phẩm</div>
                    <Button styles="bg-green-600 text-white px-3 py-1.5 flex items-center justify-center gap-x-2 rounded hover:bg-green-500 transition duration-200" OnClick={() => setShowAddNewModal(true)}><FiPlus className="w-5 h-5" /> Thêm</Button>
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
                            {
                                ((categoryList && categoryList.length > 0) ?
                                    <div className="grid grid-cols-2 gap-y-4 gap-x-6 mt-5">
                                        {
                                            categoryList.map((category, index) => {
                                                return (
                                                    <div
                                                        key={`category-${index}`}
                                                        className="flex items-center justify-between border-b border-gray-200 p-2 cursor-pointer hover:bg-gray-50"
                                                        onClick={() => handleShowCategoryDetail(category.id, category.title)}
                                                    >
                                                        <div>
                                                            <div className="font-medium">{category.title}</div>
                                                            <div className="text-gray-500 text-sm">Số lượng: {category.quantity}</div>
                                                        </div>
                                                        <div className="flex items-center gap-x-4">
                                                            <FiEdit className="cursor-pointer w-5 h-5 text-gray-400 hover:text-orange-500 transition duration-200" onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleShowUpdateModal(category);
                                                            }} />
                                                            <FiTrash className="cursor-pointer w-5 h-5 text-gray-400 hover:text-red-500 transition duration-200" onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleShowDeleteModal(category);
                                                            }} />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                    :
                                    <div className="w-full text-lg text-center my-10">Không có danh mục!</div>)
                            }
                        </>
                }
            </div>
            <Modal show={showAddNewModal} setShow={handleCloseAddNewModal} size="form-box">
                <div className="delete-confirmation-box w-full h-full relative flex flex-col justify-between">
                    <div className="text-xl">Thêm danh mục</div>
                    <div className="mt-4 mb-12">
                        <div className="font-medium mb-1">Tên danh mục</div>
                        <input type="text" className="form_input" value={newCategory} onChange={(e) => setNewCategory((e.target.value))} />
                    </div>
                    <div className="flex items-center justify-end gap-x-2 transition-all">
                        <Button styles="rounded px-8 py-2 text-black cursor-pointer duration-200 border border-gray-300 hover:bg-gray-100" OnClick={() => handleCloseAddNewModal(false)}>Hủy</Button>
                        <Button styles="rounded px-8 py-2 bg-green-600 hover:bg-green-500 text-white cursor-pointer duration-200" OnClick={() => createNewShopCategory()}>Thêm</Button>
                    </div>
                </div>
            </Modal>
            <Modal show={showUpdateModal} setShow={handleCloseUpdateModal} size="form-box">
                <div className="delete-confirmation-box w-full h-full relative flex flex-col justify-between">
                    <div className="text-xl">Chỉnh sửa danh mục</div>
                    <div className="mt-4 mb-12">
                        <div className="font-medium mb-1">Tên danh mục</div>
                        <input type="text" className="form_input" value={updateCategory.title} onChange={(e) => handleOnChangeEdit((e.target.value))} />
                    </div>
                    <div className="flex items-center justify-end gap-x-2 transition-all">
                        <Button styles="rounded px-8 py-2 text-black cursor-pointer duration-200 border border-gray-300 hover:bg-gray-100" OnClick={() => handleCloseUpdateModal(false)}>Hủy</Button>
                        <Button styles="rounded px-8 py-2 bg-[#FCB800] font-medium cursor-pointer duration-200" OnClick={() => updateShopCategory()}>Lưu</Button>
                    </div>
                </div>
            </Modal>
            <Modal show={showDeleteModal} setShow={handleCloseDeleteModal} size="form-box">
                <div className="delete-confirmation-box w-full h-full relative flex flex-col justify-between">
                    <div className="text-xl pb-2 border-b border-gray-300">Xác nhận</div>
                    <div className="mt-4 mb-12">
                        <div className="mb-1 text-lg">Bạn có muốn xóa danh mục <span className="font-medium">{deleteCategory.title}</span> ?</div>
                    </div>
                    <div className="flex items-center justify-end gap-x-2 transition-all">
                        <Button styles="rounded px-8 py-2 text-black cursor-pointer duration-200 border border-gray-300 hover:bg-gray-100" OnClick={() => handleCloseDeleteModal(false)}>Hủy</Button>
                        <Button styles="rounded px-8 py-2 bg-red-500 hover:bg-red-600 text-white cursor-pointer duration-200" OnClick={() => deleteShopCategory()}>Xóa</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ShopCategory;