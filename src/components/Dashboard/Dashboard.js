import React, { Component } from 'react';
import { FlexColumn, MainContentWrapper, ListWrapper, Div, ListHeader, SearchInput, MainContent, StyledLink, FlexRow} from "./../lib/Base";
import {TagColor, ProjectTitleWrapper, ProjectItem} from "./../lib/Projects"
import { H1, H3, H4, H5, H6, Small, P  } from "./../lib/Typography";
import {connect} from "react-redux";
import { getUser, getClients, getProjects, currentProject, getTasks, getTotalTime} from "./../../redux/reducer";
import {StatisticsWrapper, Productivity} from "./../lib/Dashboard";
import TimeTracker from "./../TimeTracker/TimeTracker"


class Dashboard extends Component {
  constructor(){
    super();

    this.state = {
      user_id: "", 
      totalIncome: 0
    }
  }

  componentDidMount() {
    this.props.getUser();
    this.props.getClients(this.props.user.id);
    this.props.getProjects(this.props.user.id);
    this.props.getTasks(this.props.user.id);
    this.props.getTotalTime(this.props.user.id)
    
  }

  componentDidUpdate(prevProps, nextProps){
    this.getTotalIncome()
    // if(this.props.user.id = )
    // }
  //   this.props.getClients(this.props.user.id);
    // this.props.getProjects(this.props.user.id);
    // this.props.getTasks(this.props.user.id);
  }

  getTotalIncome = () => {
    let income = 0
    // this.setState({totalIncome: income})
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
    
    return hours + ":" + minutes;     
  }

  render() {
    let name = this.props.user.user_name ? this.props.user.user_name.split(" ") : " "
    let totalProjects = this.props.projects.length !== 0 ? this.props.projects.length : 0
    let totalTasks = this.props.tasks.length !== 0 ? this.props.tasks.length : 0
    let completedTasks = this.props.tasks.length !== 0 ? this.props.tasks.filter(task => {if(task.status === "completed"){return task}}) : 0;
    let totalTime = 0
    this.props.tasks.map(task => totalTime += task.tracked_time);

    // let totalBilled = 0;
    this.props.projects.forEach(project => console.log(project) )
      
    return (
      <MainContentWrapper>
        <ListWrapper>
          <ListHeader>
            <H5>Welcome back {name[0]}, here are your tasks for today</H5>
          </ListHeader>
          
        </ListWrapper>
        <Div>
          <MainContent>
          <H1>DASHBOARD</H1>
          <StatisticsWrapper>
          <FlexColumn>
              <H3>${this.state.totalIncome}</H3>
              <H6>TOTAL INCOME</H6>
            </FlexColumn>
            <FlexColumn>
              <H3>{this.timeConvert(totalTime)}</H3>
              <H6>TOTAL BILLED HOURS</H6>
            </FlexColumn>
            <FlexColumn>
              <H3>{totalProjects}</H3>
              <H6>TOTAL PROJECTS</H6>
            </FlexColumn>
            <FlexColumn>
              <H3>{completedTasks.length}/{totalTasks}</H3>
              <H6>TASKS COMPLETED</H6>
            </FlexColumn>
          </StatisticsWrapper>
          <Productivity>
            <H4>PRODUCTIVITY</H4>
          </Productivity>  
        </MainContent>   
        </Div>
      </MainContentWrapper>
    )
  }
}

function mapStateToProps(state) {
  // console.log(state)
  return {
    user: state.user,
    clients: state.clients,
    projects: state.projects,
    tasks: state.tasks
  };
}

export default connect(mapStateToProps, {getUser, getClients, getProjects, currentProject, getTasks, getTotalTime})(Dashboard);