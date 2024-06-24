import React from "react";
import { GoStarFill } from "react-icons/go"

interface IProps {
    rating: number
}

const OldStarRating = (props: IProps) => {

    const { rating } = props;

    const [activeIndex, setActiveIndex] = React.useState<number>(-1);

    React.useEffect(() => {
        setActiveIndex(rating - 1);
    }, []);

    return (
        <div className="flex items-center gap-x-1">
            {
                [...Array(5)].map((item, index) => {

                    if (index <= activeIndex) {
                        return (
                            <GoStarFill className="text-[#FCB800] w-5 h-5" key={`star-${index}`}/>
                        )
                    }
                    return (
                        <GoStarFill className="text-gray-300 w-5 h-5" key={`no-star-${index}`}/>
                    )
                })
            }
        </div>
    )
}

export default OldStarRating