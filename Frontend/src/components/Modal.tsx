import React from "react";
import { IoIosCloseCircle } from "react-icons/io";

interface MProps {
    show: boolean;
    setShow: (status: boolean) => void;
    children: React.ReactNode;
    size?: string;
    close_icon?: boolean;
}

const Modal = (props: MProps) => {

    const { show, setShow, children, size: type, close_icon = false } = props;

    const sizes = {
        'customize': 'w-[72.25rem] max-h-4/5',
        'customize-h-auto': 'w-[72.25rem] min-h-1/3 max-h-4/5',
        'delete-confirmation-box': 'w-[40rem] h-[180px]',
        'form-box': 'w-[40rem] h-auto',
        'form-box-2': 'w-[40rem] h-2/3',
        'update-modal': 'w-4/6 h-4/5',
        'w-4/6-h-auto': 'w-4/6 h-auto',
    };

    const handleCloseModal = () => {
        document.body.style.overflow = "scroll";
        setShow(false)
    }
    return (
        <>
            {show &&
                <>
                    <div className="w-full h-screen fixed bg-gray-600 opacity-80 flex z-50 top-0 right-0 left-0"></div>
                    <div className="h-screen fixed flex items-center justify-center z-[60] top-0 right-0 left-0">
                        <div className={`${sizes[`${type}`]} relative`}>
                            <div className="bg-white rounded-lg p-5 h-full">
                                <div className="w-full h-full overflow-y-auto">
                                    {children}
                                </div>
                            </div>
                            {
                                !close_icon &&
                                <div className={type != "full" ? "absolute top-[-15px] right-[-15px] z-50" : "absolute top-[5px] right-[5px] z-50"} onClick={() => handleCloseModal()}>
                                    <IoIosCloseCircle className="w-10 h-10 cursor-pointer hover:text-red-500 bg-white rounded-full" />
                                </div>
                            }
                        </div>
                    </div>
                </>

            }
        </>
    )
}

export default Modal;