import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import dog2 from '../assets/dog2.jpg';
import dog3 from '../assets/dog3.jpg';
const Wrapper = styled.div`
  width:100%;
`;
const Page = styled.div`
  width:100%;
`;
export default class Slideview extends React.Component{
    render()
    {
        return(
            <Wrapper>
            <Slider
                speed={500}
                slidesToShow={1}
                slidesToScroll = {1}
                infinite ={false}
                dots={true}
            >
            <img src={dog2} height="300px" ></img>
            <img src={dog3} height="300px" ></img>
            </Slider>
            </Wrapper>
        );
    }
}