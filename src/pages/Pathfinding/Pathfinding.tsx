import React from 'react'
import s from './Pathfinding.module.scss'
import {GridElement} from "./components/Grid/GridElement";
import {Button} from "../../shared/UI/Button/Button";

interface Props {

}

export const Pathfinding = (props: Props) => {
    return (
        <section className={s.pathfinding}>
            <GridElement/>
            <div className={s.pathfinding__settings}>
                <h2 className={s.pathfinding__title}>
                    Pathfinding settings:
                </h2>
                <div className={s.pathfinding__settings_element}>
                    <span>Manage the pathfinding</span>
                    <div className={s.pathfinding__buttonsContainer}>
                        <Button>Build path</Button>
                        <Button>New grid</Button>
                        <Button>Stop</Button>
                    </div>
                </div>
                <div className={s.pathfinding__settings_element}>
                    <span>Set the points</span>
                    <div className={s.pathfinding__buttonsContainer}>
                        <Button>Set Start</Button>
                        <Button>Set End</Button>
                        <Button>Set Wall</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}