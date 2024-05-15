import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lesson } from "./lesson.entity";
import { User } from "../users/user.entity";

@Entity()
export class Evaluation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  lessonId: number;

  @Column()
  userId: number;

  @ManyToOne(() => Lesson, (lesson) => lesson.evaluations, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  lesson: Lesson;

  @ManyToOne(() => User, (user) => user.evaluations, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user: User;
}
