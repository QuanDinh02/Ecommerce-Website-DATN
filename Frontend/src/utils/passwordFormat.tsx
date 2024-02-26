
export const passwordFormat = (password: string): string[] => {
    let hidePassword: string[] = [...Array(password.length)].map(item => "*");
    return hidePassword;
}