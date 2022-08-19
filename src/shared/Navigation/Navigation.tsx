import React from 'react'
import s from './Navigation.module.scss'
import {Link} from "react-router-dom";

interface NavigationProps {
    isVertical?: boolean;
}

export const Navigation = ({isVertical}: NavigationProps) => {
    const navClasses=[s.nav, isVertical ? s.vertNav : ""];
    return (
        <nav className={navClasses.join(' ')}>
            <Link className={s.nav__link} to="/">About</Link>
            <Link className={s.nav__link} to="/sorting">Sorting</Link>
            <Link className={s.nav__link} to="/pathfinding">Pathfinding</Link>
        </nav>
    )
}