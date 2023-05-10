import {Link} from 'react-router-dom'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';


import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {AddShoppingCart} from '@material-ui/icons'
import accounting from'accounting'
import './item.scss'

const useStyles = makeStyles((theme) => ({
 
  root: {
    maxWidth: 345,
    backgroundColor: 'white', //[500],
    marginTop:"10rem",
    
  },
  action:{
      marginTop:"1rem",

  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9

 
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: 'white',
  },
  mimargen:{
    marginTop: "3rem",
    
 
  },
  card: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: 280,
    },
    margin:'auto',
 
  },

}));
const Item =({product:{id,productName,price,img}}) => {
    
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    return(

      <Card className={classes.card}  >
      <CardHeader
       
        action={
          <Typography
          className={classes.action}
          variant='h5'
          color='textSecondary'
          >
              {accounting.formatMoney(price)}
        
          </Typography>
        }
        title={productName}
        subheader="in-Stock"
      />
       <Link to={`/detalle/${ id }`}> <CardMedia
        className={classes.media}
       image={img}
        title="Paella dish"
      /></Link>
       <Link to={`/detalle/${ id }`}> <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent></Link>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <AddShoppingCart fontSize='large'/>
        </IconButton>
        
        {Array(4)
        .fill()
        .map((_,i)=> (
            <p>&#11088;</p>
        ))}
        <IconButton
          className={clsx(classes.expand, { [classes.expandOpen]: expanded,   })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>"Arvejas verdes"</Typography>
        </CardContent>
      </Collapse>
    </Card>


  
 
    )
}

export default Item

  /* <div className={classes.root}>
         <br></br>
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase className={classes.image}>
          <Link to={`/detalle/${ item.id }`}>
            <img className={classes.img} alt="complex" src={item.img} />
            </Link>
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1">
              <Link to={`/detalle/${ item.id }`}>
              <h2>{item.productName}</h2>
              </Link>
              </Typography>
              <Typography variant="body2" gutterBottom>
                Full resolution 1920x1080 • JPEG
              </Typography>
              <Typography variant="body2" color="textSecondary">
                ID: 1030114
              </Typography>
            </Grid>
            
          </Grid>
          <Grid item>
            <Typography variant="subtitle1"> <h2>$ {item.price}</h2></Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    <br></br>
    <br></br>
  </div> */