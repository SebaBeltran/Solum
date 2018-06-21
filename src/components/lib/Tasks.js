import styled, {keyframes, injectGlobal} from "styled-components";
import { FlexColumn, FlexRow, ContactFront} from './Base';
import { lightGrey, darkWhite } from "./Colors"

export const ListWrapper = ContactFront.extend`
  > h4 {
    margin-bottom: 20px;
  }
  h5{
    padding-left: 20px;
    padding-right: 20px;
    cursor: pointer;
  }
`;
export const TaskWrapper = FlexRow.extend`
position: relative;
  height: 65px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,.1), 0 -1px 0 rgba(0,0,0,.02);
  margin-bottom: 1.5rem;
  border-radius: 6px;
  align-items:center;
  transition: 0.3s ease-in;
  overflow: hidden;
  &:hover{
    background: ${darkWhite}
  }
`;

export const TaskListWrapper = FlexColumn.extend`
  margin-top: 50px;
`;

export const ColorTag = styled.div`
  position: absolute;
  left: 0;
  height: 100%;
  width: 6px;
  background: ${props => props.color}
`;

export const Checkbox = styled.input`
  width: 100%;
  height: 100%;
  // margin-left: 20px;
  // display:none;
  position: absolute;
  opacity: 0;
  z-index: 5;

  &:checked + label{
    text-decoration: line-through;
    opacity: 0.5;
  }

  &:checked + label span{
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
  }

  &:checked + label span:after{
    transform: scale(2);
  }
`;

export const Label = styled.label`
  color: #6C717B;
  font-size: 15px;
  cursor: pointer;
  position: relative;
  border-radius: 3px;
  display: inline-block;
  padding: 5px 5px 5px 30px;

  &:hover{
    background-color: #F4F7FA;
  }
`;

export const Check = styled.span`
  left: 20px;
  top: 50%;
  position: absolute;
  transform: translateY(-50%);
  width: 15px;
  height: 15px;
  display: block;
  background: white;
  border-radius: 3px;
  border: 1px solid #CCD6E7;
  box-shadow: 0 2px 3px #F0F4F8;

  &:after{
    width: 100%;
    height: 100%;
    content: '';
    display: block;
    position: absolute;
    background-image: url('https://s3-eu-west-1.amazonaws.com/thomascullen-codepen/tick.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 13px 8px;
    
    transform: scale(0);
    transition: transform 300ms cubic-bezier(0.3, 0, 0, 1.5);
    // transition: 0.3s all;
  }
`;
