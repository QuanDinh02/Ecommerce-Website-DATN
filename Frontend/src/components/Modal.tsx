import React from "react";
import { IoIosCloseCircle } from "react-icons/io";

interface MProps {
    show: boolean;
    setShow: (status: boolean) => void; 
    children: React.ReactNode;
    size?: string;
}

const Modal = (props: MProps) => {

    const { show, setShow, children, size: type } = props;

    const sizes = {
        'sm': 'w-2/5 h-3/6',
        'sm-md': 'w-2/5 h-4/6',
        'md': 'w-2/5 h-5/6',
        'md-lg': 'w-5/12 h-5/6',
        'md-lg-h-fit': 'w-5/12',
        'lg': 'w-7/12 h-5/6',
        'full': 'w-full h-full',
        'customize': 'w-[72.25rem] h-4/5',
        'customize_2': 'w-[72.25rem] h-5/6',
    };

    return (
        <>
            {show &&
                <>
                    <div className="w-full h-screen fixed bg-gray-600 opacity-80 flex z-30 top-0 right-0 left-0"></div>
                    <div className="h-screen fixed flex items-center justify-center z-40 top-0 right-0 left-0">
                        <div className={`${sizes[`${type}`]} relative`}>
                            <div className="bg-white rounded-lg p-5 h-full">
                                <div className="w-full h-full overflow-y-auto">
                                    {children}
                                </div>
                            </div>
                            <div className={type != "full" ? "absolute top-[-15px] right-[-15px] z-50" : "absolute top-[5px] right-[5px] z-50"} onClick={() => setShow(false)}>
                                <IoIosCloseCircle className="w-10 h-10 cursor-pointer hover:text-red-500 bg-white rounded-full" />
                            </div>
                        </div>
                    </div>
                </>

            }
        </>
    )
}

export default Modal;