import React, { Component } from 'react';
import { FlexColumn, MainContentWrapper, ListWrapper, ListHeader, SearchInput, MainContent, StyledLink} from "./../lib/Base";
import { ListItem } from "./../lib/Clients"
import { H1, H5, Small, P  } from "./../lib/Typography";
import { ClientLogo } from "./../lib/Images";
import {connect} from "react-redux";
import {Route} from "react-router-dom";
import EditClient from "./EditClient";
import ClientInfo from './ClientInfo';
import { getUser, getClients, currentClient, search } from "./../../redux/reducer";
import AddClient from './AddClient';


class Clients extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchInput: "",
      clientsList: []
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    this.props.getUser();
    this.props.getClients(this.props.user.id);
    this.handleSearch("")
  }

  componentDidUpdate(prevProps, nextProps){
    if(prevProps.clients.length !== this.props.clients.length)
    this.handleSearch("")
  }
  

  
  handleSearch(val) {
    if(!val){
      this.setState({searchInput: "", clientsList: this.props.clients})
    }
    else{
      let filtered = this.props.clients.filter(obj => {
        if( obj.first_name.toLowerCase().includes(val.toLowerCase())) {
          return true
        }  
        else if(obj.last_name.toLowerCase().includes(val.toLowerCase())) {
          return true
        } 
        else if(obj.company.toLowerCase().includes(val.toLowerCase())) {
          return true
        }
        else{
          return false;
        }
          
    // let filtered = this.props.clients.filter(obj => {
    //  let searchIn = Object.keys(obj).splice(1,5);
    //  return searchIn.forEach(str => obj[str].includes(val))
    // });
    // this.setState({searchInput: val, clientsList: filtered})
    // console.log(filtered)
    // }
    // console.log(filtered)

      })
      this.setState({searchInput: val, clientsList: filtered})
    }
  }

  // compone

  fileSelectedHandler = event =>{
    this.setState({selectedImg: event.target.files[0]})
  }

  render() {
    console.log(this.props.clients)
    let mappedClient = this.state.clientsList.map((client, i) => {
      const {client_id, first_name, last_name, pos, company, email, phone, client_pic} = client;
      return(
        <StyledLink key={i} to={`/user/clients/${client_id}`} onClick={()=>{this.props.currentClient(client_id)}}>
          <ListItem  id={client_id} client={client} >
            <ClientLogo pad="20px" src={`url(${client_pic})`}/>
            <FlexColumn>  
              <H5 mt="0" mb="0" ml="20px" lineH="1.3">{company}</H5>
              <Small mt="0" mb="10" ml="20px" lineH="1.3">{first_name} {last_name}</Small>
              <Small mt="0" mb="10" ml="20px" lineH="1.3">{pos}</Small>
              
            </FlexColumn>
          </ListItem>
        </StyledLink>
      )
    })
    return (
      <MainContentWrapper>
        <ListWrapper>
          <ListHeader>
            <SearchInput value={this.state.searchInput} onChange={(e)=>this.handleSearch(e.target.value)}/>
            <Small lineH="2.5">Press Enter to submit</Small>
          </ListHeader>
          {mappedClient}
        </ListWrapper>
        
        <MainContent>
          <H1>CLIENTS</H1>
          <Route path={`/user/clients/`} component={AddClient} exact/>
          <Route path={`/user/clients/:id`} component={ClientInfo} exact/>
          <Route path={`/user/clients/:id/edit`} component={EditClient} />
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

export default connect(mapStateToProps, {getUser, getClients, currentClient})(Clients);