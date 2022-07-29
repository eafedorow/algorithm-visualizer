import React from 'react'
import {Link} from "react-router-dom";
import s from './Header.module.scss'
import logo from '../../assets/images/logo.png'
import { slide as Menu } from 'react-burger-menu'

interface Props {

}

export const Header = (props: Props) => {
    return (
        <header className={s.header}>
            <div className={s.groupWrapper}>
                <Link to="/" className={s.logo}>
                    <span className={s.logo__title}>Algorithm Visualizer</span>
                    <img src={logo} alt="logo"/>
                </Link>
            </div>
            <div className={s.groupWrapper}>
                <Link className={s.header__link} to="/">About</Link>
                <Link className={s.header__link} to="/sorting">Sorting</Link>
                <Link className={s.header__link} to="/pathfinding">Pathfinding</Link>
            </div>
            {/*ДОДЕЛАТЬ ВСПЛЫВАЮЩУЮ МЕНЮШКУ*/}
            {/*<Menu right >*/}
            {/*    <a id="home" className="menu-item" href="/">Home</a>*/}
            {/*    <a id="about" className="menu-item" href="/about">About</a>*/}
            {/*    <a id="contact" className="menu-item" href="/contact">Contact</a>*/}
            {/*</Menu>*/}
            {/*
                ВСТАВИТЬ ССЫЛКУ НА ИКОНКИ
                <a href="https://www.flaticon.com/ru/free-icons/" title="процесс иконки">Процесс иконки от phatplus - Flaticon</a>
            */}
        </header>
    )
}