import {React, Component} from 'react';
import NodeList from './core/content/NodeList/NodeList';
import Home from './core/Home/Home';
import PropTypes from 'prop-types';
import Article from './core/content/Article/Article';
import Loading from './core/icons/Loading/Loading';

class Routing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      response: null,
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch('http://drupal.lndo.site/router/translate-path?path=' + this.props.path)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            response: result,
            isLoaded: true,
          });
        },
        (error) => {
          this.setState({
            response: error,
            isLoaded: false,
          });
        }
      );
  }

  render() {
    const error = this.state.error;
    const isLoaded = this.state.isLoaded;
    const response = this.state.response;
    if (error) {
      return(
        <div>Error: { error.message }</div>
      );
    }
    else if (!isLoaded) {
      return(
        <Loading>
        </Loading>
      );
    }
    else {
      if (response.entity === undefined) {
        return(
          <Home>
          </Home>
        );
      }
      else {
        switch (response.entity.type) {
        case 'node':
          switch (response.entity.bundle) {
          case 'article':
            return(
              <Article>
              </Article>
            );
          case 'default':
            return(
              <NodeList>
              </NodeList>
            );
          }
        }
      }
    }
  }
}

Routing.propTypes = {
  path: PropTypes.string
};

export default Routing;