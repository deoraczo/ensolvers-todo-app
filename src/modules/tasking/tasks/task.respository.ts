import { Task } from "./task.entity";

export interface TaskRepository {
  save(task: Task): Promise<void>
}

export const TaskRepository = Symbol('TaskRepository')