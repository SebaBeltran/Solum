import React, { Component } from "react"
import { ContactFront, FlipIn, SaveBtn } from "./../lib/Base";
import { FormWrapper, InputWrapper, EditInput, ContactTextArea } from "./../lib/Inputs";
import { H4, H5, Label } from './../lib/Typography';
import {connect} from "react-redux";

class ContactForm extends Component{
  constructor(){
    super()

    this.state = {
      email: "seba@trip.com.uy",
      message: "",
      subject: ""
    }
  }

  handleInputs = (val) =>{
    this.setState({[val.target.name]: val.target.value})
  }

  sendEmail = (subject, email, message, user_name) => {
    fetch('/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_name: user_name,
        subject: subject,
        email: email,
        message: message
      })
    })
    .then((res) => res.json())
    .then((res) => {
      console.log('here is the response: ', res);
    })
    .catch((err) => {
      console.error('here is the error: ', err);
    })
   }

   render(){
    console.log(this.props.user)
    return(
      <FlipIn>
        <ContactFront>
          <FormWrapper>
            <InputWrapper>
              <Label>Subject</Label>
							<EditInput value={this.state.subject} name="subject" onChange={this.handleInputs} />

              <Label>Message</Label>
							<ContactTextArea value={this.state.message} rows="6" name="message" onChange={this.handleInputs} />
            </InputWrapper>
          </FormWrapper>  
        <SaveBtn onClick={() => this.sendEmail(this.props.client.email, this.state.email, this.state.message, this.props.user.user_name)}> send </SaveBtn>
        </ContactFront>
      </FlipIn>      
    )
   }

}

function mapStateToProps(state) {
  const currentClient = state.clients.find( client => client.client_id === state.currentClientId)
  return({
    client: currentClient,
    user: state.user
  })
}

export default connect(mapStateToProps)(ContactForm)