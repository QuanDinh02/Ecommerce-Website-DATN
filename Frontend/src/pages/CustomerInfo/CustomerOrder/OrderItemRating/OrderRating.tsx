import LoadImage from "@/components/LoadImage";
import { getOrderItemInfoForRating } from "@/services/orderServices";
import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { useSearchParams } from "react-router-dom";
import { useImmer } from "use-immer";
import StarRating from "./StarRating";
import OldStarRating from "./OldStarRating";
import Button from "@/components/Button";

interface IProductReview {
    id: number
    rating: number
    comment: string
}

interface IProduct {
    id: number
    name: string
    review: IProductReview
}

const OrderRating = () => {

    const [searchParams] = useSearchParams();

    const [orderID, setOrderID] = React.useState<number>(0);
    const [dataLoading, setDataLoading] = React.useState<boolean>(true);

    const [productList, setProductList] = useImmer<IProduct[]>([]);

    const handleSetRating = (product_id: number, value: number): void => {
        setProductList(draft => {
            draft.forEach(product => {
                if (product.id === product_id) {
                    product.review.rating = value;
                }
            })
        })
    }

    const handleSetComment = (product_id: number, value: string) => {
        setProductList(draft => {
            draft.forEach(product => {
                if (product.id === product_id) {
                    product.review.comment = value;
                }
            })
        })
    }

    const fetchOrderItemForRating = async (order_id: number) => {
        let res = await getOrderItemInfoForRating(order_id);
        if (res) {
            setProductList(res.product_list);

            setTimeout(() => {
                setDataLoading(false);
            }, 500);
        }
    }

    React.useEffect(() => {

        let order_id = searchParams.get('code');
        let activeOrderID: number = order_id ? +order_id : 0;
        if (activeOrderID !== orderID) {
            setOrderID(activeOrderID);
        }

    }, [searchParams.get('code')]);

    React.useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        if (orderID !== 0) {
            fetchOrderItemForRating(orderID);
        }

    }, [orderID]);

    return (
        <>
            {
                dataLoading ?
                    <div className="flex items-center justify-center w-full h-screen">
                        <ThreeDots
                            height="80"
                            width="80"
                            color="#FCB800"
                            ariaLabel="three-dots-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass="flex items-center justify-center tail-spin"
                            visible={true}
                        />
                    </div>
                    :
                    <div className="order-rating-container">
                        <div className="text-xl mb-4">Đánh giá sản phẩm</div>
                        <div className="order-item-list">
                            {
                                productList && productList.length > 0 &&
                                productList.map(product => {
                                    return (
                                        <div className="bg-white mb-6 p-4 shadow-md rounded" key={`product-${product.id}`}>
                                            <div className="flex gap-x-4">
                                                <LoadImage img_style={"w-28 h-28 rounded border"} product_id={product.id} />
                                                <div className="w-full">
                                                    <div className="w-full">
                                                        <div className="line-clamp-1 mb-2">{product.name}</div>
                                                        {
                                                            product.review.id === 0 ?
                                                                <>
                                                                    <StarRating
                                                                        product_id={product.id}
                                                                        rating={product.review.rating}
                                                                        setRating={handleSetRating}
                                                                    />
                                                                    <div className='mt-4 w-full'>
                                                                        <textarea
                                                                            value={product.review.comment}
                                                                            onChange={(e) => handleSetComment(product.id, e.target.value)}
                                                                            className="rounded-[4px] px-4 py-3 text-sm border border-gray-300 w-full focus:border-black h-24 outline-none"
                                                                            placeholder="Viết câu trả lời"
                                                                        />
                                                                    </div>
                                                                </>
                                                                :
                                                                <>
                                                                    <OldStarRating
                                                                        rating={product.review.rating}
                                                                    />
                                                                    <div className='mt-4 w-full'>{product.review.comment}</div>
                                                                </>
                                                        }
                                                    </div>
                                                    <div className="mt-4 flex items-center gap-x-2 justify-end">
                                                        {
                                                            product.review.id !== 0 ?
                                                                <Button styles="px-5 py-2 bg-[#FCB800] hover:opacity-80 cursor-pointer w-fit text-sm font-medium rounded">SỬA ĐÁNH GIÁ</Button>
                                                                :
                                                                <>
                                                                    <Button styles="px-5 py-2 border border-gray-200 hover:bg-gray-200 w-fit text-sm font-medium rounded">Hủy</Button>
                                                                    <Button styles="px-5 py-2 bg-[#FCB800] hover:opacity-80 cursor-pointer w-fit text-sm font-medium rounded">GỬI ĐÁNH GIÁ</Button>
                                                                </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
            }
        </>

    )
}

export default OrderRating;