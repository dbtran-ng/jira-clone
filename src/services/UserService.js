import { BaseService } from './BaseService';

export class UserService extends BaseService {
  constructor() {
    super();
  }

  getUser = (keyWord) => {
    return this.get(`Users/getUser?keyword=${keyWord}`);
  };

  assignUserProject = (project) => {
    return this.post(`Project/assignUserProject`, project);
  };

  deleteUserFromProject = (userProject) => {
    return this.post(`Project/removeUserFromProject/`, userProject);
  };
}

export const userService = new UserService();
