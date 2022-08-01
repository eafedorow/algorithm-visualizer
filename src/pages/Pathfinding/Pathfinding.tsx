import React, {useState} from 'react'
import s from './Pathfinding.module.scss'
import {GridElement} from "./components/Grid/GridElement";
import {Button} from "../../shared/UI/Button/Button";
import {useDispatch} from "react-redux";
import {actions} from '../../store/reducers/PathfindingSlice'
import {useAppSelector} from "../../hooks/redux";

interface Props {

}

export const Pathfinding = (props: Props) => {

    const dispatch = useDispatch();
    const {setIsPathfinding, setNodeSettingType} = actions;
    const {isPathfinding, nodeSettingType} = useAppSelector(state => state.pathfindingReducer)

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
                        <Button
                            disabled={isPathfinding}
                            onClick={() => dispatch(setIsPathfinding(true))}
                        >
                            Build path</Button>
                        <Button
                            disabled={isPathfinding}
                        >
                            New grid</Button>
                        <Button
                            disabled={!isPathfinding}
                            onClick={() => dispatch(setIsPathfinding(false))}
                        >
                            Stop</Button>
                    </div>
                </div>
                <div className={s.pathfinding__settings_element}>
                    <span>Set the points</span>
                    <div className={s.pathfinding__buttonsContainer}>
                        <Button
                            disabled={isPathfinding}
                            onClick={() => {
                                dispatch(setNodeSettingType('start'.toUpperCase()))
                            }
                        }
                        >
                            Set Start</Button>
                        <Button
                            disabled={isPathfinding}
                            onClick={() => {
                                dispatch(setNodeSettingType('end'.toUpperCase()))
                            }
                        }
                        >
                            Set End</Button>
                        <Button
                            disabled={isPathfinding}
                            onClick={() => {
                                dispatch(setNodeSettingType('wall'.toUpperCase()))
                            }
                        }
                        >
                            Set Wall</Button>
                    </div>
                    <span className={s.status}>{nodeSettingType && `Setting the ${nodeSettingType} node`}</span>
                </div>
            </div>
        </section>
    )
}