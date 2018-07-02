import React, { Component } from 'react';
import { MainContentWrapper, MainContent } from "./../lib/Base";
import { H1 } from "./../lib/Typography";
import {connect} from "react-redux";
import EditSettings from './EditSettings';


class Settings extends Component {

  render() {
    return (
      <MainContentWrapper>

        <MainContent>
          <H1>SETTINGS</H1>
          <EditSettings/>
        </MainContent>   

      </MainContentWrapper>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    clients: state.clients,
    projects: state.projects
  };
}

export default connect(mapStateToProps, {})(Settings);