import React from "react";
import './SidebarAccordion.scss';
import { useLocation, useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";

interface ISideBarChild {
    path: string
    name: string
}

interface ISideBarItem {
    path: string
    name: string
    icon: any
    children: ISideBarChild[]
    skip: boolean
}

interface IProps {
    data: ISideBarItem[]
}

const SidebarAccordionAccordionItem = ({ item, isOpen, onClick, parent_path }) => {

    const location = useLocation();
    const navigate = useNavigate();

    const sideBarItem: ISideBarItem = item;

    const contentHeight = React.useRef<HTMLDivElement>(null);

    const handleOnClick = () => {
        onClick();
        if (item.skip === true) {
            navigate(`${parent_path}${sideBarItem.path}${sideBarItem.children[0].path}`);
        } else {
            navigate(`${parent_path}${sideBarItem.path}`);
        }
    }

    return (
        <div className="accordion-wrapper">
            <button
                className={`menu-container py-3 px-4 ${isOpen ? "active" : ""}`}
                onClick={() => handleOnClick()}
            >
                <p className="menu-content flex items-center gap-x-3">{sideBarItem.icon} {sideBarItem.name}</p>
                {
                    (parent_path === "/seller-info" && sideBarItem.children.length > 0) &&
                    <RiArrowDropDownLine className={`arrow ${isOpen ? "active" : ""}`} />
                }
            </button>

            <div
                ref={contentHeight}
                className="sub-menu-container"
                style={
                    isOpen
                        ? { height: contentHeight?.current?.scrollHeight }
                        : { height: "0px" }
                }
            >
                <div className="sub-menu-content transition-all">
                    {
                        sideBarItem.children && sideBarItem.children.length > 0 &&
                        sideBarItem.children.map(child_item => {
                            return (
                                <div className={location.pathname.includes(child_item.path) ? "py-3 pl-10 pr-4 cursor-pointer text-[#FCB800]" : "py-3 pl-10 pr-4 cursor-pointer hover:text-[#FCB800] duration-200"} onClick={() => navigate(`${parent_path}${sideBarItem.path}${child_item.path}`)}>
                                    {child_item.name}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

const SidebarAccordion = (props: IProps) => {

    let { data } = props;
    const location = useLocation();

    const [activeIndex, setActiveIndex] = React.useState<number>(0);

    const handleItemClick = (index) => {
        if(activeIndex === index) {
            return;
        } else {
            setActiveIndex(index);
        }
    };

    React.useEffect(() => {
        if (location.pathname.includes(`/fms`)) {
            let idx = data.findIndex(item => location.pathname.includes(item.path));

            if (idx > 0) {
                setActiveIndex(idx);
            }
        }
    }, []);

    return (
        <div className="sidebar-accordion-container">
            {data.map((side_bar_item, index) => (
                <SidebarAccordionAccordionItem
                    key={`sidebar-item-${index}`}
                    item={side_bar_item}
                    isOpen={activeIndex === index}
                    onClick={() => handleItemClick(index)}
                    parent_path={`/fms`}
                />
            ))}
        </div>
    );
};

export default SidebarAccordion;