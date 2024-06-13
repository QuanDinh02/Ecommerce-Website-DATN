import React from 'react';

interface InputProps {
    length: number
    OTP: string[]
    setOTP: (pin: string[]) => void
    style: string
    onComplete: (pin: string) => void;
};

const OTPInput = (props: InputProps) => {

    const { length, style, OTP, setOTP, onComplete } = props;

    const inputRef = React.useRef<HTMLInputElement[]>(Array(length).fill(null));

    const handleTextChange = (input: string, index: number) => {
        const newPin = [...OTP];
        newPin[index] = input;
        setOTP(newPin);

        // check if the user has entered the first digit, if yes, automatically focus on the next input field and so on.

        if (input.length === 1 && index < length - 1) {
            inputRef.current[index + 1]?.focus();
        }

        if (input.length === 0 && index > 0) {
            inputRef.current[index - 1]?.focus();
        }

        // if user has entered all the digits, grab the digits and set as an argument to the onComplete function.

        if (newPin.every((digit) => digit !== '')) {
            onComplete(newPin.join(''));
        }
    };

    return (
        <div className={`grid grid-cols-6 gap-x-4`}>
            {Array.from({ length }, (_, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={OTP[index]}
                    onChange={(e) => handleTextChange(e.target.value, index)}
                    ref={(ref) => (inputRef.current[index] = ref as HTMLInputElement)}
                    className={style}
                />
            ))}
        </div>
    );
}


export default OTPInput