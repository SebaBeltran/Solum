import React, { Component } from "react";
import { ContactFront, FlexColumn, FlexRow, AddPic, EditInput, FlipIn, FormWrapper, InputWrapper, SaveBtn } from "./../lib/Base";
import { H5, Label  } from "./../lib/Typography";
import { EditClientLogo} from "./../lib/Images";
import { connect } from "react-redux";

class EditClient extends Component{
  constructor(props){
    super(props);

    this.state = {
      selectedImg: null,
      firstNameInput: "",
      lastNameInput: "",
      position: "",
      company: "",
      email: "",
      phone: ""
    }
  }
  componentDidMount(){
    // this.fetchData();
    console.log(this.props.id)
  }

  fileSelectedHandler = event =>{
    this.setState({selectedImg: event.target.files[0]})
  }

  handleInputs = (val) =>{
    console.log(val)
    this.setState({[val.target.name]: val.target.value})
  }

  render(){
    const { firstNameInput, lastNameInput, position, company, email, phone, selectedImg} = this.state
    return(
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
            <H5>Edit Client's info</H5>
					<FlexRow>
						<FlexColumn>

              <FormWrapper>
                <InputWrapper>
                  <Label>First Name </Label>
							    <EditInput value={firstNameInput} name="firstNameInput" onChange={(e)=>{this.handleInputs(e)}} />
                </InputWrapper>
                <InputWrapper>
                  <Label>Last Name </Label>
							    <EditInput value={lastNameInput} name="lastNameInput" onChange={(e)=>{this.handleInputs(e)}} />
                </InputWrapper>
              </FormWrapper>

              <FormWrapper>
                <InputWrapper>
                  <Label>Position </Label>  
						      <EditInput value={position} name="position" onChange={(e)=>{this.handleInputs(e)}} />
                </InputWrapper>  
                <InputWrapper>
                  <Label>Company </Label>                  
							    <EditInput value={company} name="company" onChange={(e)=>{this.handleInputs(e)}} />
                </InputWrapper>
              </FormWrapper>

              <FormWrapper>
                <InputWrapper>
                  <Label>Email </Label>                    
							    <EditInput value={email} name="email" onChange={(e)=>{this.handleInputs(e)}} />
                </InputWrapper>
                <InputWrapper>
                  <Label>Phone</Label>    
							    <EditInput value={phone} name="phone" onChange={(e)=>{this.handleInputs(e)}} />
                </InputWrapper>
              </FormWrapper>

						</FlexColumn>
					</FlexRow>
					<SaveBtn
						onClick={() => {
							this.props.applyChanges(firstNameInput, lastNameInput, position, company, email, phone, selectedImg);
						}}
					>
						BLA
					</SaveBtn>
				</ContactFront>
			</FlipIn>
       
    )
  }
}

export default connect(null)(EditClient)