import React, { Component } from 'react';
import { FlexColumn, MainContentWrapper, ListWrapper, ListItem, ListHeader, SearchInput, MainContent, StyledLink, FlexRow} from "./../lib/Base";
import {TagColor, ProjectTitleWrapper, ProjectItem} from "./../lib/Projects"
import { H1, H5, Small, P  } from "./../lib/Typography";
import {connect} from "react-redux";
import {Route} from "react-router-dom";
// import EditTask from "./EditTask";
import TaskInfo from './TaskInfo';
import { getUser, getClients, getProjects, currentProject, getTasks } from "./../../redux/reducer";
import AddTask from './AddTask';


class Tasks extends Component {

  componentDidMount() {
    this.props.getUser();
    this.props.getClients();
    this.props.getProjects(this.props.user.id);
    this.props.getTasks(this.props.user.id);
  }

  getClientName = project_id => {
    const currentProject = this.props.projects.find( project => project.project_id === project_id)
    const currentClient =  this.props.clients.find( client => client.client_id === currentProject.client_id)
    return currentClient.company
  }

  render() {
    let mappedProject = this.props.projects.map((project, i) => {
      const {project_id, project_name, estimated_hours, tracked_hours, start_date, end_date, color_tag} = project;
      return(
        <StyledLink key={i} to={`/user/tasks/${project_id}`} onClick={()=>{this.props.currentProject(project_id)}}>
        <ProjectItem  id={project_id} project={project} color={color_tag}>
          <FlexColumn>
          <Small mt="0" mb="10" ml="0px" lineH="1.9">{this.getClientName(project_id)}</Small>  
          <ProjectTitleWrapper>
            <H5 mt="0" mb="0" ml="0px" lineH="1.3">{project_name}</H5>
            <TagColor color={color_tag}/>
          </ProjectTitleWrapper>  
            <FlexRow>
              <Small mt="0" mb="10" ml="0px" lineH="1.9">{tracked_hours}</Small>
              <Small mt="0" mb="10" ml="0px" lineH="1.9">/ {estimated_hours}</Small>
            </FlexRow>
            </FlexColumn>
          </ProjectItem>
          </StyledLink>
      )
    })
    return (
      <MainContentWrapper>
        <ListWrapper>
          <ListHeader>
            <SearchInput />
            <Small lineH="2.5">Press Enter to submit</Small>
          </ListHeader>
          {mappedProject}
        </ListWrapper>
        
        <MainContent>
          <H1>TASKS</H1>
          <Route path={`/user/tasks/`} component={AddTask} exact/>
          <Route path={`/user/tasks/:id`} component={TaskInfo} exact/>
          {/* <Route path={`/user/tasks/:id/edit`} component={EditTask} /> */}
        </MainContent>   
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