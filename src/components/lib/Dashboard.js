import styled, {keyframes, injectGlobal} from "styled-components";
import {gradientRedTop, gradientRedLeft, gradientGreyLeft, falseGradientGreyLeft,red, black, blue, darkWhite, lightGrey} from "./Colors";
import { FlexRow, FlexColumn, ContactFront, ListItem } from "./Base"

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
export const ChartsWrapper = FlexRow.extend`
  flex-wrap: wrap;

`;
export const Productivity = ContactFront.extend`
  min-width: 50%;
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
  
  canvas{
    max-width: 100%;
    // max-height: 400px;
  }
`;

export const PieProjects = ContactFront.extend`
  width: 50%;
  margin-top: 50px;
  h4{
    align-self: flex-start
    font-size: 20px;
    font-weight: 900;
    letter-spacing: 1px;
    margin: 0;
    margin-bottom: 25px;
    &:before {
      content: '';
      display: block;
      background: ${gradientRedLeft};
      width: 50px;
      height: 6px;
      margin-bottom: 0px;
    }
`;
export const TagColor = styled.div`
  height: 16px;
  width: 16px;
  background: ${props => props.color};
  border-radius: 50%;
`;

export const ProjectTitleWrapper = FlexRow.extend`
  justify-content: space-between;
  align-items: center;
`;

export const ProjectItem = ListItem.extend`
  border-right: 6px solid ${props => props.color}
`;