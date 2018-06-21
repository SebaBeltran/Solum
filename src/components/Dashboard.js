import React, { Component } from "react";
import { getUser, getClients, getProjects, getTasks } from "./../redux/reducer";
import { connect } from "react-redux";

class Private extends Component {
  componentDidMount() {
    this.props.getUser();
    this.props.getClients();
    this.props.getProjects();
    

  }

  componentDidUpdate(prevProps){
    this.props.getClients(this.props.user.id);
    this.props.getProjects(this.props.user.id);
    this.props.getTasks(this.props.user.id);
  }
  
  render() {
    let {id, user_name} = this.props.user;
    return (
      <div className="settings_wrapper">
          <h1>DASHBOARD</h1>
          <p>{id}</p>
          <p>{user_name}</p>
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    clients: state.clients
  };
}

export default connect(mapStateToProps, { getUser, getClients, getProjects, getTasks })(Private);