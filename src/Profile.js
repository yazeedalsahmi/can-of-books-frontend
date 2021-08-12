import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Content from './Content';
import BestBooks from './BestBooks';

class Profile extends Component {
    render() {
        const { user,isAuthenticated } = this.props.auth0;

        return (
        isAuthenticated &&
        <div>
       <img src = {user.picture} alt={user.name}/>
        <div> {user.name}</div>
        <p>
            {user.email}
        </p>
        <Content />
        <BestBooks/>
        </div>
        );
    }
    }

export default withAuth0(Profile);