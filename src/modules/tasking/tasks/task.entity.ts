
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { TaskMarkException } from "./exceptions/task-mark.exception"
import { TaskId } from "./task-id"

export enum TaskStatus {
  DONE = 'DONE',
  PENDING = 'PENDING'
}

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryColumn({ 
    type: 'uuid',
    generated: 'uuid',
  })
  readonly id: string

  @Column({ unique: true })
  readonly title: string

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING
  })
  readonly status: TaskStatus

  @Column({
    name: 'created_at',
    type: 'timestamp',
    nullable: false
  })
  readonly createdAt: Date

  constructor(id: string, title: string, status?: TaskStatus, createdAt?: Date) {
    this.id = id
    this.title = title
    this.status = status ?? TaskStatus.PENDING
    this.createdAt = createdAt ?? new Date()
  }


  static create(id: string, title: string): Task
  {
    const task = new Task(id, title)
    return task
  }

  renameTitle(title: string): Task {
    const task = new Task(this.id, title, this.status, this.createdAt)
    return task
  }

  mark(): Task {
    if (this.status == TaskStatus.DONE) {
      throw new TaskMarkException('cannot mark a marked task')
    }
    const task = new Task(this.id, this.title, TaskStatus.DONE, this.createdAt)
    return task
  }

  unmark(): Task {
    if (this.status == TaskStatus.PENDING) {
      throw new TaskMarkException('cannot unmark a unmarked task')
    }
    const task = new Task(this.id, this.title, TaskStatus.PENDING, this.createdAt)
    return task
  }
}