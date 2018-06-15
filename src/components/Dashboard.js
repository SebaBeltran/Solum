import React, { Component } from "react";
import { getUser } from "./../redux/reducer";
import { getData } from "./../redux/reducer";
import { connect } from "react-redux";

class Private extends Component {
  componentDidMount() {
    this.props.getUser();
    console.log(this.props.user.id)
    this.props.getData(this.props.user.id);
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

export default connect(mapStateToProps, { getUser, getData })(Private);