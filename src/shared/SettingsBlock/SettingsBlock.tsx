import React from 'react'
import s from './SettingsBlock.module.scss'

interface Props {
    title: string;
    children: React.ReactNode;
}

export const SettingsBlock = ({title, children}: Props) => {
    return (
        <section className={s.settingSection}>
            <h2>{title}</h2>
            <div className={s.contentWrapper}>
                {children}
            </div>
        </section>
    )
}