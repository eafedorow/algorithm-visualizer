import React, {ChangeEvent, useEffect, useState} from 'react'
import { Button } from '../../shared/UI/Button/Button';
import s from './Sorting.module.scss'
import {resetArray} from "../../utils/utils";
import {selectionSort} from "../../algorithms/sorting/SelectionSort/selectionSort";
import {actions} from '../../store/reducers/SortingSlice'
import {useAppDispatch, useAppSelector} from '../../hooks/redux'
import {SortingChart} from "./components/SortingChart/SortingChart";
import {TimeoutId} from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import {SettingsBlock} from "../../shared/SettingsBlock/SettingsBlock";
import {bubbleSort} from "../../algorithms/sorting/BubbleSort/bubbleSort";
import {Dropdown} from "../../shared/UI/Dropdown/Dropdown";
import {InputRange} from "../../shared/UI/InputRange/InputRange";

interface Props {

}

export const Sorting = (props: Props) => {
    const [delay, setDelay] = useState(400);
    const [timeouts, setTimeouts] = useState<TimeoutId[]>([]);
    const [sortButtonText, setSortButtonText] = useState('Start sort');

    const {
        isSorting,
        isSwapping,
        activeIndex,
        minIndex,
        sortedIndex,
        comparableIndex,
        data,
        arrayLength,
        sortingAlgorithm} = useAppSelector(state => state.sortingReducer);

    const {setActiveIndex,
        setIsSorting,
        setSortedIndex,
        setComparableIndex,
        setMinIndex,
        setIsSwapping,
        setIsStopped,
        setData,
        changeDataElements,
        setArrayLength,
        setSortingAlgorithm} = actions;

    const dispatch = useAppDispatch();

    const algorithms = ['Selection Sort', 'Bubble Sort'];

    /*COMMON FUNCTIONS FOR SORTING*/
    /*TODO: Make enums for color checkers and sorting functions*/
    async function visualizeSorting(sortingAlgorithm: string) {
        switch (sortingAlgorithm) {
            case 'Selection Sort':
                await visualizeSelectionSort();
                break;
            case 'Bubble Sort':
                await visualizeBubbleSort();
                break;
        }
    }
    function colorChecker(colorChecker: string): (index: number, isPaused: boolean) => string {
        switch (colorChecker) {
            case 'Selection Sort':
                return colorCheckerSelection;
            case 'Bubble Sort':
                return colorCheckerBubble;
            default:
                return colorCheckerSelection;
        }
    }

    // SELECTION SORT
    async function visualizeSelectionSort() {
        const animations = selectionSort(data);
        for (let i = 0; i < animations.length; i++) {
            dispatch(setActiveIndex(animations[i].activeIndex))
            dispatch(setComparableIndex(animations[i].comparableIndex))
            dispatch(setSortedIndex(animations[i].sortedIndex))
            await dispatch(setMinIndex(animations[i].minIndex))
            await sleep(delay);
            if (animations[i].isSwapping) {
                dispatch(setIsSwapping(true))
                dispatch(changeDataElements(animations[i].swapIndex));
                await sleep(delay);
                dispatch(setIsSwapping(false))
                dispatch(setSortedIndex(animations[i].activeIndex))
            }
        }
        await sleep(delay)
        dispatch(setIsSorting(false));
        setSortButtonText('Start sort')
    }
    function colorCheckerSelection(index: number, isPaused: boolean): string {
        if(isPaused) {
            if(isSwapping) {
                if (index === activeIndex) {
                    return "#b70b1f"
                } else if(index === minIndex) {
                    return "#b70b1f"
                }
                if(sortedIndex >= 0){
                    if(index <= sortedIndex) {
                        return "#25c1c5"
                    }
                }
                return "#b4c5da"
            } else {
                if (index === activeIndex) {
                    return "#82ca9d"
                } else if (index === comparableIndex) {
                    return "#a9a84b"
                } else if(index === minIndex) {
                    return "#1dc02c"
                }
            }
            if(sortedIndex >= 0){
                if(index <= sortedIndex) {
                    return "#25c1c5"
                }
            }
            return "#b4c5da"
        } else {
            return "#3F8EEB"
        }
    }

    // BUBBLE SORT
    async function visualizeBubbleSort() {
        const animations = bubbleSort(data);
        dispatch(setSortedIndex(data.length + 1))
        for (let i = 0; i < animations.length; i++) {
            dispatch(setActiveIndex(animations[i].activeIndex))
            dispatch(setComparableIndex(animations[i].comparableIndex))


            if(animations[i].isSwapping) {
                dispatch(setIsSwapping(true))
                dispatch(changeDataElements(animations[i].swapIndex));
                await sleep(delay);
                dispatch(setIsSwapping(false))
            }
            await sleep(delay);
            if(animations[i].sortedIndex < data.length) {
                dispatch(setSortedIndex(animations[i].sortedIndex))
            }
            await sleep(delay);
        }
        await sleep(delay)
        dispatch(setIsSorting(false));
        setSortButtonText('Start sort')
    }
    function colorCheckerBubble(index: number, isPaused: boolean): string {
        if(isPaused) {
            if(isSwapping) {
                if (index === activeIndex) {
                    return "#b70b1f"
                } else if(index === comparableIndex) {
                    return "#b70b1f"
                }
                if(sortedIndex < data.length + 1){
                    if(index >= sortedIndex) {
                        return "#25c1c5"
                    }
                }
                return "#b4c5da"
            } else {
                if (index === activeIndex) {
                    return "#82ca9d"
                } else if (index === comparableIndex) {
                    return "#a9a84b"
                }
            }
            if(sortedIndex < data.length + 1){
                if(index >= sortedIndex) {
                    return "#25c1c5"
                }
            }
            return "#b4c5da"
        } else {
            return "#3F8EEB"
        }
    }

    /*UTILS THAT STILL HERE BECAUSE OF DISPATCH*/
    /*TODO: FIGURE OUT HOW TO REMOVE THAT FUNCTION FROM CURRENT FILE*/
    function sleep(ms:number) {
        let promise = new Promise((resolve) => {
            const timeoutHandle = setTimeout(resolve, ms);
            setTimeouts([...timeouts, timeoutHandle])
        });

        return promise;
    }
    function clearTimeouts() {
        timeouts.forEach((t) => {
            clearTimeout(t);
        })
        setTimeouts([])
    }
    function resetColors() {
        dispatch(setIsSwapping(false));
        dispatch(setIsStopped(false));
        dispatch(setIsSorting(false));
    }
    function changeArraySize(e: ChangeEvent<HTMLInputElement>) {
        resetColors();
        dispatch(setArrayLength(Number(e.target.value)))
        dispatch(setData(resetArray(arrayLength)))
        setSortButtonText('Start sort')
    }

    /*BUTTONS BEHAVIOR*/
    async function startSorting() {
        await dispatch(setIsSorting(true))
        await dispatch(setIsStopped(false))
        await visualizeSorting(sortingAlgorithm)
    }
    function generateNewArray() {
        dispatch(setData(resetArray(arrayLength)))
        resetColors();
        setSortButtonText('Start sort')
    }
    function stopSorting() {
        dispatch(setIsSorting(false))
        dispatch(setIsStopped(true))
        clearTimeouts();
        setSortButtonText('Continue')
    }
    function changeAlgorithm(algorithm: string) {
        resetColors();
        clearTimeouts();
        dispatch(setSortingAlgorithm(algorithm))
        setSortButtonText('Start sort')
    }

    return (
        <section className={s.sorting}>
            <SortingChart colorChecker={colorChecker(sortingAlgorithm)}/>
            <SettingsBlock title="Sorting settings">
                <div className={s.settings}>
                    <div className={s.sliders}>
                        {/*TODO: Rebuild like independent component*/}
                        <div className={s.buttonsContainer}>
                            <div className={s.buttons}>
                                <Button
                                    onClick={startSorting}
                                    disabled={isSorting}
                                >
                                    {sortButtonText}
                                </Button>
                                <Button
                                    onClick={generateNewArray}
                                    disabled={isSorting}
                                >
                                    New array
                                </Button>
                                <Button
                                    onClick={stopSorting}
                                    disabled={!isSorting}
                                >
                                    Stop
                                </Button>
                            </div>
                            <div className={s.inputContainer__item}>
                                <span>Pick an algorithm:</span>
                                <Dropdown
                                    title={sortingAlgorithm}
                                    setTitle={changeAlgorithm}
                                    options={algorithms}
                                />
                            </div>
                        </div>
                    </div>

                </div>
                {/*TODO: Rebuild like independent component*/}
                <div className={s.inputContainer}>
                    <div className={s.sliders}>
                        <div className={s.inputContainer__item}>
                            <span>Delay is {delay}</span>
                            <InputRange
                                value={delay}
                                step={10}
                                max={1000}
                                min={10}
                                disabled={isSorting}
                                onChange={(e) => {
                                    setDelay(Number(e.target.value))
                                }}
                            />
                        </div>
                        <div className={s.inputContainer__item}>
                            <span>Elements count is {arrayLength}</span>
                            <InputRange
                                value={arrayLength}
                                step={1}
                                max={50}
                                min={4}
                                onChange={(e) => changeArraySize(e)}
                                disabled={isSorting}
                            />
                        </div>
                    </div>

                </div>
            </SettingsBlock>
        </section>

    )
}