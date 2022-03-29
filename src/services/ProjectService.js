import { BaseService } from './BaseService';
export class ProjectService extends BaseService {
  constructor() {
    super();
  }

  deleteProject = (id) => {
    return this.delete(`/Project/deleteProject?projectId=${id}`);
  };
}

export const projectService = new ProjectService();
