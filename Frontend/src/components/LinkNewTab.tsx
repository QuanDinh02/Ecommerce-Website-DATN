import { Link } from "react-router-dom"

interface IProps {
    name: string
    id: number
}

const LinkNewTabProductDetail = (props: IProps) => {

    const handleClick = (e) => {
        e.preventDefault();
    }

    return (
        <Link to={`/product?id=${props.id}`} onClick={(e) => handleClick(e)} target="_blank">{props.name}</Link>
    )
}

export default LinkNewTabProductDetail