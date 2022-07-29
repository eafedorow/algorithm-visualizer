import React from 'react'
import s from './About.module.scss'

interface Props {

}

export const About = (props: Props) => {
    return (
        <>
            <div className={s.about}>
                <div  className={s.wrapper}>
                    <h1 className={s.about__title}>Algorithm Visualizer</h1>
                    <hr/>
                    <span className={s.about__text} style={{}}>Web applications for sequential visualization of algorithms</span>
                </div>
                <div className={s.author}>
                    <span>Author - Evgenii Fedorow</span>
                    <span>Email - eafedorow@yandex.ru</span>
                    <a href="https://www.flaticon.com/ru/free-icons/" title="Перейти к автору иконок"> Автор иконок - phatplus</a>
                </div>
            </div>
        </>
    )
}