import React, { Component } from 'react';
import {BodyWrapper} from "./components/lib/Base"
import "./simple-line-icons.css";
import routes from "./routes";

class App extends Component {
  render() {
    return (
      <BodyWrapper>
        {routes}
      </BodyWrapper>
    );
  }
}

export default App;
