import React, { Component } from "react"

export default class ContactForm extends Component{
  constructor(){
    super()

    this.state = {
      email: "seba@trip.com.uy",
      message: "test message",
      subject: "Lorem Ipsum"
    }
  }
  sendEmail = (subject, email, message) => {
    fetch('/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
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

    return(
      <button onClick={() => this.sendEmail(this.state.subject, this.state.email, this.state.message)}> send </button>
    )
   }

}
