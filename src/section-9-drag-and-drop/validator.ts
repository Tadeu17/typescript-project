import { ValidatorTypes } from "./types.js";

const registeredValidators: { [property: string]: ValidatorTypes } = {};
export function Required(_: any, propName: string) {
  console.log("required func");

  console.log(registeredValidators, propName);
  
  //   if (!registeredValidators[propName]) {
  //     registeredValidators[propName] = {};
  //   }
  //   registeredValidators[propName].required = true;
}

export function Max(limit: number) {
  return function (target: any, key: string) {
    console.log("in max", limit, target, key);
  };
}

export class Validator {
  static validate(context: any) {
    let isValid = true;
    for (const prop in registeredValidators) {
      if (registeredValidators[prop].required) {
        isValid = isValid && context[prop];
      }
    }
    return isValid;
  }
}
