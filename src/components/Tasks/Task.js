import React from "react";
import {FlexRow} from "./../lib/Base"
import { TaskWrapper, ColorTag, Checkbox, Label, Check, TaskIcon, IconWrapper, DateWrapper } from "./../lib/Tasks"
import { H5, H4, P, Small  } from "./../lib/Typography";
import { connect } from "react-redux"
import {deleteTask, handleCheck} from "./../../redux/reducer";

function Task(props){
  const year = props.due_date.substring(0,4)
  const month = props.due_date.substring(5,7)
  const day = props.due_date.substring(8,10)
  return(
    <TaskWrapper onClick={()=>props.handleCheck(props.taskItem)}>
      <Checkbox type="checkbox" id="task_id"/>
      <Label for="task_id">
        <ColorTag color={props.color}/>
        <Check/> 
        <H5>{props.task}</H5>
      </Label>
      <IconWrapper>
        <DateWrapper>
          <Small>{day} / {month} / {year}</Small>
          <TaskIcon data-icon="&#xe075;" onClick={()=>{}}/>
        </DateWrapper>  
        <FlexRow> 
          <TaskIcon data-icon="&#xe060;" onClick={()=>{}}/>
          <TaskIcon data-icon="&#xe054;" onClick={()=>props.deleteTask(props.task_id)}/>
        </FlexRow>  
      </IconWrapper>
    </TaskWrapper>  
  )
}

export default connect(null, {deleteTask, handleCheck})(Task)