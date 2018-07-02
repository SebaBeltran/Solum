import styled from "styled-components";
import {lightGrey} from "./Colors";
import { FlexColumn, FlexRow} from './Base';


export const FormWrapper = FlexRow.extend`
  > div {
    padding: 0 20px 10px;
  }
`;

export const InputWrapper = FlexColumn.extend` 
  background: white;
  transition: 0.6s all;
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

export const ContactTextArea = styled.textarea`
font-family: "Montserrat", sans-serif;
font-weight: 300;
width: 100%;
border: none;
padding:5px 20px;
height: 300px;
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
export const FormImgWrapper = FlexRow.extend`
width: 50%;
  > div {
    padding: 0 20px 10px;
  }
`;
export const EditRateWrapper = RateWrapper.extend`
width: 30%;
min-width: 80px;
`;