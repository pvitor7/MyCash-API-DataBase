import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Transaction } from "./Transaction";
import { Exclude } from "class-transformer";

@Entity("Accounts")
export class Account {
    @PrimaryGeneratedColumn()
    readonly id: string;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    @Exclude()
    balance: number;

    @OneToOne(() => User, (user: User) => user.account)
    user: User;

    @OneToMany(() => Transaction, (transaction: Transaction) => Transaction)
    transactions: Transaction[];
}