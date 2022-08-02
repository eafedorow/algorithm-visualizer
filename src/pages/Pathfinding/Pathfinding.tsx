import React, {useState} from 'react'
import s from './Pathfinding.module.scss'
import {GridElement} from "./components/Grid/GridElement";
import {Button} from "../../shared/UI/Button/Button";
import {useDispatch} from "react-redux";
import {actions} from '../../store/reducers/PathfindingSlice'
import {useAppSelector} from "../../hooks/redux";
import {Grid} from "../../models/classes/Grid";

interface Props {

}

export const Pathfinding = (props: Props) => {

    const dispatch = useDispatch();
    const {setIsPathfinding, setNodeSettingType, setGrid, incrementVisualize, incrementGeneration} = actions;
    const {grid,isPathfinding, nodeSettingType, startRow, startCol, endRow, endCol} = useAppSelector(state => state.pathfindingReducer)

    function regenerateGrid() {
        dispatch(incrementGeneration())
        dispatch(setGrid(new Grid(grid.ROWS, grid.COLS, startRow, startCol, endRow, endCol)));
    }

    return (
        <section className={s.pathfinding}>
            <GridElement/>
            <div className={s.pathfinding__settings}>
                <h2 className={s.pathfinding__title}>
                    Pathfinding settings:
                </h2>
                <div className={s.pathfinding__controls}>
                    <div className={s.pathfinding__settings_element}>
                        <span>Manage the pathfinding</span>
                        <div className={s.pathfinding__buttonsContainer}>
                            <Button
                                disabled={isPathfinding}
                                onClick={() => {
                                    dispatch(setIsPathfinding(true))
                                    dispatch(incrementVisualize())
                                }}
                            >
                                Build path
                            </Button>
                            <Button
                                disabled={isPathfinding}
                                onClick={regenerateGrid}

                            >
                                New grid
                            </Button>
                            {/*<Button
                                disabled={!isPathfinding}
                                onClick={() => dispatch(setIsPathfinding(false))}
                            >
                                Stop
                            </Button>*/}
                        </div>
                    </div>
                    <div className={s.pathfinding__settings_element}>
                        <span>Set the points</span>
                        <div className={s.pathfinding__buttonsContainer}>
                            {/*TODO: Solve the problems with the buttons below*/}
                            {/*<Button
                            disabled={isPathfinding}
                            onClick={() => {
                                dispatch(setNodeSettingType('start'.toUpperCase()))
                            }
                        }
                        >
                            Set Start
                        </Button>*/}
                            {/*<Button*/}
                            {/*    disabled={isPathfinding}*/}
                            {/*    onClick={() => {*/}
                            {/*        dispatch(setNodeSettingType('end'.toUpperCase()))*/}
                            {/*    }*/}
                            {/*}*/}
                            {/*>*/}
                            {/*    Set End</Button>*/}
                            <Button
                                disabled={isPathfinding}
                                onClick={() => {
                                    dispatch(setNodeSettingType('wall'.toUpperCase()))
                                }
                                }
                            >
                                Set unwalkable point</Button>
                        </div>
                        <span className={s.status}>{nodeSettingType && `Setting the ${nodeSettingType} node`}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}