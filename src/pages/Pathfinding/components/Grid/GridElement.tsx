import React, {useEffect, useState} from 'react'
import {Grid} from "../../../../models/classes/Grid";
import {Spot} from "../../../../models/classes/Spot";
import {Node} from '../Node/Node'
import s from './Grid.module.scss'
import NodesStyles from '../Node/Node.module.scss'

interface Props {

}

const COLS = 26;
const ROWS = 13;

export const GridElement = (props: Props) => {

    useEffect(() => {
        initilizeGrid()
    },[])

    const [startRow, setStartRow] = useState(Math.round(ROWS/2));
    const [startCol, setStartCol] = useState(Math.round(COLS/2));;
    const [endRow, setEndRow ] = useState(ROWS - 1);
    const [endCol, setEndCol] = useState(COLS - 1);
    const [nodes, setNodes] = useState<Spot[][]>();
    const [isPathfinding, setIsPathfinding] = useState(false);
    const [isNodeSetting, setIsNodeSetting] = useState(true);
    const [nodeSettingType, setNodeSettingType] = useState('END');

    const initilizeGrid = () => {

        const grid = new Grid(ROWS, COLS, startRow, startCol, endRow, endCol);
        setNodes(grid.nodes);

    }

    function setNode(nodeSettingType: string, x: number, y: number) {
        const gridNodes = nodes;
        let newNode = gridNodes![x][y];
        switch (nodeSettingType) {
            case "WALL":
                if (!newNode.isStart && !newNode.isEnd) {
                    newNode.isWall = newNode.isWall ? false : true;
                    gridNodes![x][y] = newNode;
                    setNodes(gridNodes);
                }
                break;
            case "START":
                if (!newNode.isStart && !newNode.isEnd) {
                    gridNodes![startRow][startCol].isStart = false;
                    newNode.isStart = true;
                    newNode.isWall = false;
                    gridNodes![x][y] = newNode;
                    setNodes(gridNodes);
                    setStartRow(x);
                    setStartCol(y);
                }
                break;
            case "END":
                if (!newNode.isStart && !newNode.isEnd) {
                    gridNodes![endRow][endCol].isEnd = false;
                    newNode.isEnd = true;
                    newNode.isWall = false;
                    gridNodes![x][y] = newNode;
                    setNodes(gridNodes);
                    setEndRow(x);
                    setEndCol(y);
                }
                break;
            default:
                break;
        }
    }

    function clearGrid() {
        nodes!.map((nodeAxis) => {
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
            setIsNodeSetting(true);
            setNode(nodeSettingType, x, y)
        }
    }

    function onMouseUp() {
        setIsNodeSetting(false);
    }

    function mouseEnterHandle(nodeSettingType: string, x: number, y: number) {
        if(isNodeSetting && nodeSettingType !== "START" && nodeSettingType !== "END") {
            setNode(nodeSettingType, x, y)
        }
    }
    return (
        <div className={s.grid}>
            {nodes?.map((row, rowIndex) => {
                return(
                    <div key={rowIndex} className={s.rowWrapper}>
                        {row.map((col, colIndex) => {
                            const {isStart, isEnd, isWall} = col;
                            return <Node
                                nodeSettingType={nodeSettingType}
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