import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { Route } from 'react-router-dom';
import Header from '@/components/header';
import MissionLayout from '../pages/mission';
import authenticate from './authenticate';

@authenticate
export default class Container extends Component {
  render() {
    return (
      <Layout className="g-layout">
        <Header />
        <Route path="/" render={MissionLayout} />
      </Layout>
    );
  }
}
