import { Validator, Required, Max } from "./validator.js";

function Autobind(_: any, _2: string, propDescriptor: PropertyDescriptor) {
  const originalMethod = propDescriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  targetElement: HTMLDivElement;
  formElement: HTMLFormElement;

  @Required
  title: string;
  @Required
  description: string;
  @Required
  @Max(5)
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
      alert("this is valid");
    } else {
      alert("this is not valid");
    }
  }
}

const elInput = <HTMLTemplateElement>document.getElementById("project-input");
const elApp = document.getElementById("app")! as HTMLDivElement;

const projectInput = new ProjectInput(elInput, elApp);

console.log("final", projectInput);
