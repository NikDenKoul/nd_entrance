import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lesson } from "./lesson.entity";
import { User } from "../users/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Evaluation {
  @ApiProperty({ example: 2 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 56 })
  @Column()
  score: number;

  @ApiProperty()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: 3 })
  @Column()
  lessonId: number;

  @ApiProperty({ example: 1 })
  @Column()
  userId: number;

  @ManyToOne(() => Lesson, (lesson) => lesson.evaluations, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  lesson: Lesson;

  @ManyToOne(() => User, (user) => user.evaluations, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  user: User;
}
