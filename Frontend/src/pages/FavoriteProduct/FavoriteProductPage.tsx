import { CurrencyFormat } from "@/utils/numberFormat";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { VscTrash } from "react-icons/vsc";
import { IoBagHandleOutline } from "react-icons/io5";
import { successToast1 } from "@/components/Toast/Toast";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducer/rootReducer";
import { TailSpin } from "react-loader-spinner";
import { PiImageThin } from "react-icons/pi";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { IWishList } from "./FavoriteProductPage_types";
import { deleteWishListItem } from "@/services/wishListService";
import { DeleteWishListItem } from "@/redux/actions/action";

const tableHeaders = [
    "", "TÊN SẢN PHẨM", "GIÁ", "", ""
];

const FavoriteProductPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [dataLoading, setDataLoading] = React.useState<boolean>(true);
    const [showDeleteBox, setShowDeleteBox] = React.useState<boolean>(false);

    const [deleteWishListId, setDeleteWishListId] = React.useState<number>(0);

    const wishListData: IWishList[] = useSelector<RootState, IWishList[]>(state => state.wishList.wish_list_list);
    const wishListCount: number = useSelector<RootState, number>(state => state.wishList.wish_list_count);

    const hanldeAddShoppingCart = () => {
        successToast1("Thêm vào giỏ hàng thành công");
    }

    const handleDeleteFavoriteItem = async () => {
        let delete_id = deleteWishListId;
        let result = await deleteWishListItem(delete_id);
        if (result && result.EC === 0) {
            successToast1(result.EM);
            dispatch(DeleteWishListItem({ id: delete_id }));
            setDeleteWishListId(0);
            setShowDeleteBox(false);
        }
    }

    const handleProductDetailNavigation = (product_id: number) => {
        navigate("/product-detail", { state: { product_id: product_id } });
    }

    React.useEffect(() => {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }

        setTimeout(() => {
            setDataLoading(false);
        }, 1000);
    }, []);

    return (
        <>
            <div className="shopping-cart-container">
                <div className="shopping-cart__breadcrumb border-b border-gray-300 bg-[#F1F1F1]">
                    <div className="breadcrumb-content w-[80rem] mx-auto px-[30px] py-4 flex items-center gap-2">
                        <div onClick={() => navigate("/")} className="cursor-pointer hover:underline">Trang chủ</div>
                        <MdOutlineArrowForwardIos />
                        <div className="font-medium cursor-pointer hover:underline">Sản phẩm yêu thích</div>
                    </div>
                </div>
                {
                    dataLoading ?
                        <div className="flex items-center justify-center w-full h-screen">
                            <TailSpin
                                height="80"
                                width="80"
                                color="#FCB800"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass="flex items-center justify-center tail-spin"
                                visible={true}
                            />
                        </div>
                        :
                        <div className="shopping-cart__content mt-16 mb-24">
                            <div className="main main w-[80rem] mx-auto px-[30px]">
                                <div className="title text-4xl text-center font-medium mb-20">Sản phẩm yêu thích</div>
                                <div className="w-full">
                                    {
                                        wishListCount > 0 && wishListData && wishListData.length > 0 ?
                                            <table className="table-auto w-full bg-white">
                                                <thead>
                                                    <tr className="bg-[#F2F2F2]">
                                                        {tableHeaders && tableHeaders.map((item, index) => {
                                                            return (
                                                                <th className="text-left py-3 px-2 font-medium text-sm" key={`header-field-${index}`}>{item}</th>
                                                            )
                                                        })}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {wishListData && wishListData.length > 0 &&
                                                        wishListData.map((item, index) => {
                                                            return (
                                                                <tr key={`favorite-item-${item.id}`} className="border-b border-gray-300">
                                                                    <td>
                                                                        {item.product_info.image ?
                                                                            <img src={`data:image/jpeg;base64,${item.product_info.image}`} alt='' className="w-32 h-32 cursor-pointer my-4" />
                                                                            :
                                                                            <PiImageThin className="w-32 h-32 cursor-pointer" />
                                                                        }
                                                                    </td>
                                                                    <td className="py-3 px-2">
                                                                        <div
                                                                            className="cursor-pointer text-blue-500 hover:text-[#FCB800] duration-300 w-80 line-clamp-2 mb-2"
                                                                            onClick={() => handleProductDetailNavigation(+item.product_info.id)}
                                                                        >{item.product_info.name}</div>
                                                                        <div>Shop: <span className="text-blue-600 font-medium cursor-pointer hover:underline">{item.shop_info.name}</span></div>
                                                                    </td>
                                                                    <td className="py-3 px-2">{CurrencyFormat(item.price)}</td>
                                                                    <td className="py-3 px-2">
                                                                        <div
                                                                            className="text-black py-4 bg-[#FCB800] rounded-[4px] text-center font-medium w-[12.5rem] flex items-center justify-center gap-x-2 hover:opacity-80 cursor-pointer"
                                                                            onClick={() => hanldeAddShoppingCart()}
                                                                        >
                                                                            <IoBagHandleOutline className="w-5 h-5" />
                                                                            <span>Thêm vào giỏ hàng</span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="py-3 px-2"><VscTrash className="text-gray-600 hover:text-red-500 w-6 h-6 cursor-pointer" onClick={() => {
                                                                        setDeleteWishListId(item.id);
                                                                        setShowDeleteBox(true);
                                                                    }} /></td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                            :
                                            <>
                                                <div className="w-full text-gray-500 text-center text-lg border border-gray-300 bg-gray-100 py-2">Chưa có sản phẩm yêu thích !</div>
                                            </>


                                    }

                                </div>
                            </div>
                        </div>
                }
            </div>
            <Modal show={showDeleteBox} setShow={setShowDeleteBox} size="delete-confirmation-box">
                <div className="delete-confirmation-box w-full h-full relative flex flex-col justify-between">
                    <div className="text-xl mt-2">Bạn muốn xóa sản phẩm yêu thích này ?</div>
                    <div className="flex items-center justify-end gap-x-2">
                        <Button styles="rounded-[4px] px-8 py-2 text-black bg-gray-200 hover:bg-gray-300 cursor-pointer" OnClick={() => setShowDeleteBox(false)}>Hủy</Button>
                        <Button styles="rounded-[4px] px-8 py-2 bg-red-500 text-white hover:bg-red-600 cursor-pointer" OnClick={() => handleDeleteFavoriteItem()}>Xóa</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default FavoriteProductPage;