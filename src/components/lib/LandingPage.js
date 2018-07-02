import styled, {keyframes} from "styled-components";
import {gradientRedTop, gradientRedLeft, gradientGreyLeft, falseGradientGreyLeft,red, black, blue, darkWhite, lightGrey} from "./Colors";
import {Link} from "react-router-dom"
import Museo from "./../../assets/fonts/museo900-regular-webfont.ttf"



export const BodyWrapper = styled.div`
font-family: Museo;
height: 100vh;
width:100%;
margin: 0;
padding: 0;
background-image: url("https://s3.us-east-2.amazonaws.com/pmff/assets/bg.jpg");
background-size: cover;
background-repeat: no-repeat;
background-position:center;
color: #fff;
display: flex;
flex-flow: column;
// justify-content: center;
`;

export const H1 = styled.h1`
  font-size: 9rem;
  text-align:center;
  font-weight:900;
  margin: 60px 0 0;
  line-height:1;

`;

export const H2 = styled.h2`
  font-size: 1.8rem;
  letter-spacing:3px;
  text-align:center;
  font-weight:900;
  margin: 0;
`;

export const H3 = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-weight: 200;
  font-size: 1.6rem;
  text-align: center;
  margin: 10px auto 50px;
`;


export const Ufo = styled.img`
  width: 200px;
  margin: 0 auto;
`;

export const A= styled.a`
  font-size: 1.8rem;
  text-decoration: none;
  color: #fff;
  text-align: center;
  font-weight: 900;
  letter-spacing:2px;
  background: ${gradientRedTop};
  padding: 10px;
  width: 150px;
  box-shadow: 0 2px 4px rgba(0,0,0,.1), 0 -1px 0 rgba(0,0,0,.02);
  margin-bottom: 1.5rem;
  border-radius: 6px;
  margin: 20px auto;
`;

export const Earth = styled.img`
  min-width: 500px
  margin: 20px auto;
`;

export const PlanetRedBig = styled.img`
  position: absolute;
  top: 40px;
  left: 100px;
  width: 200px;
`;

export const PlanetRedSmall = styled.img`
  position: absolute;
  top: 120px;
  right: 130px;
  width: 130px;
`;