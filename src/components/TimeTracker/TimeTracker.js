import React, {Component} from "react";
import {FlexRow, FlexColumn, Div} from "./../lib/Base"
import {TrackerWrapper, TimerWrapper, TimerButton, TimerInput, ButtonWrapper, SearchTaskList} from "./../lib/TimeTracker";
import { FormWrapper, InputWrapper, EditInput, DateInput, SelectInput, RateWrapper } from "./../lib/Inputs";
import {H5} from "./../lib/Typography";
import {connect} from "react-redux";
import {updateTask} from "./../../redux/reducer"

class TimeTracker extends Component{
  constructor(){
    super();

    this.state = {
      time: 7791,
      isRunning: false,
      trackingTask: "",
      tasksList:[]
    }
  }

handleInputs = (val) =>{
    this.setState({[val.target.name]: val.target.value})
    this.handleSearch(val.target.value)
}

handleSearch = (val) => {
    if(!val){
      this.setState({tasksList: []}) 
    } else {
    let filtered = this.props.tasks.filter(task => {
      console.log(task.task.toLowerCase().includes(val.toLowerCase()))
      if( task.task.toLowerCase().includes(val.toLowerCase())) {
        return true
      } else {
        return false
      }
    });
    console.log(filtered)
    this.setState({tasksList: filtered})
    }
}

handleSelection = (val) =>{
  this.setState({trackingTask: val, tasksList: []})
}

checkTimer = () =>{
  const time = setInterval(()=>{
    this.setState({time: this.state.time + 1})
  }, 1000)

  if(this.state.isRunning == false){
    this.setState({isRunning: true});
    time

  } else{
    console.log("hit")
    this.setState({isRunning: false})
    clearInterval(time);
  }

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
    const mappedList = this.state.tasksList.map( (task, i) => {
      return(
        <SearchTaskList key={i} onClick={()=>this.handleSelection(task.task)}>{task.task}</SearchTaskList>
      )
    })
    console.log(this.state.tasksList)
    return(
      <FlexColumn>
      <TrackerWrapper>
        <FlexRow>
          <TimerInput value={this.state.trackingTask ? this.state.trackingTask : null } placeholder="What are you working on?" name="trackingTask" onChange={(e)=>this.handleInputs(e)}/>
          <TimerWrapper>
            <H5>{this.timeConvert(this.state.time)}</H5>
          </TimerWrapper>
          <ButtonWrapper>
            {!this.state.isRunning 
            ? 
              <TimerButton onClick={()=>this.checkTimer()} data-icon="&#xe071;"/> 
            : 
              <TimerButton onClick={()=>this.checkTimer()} data-icon="&#xe072;"/>
            }
          </ButtonWrapper>
        </FlexRow>
      </TrackerWrapper> 
      {mappedList}
      </FlexColumn>

    )
  }
}

function mapStateToProps(state) {
  const filteredTasks = state.tasks.filter(task => task.project_id === state.currentProjectId && task.status === "active")
  return({
    tasks: filteredTasks
  })
}
export default connect(mapStateToProps)(TimeTracker)