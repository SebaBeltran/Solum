import React, { Component } from "react";
import { ContactFront, FlexColumn, FlexRow, AddPic, FlipIn, SaveLink, EditIcon, StyledLink, EditMenu } from "./../lib/Base";
import { FormWrapper, InputWrapper, EditInput } from "./../lib/Inputs";
import { H5, Label  } from "./../lib/Typography";
import { EditClientLogo} from "./../lib/Images";
import { connect } from "react-redux";
import {updateClient, deleteClient} from "./../../redux/reducer";
import S3FileUpload from 'react-s3';
require('dotenv').config()

const {REACT_APP_AWSAccessKeyId, REACT_APP_AWSSecretKey} = process.env 
const config = {
  bucketName: 'pmff',
  // dirName: 'profile_photos',
  region: 'us-east-2',
  accessKeyId: REACT_APP_AWSAccessKeyId,
  secretAccessKey: REACT_APP_AWSSecretKey,
}

class EditClient extends Component{
  constructor(props){
    super(props);

    this.state = {
      selectedImg: this.props.client.client_pic,
      firstNameInput: this.props.client.first_name,
      lastNameInput: this.props.client.last_name,
      pos: this.props.client.pos,
      company: this.props.client.company,
      email: this.props.client.email,
      phone: this.props.client.phone
    }
  }

  upload = e => {
    S3FileUpload.uploadFile(e.target.files[0], config)
      .then(data => this.setState({selectedImg: data.location}))
      .catch( err => console.log(err))

      //data.location
  }

  handleInputs = (val) =>{
    this.setState({[val.target.name]: val.target.value})
  }

  applyChanges = () =>{

    let body = Object.assign({}, this.state, {client_id: this.props.match.params.id})
    this.props.updateClient(body);
  }



  render(){
    console.log(this.state)
    const { firstNameInput, lastNameInput, pos, company, email, phone, selectedImg} = this.state;
    return(
      <FlipIn>
				<ContactFront>
        <EditMenu>
        <StyledLink to={`/user/clients/${this.props.match.params.id}`}>
              <EditIcon data-icon="&#xe082;" />
         </StyledLink>
         </EditMenu>
          <AddPic
							type="file"
							onChange={this.upload}
							innerRef={fileInput => this.fileInput = fileInput}
						/>
						<EditClientLogo
							ml="40px"
							pad="60px"
							src={
								selectedImg !== null ? (
									`url(${this.state.selectedImg})`
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
                  <Label>Company </Label>                  
							    <EditInput value={company} name="company" onChange={(e)=>{this.handleInputs(e)}} />
                </InputWrapper>
                <InputWrapper>
                  <Label>Position </Label>  
						      <EditInput value={pos} name="pos" onChange={(e)=>{this.handleInputs(e)}} />
                </InputWrapper>  
              </FormWrapper>

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
					<SaveLink to={`/user/clients/${this.props.match.params.id}`} onClick={() => {
							this.applyChanges(firstNameInput, lastNameInput, pos, company, email, phone, selectedImg);
						}}>
						Save Changes
					</SaveLink>
				</ContactFront>
			</FlipIn>
       
    )
  }
}
function mapStateToProps(state) {
  const currentClient = state.clients.find( client => client.client_id === state.currentClientId)
  return({
    client: currentClient
  })
}
export default connect(mapStateToProps, {updateClient, deleteClient})(EditClient)