import React, {useEffect, useState} from 'react'
import {Grid} from "../../../../models/classes/Grid";
import {Spot} from "../../../../models/classes/Spot";
import {Node} from '../Node/Node'
import s from './Grid.module.scss'
import NodesStyles from '../Node/Node.module.scss'
import {useDispatch} from "react-redux";
import {actions} from "../../../../store/reducers/PathfindingSlice";
import {useAppSelector} from "../../../../hooks/redux";
import {TimeoutId} from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import Astar from "../../../../algorithms/pathfinding/Astar/Astar";


interface Props {

}


export const GridElement = (props: Props) => {
    const [timeoutsArray, setTimeoutsArray] = useState<TimeoutId[]>([]);
    const dispatch = useDispatch();
    const {
        setGrid,
        setNodeSettingType,
        setIsNodeSetting,
        setStartRow,
        setIsPathfinding,
        setEndCol,
        setEndRow,
        setStartCol,
        setPath,
        setVisitedNodes,
    } = actions;

    const {
        startRow,
        startCol,
        endRow,
        endCol,
        grid,
        isPathfinding,
        visualize,
        path,
        visitedNodes,
        nodeSettingType,
        newGridGeneration
    } = useAppSelector(state => state.pathfindingReducer)

    useEffect(() => {
        visualizePath();
    },[visualize])

    useEffect(() => {
        clearGrid();
        buildPath();
    },[newGridGeneration])

    function sleep(ms:number) {
        let promise = new Promise((resolve) => {
            const timeoutHandle = setTimeout(resolve, ms);
            setTimeoutsArray([...timeoutsArray, timeoutHandle])
        });

        return promise;
    }

    async function setNode(nodeSettingType: string, x: number, y: number) {
        let newGrid = grid;
        let newNode = newGrid.nodes![x][y];
        switch (nodeSettingType) {
            case "WALL":
                if (!newNode.isStart && !newNode.isEnd) {
                    newNode.isWall = !newNode.isWall;
                    newGrid.nodes![x][y] = newNode;
                    dispatch(setGrid(newGrid));
                    buildPath();
                }
                break;
            case "START":
                if (!newNode.isStart && !newNode.isEnd) {
                    grid.nodes![startRow][startCol].isStart = false;
                    newNode.isStart = true;
                    newNode.isWall = false;
                    grid.nodes![x][y] = newNode;
                    await dispatch(setStartRow(x));
                    await dispatch(setStartCol(y));
                    await dispatch(setGrid(newGrid));
                }
                break;
            case "END":
                if (!newNode.isStart && !newNode.isEnd) {
                    grid.nodes![endRow][endCol].isEnd = false;
                    newNode.isEnd = true;
                    newNode.isWall = false;
                    newGrid.nodes![x][y] = newNode;
                    await dispatch(setEndRow(x));
                    await dispatch(setEndCol(y));
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

    const visulaizeShortestPath = (shortestPathNodes: Spot[]) => {
        for (let i = 0; i < shortestPathNodes.length; i++) {
            const timeoutHandle = setTimeout(() => {
                const node = shortestPathNodes[i];
                if(!node.isStart && !node.isEnd) {
                    // @ts-ignore
                    document.getElementById(`node-${node.x}-${node.y}`).className =
                        `${NodesStyles.node} ${NodesStyles.nodeShortestPath}`;
                }
            }, 20 * i)
            setTimeoutsArray([...timeoutsArray,timeoutHandle]);
        }
        const timeoutHandle = setTimeout(() => {
            dispatch(setIsPathfinding(false));
        }, shortestPathNodes.length * 20 + 1)
    }

    function buildPath(
        startX = startRow || 0,
        startY = startCol || 0,
        endX = endRow,
        endY = endCol
    ) {
        const startNode = grid.nodes![startX][startY];
        const endNode = grid.nodes![endX][endY];
        let {path, visitedNodes} = Astar(startNode, endNode);
        dispatch(setPath(path));
        dispatch(setVisitedNodes(visitedNodes))
    }

    const visualizePath = () => {
        clearGrid();
        for (let i = 0; i <= visitedNodes.length; i++) {
            if(i === visitedNodes.length) {
                const timeoutHandle = setTimeout(() => {
                    visulaizeShortestPath(path);
                }, 20 * i)
                setTimeoutsArray([...timeoutsArray,timeoutHandle]);
            } else {
                const timeoutHandle =  setTimeout(() => {
                    const node: Spot = visitedNodes[i];
                    if(!node.isStart && !node.isEnd) {
                        // @ts-ignore
                        document.getElementById(`node-${node.x}-${node.y}`).className =
                            `${NodesStyles.node} ${NodesStyles.visited}`;
                    }
                }   , 20 * i)
                setTimeoutsArray([...timeoutsArray,timeoutHandle]);
            }
        }
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