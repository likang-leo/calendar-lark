import React, { Component } from 'react';
import { action } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

@inject(({ store }) => ({ user: store.user }))
@observer
export default class Login extends Component {
  render() {
    const { user, location } = this.props;
    const { login } = user;
    if (login) {
      return <Redirect to={location.state ? location.state.from : '/'} />;
    }
    return (
      <div>
        login status: {login ? 'yes' : 'no'}
        <br />
        <button onClick={() => user.toggleLogin()}>login</button>
      </div>
    );
  }
}
