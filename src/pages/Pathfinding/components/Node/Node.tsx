import React from 'react'
import s from './Node.module.scss'
import {useAppSelector} from "../../../../hooks/redux";

interface Props {
    isStart: boolean;
    isEnd: boolean;
    row: number;
    col: number;
    isWall: boolean;
    onMouseEnter: (nodeType: string, row: number, col: number) => void;
    onMouseUp: () => void;
    onMouseDown: (nodeType: string, row: number, col: number) => void;
}

export const Node = ({isStart, isEnd, isWall, row, col, onMouseEnter,onMouseDown, onMouseUp}: Props) => {
    const {nodeSettingType} = useAppSelector(state => state.pathfindingReducer)
    const extraClass = isStart ? s.nodeStart : isWall ? s.nodeWall : isEnd ? s.nodeEnd : s.nodeRegular;
    return (
        <div
            onMouseDown={() => { onMouseDown(nodeSettingType, row, col) }}
            onMouseEnter={() => { onMouseEnter(nodeSettingType, row, col)}}
            onMouseUp={() => {onMouseUp()}}
            className={`${s.node} 
            ${extraClass}`}
            id={`node-${row}-${col}`
            }>

        </div>
    )
}