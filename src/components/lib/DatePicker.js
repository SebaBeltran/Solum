import styled from "styled-components";
import {FlexRow, FlexColumn} from "./Base"

export const DatePickerWrapper = styled.div`
  width:300px;
  background: #fff;
  height:0px;
  overflow: hidden;
  position:relative;
  z-index: 30;
  padding: 10px;
  border-radius:6px;
  box-shadow: 0 2px 4px rgba(0,0,0,.1), 0 -1px 0 rgba(0,0,0,.02);
`;

export const DatePickerTitle = FlexRow.extend`
  display:flex;
  justify-content: center;
  align-items: center;
  color: white;
  height:40px;
`;

export const WeekWrapper = FlexColumn.extend`
  flex-wrap: wrap;
  align-items: center;
  height:35px;
  width:100%;
`;

export const DayName = FlexRow.extend`
justify-content:center;
align-items:center;
width:35px;
height:35px;
margin: 0 auto;
text-align:center;
> small{
  width:100%;
}
`;

export const DateWrapper = FlexRow.extend`
  jusify-content:center;
  align-items:center;
  width:35px;
  height:35px;
  margin: 0 auto;
  transition: 0.3s all;
  cursor: pointer;
  > small{
    width:100%;
    text-align:center;
  }
  &:hover{
    background: red;
  }
`;

export const EmptyDate = FlexRow.extend`
  width:35px;
  height:35px;
  background:#dbdbdb;
`;

export const SelectedDate = styled.div`
  jusify-content:center;
  align-items:center;
  width:35px;
  height:35px;
  margin: 0 auto;
  transition: 0.3s all;
  cursor: pointer;
  background:blue;
  > small{
    width:100%;
    text-align:center;
  }
`;
