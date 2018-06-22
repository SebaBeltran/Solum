import React, {Component} from "react";
import {FlexRow} from "./../lib/Base"
import {TrackerWrapper, TimerWrapper, TimerButton, TimerInput, ButtonWrapper} from "./../lib/TimeTracker";
import {H5} from "./../lib/Typography";
import {connect} from "react-redux";

class TimeTracker extends Component{
  constructor(){
    super();

    this.state = {
      time: 0,
      isRunning: false,
      trackingTask: ""
    }
  }

handleInputs = (val) =>{
    this.setState({[val.target.name]: val.target.value})
  }

checkTimer = () =>{
  const time = setInterval(()=>{
    this.setState({time: this.state.time + 1})
  }, 1000)

  if(this.state.isRunning == false){
    this.setState({isRunning: true});
    time
    console.log
  } else{
    console.log("hit")
    this.setState({isRunning: false})
    clearInterval(time);
  }

}


  timeConvert = (num) => {
    if(num >= 60){
      let remain = num%60 >= 10 ? num%60 : "0" + num%60;
      if(num/60 < 10){
        num = "0" + Math.floor(num/60) + ":" + remain;  
      } else{
          num = Math.floor(num/60) + ":" + remain;
      }
      } else if(num < 60 && num >= 10) {
        num = "00:" + num;
      } 
        else {
        num = "00:0" + num;
      }
      return num;     
    }
 

  render(){
    console.log(this.state.time)
    return(
      <TrackerWrapper>
        <FlexRow>
          <TimerInput value={this.state.trackingTask ? this.state.trackingTask : null } placeholder="What are you working on?" name="trackingTask" onChange={this.handleInputs}/>
          <TimerWrapper>
            <H5>{this.timeConvert(this.state.time)}</H5>
          </TimerWrapper>
          <ButtonWrapper>
            {!this.state.isRunning ? <TimerButton onClick={()=>this.checkTimer()} data-icon="&#xe071;"/> : <TimerButton onClick={()=>this.checkTimer()} data-icon="&#xe072;"/>}
          </ButtonWrapper>
        </FlexRow>
      </TrackerWrapper>  
    )
  }
}
export default connect(null)(TimeTracker)