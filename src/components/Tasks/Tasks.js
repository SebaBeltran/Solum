import React, { Component } from 'react';
import { FlexColumn, MainContentWrapper, ListWrapper, Div, ListHeader, SearchInput, MainContentTimer, StyledLink, FlexRow} from "./../lib/Base";
import {TagColor, ProjectTitleWrapper, ProjectItem} from "./../lib/Projects"
import { H1, H5, Small} from "./../lib/Typography";
import {connect} from "react-redux";
import {Route} from "react-router-dom";
import TaskInfo from './TaskInfo';
import { getUser, getClients, getProjects, currentProject, getTasks } from "./../../redux/reducer";
import AddTask from './AddTask';
import TimeTracker from "./../TimeTracker/TimeTracker"
import {SlideToRight} from "./../lib/animations";
import TimeTrackerDashboard from '../TimeTracker/TimeTrackerDashboard';
import shortid from "shortid"



class Tasks extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      searchInput: "",
      projectsList: []
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
      this.props.getClients(this.props.user.id);
      this.props.getProjects(this.props.user.id);
      this.props.getTasks(this.props.user.id);
  }

  componentDidUpdate(prevProps, nextProps){
    if(prevProps.projects.length !== nextProps.projectsList.length){
      this.setState({projectsList: prevProps.projects})
    }
  }

  handleSearch(val) {
    if(!val){
      // this.setState({searchInput: "", projectsList: this.props.projects})
    }
    else{
      let filtered = this.props.projects.filter(obj => {
        if( obj.project_name.toLowerCase().includes(val.toLowerCase())) {
          return true
        }
        else {
          return false;
        }  
      })
      this.setState({searchInput: val, projectsList: filtered})
    }
  }


  getClientName = project_id => {
    const currentProject = this.props.projects.find( project => project.project_id === project_id)
    const currentClient =  this.props.clients.find( client => client.client_id === currentProject.client_id)
    return currentClient.company
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
    let mappedProject = this.state.projectsList.map((project, i) => {
      const {project_id, project_name, estimated_hours, tracked_time,  color_tag} = project;
      return(
        <StyledLink key={shortid.generate()} to={`/user/tasks/${project_id}`} onClick={()=>{this.props.currentProject(project_id)}}>
          <SlideToRight>
        <ProjectItem  id={project_id} project={project} color={color_tag}>
          <FlexColumn>
          <Small mt="0" mb="10" ml="0px" lineH="1.9">{this.getClientName(project_id)}</Small>  
          <ProjectTitleWrapper>
            <H5 mt="0" mb="0" ml="0px" lineH="1.3">{project_name}</H5>
            <TagColor color={color_tag}/>
          </ProjectTitleWrapper>  
            <FlexRow>
              <Small mt="0" mb="10" ml="0px" lineH="1.9">{this.timeConvert(tracked_time)}</Small>
              <Small mt="0" mb="10" ml="0px" lineH="1.9">/ {estimated_hours}</Small>
            </FlexRow>
            </FlexColumn>
          </ProjectItem>
          </SlideToRight>
          </StyledLink>
      )
    })
    return (
      <MainContentWrapper>
        <ListWrapper>
          <ListHeader>
            <SearchInput value={this.state.searchInput} onChange={(e)=>this.handleSearch(e.target.value)}/>
            <Small lineH="2.5">Search Orojects</Small>
          </ListHeader>
          {mappedProject}
        </ListWrapper>
        <Div>
        <Route path={`/user/tasks`} component={TimeTrackerDashboard} exact/>
          <Route path={`/user/tasks/:id`} component={TimeTracker} exact/>
          <MainContentTimer>
          <H1>TASKS</H1>
          <Route path={`/user/tasks/`} component={AddTask} exact/>
          <Route path={`/user/tasks/:id`} component={TaskInfo} exact/>
          {/* <Route path={`/user/tasks/:id/edit`} component={EditTask} /> */}
        </MainContentTimer>   
        </Div>
      </MainContentWrapper>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    clients: state.clients,
    projects: state.projects
  };
}

export default connect(mapStateToProps, {getUser, getClients, getProjects, currentProject, getTasks})(Tasks);