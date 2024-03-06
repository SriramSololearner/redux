import { Box } from '@mui/material'
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Icon from '../Assets/flipkart-plus_8d85f4.png'
import subIcon from '../Assets/plus_aef861.png';
import { StyleSheet } from '../Features/Products/Styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import { RootState } from '../App/Store';


const Nav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { cart } = useSelector((state: RootState) => state.products);
    return (
        <Box sx={StyleSheet.Header}>
            <Box sx={{ mt: '10px' }} onClick={() => navigate("/")}>
                <Box component={'img'} src={Icon}
                    sx={StyleSheet.flipkartIcon} />

                <Box sx={StyleSheet.exploreTxt}>
                    <Box component={'p'}> Explore</Box> <Box component={'p'} sx={StyleSheet.Plus} >Plus</Box>
                    <Box component={'img'} src={subIcon} sx={StyleSheet.flower} />
                </Box>


            </Box>

            <Box sx={StyleSheet.Cart}
                onClick={() => navigate("/Cart")}
            >

                <ShoppingCartIcon /> <Box component={'span'}> Cart ({cart.length})</Box>
            </Box>

        </Box>
    )
}

export default Nav
