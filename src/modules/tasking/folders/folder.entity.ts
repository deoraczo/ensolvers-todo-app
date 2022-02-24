import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Task } from "../tasks/task.entity";

@Entity()
export class Folder {
  @PrimaryColumn({ 
    type: 'uuid',
    generated: 'uuid',
  })
  readonly id: string

  @Column({ unique: true })
  readonly title: string

  @OneToMany(() => Task, (task) => task.folder)
  readonly tasks: Task[]

  @Column({
    name: 'created_at',
    type: 'timestamp',
    nullable: false
  })
  readonly createdAt: Date
} 