import { GoStarFill } from "react-icons/go"

interface IProps {
    rating: number
}

const Rating = (props: IProps) => {
    return (
        <div className="flex items-center gap-x-1">
            {
                [...Array(Math.floor(props.rating))].map((item, index) => {
                    return (
                        <GoStarFill className="text-[#FCB800] w-4 h-4" />
                    )
                })
            }
            {
                [...Array(5 - Math.floor(props.rating))].map((item, index) => {
                    return (
                        <GoStarFill className="text-gray-300 w-4 h-4" />
                    )
                })
            }
        </div>
    )
}

export default Rating;