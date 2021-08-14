import React from 'react';
import Header from './Header';
import Footer from './Footer';



import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import BestBooks from './BestBooks'
import { withAuth0 } from '@auth0/auth0-react';
import Login from './Login';
import Profile from './Profile';

class App extends React.Component {

  render() {
    //const { isAuthenticated } = this.props.auth0;
    console.log('app', this.props);
    return (
      <>
        <Router>
          {/*<IsLoadingAndError>*/}
          <Header />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              {this.props.auth0.isAuthentticated && <Login />}
              {this.props.auth0.isAuthenticates && <BestBooks />}
            </Route>
            <Route exact path="/profile">
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
              <Profile />
            </Route>
          </Switch>

        </Router>
        <Footer />
      </>

    );
  }
}

export default withAuth0(App);
