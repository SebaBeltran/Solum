import styled, {keyframes, injectGlobal} from "styled-components";
import {gradientRedTop, gradientRedLeft, gradientGreyLeft, falseGradientGreyLeft,red, black, blue, darkWhite, lightGrey} from "./Colors";
import { FlexColumn, FlexRow} from './Base';


export const FormWrapper = FlexRow.extend`
  // div:nth-child(1){
  //   margin-left: -1
  // }
  // div:nth-child(2){
  //   margin-left: -1
  // }
  > div {
    padding: 0 20px 10px;
  }
`;

export const InputWrapper = FlexColumn.extend` 
  background: white;
  transition: 1s all;
  width:100%;
  &:hover{
    > input{
      background: ${lightGrey}
    }    
  }
  }
`;

export const EditInput = styled.input`
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  width: 100%;
  border: none;
  padding:5px 20px;
  height: 60px;
  font-size:20px;
  transition: 0.5s;
  border: 1px solid ${lightGrey};
  border-radius:4px;
  :focus{
    border: none;
    outline: none;
    background: ${lightGrey};
  }
`;
export const DatesWrapper = FlexRow.extend`
  justify-content: space-between
`;

export const RateWrapper = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  > h4{
    margin-left:10px;
    margin-right:5px;
  }
`;

export const DateInput = styled.input`
  font-family: "Montserrat", sans-serif;
  text-align:center;
  font-weight: 300;
  width: 100%;
  border: none;
  padding:5px;
  height: 60px;
  font-size:16px;
  transition: 0.5s;
  border: 1px solid ${lightGrey};
  border-radius:4px;
  :focus{
    border: none;
    outline: none;
    background: ${lightGrey};
  }
`;

export const SelectInput = styled.select`
  font-family: "Montserrat", sans-serif;
  text-align:center;
  font-weight: 300;
  width: 100%;
  border: none;
  // padding:5px 30px 5px 45px;
  height: 60px;
  font-size:16px;
  transition: 0.5s;
  border: 1px solid ${lightGrey};
  border-radius:4px;
  :focus{
    border: none;
    outline: none;
    background: ${lightGrey};
  }
`;
