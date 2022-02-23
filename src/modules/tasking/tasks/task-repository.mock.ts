import { Nullable } from "src/modules/shared/nullable";
import { TaskId } from "./task-id";
import { Task } from "./task.entity";
import { TaskRepository } from "./task.respository";

export class TaskRepositoryMock implements TaskRepository {
  private mockSave = jest.fn()
  private mockFind = jest.fn()
  private tasks: Task[] = []

  async save(task: Task): Promise<void> {
    this.tasks.push(task)
    this.mockSave(task)
  }

  assertLastSavedTaskIs(expected: Task): void {
    const mock = this.mockSave.mock
    const lastSavedTask = mock.calls[mock.calls.length - 1][0] as Task
    expect(lastSavedTask).toEqual(expected)
  }

  async find(taskId: string): Promise<Nullable<Task>> {
    //this.mockFind.mockReturnValue()
    return null
  }

  async findAll(): Promise<Task[]> {
    return []
  }

  async remove(id: string): Promise<void> {
      
  }
}