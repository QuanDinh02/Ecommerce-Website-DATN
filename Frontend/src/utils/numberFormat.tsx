
export const numberWithDotFormater = (num: number) => {
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
}

export const numberKFormat = (num: number) => {
    if(num >= 1000000) {
        let value = Math.round((num/1000000) * 10) / 10;
        return`${value}tr`;
    }
    if(num >= 1000) {
        let value = Math.round((num/1000) * 10) / 10;
        return`${value}k`;
    }

    if(num >= 100) {
        return `${num}`;
    }
    return `${num}`;
}

export const CurrencyFormat = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}

export const CurrencyFormatVND = (number) => {
    return new Intl.NumberFormat('it-IT', {style : 'currency', currency : 'VND'}).format(number);
}