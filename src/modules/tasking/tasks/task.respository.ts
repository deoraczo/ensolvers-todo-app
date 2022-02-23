import { Nullable } from "src/modules/shared/nullable";
import { TaskId } from "./task-id";
import { Task } from "./task.entity";

export interface TaskRepository {
  save(task: Task): Promise<void>
  find(taskId: string): Promise<Nullable<Task>>
  findAll(): Promise<Task[]>
  remove(id: string): Promise<void>
}

export const TaskRepository = Symbol('TaskRepository')