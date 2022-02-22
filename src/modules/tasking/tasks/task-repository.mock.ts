import { Task } from "./task.entity";
import { TaskRepository } from "./task.respository";

export class TaskRepositoryMock implements TaskRepository {
  private mockSave = jest.fn()

  async save(task: Task): Promise<void> {
    this.mockSave(task)
  }

  assertLastSavedTaskIs(expected: Task): void {
    const mock = this.mockSave.mock
    const lastSavedTask = mock.calls[mock.calls.length - 1][0] as Task
    expect(lastSavedTask).toEqual(expected)
  }
}