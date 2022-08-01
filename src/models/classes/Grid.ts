import {Spot} from "./Spot";

export class Grid {
    nodes: Spot[][];
    ROWS: number;
    COLS: number
    constructor(ROWS: number, COLS: number, startRow: number, startCol: number, endRow: number, endCol: number) {
        this.ROWS = ROWS;
        this.COLS = COLS;
        this.nodes = [];
        for (let i = 0; i < this.ROWS; i++) {
            this.nodes[i] = [];
            for (let j = 0; j < this.COLS; j++) {
                let isStart = (i === startRow && j === startCol);
                let isEnd = (i === endRow && j === endCol);
                this.nodes[i][j] = new Spot(i, j, isStart, isEnd);
            }
        }
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                this.nodes![i][j].addNodeNeighbours(this);
            }
        }
    }

}