import { BaseService } from './BaseService';
export class TaskTypeService extends BaseService {
  constructor() {
    super();
  }
  getAllTaskTypes() {
    return this.get('TaskType/getAll');
  }
}

export const taskTypeService = new TaskTypeService();
