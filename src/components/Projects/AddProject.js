import React, { Component } from 'react';
import { ContactFront, FlexColumn, FlexRow, FlipIn, SaveBtn} from './../lib/Base';
import { FormWrapper, InputWrapper, EditInput, DateInput, SelectInput, RateWrapper } from "./../lib/Inputs";
import { H4, H5, Label } from './../lib/Typography';
import {tag_blue, tag_green, tag_lightblue, tag_orange, tag_pink, tag_red, tag_violet, tag_yellow} from "./../lib/Colors"
import {TagSelector, TagLabel, TagCheck, TagWrapper} from "./../lib/Projects"
import { connect } from 'react-redux';
import { addProject } from './../../redux/reducer';
import DatePicker from './DatePicker';
import { DatePickerWrapper } from '../lib/DatePicker';


class AddProject extends Component {
	constructor(props) {
		super(props);

		this.state = {
			project_name: "",
			client_id: "",
			estimated_hours: 0,
			s_date: "",
			e_date: "",
			start_date: {date:"DD", month:"MM", year:"YYYY"},
			end_date: {date:"DD", month:"MM", year:"YYYY"},
			color_tag: "",
			rate: this.props.user.rate,
			toggle_datePicker: false
		};
	}

	handleInputs = (val) => {
			this.setState({ [val.target.name]: val.target.value, toggle_datePicker: false});
	};

	handleDate = (type, date, month, year, day) =>{
		type === "start" 
		?
		this.setState({start_date: {date: date, month: month, year:year}, s_date: day })
		:
		this.setState({end_date: {date: date, month: month, year:year}, e_date: day})
	}

	handleToggle = (val) => {
    this.setState({toggle_datePicker: val})
  }

	addProject = () => {
		// const SDate = 
		const {project_name, client_id, estimated_hours, rate, s_date, e_date, color_tag} = this.state
		const project =  {project_name: project_name, client_id: client_id, estimated_hours: estimated_hours, rate: rate, start_date: s_date, end_date: e_date, color_tag: color_tag, tracked_hours: 0}
		this.props.addProject(this.props.user.id, project);
	};

	render() {
		
		let mappedClient = this.props.clients.map((client, i) => {
      const {client_id, company} = client;
      return(
        <option value={client_id}>{company}</option> 
      )
    })
		const { project_name, estimated_hours, start_date, end_date, rate} = this.state;
		return (
			<FlipIn>
				<ContactFront >
            <H5>Add new project</H5>
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
									<DateInput value={`${end_date.month} / ${end_date.date} / ${end_date.year}`} name="start_date" onClick={()=>this.handleToggle(true)}/>     
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
		clients: state.clients
	};
}

export default connect(mapStateToProps, { addProject })(AddProject);
