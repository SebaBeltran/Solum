import React, { Component } from 'react';
import "./Notes.css"
import axios from "axios"
import { connect } from "react-redux"
import { getNotes } from "../redux/reducer"

export default class Clients extends Component {

  componentDidMount(){
    axios.get("/api/notes").then(res => console.log(res.data))
  }

  render() {
    return (
      <div className="notes_wrapper">
      <div className="notes_sidebar">
        <div className="note_preview">
          <h3>Note 1 title</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div className="note_preview">
          <h3>Note 1 title</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div className="note_preview">
          <h3>Note 1 title</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
      <div className="notes_main">
          <input className="note_title" value="title" onChange={()=>{}}/>
          <textarea className="note_text" rows="10" cols="80" /> 
          <button className="save_btn">SAVE NOTE</button>
      </div>  
      </div>
    )
  }
}