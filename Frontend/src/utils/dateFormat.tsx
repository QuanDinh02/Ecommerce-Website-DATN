export const getDayMonthYear = (date_input: string) => {
    let date = new Date(date_input);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    
    return {
        day: day,
        month: month,
        year: year
    }
}

export const dateFormat = (date_input: string) => {
    let date = new Date(date_input);
    let day = date.getUTCDate();
    let month = date.getUTCMonth();
    let year = date.getUTCFullYear();
    return `${day}/${month + 1}/${year}`;
}

export const getRangeOfYears = (startYear: number) => {
    let currentYear: number = new Date().getFullYear();
    let years: number[] = [];
    while (startYear <= currentYear) {
        years.push(startYear++);
    }
    years.reverse();
    return years;
}

export const getRangeOfMonths = () => {
    let currentMonth = 1;
    let months: number[] = [];
    while (currentMonth <= 12) {
        months.push(currentMonth++);
    }
    return months;
}

export const getRangeOfDays = () => {
    let currentMonth = 1;
    let months: number[] = [];
    while (currentMonth <= 31) {
        months.push(currentMonth++);
    }
    return months;
}

export const isValidDate = (day: number, month: number, year: number) => {

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    if (day > monthLength[month - 1]) {
        return false;
    }
    return true;
}
