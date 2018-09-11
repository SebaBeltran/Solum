import React, {Component} from "react";
import { ContactFront, EditIcon, FlipIn, EditMenu, ThreeDots, IconLink, DataWrapper } from "./../lib/Base";
import { H4, H6, P } from "./../lib/Typography";
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

  render(){

  const {project_name, estimated_hours, tracked_time, start_date, end_date, rate} = this.props.project
  const parsedStartDate = start_date.substring(8,10) + "/" + start_date.substring(5,7) + "/" + start_date.substring(0,4)
  const parsedEndDate = end_date.substring(8,10) + "/" + end_date.substring(5,7) + "/" + end_date.substring(0,4)
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
          
            <ClientLogoBig ml="40px" pad="60px" src={`url(${this.props.client.client_pic})`} />
            <H4>{project_name}</H4>
            <DataWrapper>
            <P>{this.timeConvert(tracked_time)}/{estimated_hours}</P>
            <P>{rate}/Hour</P>
            <P>{Math.round(tracked_time/60/60)*rate}</P>
            </DataWrapper>
            <H6>{parsedStartDate} - {parsedEndDate}</H6>
          </ContactFront>
        </FlipIn>
  )
}
}

function mapStateToProps(state) {
  console.log(state.clients)
  const currentProject = state.projects.find( project => project.project_id === state.currentProjectId)
  const currentClient = state.clients.find( client => client.client_id === currentProject.client_id)
  return({
    client: currentClient,
    project: currentProject
  })
}

export default connect(mapStateToProps, {deleteProject})(ProjectInfo)
