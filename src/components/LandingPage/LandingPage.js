import React, { Component } from "react";
import {BodyWrapper, H1, H2, H3, Ufo, A, Earth, PlanetRedBig, PlanetRedSmall} from "../lib/LandingPage"
import { Float } from "./../lib/animations"
import {} from "../lib/Colors";

export default class Login extends Component{
  render(){
    return(
      <BodyWrapper>
        <PlanetRedBig src="https://s3.us-east-2.amazonaws.com/pmff/assets/planet_red.svg"/>
        <PlanetRedSmall src="https://s3.us-east-2.amazonaws.com/pmff/assets/moon.svg"/>
        <H1>UFO</H1>
        <H2>ULTIMATE FREELANCER’S OFFICE</H2>
        <H3>A project manager from another world</H3>
        <Float>
        <Ufo src="https://s3.us-east-2.amazonaws.com/pmff/assets/ufo.svg"/>
        </Float>
        <A href={process.env.REACT_APP_LOGIN}>LOGIN</A>
        <Earth src="https://s3.us-east-2.amazonaws.com/pmff/assets/planet_earth.svg"/>
      </BodyWrapper>
    )
  }
}
