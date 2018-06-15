import React, {Component} from "react";
import { FlexColumn, ContactFront, FlexRow, ContactFooter, ContactIcon, A, EditIcon, StyledLink, AddPic, FlipIn, EditInput } from "./../lib/Base";
import { H4, H6, P  } from "./../lib/Typography";
import { ClientLogoBig, EditClientLogo } from "./../lib/Images";
import {connect} from "react-redux";
import {updateClient} from "./../../redux/reducer";
import EditClient from "./EditClient";
// import ClientDtata from "./ClientData"

class ClientInfo extends Component{
  constructor(){
    super();
    
    this.state ={
      data: {},
      toggleCard: true
    }
  }
  componentDidMount(){
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchData();
    }
  }
 
  fetchData = () => {
    const client = this.props.clients.find( client => {
    return client.client_id === +this.props.match.params.id
    
    } )
    this.setState({
      data: client
    })
  }

  applyChanges = (val1, val2, val3, val4, val5, val6, val7) =>{

    let body = {
      client_id: this.props.match.params.id,
      first_name: val1,
      last_name: val2,
      pos: val3,
      company: val4,
      email: val5,
      phone: val6,
      client_pic: val7
    }
    this.setState({data: body, toggleCard: !this.state.toggleCard})
    this.props.updateClient(this.props.match.params.id, body);
  }


  render(){
    let clientId = this.props.match.params.id
    console.log(this.props)
    const {client_id, first_name, last_name, pos, company, client_pic, email, phone} = this.state.data
    
    return(
      
      <FlexColumn>
        {this.state.toggleCard
        ?
        // <ClientDtata />
        <FlipIn>
          <ContactFront>
        
          <StyledLink to={`/user/clients/${clientId}/edit`} onClick={()=>this.fetchData()}>
              <EditIcon data-icon="&#xe060;" onClick={()=>this.setState({toggleCard: !this.state.toggleCard})}/>
         </StyledLink>
            <ClientLogoBig ml="40px" pad="60px" src={`url(${client_pic})`} />
            <H4>{first_name} {last_name}</H4>
            <P>{pos} at</P>
            <H6>{company}</H6>
            <ContactFooter justify="space-around">
              <FlexColumn>
                <A href={`mailto:${email}`}>
                  <ContactIcon data-icon="&#xe086;" />
                </A>
              </FlexColumn>

              <FlexColumn>
                <A href={`tel:${phone}`}>
                  <ContactIcon data-icon="&#xe046;" />
                </A>
              </FlexColumn>

              <FlexColumn>
                <ContactIcon data-icon="&#xe07d;" />
              </FlexColumn>

            </ContactFooter>
          </ContactFront>
        </FlipIn>
        :
        <EditClient applyChanges={this.applyChanges} id={clientId}/>
        // null
        }
      </FlexColumn>
    )
  }
}

const mapStateToProps = state => {
  return({
    clients: state.clients
  })
}

export default connect(mapStateToProps, {updateClient})(ClientInfo)