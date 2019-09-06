import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observable } from 'mobx';
import { observer, PropTypes as MobxPropTypes } from 'mobx-react';
import { Layout, Button, Menu, Dropdown, Radio } from 'antd';
import Mock from 'mockjs';
import ListBody from './listBody';

const { Content } = Layout;

const VIEW_MENUS = [
  {
    label: 'Incomplete',
    value: 1
  },
  {
    label: 'Completed',
    value: 2
  },
  {
    label: 'All',
    value: 0
  }
];

const RULE_MAP = {
  0: val => val,
  1: val => !val.checked,
  2: val => val.checked
};

@observer
export default class MissionList extends Component {
  static propTypes = {
    dataSource: MobxPropTypes.observableObject.isRequired,
    following: MobxPropTypes.observableObject.isRequired,
    path: PropTypes.string.isRequired,
    onTodoClick: PropTypes.func.isRequired,
    id: PropTypes.string
  };

  @observable filterRule = 1;

  handleCreate = () => {
    const title = Mock.mock('@ctitle');
    const description = Mock.mock('@cparagraph');
    const created = this.props.dataSource.create({ title, description });
    const item = created[created.length - 1];
    if (item) {
      this.props.onTodoClick(item);
    }
  };

  handleDelete = item => {
    const { dataSource, id } = this.props;
    const index = dataSource.todos.findIndex(v => v.id === item.id);
    dataSource.delete(item);
    const prevSibling = dataSource.todos[index - 1];
    const nextSibling = dataSource.todos[index];
    const next = prevSibling || nextSibling;
    if (id && next) {
      this.props.onTodoClick(next);
    }
  };

  handleChangeListView = item => {
    const { value } = item;
    this.filterRule = value;
  };

  render() {
    const { path, dataSource, following, onTodoClick, id } = this.props;
    const filterFn = RULE_MAP[this.filterRule];
    return (
      <Content className="mission-list">
        {path === '/' && (
          <div className="list-header">
            <div className="list-header-body--left">
              <Button icon="plus-square-o" type="primary" size="small" onClick={this.handleCreate}>
                Create
              </Button>
            </div>
            <div className="list-header-body--right">
              <Dropdown
                overlay={
                  <Menu>
                    {VIEW_MENUS.map((v, idx) => (
                      <Menu.Item key={idx}>
                        <Radio
                          value={v.value}
                          onChange={this.handleChangeListView.bind(this, v)}
                          checked={this.filterRule === v.value}
                        >
                          {v.label}
                        </Radio>
                      </Menu.Item>
                    ))}
                  </Menu>
                }
                placement="bottomRight"
              >
                <Button size="small">View</Button>
              </Dropdown>
            </div>
          </div>
        )}
        <div className="list-body">
          <ListBody
            id={id}
            dataSource={dataSource.todos.filter(filterFn)}
            following={following}
            onTodoClick={onTodoClick}
            onDelete={this.handleDelete}
          />
        </div>
      </Content>
    );
  }
}
