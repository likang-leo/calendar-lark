import { observable, action, toJS } from 'mobx';

export class Todo {
  @observable title;
  @observable description;
  @observable checked;
  @observable createTime;
  constructor(options) {
    const { id, title, description, createTime } = options;

    Object.assign(this, {
      ...options,
      title,
      description,
      createTime: createTime || new Date().getTime(),
      id:
        id ||
        Math.random()
          .toString()
          .slice(2)
    });
  }

  @action
  changeTitle(title) {
    this.title = title;
    this.update();
  }

  @action
  changeDesc(desc) {
    this.description = desc;
    this.update();
  }

  static fromJS(data) {
    const item = new Todo(data);
    return item;
  }
}

export class TodoList {
  @observable todos;

  wrap(data) {
    data.update = this.store.bind(this);
    return data;
  }

  @action
  create(...args) {
    const todos = args.map(v => this.wrap(new Todo(v)));
    this.todos = this.todos.concat(todos);
    this.store();
    return todos;
  }

  @action
  add(...args) {
    const todos = args.map(v => this.wrap(v));
    this.todos = this.todos.concat(todos);
    this.store();
  }

  @action
  delete(...todos) {
    this.todos = this.todos.filter(v => todos.find(target => target.id !== v.id));
    this.store();
  }

  @action
  clear() {
    this.todos = [];
    this.store();
  }

  constructor(params) {
    this.key = params.key;
    this.todos = this.restore();
  }

  store() {
    localStorage.setItem(this.key, JSON.stringify(toJS(this.todos)));
  }

  restore() {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data).map(v => this.wrap(Todo.fromJS(v))) : [];
  }
}

export default observable({
  myMissions: new TodoList({ key: 'my_missions' }),
  following: new TodoList({ key: 'following' })
});
