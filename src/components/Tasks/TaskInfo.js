import React, {Component} from "react";
import { EditIcon, FlipIn, EditMenu, StyledLink} from "./../lib/Base";
import { ListWrapper} from "./../lib/Tasks"
import { H4, P  } from "./../lib/Typography";
import {connect} from "react-redux";

import Task from "./Task"
import TaskCompleted from "./TaskCompleted"
import { ScaleIn } from "../lib/animations";

class TaskInfo extends Component{
  constructor(){
    super();
    
    this.state ={
      toggleCard: true
    }
  }

render(){
  //  const {task, due_date, color_tag} = this.props
  const mappedActive = this.props.active.map( (taskItem, i) => {
    const { task_id, status } = taskItem
    return(
      <ScaleIn>
      <Task key={i} task_id={task_id} status={status}/>
      </ScaleIn>
    )
  })

  const mappedCompleted = this.props.completed.map( (taskItem, i) => {
    const { task_id, status } = taskItem
    return(
      <ScaleIn>
      <TaskCompleted key={i} task_id={task_id} status={status}/>
      </ScaleIn>
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
        {mappedActive}
        <P>------- COMPLETED -------</P>
        {mappedCompleted}
      </ListWrapper>
    </FlipIn>
  )
}
}

function mapStateToProps(state) {
  const filteredTasks = state.tasks.filter(task => task.project_id === state.currentProjectId)
  const active = filteredTasks.filter(task => task.status === "active")
  const completed = filteredTasks.filter(task => task.status === "completed")
  return({
    tasks: filteredTasks,
    active: active,
    completed: completed
  })
}

export default connect(mapStateToProps)(TaskInfo)
