import styled from 'styled-components'

export const CarouselWrapper =styled.div`
    width: 100vw;
    height: 100vh;
`

export const ImageContainer =styled.div`
    height: 100vh;

`


export const Row = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: ${props => props.width || 'auto'};
`

export const Column = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: ${props => props.margin || '0 10px'};
    width: ${props => props.width || '100%'};
    height: ${props => props.height || '100%'};
`

export const ButtonIcon = styled.div`
    cursor: pointer;
`