import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common"
import { ValidationException } from "../exceptions/validation.exception"
import { Response } from 'express'

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
      const ctx = host.switchToHttp()
      const response = ctx.getResponse<Response>()

      const statusCode = HttpStatus.BAD_REQUEST
      response
        .status(statusCode)
        .json({
          statusCode,
          message: 'The given data was invalid',
          error: 'Bad Request',
          errors: exception.validationErros
        })
  }
}
