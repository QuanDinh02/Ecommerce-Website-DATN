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
                    <div className="flex items-center mb-1">
                        <div className="product__rating-stars flex items-center gap-x-1">
                            {
                                [...Array(Math.floor(props.ratings))].map((item, index) => {
                                    return (
                                        <GoStarFill className="text-[#FCB800]" key={`star-rating-${index}`}/>
                                    )
                                })
                            }
                            {
                                [...Array(5 - Math.floor(props.ratings))].map((item, index) => {
                                    return (
                                        <GoStarFill className="text-gray-400" key={`no-star-rating-${index}`}/>
                                    )
                                })
                            }
                        </div>
                        <TbMinusVertical className="text-gray-300" />
                        <div className="text-sm">Đã bán {props.selling_count ?  numberKFormat(props.selling_count): 0}</div>
                    </div>
                </>
                :
                <>
                    <div className="flex items-center mb-1 gap-x-2">
                        <div className="product__rating-stars flex items-center gap-x-1">
                            {
                                [...Array(Math.floor(props.ratings))].map((item, index) => {
                                    return (
                                        <GoStarFill className="text-[#FCB800]" key={`star-rating-${index}`}/>
                                    )
                                })
                            }
                            {
                                [...Array(5 - Math.floor(props.ratings))].map((item, index) => {
                                    return (
                                        <GoStarFill className="text-gray-400" key={`no-star-rating-${index}`}/>
                                    )
                                })
                            }
                        </div>
                        <div className="text-sm">Đã bán {props.selling_count ?  numberKFormat(props.selling_count): 0}</div>
                    </div>
                </>
            }
        </>
    )
}

export default ProductRating;