import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { Menu } from 'antd';
import { MY_MISSIONS, ROUTES } from '@/consts/routeMenu.js';

@withRouter
@inject(({ store }) => ({ store: store.location }))
@observer
export default class RouteMenu extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  get matchedRoute() {
    const { path } = this.props.store;
    const route = ROUTES.find(v => v.path === path);
    return route;
  }

  get selectedKeys() {
    const route = this.matchedRoute;
    return [route ? route.path : MY_MISSIONS.path];
  }

  handleOnClick = (item) => {
    const { path } = item;
    const route = this.matchedRoute;
    if (route && path !== route.path) {
      this.props.history.push(path);
      this.props.store.update(path);
    }
  };

  render() {
    return (
      <Menu mode="horizontal" theme="dark" selectedKeys={this.selectedKeys}>
        {ROUTES.map(v => (
          <Menu.Item key={v.path} onClick={this.handleOnClick.bind(this, v)}>
            {v.title}
          </Menu.Item>
        ))}
      </Menu>
    );
  }
}
