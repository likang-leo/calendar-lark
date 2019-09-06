import { observable, action } from 'mobx';

const user = observable(
  {
    login: Boolean(localStorage.getItem('login')),

    toggleLogin() {
      this.login = !this.login;
      localStorage.setItem('login', Number(this.login));
    }
  },
  {
    toggleLogin: action
  }
);

export default user;
