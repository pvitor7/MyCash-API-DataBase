import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToOne, OneToMany } from "typeorm";
import { User } from "./users";
import { Transactions } from "./transactions";
import { Exclude } from "class-transformer";

@Entity("Accounts")
export class Accounts{
    @PrimaryGeneratedColumn()
    readonly id: string;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    @Exclude()
    balance: number;

    @OneToOne(() => User, (user: User) => user.account)
    user: User;

    @OneToMany(() => Transactions, (transaction: Transactions) => Transactions)
    transactions: Transactions[];
}