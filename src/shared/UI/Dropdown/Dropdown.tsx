import React, {useState} from 'react'
import s from './Dropdown.module.scss'

interface Props {
    title: string;
    setTitle: (newTitle: string) => void;
    options: string[];
    children?: React.ReactNode;
}

export const Dropdown = ({title, setTitle, options, children}: Props) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className={s.dropdown}>
            <div
                className={s.dropdownBtn}
                onClick={e => setIsActive(!isActive)}
            >
                {title}
                <span className={s.arrowDown}></span>
            </div>
            {isActive && (
                <div className={s.dropdownContent}>
                    {options.map(option => {
                        return (
                            <div
                                key={option}
                                onClick={() => {
                                    setTitle(option)
                                    setIsActive(false)
                                }}
                                className={s.dropdownItem}
                            >
                                {option}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}