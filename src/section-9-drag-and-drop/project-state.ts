import { Project, ProjectStatus } from "./project";

type Listener = (items: Project[]) => void;

class ProjectState {
  private listeners: Listener[] = []; // e.g. whenever we add a project we want all listeners to execute
  private projects: Project[] = [];
  // available in the prototype, is not constructed, exists in every object. this with the getInstance guarantees a singleton
  private static instance: ProjectState;

  private constructor() {}

  // by doing getInstance, we guarantee we create the instance only once, making it a singleton
  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new ProjectState();
      return this.instance;
    }
  }

  getProjects(): any[] {
    return this.projects;
  }

  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
  }

  addProject(title: string, description: string, people: number) {
    const newProject = new Project(
      title,
      description,
      people,
      ProjectStatus.Active
    );

    this.projects.push(newProject);
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice()); // slice to return a new copy of the array, not the original so it cannot be edited outside this scope
    }
  }
}

export const projectState = ProjectState.getInstance();
