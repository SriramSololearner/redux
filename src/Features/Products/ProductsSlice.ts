import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Istate {
    Total: number,
    OrderId: string,
    isLoading: boolean,
    isAdded: boolean,
    cart: {
        "id": number,
        "title": string,
        "description": string,
        "price": number,
        "discountPercentage": number,
        "rating": number,
        "stock": number,
        "brand": string,
        "category": string,
        "thumbnail": string,
        "images": string[],
        "qty": number
    }[],
    products: {
        "id": number,
        "title": string,
        "description": string,
        "price": number,
        "discountPercentage": number,
        "rating": number,
        "stock": number,
        "brand": string,
        "category": string,
        "thumbnail": string,
        "images": string[],
        "qty": number

    }[],
    status: string,
    Uid: number
}

export interface Product {
    data: {
        id: number,
        title: string,
        description: string,
        price: number,
        discountPercentage: number,
        rating: number,
        stock: number,
        brand: string,
        category: string,
        thumbnail: string,
        images: string[],
    },

}


const initialState: Istate = {
    Total: 0,
    OrderId: "",
    isLoading: false,
    cart: [],
    products: [],
    status: '',
    Uid: 0,
    isAdded: false,

}

export const ProductsSlider = createSlice({
    name: 'products',
    initialState,

    reducers: {
        AddCart: (state, action) => {

            const { payload } = action
            state.cart.push(payload)
            state.cart.find((ob) => ob.id === payload.id) && (state.isAdded = true)
            state.Uid = payload.id
        },

        RemoveFromCart: (state, action) => {
            state.cart = state.cart.filter((items) => items.id !== action.payload)
            state.Uid = 0

        },
        RemoveAll: (state) => {
            console.log(typeof state.OrderId)
            state.cart = []
        },

        // Increment Qunatity
        Increment: (state, action) => {
            const { payload } = action;
            // console.log(payload)
            let Data = state.cart.find((obj) => obj.id === payload)
            Data && (Data.qty += 1)
        },

        handle: (state, action) => {
            console.log(action)
            state.OrderId = action.payload

        },
        Decrement: (state, action) => {
            const { payload } = action
            let Data = state.cart.find((obj) => obj.id === payload)
            if (Data && Data.qty >= 1)
                Data.qty -= 1

        }

    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = "loading";
                state.isLoading = true;
            })
            .addCase(fetchData.fulfilled, (state, action) => {

                state.status = "succeeded";
                state.isLoading = false;
                const newData = action.payload.map((obj: any) => {
                    let product = { ...obj, qty: 0 }
                    return product
                })
                state.products = newData;
            })
            .addCase(fetchData.rejected, (state) => {
                state.status = "failed";
                state.isLoading = false;

            });
    },

})



export const fetchData = createAsyncThunk('products', async () => {
    const response = await axios.get('https://dummyjson.com/products');
    return response.data.products;
})


export const { AddCart, RemoveFromCart, Increment, Decrement, handle, RemoveAll } = ProductsSlider.actions;

export default ProductsSlider.reducer;