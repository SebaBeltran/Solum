import { tag_green, tag_red} from "./Colors";
import { FlexColumn } from "./Base"

export const AlertSuccessWrapper = FlexColumn.extend`
  box-shadow: 0 2px 4px rgba(0,0,0,.1), 0 -1px 0 rgba(0,0,0,.02);
  margin-bottom: 1.5rem;
  border-radius: 6px;
  align-items:center; 
  width:300px;
  height: 70px;
  justify-content: center;
  background: ${tag_green};
  color: #fff;
  z-index: 1;
   &:before{
     position: absolute;
     top:0;
     left: 0;
     width: 8px;
     height: 70px;
     background: #A2FCBA;
     content: "";
     border-bottom-left-radius: 6px;
     border-top-left-radius: 6px;
   }
  h5{
    margin:0px;
  }
  p{
    margin: 0;
  }
`;

export const AlertErrorWrapper = AlertSuccessWrapper.extend`
  background: ${tag_red}

  &:before{
    background: #F28181;
  }
`;