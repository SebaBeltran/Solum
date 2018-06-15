import styled, {keyframes} from "styled-components";
import {injectGlobal} from "styled-components";
import {gradientRedTop, gradientRedLeft, gradientGreyLeft, falseGradientGreyLeft,red, black, blue, darkWhite, lightGrey} from "./Colors";
import {Link} from "react-router-dom"


injectGlobal`
body {
  font-family: 'Montserrat', sans-serif;
  
  * {
    box-sizing: border-box;
  }
}
`;

export const BodyWrapper = styled.div`
  width: 100%;
  font-size: 1em;
  line-height: 1.6;
  font-weight: 900;
  color: ${black}
  display:flex;
  flex-flow: row
  overflow: hidden;
`;

export const Flex = styled.div`
  display: flex;
`;

export const FlexRow = Flex.extend`
  flex-flow: row;
  width: 100%;
  justify-content: ${props => props.justify};
`;

export const FlexColumn = Flex.extend`
  flex-flow: column;
  width:100%;
`;

export const SidebarWrapper = FlexColumn.extend`
  height: 100vh;
  background: ${gradientRedTop};
  width: ${props => props.toggle ? "290px" :  "100px"}
  justify-content: space-between;
  position: sticky;
  box-sizing: border-box;
  transition: 0.2s all;
  color: #fff;
  font-weight: 100;
  padding-bottom: 30px;
  overflow:hidden;
`;

export const MenuWrapper = styled.div`
  margin-top: 50px;
`;

export const MenuLink = styled.a`
  text-decoration: none;
  color: ${darkWhite};
  text-transform: uppercase;
  letter-spacing:2px;
`;

export const MenuItem = FlexRow.extend`
  background-color: ${darkWhite};
  padding: 0px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  margin: 30px 29px;
  padding-left: 10px;
  align-items: center;
`;

export const MenuIcon = styled.span`
  font-size: 22px;
  margin-right: 20px;
  text-align: center;
  width: 80px;
  vertical-align: -12px;
  color:${red};
`;

export const MenuText = styled.p`
opacity: ${props => props.toggle ? 1 : 0};
transition: 0.1s;
font-weight: 100;
`;

export const MainContentWrapper = FlexRow.extend`
  width: 100vh;
  background-color: ${darkWhite};
  width: 100%;
`;

export const ListWrapper = FlexColumn.extend`
  background-color: ${lightGrey};
  color: ${black}
  width: 400px;
`;

export const ListItem = FlexRow.extend`
  padding: 30px;
  box-sizing: border-box;
  border-top: 1px solid ${black}
  border-bottom: 1px solid ${black}
  margin-top: -1px;
  align-items: center;
  flex-wrap: wrap;
  transition: 0.6s all;
  &:hover{
    background: ${black};
    color: ${darkWhite};
    cursor: pointer;
  }
`;

export const ListItemTitle = FlexColumn.extend`
  align-self: flex-end;
`;

export const ListHeader = FlexColumn.extend`
  padding: 30px;
  justify-content:center;
  align-items:flex-start;
`; 

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  font-size:15px;
`;

export const MainContent = FlexColumn.extend`
  padding: 50px;
  background-color: ${darkWhite};
  width: 100%;
`;

export const BoxColumn = FlexColumn.extend`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,.1), 0 -1px 0 rgba(0,0,0,.02);
  margin-bottom: 1.5rem;
  border-radius: 6px;
  align-items:center; 
`;
// export const AnimatedDiv = 
export const ContactFront = BoxColumn.extend`
  min-width: 400px;
  position: relative;
  width: 80%;
  margin: 0 auto;
  padding: 40px;

  h5{
    line-height:1;
    font-weight: 300;
    margin: 20px auto;
  };
  
  h6{
    line-height: 1;
    margin:0;
    margin-bottom: 50px;
  };
  
  p {
    margin: 5px auto;
  };

`;

const flipin = keyframes`
0% {
  // transform: translateX(500px) ;
  transform: rotateY(90deg);
  opacity: 0;
}

100% {
  // transform: translateX(0);
  transform: rotateX(0deg)
  opacity: 1;
}
`;

export const FlipIn = styled.div`
  animation: ${flipin} 0.4s 0s backwards;
  `;

export const ContactFooter = FlexRow.extend`
  background-color: ${lightGrey}
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  line-height: 1;
  position: absolute;
  bottom: 0;
  

  > div:nth-child(2){
    border-left: 1px solid black;
    border-right: 1px solid black;
  };

  > div{
    height:100%;
    width: 100%;
    text-align:center;
    padding:20px;
    transition: 0.5s all;
    :hover{
      background: lightGrey;
  };
  p {
    line-height: 1;
    margin: 5px auto;
  }
  }
`;

export const ContactIcon = MenuIcon.extend`
  color: ${black};
  margin: 0 auto;
`;

export const A = styled.a`
  font-weight: 300;
  color: inherit;
  text-decoration: none;
  display:flex;
`;

export const EditIcon = ContactIcon.extend`
  position: absolute;
  right: 20px;
  top: 20px;
  width: auto;
  cursor: pointer;

`;

export const AddPic = styled.input`
  display:none;
`;

export const FormWrapper = FlexRow.extend`
width:100%;
  div:nth-child(1){
    margin-left: -1
    // border-right: 1px solid ${lightGrey};
  }
  div:nth-child(2){
    margin-left: -1
  }
  > div {
    padding: 0 20px 10px;
    // border: 1px solid ${lightGrey};
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

export const StyledLink = styled(Link)`
  display:flex;
  color: inherit;
  text-decoration: none;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  > *{
    align-self: flex-end;
  }
`;
export const EditInput = styled.input`
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  width: 100%;
  border: none;
  padding:5px;
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


export const SaveBtn = styled.button`
margin-top: 30px;
  padding: 20px 50px;
  border-radius: 30px;
  border: 0;
  background: ${black};
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  box-shadow: 0 20px 20px -10px rgba(0,0,0,0.4);
  &:hover, &:focus {
    background: darken(${red}, 10%);
    outline: 0;
    box-shadow: 0 20px 20px -50px rgba(0,0,0,1);
    transform: translateY(2px);
  }
  &:active {
    background: darken($color1, 15%);
    box-shadow: 0 30px 30px -20px rgba(0,0,0,0.4);
    transform: translateY(5px);
  }
  &:disabled {
    cursor: auto;
    &:hover {
      box-shadow: 0 30px 30px -20px rgba(0,0,0,0.4);
    }
  }
  &.done {
    background: $color2;
    animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }
`;