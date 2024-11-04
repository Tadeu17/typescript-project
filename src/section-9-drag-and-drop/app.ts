import { ProjectInput } from "./project-input.js";

const elInput = <HTMLTemplateElement>document.getElementById("project-input");
const elApp = document.getElementById("app")! as HTMLDivElement;

const projectInput = new ProjectInput(elInput, elApp);

console.log("final", projectInput);
