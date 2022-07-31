import {v4} from "uuid";
import {IBarValue} from "../models/interfaces/IBarValue";


export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function resetArray(size?: number):IBarValue[] {
    if(!size) {
        size = getRandomInt(3, 10)
    }
    const newArray: IBarValue[] = [];
    for (let i = 0; i < size; i++) {
        let randomValue = getRandomInt(1,50);
        newArray.push({id: v4(),name: i.toString(), value: randomValue})
    }
    return newArray;
}