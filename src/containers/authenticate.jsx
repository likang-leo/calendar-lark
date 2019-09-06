import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

/**
 * 校验用户是否登录
 * @param {*} Children
 */
export default function Authenticate(Children) {
  @inject('store')
  @observer
  class AuthenticatedComponent extends Component {
    constructor(props) {
      super(props);
      this.store = this.props.store.user;
    }

    render() {
      const { login } = this.store;
      return login ? (
        <Children {...this.props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: this.props.location }
          }}
        />
      );
    }
  }
  return AuthenticatedComponent;
}
