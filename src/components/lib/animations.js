import styled, {keyframes} from "styled-components";

const scale = keyframes`
0% {
  transition: all 200ms ease-in;
  transform: scale(0);
}

100% {
  transition: all 200ms ease-in;
    transform: scale(1);
}
`;

export const ScaleIn = styled.div`
  animation: ${scale} 0.4s 0s backwards;
  width:100%;
  `;

const dropdown = keyframes`
0% {
  transition: all 200ms ease-in;
  transform: translateY(-100%)
}

100% {
  transition: all 200ms ease-in;
    transform: translateY(0)
}
`;

export const DropdownIn = styled.div`
  animation: ${dropdown} 0.4s 0s backwards;
  width:100%;
  `;

const float = keyframes`
  0% {
    transform: translateY(0);	
  }
  45% {
    transform: translateY(-10%);	
  }
  55% {
    transform: translateY(-10%);	
  }	
  100% {
    transform: translateY(0);
  }			
`;

export const Float = styled.div`
  animation: ${float} 3s ease-in-out infinite;
  margin: 0 auto;
  `;

  const slidetoright = keyframes`
  0% {
    left: -100%;	
  }
  100% {
    left: 0;
  }			
`;

export const SlideToRight = styled.div`
  animation: ${slidetoright} 0.4s ease-in;
  position:relative;
  `;  

export const StatsSlideToRight = styled.div`
  animation: ${slidetoright} 0.6s ease-in;
  position:relative;
`;  

const fadein = keyframes`
0% {
  opacity: 0;	
}
10%{
  opacity: 1
}

90%{
  opacity: 1
}
100% {
  opacity: 0;
}			
`;

export const FadeIn = styled.div`
animation: ${fadein} 3.1s ease-in;
position: absolute;
right: 40px;
top: 85vh;
z-index: 1;
`;  