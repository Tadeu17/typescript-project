import { ValidatorTypes } from "./types.js";

const registeredValidators: {
  [context: string]: { [property: string]: ValidatorTypes };
} = {};

export function Required(context: any, propName: string) {
  const className = context.constructor.name;
  if (!registeredValidators[className]) registeredValidators[className] = {};

  registeredValidators[className][propName] = {
    ...registeredValidators[propName],
    required: true,
  };
}

export function Max(limit: number) {
  return function (context: any, propName: string) {
    const className = context.constructor.name;
    if (!registeredValidators[className]) registeredValidators[className] = {};

    registeredValidators[className][propName] = {
      ...registeredValidators[propName],
      maxLength: limit,
    };
    console.log(
      "im inside",
      JSON.parse(JSON.stringify(registeredValidators[context.constructor.name]))
    );
    console.log(registeredValidators[context.constructor.name]);
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
      console.log(registeredValidators, context[prop], rules);
      if (
        rules.maxLength !== undefined &&
        typeof context[prop] === "string" &&
        context[prop].length > rules.maxLength
      )
        return false;
    }
    return isValid;
  }
}
