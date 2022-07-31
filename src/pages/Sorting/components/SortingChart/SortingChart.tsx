import React from 'react'
import s from "./SortingChart.module.scss";
import {Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {useAppSelector} from "../../../../hooks/redux";
import {Legend} from "../../../../shared/Legend/Legend";
interface Props {
    colorChecker: (index:number, isPaused: boolean) => string
}

export const SortingChart = ({colorChecker}: Props) => {
    const {data, isSorting, isStopped} = useAppSelector(state => state.sortingReducer);
    return (
        <section className={s.sorting__chart}>
            <ResponsiveContainer  width={'100%'} height={200}>
                <BarChart data={data}>
                    <XAxis dataKey="name" stroke="#06292E" />
                    <YAxis />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Bar dataKey="value" >
                        <LabelList dataKey="value" position="insideTop" fill="white" />
                        {data.map((entry, index) => (
                            <Cell
                                cursor="pointer"
                                fill={colorChecker(index, isSorting || isStopped)}
                                key={entry.id}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            <Legend/>
        </section>
    )
}