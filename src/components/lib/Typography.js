import styled from "styled-components"
import {gradientRedLeft, black} from "./Colors";

export const H1 = styled.h1`
  font-size: 50px;
  font-weight: 900;
  letter-spacing: 1px;
  text-align: ${props => props.align};
  margin-top: ${props => props.mt};
  margin-bottom: ${props => props.mb};
  margin-left: ${props => props.ml};
  margin-right: ${props => props.mr};
  padding: ${props => props.pad};
  line-height: ${props => props.lineH};
  
  &:before {
    content: '';
    display: block;
    background: ${gradientRedLeft};
    width: 80px;
    height: 6px;
    margin-bottom: -10px;
  }
`;

export const H2 = styled.h2`
  font-size: 42px;
  font-weight: 100;
  text-align: ${props => props.align};
  margin-top: ${props => props.mt};
  margin-bottom: ${props => props.mb};
  margin-left: ${props => props.ml};
  margin-right: ${props => props.mr};
  padding: ${props => props.pad};
  line-height: ${props => props.lineH};
`;

export const H3 = styled.h3`
  font-size: 36px;
  text-align: ${props => props.align};
  margin-top: ${props => props.mt};
  margin-bottom: ${props => props.mb};
  margin-left: ${props => props.ml};
  margin-right: ${props => props.mr};
  padding: ${props => props.pad};
  line-height: ${props => props.lineH};
`;

export const H4 = styled.h4`
  font-size: 30px;
  text-align: ${props => props.align};
  margin-top: ${props => props.mt};
  margin-bottom: ${props => props.mb};
  margin-left: ${props => props.ml};
  margin-right: ${props => props.mr};
  padding: ${props => props.pad};
`;

export const H5 = styled.h5`
  font-size: 18px;
  font-weight: 300;
  text-align: ${props => props.align};
  margin-top: ${props => props.mt};
  margin-bottom: ${props => props.mb};
  margin-left: ${props => props.ml};
  margin-right: ${props => props.mr};
  padding: ${props => props.pad};
  line-height: ${props => props.lineH};
`;

export const H6 = styled.h6`
  font-size: 15px;
  text-align: ${props => props.align};
  margin-top: ${props => props.mt};
  margin-bottom: ${props => props.mb};
  margin-left: ${props => props.ml};
  margin-right: ${props => props.mr};
  padding: ${props => props.pad};
  line-height: ${props => props.lineH};
`;

export const P = styled.p`
  font-size: 15px;
  font-weight: 300;
  text-align: ${props => props.align};
  margin-top: ${props => props.mt};
  margin-bottom: ${props => props.mb};
  margin-left: ${props => props.ml};
  margin-right: ${props => props.mr};
  padding: ${props => props.pad};
  line-height: ${props => props.lineH};
`;

export const Small = styled.small`
  font-size: 12px;
  font-weight: 300;
  text-align: ${props => props.align};
  margin-top: ${props => props.mt};
  margin-bottom: ${props => props.mb};
  margin-left: ${props => props.ml};
  margin-right: ${props => props.mr};
  padding: ${props => props.pad};
  line-height: ${props => props.lineH};
`;

export const Label = Small.extend`
  color: ${black};
  opacity: 0.5;
  margin-left: 10px;
`;