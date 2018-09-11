import styled from "styled-components";
import { FlexRow, ListItem} from './Base';


export const TagWrapper = FlexRow.extend`
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
`;

export const TagSelector = styled.input`
position: absolute;
opacity: 0;

  &:checked ~ span{
    background-color: ${props => props.color};
    height: 30px;
    width: 30px;
    left: -3px;
    top: -3px;
    opacity: 1;
  }
`;

export const TagLabel = styled.label`
  display: flex;
  flex-flow: column;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 14px;
  > p {
    display:block;
  }

  &:hover input ~ span{
    opacity: 1;
    height: 30px;
    width: 30px;
    left: -3px;
    top: -3px;
  }
  &:hover input:checked ~ span{
    opacity: 1;
  }
  &:hover input:checked ~ span:after{
    opacity: 1;
  }

  .
`;

export const TagCheck = styled.span`
position: absolute;
top: 0;
left: 0;
height: 24px;
width: 24px;
background-color: ${props => props.color};
border-radius: 50%;
transition: 0.4s all;
opacity: 0.6;

&:after{
  // content: "";
  // position: absolute;
  // opacity: 1;
  // top: 9px;
  // left: 9px;
  // width: 8px;
  // height: 8px;
  // border-radius: 50%;
  // background: white;
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

// export const TaskIcon = styled.span`
//   margin:0 5px;
//   &:hover{
//     color:${red};
//   }
// `;