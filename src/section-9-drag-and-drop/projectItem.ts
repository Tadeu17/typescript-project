import { Component } from "./component";
import { Project } from "./project";

export class ProjectItem extends Component<HTMLLIElement, HTMLUListElement> {
    private project: Project

    constructor(targetElementId: string, project: Project) {
        super('single-project', targetElementId, 'beforeend', project.id.toString())
        this.project = project

        this.toBeAddedElement.querySelector('h2')!.textContent = this.project.title 
        this.toBeAddedElement.querySelector('h3')!.textContent = this.project.people.toString() 
        this.toBeAddedElement.querySelector('p')!.textContent = this.project.description 
    }
}