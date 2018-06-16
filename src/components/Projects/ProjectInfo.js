import React, {Component} from "react";
import { FlexColumn, ContactFront,  ContactFooter, ContactIcon, A, EditIcon, FlipIn, EditMenu, ThreeDots, IconLink } from "./../lib/Base";
import { H4, H6, P  } from "./../lib/Typography";
import { ClientLogoBig } from "./../lib/Images";
import {connect} from "react-redux";
import {deleteClient} from "./../../redux/reducer";


class ClientInfo extends Component{
  constructor(props){
    super(props);
    
    this.state ={
      toggleCard: true
    }
  }

render(){
  console.log(this.props)
  const {first_name, last_name, pos, company, client_pic, email, phone} = this.props.client
  return(
    <FlipIn>
          <ContactFront>

          <EditMenu>
            <ThreeDots></ThreeDots>
            <IconLink to={`/user/clients`} onClick={()=>this.props.deleteClient(this.props.match.params.id)}>
              <EditIcon data-icon="&#xe054;"/>
            </IconLink>
            <IconLink to={`/user/clients/${this.props.match.params.id}/edit`}>
              <EditIcon data-icon="&#xe060;"/>
            </IconLink>
         </EditMenu>
          
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
  )
}
}

function mapStateToProps(state) {
  const currentClient = state.clients.find( client => client.client_id === state.currentClientId)
  return({
    client: currentClient
  })
}

export default connect(mapStateToProps, {deleteClient})(ClientInfo)
