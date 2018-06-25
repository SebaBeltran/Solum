import styled, {keyframes, injectGlobal} from "styled-components";
import {gradientRedTop, gradientRedLeft, gradientGreyLeft, falseGradientGreyLeft,red, black, blue, darkWhite, lightGrey} from "./Colors";
import { FlexRow, FlexColumn, ContactFront } from "./Base"

export const StatisticsWrapper = FlexRow.extend`
  height: 110px;
  width: 90%;
  background: ${gradientRedLeft};
  position: relative;
  left: -50px;
  top: -40px;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  color: #fff;
  
  h3{
    line-height: 1;
    margin: 0;
    font-size: 50px;
    font-weight: 100;
  }
  h6{
    line-height: 1;
    margin: 0;
    font-size: 12px;
    letter-spacing: 1px;
    // text-align: left;
  }
`;

export const Productivity = ContactFront.extend`
  width: 100%;

  h4{
    align-self: flex-start
    font-size: 20px;
    font-weight: 900;
    letter-spacing: 1px;
    margin: 0;
    &:before {
      content: '';
      display: block;
      background: ${gradientRedLeft};
      width: 50px;
      height: 6px;
      margin-bottom: 0px;
    }
  }
`;