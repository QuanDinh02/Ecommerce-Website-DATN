import { addProductToCategoryShop, getCategoryList, getShopCategoryDetailExist, getShopCategoryDetailNotExist, removeProductOutCategoryShop } from "@/services/sellerService";
import React from "react";
import { ThreeDots } from "react-loader-spinner";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import { useImmer } from "use-immer";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { errorToast1, successToast1 } from "@/components/Toast/Toast";
import { getSubCategoryByCategory } from "@/services/subCategoryService";
import FilterDropdown from "@/components/FilterDropdown";
import LoadImageS3 from "@/components/LoadImageS3";

const PRODUCT_DISPLAY_LIMIT = 50;

interface IProduct {
    id: number
    name: string
    image: string
}

interface IExistProduct {
    id: number
    name: string
    index: number
    image: string
}

interface IProductListFetch {
    page: number
    page_total: number
    total_items: number
    product_list: IProduct[]
}

interface ICategory {
    id: number
    title: string
}

interface ISubCategory {
    id: number
    title: string
}

const ShopCategoryDetail = () => {

    const [searchParams] = useSearchParams();
    const [dataLoading, setDataLoading] = React.useState<boolean>(false);

    const [productList, setProductList] = useImmer<IProduct[] | IExistProduct[]>([]);

    const [shopCategoryID, setShopCategoryID] = React.useState<number>(0);
    const [shopCategoryName, setShopCategoryName] = React.useState<string>("");

    const [currentPageExist, setCurrentPageExist] = React.useState<number>(1);
    const [currentPageNotExist, setCurrentPageNotExist] = React.useState<number>(1);

    const [categoryList, setCategoryList] = React.useState<ICategory[]>([]);
    const [subCategoryList, setSubCategoryList] = React.useState<ISubCategory[]>([]);

    const [isExist, setIsExist] = React.useState<boolean>(true);

    const [totalPages, setTotalPages] = React.useState<number>(20);
    const [totalItems, setTotalItems] = React.useState<number>(0);

    const [tabs, setTabs] = useImmer([
        {
            id: 1,
            name: "Sản phẩm trong danh mục",
            selected: true
        },
        {
            id: 2,
            name: "Sản phẩm của shop",
            selected: false
        }
    ]);

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

    const handleSelectProductSubCategory = (sub_category: ISubCategory) => {
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

    const fetchProductExistInCategory = async () => {
        let result: IProductListFetch = await getShopCategoryDetailExist(shopCategoryID, currentPageExist, PRODUCT_DISPLAY_LIMIT);
        if (result) {
            setTotalPages(result.page_total);
            setTotalItems(result.total_items);
            setProductList(result.product_list);
            setTimeout(() => {
                setDataLoading(false);
            }, 300);
        }
    }

    const fetchProductNotExistInCategory = async () => {
        let result: IProductListFetch = await getShopCategoryDetailNotExist(currentPageNotExist, PRODUCT_DISPLAY_LIMIT, productCategory.id, productSubCategory.id);
        if (result) {
            setTotalPages(result.page_total);
            setTotalItems(result.total_items);
            setProductList(result.product_list);
            setTimeout(() => {
                setDataLoading(false);
            }, 300);
        }
    }

    const hanldeSetActiveTab = (id: number) => {
        setTabs(draft => {
            draft.forEach(item => {
                if (item.id === id) {
                    item.selected = true;
                } else {
                    item.selected = false;
                }
            });
        });

        setIsExist(id === 1 ? true : false);
    }

    const handlePageClickExist = (event) => {
        setCurrentPageExist(+event.selected + 1);
        setDataLoading(true);
    }

    const handlePageClickNotExist = (event) => {
        setCurrentPageNotExist(+event.selected + 1);
        setDataLoading(true);
    }

    const handleAddProductToCategory = async (product_id: number) => {
        let result = await addProductToCategoryShop(shopCategoryID, product_id);
        if (result) {
            if (result.EC === 0) {
                successToast1(result.EM);
            } else {
                errorToast1(result.EM);
            }
        }
    }

    const handleRemoveProductCategory = async (product_id: number, index: number) => {
        let result = await removeProductOutCategoryShop(index);
        if (result) {
            if (result.EC === 0) {
                successToast1(result.EM);
                setProductList(draft => {
                    return draft.filter(product => product.id !== product_id);
                });
                setTotalItems(totalItems - 1);
            } else {
                errorToast1(result.EM);
            }
        }
    }

    React.useEffect(() => {
        fetchCategoryList();
    }, []);

    React.useEffect(() => {
        if (shopCategoryID !== 0) {
            setDataLoading(true);
            fetchProductExistInCategory();
        }
    }, [shopCategoryID]);

    React.useEffect(() => {
        if (tabs[0].selected && shopCategoryID !== 0) {
            setDataLoading(true);
            fetchProductExistInCategory();
        }

        if (tabs[1].selected && shopCategoryID !== 0) {
            setDataLoading(true);
            fetchProductNotExistInCategory();
        }
    }, [tabs]);

    React.useEffect(() => {

        if (tabs[1].selected) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            fetchProductNotExistInCategory();
        }

    }, [currentPageNotExist]);

    React.useEffect(() => {
        if (tabs[1].selected) {
            fetchProductNotExistInCategory();
        }
    }, [productCategory, productSubCategory]);

    React.useEffect(() => {

        let shop_category_id = searchParams.get('id');
        let activeShopCategoryID: number = shop_category_id ? +shop_category_id : 0;
        if (activeShopCategoryID !== shopCategoryID) {
            setShopCategoryID(activeShopCategoryID);
        }

    }, [searchParams.get('id')]);

    React.useEffect(() => {

        let shop_category_id = searchParams.get('name');
        let activeShopCategoryName: string = shop_category_id ? shop_category_id : "";
        if (activeShopCategoryName !== shopCategoryName) {
            setShopCategoryName(activeShopCategoryName);
        }

    }, [searchParams.get('name')]);

    return (
        <div className="shop-category-detail-container">
            <div className="shop-category-detail__title pb-2 flex items-center justify-between">
                <div className="title text-xl font-medium">{shopCategoryName}</div>
            </div>
            <div className="flex items-center mb-5 border-b border-gray-200">
                {
                    tabs && tabs.length > 0 &&
                    tabs.map((item, index) => {
                        if (item.selected) {
                            return (
                                <div className="px-5 py-2 border-b-2 border-[#FCB800] text-[#FCB800] font-medium cursor-pointer" key={`detail-${item.id}`}>{item.name}</div>
                            )
                        }
                        return (
                            <div
                                className="px-5 py-2 border-b-2 border-white cursor-pointer"
                                key={`detail-${item.id}`}
                                onClick={() => hanldeSetActiveTab(item.id)}
                            >{item.name}</div>
                        )
                    })
                }
            </div>
            <div className="flex items-center justify-between mb-6">
                <div>Tổng <span className="font-medium text-red-500">{totalItems}</span> sản phẩm</div>
                {
                    tabs[1].selected &&
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
                    </div>
                }
            </div>
            {
                dataLoading ?
                    <div className="flex items-center justify-center w-full">
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
                            tabs[0].selected ?
                                <>
                                    <div className="grid grid-cols-2 gap-y-4 gap-x-6 mt-5 mb-4">
                                        {
                                            productList && productList.length > 0 &&
                                            productList.map((product, index) => {
                                                return (
                                                    <div key={`product-exist-${index}`} className="flex items-center justify-between border-b border-gray-200 p-2 hover:bg-gray-50">
                                                        <div className="w-full flex items-center justify-between">
                                                            <div className="flex gap-x-2 w-2/3">
                                                                <LoadImageS3 img_style="w-12 h-12" img_url={product.image} />
                                                                <div><span className="text-sm line-clamp-2">{product.name}</span></div>
                                                            </div>
                                                            <FiMinusCircle className="w-6 h-6 transition duration-300 text-gray-400 hover:text-red-500 cursor-pointer hover:scale-110" onClick={() => handleRemoveProductCategory(product.id, product.index)} />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='pagination-review-container my-4 flex justify-center'>
                                        <ReactPaginate
                                            nextLabel=">"
                                            onPageChange={handlePageClickExist}
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
                                            forcePage={currentPageExist - 1}
                                        />
                                    </div>
                                </>
                                :
                                <>
                                    <div className="grid grid-cols-2 gap-y-4 gap-x-6 mt-5 mb-4">
                                        {
                                            productList && productList.length > 0 &&
                                            productList.map((product, index) => {
                                                return (
                                                    <div key={`product-not-exist-${index}`} className="flex items-center justify-between border-b border-gray-200 p-2 hover:bg-gray-50">
                                                        <div className="w-full flex items-center justify-between">
                                                            <div className="flex gap-x-2 w-2/3">
                                                                <LoadImageS3 img_style="w-12 h-12" img_url={product.image} />
                                                                <div><span className="text-sm line-clamp-2">{product.name}</span></div>
                                                            </div>
                                                            <FiPlusCircle className="w-6 h-6 transition duration-300 text-gray-400 hover:text-green-600 cursor-pointer hover:scale-110" onClick={() => handleAddProductToCategory(product.id)} />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='pagination-review-container my-4 flex justify-center'>
                                        <ReactPaginate
                                            nextLabel=">"
                                            onPageChange={handlePageClickNotExist}
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
                                            forcePage={currentPageNotExist - 1}
                                        />
                                    </div>
                                </>
                        }
                    </>
            }

        </div>
    )
}

export default ShopCategoryDetail;