
export const dateFormat = (date_input: string) => {
    let date = new Date(date_input);
    let day = date.getUTCDate();
    let month = date.getUTCMonth();
    let year = date.getUTCFullYear();
    return `${day}/${month + 1}/${year}`;
}
