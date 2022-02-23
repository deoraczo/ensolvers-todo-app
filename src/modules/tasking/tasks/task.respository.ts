import { Nullable } from "src/modules/shared/nullable";
import { TaskId } from "./task-id";
import { Task } from "./task.entity";

export interface TaskRepository {
  save(task: Task): Promise<void>
  find(taskId: string): Promise<Nullable<Task>>
  findAll(): Promise<Task[]>
  remove(id: string): Promise<void>
  match(where: Object): Promise<Nullable<Task>>
}

export const TaskRepository = Symbol('TaskRepository')