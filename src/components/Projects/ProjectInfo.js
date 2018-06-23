import React, {Component} from "react";
import { FlexColumn, ContactFront,  ContactFooter, ContactIcon, A, EditIcon, FlipIn, EditMenu, ThreeDots, IconLink } from "./../lib/Base";
import { H4, H6, P  } from "./../lib/Typography";
import { ClientLogoBig } from "./../lib/Images";
import {connect} from "react-redux";
import {deleteProject} from "./../../redux/reducer";


class ProjectInfo extends Component{
  constructor(props){
    super(props);
    
    this.state ={
      toggleCard: true
    }
  }

render(){
  const {project_name, estimated_hours, tracked_hours, start_date, end_date} = this.props.project
  return(
    <FlipIn>
          <ContactFront>

          <EditMenu>
            <ThreeDots></ThreeDots>
            <IconLink to={`/user/projects`} onClick={()=>this.props.deleteProject(this.props.match.params.id)}>
              <EditIcon data-icon="&#xe054;"/>
            </IconLink>
            <IconLink to={`/user/projects/${this.props.match.params.id}/edit`}>
              <EditIcon data-icon="&#xe060;"/>
            </IconLink>
         </EditMenu>
          
            <ClientLogoBig ml="40px" pad="60px" src={`url(http://logofaves.com/wp-content/uploads/2016/07/style_m.jpg?9cf02b)`} />
            <H4>{project_name}</H4>
            <P>{tracked_hours}/{estimated_hours}</P>
            <H6>{start_date} - {end_date}</H6>
          </ContactFront>
        </FlipIn>
  )
}
}

function mapStateToProps(state) {
  const currentProject = state.projects.find( project => project.project_id === state.currentProjectId)
  return({
    project: currentProject
  })
}

export default connect(mapStateToProps, {deleteProject})(ProjectInfo)
