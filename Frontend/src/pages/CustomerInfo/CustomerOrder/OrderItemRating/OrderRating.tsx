import LoadImage from "@/components/LoadImage";
import { customerRatingProduct, getOrderItemInfoForRating } from "@/services/orderServices";
import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useImmer } from "use-immer";
import StarRating from "./StarRating";
import OldStarRating from "./OldStarRating";
import Button from "@/components/Button";
import { errorToast1, successToast1 } from "@/components/Toast/Toast";
import LinkNewTabProductDetail from "@/components/LinkNewTab";

interface IProductReview {
    id: number
    rating: number
    comment: string
}

interface IProduct {
    id: number
    name: string
    review: IProductReview
    update: boolean
}

const OrderRating = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

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

    const handleUpdateRating = (product_id: number) => {
        setProductList(draft => {
            draft.forEach(product => {
                if (product.id === product_id) {
                    product.update = true;
                }
            })
        })
    }

    const handleSendComment = async (product_id: number) => {
        let product = productList.filter(product => product.id === product_id)[0];

        if (product.review.rating === 0) {
            errorToast1("Vui lòng đánh giá sao cho sản phẩm");
            return;
        }

        let result = await customerRatingProduct({
            id: product.id,
            name: product.name,
            review: product.review,
        }, orderID);

        if (result) {
            if (result.EC === 0) {
                successToast1(result.EM);

                let new_review = result.DT;
                setProductList(draft => {
                    draft.forEach(product => {
                        if (product.id === product_id) {
                            product.review.id = +new_review.id
                            product.update = false
                        }
                    })
                });

            } else {
                errorToast1(result.EM);
                return;
            }
        }
    }

    const handleProductDetailNavigation = (product_id: number) => {
        navigate({
            pathname: "/product",
            search: `?id=${product_id}`,
        });
    }

    const fetchOrderItemForRating = async (order_id: number) => {
        let res = await getOrderItemInfoForRating(order_id);
        if (res) {

            let product_list = res.product_list;

            let format_data = product_list.map(product => {
                if (product.review.id === 0) {
                    return {
                        ...product, update: true
                    }
                } else {
                    return {
                        ...product, update: false
                    }
                }
            });

            setProductList(format_data);

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
                                                        <div className="line-clamp-1 mb-2 cursor-pointer hover:underline hover:text-blue-600" onClick={() => handleProductDetailNavigation(product.id)}><LinkNewTabProductDetail id={product.id} name={product.name} /></div>
                                                        {
                                                            product.update ?
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
                                                            !product.update ?
                                                                <Button styles="px-5 py-2 bg-[#FCB800] hover:opacity-80 cursor-pointer w-fit text-sm font-medium rounded" OnClick={() => handleUpdateRating(product.id)} >SỬA ĐÁNH GIÁ</Button>
                                                                :
                                                                <>
                                                                    <Button styles="px-5 py-2 border border-gray-200 hover:bg-gray-200 w-fit text-sm font-medium rounded">Hủy</Button>
                                                                    <Button styles="px-5 py-2 bg-[#FCB800] hover:opacity-80 cursor-pointer w-fit text-sm font-medium rounded" OnClick={() => handleSendComment(product.id)}>GỬI ĐÁNH GIÁ</Button>
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