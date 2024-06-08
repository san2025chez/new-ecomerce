import { FC, useState, ChangeEvent, useEffect } from 'react';
import { useContext } from 'react'
import { CartCntext2 } from '../../context/CartCntext2'
import { ItemCounter } from '../ItemCounter/ItemCounter'
import { Link } from 'react-router-dom'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { ReactNode } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import './ItemDetail.scss'

import Paper from '@mui/material/Paper';
import './ItemDetail.scss'



import Text from '../Text/index';

import {
  Typography,
  Box,
  Grid,
  Divider,
  IconButton,
  Button,
  Card,
  Rating,
  FormControl,
  styled,
  TextField,
  Tabs,
  Tab,
  Select,
  Slide,
  MenuItem,
  useTheme
} from '@mui/material';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import { useTranslation } from 'react-i18next';
import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';
import ChevronLeftTwoToneIcon from '@mui/icons-material/ChevronLeftTwoTone';
import { Navigation } from 'swiper/modules';
import { Thumbs, FreeMode } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import { SwiperSlide, Swiper, useSwiper } from 'swiper/react';

// Use SwiperCore modules





import 'swiper/css';// Import Swiper styles
import 'swiper/css/navigation'; // Import Swiper Navigation styles
import 'swiper/css/thumbs'; // 
import 'swiper/css/free-mode';


import { useSnackbar, enqueueSnackbar } from 'notistack';
import { Product } from './prouct-interface'
import { Dispatch, SetStateAction } from 'react';
import numeral from 'numeral';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface ProductBodyProps {
  product: Product;
}



const SwipeIndicator = styled(IconButton)(
  ({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.sm}px) {
        display: none;
    }
    transition: ${theme.transitions.create(['background', 'color'])};
    color: ${theme.colors.primary.main};
    background: ${theme.colors.alpha.white[100]};
    position: absolute;
    width: ${theme.spacing(5)};
    height: ${theme.spacing(5)};
    top: 50%;
    margin-top: ${theme.spacing(-1.5)};
    border-radius: 100px;
    z-index: 5;

    &:hover {
      background: ${theme.colors.alpha.white[100]};
      color: ${theme.colors.alpha.black[100]};
    }

    &.MuiSwipe-left {
      left: ${theme.spacing(0.5)};
    }
    
    &.MuiSwipe-right {
      right: ${theme.spacing(0.5)};
    }
`
);
const IndicatorsContainer = styled(Box)(
  ({ theme }) => `
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 5;
  `
);
const SwiperWrapper = styled(Box)(
  ({ theme }) => `
  .swiper-wrapper {
    .swiper-slide {
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 100%;
        height: auto;
      }
    }
  }

  .swiper-container-thumbs {
    .swiper-wrapper {
      display: flex;
      align-items: center;
    }

    .swiper-slide {
      width: 140px;
      display: flex;
      padding: 3px;

      img {
        width: 100%;
        height: auto;
  
        opacity: .7;
        transition: ${theme.transitions.create(['box-shadow', 'opacity'])};
      }

      &:hover {
        cursor: pointer;

        img {
          opacity: 1;
        }
      }

      &.swiper-slide-thumb-active {
        img {
          opacity: 1;
          box-shadow: 0 0 0 3px ${theme.colors.primary.main};
        }
      }
    }
  }
`
);
export const ItemDetail2: FC<ProductBodyProps> = ({ product }) => {
  const theme = useTheme();
  const { t }: { t: any } = useTranslation();
  const { cart, addItem, isInCart, handleQuantity } = useContext(CartCntext2);
  const [quantity, setQuantity] = useState(1)
  /* const [thumbsSwiper, setThumbsSwiper] = useState<typeof Swiper | null>(null); */
  /*   const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
   */

  /* const [thumbsSwiper, setThumbsSwiper]: [Swiper: any | null, Dispatch<SetStateAction<null>>] = useState(null); */

  // Formatear el precio con puntos como separadores de miles
  const formattedPrice = numeral(product.price).format('$0,0').replace(/,/g, '.');

  const cartCount = (quantity: Number) => {
    if (quantity) {
      let indexItem = cart.findIndex((cartItem: any) => (cartItem.id === product.id));
      if (indexItem !== -1) {
        quantity = quantity;
      };
      return quantity
    } else {
      return null;
    }


  }
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const buttonStyle = {
    //  backgroundColor: "#6a1b9a",
    borderColor: '#6a1b9a',
    fontSize: '12px',
    backgroundColor: '#6a1b9a',
    color: 'white',
    borderRadius: '10px',
    padding: '8px',

    '&:hover': {
      borderColor: '#6a1b9a', // Cambia esto al color deseado para el hover
      // backgroundColor: '#yourDesiredHoverBackgroundColor', // Cambia esto al color deseado para el fondo en hover
      color: '#6a1b9a', // Cambia esto al color deseado para el texto en hover
    },
  };
  const handleCounter = () => {
    console.log("ingreso a contar")
    if (quantity >= 0) {



      addItem(product)
      handleQuantity(product, quantity)
      setQuantity(quantity)
      addItem(product)
      console.log("cantidad en item detail", product);
    }

  }
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [option1, setOption1] = useState('10');

  const handleChange1 = (event: SelectChangeEvent<string>, child: ReactNode) => {
    setOption1(event.target.value);
  };

  const [option2, setOption2] = useState('20');

  const handleChange2 = (event: SelectChangeEvent<string>, child: ReactNode) => {
    setOption2(event.target.value);
  };

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };
  const { enqueueSnackbar } = useSnackbar();

  const handleCart = () => {
    enqueueSnackbar(t('You added a product to cart'), {
      variant: 'success',
      preventDuplicate: false,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center'
      },
      TransitionComponent: Slide
    });
  };

  const handleInputChange = (newValue: number) => {
    // Aquí puedes realizar operaciones adicionales con el nuevo valor de la cantidad
    setQuantity(Math.max(newValue, 1)); // Actualiza la cantidad
  };


  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const isMobile = window.innerWidth <= 768;

  return (

    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item xs={12}>
        <Card variant="outlined" elevation={0}>
        <Grid container spacing={0}>
      
        </Grid>
          <Grid container spacing={0}>
            <Grid
              xs={12}
              md={6}
              item
              sx={{
                position: 'relative'
              }}
            >
              <Box
                component="span"
                sx={{
                  display: { xs: 'none', md: 'inline-block' }
                }}
              >
                <Divider
                  absolute
                  sx={{
                    height: '100%',
                    left: 'auto',
                    right: 0
                  }}
                  orientation="vertical"
                  flexItem
                />
              </Box>
              <Box p={6}>
                <SwiperWrapper>
                  <Box
                    mb={3}
                    sx={{
                      position: 'relative'
                    }}
                  >
                    <Swiper
                      loop
                      autoHeight
                      spaceBetween={10}
                      /*  thumbs={{ swiper: thumbsSwiper }} */
                      modules={[FreeMode, Navigation, Thumbs]}
                      navigation={{
                        nextEl: '.MuiSwipe-right',
                        prevEl: '.MuiSwipe-left'
                      }}
                    >
                      {product.images.map(({ id, url }) => {
                        return (
                          <SwiperSlide key={id}>
                            <img src={url} alt="..." style={{ width: '100%', height: 'auto', maxWidth: isMobile ? '60%' : '50%', maxHeight: isMobile ? '360px' : '350px', }} />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                    <IndicatorsContainer>
                      <SwipeIndicator className="MuiSwipe-root MuiSwipe-left">
                        <ChevronLeftTwoToneIcon />
                      </SwipeIndicator>
                      <SwipeIndicator className="MuiSwipe-root MuiSwipe-right">
                        <ChevronRightTwoToneIcon />
                      </SwipeIndicator>
                    </IndicatorsContainer>

                  </Box>

                  {/*  <Swiper
                    onSwiper={setThumbsSwiper}
                    loop

                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode
                    modules={[FreeMode, Navigation, Thumbs]}
                    watchSlidesProgress

                    navigation={{
                      nextEl: '.MuiSwipe-right',
                      prevEl: '.MuiSwipe-left'
                    }}
                    breakpoints={{
                      500: {
                        slidesPerView: 2,
                        spaceBetween: 10
                      },
                      768: {
                        slidesPerView: 3,
                        spaceBetween: 20
                      },
                      1200: {
                        slidesPerView: 4,
                        spaceBetween: 30
                      }
                    }}
                    // @ts-ignore
                    pagination={{
                      clickable: true,
                      dynamicBullets: true
                    }}
                  >

                    {product.images.map(({ id, url }) => {
                      return (
                        <SwiperSlide key={id}>
                          <img src={url} alt="..." />
                        </SwiperSlide>
                      );
                    })}

                  </Swiper> */}
                </SwiperWrapper>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box p={4} flex={1} textAlign={{ xs: 'center', md: 'left' }}>
              {/*   <Rating
                  readOnly
                  defaultValue={product.price}
                  precision={0.5}
                /> */}
                <Typography
                  variant="h4"
                  sx={{
                    pb: 2,
                    pt: 1,
                    fontSize: ['2rem', '3rem', '3rem'] 
                  }}
                  component="h3"
                >
                  {product.name}
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  flexDirection={{ xs: 'column', md: 'row' }}
                >
                  <Box mb={{ xs: 2, md: 0 }} textAlign={{ xs: 'center', md: 'left' }}>
                    <Typography component="div" variant="caption" gutterBottom>
                      {t('Precio')}
                    </Typography>
                    <Typography
                      component="span"
                      variant={product.price !== 0 ? 'h6' : 'h4'}
                      sx={{
                        pr: 2,
                        textDecorationLine: product.price !== 0 ? 'line-through' : '',
                        fontSize: '0.9em',
                      }}
                    >
                      {formattedPrice}
                    </Typography>
                    {product.price !== 0 && (
                      <Typography component="span" variant="h4" sx={{
                        fontSize: ['1.5rem', '2rem', '2rem'] 
                      }}>
                        <Text color="success">
                          {formattedPrice}
                        </Text>
                      </Typography>
                    )}
                  </Box>

                </Box>
                <Divider
                  sx={{
                    mt: 2
                  }}
                />
                {!isInCart(product.id) ?
     <Box p={2} display="flex" alignItems="stretch" justifyContent="center">
     <Grid container spacing={2} alignItems="stretch">
       <Grid item xs={12} sm={6}>
         <Box display="flex" alignItems="stretch" justifyContent="center" height="100%" >
           <Box p={2} 
           border={1} display="flex" 
           height="80%" 
           width="100%"
          alignItems="center" justifyContent="center"
           >
             <Button
               variant="outlined"
               size="small"
               onClick={handleDecrease}
               disabled={quantity === 0}
               style={{ minWidth: 0, height: '100%', width: '100%',
               border:'none'}} // Ajustamos el ancho y el máximo ancho
             >
               <RemoveIcon />
             </Button>
             <Box mx={2} display="flex" alignItems="center" justifyContent="center">
               <Typography variant="body1">{quantity}</Typography>
             </Box>
             <Button
               variant="outlined"
               size="small"
               onClick={handleIncrease}
               style={{ minWidth: 0, height: '100%', width: '100%', border:'none' }} // Ajustamos el ancho y el máximo ancho
             >
               <AddIcon />
             </Button>
           </Box>
         </Box>
       </Grid>
       <Grid item xs={12} sm={6}>
         <Box display="flex" alignItems="stretch" justifyContent="center" height="80%">
           <Button
             startIcon={<AddShoppingCartTwoToneIcon />}
             variant="contained"
             fullWidth
             style={{ minHeight: '50px', 
             backgroundColor: '#6a1b9a', color: 'white' }} // Ajustamos la altura mínima
             disabled={quantity === 0}
             onClick={() => handleCounter()}
             size="small"
           >
             Agregar al carrito
           </Button>
         </Box>
       </Grid>
     </Grid>
   </Box>
               :
                  <>
                    <Divider
                      sx={{
                        mb: { xs: 3 }
                      }}
                    />
                    <br></br>
                    <Box display="flex" justifyContent="center" alignItems="center" mb={1} sx={{ textAlign: 'center' }}>
  <Typography
    component="span"
    variant="body1"
    sx={{
      fontSize: ['0.8rem', '1rem', '1.2rem'] ,// Tamaños de fuente para dispositivos móviles, tabletas y escritorio respectivamente
      marginRight: '10px'
    }}
  
  >
    Ya agregaste este producto{' '}
  </Typography>
  <Typography
    component="span"
    variant="body1"
    sx={{
      fontSize: ['0.8rem', '1rem', '1.2rem'], // Tamaños de fuente para dispositivos móviles, tabletas y escritorio respectivamente
      display: 'inline-block', // Para evitar subrayado completo
      marginLeft: '10px' // Añade margen izquierdo entre los elementos
    }}
  >
    <Link to='/cart' 
      style={{
        color: '#fff', // Color del texto
        textDecoration: 'none', // Elimina el subrayado
        backgroundColor: '#57CA22', // Color de fondo del enlace
        fontWeight: 'bold', // Hace que el texto sea más visible
        padding: '6px 12px', // Añade relleno al enlace
        borderRadius: '4px', // Añade bordes redondeados al enlace
        fontSize: '0.8rem' // Tamaño de fuente para el enlace
      }}
    >
      Ver carrito
    </Link>
  </Typography>
</Box>                  </>}
           
             
                <Divider
                  sx={{
                    my: 3
                  }}
                />
                {/*   <Typography
                variant="h5"
                sx={{
                  pb: 1
                }}
              >
                {t('Share')}
              </Typography>
              <Button
                sx={{
                  mr: 1
                }}
                variant="outlined"
                size="small"
              >
                Facebook
              </Button>
              <Button
                sx={{
                  mr: 1
                }}
                variant="outlined"
                size="small"
              >
                Twitter
              </Button> */}
                <Typography variant="subtitle2" mb={3} className="justified-text">
                  <div
                    dangerouslySetInnerHTML={{ __html: product.descriptions }}
                  />
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Grid>

    </Grid>

  )
}