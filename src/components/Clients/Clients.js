import React, { Component } from 'react';
import { FlexColumn, MainContentWrapper, ListWrapper, ListItem, ListHeader, SearchInput, MainContent, StyledLink} from "./../lib/Base";
import { H1, H5, Small  } from "./../lib/Typography";
import { ClientLogo } from "./../lib/Images";
import {connect} from "react-redux";
import {Route} from "react-router-dom";
import EditClient from "./EditClient";
import ClientInfo from './ClientInfo';
import { getUser, getData } from "./../../redux/reducer";
import AddClient from './AddClient';


class Clients extends Component {

  componentDidMount() {
    this.props.getUser();
    this.props.getData(this.props.user.id);
  }

  // componentDidUpdate(){

  //     this.props.getData(this.props.user.id);
  // }

  render() {
    let mappedClient = this.props.clients.map((client, i) => {
      const {client_id, first_name, last_name, pos, company, email, phone, client_pic} = client;
      return(
        <ListItem key={i} id={client_id} client={client}>
        <StyledLink to={`/user/clients/${client_id}`}>
          <ClientLogo pad="20px" src={`url(${client_pic})`}/>
          <FlexColumn>  
            <H5 mt="0" mb="0" ml="20px" lineH="0.6">{first_name} {last_name}</H5>
            <Small mt="0" mb="10" ml="20px" lineH="1.9">{pos} at {company}</Small>
            </FlexColumn>
          </StyledLink>
          </ListItem>
      )
    })
    return (
      <MainContentWrapper>
        <ListWrapper>
          <ListHeader>
            <SearchInput />
            <Small lineH="2.5">Press Enter to submit</Small>
          </ListHeader>
          {mappedClient}
        </ListWrapper>
        
        <MainContent>
          <H1>CLIENTS</H1>
          <Route path={`/user/clients/`} component={AddClient} exact/>
          <Route path={`/user/clients/:id`} component={ClientInfo}/>
          {/* <Route path={`/user/clients/:id/edit`} component={EditClient} /> */}
        </MainContent>   
      </MainContentWrapper>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    clients: state.clients
  };
}

export default connect(mapStateToProps, {getUser, getData})(Clients);