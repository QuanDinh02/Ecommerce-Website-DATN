import React from "react";
import { CiImageOn } from "react-icons/ci";
interface ILoadImage {
    img_style: string
    product_id: number
}

const LoadImage = (props: ILoadImage) => {

    let { img_style, product_id } = props;
    const [error, setError] = React.useState<boolean>(false);

    return (
        <>
            {
                !error ?
                    <img
                        src={`/src/assets/img/products/${product_id}.jpeg`}
                        alt=''
                        className={img_style}
                        onError={() => setError(true)}
                    /> :
                    <CiImageOn className={`text-gray-300 shrink-0 ${img_style}`}/>
            }
        </>
    )
}

export default LoadImage;