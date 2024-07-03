import { GoStarFill } from "react-icons/go";

interface IProps {
    active: boolean
    value: number
}

const ProductRatingFilter = (props: IProps) => {

    let { active, value } = props;

    return (
        <div className="flex items-center gap-x-4 cursor-pointer group mb-1">
            {
                !active ?
                    <div className="flex items-center gap-x-1 p-1 rounded-[4px] border border-[#F5F5F5]">
                        {
                            [...Array(Math.floor(value))].map((item, index) => {
                                return (
                                    <GoStarFill className="text-[#FCB800]" key={`star-${index}`} />
                                )
                            })
                        }
                        {
                            [...Array(5 - Math.floor(value))].map((item, index) => {
                                return (
                                    <GoStarFill className="text-gray-400" key={`no-star-${index}`}/>
                                )
                            })
                        }
                    </div>
                    :
                    <div className="flex items-center gap-x-1 bg-yellow-100 p-1 rounded-[4px] border border-[#FCB800]">
                        {
                            [...Array(Math.floor(value))].map((item, index) => {
                                return (
                                    <GoStarFill className="text-[#FCB800]" key={`star-${index}`}/>
                                )
                            })
                        }
                        {
                            [...Array(5 - Math.floor(value))].map((item, index) => {
                                return (
                                    <GoStarFill className="text-gray-400" key={`no-star-${index}`}/>
                                )
                            })
                        }
                    </div>
            }
            <div className="text-gray-400">Từ {value} sao</div>
        </div>
    )
}

export default ProductRatingFilter;