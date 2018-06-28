import React, {Component} from 'react';
import {EditInput} from "./../lib/Inputs";

export default class NoteTitle extends Component {
  constructor(props) {
    super(props);
   this.state={

   }
  }
  render() {
    return (
        <EditInput placeholer="Add Title"/>
    );
  }
}