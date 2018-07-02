import React, { Component } from 'react';
import {Link} from "react-router-dom"
import { getUser } from "./../../redux/reducer";
import {connect} from "react-redux"
import { SidebarWrapper, FlexColumn, MenuWrapper, MenuLink, MenuItem, MenuIcon, MenuText} from "./../lib/Base"
import { P } from "./../lib/Typography"
import { Avatar, ProfileImg } from "./../lib/Images"

class Sidebar extends Component {
  constructor(props){
    super(props);

    this.state = {
			user_name: this.props.user.user_name,
			profile_img: this.props.user.profile_img
		};
    this.handleHover = this.handleHover.bind(this)
  }

  componentDidMount() {
    this.props.getUser();
  }

  componentDidUpdate(prevProps) {
     if(prevProps.user.user_name !== this.props.user.user_name || prevProps.user.profile_img !== this.props.user.profile_img){
        this.props.getUser();
     }
  }

  handleHover(){
    this.setState({toggle: !this.state.toggle})
  }
  
  render() {
    const LinkWithComponent = MenuLink.withComponent(Link);
    let { user_name } = this.props.user;
    return (
      <SidebarWrapper toggle={this.state.toggle} onMouseEnter={()=>this.handleHover()} onMouseLeave={()=>this.handleHover()}>
      <FlexColumn>
        <ProfileImg src={`url(${this.props.user.profile_img})`}/>   
        <Avatar src={`url(${this.props.user.profile_img})`}/>
        <P align="center" toggle={this.state.toggle}>{user_name}</P>
      </FlexColumn>
      <MenuWrapper>
        <LinkWithComponent to="/user/">
          <MenuItem>
            <MenuIcon data-icon="&#xe06a;"></MenuIcon>
            <MenuText toggle={this.state.toggle}>dashboard</MenuText>
          </MenuItem>
        </LinkWithComponent>
        

        <LinkWithComponent to="/user/tasks">
          <MenuItem>
            <MenuIcon data-icon="&#xe067;" ></MenuIcon>
            <MenuText toggle={this.state.toggle}>tasks</MenuText>
          </MenuItem>
        </LinkWithComponent>

        <LinkWithComponent to="/user/projects">
          <MenuItem>
            <MenuIcon data-icon="&#xe043;"></MenuIcon>
            <MenuText toggle={this.state.toggle}>projects</MenuText>
          </MenuItem>
        </LinkWithComponent>

        <LinkWithComponent to="/user/clients">
          <MenuItem>
            <MenuIcon data-icon="&#xe001;"></MenuIcon>
            <MenuText toggle={this.state.toggle}>clients</MenuText>
          </MenuItem>
        </LinkWithComponent>

        {/* <LinkWithComponent to="/user/Notes">
          <MenuItem>
            <MenuIcon data-icon="&#xe013;"></MenuIcon>
            <MenuText toggle={this.state.toggle}>notes</MenuText>
          </MenuItem>
        </LinkWithComponent> */}

        <LinkWithComponent to="/user/Settings">
          <MenuItem>
            <MenuIcon data-icon="&#xe09a;"></MenuIcon>
            <MenuText toggle={this.state.toggle}>settings</MenuText>
          </MenuItem>
        </LinkWithComponent>

        <MenuLink href={process.env.REACT_APP_LOGOUT}>
          <MenuItem>
            <MenuIcon data-icon="&#xe065;"></MenuIcon>
            <MenuText toggle={this.state.toggle}>Logout</MenuText>
          </MenuItem>
        </MenuLink>
      </MenuWrapper>
    </SidebarWrapper>   
    )
  }
}

function mapsStateToProps(state){
  return{
    user: state.user
  }
}

export default connect (mapsStateToProps, {getUser})(Sidebar)