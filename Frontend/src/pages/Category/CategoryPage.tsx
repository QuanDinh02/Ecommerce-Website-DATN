import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowForwardIos, MdKeyboardArrowDown, MdCancel } from "react-icons/md";
import { CategoryItems } from "@/data/category";
import { useImmer } from "use-immer";
import { FaCheck } from "react-icons/fa6";
import { GoStarFill } from "react-icons/go";
import { BsGrid3X3 } from "react-icons/bs";
import { TfiViewListAlt } from "react-icons/tfi";
import { productsByCategory } from "@/data/category";
import { CurrencyFormat, numberKFormat } from '@/utils/numberFormat';
import { TbMinusVertical } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const CategoryPage = () => {

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [totalPages, setTotalPages] = React.useState<number>(20);

    const [filterItems, setFilterItems] = useImmer([
        {
            id: 1,
            name: "Apple",
            check: false
        },
        {
            id: 2,
            name: "Samsung",
            check: false
        },
        {
            id: 3,
            name: "Logitech",
            check: false
        },
        {
            id: 4,
            name: "HP",
            check: false
        },
        {
            id: 5,
            name: "Oppo",
            check: false
        },
    ]);

    const [arrangement, setArrangement] = useImmer([
        {
            id: 1,
            label: "Phổ Biến",
            selected: true
        },
        {
            id: 2,
            label: "Mới Nhất",
            selected: false
        },
        {
            id: 3,
            label: "Bán Chạy",
            selected: false
        },
    ]);

    const [priceArrangement, setPriceArrangement] = React.useState<string>("Giá");

    const [itemGrid, setItemGrid] = React.useState<boolean>(true);

    const handleFilter = (id: number) => {
        setFilterItems(draft => {
            draft.forEach(item => {
                if (item.id === id) {
                    item.check = !item.check;
                }
            })
        })
    }

    const handleArrangement = (id: number) => {
        setArrangement(draft => {
            draft.forEach(item => {
                if (item.id === id) {
                    item.selected = true;
                }
                else {
                    item.selected = false;
                }
            })
        })
    }

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1);
    }

    return (
        <div className="category-container">
            <div className="category__breadcrumb border-b border-gray-300">
                <div className="breadcrumb-content w-[80rem] mx-auto px-[30px] py-4 flex items-center gap-2">
                    <div onClick={() => navigate("/")} className="cursor-pointer hover:underline">Trang chủ</div>
                    <MdOutlineArrowForwardIos />
                    <div className="font-medium cursor-pointer hover:underline">Điện thoại/ Thiết bị</div>
                </div>
            </div>
            <div className="category__content mt-4 mb-24">
                <div className="main w-[80rem] mx-auto px-[30px] flex gap-x-3">
                    <div className="main__filter-sidebar w-60 px-4 py-3 rounded-[4px] bg-[#EEEEEE] h-fit">
                        <div className="section">
                            <div className="section__title text-lg mb-3">Danh mục sản phẩm</div>
                            {CategoryItems.map((item, index) => {
                                return (
                                    <div key={`category-item-${index}`} className="mb-2 duration-300 hover:text-[#FCB800] cursor-pointer">{item}</div>
                                )
                            })}
                            <div className="flex items-center gap-1 cursor-pointer font-medium text-[#FCB800] hover:underline">Xem thêm <MdKeyboardArrowDown /></div>
                        </div>
                        <div className="section-breakline border-t border-gray-300 my-4"></div>
                        <div className="section">
                            <div className="section__title text-lg mb-3">Thương hiệu</div>
                            {filterItems.map((item, index) => {
                                return (
                                    <div key={`category-item-${index}`} className="mb-2 duration-300 group cursor-pointer flex items-center gap-x-2" onClick={() => handleFilter(item.id)}>
                                        {
                                            item.check ?
                                                <>
                                                    <div className="w-5 h-5 border-2 rounded-[2px] bg-white border-[#FCB800] flex items-center justify-center"><FaCheck className="w-4 h-4 text-[#FCB800]" /></div>
                                                    <div className="group-hover:text-[#FCB800]">{item.name}</div>
                                                </>
                                                :
                                                <>
                                                    <div className="w-5 h-5 border-2 border-gray-300 rounded-[2px] bg-white group-hover:border-[#FCB800]"></div>
                                                    <div className="group-hover:text-[#FCB800]">{item.name}</div>
                                                </>
                                        }
                                    </div>
                                )
                            })}
                            <div className="flex items-center gap-1 cursor-pointer font-medium text-[#FCB800] hover:underline">Xem thêm <MdKeyboardArrowDown /></div>
                        </div>
                        <div className="section-breakline border-t border-gray-300 my-4"></div>
                        <div className="section">
                            <div className="section__title text-lg mb-3">Chọn khoảng giá</div>
                            <div className="flex items-center gap-x-2">
                                <input type="text" className="border border-gray-300 bg-white px-3 py-2 text-sm w-1/2 rounded-[4px]" placeholder="Tối thiểu" />
                                <div>-</div>
                                <input type="text" className="border border-gray-300 bg-white px-3 py-2 text-sm w-1/2 rounded-[4px]" placeholder="Tối đa" />
                            </div>
                            <div className="my-2 w-full py-2 text-center border-2 rounded-[4px] border-[#FCB800] bg-white text-[#FCB800] hover:bg-[#FCB800] hover:text-white cursor-pointer">Áp dụng</div>
                        </div>
                        <div className="section-breakline border-t border-gray-300 my-4"></div>
                        <div className="section">
                            <div className="section__title text-lg mb-3">Đánh giá</div>
                            <div className="ratings-filter">
                                <div className="5-stars flex items-center gap-x-4 cursor-pointer group mb-1">
                                    <div className="flex items-center gap-x-1 bg-yellow-100 p-1 rounded-[4px] border border-[#FCB800]">
                                        <GoStarFill className="text-[#FCB800]" />
                                        <GoStarFill className="text-[#FCB800]" />
                                        <GoStarFill className="text-[#FCB800]" />
                                        <GoStarFill className="text-[#FCB800]" />
                                        <GoStarFill className="text-[#FCB800]" />
                                    </div>
                                    <div className="text-gray-400">Từ 5 sao</div>
                                </div>
                                <div className="4-stars flex items-center gap-x-4 cursor-pointer group mb-1">
                                    <div className="flex items-center gap-x-1 p-1">
                                        <GoStarFill className="text-[#FCB800]" />
                                        <GoStarFill className="text-[#FCB800]" />
                                        <GoStarFill className="text-[#FCB800]" />
                                        <GoStarFill className="text-[#FCB800]" />
                                        <GoStarFill className="text-gray-400" />
                                    </div>
                                    <div className="text-gray-400">Từ 4 sao</div>
                                </div>
                                <div className="3-stars flex items-center gap-x-4 cursor-pointer group mb-1">
                                    <div className="flex items-center gap-x-1 p-1">
                                        <GoStarFill className="text-[#FCB800]" />
                                        <GoStarFill className="text-[#FCB800]" />
                                        <GoStarFill className="text-[#FCB800]" />
                                        <GoStarFill className="text-gray-400" />
                                        <GoStarFill className="text-gray-400" />
                                    </div>
                                    <div className="text-gray-400">Từ 3 sao</div>
                                </div>
                                <div className="2-stars flex items-center gap-x-4 cursor-pointer group mb-1">
                                    <div className="flex items-center gap-x-1 p-1">
                                        <GoStarFill className="text-[#FCB800]" />
                                        <GoStarFill className="text-[#FCB800]" />
                                        <GoStarFill className="text-gray-400" />
                                        <GoStarFill className="text-gray-400" />
                                        <GoStarFill className="text-gray-400" />
                                    </div>
                                    <div className="text-gray-400">Từ 2 sao</div>
                                </div>
                                <div className="1-stars flex items-center gap-x-4 cursor-pointer group mb-1">
                                    <div className="flex items-center gap-x-1 p-1">
                                        <GoStarFill className="text-[#FCB800]" />
                                        <GoStarFill className="text-gray-400" />
                                        <GoStarFill className="text-gray-400" />
                                        <GoStarFill className="text-gray-400" />
                                        <GoStarFill className="text-gray-400" />
                                    </div>
                                    <div className="text-gray-400">Từ 1 sao</div>
                                </div>
                            </div>
                        </div>
                        <div className="section-breakline border-t border-gray-300 my-4"></div>
                        <div className="my-2 w-full py-2 text-center border-2 rounded-[4px] border-[#FCB800] bg-[#FCB800] text-white cursor-pointer hover:opacity-80">Xóa tất cả</div>
                    </div>
                    <div className="main__item-list flex-1">
                        <div className="box">
                            <div className="box__top rounded-t-[4px] bg-[#EEEEEE] px-4 pt-2 pb-4">
                                <div className="text-2xl mb-2">Điện thoại/ Phụ kiện</div>
                                <div className="flex items-center gap-x-1 mb-5">
                                    <span className="font-medium">299</span>
                                    <span className="text-gray-500">sản phẩm được tìm thấy trong Điện thoại/ Phụ kiện</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="mr-4">Sắp xếp theo</div>
                                        <div className="flex items-center gap-x-2">
                                            {
                                                arrangement && arrangement.length > 0 && arrangement.map((item, index) => {
                                                    if (item.selected) {
                                                        return (
                                                            <div key={`arrangement-${index}`} className="w-24 py-2 border text-center bg-[#FCB800] text-white border-[#FCB800] cursor-pointer">{item.label}</div>
                                                        )
                                                    }
                                                    return (
                                                        <div key={`arrangement-${index}`} className="w-24 py-2 border border-gray-400 text-center bg-white hover:bg-[#FCB800] hover:text-white hover:border-[#FCB800] cursor-pointer"
                                                            onClick={() => handleArrangement(item.id)}>{item.label}</div>
                                                    )
                                                })
                                            }
                                            <div className="relative group">
                                                <div className="w-52 py-2 border border-gray-400 px-2.5 bg-white flex items-center justify-between cursor-pointer">
                                                    <span>{priceArrangement}</span> <MdKeyboardArrowDown className="w-6 h-6" />
                                                </div>
                                                <div className="absolute top-100 border border-gray-300 hidden group-hover:block">
                                                    <div className="px-2.5 py-2 w-52 bg-white cursor-pointer hover:text-[#FCB800]" onClick={() => setPriceArrangement("Giá: Thấp đến Cao")}>Giá: Thấp đến Cao</div>
                                                    <div className="px-2.5 py-2 w-52 bg-white cursor-pointer hover:text-[#FCB800]" onClick={() => setPriceArrangement("Giá: Cao đến Thấp")}>Giá: Cao đến Thấp</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <BsGrid3X3 className={itemGrid ? "w-5 h-5 text-black cursor-pointer" : "w-5 h-5 text-gray-400 cursor-pointer"} onClick={() => setItemGrid(true)} />
                                        <TfiViewListAlt className={!itemGrid ? "w-5 h-5 text-black cursor-pointer" : "w-5 h-5 text-gray-400 cursor-pointer"} onClick={() => setItemGrid(false)} />
                                    </div>
                                </div>
                            </div>
                            <div className="box__bottom rounded-b-[4px] bg-[#EEEEEE] px-4 py-2 mt-1">
                                <div className="content flex items-center gap-x-4">
                                    <div>Lọc theo:</div>
                                    <div className="filter-items flex items-center gap-x-2">
                                        <div className="flex items-center gap-x-2 px-4 py-2 rounded-full border border-[#FCB800] bg-orange-100">
                                            <span>từ 5 sao</span>
                                            <MdCancel className="text-[#FCB800] w-6 h-6 cursor-pointer" />
                                        </div>
                                        <div className="flex items-center gap-x-2 px-4 py-2 rounded-full border border-[#FCB800] bg-orange-100">
                                            <span>logitech</span>
                                            <MdCancel className="text-[#FCB800] w-6 h-6 cursor-pointer" />
                                        </div>
                                    </div>
                                    <div className="text-[#FCB800] font-bold hover:underline cursor-pointer">Xóa tất cả</div>
                                </div>
                            </div>
                        </div>
                        {itemGrid ?
                            <div className="product-list grid grid-cols-4 gap-y-6 gap-x-2 px-4 mt-3 mb-16">
                                {productsByCategory && productsByCategory.length > 0 && productsByCategory.map((item, index) => {
                                    return (
                                        <div className="product border border-white hover:border-gray-400 cursor-pointer px-4 py-2 group" key={`category-item-${index}`}>
                                            <div className="product__image w-40 mx-auto mb-12"><img src={item.image} alt="" /></div>
                                            <div className="product__name text-blue-600 mb-3 line-clamp-2 text-sm duration-300 group-hover:text-[#FCB800]">{item.name}</div>
                                            <div className="product__price font-medium text-lg mb-2">{CurrencyFormat(item.price)}</div>
                                            <div className="flex items-center mb-1">
                                                <div className="product__rating-stars flex items-center gap-x-1">
                                                    {
                                                        [...Array(Math.floor(item.ratings))].map((item, index) => {
                                                            return (
                                                                <GoStarFill className="text-[#FCB800]" />
                                                            )
                                                        })
                                                    }
                                                    {
                                                        [...Array(5 - Math.floor(item.ratings))].map((item, index) => {
                                                            return (
                                                                <GoStarFill className="text-gray-400" />
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <TbMinusVertical className="text-gray-300" />
                                                <div className="text-sm">Đã bán {numberKFormat(item.selling_count)}</div>
                                            </div>
                                            <div className="product_ratings flex items-center text-sm ">
                                                <div className="font-bold">{item.ratings}</div>
                                                <div>/5.0</div>
                                                <div>({item.ratings_count})</div>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                            :
                            <div className="product-list flex flex-col gap-x-4 mt-8 mb-16">
                                {productsByCategory && productsByCategory.length > 0 && productsByCategory.map((item, index) => {
                                    return (
                                        <div className="product flex border border-white border-b-gray-200 cursor-pointer mb-4 pb-4 hover:border hover:border-gray-400 p-4" key={`category-item-${index}`}>
                                            <div className="product__image w-44 mx-auto mb-12"><img src={item.image} alt="" /></div>
                                            <div className="flex-1 flex justify-between">
                                                <div className="product__left-content w-80">
                                                    <div className="product__name text-blue-600 mb-3 line-clamp-2 duration-300 hover:text-[#FCB800]">{item.name}</div>
                                                    <div className="flex items-center gap-x-2 mb-1">
                                                        <div className="product__rating-stars flex items-center gap-x-1">
                                                            {
                                                                [...Array(Math.floor(item.ratings))].map((item, index) => {
                                                                    return (
                                                                        <GoStarFill className="text-[#FCB800]" />
                                                                    )
                                                                })
                                                            }
                                                            {
                                                                [...Array(5 - Math.floor(item.ratings))].map((item, index) => {
                                                                    return (
                                                                        <GoStarFill className="text-gray-400" />
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                        <div className="product_ratings flex items-center text-sm ">
                                                            <div className="font-bold">{item.ratings}</div>
                                                            <div>/5.0</div>
                                                            <div>&nbsp;({item.ratings_count})</div>
                                                        </div>
                                                        <div className="text-sm">Đã bán {numberKFormat(item.selling_count)}</div>
                                                    </div>
                                                    <div className="text-sm mb-2">Shop: <span className="font-medium">Shop Pro</span></div>
                                                    <div className="product__benefit text-sm text-gray-400 flex flex-col gap-1">
                                                        <div>Unrestrained and portable active stereo speaker</div>
                                                        <div>Free from the confines of wires and chords</div>
                                                        <div>20 hours of portable capabilities</div>
                                                        <div>Double-ended Coil Cord with 3.5mm Stereo Plugs Included</div>
                                                    </div>
                                                </div>
                                                <div className="product__right-content w-60">
                                                    <div className="product__price font-medium text-xl mb-2 tracking-wide mb-2">{CurrencyFormat(item.price)}</div>
                                                    <div className="w-full py-3 text-black font-bold bg-[#FCB800] text-center rounded-[4px] hover:opacity-80">Thêm vào giỏ hàng</div>
                                                    <div className="mt-2 flex items-center gap-x-1 text-gray-400 hover:text-red-600 hover:font-medium w-fit"><FaRegHeart/> Yêu thích</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                        <div className='pagination-container flex justify-center'>
                            <ReactPaginate
                                nextLabel=">"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={3}
                                pageCount={totalPages}
                                previousLabel="<"
                                pageClassName="page-item"
                                pageLinkClassName="page-link page-background"
                                previousClassName="page-item"
                                previousLinkClassName="page-link pre-next"
                                nextClassName="page-item"
                                nextLinkClassName="page-link pre-next"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination flex items-center gap-2 "
                                activeLinkClassName="page-active-background"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CategoryPage;