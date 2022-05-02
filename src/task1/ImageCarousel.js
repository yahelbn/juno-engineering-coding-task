import React, {useEffect,useState} from "react";
import { fetchImageUrls, fetchImage } from "../api/index";
import "rsuite/dist/rsuite.min.css";

//Components
import {CarouselWrapper, ImageContainer, Column, ButtonIcon} from './ImageCarouselElements'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Loader from 'rsuite/Loader';


//Icons
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ImageCarousel = (props) => {
    const [imagesUrl, setImagesUrl]=useState([])
    const [imageShowIndex, setImageShowIndex] = useState(0)
    const [currentImageShow, setCurrentImageShow] = useState("")
    const [loader, setLoader] = useState(false);



    useEffect(() => {
        fetchImageUrls().then((res)=> {
            setImagesUrl(res);
            setLoader(true)
            fetchImage(0).then( (res) => {
                setImageShowIndex(0)
                setLoader(false);
                setCurrentImageShow(res)
            })
        })
    }, [])

    //Render images 
    const renderImages = () => {
        return loader ? 
            <Loader content="Loading..." size="lg"/> : 
            <img src={currentImageShow} width={'100%'} height={'70%'}/>
    }

    //Show prev Image
    const prevImage = () => {
            let newIndex;
            imageShowIndex-1<0 ? newIndex=imagesUrl.length-1 : newIndex=imageShowIndex-1;
            setLoader(true)
            fetchImage(newIndex).then( (res) => {
                setImageShowIndex(newIndex)
                setLoader(false);
                setCurrentImageShow(res)
            })
    }

    //Show next Image
    const nextImage = () => {
            let newIndex;
            imageShowIndex+1<imagesUrl.length? newIndex=imageShowIndex+1:newIndex=0;
            setLoader(true)
            fetchImage(newIndex).then( (res) => {
                setImageShowIndex(newIndex)
                setLoader(false);
                setCurrentImageShow(res)
            })
    }

    return (
            <CarouselWrapper>
                    <Box>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={2}>
                                <Column>
                                    <ButtonIcon onClick={() => prevImage()}>
                                        <ArrowBackIosNewIcon/>
                                    </ButtonIcon>
                                </Column>
                            </Grid>

                            <Grid item xs={8}>
                                <ImageContainer>
                                    <Column>
                                        {renderImages()}
                                    </Column>
                                </ImageContainer>
                            </Grid>

                            <Grid item xs={2}>
                            <Column>
                                <ButtonIcon onClick={() => nextImage()}>
                                    <ArrowForwardIosIcon/>
                                </ButtonIcon>
                            </Column>
                            </Grid>
                            </Grid>
                    </Box>
                </CarouselWrapper>
                );
            };

export default ImageCarousel;
