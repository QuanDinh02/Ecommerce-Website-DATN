import IMG from '../assets/img/homepage/recommend_items/31261845.jpeg';

interface ILoadImage {
    img_style: string
    product_id: number
}

const LoadImage = (props: ILoadImage) => {

    let { img_style, product_id } = props;

    return (
        <img src={IMG} alt='' className={img_style} />
    )
}

export default LoadImage;