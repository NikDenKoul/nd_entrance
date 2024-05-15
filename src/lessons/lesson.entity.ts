import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";
import { Evaluation } from "./evaluation.entity";

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({  length: 100 })
  name: string;

  @Column({  length: 20 })
  code: string;

  @OneToMany(() => Evaluation, (evaluation) => evaluation.lesson)
  evaluations: Evaluation[];
}
