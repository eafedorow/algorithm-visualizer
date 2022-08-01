import {Grid} from "./Grid";

export class Spot {
    x: number;
    y: number;
    isStart: boolean;
    isEnd: boolean;
    g: number;
    f: number;
    h: number;
    distance: number;
    weight: number;
    isWeight: boolean;
    isVisited: boolean;
    neighbours: Spot[];
    isWall: boolean;
    previous: Spot | null;
    constructor(i: number, j: number, isStart: boolean, isEnd: boolean) {
        this.x = i;
        this.y = j;
        this.isStart =  isStart;
        this.isEnd = isEnd;
        this.g = 0;
        this.f = 0;
        this.h = 0;
        this.distance = Infinity;
        this.weight = 0;
        this.isWeight = false;
        this.isVisited = false;
        this.neighbours = [];
        this.isWall = false;
        if(Math.random() < 0.2 && !isStart && !isEnd) {
            this.isWall = true;
        }
        this.previous = null;
    }
    addNodeNeighbours = (grid:Grid) => {
        let i = this.x;
        let j = this.y;
        if(i > 0) this.neighbours.push(grid.nodes![i - 1][j]);
        if(i < grid.ROWS - 1) this.neighbours.push(grid.nodes![i + 1][j]);
        if(j > 0) this.neighbours.push(grid.nodes![i][j - 1]);
        if(j < grid.COLS - 1) this.neighbours.push(grid.nodes![i][j + 1]);
    };
}