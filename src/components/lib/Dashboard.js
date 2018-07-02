import styled from "styled-components";
import {gradientRedLeft} from "./Colors";
import { FlexRow, ContactFront, ListItem, ListHeader } from "./Base"

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
  padding: 50px 0;
  
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
  margin-bottom: 100px;
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
  height: 100px;
  padding: 15px 30px;
  display: block;
`;

export const WelcomeHeader = ListHeader.extend`
min-height: 150px;
max-height: 150px;
top: 10px;
display:block;
margin-top: 0;
`;

export const ListDivider = styled.div`
  height: 80px;
  display: inline-grid;
  justify-content: center;
  align-items: center;
`;

export const Check = styled.span`
  width: 15px;
  height: 15px;
  display: block;
  background-image: url('https://s3-eu-west-1.amazonaws.com/thomascullen-codepen/tick.svg');
  background-repeat: no-repeat;
  background-position: center;
  opacity: 1;
  transform: scale(1.5);
  margin-right: 10px;
`;

export const CompletedItem = ListItem.extend`
  border-right: 6px solid ${props => props.color}
  height: 100px;
  padding: 15px 30px;
  display: block;
  opacity: 0.5;

  H5 {
    text-decoration: line-through;
  }
  &:hover{
    opacity: 0.8;
    background:none;
    color: inherit;
  }
`;