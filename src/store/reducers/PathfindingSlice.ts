import {Spot} from "../../models/classes/Spot";
import {resetArray} from "../../utils/utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {sortingSlice} from "./SortingSlice";
import {Grid} from "../../models/classes/Grid";
import {useState} from "react";

interface PathfindingState {
    isPathfinding: boolean;
    isNodeSetting: boolean;
    nodeSettingType: string;
    startRow: number;
    startCol: number;
    endRow: number;
    endCol: number;
    grid: Grid;
    path: Spot[];
    visitedNodes: Spot[];
    visualize: number;
    newGridGeneration: number;
}

const COLS = 20;
const ROWS = 12;
let startRow = Math.round(ROWS/2 - 1);
let startCol = Math.round(COLS/2 - 8);
let endRow = Math.round(ROWS/2 - 1);
let endCol = Math.round(COLS/2 + 8);


const initialState = {
    isPathfinding: false,
    isNodeSetting: false,
    nodeSettingType: '',
    startRow,
    startCol,
    endRow,
    endCol,
    path: [],
    visitedNodes: [],
    grid: new Grid(ROWS, COLS, startRow, startCol, endRow, endCol),
    visualize: 0,
    newGridGeneration: 0,
}




export const pathfindingSlice = createSlice({
    name: 'pathfinding',
    initialState,
    reducers: {
        setIsPathfinding(state, action) {
            state.isPathfinding = action.payload;
        },
        setIsNodeSetting(state, action) {
            state.isNodeSetting = action.payload;
        },
        setNodeSettingType(state, action) {
            state.nodeSettingType = action.payload
        },
        setGrid(state, action: PayloadAction<Grid>) {
            state.grid = action.payload;
        },
        setStartRow(state, action) {
            state.startRow = action.payload
        },
        setStartCol(state, action) {
            state.startCol = action.payload
        },
        setEndRow(state, action) {
            state.endRow = action.payload
        },
        setEndCol(state, action) {
            state.endCol = action.payload
        },
        setVisitedNodes(state, action) {
            state.visitedNodes = action.payload;
        },
        setPath(state, action) {
            state.path = action.payload;
        },
        incrementVisualize(state) {
            state.visualize++;
        },
        incrementGeneration(state) {
            state.newGridGeneration++;
        }
    }
})

export default pathfindingSlice.reducer;
export const actions = pathfindingSlice.actions;