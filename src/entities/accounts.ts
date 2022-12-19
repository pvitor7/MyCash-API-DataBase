import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToOne, OneToMany } from "typeorm";
import { User } from "./users";
import { v4 as uuid } from "uuid";
import { Transactions } from "./transactions";
import { Exclude } from "class-transformer";

@Entity("Accounts")
export class Accounts{
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    @Exclude()
    balance: number;

    @OneToOne(() => User, (user: User) => user.account)
    user: User;

    @OneToMany(() => Transactions, (transaction: Transactions) => Transactions)
    transactions: Transactions[];

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}