import AnimatedNumber from '@/components/AnimatedNumber';
import CopyClipboard from '@/components/CopyClipboard';
import { getDashboardData } from '@/services/sellerService';
import { CurrencyFormatVND } from '@/utils/numberFormat';
import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IoIosArrowForward } from "react-icons/io";

const data = [
    {
        name: 'T1',
        revenue: 0,
        sales: 0,
    },
    {
        name: 'T2',
        revenue: 0,
        sales: 0,
    },
    {
        name: 'T3',
        revenue: 0,
        sales: 0,
    },
    {
        name: 'T4',
        revenue: 0,
        sales: 0,
    },
    {
        name: 'T5',
        revenue: 0,
        sales: 0,
    },
    {
        name: 'T6',
        revenue: 0,
        sales: 0,
    },
    {
        name: 'T7',
        revenue: 0,
        sales: 0,
    },
    {
        name: 'T8',
        revenue: 0,
        sales: 0,
    },
    {
        name: 'T9',
        revenue: 0,
        sales: 0,
    },
    {
        name: 'T10',
        revenue: 0,
        sales: 0,
    },
    {
        name: 'T11',
        revenue: 0,
        sales: 0,
    },
    {
        name: 'T12',
        revenue: 0,
        sales: 0,
    },
];

const order_data = [
    {
        label: "Chờ xác nhận",
        value: 0
    },
    {
        label: "Chờ lấy hàng",
        value: 0
    },
    {
        label: "Đang giao hàng",
        value: 0
    },
    {
        label: "Đã giao hàng thành công",
        value: 0
    },
    {
        label: "Đơn Hủy",
        value: 0
    }
]

const tableWillOutOfStockHeaders = [
    {
        name: "Tên sản phẩm",
        size: 2
    },
    {
        name: "Mã sản phẩm",
        size: 1
    },
    {
        name: "Số lượng",
        size: 1
    },
    {
        name: "Giá bán",
        size: 1
    }
];

interface IProduct {
    id: number
    name: string
    quantity: number
    price: number
}

interface IProductList {
    quantity: number
    data: IProduct[]
}

interface IMonthReport {
    name: string
    revenue: number
    sales: number
}
interface IDashboardData {
    analysis_data: IMonthReport[]
    overview_data: number[]
    out_of_order_product_list: IProductList
    soon_out_of_order_product_list: IProductList
}

const SellerDashboard = () => {

    const [dataLoading, setDataLoading] = React.useState<boolean>(true);

    const [dashboardData, setDashboardData] = React.useState<number[]>([0, 0, 0, 0, 0]);
    const [analysisData, setAnalysisData] = React.useState<IMonthReport[]>(data);

    const [outOfOrderProductData, setOutOfOrderProductData] = React.useState<IProduct[]>([]);
    const [soonOutOfOrderProductData, setSoonOutOfOrderProductData] = React.useState<IProduct[]>([]);

    const [quantityOutOfOrder, setQuantityOutOfOrder] = React.useState<number>(0);
    const [quantitySoonOutOfOrder, setQuantitySoonOutOfOrder] = React.useState<number>(0);

    const fetchDashboardData = async () => {
        let result: IDashboardData = await getDashboardData();
        if (result) {

            setDashboardData(result.overview_data);
            setAnalysisData(result.analysis_data);

            setOutOfOrderProductData(result.out_of_order_product_list.data);
            setQuantityOutOfOrder(result.out_of_order_product_list.quantity);

            setSoonOutOfOrderProductData(result.soon_out_of_order_product_list.data);
            setQuantitySoonOutOfOrder(result.soon_out_of_order_product_list.quantity);
        }
    }

    React.useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        fetchDashboardData();

        setTimeout(() => {
            setDataLoading(false);
        }, 800);
    }, []);

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
                    <div>
                        <div className='mb-10'>
                            <div className="text-black text-lg">Danh sách cần làm</div>
                            <div className='text-gray-500 text-sm mb-4'>Những việc bạn sẽ phải làm</div>
                            <div className='grid grid-cols-4 gap-y-2 gap-x-2'>
                                {
                                    order_data.map((item, index) => {
                                        return (
                                            <div className='flex flex-col gap-y-1 items-center justify-center border border-gray-20 py-2' key={`order-type-${index}`}>
                                                <div className='text-blue-500 font-bold'><AnimatedNumber n={dashboardData[index]} /></div>
                                                <div className='text-sm text-center line-clamp-1'>{item.label}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='mb-10'>
                            <div className="text-black text-lg">Phân Tích Bán Hàng</div>
                            <div className='text-gray-500 text-sm mb-4'>Tổng quan dữ liệu của shop đối với đơn hàng đã giao hàng thành công</div>
                            <div className='w-full flex'>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart
                                        width={500}
                                        height={300}
                                        data={analysisData}
                                        margin={{
                                            top: 5,
                                            right: 50,
                                            left: 50,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis yAxisId="left" orientation="left" stroke="#228b22"
                                            tickFormatter={(value) =>
                                                new Intl.NumberFormat('vi-VN', { currency: 'VND', compactDisplay: "short", notation: "compact", }).format(value)
                                            }
                                        />
                                        <YAxis yAxisId="right" orientation="right" stroke="#ff8408" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar yAxisId="left" name="Doanh thu" dataKey="revenue" fill="#228b22" activeBar={<Rectangle fill="green" stroke="#228b22" />} />
                                        <Bar yAxisId="right" name="Doanh số" dataKey="sales" fill="#ff8408" activeBar={<Rectangle fill="orange" stroke="#ff8408" />} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className='flex gap-x-4 mb-10'>
                            <div className='w-1/2'>
                                <div className='mb-4 flex items-center justify-between'>
                                    <div className='text-lg'>Sản phẩm hết hàng</div>
                                    <div className='hover:underline text-blue-600 flex items-center cursor-pointer text-red-500'>Xem thêm <IoIosArrowForward /></div>
                                </div>
                                <table className="table-fixed w-full border">
                                    <thead>
                                        <tr className='bg-gray-100 border-b-10 border-white'>
                                            {tableWillOutOfStockHeaders && tableWillOutOfStockHeaders.length > 0 &&
                                                tableWillOutOfStockHeaders.map((item, index) => {
                                                    if (index === 2) {
                                                        return (
                                                            <th key={`header-${index}`} className="text-center py-3 px-3 font-medium" colSpan={item.size}>{item.name}</th>
                                                        )
                                                    }
                                                    if (index === 3) {
                                                        return (
                                                            <th key={`header-${index}`} className="text-right py-3 px-3 font-medium" colSpan={item.size}>{item.name}</th>
                                                        )
                                                    }
                                                    return (
                                                        <th key={`header-${index}`} className="text-left py-3 px-3 font-medium" colSpan={item.size}>{item.name}</th>
                                                    )
                                                })
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            (outOfOrderProductData && outOfOrderProductData.length > 0) ?
                                                <>

                                                    {outOfOrderProductData.map((item, index) => {
                                                        return (
                                                            <tr className="border-b border-gray-200 text-sm hover:bg-gray-100" key={`product-will-out-of-stock-${index}`}>
                                                                <td className="py-4 px-2" colSpan={2}><span className='line-clamp-1'>{item.name}</span></td>
                                                                <td className="py-4 px-2" colSpan={1}>
                                                                    <span className='flex items-center gap-x-1 cursor-pointer w-fit'>{item.id}<CopyClipboard value={item.id} /></span>
                                                                </td>
                                                                <td className="py-4 px-2 text-center text-red-500" colSpan={1}>{item.quantity}</td>
                                                                <td className="py-4 px-2 text-end font-semibold" colSpan={1}>{CurrencyFormatVND(item.price)}</td>
                                                            </tr>
                                                        )
                                                    })}

                                                </>
                                                :
                                                <tr>
                                                    <td className="text-center py-3" colSpan={5}>
                                                        <div className="w-full text-gray-500 text-center py-2">Không có dữ liệu !</div>
                                                    </td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>
                                {
                                    quantityOutOfOrder - 3 > 0 && <div className='text-end italic text-sm mt-2'>và <span className='font-medium'>{quantityOutOfOrder - 3}</span> sản phẩm khác</div>
                                }
                            </div>
                            <div className='w-1/2'>
                                <div className='mb-4 flex items-center justify-between'>
                                    <div className='text-lg'>Sản phẩm sắp hết hàng</div>
                                    <div className='hover:underline text-blue-600 flex items-center cursor-pointer'>Xem thêm <IoIosArrowForward /></div>
                                </div>
                                <table className="table-fixed w-full border">
                                    <thead>
                                        <tr className='bg-gray-100 border-b-10 border-white'>
                                            {tableWillOutOfStockHeaders && tableWillOutOfStockHeaders.length > 0 &&
                                                tableWillOutOfStockHeaders.map((item, index) => {
                                                    if (index === 2) {
                                                        return (
                                                            <th key={`header-${index}`} className="text-center py-3 px-3 font-medium" colSpan={item.size}>{item.name}</th>
                                                        )
                                                    }
                                                    if (index === 3) {
                                                        return (
                                                            <th key={`header-${index}`} className="text-right py-3 px-3 font-medium" colSpan={item.size}>{item.name}</th>
                                                        )
                                                    }
                                                    return (
                                                        <th key={`header-${index}`} className="text-left py-3 px-3 font-medium" colSpan={item.size}>{item.name}</th>
                                                    )
                                                })
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            (soonOutOfOrderProductData && soonOutOfOrderProductData.length > 0) ?
                                                <>

                                                    {soonOutOfOrderProductData.map((item, index) => {
                                                        return (
                                                            <tr className="border-b border-gray-200 text-sm hover:bg-gray-100" key={`product-will-out-of-stock-${index}`}>
                                                                <td className="py-4 px-2" colSpan={2}><span className='line-clamp-1'>{item.name}</span></td>
                                                                <td className="py-4 px-2" colSpan={1}>
                                                                    <span className='flex items-center gap-x-1 cursor-pointer w-fit'>{item.id}<CopyClipboard value={item.id} /></span>
                                                                </td>
                                                                <td className="py-4 px-2 text-center text-blue-600" colSpan={1}>{item.quantity}</td>
                                                                <td className="py-4 px-2 text-end font-semibold" colSpan={1}>{CurrencyFormatVND(item.price)}</td>
                                                            </tr>
                                                        )
                                                    })}

                                                </>
                                                :
                                                <tr>
                                                    <td className="text-center py-3" colSpan={5}>
                                                        <div className="w-full text-gray-500 text-center py-2">Không có dữ liệu !</div>
                                                    </td>
                                                </tr>
                                        }
                                    </tbody>
                                </table>
                                {
                                    quantitySoonOutOfOrder - 3 > 0 && <div className='text-end italic text-sm mt-2'>và <span className='font-medium'>{quantitySoonOutOfOrder - 3}</span> sản phẩm khác</div>
                                }
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default SellerDashboard;