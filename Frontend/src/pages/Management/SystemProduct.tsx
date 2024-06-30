import CopyClipboard from "@/components/CopyClipboard";
import { getAnalysisProduct, getAnalysisProductSearch } from "@/services/adminService";
import { getCategoryList } from "@/services/categoryService";
import { getSubCategoryByCategory } from "@/services/subCategoryService";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { ThreeDots } from "react-loader-spinner";
import ReactPaginate from "react-paginate";
import { useImmer } from "use-immer";
import FilterDropdown from "@/components/FilterDropdown";
import { MdFilterList } from "react-icons/md";
import { FaSortAlphaDown } from "react-icons/fa";
import { Dropdown } from "@/components/Dropdown";

const prductTableHeaders = [
    {
        name: "#",
        size: 1,
        style: "",
    },
    {
        name: "Mã sản phẩm",
        size: 1,
        style: "",
    },
    {
        name: "Tên sản phẩm",
        size: 2,
        style: "",
    },
    {
        name: "Lượt xem",
        size: 1,
        style: "text-center",
    },
    {
        name: "Lượt đề xuất",
        size: 1,
        style: "text-center",
    },
    {
        name: "Lượt xem khi đề xuất",
        size: 1,
        style: "text-center",
    },
];

interface IAnalysisProduct {
    id: number
    name: number
    view: number
    recommend: number
    recommend_view: number
}

interface IData {
    page: number
    page_total: number
    total_items: number
    analysis_product_list: IAnalysisProduct[]
}

interface ICategory {
    id: number
    title: string
}

const SORT_LIST = [
    {
        id: 1,
        title: "Lượt xem tăng dần"
    },
    {
        id: 2,
        title: "Lượt xem giảm dần"
    },
    {
        id: 3,
        title: "Lượt đề xuất tăng dần"
    },
    {
        id: 4,
        title: "Lượt đề xuất giảm dần"
    }
];

const SHOW_ITEMS = [10, 25, 50];

const SystemProduct = () => {

    const [search, setSearch] = React.useState<string>("");

    const [dataLoading, setDataLoading] = React.useState<boolean>(true);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalItems, setTotalItems] = React.useState<number>(0);
    const [totalPages, setTotalPages] = React.useState<number>(20);

    const [analysisProductList, setAnalysisProductList] = React.useState<IAnalysisProduct[]>([]);
    const [showItem, setShowItem] = React.useState<number>(10);

    const [categoryList, setCategoryList] = React.useState<ICategory[]>([]);
    const [subCategoryList, setSubCategoryList] = React.useState<ICategory[]>([]);

    const [sort, setSort] = useImmer({
        id: 0,
        title: "Sắp xếp theo"
    });

    const [productCategory, setProductCategory] = useImmer({
        id: 0,
        title: "Danh mục"
    });

    const [productSubCategory, setProductSubCategory] = useImmer({
        id: 0,
        title: "Danh mục con"
    });

    const fetchCategoryList = async () => {
        let result = await getCategoryList();
        if (result) {
            setCategoryList(result);
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
                setSubCategoryList(sub_category_list);
                setProductSubCategory({
                    id: 0,
                    title: "Danh mục con"
                });
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

    const handleSelectSort = (sort: ICategory) => {
        if (sort) {
            setSort(draft => {
                draft.id = sort.id;
                draft.title = sort.title;
            });

            setCurrentPage(1);
        }
    }

    const fetchAnalysisProduct = async (limit: number, page: number, category: number, sub_category: number, sort: number) => {
        let response: IData = await getAnalysisProduct(limit, page, category, sub_category, sort);
        if (response) {
            setAnalysisProductList(response.analysis_product_list);
            setTotalPages(response.page_total);
            setTotalItems(response.total_items);
            setTimeout(() => {
                setDataLoading(false);
            }, 500);
        }
    }

    const handleSearchAnanlysisProduct = async () => {
        let response: any = await getAnalysisProductSearch(+search);
        if (response) {
            setAnalysisProductList(response);
            setTimeout(() => {
                setDataLoading(false);
            }, 500);
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (search === "") {
                if (currentPage === 1) {
                    fetchAnalysisProduct(showItem, 1, productCategory.id, productSubCategory.id, sort.id);
                    return;
                } else {
                    setCurrentPage(1);
                    return;
                }
            }

            if (!isNaN(+search)) {
                handleSearchAnanlysisProduct();
            } else {
                setAnalysisProductList([]);
            }
        }
    }

    const handlePageClick = (event) => {
        setDataLoading(true);
        setCurrentPage(+event.selected + 1);
    }

    React.useEffect(() => {

        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setDataLoading(true);
        fetchAnalysisProduct(showItem, currentPage, productCategory.id, productSubCategory.id, sort.id);

    }, [currentPage, productCategory, productSubCategory, sort, showItem]);

    React.useEffect(() => {
        fetchCategoryList();
    }, []);

    return (
        <div className="py-4 px-5 bg-white">
            <div className="search-bar mb-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="text-xl w-1/3">Phân tích sản phẩm</div>
                    <div className="w-1/3 h-10 bg-white py-2 px-3 flex items-center gap-x-3 border border-gray-300 rounded">
                        <IoSearch className="text-gray-500 w-5 h-5" />
                        <input
                            value={search}
                            type="text"
                            placeholder="Tìm theo mã sản phẩm"
                            className="outline-none w-full text-sm rounded"
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={(event) => handleKeyPress(event)}
                        />
                    </div>
                </div>
                <div className="filter-bar w-full">
                    <div className="mb-4 flex items-center">
                        <div className="flex items-center gap-x-3 w-1/2">
                            <div className="flex items-center gap-x-1"><MdFilterList /> Filter by: </div>
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
                        <div className="flex items-center gap-x-3 w-1/2 justify-end">
                            <div className="flex items-center gap-x-1"><FaSortAlphaDown /> Sort by: </div>
                            <FilterDropdown
                                data={SORT_LIST}
                                value={sort}
                                setValue={handleSelectSort}
                                style="px-3 py-2 rounded border border-gray-300 w-60"
                                id={"sort-category"}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-x-3 mb-4">
                        <div>Hiển thị</div>
                        <Dropdown data={SHOW_ITEMS} value={showItem} setValue={setShowItem} style={"border border-gray-200 h-10 w-20"} />
                        <div>sản phẩm</div>
                    </div>
                </div>
            </div>
            <div>
                {
                    dataLoading ?
                        <div className="flex items-center justify-center w-full h-full">
                            <ThreeDots
                                height="60"
                                width="60"
                                color="#9ca3af"
                                ariaLabel="three-dots-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass="flex items-center justify-center tail-spin"
                                visible={true}
                            />
                        </div>
                        :
                        <table className="table-fixed w-full mb-8">
                            <thead>
                                <tr className='bg-gray-100 border-b-10 border-white'>
                                    {prductTableHeaders && prductTableHeaders.length > 0 &&
                                        prductTableHeaders.map((item, index) => {
                                            return (
                                                <th key={`header-${index}`} className={`text-left py-3 px-3 font-medium ${item.style}`} colSpan={item.size}>{item.name}</th>
                                            )
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (analysisProductList && analysisProductList.length > 0) ?
                                        <>

                                            {analysisProductList.map((item, index) => {
                                                return (
                                                    <tr className="border-b border-gray-200 text-sm hover:bg-gray-100" key={`product-${index}`}>
                                                        <td className="py-4 px-3" colSpan={1}>{index + 1 + showItem * (currentPage - 1)}</td>
                                                        <td className="py-4 px-3 " colSpan={1}>
                                                            <span className="flex items-center gap-x-1">
                                                                {item.id} <span className="cursor-pointer"><CopyClipboard value={item.id} /></span>
                                                            </span>
                                                        </td>
                                                        <td className="py-4 px-3" colSpan={2}>
                                                            <span className="line-clamp-2">{item.name}</span>
                                                        </td>
                                                        <td className="py-4 px-3 text-center" colSpan={1}>
                                                            <span>{item.view}</span>
                                                        </td>
                                                        <td className="py-4 px-3 text-center" colSpan={1}>
                                                            <span>{item.recommend}</span>
                                                        </td>
                                                        <td className="py-4 px-3 text-center" colSpan={1}>
                                                            <span>{item.recommend_view}</span>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                            <tr>
                                                <td colSpan={7}>
                                                    {
                                                        <div className='pagination-sys-container my-4 flex justify-center'>
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
                }
            </div>
        </div>
    )
}

export default SystemProduct;