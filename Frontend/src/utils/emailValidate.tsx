
const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const isValidEmail = (email: string) => {
    const pattern =  EMAIL_PATTERN;
    return pattern.test(email);
}