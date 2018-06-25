import React, {Component} from "react";
import {FlexRow, FlexColumn} from "./../lib/Base"
import { TaskWrapper, ColorTag, Checkbox, Label, Check, TaskIcon, IconWrapper, DateWrapper } from "./../lib/Tasks"
import { H5, H4, P, Small  } from "./../lib/Typography";
import { connect } from "react-redux"
import {deleteTask, updateTask} from "./../../redux/reducer";

class Task extends Component{
  constructor(props){
    super(props);


  }

  handleChange = task => {
    console.log(task)
    const body = Object.assign({}, task, {status: "completed"})
    this.props.updateTask(body)
  }

  timeConvert = (num) => {
    let hours = (num/60 >= 60) ? 
                Math.floor(num/60/60) < 10 ? 
                  "0" +  Math.floor(num/60/60) : 
                  Math.floor(num/60/60) 
                : "00";

    let minutes = (num/60 < 60) ? 
                    Math.floor(num/60 < 10) ?
                      "0" + Math.floor(num/60) : 
                      Math.floor(num/60) :
                  (num/60%60 < 10) ?
                  "0" + Math.floor(num/60%60) :
                  Math.floor(num/60%60);

    let seconds = num%60 >= 10 ? num%60 : "0" + num%60;
    
    return hours + ":" + minutes + ":" + seconds;     
  }

  render(){
  let filteredTask = this.props.tasks.filter(task => task.task_id === this.props.task_id)
  filteredTask = filteredTask[0]
  const {task, due_date, color_tag, tracked_time, task_id, status } = filteredTask
  
  // const year = due_date.substring(2,4)
  // const month = due_date.substring(5,7)
  // const day = due_date.substring(8,10)

  return(
    <TaskWrapper >
      <Checkbox type="checkbox" id="task_id" onClick={()=>this.handleChange(filteredTask)}/>
      <Label for="task_id">
        <ColorTag color={color_tag}/>
        <Check/> 
        <H5>{task}</H5>
      </Label>
      <IconWrapper>
        <DateWrapper>
          <FlexColumn>
            <DateWrapper>
              <Small>{this.timeConvert(tracked_time)}</Small>
              <TaskIcon data-icon="&#xe081;"/>
            </DateWrapper>
            {due_date ?  
            <DateWrapper>
              <Small>{due_date.substring(8,10)} / {due_date.substring(5,7)} / {due_date.substring(2,4)}</Small>
              <TaskIcon data-icon="&#xe075;" onClick={()=>{}}/>
            </DateWrapper>
            :
            null
          }
          </FlexColumn>
        </DateWrapper>  
        <DateWrapper> 
          {/* <TaskIcon data-icon="&#xe060;" onClick={()=>{}}/> */}
          <TaskIcon data-icon="&#xe054;" onClick={()=>this.props.deleteTask(task_id)}/>
        </DateWrapper>  
      </IconWrapper>
    </TaskWrapper>  
  )
}
}


function mapStateToProps(state) {
  return({
    tasks: state.tasks
  })
}

export default connect(mapStateToProps, {deleteTask, updateTask})(Task)