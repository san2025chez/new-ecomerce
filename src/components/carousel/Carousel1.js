import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core'

import Home from '../../Home/Home';
import omni from '../assets/omni.PNG'
import omni1 from "../assets/omni.jpeg";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


const mock = [{
  "id": 1,
  "nombre": "Imagen 1",
  "imagen": omni
},

{
  "id": 3,
  "nombre": "Imagen 3",
  "imagen": omni1
}]
const useStyles = makeStyles((theme) => ({
  stylegrid: {
    marginBottom: '100px',
    [theme.breakpoints.down('sm')]: {
      margin: '0px',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '00px',
    }
  }
}))
function Carousel1() {

  console.log("imagennnn", mock[0].imagen)
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);


  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
<Container maxWidth="lg" sx={{ width: '100%', maxWidth: '100%', px: 0 }}>


      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"


        style={{ backgroundColor: 'white' }}
      >
          <Grid item xs={12} sm={6} md={4} >
        <Box style={{
          alignItems: "center",
          justifyContent: "center"/* border: '2px solid  #dc004e' */, width: "100%", height: '20%'
        }} sx={{ width: 400, maxHeight: 400, flexGrow: 1 }}
          md={{ width: 900, height: 900, flexGrow: 1 }} >


          <AutoPlaySwipeableViews
          style={{ backgroundColor: 'rgb(100, 50, 150)' }}
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
                    lg={{ width: '100%', height: '100%', flexGrow: 1 }}
                    md={{ width: '100%', height: '100%', flexGrow: 1 }}
                    sm={{ width: '45%', height: '100%', flexGrow: 1 }}
                    sx={{
                      width: '100%',
                      height: '100%',


                      display: 'block',


                      overflow: 'hidden',

                    }}
                    src={step.imagen}
                    alt={step.id}
                    maxHeight='100%'
                    justifyContent='center'
                    alignItems='center'
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>


        </Box>
        <Grid className={classes.stylegrid}><Divider />
        </Grid>
        <Home></Home>
      </Grid>
      </Grid>
      </Container>
  );
}

export default Carousel1;