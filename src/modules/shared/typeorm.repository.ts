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

  async persist(t: T): Promise<void> {
    const save = await this.repository().save(t as any)
  }

  async match(id: string): Promise<Nullable<T>> {
    return await this.repository().findOne(id)
  }

  async search(): Promise<T[]> {
    return await this.repository().find()
  }

  async delete(id: string): Promise<void> {
    await this.repository().delete(id)
  }
}