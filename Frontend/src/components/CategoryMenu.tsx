import { getCategoryList } from "@/services/categoryService";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { categoryIcon } from "@/data/homepage";

interface ISubCategory {
    id: number
    title: string
}

interface ICategory {
    id: number
    title: string
    sub_category_list: ISubCategory[]
}

interface IHoverCategory {
    id: number
    title: string
}

const CategoryMenu = () => {

    const navigate = useNavigate();

    const [showSubmenu, setShowSubmenu] = React.useState<boolean>(false);

    const [menuData, setMenuData] = React.useState<ICategory[]>([
        {
            id: 0,
            title: "",
            sub_category_list: []
        }
    ]);

    const [subMenuData, setSubMenuData] = React.useState<ISubCategory[]>([]);

    const [hoverCategory, setHoverCategory] = React.useState<IHoverCategory>({
        id: 0,
        title: ""
    });

    const handleShowSubmenu = (show: boolean, check: boolean, list: ISubCategory[], category_id: number, category_title: string) => {

        if (show && check) {
            setShowSubmenu(true);
            setHoverCategory({
                ...hoverCategory, id: category_id, title: category_title
            });
            setSubMenuData(list);
        } else {
            setShowSubmenu(false);
        }
    }

    const fetchCategoryList = async () => {
        let response: ICategory[] = await getCategoryList();
        if (response) {
            setMenuData(response);
        }
    }

    const handleCategoryNavigation = (category_id: number) => {
        if (location.pathname === "/category") {
            navigate({
                pathname: "/category",
                search: `?id=${category_id}&page=1`,
            });
            window.scrollTo({ top: 0, left: 0 });
            window.location.reload();
        }
        navigate({
            pathname: "/category",
            search: `?id=${category_id}&page=1`,
        });
    }

    const handleSubCategoryNavigation = (sub_category_id: number) => {
        if (location.pathname === "/sub-category") {
            navigate({
                pathname: "/sub-category",
                search: `?id=${sub_category_id}&page=1`,
            });
            window.scrollTo({ top: 0, left: 0 });
            window.location.reload();
        }
        navigate({
            pathname: "/sub-category",
            search: `?id=${sub_category_id}&page=1`,
        });
        
    }

    React.useEffect(() => {
        fetchCategoryList();
    }, []);

    return (
        <div className="menu-sidebar w-60 border border-gray-300 bg-white relative"
            onMouseLeave={() => handleShowSubmenu(false, true, [], 0, "")}>
            {menuData && menuData.length > 0 && menuData.map((item, index) => {
                return (
                    <div key={`category-item-${item.id}`} className="w-full px-3.5 py-3 hover:bg-[#FCB800] cursor-pointer flex items-center flex gap-4 group"
                        onMouseEnter={() => handleShowSubmenu(true, item.sub_category_list.length > 0, item.sub_category_list, item.id, item.title)}
                        onClick={() => handleCategoryNavigation(item.id)}
                    >
                        <span>{categoryIcon[index].icon}</span>
                        <div className="flex-1 flex items-center justify-between">
                            <span>{item.title}</span>
                            <span>{item.sub_category_list.length > 0 ? <MdKeyboardArrowRight className="w-5 h-5 text-gray-400 group-hover:text-black" /> : ""}</span>
                        </div>
                    </div>
                )
            })}
            {
                showSubmenu &&
                <div className="sub-menu w-[33.25rem] h-full absolute top-0 left-[240px] border border-gray-400 bg-white px-8 py-6 flex gap-10">
                    <div className="sub-menu-category">
                        <div className="title font-bold mb-3">{hoverCategory.title}</div>
                        <div className="grid grid-cols-2 gap-y-2 gap-x-2">
                            {subMenuData && subMenuData.length > 0 &&
                                subMenuData.map((item, index) => {
                                    return (
                                        <div
                                            className="item hover:text-[#FCB800] cursor-pointer hover:translate-x-1 duration-300 line-clamp-1"
                                            key={`sub-category-${item.id}`}
                                            onClick={() => handleSubCategoryNavigation(item.id)}
                                        >{item.title}</div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

export default CategoryMenu;
