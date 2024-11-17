import { Validator, Required, Max } from "./validator";
import { Autobind } from "./utils";

import { projectState } from "./project-state";
import { Component } from "./component";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  @Required
  title: string = "";
  @Required
  description: string = "";
  @Required
  @Max(10)
  people: number = 0;

  constructor() {
    super("project-input", "app", "afterbegin", "user-input")

    this.toBeAddedElement.addEventListener("submit", this.submitHandler);
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();

    const elInTitle =
      this.toBeAddedElement.querySelector<HTMLInputElement>("#title")!;
    const elInDesc =
      this.toBeAddedElement.querySelector<HTMLInputElement>("#description")!;
    const elInPeople =
      this.toBeAddedElement.querySelector<HTMLInputElement>("#people")!;

    this.title = elInTitle.value;
    this.description = elInDesc.value;
    this.people = +elInPeople.value;

    const validationResult = Validator.validate(this);
    if (typeof validationResult === "boolean") {
      projectState.addProject(this.title, this.description, this.people);

      console.log(
        "%cThis is a green text",
        "color:yellow; background: black; font-size: 30px;"
      );

      this.clearInputs();
    } else {
      console.log("%c" + validationResult, "background: red; font-size: 30px;");
    }
  }
  
  clearInputs() {
    this.title = ''
    this.description = ''
    this.people = 0
  }
}
