import React from "react";
import {AlertSuccessWrapper} from "./../lib/Alerts.js"
import {P, H5} from "./../lib/Typography";

export default function Success(props){
  return(
    <AlertSuccessWrapper>
      <H5>SUCCESS!</H5>
      <P>Task Updated</P>
    </AlertSuccessWrapper>
  )
}