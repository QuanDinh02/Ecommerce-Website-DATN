
export const numberWithDotFormater = (num: number) => {
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
}

export const numberKFormat = (num: number) => {
    return `${num/1000}k`;
}
export const CurrencyFormat = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}