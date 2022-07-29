
export class SortingAnimation {
    public activeIndex: number;
    public comparableIndex: number;
    public minIndex: number;
    public sortedIndex: number;
    public swapIndex: number[];
    public isSwapping: boolean
    constructor(activeIndex: number, comparableIndex: number, minIndex: number, sortedIndex: number,isSwapping: boolean, swapIndex: number[]) {
        this.activeIndex = activeIndex;
        this.comparableIndex = comparableIndex;
        this.minIndex = minIndex;
        this.sortedIndex = sortedIndex
        this.isSwapping = isSwapping;
        this.swapIndex = swapIndex;
    }


}