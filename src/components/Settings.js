import React, { Component } from 'react';
import "./Settings.css"

export default class Settings extends Component {
  constructor(){
    super();

    this.state={
      rate: 0,
      theme: ""
    }
  }
  render() {
    return (
      <div className="settings_wrapper row">
        <div className="list"></div>
        <h1>Settings</h1>
      </div>  
    )
  }
}