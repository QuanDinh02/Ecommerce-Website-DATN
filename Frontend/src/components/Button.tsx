import React from "react";

interface IProps {
    children: React.ReactNode
    styles: string,
    OnClick?: () => void;
}

const Button = (props: IProps) => {
    const { styles, children, OnClick } = props;

    return (
        <button className={styles} onClick={OnClick}>{children}</button>
    )
}

export default Button;