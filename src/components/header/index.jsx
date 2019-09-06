import React, { Component } from 'react';
import { Layout } from 'antd';
import Menu from './menu';
import Avatar from '../avatar';

const { Header } = Layout;

export default class GlobalHeader extends Component {
  render() {
    return (
      <Header className="g-topbar">
        <div className="menu-area">
          <Menu />
        </div>
        <div className="avatar-area">
          <Avatar />
        </div>
      </Header>
    );
  }
}
