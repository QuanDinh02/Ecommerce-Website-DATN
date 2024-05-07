import React from "react";
import './Accordion.scss';
import { useLocation } from "react-router-dom";

interface ISideBarChild {
    path: string
    name: string
}

interface ISideBarItem {
    path: string
    name: string
    icon: any
    children: ISideBarChild[]
}

interface IProps {
    data: ISideBarItem[]
    navigate: any
}


const AccordionItem = ({ item, isOpen, onClick, navigate }) => {

    const location = useLocation();

    const sideBarItem: ISideBarItem = item;

    const contentHeight = React.useRef<HTMLDivElement>(null);

    const handleOnClick = () => {
        onClick();
        navigate(sideBarItem.path);
    }

    return (
        <div className="accordion-wrapper">
            <button
                className={`menu-container py-3 px-4 ${isOpen ? "active" : ""}`}
                onClick={() => handleOnClick()}
            >
                <p className="menu-content flex items-center gap-x-3">{sideBarItem.icon} {sideBarItem.name}</p>
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
                                <div className={location.pathname.includes(child_item.path) ? "py-3 pl-10 pr-4 cursor-pointer text-[#FCB800]" : "py-3 pl-10 pr-4 cursor-pointer hover:text-[#FCB800] duration-200"} onClick={() => navigate(child_item.path)}>{child_item.name}</div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

const Accordion = (props: IProps) => {

    let { data, navigate } = props;

    const [activeIndex, setActiveIndex] = React.useState<number>(0);

    const handleItemClick = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className="container">
            {data.map((side_bar_item, index) => (
                <AccordionItem
                    key={`sidebar-item-${index}`}
                    item={side_bar_item}
                    isOpen={activeIndex === index}
                    onClick={() => handleItemClick(index)}
                    navigate={navigate}
                />
            ))}
        </div>
    );
};

export default Accordion;