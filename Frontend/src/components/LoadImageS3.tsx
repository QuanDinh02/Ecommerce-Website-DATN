import React from "react";
import { CiImageOn } from "react-icons/ci";

interface ILoadImageS3 {
    img_style: string
    img_url: string
}

const LoadImageS3 = (props: ILoadImageS3) => {

    let { img_url, img_style } = props;

    const [error, setError] = React.useState<boolean>(false);

    return (
        <>
            {
                !error ?
                    <img src={img_url} alt='' className={img_style} onError={() => setError(true)} />
                    :
                    <CiImageOn className={`text-gray-300 shrink-0 ${img_style}`} />
            }
        </>

    )
}

export default LoadImageS3;