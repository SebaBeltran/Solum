import React, { Component } from 'react';
import { ContactFront, FlexColumn, FlexRow, AddPic, FlipIn, SaveBtn} from './../lib/Base';
import { FormWrapper, InputWrapper, EditInput} from "./../lib/Inputs";
import { H1, H2, H3, H4, H5, H6, P, Small, Label } from './../lib/Typography';
import { EditClientLogo} from './../lib/Images';
import { connect } from 'react-redux';
import { addClient } from './../../redux/reducer';

class AddClient extends Component {
	constructor() {
		super();

		this.state = {
			selectedImg: null,
			first_name: '',
			last_name: '',
			pos: '',
			company: '',
			email: '',
			phone: ''
		};
	}

	fileSelectedHandler = (event) => {
		this.setState({ selectedImg: event.target.files[0] });
	};

	handleInputs = (val) => {
		this.setState({ [val.target.name]: val.target.value });
	};

	addClient = () => {
		this.setState({
			selectedImg: null,
			first_name: '',
			last_name: '',
			pos: '',
			company: '',
			email: '',
			phone: ''
		});
		this.props.addClient(this.props.user.id, this.state);
	};
	render() {
		const { first_name, last_name, pos, company, email, phone, selectedImg } = this.state;
		return (
			<FlipIn>
				<ContactFront>
          <AddPic
							type="file"
							onChange={this.fileSelectedHandler}
							innerRef={(fileInput) => (this.fileInput = fileInput)}
						/>
						<EditClientLogo
							ml="40px"
							pad="60px"
							src={
								selectedImg !== null ? (
									`url(${selectedImg}`
								) : (
									`url(http://philosophy.ucr.edu/wp-content/uploads/2014/10/no-profile-img-240x300.gif)`
								)
							}
							onClick={() => this.fileInput.click()}
						/>
            <H5>Add new client</H5>
					<FlexRow>
						<FlexColumn>

              <FormWrapper>
                <InputWrapper>
                  <Label>Company </Label>                  
							    <EditInput value={company} name="company" onChange={this.handleInputs} />
                </InputWrapper>
                <InputWrapper>
                  <Label>Position </Label>  
						      <EditInput value={pos} name="pos" onChange={this.handleInputs} />
                </InputWrapper>  
              </FormWrapper>

              <FormWrapper>
                <InputWrapper>
                  <Label>First Name </Label>
							    <EditInput value={first_name} name="first_name" onChange={this.handleInputs} />
                </InputWrapper>
                <InputWrapper>
                  <Label>Last Name </Label>
							    <EditInput value={last_name} name="last_name" onChange={this.handleInputs} />
                </InputWrapper>
              </FormWrapper>


              <FormWrapper>
                <InputWrapper>
                  <Label>Email </Label>                    
							    <EditInput value={email} name="email" onChange={this.handleInputs} />
                </InputWrapper>
                <InputWrapper>
                  <Label>Phone</Label>    
							    <EditInput value={phone} name="phone" onChange={this.handleInputs} />
                </InputWrapper>
              </FormWrapper>

						</FlexColumn>
					</FlexRow>

					<SaveBtn
						onClick={() => {
							this.addClient();
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
		user: state.user
	};
}

export default connect(mapStateToProps, { addClient })(AddClient);
