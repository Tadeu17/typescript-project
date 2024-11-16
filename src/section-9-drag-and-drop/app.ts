import { ProjectInput } from "./project-input";
import { ProjectList } from "./project-list";

const projectInput = new ProjectInput();
const projectActiveList = new ProjectList("active");
const projectInactiveList = new ProjectList("finished");

console.log("final", projectInput, projectActiveList, projectInactiveList);
