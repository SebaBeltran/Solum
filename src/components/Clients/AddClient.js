import React, { Component } from 'react';
import { ContactFront, FlexColumn, FlexRow, AddPic, FlipIn, SaveBtn} from './../lib/Base';
import { FormWrapper, InputWrapper, EditInput} from "./../lib/Inputs";
import { H1, H2, H3, H4, H5, H6, P, Small, Label } from './../lib/Typography';
import { EditClientLogo} from './../lib/Images';
import { connect } from 'react-redux';
import { addClient } from './../../redux/reducer';
import S3ClientUpload from 'aws-s3';


const {REACT_APP_AWSAccessKeyId, REACT_APP_AWSSecretKey} = process.env 
const config = {
  bucketName: 'pmff',
  region: 'us-east-2',
  accessKeyId: REACT_APP_AWSAccessKeyId,
  secretAccessKey: REACT_APP_AWSSecretKey,
}

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

  upload = e => {
		console.log(e.target.files[0])
    S3ClientUpload.uploadFile(e.target.files[0], config)
      .then(data => this.setState({selectedImg: data.location}))
      .catch( err => console.log(err))

      //data.location
  }

	handleInputs = (val) => {
		this.setState({ [val.target.name]: val.target.value });
	};

	addClient = () => {
		console.log(this.state)
		this.props.addClient(this.props.user.id, this.state);
		this.setState({
			selectedImg: null,
			first_name: '',
			last_name: '',
			pos: '',
			company: '',
			email: '',
			phone: ''
		});
	};
	render() {
		const { first_name, last_name, pos, company, email, phone, selectedImg } = this.state;
		return (
			<FlipIn>
				<ContactFront>
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
									`url(${selectedImg})`
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
