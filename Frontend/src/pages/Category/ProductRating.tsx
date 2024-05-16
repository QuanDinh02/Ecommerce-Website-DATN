import { numberKFormat } from "@/utils/numberFormat";
import { GoStarFill } from "react-icons/go";
import { TbMinusVertical } from "react-icons/tb";

interface IProps {
    ratings: number
    selling_count: number
    item_grid: boolean
}

const ProductRating = (props: IProps) => {

    return (
        <>
            {props.item_grid ?
                <>
                    <div className="flex items-center mb-1 group-hover:hidden">
                        <div className="product__rating-stars flex items-center gap-x-1">
                            {
                                [...Array(Math.floor(props.ratings))].map((item, index) => {
                                    return (
                                        <GoStarFill className="text-[#FCB800]" />
                                    )
                                })
                            }
                            {
                                [...Array(5 - Math.floor(props.ratings))].map((item, index) => {
                                    return (
                                        <GoStarFill className="text-gray-400" />
                                    )
                                })
                            }
                        </div>
                        <TbMinusVertical className="text-gray-300" />
                        <div className="text-sm">Đã bán {numberKFormat(props.selling_count)}</div>
                    </div>
                </>
                :
                <>
                    <div className="flex items-center mb-1 group-hover:hidden gap-x-2">
                        <div className="product__rating-stars flex items-center gap-x-1">
                            {
                                [...Array(Math.floor(props.ratings))].map((item, index) => {
                                    return (
                                        <GoStarFill className="text-[#FCB800]" />
                                    )
                                })
                            }
                            {
                                [...Array(5 - Math.floor(props.ratings))].map((item, index) => {
                                    return (
                                        <GoStarFill className="text-gray-400" />
                                    )
                                })
                            }
                        </div>
                        <div className="text-sm">Đã bán {numberKFormat(props.selling_count)}</div>
                    </div>
                </>
            }
        </>
    )
}

export default ProductRating;