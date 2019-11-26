import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MobileIndex from './MobileIndex';
import AppDownload from './AppDownload';
import { withRouter } from 'react-router';

class Mobile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
          <Switch>
            <Route exact path='/mobile' component={MobileIndex} />
            <Route exact path='/mobile/app' component={AppDownload} />
          </Switch>
      </div>
    );
  }
}

export default Mobile;
