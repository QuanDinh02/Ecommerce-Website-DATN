
export const numberWithDotFormater = (num: number) => {
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
}

export const numberKFormat = (num: number) => {
    if(num >= 1000000) {
        return`${num/1000000}tr`;
    }
    if(num >= 1000) {
        return`${num/1000}k`;
    }
    return `${num}`;
}
export const CurrencyFormat = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}