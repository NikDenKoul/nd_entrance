import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Evaluation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: number;

  @Column()
  createdAt: Date;
}
