import React, { Component } from "react";
import { ContactFront, FlexColumn, FlexRow, FlipIn, SaveLink, EditIcon, StyledLink, EditMenu } from "./../lib/Base";
import { FormWrapper, InputWrapper, EditInput, DateInput, SelectInput, RateWrapper } from "./../lib/Inputs";
import { H4, H5, Label } from './../lib/Typography';
import {tag_blue, tag_green, tag_lightblue, tag_orange, tag_pink, tag_red, tag_violet, tag_yellow} from "./../lib/Colors";
import {TagSelector, TagLabel, TagCheck, TagWrapper} from "./../lib/Projects"
import DatePicker from './DatePicker';
import { DatePickerWrapper } from '../lib/DatePicker';
import { connect } from "react-redux";
import { updateProject } from "./../../redux/reducer";

class EditProject extends Component{
  constructor(props){
    super(props);

    const{project_name, start_date, end_date, estimated_hours, color_tag, rate, client_id} =  this.props.project
    this.state = {
			project_name: project_name,
			estimated_hours: estimated_hours,
			s_date: start_date,
			e_date: end_date,
			start_date: {date: start_date.substring(8,10), month: start_date.substring(5,7), year:start_date.substring(0,4)},
			end_date: {date: end_date.substring(8,10), month: end_date.substring(5,7), year: end_date.substring(0,4)},
			color_tag: color_tag,
      rate: rate,
      client_id: client_id,
			toggle_datePicker: false
		};
  }

  fileSelectedHandler = event =>{
    this.setState({selectedImg: event.target.files[0]})
  }
  handleDate = (type, date, month, year, day) =>{
		type === "start" 
		?
		this.setState({start_date: {date: date, month: month, year:year}, s_date: day })
		:
		this.setState({end_date: {date: date, month: month, year:year}, e_date: day})
	}
  handleInputs = (val) =>{
    this.setState({[val.target.name]: val.target.value})
  }

  handleToggle = (val) => {
    this.setState({toggle_datePicker: val})
  }

  applyChanges = () =>{
    const {project_name, client_id, estimated_hours, rate, s_date, e_date, color_tag} = this.state
		const project =  {project_name: project_name, client_id: client_id, estimated_hours: estimated_hours, rate: rate, start_date: s_date, end_date: e_date, color_tag: color_tag}

    let body = Object.assign({}, project, {project_id: this.props.match.params.id, user_id: this.props.project.user_id})
    console.log(body)
    this.props.updateProject(body);
  }

  render(){
    console.log(this.state)
    let mappedClient = this.props.clients.map((client, i) => {
      const {client_id, company} = client;
      return(
        <option value={client_id}>{company}</option> 
      )
    })
    const { project_name, estimated_hours, s_date, e_date, start_date, end_date, color_tag, rate} = this.state;
    return(
      <FlipIn>
				<ContactFront>
        <EditMenu>
        <StyledLink to={`/user/projects/${this.props.match.params.id}`}>
              <EditIcon data-icon="&#xe082;" />
         </StyledLink>
         </EditMenu>
            <H5>Edit Project's info</H5>
            <FormWrapper> 
                <InputWrapper>
							    <TagWrapper>
										<TagLabel>
											<TagSelector type="radio" name="color_tag" value={tag_pink} color={tag_pink} onChange={this.handleInputs}/>
											<TagCheck color={tag_pink}/>
										</TagLabel>

										<TagLabel>
											<TagSelector type="radio" name="color_tag" value={tag_violet} color={tag_violet} onChange={this.handleInputs}/>
											<TagCheck color={tag_violet}/>
										</TagLabel>

										<TagLabel>
											<TagSelector type="radio" name="color_tag" value={tag_blue} color={tag_blue} onChange={this.handleInputs}/>
											<TagCheck color={tag_blue}/>
										</TagLabel>

										<TagLabel>
											<TagSelector type="radio" name="color_tag" value={tag_lightblue} color={tag_lightblue} onChange={this.handleInputs}/>
											<TagCheck color={tag_lightblue}/>
										</TagLabel>

										<TagLabel>
											<TagSelector type="radio" name="color_tag" value={tag_green} color={tag_green} onChange={this.handleInputs}/>
											<TagCheck color={tag_green}/>
										</TagLabel>

										<TagLabel>
											<TagSelector type="radio" name="color_tag" value={tag_yellow} color={tag_yellow} onChange={this.handleInputs}/>
											<TagCheck color={tag_yellow}/>
										</TagLabel>

										<TagLabel>
											<TagSelector type="radio" name="color_tag" value={tag_orange} color={tag_orange} onChange={this.handleInputs}/>
											<TagCheck color={tag_orange}/>
										</TagLabel>

										<TagLabel>
											<TagSelector type="radio" name="color_tag" value={tag_red} color={tag_red} onChange={this.handleInputs}/>
											<TagCheck color={tag_red}/>
										</TagLabel>	
									</TagWrapper>		
                </InputWrapper>
              </FormWrapper>
					<FlexRow>
						<FlexColumn>

              <FormWrapper>
                <InputWrapper>
                  <Label>Project Name </Label>
							    <EditInput value={project_name} name="project_name" onChange={(e)=>this.handleInputs(e)} onClick={()=>this.handleToggle(false)}/>
                </InputWrapper>
              </FormWrapper>
							<FormWrapper>
								<InputWrapper>
                  <Label>Client</Label>
									<SelectInput name="client_id" onChange={this.handleInputs}>
										<option selected disabled>Choose one</option>
										{mappedClient}
									</SelectInput>
                </InputWrapper>
							</FormWrapper>	

              <FormWrapper>
                <InputWrapper>
                  <Label>Estimated Hours</Label>
									<EditInput type="number" value={estimated_hours} name="estimated_hours" onChange={this.handleInputs} />
                </InputWrapper>

								<InputWrapper>
                  <Label>Rate</Label> 
									<RateWrapper>
									<H4>$</H4>                   
							    <EditInput value={rate} name="rate" type="number" onChange={this.handleInputs} />
									</RateWrapper>
                </InputWrapper>
              </FormWrapper>

							<FormWrapper>
                <InputWrapper>
                  <Label>Start Date</Label> 
									<DateInput placeholder={"date"} value={`${start_date.month} / ${start_date.date} / ${start_date.year}`} name="start_date" onClick={()=>this.handleToggle(true)} />                 
							    <DatePickerWrapper style={this.state.toggle_datePicker ? {height: "400px", padding: "10px"} : {height: "0", padding: "0px"}} >
										<DatePicker toggle_datePicker={this.handleToggle} handleDate={this.handleDate} onMouseLeave={()=>this.handleToggle(false)}/>
									</DatePickerWrapper>
                </InputWrapper>

								<InputWrapper>
                  <Label>End Date</Label> 
									<DateInput value={`${end_date.month} / ${end_date.date} / ${end_date.year}`} name="start_date" onClick={()=>this.handleToggle(true)} placeholder="MM/DD/YYYY"/>     
                </InputWrapper>

							
							</FormWrapper>	
						</FlexColumn>
					</FlexRow>
					<SaveLink to={`/user/projects/${this.props.match.params.id}`} onClick={() => {
							this.applyChanges(project_name, estimated_hours, start_date, end_date, color_tag, rate);
						}}>
						Save Changes
					</SaveLink>
				</ContactFront>
			</FlipIn>
       
    )
  }
}
function mapStateToProps(state) {
  const currentProject = state.projects.find( project => project.project_id === state.currentProjectId)
  return({
    clients: state.clients,
    project: currentProject
  })
}
export default connect(mapStateToProps, {updateProject})(EditProject)