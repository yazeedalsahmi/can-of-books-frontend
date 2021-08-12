import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import './Header.css';
import { withAuth0 } from '@auth0/auth0-react';
import LoginButton from './loginButton';
import LogoutButton from './LogoutButton';

class Header extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Best Books</Navbar.Brand>
        {isAuthenticated ? <>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          {/* TODO: if the user is logged in, render the `LogoutButton` - if the user is logged out, render the `LoginButton` */}
          <LogoutButton /> </> : <LoginButton />}
      </Navbar>
    );
  }
}

export default withAuth0(Header);
