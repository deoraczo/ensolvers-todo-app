import { v4 as uuid, validate as validateUUID } from 'uuid'

export class InvalidArgumentError extends Error {}

export class GuidVO {
  constructor(readonly value: string) {
    this.ensuseIsValidUuid(value)
  }

  static random(): GuidVO {
    return new GuidVO(uuid())
  }

  private ensuseIsValidUuid(id: string): void {
    if (!validateUUID(id)) {
      throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${id}>`);
    }
  }
}