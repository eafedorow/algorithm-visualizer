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
}

const COLS = 26;
const ROWS = 15;
let startRow = Math.round(ROWS/2);
let startCol = Math.round(COLS/2);
let endRow = ROWS - 1;
let endCol = COLS - 1


const initialState = {
    isPathfinding: false,
    isNodeSetting: false,
    nodeSettingType: '',
    startRow,
    startCol,
    endRow,
    endCol,
    grid: new Grid(ROWS, COLS, startRow, startCol, endRow, endCol),
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
        }
    }
})

export default pathfindingSlice.reducer;
export const actions = pathfindingSlice.actions;