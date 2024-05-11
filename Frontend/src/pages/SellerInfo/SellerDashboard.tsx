import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    AreaChart,
    Area,
    ResponsiveContainer,
    Label,
} from 'recharts';

const data = [
    {
        name: '1',
        revenue: 2400,
    },
    {
        name: '2',
        revenue: 1398,
    },
    {
        name: '3',
        revenue: 9800,
    },
    {
        name: '4',
        revenue: 3908,
    },
    {
        name: '5',
        revenue: 4800,
    },
    {
        name: '6',
        revenue: 3800,
    },
    {
        name: '7',
        revenue: 4300,
    },
    {
        name: '8',
        revenue: 3700,
    },
    {
        name: '9',
        revenue: 4200,
    },
    {
        name: '10',
        revenue: 3600,
    },
    {
        name: '11',
        revenue: 8800,
    },
    {
        name: '12',
        revenue: 9000,
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
        label: "Đã Xử Lý",
        value: 0
    },
    {
        label: "Đơn Hủy",
        value: 0
    },
    {
        label: "Trả Hàng/ Hoàn Tiền Chờ Xử Lý",
        value: 0
    },
    {
        label: "Sản Phẩm Bị Tạm Khóa",
        value: 0
    },
    {
        label: "Sản Phẩm Hết Hàng",
        value: 0
    },
    {
        label: "Chương Trình Khuyến Mãi Chờ Xử Lý",
        value: 0
    },
]

const SellerDashboard = () => {
    return (
        <div>
            <div className='mb-10'>
                <div className="text-black text-lg font-bold">Danh sách cần làm</div>
                <div className='text-gray-500 text-sm mb-4'>Những việc bạn sẽ phải làm</div>
                <div className='grid grid-cols-4 gap-y-2 gap-x-2'>
                    {
                        order_data.map((item, index) => {
                            return (
                                <div className='flex flex-col gap-y-1 items-center justify-center border border-gray-20 py-2' key={`order-type-${index}`}>
                                    <div className='text-blue-500 font-bold'>{item.value}</div>
                                    <div className='text-sm text-center line-clamp-1'>{item.label}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='mb-4'>
                <div className='flex items-center gap-x-3'>
                    <div className="text-black text-lg font-bold">Phân Tích Bán Hàng</div>
                    <div className='text-gray-500 text-sm'>( Hôm nay 00:00 GMT +7 00:00 )</div>
                </div>
                <div className='text-gray-500 text-sm mb-4'>Tổng quan dữ liệu của shop đối với đơn hàng đã xác nhận</div>
                <div className='w-full flex'>
                    <div className='w-1/2'>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart
                                width={500}
                                height={200}
                                data={data}
                                syncId="anyId"
                                margin={{
                                    top: 0,
                                    right: 50,
                                    left: 10,
                                    bottom: 10,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name">
                                    <Label value="Tháng" offset={0} position="insideBottom" />
                                </XAxis>
                                <YAxis label={{ value: 'Doanh số', angle: -90, position: 'left' }} />
                                <Tooltip />
                                <Area type="monotone" dataKey="revenue" stroke="#82ca9d" fill="#82ca9d" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className='w-1/2'>
                        <div className='flex items-center gap-x-16 mb-6 pb-6 border-b border-gray-400'>
                            <div className='flex flex-col gap-y-1 w-fit'>
                                <div>Lượt truy cập</div>
                                <div className='text-xl font-bold'>0</div>
                                <div className='text-sm text-gray-500'>Vs hôm qua 0,00%</div>
                            </div>
                            <div className='flex flex-col gap-y-1 w-fit'>
                                <div>Lượt xem</div>
                                <div className='text-xl font-bold'>0</div>
                                <div className='text-sm text-gray-500'>Vs hôm qua 0,00%</div>
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <div className='flex flex-col gap-y-1 w-fit'>
                                <div>Đơn hàng</div>
                                <div className='text-xl font-bold'>0</div>
                                <div className='text-sm text-gray-500'>Vs hôm qua 0,00%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerDashboard;