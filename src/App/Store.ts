import { configureStore } from '@reduxjs/toolkit'
import CounterSlice from '../Features/Counter/CounterSlice'
import todoSlider from '../Features/Todo/TodoSlice'
import ProductsSlice from '../Features/Products/ProductsSlice'



export const Store = configureStore({
    reducer: {
        counter: CounterSlice,
        todo: todoSlider,
        products: ProductsSlice
    }
})


export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch