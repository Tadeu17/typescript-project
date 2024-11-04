import { Validator, Required, Max } from "./validator.js";
import { Autobind } from "./utils.js";

export class ProjectInput {
  templateElement: HTMLTemplateElement;
  targetElement: HTMLDivElement;
  formElement: HTMLFormElement;

  @Required
  title: string;
  @Required
  description: string;
  @Required
  @Max(10)
  people: number;

  constructor(
    templateElement: HTMLTemplateElement,
    targetElement: HTMLDivElement
  ) {
    this.templateElement = templateElement;
    this.targetElement = targetElement;
    const importNode = document.importNode(this.templateElement.content, true);
    this.formElement = importNode.firstElementChild! as HTMLFormElement;
    this.formElement.id = "user-input";

    this.title = this.description = "";
    this.people = 0;

    // insert in the app
    this.targetElement.insertAdjacentElement("afterbegin", this.formElement);

    this.configure();
  }

  private configure() {
    this.formElement.addEventListener("submit", this.submitHandler);
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();

    const elInTitle = <HTMLInputElement>document.getElementById("title")!;
    const elInDesc = <HTMLInputElement>document.getElementById("description")!;
    const elInPeople = <HTMLInputElement>document.getElementById("people")!;

    this.title = elInTitle.value;
    this.description = elInDesc.value;
    this.people = +elInPeople.value;

    if (Validator.validate(this)) {
      console.log(
        "%cThis is a green text",
        "color:yellow; background: black; font-size: 30px;"
      );
    } else {
      console.log(
        "%cThis is a RED text",
        "background: red; font-size: 30px;"
      );
    }
  }
}
