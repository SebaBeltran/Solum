import React, {Component} from "react"
import {HashRouter, Route, Switch} from "react-router-dom"
// import Header from "./components/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import Projects from "./components/Projects/Projects";
import Clients from "./components/Clients/Clients";
// import Notes from "./components/Notes/Notes";
import LandingPage from "./components/LandingPage/LandingPage";
import Settings from "./components/Settings/Settings";
import {FlexRow} from "./components/lib/Base"
import Tasks from "./components/Tasks/Tasks";


export default (
  <FlexRow>
      <Route component={LandingPage} path="/" exact/>
      <Route component={Sidebar} path="/user"/>
      <Switch>
        <Route component={Dashboard} path="/user" exact />
        <Route component={Tasks} path="/user/tasks" />
        <Route component={Clients} path="/user/clients" />
        <Route component={Projects} path="/user/projects" />
        {/* <Route component={Notes} path="/user/notes" /> */}
        <Route component={Settings} path="/user/settings" />
      </Switch>  
  </FlexRow>  

)