import { Inject } from '@nestjs/common'
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { TaskRepository } from '../task.respository'




@ValidatorConstraint({ name: 'IsTitleAlreadyExist', async: true })
export class IsTitleAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    @Inject(TaskRepository) private readonly taskRepository: TaskRepository
  ) {
  }

  async validate(title: string, validationArguments?: ValidationArguments) {
    if (!title) {
      return true
    }

    const task = await this.taskRepository.match({ title})
    
    return !task
  }
}

export function IsTitleAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsTitleAlreadyExist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTitleAlreadyExistConstraint
    })
  }
}