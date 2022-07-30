import {IBarValue} from "../../../models/interfaces/IBarValue";
import {SortingAnimation} from "../../../models/classes/SortingAnimation";

export const bubbleSort = (array: IBarValue[]): SortingAnimation[] => {
    let data = array.map(element => {
        return element.value
    });
    const animations: SortingAnimation[] = [];
    let sortedIndex = data.length;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length - i; j++) {
            animations.push(new SortingAnimation(j, j+1, -1, setSortedIndex(sortedIndex, data.length), false, [j,j+1]));
            if (data[j] > data[j + 1]) {
                animations.push(new SortingAnimation(j, j+1, -1,setSortedIndex(sortedIndex,data.length), true, [j,j+1]));
                let tmp = data[j];
                data[j] = data[j + 1];
                data[j + 1] = tmp;
            }
        }
        sortedIndex = data.length - i;
    }

    return animations;
}

function setSortedIndex(sortedIndex: number, dataLength: number): number{
    return sortedIndex < dataLength ? sortedIndex : dataLength;
}