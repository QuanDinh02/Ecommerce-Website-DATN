import Button from "@/components/Button";
import { FaCheck } from "react-icons/fa6";
import { getOnlyCategories } from "@/services/categoryService";
import { getRecommendSubCategory } from "@/services/subCategoryService";
import classNames from "classnames";
import React from "react";
import { useImmer } from "use-immer";
import { IAccount } from "./Product/ProductDetailPage_types";
import { RootState } from "@/redux/reducer/rootReducer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteNewCustomer, trainingNewCustomer } from "@/services/customerService";
import { useDispatch } from "react-redux";
import { fetchAccount } from "@/services/userService";
import _ from "lodash";
import { UserLogin } from "@/redux/actions/action";

const STEP_1 = [
    {
        id: 1,
        label: "Đúng tôi là khách hàng mới",
        isSelected: true
    },
    {
        id: 2,
        label: "Tôi là khách hàng cũ nên đã quen với mua hàng tại đây",
        isSelected: false
    }
]

interface ICategory {
    id: number
    title: string
    isSelected: boolean
}

interface ISelectedSubCategory {
    id: number
    title: string
}

interface ISubCategory {
    id: number
    title: string
    isSelected: boolean
}

interface ICategoryFetch {
    id: number
    title: string
    sub_category_list: ISubCategory[]
}

const NewCustomer = () => {

    const account: IAccount = useSelector<RootState, IAccount>(state => state.user.account);
    const isAuthenticated = useSelector<RootState, boolean>(state => state.user.isAuthenticated);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [step, setStep] = React.useState<number>(1);
    const [typeCustomer, setTypeCustomer] = React.useState<number>(1);

    const [categoryList, setCategoryList] = useImmer<ICategory[]>([]);
    const [selectedCategoryList, setSelectedCategoryList] = useImmer<ICategoryFetch[]>([]);

    const styles = classNames("progress-bar h-1 bg-[#FCB800]", {
        "step_2": step === 2,
        "step_3": step === 3,
    })

    const selectCategoryStyle = (select: boolean) => classNames("px-4 py-8 flex items-center justify-center hover:border-black cursor-pointer", {
        "border-2 border-black": select,
        "border-2 border-gray-300": !select
    });

    const fetchCategoryList = async () => {
        let result = await getOnlyCategories();
        if (result) {

            let format_data = result.map(item => {
                return {
                    ...item, isSelected: false
                }
            })
            setCategoryList(format_data);
        }
    }

    const handleSelectCategory = (id: number) => {
        setCategoryList(draft => {
            draft.forEach(item => {
                if (item.id === id) {
                    item.isSelected = !item.isSelected;
                }
            })
        })
    }

    const handleSetStep = async (step: number) => {
        if (step >= 1 && step <= 3) {
            if (step === 2) {
                if (!isAuthenticated) {
                    navigate("/login");
                }
                if (typeCustomer === 2) {
                    let result = await deleteNewCustomer(account.customer_id);
                    if (result && result.EC === 0) {
                        navigate("/");
                    }
                } else {
                    setStep(step);
                }
            }
            if (step === 3) {
                let selected_category_list = categoryList.filter(item => item.isSelected === true);
                let result = await getRecommendSubCategory(selected_category_list);
                let format_data = result.map(item => {
                    let list = item.sub_category_list.map(sub_category => {
                        return {
                            ...sub_category,
                            isSelected: false
                        }
                    });

                    return {
                        ...item, sub_category_list: list
                    }
                });

                setSelectedCategoryList(format_data);
                setStep(step);
            }
            setStep(step);
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
        return;
    }

    const handleSelectSubCategory = (category_id: number, sub_category_id: number) => {
        setSelectedCategoryList(draft => {
            draft.forEach(category => {
                if (category.id === category_id) {
                    //let sub_category_list = category.sub_category_list;
                    category.sub_category_list.forEach(item => {
                        if (item.id === sub_category_id) {
                            item.isSelected = !item.isSelected;
                        }
                    })
                }
            })
        })
    }

    const fetchAccountInfo = async () => {
        let result: any = await fetchAccount();
        if (result && !_.isEmpty(result.DT)) {

            let userData = result.DT;

            if (userData.role === "customer") {

                let data = {
                    isAuthenticated: userData.isAuthenticated,
                    account: {
                        id: userData.id,
                        username: userData.username,
                        role: userData.role,
                        customer_id: userData.customer_id
                    },
                    role: "customer"
                }

                dispatch(UserLogin(data));
            }

            else {
                navigate("/");
            }
        }
        else {
            navigate("/");
        }
    }

    const completeAllStep = async () => {
        let selected_sub_category_list: ISelectedSubCategory[] = [];
        
        selectedCategoryList.forEach(item => {
            item.sub_category_list.forEach(sub_category => {
                if(sub_category.isSelected) {
                    let select_sub_category = {
                        id: sub_category.id,
                        title: sub_category.title
                    }
                    selected_sub_category_list.push(select_sub_category);
                }
            })
        });

        let result = await trainingNewCustomer(selected_sub_category_list, account.customer_id);
        if(result && result.EC === 0) {
            navigate("/");
        }
    }

    React.useEffect(() => {
        fetchCategoryList();
        fetchAccountInfo();
    }, []);

    return (
        <div className="w-full relative">
            <div className="header sticky top-0 right-0 left-0 bg-white">
                <div className="h-16 flex items-center ">
                    <div className="text-2xl font-bold px-6 border-r border-black mr-6">
                        <span className='text-black'>Fox</span>
                        <span className='text-[#FCB800]'>Mart</span>
                    </div>
                    <span className="text-xl">Bước {step}/3</span>
                </div>
                <div className="w-full bg-gray-300">
                    <div className={styles}></div>
                </div>
            </div>
            <div className="content">
                {
                    step === 1 &&
                    <div className="w-[48.75rem] mx-auto mt-24 min-h-screen">
                        <div className="text-3xl font-serif font-medium tracking-wide">Để có thể mua được sản phẩm theo nhu cầu của bạn, hãy cùng dành một chút để chúng tôi có thể hiểu bạn hơn.</div>
                        <div className="text-xl mt-6 mb-4">Bạn là khách hàng của chúng tôi</div>
                        <div className="flex flex-col gap-y-3">
                            {
                                STEP_1.map((item, index) => {
                                    return (
                                        <div className="w-full text-xl px-6 py-4 border border-black flex items-center gap-x-4 cursor-pointer" onClick={() => setTypeCustomer(item.id)}>
                                            <div className={item.id === typeCustomer ? 'w-6 h-6 border-2 border-black rounded-full flex items-center justify-center' : 'w-6 h-6 border-2 border-black rounded-full'}>
                                                <div className={item.id === typeCustomer ? 'w-3 h-3 bg-black rounded-full' : ""}></div>
                                            </div>
                                            <span>{item.label}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
                {
                    step === 2 &&
                    <div className="w-[48.75rem] mx-auto mt-24 mb-12 pb-12 min-h-screen">
                        <div className="text-3xl font-serif font-medium tracking-wide">Các loại sản phẩm bạn thường quan tâm ?</div>
                        <div className="mt-4 mb-8 font-medium">CHỌN ÍT NHẤT 1 LOẠI SẢN PHẨM</div>
                        <div className="font-medium text-xl mb-4">Các loại sản phẩm</div>
                        <div className="grid grid-cols-2 gap-4">
                            {
                                categoryList && categoryList.length > 0 &&
                                categoryList.map((item, index) => {
                                    return (
                                        <div key={`category-${index}`} className={selectCategoryStyle(item.isSelected)} onClick={() => handleSelectCategory(item.id)}>
                                            <span className="text-lg">{item.title}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
                {
                    step === 3 &&
                    <div>
                        <div className="w-[48.75rem] mx-auto mt-24 pb-12 min-h-screen">
                            <div className="text-3xl font-serif font-medium tracking-wide mb-8">Các loại sản phẩm bạn đang tìm kiếm ?</div>
                            {
                                selectedCategoryList && selectedCategoryList.length > 0 &&
                                selectedCategoryList.map((item, index) => {
                                    return (
                                        <div key={`selected-category-${index}`} className="mb-8">
                                            <div className="font-medium text-2xl mb-2">{item.title}</div>
                                            <div className="font-medium mb-4 text-sm">CHỌN ÍT NHẤT 3 MẶT HÀNG</div>
                                            <div className="sub_category_list grid grid-cols-2 gap-4">
                                                {
                                                    item.sub_category_list && item.sub_category_list.length > 0 &&
                                                    item.sub_category_list.map((sub_category, index) => {
                                                        return (
                                                            <div
                                                                className="px-6 py-4 border border-black flex items-center gap-x-4 cursor-pointer"
                                                                key={`sub-category-${sub_category.id}`}
                                                                onClick={() => handleSelectSubCategory(item.id, sub_category.id)}
                                                            >
                                                                <div className="w-5 h-5 border border-black flex items-center justify-center">
                                                                    {sub_category.isSelected && <FaCheck />}
                                                                </div>
                                                                <div className="line-clamp-1">{sub_category.title}</div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>

                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>
            <div className="h-16 px-6 sticky left-0 right-0 bottom-0 border-t border-gray-200 bg-white flex items-center justify-between">
                {
                    step !== 1 ?
                        <Button styles="px-5 py-2 border border-black font-medium hover:text-white hover:bg-black transition duration-300" OnClick={() => handleSetStep(step - 1)}>Trở lại</Button>
                        :
                        <Button styles="px-5 py-2 border border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed">Trở lại</Button>
                }
                {
                    step !== 3 ?
                        <Button styles="px-5 py-2 border border-[#FCB800] font-medium bg-[#FCB800] hover:opacity-80 transition duration-300" OnClick={() => handleSetStep(step + 1)}>{typeCustomer === 1 ? "Tiếp tục" : "Hoàn tất"}</Button>
                        :
                        <Button styles="px-5 py-2 border border-[#FCB800] font-medium bg-[#FCB800] hover:opacity-80 transition duration-300" OnClick={() => completeAllStep()}>Bắt đầu mua sắm</Button>
                }
            </div>
        </div>
    )
}

export default NewCustomer;