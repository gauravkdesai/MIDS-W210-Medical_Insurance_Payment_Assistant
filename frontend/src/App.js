import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Prediction } from "./pages/Prediction";
import { Methodology } from "./pages/Methodology";
import { FAQ } from "./pages/FAQ";
import { DemoApp } from "./pages/DemoApp";
import { AboutUs } from "./pages/AboutUs";
import { NoMatch } from "./pages/NoMatch";
import { Layout } from "./components/Layout";
import { NavigationBar } from "./components/NavigationBar";
import { Jumbotron } from "./components/Jumbotron";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <NavigationBar />
          <Jumbotron />
          <Layout>
            <Switch>
              <Route exact path="/" component={Prediction} />
              <Route exact path="/index.html" component={Prediction} />
              <Route path="/Methodology" component={Methodology} />
              <Route path="/FAQ" component={FAQ} />
              <Route path="/DemoApp" component={DemoApp} />
              <Route path="/AboutUs" component={AboutUs} />
              <Route component={NoMatch} />
            </Switch>
          </Layout>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
