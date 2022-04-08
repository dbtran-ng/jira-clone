import { BaseService } from './BaseService';

export class TaskService extends BaseService {
  constructor() {
    super();
  }
  createTask = (taskObject) => {
    return this.post('Project/createTask', taskObject);
  };
}

export const taskService = new TaskService();
