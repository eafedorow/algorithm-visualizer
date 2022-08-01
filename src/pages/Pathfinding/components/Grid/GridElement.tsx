import React, {useEffect, useState} from 'react'
import {Grid} from "../../../../models/classes/Grid";
import {Spot} from "../../../../models/classes/Spot";
import {Node} from '../Node/Node'
import s from './Grid.module.scss'
import NodesStyles from '../Node/Node.module.scss'
import {useDispatch} from "react-redux";
import {actions} from "../../../../store/reducers/PathfindingSlice";
import {useAppSelector} from "../../../../hooks/redux";


interface Props {

}


export const GridElement = (props: Props) => {

    const dispatch = useDispatch();
    const {
        setGrid,
        setNodeSettingType,
        setIsNodeSetting,
        setStartRow,
        setIsPathfinding,
        setEndCol,
        setEndRow,
        setStartCol
    } = actions;

    const {
        startRow,
        startCol,
        endRow,
        endCol,
        grid,
        isPathfinding,
        isNodeSetting,
        nodeSettingType,
    } = useAppSelector(state => state.pathfindingReducer)

    async function setNode(nodeSettingType: string, x: number, y: number) {
        let newGrid = grid;
        let newNode = newGrid.nodes![x][y];
        switch (nodeSettingType) {
            case "WALL":
                if (!newNode.isStart && !newNode.isEnd) {
                    newNode.isWall = !newNode.isWall;
                    newGrid.nodes![x][y] = newNode;
                    await dispatch(setGrid(newGrid));
                }
                break;
            case "START":
                if (!newNode.isStart && !newNode.isEnd) {
                    grid.nodes![startRow][startCol].isStart = false;
                    newNode.isStart = true;
                    newNode.isWall = false;
                    newGrid.nodes![x][y] = newNode;
                    dispatch(setStartRow(x));
                    dispatch(setStartCol(y));
                    dispatch(setGrid(newGrid));
                }
                break;
            case "END":
                if (!newNode.isStart && !newNode.isEnd) {
                    grid.nodes![endRow][endCol].isEnd = false;
                    newNode.isEnd = true;
                    newNode.isWall = false;
                    newGrid.nodes![x][y] = newNode;
                    dispatch(setEndRow(x));
                    dispatch(setEndCol(y));
                    dispatch(setGrid(newGrid));
                }
                break;
            default:
                break;
        }
    }

    function clearGrid() {
        grid.nodes!.map((nodeAxis) => {
            nodeAxis.map((node) => {
                if(!node.isStart && !node.isEnd && !node.isWall) {
                    // @ts-ignore
                    document.getElementById(`node-${node.x}-${node.y}`).className =`${NodesStyles.node}`;
                }
            })
        })
    }

    function onMouseDown (nodeSettingType: string, x: number, y: number) {
        if(!isPathfinding) {
            clearGrid();
            dispatch(setIsNodeSetting(true));
            setNode(nodeSettingType, x, y)
        }
    }

    function onMouseUp() {
        dispatch(setIsNodeSetting(false));
    }

    /*TODO: IMPROVE THAT METHOD*/
    async function mouseEnterHandle(nodeSettingType: string, x: number, y: number) {
       /* if(isNodeSetting && nodeSettingType !== "START" && nodeSettingType !== "END") {
            setNode(nodeSettingType, x, y)
        }*/
    }
    return (
        <div className={s.grid}>
            {grid.nodes?.map((row, rowIndex) => {
                return(
                    <div key={rowIndex} className={s.rowWrapper}>
                        {row.map((col, colIndex) => {
                            const {isStart, isEnd, isWall} = col;
                            return <Node
                                key={colIndex}
                                isStart={isStart}
                                isEnd={isEnd}
                                row={rowIndex}
                                col={colIndex}
                                isWall={isWall}
                                onMouseEnter={() => mouseEnterHandle(nodeSettingType, rowIndex, colIndex)}
                                onMouseUp={() => {onMouseUp()}}
                                onMouseDown={() => {onMouseDown(nodeSettingType, rowIndex, colIndex)}}
                            />
                        })}
                    </div>
                )
            })}
        </div>
    )
}