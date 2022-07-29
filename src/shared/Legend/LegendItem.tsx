import React from 'react'
import s from "./Legend.module.scss";

interface Props {
    title: string;
    color: string;
}

export const LegendItem = ({title, color}: Props) => {
    const classNames = [s.legend__item__color, color];
    return (
        <div className={s.legend__item}>
            <div className={classNames.join(' ')}></div>
            <span> - {title}</span>
        </div>
    )
}