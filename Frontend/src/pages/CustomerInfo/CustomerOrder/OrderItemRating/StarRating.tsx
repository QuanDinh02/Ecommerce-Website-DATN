import React from "react";
import { GoStarFill } from "react-icons/go"

interface IProps {
    product_id: number
    rating: number
    setRating: (product_id: number, rating: number) => void
}

const StarRating = (props: IProps) => {

    const { product_id, rating, setRating } = props;

    const [activeIndex, setActiveIndex] = React.useState<number>(-1);

    const handleRating = (index: number) => {
        setActiveIndex(index);
        setRating(product_id, index + 1);
    }

    React.useEffect(() => {
        setActiveIndex(rating - 1);
    }, []);

    return (
        <div className="flex items-center gap-x-1">
            {
                [...Array(5)].map((item, index) => {

                    if (index <= activeIndex) {
                        return (
                            <GoStarFill className="text-[#FCB800] w-5 h-5 cursor-pointer" key={`star-${index}`} onClick={() => handleRating(index)} />
                        )
                    }
                    return (
                        <GoStarFill className="text-gray-300 w-5 h-5 cursor-pointer" key={`no-star-${index}`} onClick={() => handleRating(index)} />
                    )
                })
            }
        </div>
    )
}

export default StarRating;