export enum TaskStatus {
  DONE = 'DONE',
  PENDING = 'PENDING'
}

export class Task {
  id: string
  title: string
  status: TaskStatus


  static cretea(id: string, title: string): Task
  {
    const task: Task = {
      id,
      title,
      status: TaskStatus.PENDING
    }

    return task
  }
}