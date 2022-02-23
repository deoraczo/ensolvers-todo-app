import { Inject, Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/typeorm";
import { TypeOrmRepository } from "../../shared/typeorm.repository";
import { Connection, EntityRepository, EntitySchema, ObjectType } from "typeorm";
import { Task } from "./task.entity";
import { TaskRepository } from "./task.respository";

@EntityRepository(Task)
export class TypeOrmTaskRespository extends TypeOrmRepository<Task> implements TaskRepository {

  protected entity(): ObjectType<Task> {
      return Task;
  }

  async save(task: Task): Promise<void> {
    await this.persist(task)
  }
}