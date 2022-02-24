import { InjectConnection } from "@nestjs/typeorm";
import { Connection, ObjectType, Repository } from "typeorm";
import { TaskId } from "../tasking/tasks/task-id";
import { Nullable } from "./nullable";

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

  protected async persist(t: T): Promise<void> {
    const save = await this.repository().save(t as any)
  }

  protected async findByMatch(where: object = {}, relations: string[] = []): Promise<Nullable<T>> {
    return await this.repository().findOne({
      where,
      relations
    })
  }

  protected async findById(id: string): Promise<Nullable<T>> {
    return await this.repository().findOne(id)
  }

  protected async search(): Promise<T[]> {
    return await this.repository().find()
  }

  protected async delete(id: string): Promise<void> {
    await this.repository().delete(id)
  }
}