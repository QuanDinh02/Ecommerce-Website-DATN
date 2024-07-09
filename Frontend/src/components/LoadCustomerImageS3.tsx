import React from "react";
import { LuUser2 } from "react-icons/lu";

interface LoadCustomerImageS3 {
    img_style: string
    img_url: string
}

const LoadCustomerImageS3 = (props: LoadCustomerImageS3) => {

    let { img_url, img_style } = props;

    const [error, setError] = React.useState<boolean>(false);

    return (
        <>
            {
                !error ?
                    <img src={img_url} alt='' className={img_style} onError={() => setError(true)} />
                    :
                    <div className={`${img_style} bg-gray-200 flex items-center justify-center text-gray-400`}><LuUser2 className="w-6 h-6" /></div>
            }
        </>

    )
}

export default LoadCustomerImageS3;