import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import sortingReducer from './reducers/SortingSlice'
import pathfindingReducer from "./reducers/PathfindingSlice";

const rootReducer = combineReducers({
    sortingReducer,
    pathfindingReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']