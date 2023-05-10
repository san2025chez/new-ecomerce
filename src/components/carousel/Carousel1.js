import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import {Divider, Grid} from '@material-ui/core'

import Home from '../../Home/Home';
import omni from '../assets/omni.PNG'
import omni1 from "../assets/omni.jpeg";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


const mock=[  {
  "id": 1,
  "nombre": "Imagen 1",
  "imagen": omni
},

{
  "id": 3,
  "nombre": "Imagen 3",
  "imagen": omni1
}]


function Carousel1() {

  console.log("imagennnn",mock[0].imagen)
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);


  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <>
    <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center"

  
  style={{ backgroundColor:'white', marginTop:'40px'}}
>
    <Box style={{alignItems:"center",
  justifyContent:"center"/* border: '2px solid  #dc004e' */, width:"80%" , height:'20%'}} sx={{ width: 400,maxHeight: 400, flexGrow: 1 }}
    md={{ width: 900 ,height: 900, flexGrow: 1 }} >
  
      
      <AutoPlaySwipeableViews 
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {mock.map((step, index) => (
          <div key={step.id}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                lg={{ width: '100%',height: '100%', flexGrow: 1 }}
                md={{ width: '100%',height: '100%', flexGrow: 1 }}
                sx={{
                 
                  display: 'block',
                 
         
                  overflow: 'hidden',
                  width: '100%',
                  height: '100%'
                }}
                src={step.imagen}
                alt={step.id}
                maxHeight='100%'
                justifyContent='center'
                alignItems= 'center'
              />
             ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>

     
    </Box>
<Grid style={{marginBottom:'20px'}}><Divider/>
</Grid>
    <Home></Home>
    </Grid>
    </>
  );
}

export default Carousel1;