import React from 'react';
import { RiCloseLine } from "react-icons/ri";

interface IProps {
    show: boolean;
    setShow: (status: boolean) => void;
    children: React.ReactNode;
}

const Drawer = (props: IProps) => {

    const { show, setShow, children } = props;

    const handleCloseDrawer = () => {
        document.body.style.overflow = "scroll";
        setShow(false)
    }

    React.useEffect(() => {
        if (show) {
            document.body.style.overflow = "hidden";
        }
    }, [show]);

    return (
        <>
            {show && <div className="w-full h-screen fixed bg-gray-600 opacity-80 flex z-50 top-0 right-0 left-0"></div>}
            <div className={`fixed top-0 right-0 w-96 h-screen bg-white z-[60] p-3  ease-in-out duration-300 ${show ? "translate-x-0 " : "translate-x-full"}`}>
                <div onClick={() => handleCloseDrawer()} className='w-fit h-fit'>
                    <RiCloseLine className="w-10 h-10 cursor-pointer text-black" />
                </div>
                <div className="overflow-y-auto w-full h-full">
                    {children}
                </div>
            </div>
        </>
    );
}

export default Drawer;