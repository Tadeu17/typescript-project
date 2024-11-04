import { Validator, Required, Max } from "./validator.js";
import { Autobind } from "./utils.js";

export class ProjectInput {
  templateElement: HTMLTemplateElement;
  targetElement: HTMLDivElement;
  formElement: HTMLFormElement;

  @Required
  title: string = "";
  @Required
  description: string ="";
  @Required
  @Max(10)
  people: number = 0;

  constructor(
    templateElement: HTMLTemplateElement,
    targetElement: HTMLDivElement
  ) {
    this.templateElement = templateElement;
    this.targetElement = targetElement;
    const importNode = document.importNode(this.templateElement.content, true);
    this.formElement = importNode.firstElementChild! as HTMLFormElement;
    this.formElement.id = "user-input";

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

    const elInTitle =
      this.formElement.querySelector<HTMLInputElement>("#title")!;
    const elInDesc =
      this.formElement.querySelector<HTMLInputElement>("#description")!;
    const elInPeople =
      this.formElement.querySelector<HTMLInputElement>("#people")!;

    this.title = elInTitle.value;
    this.description = elInDesc.value;
    this.people = +elInPeople.value;

    const validationResult = Validator.validate(this);
    if (typeof validationResult === "boolean") {
      console.log(
        "%cThis is a green text",
        "color:yellow; background: black; font-size: 30px;"
      );
    } else {
      console.log("%c" + validationResult, "background: red; font-size: 30px;");
    }
  }
}
