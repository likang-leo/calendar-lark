import { observable, action } from 'mobx';
import { ROUTES_MAP } from '../consts/routeMenu';

const location = observable(
  {
    path: undefined,
    update(path) {
      const p = ROUTES_MAP[path] || path;
      if (p === this.path) return;
      this.path = p;
    }
  },
  {
    update: action
  }
);

export default location;
