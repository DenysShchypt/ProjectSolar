import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { AppError } from 'common/constants/errors';
import { RegisterDTO } from 'modules/auth/dto';

@ValidatorConstraint({ name: 'IsPasswordsMatching', async: false })
export class IsPasswordsMatching implements ValidatorConstraintInterface {
  validate(passwordRepeat: string, arg: ValidationArguments) {
    const obj = arg.object as RegisterDTO;
    return obj.password === passwordRepeat;
  }
  defaultMessage(): string {
    return AppError.USER_NOT_FOUND;
  }
}
