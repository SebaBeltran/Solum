import styled from "styled-components";
import { FlexRow } from "./Base"
import { black , darkWhite} from "./Colors"
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
  > div{
    width: 80%;
  }
`;
