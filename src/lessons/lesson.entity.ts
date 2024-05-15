import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Evaluation } from "./evaluation.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Lesson {
  @ApiProperty({ example: 3 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Музыка" })
  @Column({  length: 100 })
  name: string;

  @ApiProperty({ example: "music" })
  @Column({ length: 20 })
  code: string;

  @OneToMany(() => Evaluation, (evaluation) => evaluation.lesson)
  evaluations: Evaluation[];
}
