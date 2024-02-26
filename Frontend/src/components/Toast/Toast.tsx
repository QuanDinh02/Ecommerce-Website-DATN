import toast from 'react-hot-toast';

const toast_success_1 = {
    style: {
        padding: '0.8rem',
        background: '',
        color: ''
    },
    iconTheme: {
        primary: '#087B44',
        secondary: ''
    }
}

const toast_error_1 = {
    style: {
        padding: '0.8rem',
        background: '',
        color: ''
    },
    iconTheme: {
        primary: '#dd2222',
        secondary: ''
    }
}

export const successToast1 = (message) => {
    toast.success(message, toast_success_1);
}

export const errorToast1 = (message) => {
    toast.error(message, toast_error_1);
}