import {combineReducers, configureStore} from "@reduxjs/toolkit";
import sortingReducer from './reducers/SortingSlice'

const rootReducer = combineReducers({
    sortingReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']