import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { inject, observer } from 'mobx-react';
import { Route, Switch } from 'react-router-dom';
import MissionList from './list';
import Detail from './detail';

@inject('store')
@observer
export class MissionPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.store = props.store;
    this.updatePath(this.props);
  }

  get path() {
    const { path } = this.props.store.location;
    return path;
  }

  get dataSource() {
    const { mission } = this.props.store;
    switch (this.path) {
      case '/following':
        return mission.following;
      case '/':
      default:
        return mission.myMissions;
    }
  }

  updatePath(props) {
    const {
      match: { path }
    } = props;
    this.store.location.update(path);
  }

  handleOpenDetail = (todo = {}) => {
    const { params } = this.props.match;
    const { id } = todo;
    if (params.id === id) {
      return;
    }
    const { path } = this;
    this.props.history.push(`${path === '/' ? '' : path}/${id || ''}`);
  };

  handleCloseDetail = () => {
    this.handleOpenDetail();
  };

  render() {
    const { match, store } = this.props;
    const {
      params: { id }
    } = match;

    return (
      <Layout className="p-mission">
        <div className="pane-gutter" />
        <Layout className="pane-container pane-container--left">
          <MissionList
            id={id}
            path={this.path}
            dataSource={this.dataSource}
            following={store.mission.following}
            onTodoClick={this.handleOpenDetail}
          />
        </Layout>
        {id && (
          <Layout className="pane-container pane-container--right">
            <Detail
              id={id}
              path={this.path}
              dataSource={this.dataSource}
              onClose={this.handleCloseDetail}
            />
          </Layout>
        )}
        <div className="pane-gutter" />
      </Layout>
    );
  }
}

const MissionLayout = () => (
  <Switch>
    <Route exact path="/" component={MissionPage} />
    <Route exact path="/following" component={MissionPage} />
    <Route path="/following/:id" component={MissionPage} />
    <Route path="/:id" component={MissionPage} />
  </Switch>
);

export default MissionLayout;
