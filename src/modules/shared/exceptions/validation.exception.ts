import { BadRequestException } from "@nestjs/common";

export class ValidationException extends BadRequestException {
  constructor(readonly validationErros: any) {
    super()
  }
}
