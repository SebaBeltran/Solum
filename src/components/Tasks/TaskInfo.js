import React, {Component} from "react";
import { ContactFront,  ContactFooter, ContactIcon, A, EditIcon, FlipIn, EditMenu, IconLink, StyledLink, FlexRow } from "./../lib/Base";
import { ListWrapper} from "./../lib/Tasks"
import { H5, H4, P  } from "./../lib/Typography";
import {connect} from "react-redux";

import Task from "./Task"

class TaskInfo extends Component{
  constructor(){
    super();
    
    this.state ={
      toggleCard: true
    }
  }

render(){
  console.log(this.props.tasks)
  //  const {task, due_date, color_tag} = this.props
  const mappedTask = this.props.tasks.map( (taskItem, i) => {
    const { task, due_date, color_tag, task_id } = taskItem
    return(
      <Task key={i} task={task} due_date={due_date} color={color_tag} task_id={task_id} taskItem={taskItem}/>
    )
  })
  return(
    <FlipIn>
          <ListWrapper>
          <EditMenu>
            <StyledLink to={`/user/tasks`}>
              <EditIcon data-icon="&#xe082;" />
            </StyledLink>
         </EditMenu>
         <H4>List of Tasks</H4>
          {mappedTask}
            
          </ListWrapper>
        </FlipIn>
  )
}
}

function mapStateToProps(state) {
  const tasks = state.tasks.filter(task => task.project_id === state.currentProjectId)
  return({
    tasks: tasks
  })
}

export default connect(mapStateToProps)(TaskInfo)
