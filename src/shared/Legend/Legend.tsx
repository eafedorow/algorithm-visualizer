import React from 'react'
import s from './Legend.module.scss'
import {LegendItem} from "./LegendItem";
import {LegendColors} from "../../models/enums/LegendColors";

interface Props {

}

export const Legend = (props: Props) => {
    return (
        <div className={s.legend}>
            <LegendItem color={LegendColors.CURRENT_ELEMENT.toString()} title={"Current element"}/>
            <LegendItem color={LegendColors.COMPARABLE_ELEMENT.toString()} title={"Comparable element"}/>
            <LegendItem color={LegendColors.SWAPPING_ELEMENT.toString()} title={"Swappable element"}/>
            <LegendItem color={LegendColors.MIN_VALUE.toString()} title={"Min. element"}/>
            <LegendItem color={LegendColors.SORTED_ELEMENT.toString()} title={"Sorted element"}/>
            <LegendItem color={LegendColors.UNSORTED_ELEMENT.toString()} title={"Unsorted element"}/>
            <LegendItem color={LegendColors.INITIAL_ELEMENT.toString()} title={"Initial element"}/>
        </div>
    )
}