import Item1 from '../../../assets/img/homepage/recommend_items/item7.svg';
import Item2 from '../../../assets/img/homepage/recommend_items/item8.svg';
import Item3 from '../../../assets/img/homepage/recommend_items/item9.svg';

export const NOTIFICATION_SAMPLE_DATA = (type: number) => {
    switch (type) {
        case 1:
            return {
                status: "Đã xác nhận thanh toán",
                image: Item1,
                message: "Đơn hàng 1234567HOC123 đã được xác nhận. Vui lòng kiểm tra thời gian nhận hàng dự kiến trong phần Chi tiết đơn hàng.",
                date: "14:00 01-02-2024"
            }
        case 2:
            return {
                status: "Bạn có đơn hàng đang trên đường giao",
                image: Item2,
                message: "Đơn hàng 1234567HOC123 vẫn đang trong quá trình vận chuyển và dự kiến được giao trong 1-2 ngày tới. Vui lòng bỏ qua thông báo này nếu bạn đã nhận được hàng nhé!",
                date: "14:00 01-02-2024"
            }
        case 3:
            return {
                status: "Giao đơn hàng thành công",
                image: Item3,
                message: "Đơn hàng 1234567HOC123 đã giao thành công đến bạn",
                date: "14:00 01-02-2024"
            }
        default:
            return null;
    }
}
