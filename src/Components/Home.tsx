import { Box } from '@mui/material'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Products } from '../Features/Products/Products'
import Nav from './Nav'
import ShoppingCart from './Cart'
import Address from './Address'

const Home = () => {
    return (
        <Box>
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path='/' element={<Products />} />
                    <Route path='/Cart' element={<ShoppingCart />} />
                    <Route path='/Addrs' element = {<Address/>} />
                </Routes>
            </BrowserRouter>
        </Box>
    )
}

export default Home
