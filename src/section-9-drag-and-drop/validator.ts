import { ValidatorTypes } from "./types.js";

const registeredValidators: {
  [context: string]: { [property: string]: ValidatorTypes };
} = {};

export function Required(context: any, propName: string) {
  const className = context.constructor.name;
  if (!registeredValidators[className]) registeredValidators[className] = {};

  registeredValidators[className][propName] = {
    ...registeredValidators[className][propName],
    required: true,
  };
}

export function Max(limit: number) {
  return function (context: any, propName: string) {
    const className = context.constructor.name;
    if (!registeredValidators[className]) registeredValidators[className] = {};

    registeredValidators[className][propName] = {
      ...registeredValidators[className][propName],
      maxLength: limit,
    };
  };
}

export class Validator {
  static validate(context: any) {
    let isValid = true;
    const contextName = context.constructor.name;
    const contextValidators = registeredValidators[contextName];

    for (const prop in contextValidators) {
      const rules = contextValidators[prop];
      if (rules.required && !context[prop]) return false;
      if (rules.maxLength && context[prop] > rules.maxLength) return false;
    }
    return isValid;
  }
}
