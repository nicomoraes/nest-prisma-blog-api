import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsArrayOfStringsOrNumbersConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, _args: ValidationArguments) {
    if (!Array.isArray(value)) {
      return false;
    }
    return value.every(
      elem => typeof elem === 'string' || typeof elem === 'number',
    );
  }
}

export function IsArrayOfStringsOrNumbers(
  validationOptions?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsArrayOfStringsOrNumbersConstraint,
    });
  };
}
