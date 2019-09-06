import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { List as AntdList } from 'antd';
import ListItem from './listItem';

const List = observer(AntdList);

@observer
export default class ListBody extends Component {
  static propTypes = {
    dataSource: PropTypes.array.isRequired,
    following: PropTypes.object.isRequired,
    onTodoClick: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    id: PropTypes.string
  };

  toggleFollowing = (todo, isFollowing) => {
    const { following } = this.props;
    if (isFollowing) {
      following.delete(todo);
    } else {
      following.add(todo);
    }
  };

  checkIsFollowing(todo) {
    return !!this.props.following.todos.find(v => v.id === todo.id);
  }

  render() {
    const { dataSource, onTodoClick, onDelete, id } = this.props;
    return (
      <List
        dataSource={dataSource.reverse()}
        renderItem={data => (
          <ListItem
            key={data.id}
            selected={data.id === id}
            data={data}
            onTodoClick={onTodoClick}
            onDelete={onDelete}
            isFollowing={this.checkIsFollowing(data)}
            toggleFollowing={this.toggleFollowing}
          />
        )}
      />
    );
  }
}
