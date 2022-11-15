import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("Accounts")
export class Accounts{
    @PrimaryGeneratedColumn()
    readonly id: string;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    balance: number;
}