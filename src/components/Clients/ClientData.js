import React, {Component} from "react";
import { FlexColumn, ContactFront,  ContactFooter, ContactIcon, A, EditIcon, StyledLink, FlipIn } from "./../lib/Base";
import { H4, H6, P  } from "./../lib/Typography";
import { ClientLogoBig, EditClientLogo } from "./../lib/Images";

export default class ClientData extends Component{
  constructor(){
    super();
    
    this.state ={
      data: {},
      first_nameInput: "",
      last_nameInput: "",
      posInput: "",
      company: "",
      emailInput: "",
      phoneInput: "",
      selectedImg: "",
      toggleCard: true
    }
  }
  
render(){
  const {client_id, first_name, last_name, pos, company, client_pic, email, phone} = this.state.data
  return(
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
  )
}
}

