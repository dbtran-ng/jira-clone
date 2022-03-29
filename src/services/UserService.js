import { BaseService } from './BaseService';

export class UserService extends BaseService {
  constructor() {
    super();
  }

  getUser = (keyWord) => {
    return this.get(`Users/getUser?keyword=${keyWord}`);
  };
}

export const userService = new UserService();
