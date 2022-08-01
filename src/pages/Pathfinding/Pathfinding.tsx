import React from 'react'
import s from './Pathfinding.module.scss'
import {GridElement} from "./components/Grid/GridElement";

interface Props {

}

export const Pathfinding = (props: Props) => {
    return (
        <div className={s.wrapper}>
            <GridElement/>
        </div>
    )
}