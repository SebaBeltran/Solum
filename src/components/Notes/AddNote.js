import React, { Component } from 'react';
import { ContactFront, FlexColumn, FlexRow, AddPic, FlipIn, InputWrapper, EditInput, FormWrapper, SaveBtn, EditorWrapper} from './../lib/Base';
import { H1, H2, H3, H4, H5, H6, P, Small, Label } from './../lib/Typography';
import { connect } from 'react-redux';
import { addNote } from './../../redux/reducer';

import NoteEditor from "./NoteEditor"
import "./Notes.css"
import NoteTitle from './NoteTitle';

class AddClient extends Component {
	constructor() {
		super();

		// this.state = {editorState: EditorState.createEmpty()};
	}
	
	fileSelectedHandler = (event) => {
		this.setState({ selectedImg: event.target.files[0] });
	};
	
	onChange = (editorState) => this.setState({editorState});
	
	handleInputs = (val) => {
		this.setState({ [val.target.name]: val.target.value });
	};

	render() {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1;
		var yyyy = today.getFullYear();
		dd<10 ? dd = '0'+dd : null;
		mm<10 ? mm = '0'+mm : null;
		today = mm + '/' + dd + '/' + yyyy;
		
		return (
			<FlipIn>
				<EditorWrapper>
					<NoteTitle />
					<Small>Created {today}</Small>
					<NoteEditor />
				{/* <Editor editorState={this.state.editorState} onChange={this.onChange} placeholder="Type something" /> */}

					{/* <SaveBtn onClick={() => {}}>Save</SaveBtn> */}
				</EditorWrapper>
			</FlipIn>
		);
	}
}
function mapStateToProps(state) {
	return {
		user: state.user
	};
}

export default connect(mapStateToProps, { addNote })(AddClient);
