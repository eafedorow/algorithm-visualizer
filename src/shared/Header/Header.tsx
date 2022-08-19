import React from 'react'
import {Link} from "react-router-dom";
import s from './Header.module.scss'
import logo from '../../assets/images/logo.png'
import { slide as Menu } from 'react-burger-menu'
import {Navigation} from "../Navigation/Navigation";

interface Props {

}

export const Header = (props: Props) => {

    const styles = {
        bmBurgerButton: {
            position: 'absolute',
            width: '36px',
            height: '30px',
            right: '36px',
            top: '16px'
        },
        bmBurgerBars: {
            background: '#fff',
            transition: '0.3s'
        },
        bmBurgerBarsHover: {
            background: '#a90000'
        },
        bmCrossButton: {
            height: '24px',
            width: '24px'
        },
        bmCross: {
            background: '#bdc3c7'
        },
        bmMenuWrap: {
            position: 'fixed',
            top: '6px',
            height: '100%'
        },
        bmMenu: {
            background: '#3F8EEBFF',
            padding: '2.5em 1.5em 0',
            fontSize: '1.15em'
        },
        bmMorphShape: {
            fill: '#373a47'
        },
        bmItemList: {
            color: '#b8b7ad',
            padding: '0.8em'
        },
        bmItem: {
            display: 'inline-block'
        },
        bmOverlay: {
            background: 'rgba(0, 0, 0, 0.3)'
        }
    }
    return (
        <header className={s.header} id="outer-container">
            <div className={s.groupWrapper}>
                <Link to="/" className={s.logo}>
                    <span className={s.logo__title}>Algorithm Visualizer</span>
                    <img src={logo} alt="logo"/>
                </Link>
            </div>
            <div className={s.groupWrapper + ' ' + s.menu}>
                <Navigation/>
            </div>
            {/*ДОДЕЛАТЬ ВСПЛЫВАЮЩУЮ МЕНЮШКУ*/}
            <div className={s.burgerMenu}>
                <Menu disableOverlayClick  styles={styles} pageWrapId={"page-wrap"} outerContainerId={"outer-container"}  right>
                    <Navigation isVertical/>
                </Menu>
            </div>

            {/*ВСТАВИТЬ ССЫЛКУ НА ИКОНКИ*/}
            {/*<a href="https://www.flaticon.com/ru/free-icons/" title="процесс иконки">Процесс иконки от phatplus - Flaticon</a>*/}

        </header>
    )
}