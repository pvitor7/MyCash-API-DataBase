import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("Transactions")
export class Transactions{
    @PrimaryGeneratedColumn()
    readonly id: string;

    @Column() //relacionar com usuário
    debiteAccountId: string;

    @Column() //relacionar com usuário
    creditAccountId: string;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    value: number;

    @Column()
    createdAt: Date;
}