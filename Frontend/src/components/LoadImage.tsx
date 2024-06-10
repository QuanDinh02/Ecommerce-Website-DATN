interface ILoadImage {
    img_style: string
    product_id: number
}

const LoadImage = (props: ILoadImage) => {

    let { img_style, product_id } = props;

    return (
        <img src={`/src/assets/img/products/${product_id}.jpeg`} alt='' className={img_style} />
    )
}

export default LoadImage;