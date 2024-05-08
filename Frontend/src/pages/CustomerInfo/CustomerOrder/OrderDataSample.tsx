import Item1 from '../../../assets/img/homepage/recommend_items/item7.svg';
import Item2 from '../../../assets/img/homepage/recommend_items/item8.svg';
import Item3 from '../../../assets/img/homepage/recommend_items/item9.svg';

export const ORDER_SAMPLE_DATA = [
    {
        id: 1,
        status: "ĐANG XỬ LÝ",
        note: "Đơn hàng sẽ được chuẩn bị và chuyển đi trước 07-02-2024",
        shop_info: {
            id: 1,
            name: "Fox.vn"
        },
        order_items: [
            {
                id: 1,
                name: "Samsung Gear VR Virtual Reality Headset",
                image: Item1,
                quantity: 3,
                label: "Trả hàng miễn phí 15 ngày",
                current_price: 149000,
                price: 189000
            },
            {
                id: 2,
                name: "Samsung Gear VR Virtual Reality Headset",
                image: Item2,
                quantity: 3,
                label: "Trả hàng miễn phí 15 ngày",
                current_price: 549000,
                price: 549000
            },
            {
                id: 3,
                name: "Samsung Gear VR Virtual Reality Headset",
                image: Item3,
                quantity: 3,
                label: "Trả hàng miễn phí 15 ngày",
                current_price: 10149000,
                price: 13149000
            }
        ],
        total: 10847000
    },
    {
        id: 2,
        status: "CHỜ GIAO HÀNG",
        note: "Vui lòng chỉ nhấn “Đã nhận được hàng” khi đơn hàng đã được giao đến bạn và sản phẩm nhận được không có vấn đề nào.",
        shop_info: {
            id: 1,
            name: "Fox.vn"
        },
        order_items: [
            {
                id: 1,
                name: "Samsung Gear VR Virtual Reality Headset",
                image: Item1,
                quantity: 3,
                label: "Trả hàng miễn phí 15 ngày",
                current_price: 149000,
                price: 189000
            },
            {
                id: 3,
                name: "Samsung Gear VR Virtual Reality Headset",
                image: Item3,
                quantity: 3,
                label: "Trả hàng miễn phí 15 ngày",
                current_price: 10149000,
                price: 13149000
            }
        ],
        total: 10847000
    },
    {
        id: 3,
        status: "GIAO HÀNG THÀNH CÔNG",
        note: "Đang chờ bạn đánh giá.",
        shop_info: {
            id: 1,
            name: "Fox.vn"
        },
        order_items: [
            {
                id: 1,
                name: "Samsung Gear VR Virtual Reality Headset",
                image: Item1,
                quantity: 3,
                label: "Trả hàng miễn phí 15 ngày",
                current_price: 149000,
                price: 189000
            },
            {
                id: 3,
                name: "Samsung Gear VR Virtual Reality Headset",
                image: Item3,
                quantity: 3,
                label: "Trả hàng miễn phí 15 ngày",
                current_price: 10149000,
                price: 13149000
            }
        ],
        total: 10847000
    }
]