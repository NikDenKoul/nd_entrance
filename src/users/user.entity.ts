import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Evaluation } from "../lessons/evaluation.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({  length: 30 })
  email: string;

  @OneToMany(() => Evaluation, (evaluation) => evaluation.user)
  evaluations: Evaluation[];
}
