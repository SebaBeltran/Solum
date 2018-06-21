import React, { Component } from 'react';
import { ContactFront, FlexColumn, FlexRow, FlipIn, SaveBtn} from './../lib/Base';
import { FormWrapper, InputWrapper, EditInput, DateInput, SelectInput, RateWrapper } from "./../lib/Inputs";
import { H4, H5, Label } from './../lib/Typography';
import {tag_blue, tag_green, tag_lightblue, tag_orange, tag_pink, tag_red, tag_violet, tag_yellow} from "./../lib/Colors"
import {TagSelector, TagLabel, TagCheck, TagWrapper} from "./../lib/Projects"
import { connect } from 'react-redux';
import { addTask } from './../../redux/reducer';
import DatePicker from './DatePicker';
import { DatePickerWrapper } from '../lib/DatePicker';


class AddTask extends Component {
	constructor() {
		super();

		this.state = {
			task: "",
			project_id: "",
			d_date: "",
			due_date: {date:"DD", month:"MM", year:"YYYY"},
			color_tag: "",
			toggle_datePicker: false
		};
	}

	handleInputs = (val) => {
			this.setState({ [val.target.name]: val.target.value, toggle_datePicker: false});
	};

	handleDate = (type, date, month, year, day) =>{

		this.setState({due_date: {date: date, month: month, year:year}, d_date: day })
	}

	handleToggle = (val) => {
    this.setState({toggle_datePicker: val})
  }

	addProject = () => {
		const {task, project_id, d_date, color_tag} = this.state
		const taskObj =  {task: task, project_id: project_id, d_date: d_date, color_tag: color_tag, user_id: this.props.user.id}
		this.props.addTask(taskObj)
		this.setState({task: "", project_id: "", d_date: "", due_date: {date:"DD", month:"MM", year:"YYYY"},
 color_tag: ""});
	};

	render() {
		console.log(this.state)
		let mappedProject = this.props.projects.map((project, i )=>{
			return (
				this.props.clients.map((client, i) => {
				const {client_id, company} = client;
				if(project.client_id === client_id){
					return(
						<option value={project.project_id}>{project.project_name} / {company}</option> 
					)
				}
				})
			)
		})
		const { task, project_id, due_date, color_tag } = this.state;
		return (
			<FlipIn>
				<ContactFront >
            <H5>Add new task</H5>
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
                  <Label>What do you need to do?</Label>
							    <EditInput value={task} name="task" onChange={(e)=>this.handleInputs(e)} onClick={()=>this.handleToggle(false)}/>
                </InputWrapper>
              </FormWrapper>
							<FormWrapper>
								<InputWrapper>
                  <Label>Projects</Label>
									<SelectInput name="project_id" onChange={this.handleInputs}>
										<option selected disabled>Assign task to a project</option>
										{mappedProject}
									</SelectInput>
                </InputWrapper>
							</FormWrapper>	

              

							<FormWrapper>
                <InputWrapper>
                  <Label>Due Date</Label> 
									<DateInput value={`${due_date.month} / ${due_date.date} / ${due_date.year}`} name="due_date" onClick={()=>this.handleToggle(true)} />                 
							    <DatePickerWrapper style={this.state.toggle_datePicker ? {height: "400px", padding: "10px"} : {height: "0", padding: "0px"}} >
										<DatePicker toggle_datePicker={this.handleToggle} handleDate={this.handleDate} onMouseLeave={()=>this.handleToggle(false)}/>
									</DatePickerWrapper>
                </InputWrapper>
							
							</FormWrapper>	
						</FlexColumn>
					</FlexRow>

					<SaveBtn
						onClick={() => {
							this.addProject();
						}}
					>
						Save
					</SaveBtn>
				</ContactFront>
			</FlipIn>
		);
	}
}
function mapStateToProps(state) {
	return {
		user: state.user,
		clients: state.clients,
		projects: state.projects
	};
}

export default connect(mapStateToProps, { addTask })(AddTask);
