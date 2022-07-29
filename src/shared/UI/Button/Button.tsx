import React from 'react'
import s from './Button.module.scss'

interface Props {
    onClick?: () => void;
    children: React.ReactNode;
    disabled?: boolean;
}

export const Button = ({onClick, disabled, children, ...props}: Props) => {
    return (
        <div>
            <button className={s.button} onClick={onClick}  disabled={disabled} {...props}>{children} </button>
        </div>
    )
}