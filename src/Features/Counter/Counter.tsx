import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../App/Store";
import { Box, Button } from "@mui/material";
import { increment, decrement } from "./CounterSlice";




const Counter = () => {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch();


    const HandleIncrement = () => {
        dispatch(increment())
    };

    const HandleDecrement = () => {
        if (count > 0)
            dispatch(decrement())

    }
    return (
        <Box mt="50px" display={'flex'} alignItems={'center'} justifyContent={'center'}>
            < Button onClick={HandleIncrement}> + </ Button>
            <Box>
                {count}
            </Box>

            <Button onClick={HandleDecrement}>-</Button>
        </Box >

    )
}

export default Counter