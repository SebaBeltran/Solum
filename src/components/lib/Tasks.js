import styled, {keyframes, injectGlobal} from "styled-components";
import { FlexColumn, FlexRow, ContactFront} from './Base';
import { lightGrey, darkWhite, red } from "./Colors"

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
  width: 8px;
  background: ${props => props.color}
`;

export const Checkbox = styled.input`
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;
  z-index: 5;
  cursor: pointer;

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

    &:checked + label span:before{
      opacity: 1;
      transform: scale(1.3);
      transition: opacity 300ms cubic-bezier(0.2, 0, 0, 1), transform 400ms cubic-bezier(0.3, 0, 0, 1.4);
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
    transition: opacity 300ms cubic-bezier(0.2, 0, 0, 1), transform 400ms cubic-bezier(0.3, 0, 0, 1.4);
  }

  &:before{
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
    content: '';
    position: absolute;
    border-radius: 50%;
    
    opacity: .8;
    transform: scale(1);
  }
`;
export const TaskIcon = styled.span`
  margin:0 5px;
  &:hover{
    color:${red};
  }
`;

export const IconWrapper = FlexRow.extend`
  justify-content: space-between;
  width: auto;
  position: absolute;
  right: 20px;
  z-index: 10;
`;

export const DateWrapper = FlexRow.extend`
  width: auto;
  :hover{
    color: ${red};
  }
  
  > small{
    padding-top: 2px;
    width: 85px;
  }
`;