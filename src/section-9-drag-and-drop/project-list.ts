import { projectState } from "./project-state";
import { Project, ProjectStatus } from "./project";
import { Component } from "./component";

export class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  assignedProjects: Project[] = [];

  constructor(
    private type: "active" | "finished"
  ) {
    super("project-list", "app", "beforeend", `${type}-projects`)

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((project) => {
        if (this.type = 'active')
          return project.status === ProjectStatus.Active;
        else
          return project.status === ProjectStatus.Finished
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });

    this.render();
  }

  render() {
    this.toBeAddedElement.querySelector("ul")!.id = `${this.type}-projects-list`;
    this.toBeAddedElement.querySelector(
      "h2"
    )!.textContent = `${this.type.toUpperCase()} PROJECTS`;
  }

  renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;

    listEl.innerHTML = '' // were gona rerender everything because it's a test app. performance wise would be best to test what has been rendered and only add what hasn't yet

    for (const projItem of this.assignedProjects) {
      const listItem = document.createElement("li");
      listItem.textContent = `${projItem.title} with ID = ${projItem.id}`;
      listEl.appendChild(listItem);
    }
  }
}
