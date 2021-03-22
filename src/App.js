import './App.scss';
import {React,Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/core/Home/Home';
import Routing from './components/Routing';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      path: window.location.pathname
    };
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="**">
            <Routing path={this.state.path}/>
          </Route>
        </Switch>
      </Router>
    );
  }
}