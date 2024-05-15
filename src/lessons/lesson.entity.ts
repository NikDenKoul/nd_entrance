import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({  length: 100 })
  name: string;

  @Column({  length: 20 })
  code: string;
}
