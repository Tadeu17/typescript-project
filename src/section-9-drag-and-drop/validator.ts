import { ValidatorTypes } from "./types.js";

const registeredValidators: {
  [context: string]: { [property: string]: ValidatorTypes };
} = {};

export function Required(context: Record<string, any>, propName: string) {
  const className = context.constructor.name;
  if (!registeredValidators[className]) registeredValidators[className] = {};

  registeredValidators[className][propName] = {
    ...registeredValidators[className][propName],
    required: true,
  };
}

export function Max(limit: number) {
  return function (context: Record<string, any>, propName: string) {
    const className = context.constructor.name;
    if (!registeredValidators[className]) registeredValidators[className] = {};

    registeredValidators[className][propName] = {
      ...registeredValidators[className][propName],
      max: limit,
    };
  };
}

export function Min(limit: number) {
  return function (context: Record<string, any>, propName: string) {
    const className = context.constructor.name;
    if (!registeredValidators[className]) registeredValidators[className] = {};

    registeredValidators[className][propName] = {
      ...registeredValidators[className][propName],
      min: limit,
    };
  };
}

export function MaxLength(limit: number) {
  return function (context: Record<string, any>, propName: string) {
    const className = context.constructor.name;
    if (!registeredValidators[className]) registeredValidators[className] = {};

    registeredValidators[className][propName] = {
      ...registeredValidators[className][propName],
      maxLength: limit,
    };
  };
}

export class Validator {
  static validate(context: Record<string, any>): boolean | string {
    const contextName = context.constructor.name;
    const contextValidators = registeredValidators[contextName];
    if (!contextValidators) return true;

    for (const prop in contextValidators) {
      const rules = contextValidators[prop];
      const value = context[prop];

      // Required validation
      if (rules.required && !value) {
        return `Property ${prop} is required.`;
      }

      // Min length validation for strings
      if (
        rules.minLength &&
        typeof value === "string" &&
        value.length < rules.minLength
      ) {
        return `Property ${prop} should have at least ${rules.minLength} characters.`;
      }

      // Max length validation for strings
      if (
        rules.maxLength &&
        typeof value === "string" &&
        value.length > rules.maxLength
      ) {
        return `Property ${prop} should not exceed ${rules.maxLength} characters.`;
      }

      // Min value validation for numbers
      if (rules.min && typeof value === "number" && value < rules.min) {
        return `Property ${prop} should not be less than ${rules.min}.`;
      }

      // Max value validation for numbers
      if (rules.max && typeof value === "number" && value > rules.max) {
        return `Property ${prop} should not exceed ${rules.max}.`;
      }
    }
    return true;
  }
}
