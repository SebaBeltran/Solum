import React from "react";
import {AlertErrorWrapper} from "./../lib/Alerts.js"
import {P, H5} from "./../lib/Typography";

export default function Success(props){
  return(
    <AlertErrorWrapper>
      <H5>Error!</H5>
      <P>Please select a project for your task</P>
    </AlertErrorWrapper>
  )
}