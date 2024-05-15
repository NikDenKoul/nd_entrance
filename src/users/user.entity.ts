import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Evaluation } from "../lessons/evaluation.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Джонни" })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({ example: "silverhand@cyber.punk" })
  @Column({  length: 30 })
  email: string;

  @OneToMany(() => Evaluation, (evaluation) => evaluation.user)
  evaluations: Evaluation[];
}
