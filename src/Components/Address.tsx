import { Box, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Payment from './Payment';

const Address = () => {
  return (
    <Box>
        <h2 className="text-3xl font-bold">Address</h2>
        <p className="mt-5 text-lg leading-7 text-gray-500 dark:text-gray-400
        sm:leading-9 sm:truncate">
            Our office is located in the heart of downtown Los Angeles, California. We are easily accessible by public transportation and offer free parking
            186, Bldg. A, Sector 16, Uttar Badda, Dhaka - 1
            <br />
            
        </p>
        <Button sx={{ mt: '20px', mb: '20px' }}
                        variant='contained'
                    ><Payment/></Button>
        
    </Box>
  )
}

export default Address
