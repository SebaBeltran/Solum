import React, { Component } from "react";
import { ContactFront, FlexRow, AddPic, FlipIn, SaveBtn} from "./../lib/Base";
import { FormWrapper, InputWrapper, EditInput, FormImgWrapper, EditRateWrapper, RateWrapper } from "./../lib/Inputs";
import { H4, H5, Label } from './../lib/Typography';
import { connect } from "react-redux";
import { EditClientLogo} from './../lib/Images';
import S3ClientUpload from 'aws-s3';
import {updateSettings} from "./../../redux/reducer"

const {REACT_APP_AWSAccessKeyId, REACT_APP_AWSSecretKey} = process.env 
const config = {
  bucketName: 'pmff',
  // dirName: 'profile_photos',
  region: 'us-east-2',
  accessKeyId: REACT_APP_AWSAccessKeyId,
  secretAccessKey: REACT_APP_AWSSecretKey,
}

class EditSettings extends Component{
  constructor(props){
    super(props);

    this.state = {
			user_name: this.props.user.user_name,
			profile_img: this.props.user.profile_img,
			rate: this.props.user.rate
		};
  }

	upload = e => {
    S3ClientUpload.uploadFile(e.target.files[0], config)
      .then(data => this.setState({profile_img: data.location}))
      .catch( err => console.log(err))
  }

  handleInputs = (val) =>{
    this.setState({[val.target.name]: val.target.value})
  }

  handleToggle = (val) => {
    this.setState({toggle_datePicker: val})
  }

  applyChanges = () =>{
    const {user_name, profile_img, rate} = this.state
		const userSettings =  {user_name: user_name, profile_img: profile_img, rate: rate, user_id: this.props.user.user_id}
    this.props.updateSettings(userSettings);
  }

  render(){
		const { user_name, profile_img, rate} = this.state;
    return(
      <FlipIn>
				<ContactFront>
          <H5>Edit Profile</H5>
					<FlexRow align="center">
						<FormImgWrapper>
              <InputWrapper>
							<AddPic
							type="file"
							onChange={this.upload}
							innerRef={fileInput => this.fileInput = fileInput}
						/>
						<EditClientLogo
							ml="40px"
							pad="60px"
							src={
								profile_img !== null ? (
									`url(${profile_img})`
								) : (
									`url(http://philosophy.ucr.edu/wp-content/uploads/2014/10/no-profile-img-240x300.gif)`
								)
							}
							onClick={() => this.fileInput.click()}
						/>
              </InputWrapper>
						</FormImgWrapper>
            <FormWrapper>
              <InputWrapper>
                <Label>User Name </Label>
						    <EditInput value={user_name} name="user_name" onChange={(e)=>this.handleInputs(e)} onClick={()=>this.handleToggle(false)}/>
              </InputWrapper>
            </FormWrapper>
						<EditRateWrapper>
							<InputWrapper>
                <Label>Rate per Hour</Label>
								<RateWrapper>
									<H4>$</H4>                   
							    <EditInput value={rate} name="rate" type="number" onChange={this.handleInputs} />
									</RateWrapper>
              </InputWrapper>
						</EditRateWrapper>	
					</FlexRow>
					<SaveBtn onClick={() => {
							this.applyChanges(user_name, rate, profile_img);
						}}>
						Save Changes
					</SaveBtn>
				</ContactFront>
			</FlipIn>
       
    )
  }
}
function mapStateToProps(state) {
  return({
    user: state.user
  })
}
export default connect(mapStateToProps, {updateSettings})(EditSettings)