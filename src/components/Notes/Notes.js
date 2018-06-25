import React, { Component } from 'react';
import { MainContentWrapper, ListWrapper, ListHeader,  MainContent} from "./../lib/Base";
import { H1, Small } from "./../lib/Typography";
// import { ClientLogo } from "./../lib/Images";
import {connect} from "react-redux";
import {Route} from "react-router-dom";
// import EditClient from "./EditNote";
import ClientInfo from './NoteInfo';
// import AddNote from "./AddNote"
import { getUser, currentClient, getClients, search } from "./../../redux/reducer";
// import AddClient from './AddNote';


class Clients extends Component {
  constructor(props){
    super(props);

    // let clients = this.props.clients
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    this.props.getUser();
    this.props.getClients(this.props.user.id);
    this.handleSearch()
  }
  
  handleSearch(val) {
    if(!val){
      this.setState({searchInput: "", clientsList: this.props.clients})
    }
    else{

    let filtered = this.props.clients.filter(obj => {
      return (
        obj.first_name.toLowerCase().includes(val.toLowerCase()) ?
        true
        :
        obj.last_name.toLowerCase().includes(val.toLowerCase())
        ? 
        true
      // :
      // obj.company.includes(val)
      // ?
      // true
        :
        null
      )
    })
    this.setState({searchInput: val, clientsList: filtered})
    // });
  }
    
  }

  fileSelectedHandler = event =>{
    this.setState({selectedImg: event.target.files[0]})
  }

  render() {
    console.log(this.state)
    // let mappedClient = this.state.clientsList.map((client, i) => {
    //   const {client_id, first_name, last_name, pos, company, email, phone, client_pic} = client;
    //   return(
    //     <StyledLink key={i} to={`/user/clients/${client_id}`} onClick={()=>{this.props.currentClient(client_id)}}>
    //     <ListItem  id={client_id} client={client} >
    //       <ClientLogo pad="20px" src={`url(${client_pic})`}/>
    //       <FlexColumn>  
    //         <H5 mt="0" mb="0" ml="20px" lineH="0.6">{first_name} {last_name}</H5>
    //         <Small mt="0" mb="10" ml="20px" lineH="1.9">{pos} at {company}</Small>
    //         </FlexColumn>
    //       </ListItem>
    //       </StyledLink>
    //   )
    // })
    return (
      <MainContentWrapper>
        <ListWrapper>
          <ListHeader>
            {/* <SearchInput value={this.state.searchInput} onChange={(e)=>this.handleSearch(e.target.value)}/> */}
            <Small lineH="2.5">Press Enter to submit</Small>
          </ListHeader>
          {/* {mappedClient} */}
        </ListWrapper>
        
        <MainContent>
          <H1>NOTES</H1>
          {/* <Route path={`/user/notes/`} component={AddNote} exact/> */}
          <Route path={`/user/notes/:id`} component={ClientInfo} exact/>
          {/* <Route path={`/user/notes/:id/edit`} component={EditClient} /> */}
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