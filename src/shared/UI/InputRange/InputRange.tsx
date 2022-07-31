import React, {ChangeEvent} from 'react'
import s from './InputRange.module.scss'

interface Props {
    value: number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    min: number;
    max: number;
    step: number
    disabled: boolean;

}

export const InputRange = ({value, onChange, min, max, step, disabled}: Props) => {

    return (
        <div className={s.container}>
            <div className={s.slider + " " + (disabled ? s.disable : s.active) } >
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    defaultValue={value}
                    onChange={onChange}
                    disabled={disabled}
                />
            </div>
        </div>
    )
}