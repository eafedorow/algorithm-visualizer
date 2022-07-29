import {SortingAnimation} from "../../../models/classes/SortingAnimation";
import {IBarValue} from "../../../models/interfaces/IBarValue";


export const selectionSort = (array: IBarValue[]): SortingAnimation[] => {
    let data = array.map(element => {
        return element.value
    });
    const animations: SortingAnimation[] = [];
    let indexMin = 0;
    for (let i = 0; i < data.length; i++) {
        let indexMin = i;
        for (let j = i; j < data.length; j++) {
            animations.push(
                new SortingAnimation(i, j, indexMin,i-1, false, [i,indexMin]));
            if (data[j] < data[indexMin]) {
                indexMin = j;
                animations.push(new SortingAnimation(i, -1, indexMin,i-1, false, [i, indexMin]));
            }
        }
        animations.push(new SortingAnimation(i, -1, indexMin,i-1, true,[i, indexMin]));
        let tmp = data[i];
        data[i] = data[indexMin]
        data[indexMin] = tmp;
    }

    return animations;
}