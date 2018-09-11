import styled from "styled-components";
import { lightGrey } from "./Colors";

export const Avatar = styled.img`
  background-image: ${props => props.src};
  background-position: center;
  background-size: cover;
  overflow: hidden;
  border-radius: 50%;
  margin: -30px auto 0;
  position: relative;
  z-index: 1;
  width: 0px; //fix Chrome bug
  height: 0px; //fix Chrome bug
  padding:30px;
`;

export const ProfileImg = styled.img`
  background-image: ${props => props.src};
  display: grid;
  grid-template-columns: 100%;
  width: 0px; //fix Chrome bug
  height: 200px;
  padding: 50px 50%;
  background-position: center;
  background-size: cover;
  overflow: hidden;
  align-items: center;
  opacity: 0.8;
  background-color: #fff;
  -webkit-filter: grayscale(1);
	-webkit-filter: grayscale(100%);
	filter: gray;
	filter: grayscale(100%);
`;

export const ClientLogo = Avatar.extend`
  margin: 0;
  padding: ${props => props.pad};
  margin-bottom: ${props => props.ml};
`;

export const ClientLogoBig = ClientLogo.extend`
  margin-top: 0px;
  padding: ${props => props.pad};
  margin-bottom: ${props => props.ml};
  border: 8px solid ${lightGrey};  
`;

export const EditClientLogo = ClientLogoBig.extend`
  margin: 0;
  cursor: pointer;
`;


