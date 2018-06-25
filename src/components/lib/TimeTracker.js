import styled, {keyframes, injectGlobal} from "styled-components";
import {gradientRedTop, gradientRedLeft, gradientGreyLeft, falseGradientGreyLeft,red, black, blue, darkWhite, lightGrey} from "./Colors";
import { FlexRow, MenuIcon, FlexColumn } from "./Base"

export const TrackerWrapper = FlexRow.extend`
  postition: absolute;
  right: 0;
  height: 80px;
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,.1), 0 -1px 0 rgba(0,0,0,.02);
  align-items: center;
  // padding-left: 80px;
  padding-right: 40px;
  z-index: 1;

  > h5{
    margin: 0;
  }
`;

export const ButtonWrapper = FlexRow.extend`
  width: 100px;
  justify-content: center;
  align-items: center;
`;

export const TimerWrapper = ButtonWrapper.extend`
  width: 100px;
  justify-content: center;
  align-items: center;
`;

export const TimerButton = styled.div`
align-self: center;
display: flex;
flex-flow: row;
justify-content: center;
align-items: center;
background: ${gradientRedTop};
border-radius: 50%;
color: white;
height: 40px;
width: 40px;
 margin: 0 auto;
cursor: pointer;
`;

export const TimerInput = styled.input`
  align-self: center;
  border: none;
  border-bottom: 2px solid ${lightGrey};
  padding:5px;
  width: 100%;
  height: 60px;
  font-size:20px;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  &:focus{
    outline: 0;
  }
`;

export const SearchTaskList = FlexColumn.extend`
  width:100%;
  background: ${darkWhite};
  height: 50px;
  position: relative;
  padding-left: 80px;
  justify-content: center;
  font-size:20px;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  box-shadow: 0 2px 4px rgba(0,0,0,.1), 0 -1px 0 rgba(0,0,0,.02);
`;

export const ColorTagWrapper = styled.div`
  width: 100px;
  height: 100%;
  transition: 0.4s all;
  position: relative;
  z-index: 1;
  
`;

export const DropDown = FlexColumn.extend`
width: 100%;
cursor:pointer;
background: #fff;
padding-bottom: 30px;
box-shadow: 0 2px 4px rgba(0,0,0,.1), 0 -1px 0 rgba(0,0,0,.02);
margin-top: 80px;
z-index: -1;
align-items: center;
  > label{
    margin: 20px auto;
    left: 5px;
  }
`;

export const DefaultTag = styled.div`
position: absolute;
top: 30px;
left: 30px;
height: 24px;
width: 24px;
background-color: ${props => props.color};
border-radius: 50%;
-webkit-transition: 0.4s all;
transition: 0.4s all;
opacity: 1;
box-shadow: 0 2px 4px rgba(0,0,0,.1), 0 -1px 0 rgba(0,0,0,.02);
`;