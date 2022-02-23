import { InjectConnection } from "@nestjs/typeorm";
import { Connection, ObjectType, Repository } from "typeorm";

export abstract class TypeOrmRepository<T> {
 
  constructor(
    @InjectConnection('connection')
    private connection: Connection,
  ) {
    
  }

  protected abstract entity(): ObjectType<T>;

  protected repository(): Repository<T> {
    return this.connection.getRepository<T>(this.entity());
  }

  async persist(t: T): Promise<void> {
    const repository = this.repository()
    await repository.save(t as any)
  }
}