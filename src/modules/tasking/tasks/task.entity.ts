import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

export enum TaskStatus {
  DONE = 'DONE',
  PENDING = 'PENDING'
}

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
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

  constructor(id: string, title: string) {
    this.id = id
    this.title = title
    this.status = TaskStatus.PENDING
    this.createdAt = new Date()
  }


  static create(id: string, title: string): Task
  {
    const task = new Task(id, title)
    return task
  }
}