import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observable } from 'mobx';
import { observer, PropTypes as MobxPropTypes } from 'mobx-react';
import { Icon } from 'antd';
import classnames from 'classnames';

@observer
export default class ListItem extends Component {
  static propTypes = {
    data: MobxPropTypes.observableObject.isRequired,
    isFollowing: PropTypes.bool.isRequired,
    toggleFollowing: PropTypes.func.isRequired,
    onTodoClick: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired
  };

  @observable focus = false;

  toggleCheck = data => {
    data.checked = !data.checked;
  };

  handleItemNameClick = (data, e) => {
    const { target } = e;
    if (target === this.ListItemRight || this.ListItemRight.contains(target)) {
      e.stopPropagation();
      return;
    }

    this.Input.focus();

    const { onTodoClick } = this.props;
    onTodoClick(data);
  };

  handleOnChange = (data, e) => {
    data.changeTitle(e.target.value);
  };

  handleOnFocus = () => {
    this.focus = true;
  };

  handleOnBlur = () => {
    this.focus = false;
  };

  render() {
    const { data, isFollowing, toggleFollowing, onDelete, selected } = this.props;
    return (
      <div
        className={classnames('list-item-wrapper', {
          'list-item-wrapper--focus': this.focus,
          'list-item-wrapper--selected': !this.focus && selected
        })}
        onClick={this.handleItemNameClick.bind(this, data)}
      >
        <div className="list-item--left">
          <div className="item-checkbox">
            <input
              type="checkbox"
              checked={data.checked}
              onClick={this.toggleCheck.bind(this, data)}
            />
          </div>
          <div className="item-name">
            <div
              className={classnames('item-name-body', {
                'item-name-body--done': data.checked
              })}
            >
              <input
                ref={ref => (this.Input = ref)}
                value={data.title}
                spellCheck={false}
                onChange={this.handleOnChange.bind(this, data)}
                onFocus={this.handleOnFocus}
                onBlur={this.handleOnBlur}
              />
            </div>
          </div>
        </div>
        <div className="list-item--right" ref={ref => (this.ListItemRight = ref)}>
          <span onClick={toggleFollowing.bind(this, data, isFollowing)}>
            {isFollowing ? (
              <Icon type="heart" style={{ color: '#f37777' }} />
            ) : (
              <Icon type="heart-o" />
            )}
          </span>
          <span onClick={onDelete.bind(this, data)}>
            <Icon type="close-square-o" />
          </span>
        </div>
      </div>
    );
  }
}
