interface ILoadImageS3 {
    img_style: string
    img_url: string
}

const LoadImageS3 = (props: ILoadImageS3) => {

    let { img_url, img_style } = props;

    return (
        <img src={img_url} alt='' className={img_style} />
    )
}

export default LoadImageS3;