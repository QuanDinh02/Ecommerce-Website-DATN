import axios from '../customization/axiosCustomization';

export const updateProductRecommendClick = (product_id: number) => {
    axios.put('/api/product/recommend', { id: product_id });
}