import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
  return (
    <Box sx={{  display: 'flex', justifyContent:"center" ,alignItems:"center",height:"100vh" }}>
      <CircularProgress size={70} />
    </Box>
  );
}
