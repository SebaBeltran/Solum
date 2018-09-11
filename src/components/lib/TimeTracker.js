import styled from "styled-components";
import {gradientRedTop, darkWhite, lightGrey} from "./Colors";
import { FlexRow, FlexColumn } from "./Base"

export const TrackerWrapper = FlexRow.extend`
  right: 0;
  height: 80px;
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,.1), 0 -1px 0 rgba(0,0,0,.02);
  align-items: center;
  // padding-left: 80px;
  padding-right: 40px;
  z-index: 4;

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
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DropDown = FlexColumn.extend`
width: 100%;
cursor:pointer;
background: #fff;
padding-bottom: 30px;
box-shadow: 0 2px 4px rgba(0,0,0,.1), 0 -1px 0 rgba(0,0,0,.02);
margin-top: 430px;
z-index: -1;
align-items: center;
  > label{
    margin: 20px auto;
    left: 5px;
  }
`;

export const ColorDropDown = FlexColumn.extend`
width: 70px;
left: 0px;
margin: 430px auto 0;
position: relative;
cursor:pointer;
background: #fff;
padding-bottom: 30px;
box-shadow: 0 2px 4px rgba(0,0,0,.1), 0 -1px 0 rgba(0,0,0,.02);
align-items: center;
  > label{
    margin: 20px auto;
    left: 5px;
  }
`;

export const DefaultTagWrapper = styled.div`
  height: 100%;
  width: 100%;
  background:red;
  position:absolute;
  background: white;
  z-index:100;
`;

export const DefaultTag = styled.div`
position: absolute;
top: 28px;
left: 25px;
height: 24px;
width: 24px;
background-color: ${props => props.color};
border-radius: 50%;
-webkit-transition: 0.4s all;
transition: 0.4s all;
opacity: 1;
box-shadow: 0 2px 4px rgba(0,0,0,.1), 0 -1px 0 rgba(0,0,0,.02);
cursor:pointer;
`;

export const Icon = styled.span`
font-size: 22px;
text-align: center;
width: auto;
cursor: pointer;
position: absolute;
`;

export const DashboardColorTagWrapper = styled.div`
  width: 90px;
  height: 100%;
  transition: 0.4s all;
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DashboardProjectsList = FlexColumn.extend`
  width: 400px;
  padding:30px;
  left: 0px;
  margin: 265px auto 0;
  position: absolute;
  cursor:pointer;
  background: #fff;
  padding-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0,0,0,.1), 0 -1px 0 rgba(0,0,0,.02);
  align-items: center;
`;

export const ProjectListItem = styled.div`
  width: 100%;
  padding: 20px;
  &:hover{
    background: ${lightGrey}
  }
`;

export const SelectedProjectListItem = styled.div`
  width: 100%;
  padding: 20px;
  background: ${lightGrey}
`;

export const FilteredListWrapper = FlexColumn.extend`
  width:50%;
  margin-left: 150px;
  background: ${darkWhite};
  position: absolute;
  justify-content: center;
  font-size:20px;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  box-shadow: 0 2px 4px rgba(0,0,0,.1), 0 -1px 0 rgba(0,0,0,.02);
  z-index: 2;
  top: 80px;
`;
export const FilteredListItem = styled.div `
  width: 100%;
  padding 20px 0;
  padding-left: 30px;
  height: 60px;
  positon:relative;
  cursor: pointer;
  &:hover{
    background: ${lightGrey}
  }
`;

export const SimpleFilteredListWrapper = FilteredListWrapper.extend`
  width:60%;
  margin-left: 60px;
`;
